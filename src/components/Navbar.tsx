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
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { AvatarDisplay } from './AvatarDisplay';
import { PERSONAL_INFO } from '../data/nadzEffendyData';

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

  const navItems: { id: PageId; label: string; icon?: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Utama' },
    { id: 'profile', label: 'Profil & Biodata' },
    { id: 'teaching', label: 'Pengajaran' },
    { id: 'innovations', label: 'Inovasi' },
    { id: 'publications', label: 'Penyelidikan' },
    { id: 'database', label: 'Pangkalan Data', badge: 'Dinamik' },
    { id: 'drive', label: 'Google Drive', badge: 'Cloud' },
    { id: 'contact', label: 'Hubungi' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/60194090902?text=${encodeURIComponent(
    'Assalamualaikum En. Nasrul Effendy, saya ingin berhubung berkenaan kolaborasi/jemputan penceramah/akademik.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800/80 flex items-center justify-center gap-2 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Portal Rasmi En. Nasrul Effendy bin Mat Nasir (PTSS) • Hub Pangkalan Data & Google Drive</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name (Styled like amirulhelmi.my) */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
          >
            <AvatarDisplay size="sm" allowUpload={false} />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-white text-base tracking-tight group-hover:text-amber-400 transition-colors truncate">
                  Nasrul Effendy
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/40 hidden sm:inline-block">
                  DH12
                </span>
              </div>
              <span className="text-[11px] text-slate-400 truncate font-medium">
                Politeknik Tuanku Syed Sirajuddin • JTMK
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-white/10 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.id === 'drive' && <span className="text-amber-400 font-mono text-sm">▣</span>}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                        item.id === 'drive'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search + WhatsApp + Google Drive */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Spotlight Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs border border-slate-800"
              title="Carian Pantas (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-slate-500 text-[10px] font-mono px-1 bg-slate-900 rounded-xs">
                ⌘K
              </span>
            </button>

            {/* Direct WhatsApp CTA Button (Exactly like amirulhelmi.my) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Google Drive Status Button */}
            {googleUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 pr-2">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName || 'Google'}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-700"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                    {(googleUser.displayName || 'G').charAt(0)}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-200 max-w-[90px] truncate leading-tight">
                    {googleUser.displayName || 'Drive Aktif'}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5" /> Bersambung
                  </span>
                </div>
                <button
                  onClick={onGoogleSignOut}
                  title="Log Keluar Google"
                  className="p-1 text-slate-400 hover:text-red-400 rounded-md transition-colors cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all cursor-pointer disabled:opacity-60"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>Drive</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors text-left flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-xs font-bold text-white bg-emerald-600 rounded-xl"
            >
              WhatsApp En. Nasrul
            </a>
            <button
              onClick={onGoogleSignIn}
              className="py-2 px-3 text-xs font-bold bg-slate-900 border border-slate-800 text-amber-400 rounded-xl"
            >
              Google Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
