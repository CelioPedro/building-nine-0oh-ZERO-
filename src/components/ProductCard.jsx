import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import './ProductCard.css';

const categoryGradients = {
    hoodies: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 40%, #1a1a2e 100%)',
    camisetas: 'linear-gradient(135deg, #0a0a1a 0%, #16213e 50%, #0f3460 100%)',
    'calças': 'linear-gradient(135deg, #0d1117 0%, #1a2332 50%, #0d1f2d 100%)',
    jaquetas: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a3e 50%, #111 100%)',
    'acessórios': 'linear-gradient(135deg, #111 0%, #1e1e3f 50%, #0a0a1a 100%)',
};

const categoryShapes = {
    hoodies: '◈',
    camisetas: '△',
    'calças': '▽',
    jaquetas: '⬡',
    'acessórios': '○',
};

export default function ProductCard({ product }) {
    const { id, name, price, category, badge } = product;

    const formattedPrice = price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const gradient = categoryGradients[category] || categoryGradients.camisetas;
    const shape = categoryShapes[category] || '◆';

    return (
        <div className="product-card">
            <Link to={`/product/${id}`} className="product-card__image-wrapper">
                <div className="product-card__image" style={{ background: gradient }}>
                    {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={name} className="product-card__img" />
                    ) : (
                        <div className="product-card__image-placeholder">
                            <span className="product-card__image-shape">{shape}</span>
                            <span className="product-card__image-brand">NINE-0</span>
                            <span className="product-card__image-cat">{category}</span>
                        </div>
                    )}
                    <div className="product-card__image-line product-card__image-line--1" />
                    <div className="product-card__image-line product-card__image-line--2" />
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
