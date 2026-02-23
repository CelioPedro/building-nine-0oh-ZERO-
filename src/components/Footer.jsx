import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            {/* Newsletter */}
            <div className="footer__newsletter section">
                <div className="container">
                    <div className="footer__newsletter-inner">
                        <div className="footer__newsletter-text">
                            <h3 className="footer__newsletter-title">Join the Movement</h3>
                            <p className="footer__newsletter-desc">
                                Receba drops exclusivos, lookbooks e promoções direto no seu e-mail.
                            </p>
                        </div>
                        <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="footer__newsletter-input"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer__main">
                <div className="container">
                    <div className="footer__grid">
                        {/* Brand */}
                        <div className="footer__brand">
                            <Link to="/" className="footer__logo">
                                <span>NINE</span><span className="text-accent">-0</span>
                            </Link>
                            <p className="footer__tagline">
                                Streetwear independente. Arte urbana. Cultura de rua.
                            </p>
                            <div className="footer__socials">
                                <a href="#" aria-label="Instagram" className="footer__social-link">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" aria-label="Twitter" className="footer__social-link">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" aria-label="YouTube" className="footer__social-link">
                                    <Youtube size={20} />
                                </a>
                                <a href="#" aria-label="Email" className="footer__social-link">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="footer__links-group">
                            <h4 className="footer__heading">Shop</h4>
                            <ul className="footer__list">
                                <li><Link to="/shop">Todos os Produtos</Link></li>
                                <li><Link to="/shop?category=camisetas">Camisetas</Link></li>
                                <li><Link to="/shop?category=hoodies">Hoodies</Link></li>
                                <li><Link to="/shop?category=calças">Calças</Link></li>
                                <li><Link to="/shop?category=acessórios">Acessórios</Link></li>
                            </ul>
                        </div>

                        <div className="footer__links-group">
                            <h4 className="footer__heading">Brand</h4>
                            <ul className="footer__list">
                                <li><Link to="/about">Sobre Nós</Link></li>
                                <li><Link to="/lookbook">Lookbook</Link></li>
                                <li><Link to="/contact">Contato</Link></li>
                            </ul>
                        </div>

                        <div className="footer__links-group">
                            <h4 className="footer__heading">Suporte</h4>
                            <ul className="footer__list">
                                <li><a href="#">Trocas & Devoluções</a></li>
                                <li><a href="#">Tabela de Medidas</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Política de Privacidade</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} NINE-0. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
