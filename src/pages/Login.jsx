import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import { LoginCustomer, SignUpCustomer } from '../api/Customer';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { t, lang } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  
  // If already authenticated, go home
  if (isAuthenticated) {
    navigate('/');
  }

  const [formData, setFormData] = useState({
    identifier: '',
    email: '',
    password: '',
    userName: '',
    phone: '',
    address: '',
  });

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
        const data = await LoginCustomer({ 
          UserName: formData.identifier, 
          Password: formData.password 
        });
        if (data) {
          dispatch(loginSuccess(data));
          navigate(-1); // Go back to where we came from
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
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-color)',
      padding: '2rem'
    }}>
      <div className="auth-modal animate-view reveal active" style={{ 
        position: 'static', 
        transform: 'none', 
        opacity: 1, 
        visibility: 'visible',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        border: '1px solid rgba(212, 175, 55, 0.2)'
      }}>
        <div className="auth-header">
          <h2 style={{ fontSize: '2.5rem' }}>{isLogin ? (lang === 'en' ? 'Welcome Back' : 'مرحباً بك') : (lang === 'en' ? 'Create Account' : 'إنشاء حساب')}</h2>
          <p style={{ fontSize: '1.1rem' }}>{isLogin ? (lang === 'en' ? 'Login to your account' : 'سجل الدخول إلى حسابك') : (lang === 'en' ? 'Join our exclusive community' : 'انضم إلى مجتمعنا الحصري')}</p>
        </div>

        {error && <div className="auth-error" style={{ padding: '1rem', marginBottom: '2rem' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} style={{ gap: '1.5rem' }}>
          {isLogin ? (
            <div className="form-group">
              <label style={{ color: 'var(--primary-color)' }}><Mail size={18} /> {lang === 'en' ? 'Username or Email' : 'اسم المستخدم أو البريد'}</label>
              <input 
                type="text" 
                name="identifier" 
                className="form-input" 
                placeholder={lang === 'en' ? "Username or email@example.com" : "اسم المستخدم أو البريد الإلكتروني"}
                required 
                onChange={handleChange}
                style={{ padding: '1.2rem', paddingLeft: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label style={{ color: 'var(--primary-color)' }}><User size={18} /> {lang === 'en' ? 'Username' : 'اسم المستخدم'}</label>
                <input 
                  type="text" 
                  name="userName" 
                  className="form-input" 
                  placeholder={lang === 'en' ? "Choose a username" : "اختر اسم مستخدم"}
                  required 
                  onChange={handleChange}
                  style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
                />
              </div>
              <div className="form-group">
                <label style={{ color: 'var(--primary-color)' }}><Mail size={18} /> {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="email@example.com" 
                  required 
                  onChange={handleChange}
                  style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label style={{ color: 'var(--primary-color)' }}><Lock size={18} /> {lang === 'en' ? 'Password' : 'كلمة المرور'}</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              placeholder="••••••••" 
              required 
              onChange={handleChange}
              style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label style={{ color: 'var(--primary-color)' }}><Phone size={18} /> {lang === 'en' ? 'Phone' : 'الهاتف'}</label>
                <input 
                  type="text" 
                  name="phone" 
                  className="form-input" 
                  placeholder="+20..." 
                  onChange={handleChange}
                  style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
                />
              </div>
              <div className="form-group">
                <label style={{ color: 'var(--primary-color)' }}><MapPin size={18} /> {lang === 'en' ? 'Address' : 'العنوان'}</label>
                <input 
                  type="text" 
                  name="address" 
                  className="form-input" 
                  placeholder={lang === 'en' ? "Street, City" : "الشارع، المدينة"}
                  onChange={handleChange}
                  style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}
                />
              </div>
            </>
          )}

          <button className="cta-button solid auth-submit" disabled={loading} style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {loading ? <Loader2 className="spinner" size={24} /> : (isLogin ? (lang === 'en' ? 'Login' : 'دخول') : (lang === 'en' ? 'Sign Up' : 'تسجيل'))}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '2.5rem' }}>
          <p style={{ fontSize: '1rem' }}>
            {isLogin ? (lang === 'en' ? "Don't have an account?" : "ليس لديك حساب؟") : (lang === 'en' ? "Already have an account?" : "لديك حساب بالفعل؟")}{' '}
            <button onClick={() => setIsLogin(!isLogin)} style={{ fontSize: '1rem' }}>
              {isLogin ? (lang === 'en' ? 'Create one' : 'أنشئ حساباً') : (lang === 'en' ? 'Login instead' : 'سجل الدخول')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
