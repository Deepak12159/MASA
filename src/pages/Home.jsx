import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Trophy, Users, Zap, Medal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.css';

// Reusable Spotlight Card Component for the WOW effect
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`
      }}
    >
      <div 
        className="spotlight-border" 
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.15), transparent 40%)`
        }}
      />
      <div className="spotlight-content">{children}</div>
    </div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="home-container">
      {/* Animated Background Mesh */}
      <div className="hero-mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ y }}
        >
          
          <motion.h1 variants={fadeUp} className="hero-title-modern">
            Forge Your Legacy<br/>
            With <span className="text-gradient-primary">MAASA</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="hero-subtitle-modern">
            Experience world-class athletic facilities, elite coaching, and a thriving community built for champions and enthusiasts alike.
          </motion.p>
          
          <motion.div variants={fadeUp} className="hero-actions-modern">
            <Link to="/events" className="btn-glow-primary">
              Events <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Glass Stats */}
        <motion.div 
          className="stats-container-modern"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard>
            <div className="stats-glass-box">
              {[
                { val: "1.2K+", lbl: "Athletes" },
                { val: "50+", lbl: "Events" },
                { val: "5K+", lbl: "Participants" },
                { val: "120+", lbl: "Trophies" }
              ].map((stat, i) => (
                <div key={i} className="stat-item-modern">
                  <span className="stat-val-modern">{stat.val}</span>
                  <span className="stat-lbl-modern">{stat.lbl}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </section>

      {/* Next-Gen Split Section */}
      <section className="container section-padding overflow-hidden">
        <motion.div 
          className="section-header-modern"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="text-gradient">Discover the Arena</h2>
          <p>Immerse yourself in upcoming tournaments, live matches, and athletic showcases happening across the Medicaps campus.</p>
        </motion.div>

        <motion.div 
          className="bento-split"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ height: '100%' }}>
            <SpotlightCard className="bento-sidebar">
              <h3 className="sidebar-title-modern">Live & Upcoming</h3>
              <ul className="sidebar-menu-modern">
                <li className="active-item">
                  <div className="icon-pulse bg-blue"><Activity size={14}/></div>
                  <span>Cricket Final Cup</span>
                </li>
                <li>
                  <div className="icon-pulse bg-purple"><Calendar size={14}/></div>
                  <span>Annual Athletics Meet</span>
                </li>
                <li>
                  <div className="icon-pulse bg-orange"><Medal size={14}/></div>
                  <span>Inter-College Basketball</span>
                </li>
              </ul>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeUp} style={{ height: '100%' }}>
            <SpotlightCard className="bento-main">
              <div className="bento-main-hero">
                <div className="bento-main-badge">Featured Event</div>
                <h3 className="bento-main-title">Inter-College Cricket Tournament</h3>
                <p className="bento-main-desc">The most anticipated cricket clash of the season. Witness 500+ athletes competing for the ultimate championship trophy.</p>
                
                <div className="bento-main-footer">
                  <div className="bento-main-meta">
                    <span className="meta-tag">Finals</span>
                    <span className="meta-tag">Main Ground</span>
                  </div>
                  <button className="btn-modern-solid">View Event <ArrowRight size={16}/></button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="container section-padding">
        <motion.div 
          className="section-header-modern"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="text-gradient">The MAASA Advantage</h2>
          <p>More than just sports. We build leaders, forge unbreakable bonds, and create memories that last a lifetime.</p>
        </motion.div>

        <motion.div 
          className="premium-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {[
            { icon: <Users size={24}/>, title: "Brotherhood", text: "Team sports foster hands-on learning, coordination, and trust in a safe space." },
            { icon: <Trophy size={24}/>, title: "Leadership", text: "Grow into effective leaders and collaborators by managing large-scale athletic events." },
            { icon: <Zap size={24}/>, title: "Exposure", text: "Bridge academics with physical wellness through high-stakes inter-college tournaments." },
            { icon: <Activity size={24}/>, title: "Resilience", text: "A culture of strategy and practice helps students move from spectators to elite athletes." },
            { icon: <Medal size={24}/>, title: "Confidence", text: "Captaincy and team discussions build essential soft skills and unshakable confidence." },
            { icon: <Users size={24}/>, title: "Community", text: "A well-knit sports culture gives students a strong sense of purpose and identity." }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeUp} style={{ height: '100%' }}>
              <SpotlightCard className="premium-grid-card">
                <div className="card-icon-modern">{item.icon}</div>
                <h4 className="card-title-modern">{item.title}</h4>
                <p className="card-desc-modern">{item.text}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
