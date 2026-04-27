import React from "react";
import { useAuth } from "../context/AuthContext";

const UserSettingsPage = () => {
  const { user } = useAuth();

  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23333333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaaaaa' font-size='14' font-family='monospace'%3E%3C/text%3E%3C/svg%3E";
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="pt-32 pb-20 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Profile Card & Navigation Anchors */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-8 sticky top-32 border border-outline-variant/10">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative group cursor-pointer mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-fixed-dim/30 group-hover:border-primary transition-colors duration-500">
                    <img src={avatarUrl} alt="User profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-on-primary h-8 w-8 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{user?.name || "Adrian Thorne"}</h3>
                <p className="text-secondary text-sm font-mono tracking-tighter">@{user?.username || "athorne_obsidian"}</p>
              </div>
              <div className="space-y-1">
                <a href="#profile" className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high text-white group">
                  <span className="flex items-center gap-3"><span className="material-symbols-outlined text-lg">account_circle</span> Profile</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </a>
                <a href="#editor" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 text-secondary group-hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">terminal</span> Editor Preferences</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </a>
                <a href="#security" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 text-secondary group-hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">verified_user</span> Account & Security</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </a>
                <a href="#notifications" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-high transition-colors group">
                  <span className="flex items-center gap-3 text-secondary group-hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">notifications_active</span> Notifications</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Sections */}
          <div className="lg:col-span-8 space-y-12">
            {/* Profile Settings */}
            <section id="profile" className="bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-mono text-secondary uppercase tracking-widest">General</span>
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">Display Name</label>
                    <input className="w-full bg-surface-container-low border-none rounded-lg p-4 text-white focus:ring-2 focus:ring-primary/20 transition-all" type="text" defaultValue={user?.name || "Adrian Thorne"} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">Public Username</label>
                    <input className="w-full bg-surface-container-low border-none rounded-lg p-4 text-white focus:ring-2 focus:ring-primary/20 transition-all font-mono" type="text" defaultValue={user?.username || "athorne_obsidian"} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">Biography</label>
                  <textarea className="w-full bg-surface-container-low border-none rounded-lg p-4 text-white focus:ring-2 focus:ring-primary/20 transition-all resize-none" rows="3" defaultValue="Architecting the future of digital editorial workflows." />
                </div>
              </div>
            </section>

            {/* Editor Preferences */}
            <section id="editor" className="bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-white">Editor Preferences</h2>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-mono text-secondary uppercase tracking-widest">Interface</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">Font Family</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="flex items-center justify-between p-4 rounded-lg bg-primary text-on-primary font-mono text-sm">
                      JetBrains Mono <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </button>
                    <button className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low text-secondary hover:text-white transition-colors text-sm">
                      Inter sans-serif
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">Editor Theme</label>
                  <div className="flex flex-wrap gap-4">
                    <button className="h-12 w-12 rounded-full bg-[#000000] border-2 border-primary flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                    </button>
                    <button className="h-12 w-12 rounded-full bg-[#0F172A] border-2 border-transparent hover:border-outline-variant flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    </button>
                  </div>
                  <p className="text-[10px] text-secondary-fixed-dim uppercase tracking-tighter">Current: ObsCode Night</p>
                </div>
              </div>
              <div className="mt-10 p-6 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">terminal</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Vim Mode</p>
                    <p className="text-xs text-secondary">Enable modal editing for high-speed workflows</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </div>
            </section>

            {/* Account & Security */}
            <section id="security" className="bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-white">Account & Security</h2>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-mono text-secondary uppercase tracking-widest">Secure</span>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface-container-low rounded-xl gap-4">
                  <div>
                    <p className="text-white font-bold">Email Address</p>
                    <p className="text-sm text-secondary">{user?.email || "a.thorne@obsidianeditorial.io"}</p>
                  </div>
                  <button className="bg-surface-container-high text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-surface-variant transition-colors">Update Email</button>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-secondary">Enhance security with an extra verification step</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10">
              <button className="w-full sm:w-auto text-secondary hover:text-white px-8 py-4 rounded-full font-bold transition-colors">Discard Changes</button>
              <button className="w-full sm:w-auto bg-primary text-on-primary px-12 py-4 rounded-full font-bold shadow-[0px_10px_30px_rgba(255,255,255,0.1)] transition-transform active:scale-95">Save Preferences</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
