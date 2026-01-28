import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, addToCart, cartTotal } = useCart();

    const handleQuantityUpdate = (product, action) => {
        if (action === 'decrease') {
            // Context likely handles quantity internally if logic exists there, 
            // but let's assume we use addToCart/removeFromCart patterns for now.
            // Adjusting based on standard shop pattern:
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page" style={{ background: '#050505', minHeight: '100vh', paddingTop: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'rgba(255,51,0,0.05)',
                        borderRadius: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 30px'
                    }}>
                        <ShoppingBag size={50} color="#ff3300" />
                    </div>
                    <h2 className="white-txt h1" style={{ fontWeight: '900', letterSpacing: '-1px' }}>YOUR BAG IS EMPTY</h2>
                    <p className="opacity-5 m-b-40" style={{ color: 'white', maxWidth: '400px', margin: '0 auto 30px' }}>
                        The field is waiting. Your kit bag is empty. Gear up and let's get moving.
                    </p>
                    <Link to="/shop" className="btn theme-btn" style={{ padding: '15px 40px', borderRadius: '50px' }}>
                        EXPLORE COLLECTION
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="cart-page" style={{ background: '#050505', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
                {/* Header Section */}
                <div className="m-b-50">
                    <div className="d-flex align-items-center gap-3 m-b-10">
                        <Link to="/shop" className="white-txt opacity-5 hover-opacity-100" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} className="m-r-5" /> Back to store
                        </Link>
                    </div>
                    <h1 className="white-txt" style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                        YOUR <span className="primary-color">KIT BAG</span>
                    </h1>
                    <p className="opacity-5" style={{ color: 'white' }}>Review your selected performance gear before deployment.</p>
                </div>

                <div className="row">
                    {/* Left Side: Product List */}
                    <div className="col-lg-8">
                        <div className="cart-items">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        key={item.id}
                                        className="m-b-20"
                                        style={{
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '24px',
                                            padding: '25px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div className="row align-items-center">
                                            {/* Product Image */}
                                            <div className="col-md-2 col-3">
                                                <div style={{ width: '100%', aspectRatio: '1/1', background: '#111', borderRadius: '15px', overflow: 'hidden' }}>
                                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="col-md-5 col-9">
                                                <div className="p-l-10">
                                                    <span style={{ color: '#ff3300', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px' }}>{item.sport.toUpperCase()}</span>
                                                    <h3 className="white-txt m-b-5" style={{ fontSize: '1.25rem', fontWeight: '800' }}>{item.name}</h3>
                                                    <p className="opacity-5 m-0" style={{ color: 'white', fontSize: '0.85rem' }}>Ready for high-intensity movement</p>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-md-3 col-6 m-t-sm-20">
                                                <div className="d-flex align-items-center justify-content-center" style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    borderRadius: '50px',
                                                    padding: '8px 15px',
                                                    border: '1px solid rgba(255,255,255,0.1)'
                                                }}>
                                                    <button onClick={() => removeFromCart(item.id)} className="white-txt opacity-5" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="white-txt font-weight-bold" style={{ width: '40px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button onClick={() => addToCart(item)} className="white-txt opacity-5" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="col-md-2 col-6 text-right m-t-sm-20">
                                                <div className="white-txt h4 font-weight-bold m-b-5">₹{(item.price * item.quantity).toLocaleString()}</div>
                                                <button onClick={() => removeFromCart(item.id)} className="opacity-5 hover-opacity-100" style={{ color: '#ff3300', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>
                                                    REMOVE ITEM
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side: Order Summary Card */}
                    <div className="col-lg-4">
                        <div className="sticky-top" style={{ top: '120px' }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '30px',
                                padding: '40px',
                                backdropFilter: 'blur(20px)'
                            }}>
                                <h2 className="white-txt m-b-30" style={{ fontWeight: '900', fontSize: '1.8rem', letterSpacing: '-1px' }}>SUMMARY</h2>

                                <div className="space-y-4 m-b-30">
                                    <div className="d-flex justify-content-between m-b-15">
                                        <span className="opacity-5" style={{ color: 'white' }}>Item Subtotal</span>
                                        <span className="white-txt font-weight-bold">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between m-b-15">
                                        <span className="opacity-5" style={{ color: 'white' }}>Tactical Delivery</span>
                                        <span className="primary-color font-weight-bold">FREE</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-5" style={{ color: 'white' }}>GST (Included)</span>
                                        <span className="white-txt font-weight-bold">₹{(cartTotal * 0.18).toLocaleString()}</span>
                                    </div>
                                    <div className="m-y-20" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <span className="white-txt" style={{ fontSize: '1.1rem', fontWeight: '600' }}>Order Total</span>
                                        <span className="white-txt" style={{ fontSize: '2rem', fontWeight: '900' }}>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link to="/checkout" className="btn theme-btn btn-block" style={{ padding: '20px', borderRadius: '50px', fontSize: '1.1rem', letterSpacing: '1px' }}>
                                    PROCEED TO CHECKOUT
                                </Link>

                                {/* Trust Badges */}
                                <div className="m-t-40">
                                    <div className="d-flex align-items-center m-b-15 opacity-5" style={{ color: 'white', fontSize: '0.85rem' }}>
                                        <ShieldCheck size={18} className="m-r-10 primary-color" />
                                        <span>Secure End-to-End Encryption</span>
                                    </div>
                                    <div className="d-flex align-items-center m-b-15 opacity-5" style={{ color: 'white', fontSize: '0.85rem' }}>
                                        <Truck size={18} className="m-r-10 primary-color" />
                                        <span>Priority Global Fulfillment</span>
                                    </div>
                                    <div className="d-flex align-items-center opacity-5" style={{ color: 'white', fontSize: '0.85rem' }}>
                                        <CreditCard size={18} className="m-r-10 primary-color" />
                                        <span>Member Exclusive Installments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
