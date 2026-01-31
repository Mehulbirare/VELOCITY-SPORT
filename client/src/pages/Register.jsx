import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Home, ChevronRight } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', cpassword: '',
        firstname: '', lastname: '', phone: '', address: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.cpassword) {
            setError('Passwords must match');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                f_name: formData.firstname,
                l_name: formData.lastname,
                phone: formData.phone,
                address: formData.address
            });
            setSuccess('Welcome to the elite team!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Registration failed. Username or email may already be taken.');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const inputStyle = {
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
        borderRadius: '0',
        padding: '15px 0',
        color: '#fff',
        width: '100%',
        outline: 'none',
        fontSize: '1rem',
        transition: 'border-color 0.3s'
    };

    const labelStyle = {
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.65rem',
        fontWeight: '900',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '5px',
        display: 'block'
    };

    return (
        <div className="register-brutalist" style={{
            minHeight: '100vh',
            background: '#050505',
            color: '#fff',
            position: 'relative',
            overflowX: 'hidden',
            fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Background Decorative Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '40vw',
                fontWeight: '900',
                color: 'rgba(255,51,0,0.02)',
                zIndex: 0,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                letterSpacing: '-2vw'
            }}>
                JOIN
            </div>

            {/* Navigation links */}
            <div style={{ position: 'fixed', top: '40px', left: '40px', zIndex: 10 }}>
                <Link to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '900', textDecoration: 'none', letterSpacing: '-1px' }}>
                    VELOCITY<span style={{ color: '#ff3300' }}>SHOP</span>
                </Link>
            </div>
            <div style={{ position: 'fixed', top: '40px', right: '40px', zIndex: 10 }}>
                <Link to="/login" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '1px' }}>
                    SIGN IN <ChevronRight size={16} />
                </Link>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '180px', paddingBottom: '100px' }}>
                <div className="row">
                    <div className="col-lg-5">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 style={{ fontSize: '5rem', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-4px', marginBottom: '30px' }}>
                                BECOME <br /><span style={{ color: '#ff3300' }}>ELITE.</span>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '400px', lineHeight: '1.6' }}>
                                Join the world's most aggressive sports collective. Access professional data, early drops, and customized equipment sets.
                            </p>

                            <div className="m-t-60 hidden-md-down">
                                <div style={{ marginBottom: '30px' }}>
                                    <h4 style={{ color: '#ff3300', fontWeight: '800', fontSize: '1rem', letterSpacing: '2px' }}>01. VERIFIED GEAR</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Every piece of equipment is authenticated by our lab.</p>
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <h4 style={{ color: '#ff3300', fontWeight: '800', fontSize: '1rem', letterSpacing: '2px' }}>02. GLOBAL LOGISTICS</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Priority shipping to over 140 countries for members.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="col-lg-7">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                padding: '60px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            {error && <div className="m-b-30 p-20" style={{ background: 'rgba(255,51,0,0.1)', color: '#fff', borderLeft: '4px solid #ff3300', fontSize: '0.9rem' }}>{error}</div>}
                            {success && <div className="m-b-30 p-20" style={{ background: 'rgba(0,255,100,0.1)', color: '#fff', borderLeft: '4px solid #00ff64', fontSize: '0.9rem' }}>{success}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <motion.div variants={itemVariants} className="col-md-12 m-b-40">
                                        <label style={labelStyle}>Identity Tag</label>
                                        <input type="text" name="username" placeholder="Username" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-6 m-b-40">
                                        <label style={labelStyle}>Given Name</label>
                                        <input type="text" name="firstname" placeholder="First Name" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-6 m-b-40">
                                        <label style={labelStyle}>Family Name</label>
                                        <input type="text" name="lastname" placeholder="Last Name" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-7 m-b-40">
                                        <label style={labelStyle}>Digital Reach</label>
                                        <input type="email" name="email" placeholder="Email Address" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-5 m-b-40">
                                        <label style={labelStyle}>Comms Link</label>
                                        <input type="text" name="phone" placeholder="Phone Number" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-6 m-b-40">
                                        <label style={labelStyle}>Security Code</label>
                                        <input type="password" name="password" placeholder="Password" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-6 m-b-40">
                                        <label style={labelStyle}>Confirm Code</label>
                                        <input type="password" name="cpassword" placeholder="Repeat Password" style={inputStyle} onChange={handleChange} required />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="col-md-12 m-b-50">
                                        <label style={labelStyle}>Provision Location</label>
                                        <textarea name="address" placeholder="Shipping Address" style={{ ...inputStyle, height: '60px' }} onChange={handleChange} required></textarea>
                                    </motion.div>
                                </div>

                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block"
                                    style={{
                                        background: '#ff3300',
                                        color: '#fff',
                                        padding: '25px',
                                        border: 'none',
                                        borderRadius: '0',
                                        fontWeight: '900',
                                        fontSize: '1rem',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {loading ? 'INITIALIZING...' : 'ACTIVATE ACCOUNT'}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Minimal Background Element */}
            <div style={{ position: 'absolute', bottom: '0', right: '0', padding: '40px', color: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '5px' }}>
                AUTHENTIC PERFORMANCE // VELOCITY SHOP
            </div>
        </div>
    );
};

export default Register;
