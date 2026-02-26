import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMove = (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
        };

        const onEnterInteractive = () => {
            gsap.to(ring, { scale: 1.8, borderColor: 'rgba(168,85,247,0.8)', duration: 0.3 });
            gsap.to(dot, { scale: 0.5, duration: 0.3 });
        };

        const onLeaveInteractive = () => {
            gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.5)', duration: 0.3 });
            gsap.to(dot, { scale: 1, duration: 0.3 });
        };

        const onMouseDown = () => {
            gsap.to(ring, { scale: 0.8, duration: 0.15 });
            gsap.to(dot, { scale: 1.5, backgroundColor: '#A855F7', duration: 0.15 });
        };

        const onMouseUp = () => {
            gsap.to(ring, { scale: 1, duration: 0.15 });
            gsap.to(dot, { scale: 1, backgroundColor: '#fff', duration: 0.15 });
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .product-card');
        const observer = new MutationObserver(() => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, select, .product-card').forEach((el) => {
                el.addEventListener('mouseenter', onEnterInteractive);
                el.addEventListener('mouseleave', onLeaveInteractive);
            });
        });

        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onEnterInteractive);
            el.addEventListener('mouseleave', onLeaveInteractive);
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            observer.disconnect();
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onEnterInteractive);
                el.removeEventListener('mouseleave', onLeaveInteractive);
            });
        };
    }, []);

    // Don't show on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            <div ref={dotRef} className="custom-cursor__dot" />
            <div ref={ringRef} className="custom-cursor__ring" />
        </>
    );
}
