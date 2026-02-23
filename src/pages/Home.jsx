import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import WireframeGlobe from '../components/WireframeGlobe';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
    const featuredRef = useRef(null);
    const aboutRef = useRef(null);
    const categoriesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Featured products stagger animation
            gsap.fromTo('.featured__grid .product-card',
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.3,
                    stagger: 0.25,
                    ease: 'power3.out',
                }
            );

            // About banner reveal
            gsap.fromTo('.about-banner__content',
                { x: -50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none none',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power3.out',
                }
            );

            gsap.fromTo('.about-banner__visual',
                { x: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none none',
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1.4,
                    delay: 0.4,
                    ease: 'power3.out',
                }
            );

            // Categories stagger
            gsap.fromTo('.categories__card',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: categoriesRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );

            // Featured header
            gsap.fromTo('.featured__header',
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: 'top 65%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                }
            );

            // Categories title
            gsap.fromTo('.categories__title',
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: categoriesRef.current,
                        start: 'top 65%',
                        toggleActions: 'play none none none',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="home">
            {/* ── Hero ── */}
            <section className="hero">
                <div className="hero__bg">
                    <WireframeGlobe size={600} className="hero__globe" />
                    <div className="hero__grain" />
                </div>

                <div className="hero__content container">
                    <div className="hero__badge badge">Nova Coleção 2026</div>

                    <h1 className="hero__title">
                        <span className="hero__title-line">STREET</span>
                        <span className="hero__title-line hero__title-line--accent">WEAR</span>
                    </h1>

                    <p className="hero__subtitle">
                        Moda urbana independente. Cada peça conta uma história.
                        Feito para quem vive a cultura de rua.
                    </p>

                    <div className="hero__cta">
                        <Link to="/shop" className="btn btn-primary btn-lg">
                            Explorar Coleção <ArrowRight size={18} />
                        </Link>
                        <Link to="/lookbook" className="btn btn-outline btn-lg">
                            Lookbook
                        </Link>
                    </div>

                    <div className="hero__scroll">
                        <ArrowDown size={20} />
                        <span>Scroll</span>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="hero__corner hero__corner--tl" />
                <div className="hero__corner hero__corner--tr" />
                <div className="hero__corner hero__corner--bl" />
                <div className="hero__corner hero__corner--br" />

                <div className="hero__graffiti">九零</div>
            </section>

            {/* ── Marquee ── */}
            <section className="marquee-section">
                <div className="marquee">
                    <div className="marquee__track">
                        {Array(8).fill(null).map((_, i) => (
                            <span key={i} className="marquee__item">
                                NINE-0 <span className="marquee__dot">◆</span> STREETWEAR <span className="marquee__dot">◆</span> CULTURA URBANA <span className="marquee__dot">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="featured section" ref={featuredRef}>
                <div className="container">
                    <div className="featured__header">
                        <div>
                            <span className="featured__label uppercase">Coleção</span>
                            <h2 className="featured__title">Em Destaque</h2>
                        </div>
                        <Link to="/shop" className="btn btn-outline">
                            Ver Tudo <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="featured__grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About Banner ── */}
            <section className="about-banner section" ref={aboutRef}>
                <div className="container">
                    <div className="about-banner__inner">
                        <div className="about-banner__content">
                            <span className="uppercase text-accent" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.15em' }}>
                                Sobre a Marca
                            </span>
                            <h2 className="about-banner__title">
                                Nascida nas ruas.
                                <br />
                                <span className="text-gradient">Feita para o mundo.</span>
                            </h2>
                            <p className="about-banner__text">
                                NINE-0 é mais do que uma marca de roupas. É um movimento que conecta
                                arte, música e cultura urbana em cada peça. Fundada com a missão de
                                trazer autenticidade ao streetwear brasileiro.
                            </p>
                            <Link to="/about" className="btn btn-outline">
                                Conheça a História <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="about-banner__visual">
                            <WireframeGlobe size={350} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Categories ── */}
            <section className="categories section" ref={categoriesRef}>
                <div className="container">
                    <h2 className="categories__title">Categorias</h2>
                    <div className="categories__grid">
                        {[
                            { name: 'Hoodies', slug: 'hoodies', desc: 'Conforto oversized', icon: '◈' },
                            { name: 'Camisetas', slug: 'camisetas', desc: 'Estampas exclusivas', icon: '◉' },
                            { name: 'Calças', slug: 'calças', desc: 'Cargo & Wide Leg', icon: '◆' },
                            { name: 'Acessórios', slug: 'acessórios', desc: 'Complete o look', icon: '◇' },
                        ].map((cat) => (
                            <Link
                                key={cat.slug}
                                to={`/shop?category=${cat.slug}`}
                                className="categories__card"
                            >
                                <div className="categories__card-bg" />
                                <div className="categories__card-content">
                                    <span className="categories__card-icon">{cat.icon}</span>
                                    <h3 className="categories__card-name">{cat.name}</h3>
                                    <p className="categories__card-desc">{cat.desc}</p>
                                    <ArrowRight size={20} className="categories__card-arrow" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
