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
                    border: 'none' /* Override any bootstrap border */
                }}>
                    {/* Brand */}
                    <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <span style={{ color: '#fff' }}>VELOCITY</span>
                        <span className="primary-color" style={{ marginLeft: '8px' }}>SHOP</span>
                    </Link>

                    {/* Desktop Menu */}
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

                    {/* Mobile Toggle Placeholder - if needed in future hidden by CSS toggle instead */}
                    <div className="mobile-toggle" style={{ display: 'none' }}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: '#fff' }}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
