import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  HardDrive,
  Database,
  BookOpen,
  Lightbulb,
  GraduationCap,
  User,
  Home,
  Mail,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { PageId } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  googleUser: FirebaseUser | null;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
  isAuthenticating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  googleUser,
  onGoogleSignIn,
  onGoogleSignOut,
  isAuthenticating,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Utama', icon: Home },
    { id: 'profile', label: 'Biodata', icon: User },
    { id: 'teaching', label: 'Pengajaran', icon: GraduationCap },
    { id: 'innovations', label: 'Inovasi', icon: Lightbulb },
    { id: 'publications', label: 'Penerbitan', icon: BookOpen },
    { id: 'database', label: 'Database', icon: Database, badge: 'Dinamik' },
    { id: 'drive', label: 'Google Drive', icon: HardDrive, badge: 'Cloud' },
    { id: 'contact', label: 'Hubungi', icon: Mail },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white text-[11px] sm:text-xs py-1 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Portal Rasmi Akademik Ts. / En. Nasrul Effendy bin Mat Nasir (PTSS) • Hub Pangkalan Data & Google Drive</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                NE
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base tracking-tight group-hover:text-indigo-600 transition-colors">
                  Nadz Effendy
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200/60 hidden sm:inline-block">
                  DH12 PTSS
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                Jabatan Teknologi Maklumat & Komunikasi
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                        item.id === 'drive'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar (Search & Google Auth) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs border border-transparent hover:border-slate-200"
              title="Carian Pantas (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-slate-400 text-[11px] font-mono px-1 bg-slate-100 rounded-xs">
                ⌘K
              </span>
            </button>

            {/* Google Drive / Auth Status Pill */}
            {googleUser ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-1 pr-2">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName || 'Google User'}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {(googleUser.displayName || googleUser.email || 'G').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-800 max-w-[100px] truncate leading-tight">
                    {googleUser.displayName || 'Google User'}
                  </span>
                  <span className="text-[9px] text-emerald-600 flex items-center gap-0.5 font-medium leading-none">
                    <ShieldCheck className="w-2.5 h-2.5" /> Drive Aktif
                  </span>
                </div>
                <button
                  onClick={onGoogleSignOut}
                  title="Log Keluar Google"
                  className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-white transition-colors cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer disabled:opacity-60"
              >
                <div className="w-3.5 h-3.5">
                  <svg viewBox="0 0 48 48" className="w-full h-full">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                </div>
                <span>Sambung Drive</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Auth button */}
          <div className="pt-3 border-t border-slate-100">
            {googleUser ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {(googleUser.displayName || 'G').charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{googleUser.displayName || 'Google User'}</p>
                    <p className="text-[10px] text-slate-500">{googleUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={onGoogleSignOut}
                  className="px-2 py-1 text-xs text-red-600 font-semibold hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  Log Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer"
              >
                <span>Sambung ke Google Drive</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
