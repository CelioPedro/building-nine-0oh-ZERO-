import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
    const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

    const formattedTotal = totalPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'cart-overlay--open' : ''}`} onClick={closeCart} />
            <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
                {/* Header */}
                <div className="cart-drawer__header">
                    <div className="cart-drawer__title">
                        <ShoppingBag size={20} />
                        <span>Carrinho ({totalItems})</span>
                    </div>
                    <button className="cart-drawer__close" onClick={closeCart} aria-label="Fechar carrinho">
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="cart-drawer__items">
                    {items.length === 0 ? (
                        <div className="cart-drawer__empty">
                            <ShoppingBag size={48} />
                            <p>Seu carrinho está vazio</p>
                            <button className="btn btn-outline" onClick={closeCart}>
                                Continuar Comprando
                            </button>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                                <div
                                    className="cart-item__image"
                                    style={{
                                        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
                                    }}
                                >
                                    <span className="cart-item__image-brand">N-0</span>
                                </div>

                                <div className="cart-item__details">
                                    <h4 className="cart-item__name">{item.name}</h4>
                                    <p className="cart-item__meta">
                                        {item.size} • {item.color}
                                    </p>
                                    <p className="cart-item__price">
                                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </p>
                                </div>

                                <div className="cart-item__actions">
                                    <div className="cart-item__quantity">
                                        <button onClick={() => updateQuantity(index, item.quantity - 1)}>
                                            <Minus size={14} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button className="cart-item__remove" onClick={() => removeItem(index)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="cart-drawer__footer">
                        <div className="cart-drawer__subtotal">
                            <span>Subtotal</span>
                            <span className="cart-drawer__total-price">{formattedTotal}</span>
                        </div>
                        <p className="cart-drawer__shipping">Frete calculado no checkout</p>
                        <button className="btn btn-primary btn-lg cart-drawer__checkout">
                            Finalizar Compra <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
