import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/stats');
                setStats(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching admin stats', err);
                setLoading(false);
            }
        };
        if (user && user.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    if (!user || user.role !== 'admin') return <Navigate to="/login" />;

    return (
        <div className="page-wrapper">
            <div className="container m-t-30">
                <h2 className="m-b-20">Admin Dashboard</h2>
                {loading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center p-30 bg-info white-txt">
                                <h3>{stats.totalOrders}</h3>
                                <p>Total Orders</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center p-30 bg-success white-txt">
                                <h3>₹{stats.totalRevenue}</h3>
                                <p>Total Revenue</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center p-30 bg-warning white-txt">
                                <h3>{stats.totalProducts}</h3>
                                <p>Total Products</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="row m-t-30">
                    <div className="col-md-12">
                        <div className="widget">
                            <div className="widget-heading">
                                <h3 className="widget-title text-dark">Recent Orders</h3>
                            </div>
                            <div className="widget-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats?.recentOrders?.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.userId}</td>
                                                <td>₹{order.total}</td>
                                                <td>{order.status}</td>
                                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
