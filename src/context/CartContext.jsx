import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const initialState = {
    items: [],
    isOpen: false,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingIndex = state.items.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.size === action.payload.size &&
                    item.color === action.payload.color
            );

            if (existingIndex > -1) {
                const newItems = [...state.items];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + 1,
                };
                return { ...state, items: newItems, isOpen: true };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
                isOpen: true,
            };
        }

        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(
                    (item, index) => index !== action.payload
                ),
            };
        }

        case 'UPDATE_QUANTITY': {
            const newItems = [...state.items];
            if (action.payload.quantity <= 0) {
                newItems.splice(action.payload.index, 1);
            } else {
                newItems[action.payload.index] = {
                    ...newItems[action.payload.index],
                    quantity: action.payload.quantity,
                };
            }
            return { ...state, items: newItems };
        }

        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };

        case 'OPEN_CART':
            return { ...state, isOpen: true };

        case 'CLOSE_CART':
            return { ...state, isOpen: false };

        case 'CLEAR_CART':
            return { ...state, items: [] };

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = useCallback((product, size, color) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size,
                color,
            },
        });
    }, []);

    const removeItem = useCallback((index) => {
        dispatch({ type: 'REMOVE_ITEM', payload: index });
    }, []);

    const updateQuantity = useCallback((index, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
    }, []);

    const toggleCart = useCallback(() => {
        dispatch({ type: 'TOGGLE_CART' });
    }, []);

    const openCart = useCallback(() => {
        dispatch({ type: 'OPEN_CART' });
    }, []);

    const closeCart = useCallback(() => {
        dispatch({ type: 'CLOSE_CART' });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                isOpen: state.isOpen,
                totalItems,
                totalPrice,
                addItem,
                removeItem,
                updateQuantity,
                toggleCart,
                openCart,
                closeCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
