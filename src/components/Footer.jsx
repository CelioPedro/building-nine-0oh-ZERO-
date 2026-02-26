import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const newsletterRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Newsletter reveal
            gsap.fromTo('.footer__newsletter-inner',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: newsletterRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Footer grid columns stagger
            const cols = footerRef.current?.querySelectorAll('.footer__brand, .footer__links-group');
            if (cols) {
                gsap.fromTo(cols,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Watermark text
            gsap.fromTo('.footer__watermark',
                { x: -100, opacity: 0 },
                {
                    x: 0, opacity: 0.03, duration: 2, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Social icons stagger
            gsap.fromTo('.footer__social-link',
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                    delay: 0.3,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <footer className="footer">
            {/* Newsletter */}
            <div className="footer__newsletter section" ref={newsletterRef}>
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
            <div className="footer__main" ref={footerRef}>
                <div className="container">
                    {/* Watermark */}
                    <div className="footer__watermark">NINE-0</div>

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
