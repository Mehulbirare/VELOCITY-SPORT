import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle, PlayCircle, Home } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await login(username, password);
            if (res.success) {
                navigate('/');
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('Authentication service unavailable.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split-page" style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden'
        }}>
            {/* Left Side: Cinematic Visual */}
            <div className="hidden-md-down col-lg-7 p-0" style={{ position: 'relative', background: '#000' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '0.7'
                }}></div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #000 10%, transparent 60%)',
                }}></div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, transparent, #0a0a0a)',
                }}></div>

                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '80px',
                    right: '80px',
                    zIndex: 2
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="m-b-30">
                            <span style={{ background: '#ff3300', padding: '5px 15px', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px', color: '#fff' }}>EST. 2024</span>
                        </div>
                        <h1 style={{ color: '#fff', fontSize: '5rem', fontWeight: '900', lineHeight: '0.85', marginBottom: '25px', letterSpacing: '-3px' }}>
                            UNSTOPPABLE <br />
                            <span style={{ color: '#ff3300' }}>PERFORMANCE.</span>
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', maxWidth: '500px', lineHeight: '1.5' }}>
                            The world's most advanced sports ecosystem. Login to access your specialized gear and training data.
                        </p>
                    </motion.div>
                </div>

                <div style={{ position: 'absolute', top: '50px', left: '60px', zIndex: 10 }}>
                    <Link to="/" className="d-flex align-items-center" style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '-1px' }}>
                        VELOCITY<span style={{ color: '#ff3300' }}>SHOP</span>
                    </Link>
                </div>
            </div>

            {/* Right Side: Stark Minimalist Form */}
            <div className="col-xs-12 col-lg-5 d-flex align-items-center justify-content-center p-40" style={{ background: '#0a0a0a', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50px', right: '60px', zIndex: 10 }}>
                    <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Home size={18} /> <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Back to Home</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', maxWidth: '400px' }}
                >
                    <div className="m-b-50">
                        <h2 className="white-txt" style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-2px' }}>SIGN IN</h2>
                        <p style={{ color: '#ff3300', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px' }}>REACH YOUR POTENTIAL</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="m-b-30 p-20 d-flex align-items-center"
                            style={{ background: 'rgba(255,51,0,0.1)', border: '1px solid rgba(255,51,0,0.2)', borderRadius: '4px' }}
                        >
                            <AlertCircle size={20} color="#ff3300" className="m-r-15" />
                            <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="m-b-30">
                            <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>USER IDENTITY</label>
                            <div className="position-relative">
                                <User size={20} className="position-absolute" style={{ top: '15px', left: '0', color: '#ff3300' }} />
                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '2px solid rgba(255,255,255,0.1)',
                                        borderRadius: '0',
                                        padding: '12px 0 12px 35px',
                                        color: '#fff',
                                        width: '100%',
                                        outline: 'none',
                                        fontSize: '1.1rem',
                                        transition: 'border-color 0.3s'
                                    }}
                                    className="login-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="m-b-50">
                            <div className="d-flex justify-content-between align-items-center m-b-10">
                                <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', display: 'block' }}>SECURITY KEY</label>
                                <Link to="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: '700' }}>Forgot?</Link>
                            </div>
                            <div className="position-relative">
                                <Lock size={20} className="position-absolute" style={{ top: '15px', left: '0', color: '#ff3300' }} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '2px solid rgba(255,255,255,0.1)',
                                        borderRadius: '0',
                                        padding: '12px 0 12px 35px',
                                        color: '#fff',
                                        width: '100%',
                                        outline: 'none',
                                        fontSize: '1.1rem',
                                        transition: 'border-color 0.3s'
                                    }}
                                    className="login-input"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            type="submit"
                            className="btn theme-btn btn-block"
                            style={{
                                background: '#ff3300',
                                padding: '22px',
                                borderRadius: '4px',
                                fontWeight: '900',
                                fontSize: '1rem',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                border: 'none'
                            }}
                        >
                            {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                        </motion.button>
                    </form>

                    <div className="m-t-50 text-center">
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>
                            New athlete?
                            <Link to="/register" style={{ color: '#fff', fontWeight: '900', textDecoration: 'none', marginLeft: '12px', borderBottom: '2px solid #ff3300' }}>
                                CREATE ELITE PROFILE
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
