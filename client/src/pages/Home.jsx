import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Zap, ArrowRight, Play } from 'lucide-react';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setFeaturedProducts(res.data.slice(0, 3));
            } catch (err) {
                console.error('Error fetching featured products', err);
            }
        };
        fetchProducts();
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: "easeOut" }
    };

    return (
        <div className="home-page overflow-x-hidden" style={{ background: '#050505' }}>
            {/* Hero Section - Advanced Premium Design */}
            <section className="hero" style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: '#000'
            }}>
                {/* Background Video/Image Placeholder with Parallax effect */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 20%, transparent 60%), url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }}></div>

                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255,51,0,0.15) 0%, transparent 70%)',
                    zIndex: 1
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: "anticipate" }}
                            >
                                <div className="m-b-20" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: '#ff3300', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>New Arrival 2024</span>
                                </div>

                                <h1 className="white-txt m-b-20" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-3px' }}>
                                    BREAK THE <br />
                                    <span style={{ color: '#ff3300' }}>LIMITS.</span>
                                </h1>

                                <p className="font-white m-b-40" style={{ fontSize: '1.25rem', opacity: '0.7', maxWidth: '550px', lineHeight: '1.6' }}>
                                    Engineered for elite athletes. Our 2024 collection combines revolutionary aerodynamics with unmatched comfort.
                                </p>

                                <div className="d-flex align-items-center flex-wrap gap-4">
                                    <Link to="/shop" className="btn theme-btn btn-lg" style={{
                                        padding: '18px 45px',
                                        borderRadius: '0',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        boxShadow: '0 10px 30px rgba(255,51,0,0.3)'
                                    }}>
                                        Shop The Collection <ArrowRight size={20} className="m-l-10" />
                                    </Link>

                                    <button className="btn btn-link white-txt m-l-20 d-flex align-items-center" style={{ fontWeight: '600' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                            <Play size={18} fill="white" />
                                        </div>
                                        Watch Film
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}
                >
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '10px' }}>Scroll</span>
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', margin: '0 auto' }}></div>
                </motion.div>
            </section>

            {/* Premium Stats Section */}
            <section className="section-padding" style={{ background: '#050505' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <motion.div {...fadeInUp} className="p-40 m-b-30" style={{ borderLeft: '1px solid rgba(255,51,0,0.3)' }}>
                                <ShieldCheck size={40} className="m-b-20" color="#ff3300" />
                                <h3 className="white-txt h4 font-weight-bold">PRO GUARANTEE</h3>
                                <p className="white-txt opacity-5">Used by world-class athletes in over 50 countries.</p>
                            </motion.div>
                        </div>
                        <div className="col-md-4">
                            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="p-40 m-b-30" style={{ borderLeft: '1px solid rgba(255,51,0,0.3)' }}>
                                <Zap size={40} className="m-b-20" color="#ff3300" />
                                <h3 className="white-txt h4 font-weight-bold">ULTRA-FAST</h3>
                                <p className="white-txt opacity-5">Advanced lightweight materials for maximum speed.</p>
                            </motion.div>
                        </div>
                        <div className="col-md-4">
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="p-40 m-b-30" style={{ borderLeft: '1px solid rgba(255,51,0,0.3)' }}>
                                <Truck size={40} className="m-b-20" color="#ff3300" />
                                <h3 className="white-txt h4 font-weight-bold">EXPRESS SHIP</h3>
                                <p className="white-txt opacity-5">Priority delivery within 48 hours for members.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products - Horizontal Scroll / Grid */}
            <section className="section-padding" style={{ background: '#080808' }}>
                <div className="container">
                    <div className="title m-b-60">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h2 className="white-txt" style={{ fontSize: '3rem', fontWeight: '800' }}>TRENDING NOW</h2>
                                <div style={{ width: '60px', height: '4px', background: '#ff3300' }}></div>
                            </div>
                            <Link to="/shop" className="btn btn-outline-light" style={{ borderRadius: '0', padding: '12px 30px' }}>View All Gear</Link>
                        </div>
                    </div>

                    <div className="row">
                        {featuredProducts.map((product, idx) => (
                            <div className="col-lg-4 col-md-6 m-b-30" key={product.id}>
                                <motion.div
                                    {...fadeInUp}
                                    transition={{ delay: idx * 0.1 }}
                                    className="item-card"
                                    style={{
                                        background: '#0a0a0a',
                                        padding: '20px',
                                        borderRadius: '0',
                                        position: 'relative',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="m-b-20" style={{
                                            height: '350px',
                                            backgroundImage: `url(${product.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            transition: 'transform 0.5s ease'
                                        }}></div>
                                    </Link>
                                    <div className="product-info">
                                        <div style={{ color: '#ff3300', fontSize: '0.8rem', fontWeight: '700', marginBottom: '5px' }}>{product.category.toUpperCase()}</div>
                                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                            <h4 className="white-txt m-b-15" style={{ fontWeight: '800' }}>{product.name}</h4>
                                        </Link>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>₹{product.price}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="btn theme-btn"
                                                style={{ borderRadius: '0', padding: '10px 20px' }}
                                            >
                                                ADD TO BAG
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brutalist Call to Action */}
            <section className="p-t-100 p-b-100" style={{ background: '#ff3300' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '900', color: '#000', lineHeight: '1', letterSpacing: '-2px' }}>
                                NOT FOR THE <br />WEAK AT HEART.
                            </h2>
                        </div>
                        <div className="col-lg-4 text-lg-right m-t-20">
                            <Link to="/register" className="btn btn-dark btn-lg" style={{
                                background: '#000',
                                color: '#fff',
                                borderRadius: '0',
                                padding: '20px 50px',
                                fontSize: '1.2rem',
                                fontWeight: '800',
                                border: 'none'
                            }}>
                                UNLOCK ACCESS
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
