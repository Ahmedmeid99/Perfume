import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import { LoginCustomer, SignUpCustomer } from '../api/Customer';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    identifier: '', // Username or Email
    email: '',      // Used for signup
    password: '',
    userName: '',   // Used for signup
    phone: '',
    address: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        dispatch(loginStart());
        // Backend DTO expects { username, password }
        const data = await LoginCustomer({ 
          UserName: formData.identifier, 
          Password: formData.password 
        });
        if (data) {
          dispatch(loginSuccess(data));
          onClose();
        } else {
          setError('Invalid credentials');
          dispatch(loginFailure('Invalid credentials'));
        }
      } else {
        const data = await SignUpCustomer({
          Email: formData.email,
          Password: formData.password,
          UserName: formData.userName,
          Phone: formData.phone,
          Address: formData.address,
          Gendor: 'unisex',
          DateOfBirth: new Date().toISOString(),
          CountryID: 1
        });
        if (data) {
          setIsLogin(true);
          setError('Account created! Please login.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      if (isLogin) dispatch(loginFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to your account' : 'Join our exclusive community'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isLogin ? (
            <div className="form-group">
              <label><Mail size={16} /> Username or Email</label>
              <input 
                type="text" 
                name="identifier" 
                className="form-input" 
                placeholder="Username or email@example.com" 
                required 
                onChange={handleChange}
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label><User size={16} /> Username</label>
                <input 
                  type="text" 
                  name="userName" 
                  className="form-input" 
                  placeholder="Choose a username" 
                  required 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="email@example.com" 
                  required 
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              placeholder="••••••••" 
              required 
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label><Phone size={16} /> Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  className="form-input" 
                  placeholder="+20..." 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label><MapPin size={16} /> Address</label>
                <input 
                  type="text" 
                  name="address" 
                  className="form-input" 
                  placeholder="Street, City" 
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button className="cta-button auth-submit" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create one' : 'Login instead'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
