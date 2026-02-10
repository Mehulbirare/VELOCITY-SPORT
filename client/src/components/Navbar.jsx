import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header id="header" className={scrolled ? 'navbar-shadow' : ''}>
            <div className="container">
                <div className="navbar" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    border: 'none'
                }}>
                    <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <span style={{ color: '#fff' }}>VELOCITY</span>
                        <span className="primary-color" style={{ marginLeft: '8px' }}>SHOP</span>
                    </Link>

                    <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center' }}>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
                            <li className="nav-item"> <Link className="nav-link" to="/">Home</Link> </li>
                            <li className="nav-item"> <Link className="nav-link" to="/shop">Shop</Link> </li>

                            {!user ? (
                                <>
                                    <li className="nav-item"><Link to="/login" className="nav-link">Login</Link> </li>
                                    <li className="nav-item"><Link to="/register" className="nav-link">Signup</Link> </li>
                                </>
                            ) : (
                                <>
                                    {user.role === 'admin' && <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link> </li>}
                                    <li className="nav-item"><Link to="/orders" className="nav-link">Orders</Link> </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                            <LogOut size={18} />
                                        </button>
                                    </li>
                                </>
                            )}

                            <li className="nav-item" style={{ marginLeft: '10px' }}>
                                <Link to="/cart" className="nav-link" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px' }}>
                                    <ShoppingCart size={22} color="#fff" />
                                    {cart.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="badge badge-danger"
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                                fontSize: '10px',
                                                borderRadius: '50%',
                                                minWidth: '18px',
                                                height: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {cart.length}
                                        </motion.span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="mobile-toggle" style={{ display: 'none' }}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: '#fff' }}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '100%', /* Full width on mobile */
                            maxWidth: '400px', /* Limit width on larger screens */
                            height: '100vh',
                            background: '#0a0a0a',
                            zIndex: 9999, /* Ensure it's on top of everything */
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                            overflowY: 'auto'
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center m-b-40">
                            <span className="navbar-brand">MENU</span>
                            <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#fff' }}>
                                <X size={32} />
                            </button>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li className="m-b-20">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 'bold', textDecoration: 'none', display: 'block' }}>Home</Link>
                            </li>
                            <li className="m-b-20">
                                <Link to="/shop" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 'bold', textDecoration: 'none', display: 'block' }}>Shop</Link>
                            </li>
                            <li className="m-b-20">
                                <Link to="/cart" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                    Cart <ShoppingCart size={20} className="m-l-10" /> <span className="m-l-10 primary-color">({cart.length})</span>
                                </Link>
                            </li>
                            {!user ? (
                                <>
                                    <li className="m-b-20"><Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Login</Link> </li>
                                    <li className="m-b-20"><Link to="/register" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Signup</Link> </li>
                                </>
                            ) : (
                                <>
                                    {user.role === 'admin' && <li className="m-b-20"><Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }}>Admin Dashboard</Link> </li>}
                                    <li className="m-b-20"><Link to="/orders" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }}>My Orders</Link> </li>
                                    <li className="m-b-20">
                                        <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#ff3300', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
