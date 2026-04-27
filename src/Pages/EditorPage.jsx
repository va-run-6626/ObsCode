import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import ConsoleOutput from "../components/ConsoleOutput";
import api from "../services/api";

const LANGUAGE_OPTIONS = [
  { label: "Python 3.10", key: "python", monaco: "python" },
  { label: "Java 17", key: "java", monaco: "java" },
  { label: "JavaScript ES6", key: "javascript", monaco: "javascript" },
  { label: "C++ 17", key: "cpp", monaco: "cpp" },
];

const DEFAULT_CODE = `class Solution:
    def solve(self):
        pass`;

const IN_PROGRESS_SUBMISSION_STATUSES = new Set([
  "PENDING",
  "PROCESSING",
  "QUEUED",
  "RUNNING",
]);

const EditorPage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [problem, setProblem] = useState(null);
  const [loadingProblem, setLoadingProblem] = useState(Boolean(slug));
  const [problemError, setProblemError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [runResult, setRunResult] = useState(null);
  const [executionError, setExecutionError] = useState(null);
  const [executionMode, setExecutionMode] = useState(null);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [codeByLanguage, setCodeByLanguage] = useState({
    python: DEFAULT_CODE,
    java: "",
    javascript: "",
    cpp: "",
  });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) setLeftPanelWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!slug) return;

    const fetchProblem = async () => {
      setLoadingProblem(true);
      setProblemError(null);
      try {
        const response = await api.get(`/problems/${slug}`);
        const data = response.data;
        setProblem(data);
        setCodeByLanguage({
          python: data.starterCode?.python || DEFAULT_CODE,
          java: data.starterCode?.java || "",
          javascript: data.starterCode?.javascript || "",
          cpp: data.starterCode?.cpp || "",
        });
      } catch (err) {
        setProblemError(err.response?.data?.message || err.message);
      } finally {
        setLoadingProblem(false);
      }
    };

    fetchProblem();
  }, [slug]);

  const selectedLanguageOption = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((language) => language.key === selectedLanguage) ||
      LANGUAGE_OPTIONS[0],
    [selectedLanguage],
  );

  const visibleTestCases = useMemo(() => {
    const cases = problem?.allTestCases || problem?.testCases || [];
    return cases.filter((testCase) => testCase.visible ?? testCase.isPublic);
  }, [problem]);

  const editorCode = codeByLanguage[selectedLanguage] || "";
  const difficulty = problem?.difficulty || "Hard";
  const isExecuting = Boolean(executionMode);

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const fetchSubmissionUntilComplete = async (submissionId) => {
    const maxAttempts = 60;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const response = await api.get(`/submissions/${submissionId}`);
      const submission = response.data;
      const status = submission.status?.toUpperCase();

      if (
        submission.finalVerdict ||
        (status && !IN_PROGRESS_SUBMISSION_STATUSES.has(status))
      ) {
        return submission;
      }

      await sleep(1000);
    }

    throw new Error("Submission is still processing. Please try again shortly.");
  };

  const handleExecution = async (type) => {
    if (!problem?.id) {
      setExecutionError("Problem data is not loaded yet.");
      return;
    }

    setExecutionMode(type);
    setExecutionError(null);
    setRunResult(null);
    setIsConsoleVisible(true);

    try {
      const response = await api.post("/submissions/run", {
        problemId: problem.id,
        language: selectedLanguage,
        userCode: editorCode,
        type,
      });
      const submissionId = response.data?.submissionId || response.data?.id;

      if (!submissionId) {
        throw new Error("Run API did not return a submissionId.");
      }

      const completedSubmission =
        await fetchSubmissionUntilComplete(submissionId);
      setRunResult(completedSubmission);
    } catch (err) {
      setExecutionError(err.response?.data?.message || err.message);
    } finally {
      setExecutionMode(null);
    }
  };

  return (
    <div className="flex h-screen bg-black text-on-background font-body selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
      {/* SideNavBar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-20 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="bg-[#131313]/70 backdrop-blur-xl flex justify-between items-center px-12 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter text-white">
              {problem?.title || "Obs Play"}
            </h1>
            <nav className="hidden md:flex items-center gap-6 font-medium">
              <Link
                className="text-[#C7C6C6] hover:text-white transition-opacity opacity-80 hover:opacity-100"
                to="#"
              >
                Explorer
              </Link>
              <Link
                className="text-white border-b-2 border-white pb-1 opacity-80 hover:opacity-100"
                to="#"
              >
                Debugger
              </Link>
              <Link
                className="text-[#C7C6C6] hover:text-white transition-opacity opacity-80 hover:opacity-100"
                to="#"
              >
                Terminal
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-sm">
                search
              </span>
              <input
                className="bg-surface-container-low border-none rounded-xl py-2 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-white transition-all outline-none"
                placeholder="Quick search..."
                type="text"
              />
            </div>
            <button className="p-2 text-[#C7C6C6] hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Workspace */}
        <main
          ref={containerRef}
          className="flex-1 flex overflow-hidden relative"
        >
          {/* Left Panel */}
          <section
            style={{ width: `${leftPanelWidth}%` }}
            className="flex flex-col h-full bg-background border-r border-outline-variant/10 min-w-0"
          >
            <div className="px-12 pt-6 flex items-center gap-8 border-b border-outline-variant/10">
              {["description", "editorial", "submissions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold transition-all capitalize ${activeTab === tab ? "text-white border-b-2 border-white" : "text-outline hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto px-12 py-10 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                {activeTab === "description" && (
                  <div className="prose prose-invert prose-p:text-on-surface-variant prose-headings:text-white prose-code:text-white prose-code:bg-surface-container-low prose-code:px-1 prose-code:rounded">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-surface-container-high text-xs font-mono px-3 py-1 rounded-full text-secondary">
                        {difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-outline">
                        {problem?.id ? `Problem #${problem.id}` : slug || "Practice"}
                      </span>
                    </div>
                    {loadingProblem ? (
                      <div className="flex items-center gap-3 text-outline">
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <span>Loading problem...</span>
                      </div>
                    ) : problemError ? (
                      <div className="bg-red-950/40 text-red-200 border border-red-500/20 p-5 rounded-2xl not-prose">
                        Failed to load problem: {problemError}
                      </div>
                    ) : (
                      <>
                        <h1>{problem?.title || "Select a problem"}</h1>
                        <ReactMarkdown>
                          {problem?.description ||
                            "Open a problem from the admin dashboard to load its description here."}
                        </ReactMarkdown>

                        {visibleTestCases.length > 0 && (
                          <div className="bg-surface-container-low p-8 rounded-3xl my-8 not-prose">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                              <span className="material-symbols-outlined text-xs">
                                info
                              </span>
                              Sample Cases
                            </h3>
                            <div className="space-y-4 font-mono text-sm">
                              {visibleTestCases.map((testCase, index) => (
                                <div
                                  key={`${testCase.input}-${index}`}
                                  className="space-y-2 border-b border-white/5 last:border-b-0 pb-4 last:pb-0"
                                >
                                  <div>
                                    <span className="text-outline">
                                      Input:{" "}
                                    </span>
                                    <code className="text-white whitespace-pre-wrap">
                                      {testCase.input}
                                    </code>
                                  </div>
                                  <div>
                                    <span className="text-outline">
                                      Output:{" "}
                                    </span>
                                    <code className="text-white whitespace-pre-wrap">
                                      {testCase.expectedOutput}
                                    </code>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {problem?.constraints && (
                          <>
                            <h2>Constraints</h2>
                            <pre className="whitespace-pre-wrap">
                              {problem.constraints}
                            </pre>
                          </>
                        )}

                        {problem?.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-8 not-prose">
                            {problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-surface-container-high text-xs font-mono px-3 py-1 rounded-full text-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                {activeTab === "editorial" && (
                  <div className="prose prose-invert prose-p:text-on-surface-variant prose-headings:text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        history_edu
                      </span>
                      <span className="text-xs font-mono text-outline">
                        Editorial
                      </span>
                    </div>
                    <h1>Official Editorial</h1>
                    {problem?.solution ? (
                      <ReactMarkdown>{problem.solution}</ReactMarkdown>
                    ) : (
                      <p>No editorial has been published for this problem yet.</p>
                    )}
                    {problem?.timeLimitMs && (
                      <div className="bg-surface-container-low p-6 rounded-3xl my-6 font-mono text-xs not-prose">
                        <div className="flex flex-col gap-2">
                          <p>
                            <span className="text-outline">Time Limit:</span>{" "}
                            <span className="text-white">
                              {problem.timeLimitMs}ms
                            </span>
                          </p>
                          <p>
                            <span className="text-outline">Memory Limit:</span>{" "}
                            <span className="text-white">
                              {problem.memoryLimitMb} MB
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "submissions" && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6">
                      Past Submissions
                    </h2>
                    <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface-container-high/50 text-[11px] uppercase tracking-wider text-outline font-bold">
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Runtime</th>
                            <th className="px-6 py-4">Memory</th>
                            <th className="px-6 py-4">Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-mono divide-y divide-white/5">
                          {[
                            {
                              status: "Accepted",
                              runtime: "32 ms",
                              memory: "14.2 MB",
                              date: "Nov 22, 2023",
                              color: "text-green-400",
                            },
                            {
                              status: "Wrong Answer",
                              runtime: "--",
                              memory: "14.1 MB",
                              date: "Nov 22, 2023",
                              color: "text-red-400",
                            },
                            {
                              status: "Accepted",
                              runtime: "45 ms",
                              memory: "14.3 MB",
                              date: "Oct 15, 2023",
                              color: "text-green-400",
                            },
                          ].map((sub, i) => (
                            <tr
                              key={i}
                              className="hover:bg-white/5 transition-colors"
                            >
                              <td
                                className={`px-6 py-4 font-bold ${sub.color}`}
                              >
                                {sub.status}
                              </td>
                              <td className="px-6 py-4 text-white">
                                {sub.runtime}
                              </td>
                              <td className="px-6 py-4 text-outline">
                                {sub.memory}
                              </td>
                              <td className="px-6 py-4 text-outline-variant">
                                {sub.date}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Resizable Handle */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-1.5 bg-surface-container-low cursor-col-resize hover:bg-white transition-colors duration-300 flex items-center justify-center z-10 ${isResizing ? "bg-white" : ""}`}
          >
            <div className="w-1 h-8 bg-outline-variant/30 rounded-full"></div>
          </div>

          {/* Right Panel: Editor */}
          <section className="flex-1 flex flex-col bg-surface-container-lowest p-6 relative min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container-high rounded-xl px-4 py-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    language
                  </span>
                  <select
                    className="bg-transparent text-sm font-medium text-white border-none focus:ring-0 p-0 pr-8 outline-none"
                    value={selectedLanguage}
                    onChange={(event) => setSelectedLanguage(event.target.value)}
                  >
                    {LANGUAGE_OPTIONS.map((language) => (
                      <option
                        key={language.key}
                        value={language.key}
                        className="bg-surface-container-high"
                      >
                        {language.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="p-2 text-outline hover:text-white transition-colors">
                  <span className="material-symbols-outlined">
                    settings_suggest
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-outline">
                  Last Saved: 2m ago
                </span>
                <button className="p-2 text-outline hover:text-white transition-colors">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden relative border border-outline-variant/10 bg-[#0e0e0e]">
              <Editor
                height="100%"
                language={selectedLanguageOption.monaco}
                value={editorCode}
                onChange={(value) =>
                  setCodeByLanguage((prev) => ({
                    ...prev,
                    [selectedLanguage]: value || "",
                  }))
                }
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  padding: { top: 24, bottom: 24 },
                  backgroundColor: "#0e0e0e",
                }}
                beforeMount={(monaco) => {
                  monaco.editor.defineTheme("obsidian-theme", {
                    base: "vs-dark",
                    inherit: true,
                    rules: [],
                    colors: { "editor.background": "#0e0e0e" },
                  });
                }}
                theme="obsidian-theme"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  className="bg-surface-container-high text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isExecuting || !problem?.id}
                  onClick={() => handleExecution("RUN")}
                >
                  {executionMode === "RUN" ? "Running..." : "Run Test Cases"}
                </button>
                <button
                  className="bg-primary text-on-primary px-10 py-3 rounded-full font-extrabold text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isExecuting || !problem?.id}
                  onClick={() => handleExecution("SUBMIT")}
                >
                  {executionMode === "SUBMIT" ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
              <div className="flex items-center gap-6 text-outline">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  <span className="text-xs font-mono">32ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    memory
                  </span>
                  <span className="text-xs font-mono">14.2 MB</span>
                </div>
              </div>
            </div>

            {isConsoleVisible && (
              <ConsoleOutput
                publicTestCases={visibleTestCases}
                result={runResult}
                loading={isExecuting}
                error={executionError}
                onClose={() => setIsConsoleVisible(false)}
              />
            )}
          </section>
        </main>
      </div>

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
};

export default EditorPage;
