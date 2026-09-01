import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import './Login.css'; // Let's put a small css block directly in here or a separate file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(email, password);
    if (result.success) {
      navigate('/admin'); // Redirect to dashboard
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box spotlight-card">
        <div className="spotlight-content">
          <div className="login-header">
            <h2>MAASA Portal</h2>
            <p>Authorized Personnel Only</p>
          </div>
          
          <div className="login-hints">
            <p className="hint-title">Demo Accounts:</p>
            <code>tech@maasa.com</code> (Technical)<br/>
            <code>sir@maasa.com</code> (Faculty)<br/>
            <code>admin@maasa.com</code> (Superuser)<br/>
            <small>Password for all: <i>password123</i></small>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-msg"><AlertCircle size={16}/> {error}</div>}
            
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn-glow-primary login-btn">
              Secure Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
