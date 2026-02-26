import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import './HeroSlider.css';

const slides = [
    {
        id: 1,
        badge: 'Nova Coleção 2026',
        titleLine1: 'FW26',
        titleLine2: 'COLLECTION',
        subtitle: 'Moda urbana independente. Cada peça conta uma história. Feito para quem vive a cultura de rua.',
        cta: { label: 'Explorar Coleção', to: '/shop' },
        ctaSecondary: { label: 'Lookbook', to: '/lookbook' },
        accent: '#A855F7',
        images: [
            '/Slide/slide1.jpg',
            '/Slide/slide2.jpg',
        ],
    },
    {
        id: 2,
        badge: 'Drop Exclusivo',
        titleLine1: 'STREET',
        titleLine2: 'CULTURE',
        subtitle: 'Arte, música e movimento. A essência da rua em cada detalhe. Autenticidade sem compromisso.',
        cta: { label: 'Ver Drop', to: '/shop' },
        ctaSecondary: { label: 'Sobre Nós', to: '/about' },
        accent: '#E040FB',
        images: [
            '/Slide/slide3.jpg',
            '/Slide/slide4.jpg',
        ],
    },
    {
        id: 3,
        badge: 'Limited Edition',
        titleLine1: 'URBAN',
        titleLine2: 'ESSENTIALS',
        subtitle: 'Peças fundamentais que definem seu estilo. Qualidade premium, design atemporal.',
        cta: { label: 'Comprar Agora', to: '/shop' },
        ctaSecondary: { label: 'Contato', to: '/contact' },
        accent: '#7C3AED',
        images: [
            '/Slide/slide5.jpg',
            '/Slide/slide6.jpg',
        ],
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);
    const slideRefs = useRef([]);
    const progressRef = useRef(null);

    // Track which image index each slide is currently showing
    const imageIndexes = useRef(slides.map(() => 0));

    const DURATION = 6000;

    // Get the current image for a given slide
    const getSlideImage = (slideIndex) => {
        const slide = slides[slideIndex];
        const imgIdx = imageIndexes.current[slideIndex] % slide.images.length;
        return slide.images[imgIdx];
    };

    // Advance the image index for a slide (called when leaving that slide)
    const advanceImage = (slideIndex) => {
        imageIndexes.current[slideIndex] += 1;
    };

    // Animate slide in
    const animateSlideIn = useCallback((index) => {
        const slide = slideRefs.current[index];
        if (!slide) return;

        // Update background image to the current one for this slide
        const bgImage = slide.querySelector('.hero-slide__bg-image');
        if (bgImage) {
            bgImage.style.backgroundImage = `url(${getSlideImage(index)})`;
        }

        const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false),
        });

        const chars = slide.querySelectorAll('.hero-slide__char');
        const badge = slide.querySelector('.hero-slide__badge');
        const subtitle = slide.querySelector('.hero-slide__subtitle');
        const ctas = slide.querySelectorAll('.hero-slide__cta .btn');
        const imageWrapper = slide.querySelector('.hero-slide__image-wrapper');
        const number = slide.querySelector('.hero-slide__number');
        const decoLines = slide.querySelectorAll('.hero-slide__deco-line');

        tl.set(slide, { visibility: 'visible', zIndex: 2 });

        // Image wrapper scales in with Ken Burns start
        if (imageWrapper) {
            tl.fromTo(imageWrapper,
                { scale: 1.12, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
                0
            );
        }

        if (number) {
            tl.fromTo(number,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 0.06, duration: 1, ease: 'power3.out' },
                0.1
            );
        }

        if (badge) {
            tl.fromTo(badge,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.inOut' },
                0.3
            );
        }

        if (chars.length) {
            tl.fromTo(chars,
                { y: 80, opacity: 0, rotateX: -90, scale: 0.8 },
                {
                    y: 0, opacity: 1, rotateX: 0, scale: 1,
                    duration: 0.8, stagger: 0.03, ease: 'power4.out',
                },
                0.4
            );
        }

        if (subtitle) {
            tl.fromTo(subtitle,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                0.8
            );
        }

        if (ctas.length) {
            tl.fromTo(ctas,
                { y: 20, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)' },
                1.0
            );
        }

        if (decoLines.length) {
            tl.fromTo(decoLines,
                { scaleX: 0 },
                { scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power2.inOut' },
                0.5
            );
        }

        // Slow Ken Burns zoom while active
        if (imageWrapper) {
            gsap.to(imageWrapper, {
                scale: 1.06,
                duration: DURATION / 1000 + 2,
                ease: 'none',
            });
        }

        return tl;
    }, []);

    // Animate slide out
    const animateSlideOut = useCallback((index) => {
        const slide = slideRefs.current[index];
        if (!slide) return;

        const tl = gsap.timeline();

        const chars = slide.querySelectorAll('.hero-slide__char');
        const badge = slide.querySelector('.hero-slide__badge');
        const subtitle = slide.querySelector('.hero-slide__subtitle');
        const ctas = slide.querySelectorAll('.hero-slide__cta .btn');
        const imageWrapper = slide.querySelector('.hero-slide__image-wrapper');
        const number = slide.querySelector('.hero-slide__number');

        if (imageWrapper) gsap.killTweensOf(imageWrapper);

        if (chars.length) {
            tl.to(chars, {
                y: -60, opacity: 0, rotateX: 45, scale: 0.9,
                duration: 0.5, stagger: 0.02, ease: 'power3.in',
            }, 0);
        }

        tl.to([badge, subtitle, ...ctas].filter(Boolean), {
            y: -20, opacity: 0, duration: 0.4, ease: 'power2.in',
        }, 0.1);

        if (imageWrapper) {
            tl.to(imageWrapper, { opacity: 0, scale: 1.08, duration: 0.6, ease: 'power2.in' }, 0.1);
        }

        if (number) {
            tl.to(number, { x: -80, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0);
        }

        tl.set(slide, { visibility: 'hidden', zIndex: 0 });

        return tl;
    }, []);

    const goToSlide = useCallback((nextIndex) => {
        if (isAnimating || nextIndex === current) return;
        setIsAnimating(true);

        if (progressRef.current) {
            gsap.killTweensOf(progressRef.current);
            gsap.set(progressRef.current, { scaleX: 0 });
        }

        // Advance image for the slide we're leaving
        advanceImage(current);

        const exitTl = animateSlideOut(current);
        exitTl.eventCallback('onComplete', () => {
            setCurrent(nextIndex);
            animateSlideIn(nextIndex);
            if (progressRef.current) {
                gsap.fromTo(progressRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: DURATION / 1000, ease: 'none' }
                );
            }
        });
    }, [current, isAnimating, animateSlideIn, animateSlideOut]);

    const goNext = useCallback(() => {
        goToSlide((current + 1) % slides.length);
    }, [current, goToSlide]);

    const goPrev = useCallback(() => {
        goToSlide((current - 1 + slides.length) % slides.length);
    }, [current, goToSlide]);

    // Initial
    useEffect(() => {
        slideRefs.current.forEach((slide, i) => {
            if (slide && i !== 0) {
                gsap.set(slide, { visibility: 'hidden', zIndex: 0 });
            }
        });
        animateSlideIn(0);
        if (progressRef.current) {
            gsap.fromTo(progressRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: DURATION / 1000, ease: 'none' }
            );
        }
    }, []);

    // Auto-advance
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (!isAnimating) goNext();
        }, DURATION);
        return () => clearInterval(intervalRef.current);
    }, [current, isAnimating, goNext]);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero-slide__char">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));

    return (
        <section className="hero-slider" ref={sliderRef}>
            <div className="hero-slider__grain" />

            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className="hero-slide"
                >
                    {/* Single background image — changes each time slide is revisited */}
                    <div className="hero-slide__image-wrapper">
                        <div
                            className="hero-slide__bg-image"
                            style={{ backgroundImage: `url(${slide.images[0]})` }}
                        />
                        <div className="hero-slide__image-overlay" />
                    </div>

                    <div className="hero-slide__number">
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="hero-slide__deco-line hero-slide__deco-line--1" style={{ background: slide.accent }} />
                    <div className="hero-slide__deco-line hero-slide__deco-line--2" style={{ background: slide.accent }} />

                    <div className="hero-slide__content container">
                        <div className="hero-slide__badge badge" style={{ borderColor: `${slide.accent}40`, background: `${slide.accent}20`, color: slide.accent }}>
                            {slide.badge}
                        </div>

                        <h1 className="hero-slide__title">
                            <span className="hero-slide__title-line">{splitText(slide.titleLine1)}</span>
                            <span className="hero-slide__title-line hero-slide__title-line--accent" style={{ color: slide.accent }}>
                                {splitText(slide.titleLine2)}
                            </span>
                        </h1>

                        <p className="hero-slide__subtitle">{slide.subtitle}</p>

                        <div className="hero-slide__cta">
                            <Link to={slide.cta.to} className="btn btn-primary btn-lg">
                                {slide.cta.label} <ArrowRight size={18} />
                            </Link>
                            <Link to={slide.ctaSecondary.to} className="btn btn-outline btn-lg">
                                {slide.ctaSecondary.label}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="hero-slider__nav">
                <button className="hero-slider__arrow" onClick={goPrev} aria-label="Slide anterior">
                    <ArrowLeft size={20} />
                </button>
                <div className="hero-slider__dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`hero-slider__dot ${i === current ? 'hero-slider__dot--active' : ''}`}
                            onClick={() => goToSlide(i)}
                            aria-label={`Ir para slide ${i + 1}`}
                        />
                    ))}
                </div>
                <button className="hero-slider__arrow" onClick={goNext} aria-label="Próximo slide">
                    <ArrowRight size={20} />
                </button>
            </div>

            <div className="hero-slider__progress">
                <div className="hero-slider__progress-bar" ref={progressRef} />
            </div>

            <div className="hero-slider__counter">
                <span className="hero-slider__counter-current">{String(current + 1).padStart(2, '0')}</span>
                <span className="hero-slider__counter-sep">/</span>
                <span className="hero-slider__counter-total">{String(slides.length).padStart(2, '0')}</span>
            </div>
        </section>
    );
}
