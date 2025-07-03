import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ติดตามการ scroll เพื่อปรับ navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`navbar component bg-base-100/80 backdrop-blur-sm border-b border-base-content/10 fixed top-0 z-50 transition-all duration-700 ease-in-out left-1/2 transform -translate-x-1/2 ${isScrolled
      ? 'w-[95%] lg:w-[1280px] mt-2 shadow-lg rounded-full scale-100'
      : 'w-[95%] lg:w-[80%] mt-4 shadow-md rounded-full scale-100'
      }`}>
      <div className="navbar-start">
        <div className="relative">
          <button
            className="btn btn-ghost lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className={`absolute top-full left-0 mt-4 w-64 bg-base-100/95 backdrop-blur-sm rounded-2xl border border-base-content/10 shadow-xl z-50 p-4 transition-all duration-300 ease-in-out transform ${isMenuOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
            }`}>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => smoothScrollTo('hero')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo('about')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo('experience')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('work')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo('skills')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('skills')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo('projects')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('projects')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollTo('contact')}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {t('contact')}
                </button>
              </li>

              {/* Language Toggle for Mobile */}
              <li className="pt-4 border-t border-base-content/10">
                <button
                  onClick={toggleLanguage}
                  className="w-full text-left py-3 px-4 rounded-lg transition-all duration-200 text-base font-medium flex items-center justify-between"
                >
                  <span>{t('language')}</span>
                  <span className="text-base-content/60 font-medium">{language.toUpperCase()}</span>
                </button>
              </li>

              {/* Theme Toggle for Mobile */}
              {mounted && (
                <li className="pt-2">
                  <label className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium cursor-pointer">
                    <span>Theme</span>
                    <label className="toggle toggle-sm">
                      <input
                        type="checkbox"
                        checked={theme === 'corporate'}
                        onChange={toggleTheme}
                      />
                      <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
                      <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
                    </label>
                  </label>
                </li>
              )}
            </ul>
          </div>
        </div>
        <button
          onClick={() => smoothScrollTo('hero')}
          className={`btn btn-ghost hover:bg-transparent hover:border-transparent hover:shadow-none transition-all duration-300 ease-in-out p-0 ${isScrolled ? 'text-lg' : 'text-xl'}`}
          data-font="english"
          style={{ minWidth: 0 }}
        >
          <span className="p-2">
            <img
              src="/img/icon.png"
              alt="Peeranat Logo"
              className="w-10 h-10 object-contain"
            />
          </span>
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <button
              onClick={() => smoothScrollTo('hero')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('home')}
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollTo('about')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('about')}
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollTo('experience')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('work')}
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollTo('skills')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('skills')}
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollTo('projects')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('projects')}
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollTo('contact')}
              className="text-base-content/80 transition-all duration-300 ease-in-out"
            >
              {t('contact')}
            </button>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="btn btn-ghost btn-sm rounded-full border border-base-content/20 transition-all duration-300 ease-in-out shadow-sm hidden sm:flex"
        >
          <span className="font-medium text-sm">{language.toUpperCase()}</span>
        </button>

        {/* Theme Toggle */}
        {mounted && (
          <label className="toggle toggle-sm text-base-content">
            <input
              type="checkbox"
              checked={theme === 'corporate'}
              onChange={toggleTheme}
            />
            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
          </label>
        )}
      </div>
    </div>
  );
}