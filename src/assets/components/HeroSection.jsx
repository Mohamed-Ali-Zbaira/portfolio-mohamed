// Fichier: HeroSection.js (Code Corrigé et Complet)

import React, { useEffect, useState, useRef } from 'react';

import { Bio } from '../../data/portfolioData';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../translations';
import DownloadResumeModal from './DownloadResumeModal';


export const HeroSection = () => {

    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const [showNavbar, setShowNavbar] = useState(true);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Show navbar only while the hero section is visible (i.e. on the "first page").
    useEffect(() => {
        const updateNavbarVisibility = () => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            // Show navbar while any meaningful part of hero is visible.
            setShowNavbar(rect.bottom > 60);
        };

        updateNavbarVisibility();
        window.addEventListener('scroll', updateNavbarVisibility, { passive: true });
        window.addEventListener('resize', updateNavbarVisibility);

        return () => {
            window.removeEventListener('scroll', updateNavbarVisibility);
            window.removeEventListener('resize', updateNavbarVisibility);
        };
    }, []);

    // Fermer le menu de langue lorsque l'on clique à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setIsLangMenuOpen(false);
            }
        };

        if (isLangMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLangMenuOpen]);

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsLangMenuOpen(false);
    };

    // Fermer le menu mobile lors d'un clic sur un lien de navigation
    const handleNavLinkClick = () => {
        setIsMenuOpen(false);
    };


    return (
        <section 
            // Utilisation de min-h-screen pour s'assurer que la section couvre au moins l'écran
            // et flex-col + items-center pour centrer le contenu
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            id="home"
        >
            {/* ---------------------------------------------------- */}
            {/* 🚀 NAV BAR FIXE (Doit rester en haut du viewport) 🚀 */}
            {/* ---------------------------------------------------- */}
            {/* fixed, top-4, et z-50 garantissent la fixation */}
            <div className={`fixed inset-x-4 top-4 z-50 max-w-screen-xl mx-auto p-2 sm:p-3 lg:p-4 transition-opacity duration-300 ${showNavbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <nav className="py-2.5 bg-transparent rounded-xl">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/5">

                        <a href="#" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">{Bio.name}</span>
                        </a>

                        <div className="flex items-center gap-2 lg:order-3">

                            {/* Sélecteur de langue */}
                            <div className="relative" ref={langMenuRef}>
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition duration-150 ease-in-out text-sm"
                                    aria-label="Select language"
                                >
                                    <img 
                                        src="/traductionLogo.png" 
                                        alt="Language Selection" 
                                        className="w-10 h-10 object-cover"
                                    />
                                </button>

                                {isLangMenuOpen && (
                                    <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-40 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50`}>
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-700 transition-colors ${
                                                    language === lang.code ? 'text-blue-400 bg-gray-700' : 'text-white'
                                                }`}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* CTA visible sur desktop */}
                            <a href="#contact"
                                className="hidden lg:block text-gray-900 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none transition duration-150 ease-in-out shadow-lg">
                                {t.nav.getInTouch}
                            </a>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-controls="mobile-menu-2"
                                aria-expanded={isMenuOpen ? "true" : "false"}>
                                <span className="sr-only">Open main menu</span>
                                <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                                <svg className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Main menu (mobile & desktop) */}
                        <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full lg:flex lg:w-auto lg:order-2`} id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a href="#" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-blue-400 rounded lg:bg-transparent lg:text-blue-400 lg:p-0" aria-current="page">{t.nav.home}</a>
                                </li>
                                <li>
                                    <a href="#about" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.about}</a>
                                </li>
                                <li>
                                    <a href="#skills" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.skills}</a>
                                </li>
                                <li>
                                    <a href="#projects" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.projects}</a>
                                </li>
                                <li>
                                    <a href="#experience" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.experience}</a>
                                </li>
                                <li>
                                    <a href="#education" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.education}</a>
                                </li>

                                <li className="lg:hidden">
                                    <a href="#contact" onClick={handleNavLinkClick} className="block py-2 pl-3 pr-4 text-white border-b border-white/20 hover:bg-white/20 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-400 lg:p-0 transition duration-150 ease-in-out">{t.nav.contact}</a>
                                </li>
                            </ul>

                            {/* Mobile CTA */}
                            <div className="lg:hidden mt-4 pb-2">
                                <a href="#contact" onClick={handleNavLinkClick} className="block text-center w-full text-gray-900 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2.5 focus:outline-none transition duration-150 ease-in-out shadow-lg">{t.nav.getInTouch}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* ---------------------------------------------------- */}
            {/* FIN NAV BAR FIXE */}
            {/* ---------------------------------------------------- */}


            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Contenu principal de la section Hero */}
            {/* J'ai ajouté pt-32 ici pour pousser le contenu sous la navbar fixe */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center pt-32 pb-16 sm:pt-40 sm:pb-20">
                <div className="w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className={`text-center lg:text-left space-y-4 lg:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* Greeting */}
                            <div className="inline-block">
                                <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 block">
                                    👋 {t.hero.greeting}
                                </span>
                            </div>

                            {/* Name with gradient effect */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                                <span className="block text-white mb-1">{Bio.name.split(' ')[0]}</span>
                                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                                    {Bio.name.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>

                            {/* Roles with typing effect style */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {Object.values(t.hero.roles).map((role, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-blue-400 text-xs sm:text-sm font-medium hover:border-blue-400/50 transition-all duration-300"
                                        style={{ animationDelay: `${index * 200}ms` }}
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 line-clamp-4">
                                Welcome to my portfolio! I hope you find it insightful. Here, I've compiled a comprehensive overview of my professional journey, including my Professional Experience, core Technical Skills, a selection of my best Projects, and my Educational Background.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                                    <button
                                        onClick={() => setIsResumeModalOpen(true)}
                                        type="button"
                                        className="group relative px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 text-sm sm:text-base"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {t.hero.downloadResume}
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>

                                <a
                                    href="#contact"
                                    className="group px-6 py-3 border-2 border-blue-400 text-blue-400 font-bold rounded-lg backdrop-blur-sm bg-gray-900/30 hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/30 text-sm sm:text-base"
                                >
                                    <span className="flex items-center gap-2">
                                        {t.hero.getInTouch}
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 justify-center lg:justify-start pt-2">
                                <a
                                    href={Bio.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a
                                    href={Bio.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Right Column - Profile Image */}
                        <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                {/* Glowing ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 opacity-20 blur-2xl animate-pulse"></div>
                                
                                {/* Image container */}
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-400/30 shadow-2xl shadow-blue-500/20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
                                    <img
                                        src="/images/profile.jpg"
                                        alt={Bio.name}
                                        className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/500x500/1f2937/ffffff?text=Profile";
                                        }}
                                    />
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-r from-blue-400 to-blue-500 text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce">
                                    <span className="text-xs sm:text-sm font-bold">{t.common.available}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="relative z-10 bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-auto pb-4"> 
                <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors">
                    <span className="text-xs sm:text-sm mb-1 sm:mb-2">{t.hero.scroll}</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
            {/* Download resume modal */}
            <DownloadResumeModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                englishPath="/cv/CV-Mohamed-Ali-Zbaira-ANG.pdf"
                frenchPath="/cv/CV-Mohamed-Ali-Zbaira-Fr.pdf"
            />
        </section>
    );
};