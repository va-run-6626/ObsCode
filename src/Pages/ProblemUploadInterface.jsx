import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import Papa from "papaparse";
import ReactMarkdown from "react-markdown";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
const LANGUAGES = ["C++", "Java", "JavaScript", "Python"];
const LANGUAGE_MAP = {
  "C++": "cpp",
  Java: "java",
  JavaScript: "javascript",
  Python: "python",
};
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const TAG_OPTIONS = [
  "ARRAY",
  "STRING",
  "HASH_TABLE",
  "DYNAMIC_PROGRAMMING",
  "MATH",
  "SORTING",
  "GREEDY",
  "BINARY_SEARCH",
  "TREE",
  "GRAPH",
  "BACKTRACKING",
  "STACK",
  "QUEUE",
  "HEAP",
  "SLIDING_WINDOW",
  "TWO_POINTERS",
  "LINKED_LIST",
  "RECURSION",
  "BIT_MANIPULATION",
  "DESIGN",
];

const ProblemUploadInterface = () => {
  // ----------------------------- State -----------------------------
  const [form, setForm] = useState({
    title: "Median of Two Sorted Arrays",
    slug: "median-two-sorted-arrays",
    difficulty: "Hard",
    tags: ["ARRAY", "BINARY_SEARCH"],
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

**Example 1:**
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000`,
    constraints: `nums1.length == m
nums2.length == n
0 <= m, n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6`,
    testCases: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        expectedOutput: "2.00000",
        isPublic: true,
      },
    ],
    starterCode: {
      "C++": `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      Java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      JavaScript: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};`,
      Python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        `,
    },
    solution: "",
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeLang, setActiveLang] = useState("C++");
  const [previewLang, setPreviewLang] = useState("C++");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  const triggerAutoSave = useCallback(() => {
    setToastVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    triggerAutoSave();
  };

  const handleTagSelect = (e) => {
    const newTag = e.target.value;
    if (newTag && !form.tags.includes(newTag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      triggerAutoSave();
    }
    e.target.value = "";
  };

  const removeTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
    triggerAutoSave();
  };

  const addTestCase = () => {
    setForm((prev) => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        { input: "", expectedOutput: "", isPublic: true },
      ],
    }));
    triggerAutoSave();
  };

  const removeTestCase = (idx) => {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== idx),
    }));
    triggerAutoSave();
  };

  const updateTestCase = (idx, field, value) => {
    setForm((prev) => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) =>
        i === idx ? { ...tc, [field]: value } : tc,
      ),
    }));
    triggerAutoSave();
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        const newTestCases = rows.map((row) => ({
          input: row.input || "",
          expectedOutput: row.expectedOutput || "",
          isPublic: row.isPublic === true || row.isPublic === "true" || false,
        }));
        if (newTestCases.length) {
          setForm((prev) => ({ ...prev, testCases: newTestCases }));
          setMessage({
            type: "success",
            text: `Imported ${newTestCases.length} test cases.`,
          });
          triggerAutoSave();
        } else {
          setMessage({ type: "error", text: "No valid test cases found." });
        }
        setTimeout(() => setMessage(null), 3000);
      },
      error: (err) => {
        setMessage({ type: "error", text: "CSV parse error: " + err.message });
        setTimeout(() => setMessage(null), 3000);
      },
    });
    e.target.value = null;
  };

  const handleStarterCodeChange = (lang, value) => {
    setForm((prev) => ({
      ...prev,
      starterCode: { ...prev.starterCode, [lang]: value },
    }));
    triggerAutoSave();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    if (!form.title || !form.slug || !form.description) {
      setMessage({
        type: "error",
        text: "Title, slug and description are required.",
      });
      setSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/problems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to create problem");
      setMessage({ type: "success", text: "Problem published successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const getMonacoLang = (lang) => LANGUAGE_MAP[lang] || "plaintext";
  const publicTestCases = form.testCases.filter((tc) => tc.isPublic);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `*:focus { outline: none !important; box-shadow: 0 0 0 2px rgba(255,255,255,0.2) !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="min-h-screen bg-black text-on-background font-body">
      {toastVisible && (
        <div className="fixed top-8 right-8 z-[100] flex items-center gap-4 bg-surface-container-highest p-4 pr-8 rounded-3xl shadow-2xl border border-white/5 animate-in fade-in slide-in-from-top-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-950">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-tight">
              Changes Auto-saved
            </p>
            <p className="text-zinc-400 text-xs">Problem draft updated</p>
          </div>
        </div>
      )}

      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 h-full z-50 flex flex-col justify-between bg-zinc-950 dark:bg-[#0E0E0E] w-20 items-center py-8">
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="font-['JetBrains_Mono'] font-bold text-white tracking-tighter text-xl">
            O.
          </div>
          <div className="flex flex-col gap-4">
            <a
              className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span>
            </a>
            <a
              className="bg-white text-zinc-950 rounded-3xl p-3 shadow-2xl scale-110"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                code
              </span>
            </a>
            <a
              className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform"
              href="#"
            >
              <span className="material-symbols-outlined">history</span>
            </a>
            <a
              className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <a
            className="text-zinc-500 hover:text-white transition-colors duration-300 p-3"
            href="#"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </a>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <img
              alt="Admin profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC51_gu_2CNVUmfVLBaIpmLO4vVGFa4IT_SYMkDus0OoAGhS9psywTNS9uCH9ZtJrBmxAf0fN5MY0dsZMwmovN15RXjF4o4HmXGv0Up293vfp2z_MZPczeyRm-8W7BrPfTPlJrvc2BukZb81CVbXdJu6hnXoJ51aghOhiD4_cikpKFCN05W4dBLmF9D6yILwAvbXOC_qvFYImnybKHpP4_RBzbYOknXTRKBNFY-URFux6XjeI3buPcf5NsSGUbfHeelgGthB017KweE"
            />
          </div>
        </div>
      </nav>

      <main className="ml-20 h-screen flex flex-col">
        <header className="flex justify-between items-center px-12 h-16 w-full bg-[#131313]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-8">
            <span className="text-lg font-black text-white uppercase tracking-tighter">
              Editor
            </span>
            <div className="flex gap-6 items-center">
              <a
                className="text-zinc-500 font-medium font-['Inter'] text-sm uppercase tracking-widest hover:text-white transition-opacity duration-200"
                href="#"
              >
                Drafts
              </a>
              <a
                className="text-white font-bold border-b-2 border-white pb-1 font-['Inter'] text-sm uppercase tracking-widest"
                href="#"
              >
                New Problem
              </a>
              <a
                className="text-zinc-500 font-medium font-['Inter'] text-sm uppercase tracking-widest hover:text-white transition-opacity duration-200"
                href="#"
              >
                Templates
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-full font-bold text-sm bg-surface-container-highest text-white hover:bg-surface-bright transition-all">
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-2 rounded-full font-bold text-sm bg-white text-zinc-950 shadow-lg shadow-white/5 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              Publish
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white">
              notifications
            </span>
          </div>
        </header>

        <section className="flex-1 flex overflow-hidden">
          {/* LEFT FORM PANEL – same as before, unchanged */}
          <div className="w-[40%] h-full overflow-y-auto custom-scrollbar bg-surface-container-low px-12 py-10">
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Core Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                      Problem Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 px-6 text-white focus:ring-2 ring-white/20 transition-all text-lg font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                        URL Slug
                      </label>
                      <input
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-zinc-300 font-mono text-xs focus:ring-2 ring-white/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                        Difficulty
                      </label>
                      <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white appearance-none focus:ring-2 ring-white/20 transition-all cursor-pointer"
                      >
                        {DIFFICULTY_OPTIONS.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 bg-surface-container-lowest p-3 rounded-2xl min-h-[56px] items-center">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-white/5"
                        >
                          {tag}{" "}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-white"
                          >
                            <span className="material-symbols-outlined text-xs">
                              close
                            </span>
                          </button>
                        </span>
                      ))}
                      <select
                        onChange={handleTagSelect}
                        className="bg-transparent text-xs text-white focus:outline-none w-28"
                      >
                        <option value="">Add tag...</option>
                        {TAG_OPTIONS.filter(
                          (opt) => !form.tags.includes(opt),
                        ).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Content
                </h2>
                <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-white/5">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={8}
                    className="w-full bg-transparent border-none p-6 text-on-background font-mono text-sm focus:ring-0 resize-none leading-relaxed"
                    placeholder="Write problem description in Markdown..."
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                    Constraints
                  </label>
                  <textarea
                    name="constraints"
                    value={form.constraints}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 px-6 text-zinc-300 font-mono text-xs focus:ring-2 ring-white/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Test Cases
                  </h2>
                  <span className="text-xs text-zinc-500 font-mono">
                    {form.testCases.length} defined
                  </span>
                </div>
                <div className="space-y-4">
                  {form.testCases.map((tc, idx) => (
                    <div
                      key={idx}
                      className="bg-black rounded-3xl border border-white/5 p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-zinc-400">
                          Case #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeTestCase(idx)}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={tc.input}
                        onChange={(e) =>
                          updateTestCase(idx, "input", e.target.value)
                        }
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 font-mono text-xs text-white resize-none focus:ring-1 ring-white/20"
                        placeholder="Input"
                      />
                      <textarea
                        rows={2}
                        value={tc.expectedOutput}
                        onChange={(e) =>
                          updateTestCase(idx, "expectedOutput", e.target.value)
                        }
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 font-mono text-xs text-white resize-none focus:ring-1 ring-white/20"
                        placeholder="Expected output"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tc.isPublic}
                          onChange={(e) =>
                            updateTestCase(idx, "isPublic", e.target.checked)
                          }
                          className="w-4 h-4 rounded bg-zinc-800 border-none text-white focus:ring-0"
                        />
                        <span className="text-xs text-zinc-400">
                          Public (visible in preview)
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={addTestCase}
                      className="flex-1 py-4 rounded-3xl border-2 border-dashed border-white/5 text-zinc-500 font-bold text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">add</span> Add
                      Test Case
                    </button>
                    <label className="flex-1 py-4 rounded-3xl border-2 border-dashed border-white/5 text-zinc-500 font-bold text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <span className="material-symbols-outlined">
                        upload_file
                      </span>{" "}
                      Bulk Upload
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Starter Code
                </h2>
                <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-white/5">
                  <div className="flex bg-white/5 p-1 border-b border-white/5 gap-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setActiveLang(lang)}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${activeLang === lang ? "bg-white text-black shadow-xl" : "text-zinc-400 hover:text-white"}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <Editor
                    height="250px"
                    language={getMonacoLang(activeLang)}
                    value={form.starterCode[activeLang]}
                    onChange={(val) =>
                      handleStarterCodeChange(activeLang, val || "")
                    }
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                      Time Limit (ms)
                    </label>
                    <input
                      type="number"
                      name="timeLimitMs"
                      value={form.timeLimitMs}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white font-mono focus:ring-2 ring-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">
                      Memory Limit (MB)
                    </label>
                    <input
                      type="number"
                      name="memoryLimitMb"
                      value={form.memoryLimitMb}
                      onChange={handleChange}
                      className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white font-mono focus:ring-2 ring-white/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 rounded-3xl bg-white text-black font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {submitting ? "Publishing..." : "Submit Problem to Production"}
              </button>
              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${message.type === "error" ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"}`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>

          {/* RIGHT LIVE PREVIEW PANEL */}
          <div className="w-[60%] h-full bg-background relative border-l border-white/5 p-8 flex flex-col gap-6">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">
                Live Preview Mode
              </span>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col opacity-80 select-none pointer-events-none">
              <div className="h-14 bg-surface-container-lowest flex items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-6">
                  <span className="text-white font-bold text-sm">
                    Description
                  </span>
                  <span className="text-zinc-500 font-medium text-sm">
                    Editorial
                  </span>
                  <span className="text-zinc-500 font-medium text-sm">
                    Solutions
                  </span>
                  <span className="text-zinc-500 font-medium text-sm">
                    Submissions
                  </span>
                </div>
                <span className="material-symbols-outlined text-zinc-500 text-lg">
                  settings
                </span>
              </div>
              <div className="flex-1 flex overflow-hidden">
                {/* Problem description side */}
                <div className="w-[45%] h-full p-8 space-y-6 overflow-y-auto bg-surface-container-low border-r border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {form.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${form.difficulty === "Easy" ? "bg-green-500/10 text-green-500 border-green-500/20" : form.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}
                    >
                      {form.difficulty}
                    </span>
                  </div>

                  {/* Markdown description */}
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-4 leading-relaxed">{children}</p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mt-6 mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold mt-5 mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-bold mt-4 mb-2">
                            {children}
                          </h3>
                        ),
                        pre: ({ children }) => (
                          <pre className="mb-4 p-3 bg-zinc-800 rounded-lg overflow-auto text-xs">
                            {children}
                          </pre>
                        ),
                        code: ({ children }) => (
                          <code className="bg-zinc-800 px-1 rounded text-sm">
                            {children}
                          </code>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 mb-4 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-zinc-300">{children}</li>
                        ),
                      }}
                    >
                      {form.description}
                    </ReactMarkdown>
                  </div>

                  {/* Sample Test Cases */}
                  {publicTestCases.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                        Sample Test Cases
                      </h4>
                      {publicTestCases.map((tc, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-900 rounded-2xl p-4 border border-white/5 space-y-2"
                        >
                          <p className="font-mono text-xs break-all">
                            <span className="text-zinc-500">Input:</span>{" "}
                            {tc.input}
                          </p>
                          <p className="font-mono text-xs break-all">
                            <span className="text-zinc-500">
                              Expected Output:
                            </span>{" "}
                            {tc.expectedOutput}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Constraints as bullet list – each line on its own row */}
                  {form.constraints && (
                    <div className="space-y-2 pt-4">
                      <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                        Constraints
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {form.constraints
                          .split("\n")
                          .filter((line) => line.trim())
                          .map((line, idx) => (
                            <li
                              key={idx}
                              className="text-xs font-mono text-zinc-400"
                            >
                              {line}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Topics (tags) */}
                  {form.tags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">
                        Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {form.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-zinc-800/50 text-zinc-400 px-2.5 py-1 rounded text-[10px] font-medium border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Editor Side – clickable dropdown */}
                <div className="flex-1 flex flex-col bg-zinc-950">
                  <div className="h-12 flex items-center px-4 justify-between bg-zinc-900/50 border-b border-white/5">
                    <div className="pointer-events-auto">
                      <select
                        value={previewLang}
                        onChange={(e) => setPreviewLang(e.target.value)}
                        className="bg-white/10 text-white text-xs font-bold rounded-md px-3 py-1 border border-white/20 cursor-pointer focus:outline-none"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-zinc-500 text-sm">
                        play_arrow
                      </span>
                      <span className="material-symbols-outlined text-zinc-500 text-sm">
                        terminal
                      </span>
                    </div>
                  </div>
                  <Editor
                    height="calc(100% - 48px)"
                    language={getMonacoLang(previewLang)}
                    value={form.starterCode[previewLang]}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      scrollBeyondLastLine: false,
                    }}
                  />
                  <div className="p-4 bg-zinc-900/50 flex justify-end gap-3 pointer-events-none">
                    <div className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-500 text-xs font-bold">
                      Run Code
                    </div>
                    <div className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-bold">
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center px-4">
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-600">
                    Memory Pressure
                  </p>
                  <p className="text-xs text-white font-mono">
                    0.0 MB / {form.memoryLimitMb} MB
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-600">
                    Runtime Goal
                  </p>
                  <p className="text-xs text-white font-mono">
                    &lt; {form.timeLimitMs}ms
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProblemUploadInterface;
