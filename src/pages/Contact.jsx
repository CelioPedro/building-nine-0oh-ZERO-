import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Clock, Send, Instagram, Twitter } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main className="contact">
            {/* Header */}
            <section className="contact__header">
                <div className="container">
                    <span className="contact__label uppercase text-accent">Contato</span>
                    <h1 className="contact__title">
                        Fale <span className="text-gradient">Conosco</span>
                    </h1>
                    <p className="contact__subtitle">
                        Dúvidas, sugestões ou parcerias? Estamos aqui para te ouvir.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="contact__content section">
                <div className="container">
                    <div className="contact__grid">
                        {/* Form */}
                        <div className="contact__form-wrapper">
                            {submitted ? (
                                <div className="contact__success">
                                    <div className="contact__success-icon">✓</div>
                                    <h3>Mensagem Enviada!</h3>
                                    <p>Responderemos em até 24 horas úteis.</p>
                                </div>
                            ) : (
                                <form className="contact__form" onSubmit={handleSubmit}>
                                    <div className="contact__form-row">
                                        <div className="contact__field">
                                            <label htmlFor="name">Nome</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Seu nome"
                                                required
                                            />
                                        </div>
                                        <div className="contact__field">
                                            <label htmlFor="email">E-mail</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="seu@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="contact__field">
                                        <label htmlFor="subject">Assunto</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecione um assunto</option>
                                            <option value="duvida">Dúvida sobre produto</option>
                                            <option value="pedido">Acompanhar pedido</option>
                                            <option value="troca">Trocas e devoluções</option>
                                            <option value="parceria">Parcerias & Colaborações</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                    </div>

                                    <div className="contact__field">
                                        <label htmlFor="message">Mensagem</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Escreva sua mensagem..."
                                            rows="6"
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <Send size={18} /> Enviar Mensagem
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Info */}
                        <div className="contact__info">
                            <div className="contact__info-card">
                                <h3 className="contact__info-title">Informações</h3>

                                <div className="contact__info-item">
                                    <MapPin size={18} />
                                    <div>
                                        <strong>Endereço</strong>
                                        <p>Rua Augusta, 1234 — Consolação<br />São Paulo, SP — 01304-001</p>
                                    </div>
                                </div>

                                <div className="contact__info-item">
                                    <Mail size={18} />
                                    <div>
                                        <strong>E-mail</strong>
                                        <p>contato@nine-zero.com.br</p>
                                    </div>
                                </div>

                                <div className="contact__info-item">
                                    <Phone size={18} />
                                    <div>
                                        <strong>Telefone</strong>
                                        <p>(11) 9 4567-8901</p>
                                    </div>
                                </div>

                                <div className="contact__info-item">
                                    <Clock size={18} />
                                    <div>
                                        <strong>Horário</strong>
                                        <p>Seg - Sáb: 10h — 20h<br />Dom: 12h — 18h</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact__social-card">
                                <h3 className="contact__info-title">Redes Sociais</h3>
                                <div className="contact__social-links">
                                    <a href="#" className="contact__social-link">
                                        <Instagram size={20} />
                                        <span>@nine.zero</span>
                                    </a>
                                    <a href="#" className="contact__social-link">
                                        <Twitter size={20} />
                                        <span>@ninezero_</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
