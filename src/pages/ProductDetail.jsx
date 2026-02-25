import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const { addItem } = useCart();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedSize('');
        setSelectedColor('');
        setIsAdded(false);
    }, [id]);

    if (!product) {
        return (
            <main className="product-detail">
                <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-4xl))', textAlign: 'center' }}>
                    <h2>Produto não encontrado</h2>
                    <Link to="/shop" className="btn btn-outline" style={{ marginTop: 'var(--space-xl)' }}>
                        Voltar para a loja
                    </Link>
                </div>
            </main>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) return;
        addItem(product, selectedSize, selectedColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const formattedPrice = product.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const installment = (product.price / 3).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <main className="product-detail">
            {/* Breadcrumb */}
            <div className="product-detail__breadcrumb">
                <div className="container">
                    <Link to="/shop" className="product-detail__back">
                        <ArrowLeft size={16} /> Voltar
                    </Link>
                    <div className="product-detail__crumbs">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/shop">Shop</Link>
                        <ChevronRight size={14} />
                        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
                        <ChevronRight size={14} />
                        <span>{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <section className="product-detail__main">
                <div className="container">
                    <div className="product-detail__grid">
                        {/* Image */}
                        <div className="product-detail__gallery">
                            <div
                                className="product-detail__image"
                                style={{
                                    background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
                                }}
                            >
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0]} alt={product.name} className="product-detail__img" />
                                ) : (
                                    <span className="product-detail__image-brand">NINE-0</span>
                                )}
                                {product.badge && (
                                    <span className="product-detail__badge">{product.badge}</span>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="product-detail__info">
                            <span className="product-detail__category">{product.category}</span>
                            <h1 className="product-detail__name">{product.name}</h1>

                            <div className="product-detail__pricing">
                                <span className="product-detail__price">{formattedPrice}</span>
                                <span className="product-detail__installment">
                                    ou 3x de {installment} sem juros
                                </span>
                            </div>

                            <p className="product-detail__desc">{product.description}</p>

                            {/* Color */}
                            <div className="product-detail__option">
                                <label className="product-detail__label">
                                    Cor {selectedColor && <span>— {selectedColor}</span>}
                                </label>
                                <div className="product-detail__colors">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`product-detail__color-btn ${selectedColor === color ? 'product-detail__color-btn--active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div className="product-detail__option">
                                <label className="product-detail__label">Tamanho</label>
                                <div className="product-detail__sizes">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="product-detail__actions">
                                <button
                                    className={`btn btn-primary btn-lg product-detail__add ${isAdded ? 'product-detail__add--added' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize || !selectedColor}
                                >
                                    <ShoppingBag size={18} />
                                    {isAdded ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                                </button>
                                <button className="product-detail__wish" aria-label="Adicionar aos favoritos">
                                    <Heart size={20} />
                                </button>
                            </div>

                            {!selectedSize || !selectedColor ? (
                                <p className="product-detail__warning">
                                    Selecione cor e tamanho para continuar
                                </p>
                            ) : null}

                            {/* Benefits */}
                            <div className="product-detail__benefits">
                                <div className="product-detail__benefit">
                                    <Truck size={18} />
                                    <span>Frete grátis acima de R$ 299</span>
                                </div>
                                <div className="product-detail__benefit">
                                    <RotateCcw size={18} />
                                    <span>Troca em até 30 dias</span>
                                </div>
                                <div className="product-detail__benefit">
                                    <Shield size={18} />
                                    <span>Pagamento seguro</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related */}
            {relatedProducts.length > 0 && (
                <section className="product-detail__related section">
                    <div className="container">
                        <h2 className="product-detail__related-title">Você também vai gostar</h2>
                        <div className="product-detail__related-grid">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
