import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('Median of Two Sorted Arrays')
  const [slug, setSlug] = useState('median-two-sorted-arrays')
  const [difficulty, setDifficulty] = useState('Hard')
  const [tags, setTags] = useState(['Array', 'Binary Search', 'Divide and Conquer'])
  const [description, setDescription] = useState('Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\nExample 1:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.')
  const [constraints, setConstraints] = useState('nums1.length == m\nnums2.length == n\n0 <= m, n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6')
  const [activeLang, setActiveLang] = useState('C++')

  const languages = ['C++', 'Java', 'JS', 'Python']

  return (
    <div className="min-h-screen bg-black text-on-background font-body">
      {/* Success Toast */}
      <div className="fixed top-8 right-8 z-[100] flex items-center gap-4 bg-surface-container-highest p-4 pr-8 rounded-3xl shadow-2xl border border-white/5 animate-in fade-in slide-in-from-top-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-950">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm tracking-tight">Changes Auto-saved</p>
          <p className="text-zinc-400 text-xs">Problem draft updated 2s ago</p>
        </div>
      </div>

      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 h-full z-50 flex flex-col justify-between bg-zinc-950 dark:bg-[#0E0E0E] w-20 items-center py-8">
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="font-['JetBrains_Mono'] font-bold text-white tracking-tighter text-xl">O.</div>
          <div className="flex flex-col gap-4">
            <a className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform" href="#">
              <span className="material-symbols-outlined">dashboard</span>
            </a>
            <a className="bg-white text-zinc-950 rounded-3xl p-3 shadow-2xl scale-110" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
            </a>
            <a className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform" href="#">
              <span className="material-symbols-outlined">history</span>
            </a>
            <a className="text-zinc-500 hover:text-white transition-colors duration-300 p-3 hover:bg-zinc-800 rounded-3xl scale-95 active:scale-90 transition-transform" href="#">
              <span className="material-symbols-outlined">bar_chart</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <a className="text-zinc-500 hover:text-white transition-colors duration-300 p-3" href="#">
            <span className="material-symbols-outlined">help_outline</span>
          </a>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <img alt="Admin profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC51_gu_2CNVUmfVLBaIpmLO4vVGFa4IT_SYMkDus0OoAGhS9psywTNS9uCH9ZtJrBmxAf0fN5MY0dsZMwmovN15RXjF4o4HmXGv0Up293vfp2z_MZPczeyRm-8W7BrPfTPlJrvc2BukZb81CVbXdJu6hnXoJ51aghOhiD4_cikpKFCN05W4dBLmF9D6yILwAvbXOC_qvFYImnybKHpP4_RBzbYOknXTRKBNFY-URFux6XjeI3buPcf5NsSGUbfHeelgGthB017KweE" />
          </div>
        </div>
      </nav>

      <main className="ml-20 h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center px-12 h-16 w-full bg-[#131313]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-8">
            <span className="text-lg font-black text-white uppercase tracking-tighter">Editor</span>
            <div className="flex gap-6 items-center">
              <a className="text-zinc-500 font-medium font-['Inter'] text-sm uppercase tracking-widest hover:text-white transition-opacity duration-200" href="#">Drafts</a>
              <a className="text-white font-bold border-b-2 border-white pb-1 font-['Inter'] text-sm uppercase tracking-widest" href="#">New Problem</a>
              <a className="text-zinc-500 font-medium font-['Inter'] text-sm uppercase tracking-widest hover:text-white transition-opacity duration-200" href="#">Templates</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-full font-bold text-sm bg-surface-container-highest text-white hover:bg-surface-bright transition-all">Save Draft</button>
            <button className="px-8 py-2 rounded-full font-bold text-sm bg-white text-zinc-950 shadow-lg shadow-white/5 hover:scale-105 active:scale-95 transition-all">Publish</button>
            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white">notifications</span>
          </div>
        </header>

        {/* Body Layout */}
        <section className="flex-1 flex overflow-hidden">
          {/* Left Panel: Problem Creator Form */}
          <div className="w-[40%] h-full overflow-y-auto custom-scrollbar bg-surface-container-low px-12 py-10">
            <div className="max-w-xl mx-auto space-y-12">
              {/* Basic Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Core Details</h2>
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Problem Title</label>
                    <input
                      className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 px-6 text-white focus:ring-2 ring-white/20 transition-all text-lg font-medium"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">URL Slug</label>
                      <div className="relative">
                        <input
                          className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 pr-12 text-zinc-300 font-mono text-xs focus:ring-2 ring-white/20 transition-all"
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                          <span className="material-symbols-outlined text-sm">refresh</span>
                        </button>
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Difficulty</label>
                      <div className="relative">
                        <select
                          className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white appearance-none focus:ring-2 ring-white/20 transition-all cursor-pointer"
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center">
                          <div className={`w-2 h-2 rounded-full ${difficulty === 'Easy' ? 'bg-green-500' : difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} shadow-[0_0_8px_rgba(239,68,68,0.5)]`}></div>
                        </div>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Tags</label>
                    <div className="flex flex-wrap gap-2 bg-surface-container-lowest p-3 rounded-2xl min-h-[56px] items-center">
                      {tags.map((tag, idx) => (
                        <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-white/5">
                          {tag} <button className="hover:text-white" onClick={() => setTags(tags.filter((_, i) => i !== idx))}><span className="material-symbols-outlined text-xs">close</span></button>
                        </span>
                      ))}
                      <input
                        className="bg-transparent border-none focus:ring-0 text-xs w-24 text-white"
                        placeholder="Add tag..."
                        type="text"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value) {
                            setTags([...tags, e.target.value])
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Editor */}
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Content</h2>
                <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-white/5">
                  <div className="flex items-center gap-1 p-2 bg-white/5 border-b border-white/5">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><span className="material-symbols-outlined text-sm">format_bold</span></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><span className="material-symbols-outlined text-sm">format_italic</span></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><span className="material-symbols-outlined text-sm">code</span></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><span className="material-symbols-outlined text-sm">format_list_bulleted</span></button>
                    <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400"><span className="material-symbols-outlined text-sm">link</span></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 ml-auto"><span className="material-symbols-outlined text-sm">help_outline</span></button>
                  </div>
                  <textarea
                    className="w-full h-64 bg-transparent border-none p-6 text-on-background font-mono text-sm focus:ring-0 resize-none leading-relaxed"
                    placeholder="Write problem description in Markdown..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Constraints</label>
                  <textarea
                    className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 px-6 text-zinc-300 font-mono text-xs focus:ring-2 ring-white/20 transition-all h-24"
                    placeholder="One constraint per line..."
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                  />
                </div>
              </div>

              {/* Test Cases */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Test Cases</h2>
                  <span className="text-xs text-zinc-500 font-mono">1 Defined</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-black rounded-3xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Input</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Expected Output</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500 w-20 text-center">Public</th>
                          <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500 w-20 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-mono text-xs text-zinc-400">nums1 = [1,3], nums2 = [2]</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-mono text-xs text-zinc-400">2.00000</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input defaultChecked className="w-4 h-4 rounded bg-zinc-800 border-none text-white focus:ring-0 cursor-pointer" type="checkbox" />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-zinc-600 hover:text-red-400 transition-colors">
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-4 rounded-3xl border-2 border-dashed border-white/5 text-zinc-500 font-bold text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">add</span>
                      Add Test Case
                    </button>
                    <button className="flex-1 py-4 rounded-3xl border-2 border-dashed border-white/5 text-zinc-500 font-bold text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">upload_file</span>
                      Bulk Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Settings */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Code & Limits</h2>
                <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-white/5">
                  <div className="flex bg-white/5 p-1 border-b border-white/5">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${activeLang === lang ? 'bg-white text-black shadow-xl' : 'text-zinc-400 hover:text-white'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 bg-black/40 min-h-[120px] font-mono text-sm text-zinc-400">
                    <pre><code>{activeLang === 'C++' ? `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {

    }
};` : `// Solution template for ${activeLang}`}</code></pre>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Time Limit (ms)</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white focus:ring-2 ring-white/20 transition-all font-mono" type="number" defaultValue="1000" />
                  </div>
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 block px-1">Memory Limit (MB)</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-2xl py-3 px-6 text-white focus:ring-2 ring-white/20 transition-all font-mono" type="number" defaultValue="256" />
                  </div>
                </div>
              </div>

              <div className="pt-8 pb-20">
                <button className="w-full py-5 rounded-3xl bg-white text-black font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">Submit Problem to Production</button>
              </div>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="w-[60%] h-full bg-background relative border-l border-white/5 p-8 flex flex-col gap-6">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">Live Preview Mode</span>
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col opacity-80 select-none grayscale-[0.2] pointer-events-none">
              {/* Preview Nav */}
              <div className="h-14 bg-surface-container-lowest flex items-center justify-between px-6 border-b border-white/5">
                <div className="flex items-center gap-6">
                  <span className="text-white font-bold text-sm">Description</span>
                  <span className="text-zinc-500 font-medium text-sm">Editorial</span>
                  <span className="text-zinc-500 font-medium text-sm">Solutions</span>
                  <span className="text-zinc-500 font-medium text-sm">Submissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-zinc-500 text-lg">settings</span>
                </div>
              </div>
              <div className="flex-1 flex overflow-hidden">
                {/* Preview Description Area */}
                <div className="w-[45%] h-full p-8 space-y-6 overflow-y-auto bg-surface-container-low border-r border-white/5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{title.length > 15 ? title.substring(0, 15) + '...' : title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border-green-500/20' : difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{difficulty}</span>
                  </div>
                  <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 whitespace-pre-wrap">
                    {description}
                    <div className="bg-zinc-900 rounded-2xl p-4 border border-white/5 space-y-2">
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Example 1</p>
                      <p className="font-mono text-xs">Input: nums1 = [1,3], nums2 = [2]</p>
                      <p className="font-mono text-xs">Output: 2.00000</p>
                    </div>
                    <div className="space-y-2 pt-4">
                      <p className="text-[10px] font-bold uppercase text-zinc-500">Constraints</p>
                      <ul className="text-xs space-y-1 font-mono text-zinc-400">
                        {constraints.split('\n').map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Preview Editor Area */}
                <div className="flex-1 flex flex-col bg-zinc-950">
                  <div className="h-12 flex items-center px-4 justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/5 px-3 py-1 rounded-md text-[10px] font-bold text-zinc-300">{activeLang}</span>
                      <span className="material-symbols-outlined text-zinc-600 text-sm">expand_more</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-zinc-500 text-sm">play_arrow</span>
                      <span className="material-symbols-outlined text-zinc-500 text-sm">terminal</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 font-mono text-sm text-zinc-500">
                    <div className="flex gap-4">
                      <div className="text-zinc-700 flex flex-col items-end select-none">
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                      </div>
                      <div className="text-zinc-300">
                        <p><span className="text-purple-400">class</span> <span className="text-yellow-200">Solution</span> {'{'}</p>
                        <p><span className="text-purple-400">public</span>:</p>
                        <p className="pl-4"> <span className="text-blue-300">double</span> <span className="text-green-300">findMedianSortedArrays</span>(vector&lt;int&gt;&amp; nums1, ...)</p>
                        <p className="pl-4">    {'{'}</p>
                        <p className="pl-8 text-zinc-600 cursor-text">|</p>
                        <p className="pl-4">    {'}'}</p>
                        <p>{'}'};</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-900/50 flex justify-end gap-3">
                    <div className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-500 text-xs font-bold">Run Code</div>
                    <div className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-bold">Submit</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Stats/Meta for Preview */}
            <div className="flex justify-between items-center px-4">
              <div className="flex gap-12">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-zinc-600">Memory Pressure</p>
                  <p className="text-xs text-white font-mono">0.0 MB / 256.0 MB</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-zinc-600">Runtime Goal</p>
                  <p className="text-xs text-white font-mono">&lt; 1000ms</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              </div>
            </div>
            {/* Gradient Glow Elements for Atmosphere */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
