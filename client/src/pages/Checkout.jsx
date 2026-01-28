import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Truck, CreditCard, ChevronLeft, MapPin, Receipt, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOrder = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/orders', {
                userId: user.id,
                items: cart,
                total: cartTotal,
                shippingAddress: user.address
            });
            setSuccess('TACTICAL DEPLOYMENT SUCCESSFUL');
            clearCart();
            setTimeout(() => navigate('/orders'), 3000);
        } catch (err) {
            console.error('Error placing order', err);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="checkout-success" style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ marginBottom: '30px' }}
                    >
                        <CheckCircle size={100} color="#ff3300" strokeWidth={1} />
                    </motion.div>
                    <h2 className="white-txt h1" style={{ fontWeight: '900', letterSpacing: '-2px' }}>{success}</h2>
                    <p className="opacity-5 m-b-40" style={{ color: 'white', maxWidth: '400px', margin: '20px auto' }}>
                        Your gear is being synchronized for dispatch. Check your member dashboard for tracking updates.
                    </p>
                    <div className="spinner-border primary-color" role="status"></div>
                    <p className="m-t-20 opacity-3" style={{ color: 'white', fontSize: '0.8rem' }}>Redirecting to Member Orders...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="checkout-page" style={{ background: '#050505', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div className="container">
                {/* Header & Breadcrumb */}
                <div className="m-b-50">
                    <Link to="/cart" className="white-txt opacity-5 m-b-20 d-inline-flex align-items-center" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                        <ChevronLeft size={16} className="m-r-5" /> Adjust Kit Bag
                    </Link>
                    <h1 className="white-txt" style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                        FINAL <span className="primary-color">DEPLOYMENT</span>
                    </h1>
                </div>

                <form onSubmit={handleOrder}>
                    <div className="row">
                        {/* Left Side: Delivery & Payment Details */}
                        <div className="col-lg-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="m-b-30"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '24px',
                                    padding: '40px'
                                }}
                            >
                                <h3 className="white-txt m-b-30 d-flex align-items-center" style={{ fontWeight: '800' }}>
                                    <MapPin size={24} className="m-r-15 primary-color" /> DELIVERY INTEL
                                </h3>

                                {!user ? (
                                    <div className="p-30 text-center" style={{ background: 'rgba(255,51,0,0.05)', borderRadius: '15px' }}>
                                        <p className="white-txt">Member authentication required for deployment.</p>
                                        <Link to="/login" className="btn theme-btn m-t-10">LOGIN NOW</Link>
                                    </div>
                                ) : (
                                    <div className="delivery-info">
                                        <div className="row">
                                            <div className="col-md-6 m-b-20">
                                                <label className="opacity-5" style={{ color: 'white', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' }}>RECIPIENT</label>
                                                <div className="white-txt font-weight-bold" style={{ fontSize: '1.2rem' }}>{user.f_name} {user.l_name}</div>
                                            </div>
                                            <div className="col-md-6 m-b-20">
                                                <label className="opacity-5" style={{ color: 'white', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' }}>CONTACT</label>
                                                <div className="white-txt font-weight-bold" style={{ fontSize: '1.2rem' }}>{user.phone || 'No phone linked'}</div>
                                            </div>
                                            <div className="col-12">
                                                <label className="opacity-5" style={{ color: 'white', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px' }}>DESTINATION ZONE</label>
                                                <div className="white-txt p-20 m-t-10" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                    {user.address || 'Address not found in profile'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '24px',
                                    padding: '40px'
                                }}
                            >
                                <h3 className="white-txt m-b-30 d-flex align-items-center" style={{ fontWeight: '800' }}>
                                    <CreditCard size={24} className="m-r-15 primary-color" /> SETTLEMENT METHOD
                                </h3>

                                <div className="payment-method-selector">
                                    <div style={{
                                        padding: '25px',
                                        background: 'rgba(255,51,0,0.05)',
                                        borderRadius: '15px',
                                        border: '1px solid rgba(255,51,0,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px'
                                    }}>
                                        <div style={{ width: '40px', height: '40px', background: '#ff3300', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Truck size={20} color="#fff" />
                                        </div>
                                        <div>
                                            <div className="white-txt" style={{ fontWeight: '800' }}>Cash on Delivery</div>
                                            <div className="opacity-5" style={{ color: 'white', fontSize: '0.85rem' }}>Full inspection of gear permitted upon arrival.</div>
                                        </div>
                                        <CheckCircle size={24} className="m-x-auto" style={{ color: '#ff3300', marginLeft: 'auto' }} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Order Summary */}
                        <div className="col-lg-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '30px',
                                    padding: '40px',
                                    position: 'sticky',
                                    top: '120px'
                                }}
                            >
                                <h3 className="white-txt m-b-30 d-flex align-items-center" style={{ fontWeight: '800' }}>
                                    <Receipt size={24} className="m-r-15 primary-color" /> ORDER AUDIT
                                </h3>

                                <div className="cart-audit m-b-30" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {cart.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between m-b-15">
                                            <span className="opacity-5" style={{ color: 'white' }}>{item.name} <small>x{item.quantity}</small></span>
                                            <span className="white-txt font-weight-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '20px 0' }}></div>

                                <div className="summary-details m-b-30">
                                    <div className="d-flex justify-content-between m-b-10">
                                        <span className="opacity-5" style={{ color: 'white' }}>Mission Total</span>
                                        <span className="white-txt">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between m-b-10">
                                        <span className="opacity-5" style={{ color: 'white' }}>Global Freight</span>
                                        <span className="primary-color font-weight-bold">PRIORITY FREE</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end m-t-20">
                                        <span className="white-txt" style={{ fontSize: '1.2rem', fontWeight: '700' }}>Amount Payable</span>
                                        <span className="white-txt" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ff3300' }}>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    disabled={loading || cart.length === 0}
                                    type="submit"
                                    className="btn theme-btn btn-block"
                                    style={{
                                        padding: '25px',
                                        borderRadius: '50px',
                                        fontSize: '1.2rem',
                                        fontWeight: '900',
                                        letterSpacing: '1px',
                                        boxShadow: '0 20px 40px rgba(255,51,0,0.2)'
                                    }}
                                >
                                    {loading ? 'SYNCHRONIZING...' : 'CONFIRM MISSION'}
                                </button>

                                <div className="text-center m-t-30">
                                    <div className="d-flex align-items-center justify-content-center opacity-4" style={{ color: 'white', fontSize: '0.8rem' }}>
                                        <ShieldCheck size={16} className="m-r-8" />
                                        <span>SECURE ENCRYPTED TRANSACTION</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
