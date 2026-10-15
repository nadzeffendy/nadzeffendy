import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { TeachingPage } from './pages/TeachingPage';
import { InnovationsPage } from './pages/InnovationsPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { DatabaseHubPage } from './pages/DatabaseHubPage';
import { GoogleDrivePage } from './pages/GoogleDrivePage';
import { ContactPage } from './pages/ContactPage';
import { initAuth, googleSignIn, logout } from './services/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Initialize Auth Listener with in-memory token cache
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
      },
      () => {
        // Not authenticated or token expired
        setGoogleUser(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Global keydown for Search shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setGoogleUser(res.user);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      // Helpful friendly message
      alert(err.message || 'Log masuk Google Drive dibatalkan atau menghadapi ralat.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logout();
      setGoogleUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        googleUser={googleUser}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        isAuthenticating={isAuthenticating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            googleConnected={!!googleUser}
          />
        )}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'teaching' && <TeachingPage onNavigate={handleNavigate} />}
        {currentPage === 'innovations' && <InnovationsPage onNavigate={handleNavigate} />}
        {currentPage === 'publications' && <PublicationsPage onNavigate={handleNavigate} />}
        {currentPage === 'database' && <DatabaseHubPage />}
        {currentPage === 'drive' && (
          <GoogleDrivePage
            googleUser={googleUser}
            onGoogleSignIn={handleGoogleSignIn}
            isAuthenticating={isAuthenticating}
          />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
