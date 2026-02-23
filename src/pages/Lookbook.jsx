import { useEffect } from 'react';
import './Lookbook.css';

const lookbookItems = [
    { id: 1, title: 'Urban Shadows', season: 'FW26', span: 'tall' },
    { id: 2, title: 'Concrete Dreams', season: 'FW26', span: 'wide' },
    { id: 3, title: 'Night Protocol', season: 'SS26', span: 'normal' },
    { id: 4, title: 'Void Sequence', season: 'SS26', span: 'normal' },
    { id: 5, title: 'Neon District', season: 'FW26', span: 'wide' },
    { id: 6, title: 'Ghost Layer', season: 'SS26', span: 'tall' },
    { id: 7, title: 'Phantom Code', season: 'FW26', span: 'normal' },
    { id: 8, title: 'Eclipse Dawn', season: 'SS26', span: 'normal' },
];

const gradients = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
    'linear-gradient(135deg, #1e1e2f 0%, #3d3d5c 100%)',
    'linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #2d1b69 100%)',
    'linear-gradient(135deg, #1a1a1a 0%, #2d1f4e 100%)',
    'linear-gradient(135deg, #111111 0%, #1e1e3f 100%)',
    'linear-gradient(135deg, #0a0a0a 0%, #1a0933 50%, #0f3460 100%)',
];

export default function Lookbook() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="lookbook">
            {/* Header */}
            <section className="lookbook__header">
                <div className="container">
                    <span className="lookbook__label uppercase text-accent">Lookbook</span>
                    <h1 className="lookbook__title">
                        FW26 <span className="text-gradient">Collection</span>
                    </h1>
                    <p className="lookbook__subtitle">
                        Cada imagem conta uma história. Cada peça é uma declaração.
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className="lookbook__gallery section">
                <div className="container">
                    <div className="lookbook__grid">
                        {lookbookItems.map((item, i) => (
                            <div
                                key={item.id}
                                className={`lookbook__item lookbook__item--${item.span}`}
                            >
                                <div
                                    className="lookbook__image"
                                    style={{ background: gradients[i % gradients.length] }}
                                >
                                    <div className="lookbook__image-content">
                                        <span className="lookbook__image-brand">N-0</span>
                                    </div>

                                    <div className="lookbook__item-overlay">
                                        <span className="lookbook__item-season">{item.season}</span>
                                        <h3 className="lookbook__item-title">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
