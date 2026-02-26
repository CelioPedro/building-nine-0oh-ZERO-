import { useEffect } from 'react';
import './Lookbook.css';

const lookbookItems = [
    { id: 1, title: 'Urban Shadows', season: 'FW26', span: 'tall', image: '/camisetas/Void.jpg' },
    { id: 2, title: 'Concrete Dreams', season: 'FW26', span: 'wide', image: '/lookbook/2xko.jpg' },
    { id: 3, title: 'Night Protocol', season: 'FW26', span: 'normal', image: '/lookbook/gorro.jpg' },
    { id: 4, title: 'Void Sequence', season: 'FW26', span: 'normal', image: '/Jaquetas/1993.jpg' },
    { id: 5, title: 'Neon District', season: 'FW26', span: 'wide', image: '/lookbook/baaag.jpg' },
    { id: 6, title: 'Ghost Layer', season: 'FW26', span: 'tall', image: '/camisetas/Blood.jpg' },
    { id: 7, title: 'Phantom Code', season: 'FW26', span: 'normal', image: '/Hoodies/Grape.jpg' },
    { id: 8, title: 'Eclipse Dawn', season: 'FW26', span: 'normal', image: '/Jaquetas/ImBroke.jpg' },
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
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="lookbook__image-content">
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
