import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WireframeGlobe from '../components/WireframeGlobe';
import './About.css';

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

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
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
            <section className="about__values section">
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
            <section className="about__timeline section">
                <div className="container">
                    <h2 className="about__section-title">Nossa Jornada</h2>
                    <div className="about__timeline-list">
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
            <section className="about__stats section">
                <div className="container">
                    <div className="about__stats-grid">
                        {[
                            { number: '50K+', label: 'Peças Vendidas' },
                            { number: '15K+', label: 'Clientes Ativos' },
                            { number: '12', label: 'Coleções' },
                            { number: '30+', label: 'Colaborações' },
                        ].map((stat) => (
                            <div key={stat.label} className="about__stat">
                                <span className="about__stat-number">{stat.number}</span>
                                <span className="about__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about__cta section">
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
