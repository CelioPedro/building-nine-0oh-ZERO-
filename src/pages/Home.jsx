import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import WireframeGlobe from '../components/WireframeGlobe';
import HeroSlider from '../components/HeroSlider';
import BrandVisual3D from '../components/BrandVisual3D';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
    const featuredRef = useRef(null);
    const aboutRef = useRef(null);
    const categoriesRef = useRef(null);
    const statementRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeTrack1 = useRef(null);
    const lookbookRef = useRef(null);
    const lookbookTrackRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── GSAP-powered Marquee (direction responsive) ──
            const track1 = marqueeTrack1.current;
            if (track1) {
                const marqueeAnim1 = gsap.to(track1, {
                    xPercent: -50, duration: 25, ease: 'none', repeat: -1,
                });

                ScrollTrigger.create({
                    trigger: marqueeRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: (self) => {
                        const v = self.direction === 1 ? 1 : -1;
                        gsap.to(marqueeAnim1, { timeScale: v * 1.5, duration: 0.3 });
                    },
                });
            }

            // ── Statement section scroll-scrubbed text reveal ──
            const statementWords = statementRef.current?.querySelectorAll('.statement__word');
            if (statementWords?.length) {
                gsap.fromTo(statementWords,
                    { opacity: 0.1 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: statementRef.current,
                            start: 'top 70%',
                            end: 'center 40%',
                            scrub: 1,
                        },
                    }
                );
            }

            // ── Featured section enhanced animations ──
            gsap.fromTo('.featured__header > div',
                { x: -60, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: featuredRef.current, start: 'top 65%', toggleActions: 'play none none none' },
                }
            );
            gsap.fromTo('.featured__header > a',
                { x: 60, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: featuredRef.current, start: 'top 65%', toggleActions: 'play none none none' },
                }
            );
            gsap.fromTo('.featured__grid .product-card',
                { y: 80, opacity: 0, scale: 0.9, rotation: 2 },
                {
                    y: 0, opacity: 1, scale: 1, rotation: 0,
                    duration: 1.3, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: featuredRef.current, start: 'top 55%', toggleActions: 'play none none none' },
                }
            );

            // ── About banner with clip-path reveal ──
            gsap.fromTo('.about-banner__content',
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                    clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.5, ease: 'power3.inOut',
                    scrollTrigger: { trigger: aboutRef.current, start: 'top 60%', toggleActions: 'play none none none' },
                }
            );
            gsap.fromTo('.about-banner__visual',
                { x: 80, opacity: 0, scale: 0.8 },
                {
                    x: 0, opacity: 1, scale: 1, duration: 1.4, delay: 0.3, ease: 'power3.out',
                    scrollTrigger: { trigger: aboutRef.current, start: 'top 60%', toggleActions: 'play none none none' },
                }
            );

            // ── Categories — alternating sides ──
            const catCards = categoriesRef.current?.querySelectorAll('.categories__card');
            if (catCards) {
                catCards.forEach((card, i) => {
                    const fromX = i % 2 === 0 ? -80 : 80;
                    gsap.fromTo(card,
                        { x: fromX, opacity: 0, rotation: i % 2 === 0 ? -5 : 5 },
                        {
                            x: 0, opacity: 1, rotation: 0,
                            duration: 1.2, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: categoriesRef.current,
                                start: `top ${65 - i * 3}%`,
                                toggleActions: 'play none none none',
                            },
                            delay: i * 0.15,
                        }
                    );
                });
            }

            gsap.fromTo('.categories__title',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: categoriesRef.current, start: 'top 70%', toggleActions: 'play none none none' },
                }
            );

            // ── Horizontal scroll lookbook ──
            const lookbookTrack = lookbookTrackRef.current;
            const lookbookWrapper = lookbookRef.current;

            if (lookbookTrack && lookbookWrapper) {
                // Get Sections inside track
                const sections = gsap.utils.toArray('.lookbook-scroll__card', lookbookTrack);
                const intro = lookbookTrack.querySelector('.lookbook-scroll__intro');

                // Create a timeline for synchronized animations
                const tl = gsap.timeline();

                // 1. Gently fade out and translate the intro to the left
                if (intro) {
                    tl.to(intro, {
                        opacity: 0,
                        x: -80,
                        duration: 1, // Shorter duration to fade early in the scroll
                        ease: "power2.inOut"
                    }, 0);
                }

                // 2. Animate the cards moving horizontally
                tl.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    duration: sections.length, // Longer duration equivalent to the whole scroll
                    ease: "none"
                }, 0); // Start at the same time

                // Let CSS handle the sticky pinning natively. 
                // GSAP just maps the scroll progress to the x translation.
                ScrollTrigger.create({
                    trigger: lookbookWrapper,
                    start: "top top",
                    end: "bottom bottom",
                    animation: tl,
                    scrub: 1,
                    invalidateOnRefresh: true,
                });
            }
        });

        return () => ctx.revert();
    }, []);

    // Statement text split into words
    const statementText = "BORN IN THE STREETS. MADE FOR THE WORLD.";

    return (
        <main className="home">
            {/* ── Hero Slider ── */}
            <HeroSlider />

            {/* ── Marquee (GSAP-powered, dual track) ── */}
            <section className="marquee-section" ref={marqueeRef}>
                <div className="marquee">
                    <div className="marquee__track" ref={marqueeTrack1}>
                        {Array(10).fill(null).map((_, i) => (
                            <span key={i} className="marquee__item">
                                NINE-0 <span className="marquee__dot">◆</span> STREETWEAR <span className="marquee__dot">◆</span> CULTURA URBANA <span className="marquee__dot">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Statement Section ── */}
            <section className="statement section" ref={statementRef}>
                <div className="statement__bg">
                </div>
                <div className="container">
                    <h2 className="statement__text">
                        {statementText.split(' ').map((word, i) => (
                            <span key={i} className="statement__word">{word} </span>
                        ))}
                    </h2>
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
                            <BrandVisual3D />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Horizontal Scroll Lookbook ── */}
            <section className="lookbook-wrapper" ref={lookbookRef}>
                <div className="lookbook-scroll">
                    <div className="lookbook-scroll__track" ref={lookbookTrackRef}>
                        <div className="lookbook-scroll__intro">
                            <span className="uppercase text-accent" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.15em' }}>
                                Lookbook
                            </span>
                            <h2 className="lookbook-scroll__title">Veja em Ação</h2>
                        </div>
                        {[
                            { image: '/lookbook/2xko.jpg', label: 'Concrete Dreams' },
                            { image: '/lookbook/baaag.jpg', label: 'Neon District' },
                            { image: '/lookbook/gorro.jpg', label: 'Night Protocol' },
                            { image: '/camisetas/Void.jpg', label: 'Urban Shadows' },
                            { image: '/Jaquetas/1993.jpg', label: 'Void Sequence' },
                        ].map((item, i) => (
                            <div key={i} className="lookbook-scroll__card">
                                <div className="lookbook-scroll__card-img" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#111' }}>
                                    <span className="lookbook-scroll__card-num">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <span className="lookbook-scroll__card-label">{item.label}</span>
                            </div>
                        ))}
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
