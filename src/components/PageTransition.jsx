import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './PageTransition.css';

export default function PageTransition({ children }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Entrance animation on first load
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            );
            return;
        }

        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (!overlay || !content) return;

        const tl = gsap.timeline();

        // Exit: slide overlay up
        tl.to(overlay, {
            y: '0%',
            duration: 0.45,
            ease: 'power3.inOut',
        })
            // Swap content while overlay is covering
            .call(() => {
                setDisplayChildren(children);
                window.scrollTo(0, 0);
            })
            .to(overlay, {
                y: '-100%',
                duration: 0.45,
                ease: 'power3.inOut',
                delay: 0.15,
            })
            .fromTo(content,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                '-=0.3'
            );

    }, [location.pathname]);

    useEffect(() => {
        setDisplayChildren(children);
    }, [children]);

    return (
        <div className="page-transition">
            <div ref={overlayRef} className="page-transition__overlay">
                <span className="page-transition__brand">NINE-0</span>
            </div>
            <div ref={contentRef} className="page-transition__content">
                {displayChildren}
            </div>
        </div>
    );
}
