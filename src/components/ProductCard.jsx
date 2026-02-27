import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import gsap from 'gsap';
import './ProductCard.css';

const categoryGradients = {
    hoodies: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 40%, #1a1a2e 100%)',
    camisetas: 'linear-gradient(135deg, #0a0a1a 0%, #16213e 50%, #0f3460 100%)',
    'calças': 'linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d1f2d 100%)',
    jaquetas: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a3e 50%, #111 100%)',
    'acessórios': 'linear-gradient(135deg, #111 0%, #1e1e3f 50%, #0a0a1a 100%)',
};

const categoryShapes = {};

export default function ProductCard({ product }) {
    const { id, name, price, category, badge } = product;
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    const formattedPrice = price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const gradient = categoryGradients[category] || categoryGradients.camisetas;
    const shape = categoryShapes[category] || '◆';

    // Magnetic hover + 3D tilt
    const onMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        gsap.to(card, {
            rotateX, rotateY,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out',
        });

        if (imageRef.current) {
            gsap.to(imageRef.current, {
                x: (x - centerX) * 0.02,
                y: (y - centerY) * 0.02,
                duration: 0.4,
                ease: 'power2.out',
            });
        }
    }, []);

    const onMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, {
            rotateX: 0, rotateY: 0,
            duration: 0.6, ease: 'power3.out',
        });
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                x: 0, y: 0,
                duration: 0.6, ease: 'power3.out',
            });
        }
    }, []);

    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

    return (
        <div
            ref={cardRef}
            className="product-card"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <Link to={`/product/${id}`} className="product-card__image-wrapper">
                <div ref={imageRef} className="product-card__image" style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                    background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : gradient
                }}>
                    {!imageUrl && (
                        <>
                            <div className="product-card__image-placeholder">
                                <span className="product-card__image-shape">{shape}</span>
                                <span className="product-card__image-brand">NINE-0</span>
                                <span className="product-card__image-cat">{category}</span>
                            </div>
                            <div className="product-card__image-line product-card__image-line--1" />
                            <div className="product-card__image-line product-card__image-line--2" />
                        </>
                    )}
                </div>

                {badge && (
                    <span className="product-card__badge">{badge}</span>
                )}

                <div className="product-card__overlay">
                    <button className="product-card__action" aria-label="Ver produto">
                        <Eye size={18} />
                    </button>
                    <button className="product-card__action" aria-label="Adicionar ao carrinho">
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </Link>

            <div className="product-card__info">
                <span className="product-card__category">{category}</span>
                <Link to={`/product/${id}`} className="product-card__name">
                    {name}
                </Link>
                <span className="product-card__price">{formattedPrice}</span>
            </div>
        </div>
    );
}
