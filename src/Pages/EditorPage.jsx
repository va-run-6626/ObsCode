import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

const EditorPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newWidth > 20 && newWidth < 80) {
        setLeftPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const defaultCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Use a hash map for O(n) lookup
        prevMap = {} # val : index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i

        return []`;

  return (
    <div className="flex h-screen bg-black text-on-background font-body selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
      {/* SideNavBar Component */}
      <aside className="fixed left-0 top-0 h-full z-50 flex flex-col items-center py-8 bg-[#131313] rounded-r-[24px] w-20 hover:w-64 transition-all duration-300 shadow-[0px_20px_40px_rgba(0,0,0,0.4)] font-['Inter'] tracking-tight group overflow-hidden">
        <div className="mb-10 px-6 flex items-center w-full">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#131313] text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                terminal
              </span>
            </div>
            <span className="ml-4 text-white font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Obsidian
            </span>
          </Link>
        </div>
        <nav className="flex flex-col gap-4 w-full px-4">
          {[
            { icon: "grid_view", label: "Dashboard", active: false, path: "/admin/dashboard" },
            { icon: "code", label: "Editor", active: true, path: "/editor" },
            { icon: "list_alt", label: "Problems", active: false, path: "/problems" },
            { icon: "history", label: "Submissions", active: false, path: "/submissions" },
            { icon: "settings", label: "Settings", active: false, path: "/settings" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`${
                item.active ? "bg-white text-[#131313]" : "text-[#C7C6C6] hover:text-white hover:bg-[#353535]"
              } rounded-full p-3 flex items-center transition-all duration-200 group/item`}
            >
              <span
                className="material-symbols-outlined"
                style={item.active ? { fontVariationSettings: '"FILL" 1' } : {}}
              >
                {item.icon}
              </span>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="mt-auto px-6 w-full flex items-center">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 overflow-hidden">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyG4RH2bJ4ubiJhF0YDlJKFXpgae1GVO8RiaGa_QkyK6VGc6_r0zPpkCfqLHXQePwzKiv1C-FHF1_jK_UYtguxt7lEYw1_6jrPOeE3oW0zaCvMkP4N1t_pS7Ye9H7Zp_dd3tdkHWu-SQgKPyBH0jaoxVd9rdgs3sFEMWTASjD1bTJh3l1_3OCUfyOdNq7zejnTQvZfyOFJEaAXDnwxNq4Z5lv_961VIBOJ3eGkL96gYiC2arhmi8lXQ6wYa2i3AtOY9b8gstTO7TN0"
            />
          </div>
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-xs font-bold text-white leading-none">User Profile</p>
            <p className="text-[10px] text-secondary">Pro Editor</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-20 flex flex-col min-w-0">
        {/* TopNavBar Component */}
        <header className="bg-[#131313]/70 backdrop-blur-xl flex justify-between items-center px-12 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter text-white">Obs Play</h1>
            <nav className="hidden md:flex items-center gap-6 font-medium">
              <Link className="text-[#C7C6C6] hover:text-white transition-opacity opacity-80 hover:opacity-100" to="#">Explorer</Link>
              <Link className="text-white border-b-2 border-white pb-1 opacity-80 hover:opacity-100" to="#">Debugger</Link>
              <Link className="text-[#C7C6C6] hover:text-white transition-opacity opacity-80 hover:opacity-100" to="#">Terminal</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-sm">search</span>
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
        <main ref={containerRef} className="flex-1 flex overflow-hidden relative">
          {/* Left Panel */}
          <section
            style={{ width: `${leftPanelWidth}%` }}
            className="flex flex-col h-full bg-background border-r border-outline-variant/10 min-w-0"
          >
            {/* Tabs Header */}
            <div className="px-12 pt-6 flex items-center gap-8 border-b border-outline-variant/10">
              {["description", "editorial", "submissions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold transition-all capitalize ${
                    activeTab === tab ? "text-white border-b-2 border-white" : "text-outline hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-12 py-10 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                {activeTab === "description" && (
                  <div className="prose prose-invert prose-p:text-on-surface-variant prose-headings:text-white prose-code:text-white prose-code:bg-surface-container-low prose-code:px-1 prose-code:rounded">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-surface-container-high text-xs font-mono px-3 py-1 rounded-full text-secondary">HARD</span>
                      <span className="text-xs font-mono text-outline">Problem #402</span>
                    </div>
                    <h1>0x01 Array Decryption</h1>
                    <p>Given an array of integers <code>nums</code> and a target value <code>sum</code>, return the indices of the two numbers such that they add up to the specific target.</p>
                    <p>You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.</p>
                    <div className="bg-surface-container-low p-8 rounded-3xl my-8 not-prose">
                      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">info</span>
                        Example Case
                      </h3>
                      <div className="space-y-4 font-mono text-sm">
                        <div>
                          <span className="text-outline">Input: </span>
                          <code className="text-white">nums = [2,7,11,15], target = 9</code>
                        </div>
                        <div>
                          <span className="text-outline">Output: </span>
                          <code className="text-white">[0,1]</code>
                        </div>
                        <div className="text-secondary italic text-xs">
                          Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                        </div>
                      </div>
                    </div>
                    <p>The solution must be optimized for <code>O(n)</code> time complexity. Any quadratic approach will be rejected by the editorial judge.</p>
                  </div>
                )}
                {activeTab === "editorial" && (
                  <div className="prose prose-invert prose-p:text-on-surface-variant prose-headings:text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-secondary text-sm">history_edu</span>
                      <span className="text-xs font-mono text-outline">Author: Senior Editorial Judge</span>
                    </div>
                    <h1>Official Editorial</h1>
                    <p>The Two Sum problem is a classic application of hash maps to trade memory for time complexity. While a brute force solution checks every pair, we can do much better.</p>
                    <h2>Approach: One-pass Hash Map</h2>
                    <p>While we iterate and inserting elements into the table, we also look back to check if current element's complement already exists in the table. If it exists, we have found a solution and return the indices immediately.</p>
                    <div className="bg-surface-container-low p-6 rounded-3xl my-6 font-mono text-xs not-prose">
                      <div className="flex flex-col gap-1">
                        <p><span className="text-blue-400">def</span> <span className="text-green-300">solve</span>(nums, target):</p>
                        <p className="pl-4">hashmap = {"{}"}</p>
                        <p className="pl-4"><span className="text-blue-400">for</span> i, n <span className="text-blue-400">in</span> enumerate(nums):</p>
                        <p className="pl-8">complement = target - n</p>
                        <p className="pl-8"><span className="text-blue-400">if</span> complement <span className="text-blue-400">in</span> hashmap:</p>
                        <p className="pl-12"><span className="text-blue-400">return</span> [hashmap[complement], i]</p>
                        <p className="pl-8">hashmap[n] = i</p>
                      </div>
                    </div>
                    <h2>Complexity Analysis</h2>
                    <ul className="list-disc pl-5 space-y-2 text-on-surface-variant text-sm">
                      <li><strong>Time Complexity:</strong> O(n). We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.</li>
                      <li><strong>Space Complexity:</strong> O(n). The extra space required depends on the number of items stored in the hash map, which stores at most n elements.</li>
                    </ul>
                  </div>
                )}
                {activeTab === "submissions" && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6">Past Submissions</h2>
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
                            { status: "Accepted", runtime: "32 ms", memory: "14.2 MB", date: "Nov 22, 2023", color: "text-green-400" },
                            { status: "Wrong Answer", runtime: "--", memory: "14.1 MB", date: "Nov 22, 2023", color: "text-red-400" },
                            { status: "Accepted", runtime: "45 ms", memory: "14.3 MB", date: "Oct 15, 2023", color: "text-green-400" },
                          ].map((sub, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className={`px-6 py-4 font-bold ${sub.color}`}>{sub.status}</td>
                              <td className="px-6 py-4 text-white">{sub.runtime}</td>
                              <td className="px-6 py-4 text-outline">{sub.memory}</td>
                              <td className="px-6 py-4 text-outline-variant">{sub.date}</td>
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

          {/* Right Panel: Editor Area */}
          <section className="flex-1 flex flex-col bg-surface-container-lowest p-6 relative min-w-0">
            {/* Editor Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-surface-container-high rounded-xl px-4 py-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-secondary">language</span>
                  <select className="bg-transparent text-sm font-medium text-white border-none focus:ring-0 p-0 pr-8 outline-none">
                    <option className="bg-surface-container-high">Java 17</option>
                    <option selected className="bg-surface-container-high">Python 3.10</option>
                    <option className="bg-surface-container-high">JavaScript ES6</option>
                  </select>
                </div>
                <button className="p-2 text-outline hover:text-white transition-colors">
                  <span className="material-symbols-outlined">settings_suggest</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-outline">Last Saved: 2m ago</span>
                <button className="p-2 text-outline hover:text-white transition-colors">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Code Editor Canvas */}
            <div className="flex-1 rounded-2xl overflow-hidden relative border border-outline-variant/10 bg-[#0e0e0e]">
              <Editor
                height="100%"
                defaultLanguage="python"
                defaultValue={defaultCode}
                theme="vs-dark"
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
                  backgroundColor: "#0e0e0e"
                }}
                beforeMount={(monaco) => {
                  monaco.editor.defineTheme("obsidian-theme", {
                    base: "vs-dark",
                    inherit: true,
                    rules: [],
                    colors: {
                      "editor.background": "#0e0e0e",
                    },
                  });
                }}
                theme="obsidian-theme"
              />
            </div>

            {/* Footer Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="bg-surface-container-high text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors active:scale-95">
                  Run Test Cases
                </button>
                <button className="bg-primary text-on-primary px-10 py-3 rounded-full font-extrabold text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl">
                  Submit Solution
                </button>
              </div>
              <div className="flex items-center gap-6 text-outline">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-xs font-mono">32ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">memory</span>
                  <span className="text-xs font-mono">14.2 MB</span>
                </div>
              </div>
            </div>

            {/* Submission Status Floating Panel */}
            <div className="absolute bottom-28 right-12 w-80 bg-surface-container-high/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/5 transform translate-y-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Console Output</span>
                </div>
                <button className="text-outline hover:text-white">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="bg-black/30 p-4 rounded-2xl font-mono text-[11px] space-y-2 border border-white/5">
                <p className="text-green-300">✓ Test Case 1: [2,7,11,15], target=9</p>
                <p className="text-green-300">✓ Test Case 2: [3,2,4], target=6</p>
                <p className="text-outline-variant">------------------------------</p>
                <p className="text-white">Status: <span className="font-bold text-green-300">Accepted</span></p>
                <p className="text-outline-variant">Runtime: Faster than 98.2% of Python3</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Subtle Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
    </div>
  );
};

export default EditorPage;
