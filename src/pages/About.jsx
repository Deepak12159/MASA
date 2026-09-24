import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const About = () => { 
  const { aboutContent } = useContext(DataContext);
  
  return (
    <div className="container" style={{padding: '5rem 1.5rem', minHeight: '80vh'}}>
      <h1 className="section-title">About <span>MAASA</span></h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
        {aboutContent || 'Loading...'}
      </div>
    </div>
  ); 
}; 

export default About;
