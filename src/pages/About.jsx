import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WireframeGlobe from '../components/WireframeGlobe';

import './About.css';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        number: '01',
        title: 'Autenticidade',
        desc: 'Cada peça é uma expressão genuína da cultura urbana. Sem tendências passageiras, sem imitações.',
    },
    {
        number: '02',
        title: 'Qualidade',
        desc: 'Materiais premium, acabamento impecável. Cada detalhe importa, do tecido à costura final.',
    },
    {
        number: '03',
        title: 'Comunidade',
        desc: 'Mais do que clientes, construímos uma comunidade de pessoas que vivem a cultura de rua.',
    },
    {
        number: '04',
        title: 'Sustentabilidade',
        desc: 'Produção consciente, materiais responsáveis. Moda que respeita o planeta.',
    },
];

const timeline = [
    { year: '2021', text: 'Início da NINE-0 com drops limitados nas ruas de São Paulo' },
    { year: '2022', text: 'Primeira coleção completa lançada. Pop-up stores em SP e RJ' },
    { year: '2023', text: 'Expansão para e-commerce. Colaborações com artistas locais' },
    { year: '2024', text: 'Participação na SPFW. Coleção cápsula com grafiteiros renomados' },
    { year: '2025', text: 'Abertura da flagship store. Linha de acessórios lançada' },
    { year: '2026', text: 'Nova coleção. Expansão internacional em andamento' },
];

const stats = [
    { target: 50, suffix: 'K+', label: 'Peças Vendidas' },
    { target: 15, suffix: 'K+', label: 'Clientes Ativos' },
    { target: 12, suffix: '', label: 'Coleções' },
    { target: 30, suffix: '+', label: 'Colaborações' },
];

export default function About() {
    const valuesRef = useRef(null);
    const timelineRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const timelineLineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance
            gsap.fromTo('.about__label',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo('.about__title',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
            );
            gsap.fromTo('.about__intro',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
            );

            // Values cards — 3D perspective stagger
            const valueCards = valuesRef.current?.querySelectorAll('.about__value-card');
            if (valueCards) {
                gsap.fromTo(valueCards,
                    { y: 60, opacity: 0, rotateY: -15, scale: 0.95 },
                    {
                        y: 0, opacity: 1, rotateY: 0, scale: 1,
                        duration: 1, stagger: 0.15, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: valuesRef.current,
                            start: 'top 65%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Section titles
            gsap.utils.toArray('.about__section-title').forEach((title) => {
                gsap.fromTo(title,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 75%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });

            // Timeline — drawing effect on connecting line
            if (timelineLineRef.current) {
                gsap.fromTo(timelineLineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1, duration: 1.5, ease: 'power2.inOut',
                        transformOrigin: 'top center',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 60%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Timeline items stagger
            const timelineItems = timelineRef.current?.querySelectorAll('.about__timeline-item');
            if (timelineItems) {
                gsap.fromTo(timelineItems,
                    { x: -40, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.8, stagger: 0.2, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 55%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Stats — animated number counting
            const statNumbers = statsRef.current?.querySelectorAll('.about__stat-number');
            if (statNumbers) {
                statNumbers.forEach((el, i) => {
                    const target = stats[i].target;
                    const suffix = stats[i].suffix;
                    const counter = { val: 0 };

                    gsap.to(counter, {
                        val: target,
                        duration: 2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none none',
                        },
                        onUpdate: () => {
                            el.textContent = Math.floor(counter.val) + suffix;
                        },
                    });
                });
            }

            // CTA reveal
            gsap.fromTo('.about__cta-inner',
                { y: 40, opacity: 0, scale: 0.97 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="about">
            {/* Hero */}
            <section className="about__hero">
                <div className="container">
                    <span className="about__label uppercase text-accent">Sobre Nós</span>
                    <h1 className="about__title">
                        A rua é nosso
                        <br />
                        <span className="text-gradient">ateliê.</span>
                    </h1>
                    <p className="about__intro">
                        NINE-0 nasceu da paixão pela cultura urbana brasileira — do grafite ao
                        hip-hop, do skate ao basquete de rua. Cada peça que criamos carrega essa
                        energia, essa identidade que só quem vive a rua entende.
                    </p>
                </div>
                <div className="about__hero-globe">
                    <WireframeGlobe size={500} />
                </div>

            </section>

            {/* Values */}
            <section className="about__values section" ref={valuesRef}>
                <div className="container">
                    <h2 className="about__section-title">Nossos Valores</h2>
                    <div className="about__values-grid">
                        {values.map((val) => (
                            <div key={val.number} className="about__value-card">
                                <span className="about__value-number">{val.number}</span>
                                <h3 className="about__value-title">{val.title}</h3>
                                <p className="about__value-desc">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="about__timeline section" ref={timelineRef}>
                <div className="container">
                    <h2 className="about__section-title">Nossa Jornada</h2>
                    <div className="about__timeline-list">
                        <div className="about__timeline-line" ref={timelineLineRef} />
                        {timeline.map((item) => (
                            <div key={item.year} className="about__timeline-item">
                                <span className="about__timeline-year">{item.year}</span>
                                <div className="about__timeline-dot" />
                                <p className="about__timeline-text">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="about__stats section" ref={statsRef}>
                <div className="container">
                    <div className="about__stats-grid">
                        {stats.map((stat) => (
                            <div key={stat.label} className="about__stat">
                                <span className="about__stat-number">0</span>
                                <span className="about__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about__cta section" ref={ctaRef}>
                <div className="container">
                    <div className="about__cta-inner">
                        <h2 className="about__cta-title">
                            Pronto para vestir a <span className="text-gradient">cultura?</span>
                        </h2>
                        <Link to="/shop" className="btn btn-primary btn-lg">
                            Explorar Coleção <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
