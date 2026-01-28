import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingCart, ShieldCheck, Zap, Award, Share2, Heart, Info } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product', err);
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner-border primary-color" role="status"></div>
        </div>
    );

    if (!product) return (
        <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div className="text-center">
                <h2>SPECIMEN NOT FOUND</h2>
                <Link to="/shop" className="btn theme-btn m-t-20">BACK TO COLLECTION</Link>
            </div>
        </div>
    );

    return (
        <div className="product-details-page" style={{ background: '#050505', minHeight: '100vh', color: '#fff', paddingBottom: '100px' }}>
            {/* Header / Breadcrumb */}
            <div className="container" style={{ paddingTop: '120px' }}>
                <Link to="/shop" className="white-txt opacity-5 d-flex align-items-center m-b-40 hover-opacity-100" style={{ textDecoration: 'none', fontSize: '0.9rem', width: 'fit-content' }}>
                    <ChevronLeft size={18} className="m-r-5" /> RE-ENTER COLLECTION
                </Link>
            </div>

            <div className="container">
                <div className="row">
                    {/* Left: Product Media */}
                    <div className="col-lg-7">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                width: '100%',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                background: '#0d0d0d',
                                border: '1px solid rgba(255,255,255,0.05)',
                                height: '600px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Overlay Badges */}
                            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                                <span style={{ background: '#ff3300', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>PREMIUM GEAR</span>
                                <span style={{ background: 'rgba(0,0,0,0.8)', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>{product.sport.toUpperCase()}</span>
                            </div>

                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: 'none',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Heart size={24} color={isLiked ? '#ff3300' : '#fff'} fill={isLiked ? '#ff3300' : 'none'} />
                            </button>
                        </motion.div>

                        {/* Technical Specifications */}
                        <div className="m-t-40 p-40" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 className="m-b-30" style={{ fontWeight: '800', letterSpacing: '1px' }}>TECHNICAL OVERVIEW</h4>
                            <div className="row">
                                <div className="col-md-6 m-b-20">
                                    <div className="d-flex align-items-center m-b-10">
                                        <Zap size={18} color="#ff3300" className="m-r-10" />
                                        <span className="opacity-5" style={{ fontSize: '0.8rem', fontWeight: '700' }}>PERFORMANCE</span>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.5 }} style={{ background: '#ff3300', height: '100%', borderRadius: '10px' }}></motion.div>
                                    </div>
                                </div>
                                <div className="col-md-6 m-b-20">
                                    <div className="d-flex align-items-center m-b-10">
                                        <Award size={18} color="#ff3300" className="m-r-10" />
                                        <span className="opacity-5" style={{ fontSize: '0.8rem', fontWeight: '700' }}>DURABILITY</span>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ duration: 1, delay: 0.7 }} style={{ background: '#ff3300', height: '100%', borderRadius: '10px' }}></motion.div>
                                    </div>
                                </div>
                            </div>
                            <p className="m-t-20 opacity-6" style={{ lineHeight: '1.8' }}>
                                Engineered for the modern athlete, this specimen integrates cutting-edge materials and precision design to provide an unparalleled competitive advantage.
                            </p>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="col-lg-5">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="p-l-lg-40"
                        >
                            <div className="m-b-10">
                                <span style={{ color: '#ff3300', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '3px' }}>ELITE SERIES</span>
                            </div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1', letterSpacing: '-2px', marginBottom: '20px' }}>{product.name.toUpperCase()}</h1>

                            <div className="d-flex align-items-center m-b-30 gap-4">
                                <div className="white-txt h2" style={{ fontWeight: '900', margin: 0 }}>₹{product.price.toLocaleString()}</div>
                                <div className="opacity-4" style={{ textDecoration: 'line-through' }}>₹{(product.price * 1.25).toLocaleString()}</div>
                                <span style={{ color: '#00ff64', fontSize: '0.9rem', fontWeight: '700' }}>SALE -25%</span>
                            </div>

                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '40px' }}>
                                {product.description}
                            </p>

                            <div className="m-b-40">
                                <div className="row m-b-20">
                                    <div className="col-6">
                                        <div className="p-20" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div className="opacity-5 m-b-5" style={{ fontSize: '0.7rem', fontWeight: '800' }}>CATEGORY</div>
                                            <div style={{ fontWeight: '700' }}>{product.category}</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-20" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div className="opacity-5 m-b-5" style={{ fontSize: '0.7rem', fontWeight: '800' }}>SPORT</div>
                                            <div style={{ fontWeight: '700' }}>{product.sport}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                                className="btn theme-btn btn-block"
                                style={{ padding: '22px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}
                            >
                                <ShoppingCart size={22} /> DEPLOY TO BAG
                            </motion.button>

                            {/* Trust Features */}
                            <div className="m-t-50">
                                <div className="d-flex align-items-center m-b-20">
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,51,0,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                        <ShieldCheck size={20} color="#ff3300" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1rem' }}>EXTENDED WARRANTY</div>
                                        <div className="opacity-5" style={{ fontSize: '0.8rem' }}>2-Year performance protection included.</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,51,0,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                        <Zap size={20} color="#ff3300" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1rem' }}>EXPRESS LOGISTICS</div>
                                        <div className="opacity-5" style={{ fontSize: '0.8rem' }}>Next-day delivery available for members.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Bar on Mobile */}
            <div className="hidden-lg-up" style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: '#0a0a0a', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', zIndex: 100 }}>
                <button
                    onClick={() => addToCart(product)}
                    className="btn theme-btn btn-block"
                    style={{ padding: '15px', borderRadius: '50px', fontWeight: '900' }}
                >
                    ADD TO BAG — ₹{product.price.toLocaleString()}
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
