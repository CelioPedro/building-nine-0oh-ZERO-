import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/lookbook', label: 'Lookbook' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contato' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, toggleCart } = useCart();
    const location = useLocation();
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // GSAP entrance animation on first load
    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const ctx = gsap.context(() => {
            // Logo slides in from left
            gsap.fromTo('.navbar__logo',
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
            );

            // Links stagger from top
            gsap.fromTo('.navbar__link',
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
            );

            // Cart icon
            gsap.fromTo('.navbar__cart',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', delay: 0.7 }
            );
        }, navRef);

        return () => ctx.revert();
    }, []);

    // GSAP mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        const links = mobileMenuRef.current.querySelectorAll('li');

        if (menuOpen) {
            gsap.to(mobileMenuRef.current, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.fromTo(links,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
            );
        } else {
            gsap.to(links, {
                y: -20, opacity: 0, duration: 0.2, stagger: 0.03, ease: 'power2.in',
            });
            gsap.to(mobileMenuRef.current, {
                opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.15,
                onComplete: () => {
                    if (mobileMenuRef.current) {
                        mobileMenuRef.current.style.visibility = 'hidden';
                    }
                },
            });
        }
    }, [menuOpen]);

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-text">NINE</span>
                    <span className="navbar__logo-accent">-0</span>
                </Link>

                <ul className="navbar__links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    <button className="navbar__cart" onClick={toggleCart} aria-label="Abrir carrinho">
                        <ShoppingBag size={20} />
                        {totalItems > 0 && (
                            <span className="navbar__cart-count">{totalItems}</span>
                        )}
                    </button>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div ref={mobileMenuRef} className="navbar__mobile" style={{ opacity: 0, visibility: 'hidden' }}>
                <ul className="navbar__mobile-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
