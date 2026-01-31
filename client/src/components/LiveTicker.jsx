import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, Zap, TrendingUp } from 'lucide-react';

const LiveTicker = ({ compact = false }) => {
    const [stats, setStats] = useState({
        viewers: Math.floor(Math.random() * 20) + 5,
        lastPurchase: Math.floor(Math.random() * 59) + 1,
        mode: 0 // 0: viewers, 1: purchase_time, 2: stock_velocity
    });

    useEffect(() => {
        // Randomly update viewer count
        const viewerInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                viewers: prev.viewers + (Math.random() > 0.6 ? 1 : -1)
            }));
        }, 3000);

        // Cycle through modes
        const modeInterval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                mode: (prev.mode + 1) % 3
            }));
        }, 5000);

        return () => {
            clearInterval(viewerInterval);
            clearInterval(modeInterval);
        };
    }, []);

    const messages = [
        {
            icon: <Eye size={14} className="primary-color" />,
            text: `${stats.viewers} PROS SCOUTING THIS`
        },
        {
            icon: <Clock size={14} className="primary-color" />,
            text: `PURCHASED ${stats.lastPurchase}M AGO`
        },
        {
            icon: <TrendingUp size={14} className="primary-color" />,
            text: `SUPPLY DROPPING FAST`
        }
    ];

    const currentMessage = messages[stats.mode];

    if (compact) {
        return (
            <div className="live-ticker-compact" style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 5
            }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff64', boxShadow: '0 0 10px #00ff64' }}></div>
                <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#fff', letterSpacing: '0.5px' }}>
                    {stats.viewers} LIVE
                </span>
            </div>
        );
    }

    return (
        <div className="live-ticker-full" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255, 51, 0, 0.1)',
            border: '1px solid rgba(255, 51, 0, 0.2)',
            borderRadius: '4px',
            padding: '8px 12px',
            marginBottom: '15px'
        }}>
            <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ff3300',
                marginRight: '12px',
                animation: 'pulse 1.5s infinite'
            }}></div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={stats.mode}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    {currentMessage.icon}
                    <span style={{
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontFamily: "'Courier New', monospace" // Tech/HUD feel
                    }}>
                        {currentMessage.text}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LiveTicker;
