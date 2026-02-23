import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const sortOptions = [
    { value: 'default', label: 'Mais Relevantes' },
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'name', label: 'A-Z' },
];

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'all';
    const [sortBy, setSortBy] = useState('default');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== 'all') {
            result = result.filter((p) => p.category === activeCategory);
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [activeCategory, sortBy]);

    const handleCategoryChange = (catId) => {
        if (catId === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ category: catId });
        }
    };

    return (
        <main className="shop">
            {/* Header */}
            <section className="shop__header">
                <div className="container">
                    <h1 className="shop__title">Shop</h1>
                    <p className="shop__subtitle">
                        Explore nossa coleção completa de streetwear independente
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="shop__filters">
                <div className="container">
                    <div className="shop__filters-inner">
                        <div className="shop__categories">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`shop__category-btn ${activeCategory === cat.id ? 'shop__category-btn--active' : ''}`}
                                    onClick={() => handleCategoryChange(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="shop__controls">
                            <div className="shop__sort">
                                <SlidersHorizontal size={16} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="shop__sort-select"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="shop__view-toggle">
                                <button
                                    className={`shop__view-btn ${viewMode === 'grid' ? 'shop__view-btn--active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 size={18} />
                                </button>
                                <button
                                    className={`shop__view-btn ${viewMode === 'list' ? 'shop__view-btn--active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <LayoutList size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="shop__products section">
                <div className="container">
                    <p className="shop__count">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                    </p>

                    <div className={`shop__grid ${viewMode === 'list' ? 'shop__grid--list' : ''}`}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="shop__empty">
                            <p>Nenhum produto encontrado nessa categoria.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
