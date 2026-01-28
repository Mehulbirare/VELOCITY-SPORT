import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Trash2, ChevronRight, Search } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, addToCart, removeFromCart, cartTotal } = useCart();

    const categories = ['All', 'Footwear', 'Equipment', 'Apparel', 'Accessories'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    return (
        <div className="shop-page" style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Minimal Shop Header */}
            <div className="container p-t-60 p-b-40">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb" style={{ background: 'transparent', padding: 0 }}>
                                <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link></li>
                                <li className="breadcrumb-item active white-txt" aria-current="page">Collection</li>
                            </ol>
                        </nav>
                        <h1 className="white-txt" style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                            THE <span className="primary-color">GEAR</span> ROOM
                        </h1>
                    </div>
                    <div className="col-md-6">
                        <div className="search-bar position-relative" style={{ maxWidth: '400px', marginLeft: 'auto' }}>
                            <Search className="position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={18} />
                            <input
                                type="text"
                                placeholder="Search high-performance gear..."
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '50px',
                                    padding: '12px 20px 12px 45px',
                                    color: 'white'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {/* Dark Sidebar Filters */}
                    <div className="col-lg-3 col-md-4">
                        <div className="sticky-top" style={{ top: '120px', zIndex: 10 }}>
                            <div className="filter-section m-b-40">
                                <h5 className="white-txt m-b-20 d-flex align-items-center" style={{ fontWeight: '800', letterSpacing: '1px' }}>
                                    <Filter size={18} className="m-r-10 primary-color" /> CATEGORIES
                                </h5>
                                <div className="category-list">
                                    {categories.map(cat => (
                                        <motion.div
                                            key={cat}
                                            whileHover={{ x: 5 }}
                                            onClick={() => setActiveCategory(cat)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '12px 0',
                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                color: activeCategory === cat ? '#ff3300' : 'rgba(255,255,255,0.6)',
                                                fontWeight: activeCategory === cat ? '700' : '400',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'color 0.3s'
                                            }}
                                        >
                                            {cat}
                                            {activeCategory === cat && <ChevronRight size={16} />}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Sidebar Cart */}
                            <motion.div
                                className="cart-widget shadow-lg"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '24px',
                                    backdropFilter: 'blur(20px)',
                                    padding: '25px'
                                }}
                            >
                                <h5 className="white-txt m-b-25 d-flex align-items-center" style={{ fontWeight: '800' }}>
                                    <ShoppingBag size={20} className="m-r-12" style={{ color: '#ff3300' }} /> YOUR BAG
                                </h5>
                                <div className="cart-items-mini m-b-25" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                    {cart.length === 0 ? (
                                        <div className="text-center p-20">
                                            <p className="opacity-4" style={{ color: 'white', fontSize: '0.9rem' }}>Empty</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="d-flex align-items-center m-b-20 p-b-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ width: '50px', height: '50px', background: '#111', borderRadius: '12px', overflow: 'hidden', marginRight: '15px', flexShrink: 0 }}>
                                                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div className="white-txt text-truncate" style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '2px' }}>{item.name}</div>
                                                    <div className="opacity-6" style={{ fontSize: '0.8rem', color: '#aaa' }}>₹{item.price} × {item.quantity}</div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{ background: 'none', border: 'none', color: '#ff3300', padding: '5px', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {cart.length > 0 && (
                                    <div className="cart-summary">
                                        <div className="d-flex justify-content-between align-items-end m-b-20">
                                            <span className="white-txt opacity-6" style={{ fontSize: '0.85rem' }}>Total</span>
                                            <span className="white-txt" style={{ fontSize: '1.4rem', fontWeight: '900' }}>₹{cartTotal.toFixed(2)}</span>
                                        </div>
                                        <Link to="/checkout" className="btn theme-btn btn-block" style={{
                                            borderRadius: '50px',
                                            padding: '16px',
                                            fontWeight: '800',
                                            fontSize: '1rem',
                                            letterSpacing: '1px'
                                        }}>
                                            CHECKOUT
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row">
                            <AnimatePresence>
                                {loading ? (
                                    <div className="col-12 text-center p-80">
                                        <div className="spinner-border primary-color" role="status"></div>
                                        <p className="white-txt m-t-20 opacity-5">Initializing Gear Room...</p>
                                    </div>
                                ) : filteredProducts.length === 0 ? (
                                    <div className="col-12 text-center p-80">
                                        <h3 className="white-txt opacity-5">No gear found.</h3>
                                    </div>
                                ) : (
                                    filteredProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="col-xl-4 col-md-6 m-b-40"
                                        >
                                            <div className="item-card" style={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                background: '#0d0d0d',
                                                padding: '15px',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.03)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                                    <div className="product-img-wrap m-b-20" style={{ height: '280px', overflow: 'hidden', position: 'relative', borderRadius: '15px' }}>
                                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        <div className="category-tag" style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.8)', padding: '5px 15px', fontSize: '0.7rem', fontWeight: '800', borderRadius: '50px', color: '#ff3300', letterSpacing: '1px' }}>
                                                            {product.sport.toUpperCase()}
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="info p-x-5" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                                        <h5 className="white-txt m-b-10" style={{ fontWeight: '800', fontSize: '1.2rem', lineHeight: '1.2' }}>{product.name}</h5>
                                                    </Link>
                                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: '1.5' }}>{product.description}</p>
                                                    <div className="m-t-auto d-flex align-items-center justify-content-between p-t-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                        <span className="white-txt h5 m-b-0" style={{ fontWeight: '900', fontSize: '1.4rem' }}>₹{product.price}</span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => addToCart(product)}
                                                            className="btn theme-btn"
                                                            style={{ padding: '10px 22px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800' }}
                                                        >
                                                            ADD TO BAG
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
