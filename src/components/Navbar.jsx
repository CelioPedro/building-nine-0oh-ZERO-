import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
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

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <Link to="/" className="navbar__logo">
                    <img src="/logo.png" alt="NINE-0 Logo" className="navbar__logo-image" />
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
            <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
                <ul className="navbar__mobile-links">
                    {navLinks.map((link, i) => (
                        <li key={link.path} style={{ animationDelay: `${i * 0.08}s` }}>
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
