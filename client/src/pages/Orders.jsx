import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight, Activity } from 'lucide-react';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
                    setOrders(res.data);
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching orders', err);
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user]);

    if (!user) return <Navigate to="/login" />;

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock size={16} color="#3b82f6" />;
            case 'in process': return <Activity size={16} className="fa-spin" color="#f59e0b" />;
            case 'closed': return <CheckCircle size={16} color="#10b981" />;
            case 'rejected': return <XCircle size={16} color="#ef4444" />;
            default: return <Package size={16} color="#fff" />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return { background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
            case 'in process': return { background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
            case 'closed': return { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
            case 'rejected': return { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
            default: return { background: 'rgba(255, 255, 255, 0.05)', color: '#fff' };
        }
    };

    return (
        <div className="orders-page" style={{ background: '#050505', minHeight: '100vh', padding: '150px 20px 100px', color: '#fff' }}>
            <div className="container">
                {/* Header Section */}
                <div className="m-b-50">
                    <div className="d-flex align-items-center gap-2 m-b-10 opacity-5">
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Main Base</Link>
                        <ChevronRight size={14} />
                        <span style={{ fontSize: '0.9rem' }}>Order History</span>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                        MISSION <span className="primary-color">LOGS</span>
                    </h1>
                    <p className="opacity-5" style={{ color: 'white' }}>Audit your gear deployments and delivery status.</p>
                </div>

                {loading ? (
                    <div className="text-center p-80">
                        <div className="spinner-border primary-color" role="status"></div>
                        <p className="m-t-20 opacity-5">Accessing encrypted archives...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-80"
                        style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <Package size={60} className="m-b-20 opacity-2" />
                        <h3 className="m-b-10">NO PREVIOUS MISSIONS FOUND</h3>
                        <p className="opacity-5 m-b-30">Your deployment history is clear. Ready to gear up?</p>
                        <Link to="/shop" className="btn theme-btn">ENTER GEAR ROOM</Link>
                    </motion.div>
                ) : (
                    <div className="order-list">
                        <AnimatePresence>
                            {orders.map((order, orderIdx) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: orderIdx * 0.1 }}
                                    className="order-card m-b-30"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Order Header */}
                                    <div className="p-25 d-flex flex-wrap justify-content-between align-items-center" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="d-flex align-items-center gap-4">
                                            <div>
                                                <div className="opacity-5" style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>MISSION ID</div>
                                                <div style={{ fontWeight: '800', fontFamily: 'monospace' }}>#{order.id.toString().padStart(6, '0')}</div>
                                            </div>
                                            <div>
                                                <div className="opacity-5" style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>TIMESTAMP</div>
                                                <div style={{ fontWeight: '700' }}>{new Date(order.date).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-4">
                                            <div className="text-right">
                                                <div className="opacity-5" style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>TOTAL COST</div>
                                                <div className="primary-color" style={{ fontWeight: '900', fontSize: '1.2rem' }}>₹{order.total.toLocaleString()}</div>
                                            </div>
                                            <div style={{
                                                ...getStatusStyle(order.status),
                                                padding: '8px 20px',
                                                borderRadius: '50px',
                                                fontSize: '0.75rem',
                                                fontWeight: '800',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                {getStatusIcon(order.status)}
                                                {order.status.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-25">
                                        <div className="row">
                                            {order.items.map((item, itemIdx) => (
                                                <div key={`${order.id}-${itemIdx}`} className="col-md-12 m-b-15 last-no-mb">
                                                    <div className="d-flex align-items-center justify-content-between p-15" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                                                        <div className="d-flex align-items-center">
                                                            <div style={{ width: '60px', height: '60px', background: '#111', borderRadius: '12px', overflow: 'hidden', marginRight: '20px' }}>
                                                                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </div>
                                                            <div>
                                                                <div style={{ fontWeight: '800', fontSize: '1rem' }}>{item.name}</div>
                                                                <div className="opacity-4" style={{ fontSize: '0.8rem' }}>Elite Performance Spec x {item.quantity}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div style={{ fontWeight: '700' }}>₹{item.price.toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Footer / Tracking */}
                                    <div className="p-20 text-center" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Link to={`/checkout`} className="btn theme-btn btn-sm" style={{ padding: '8px 25px', fontSize: '0.75rem', borderRadius: '50px' }}>
                                            VIEW SHIPMENT INTEL
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
