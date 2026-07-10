import React, { useState } from 'react';
import { Lock, CheckCircle, Loader2, KeyRound } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChangeCustomerPassword } from '../api/Customer';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const t = {
    title: lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password',
    desc: lang === 'ar' ? 'أدخل تفاصيل كلمة المرور لتحديث حسابك' : 'Enter your details below to update your password',
    currentLabel: lang === 'ar' ? 'كلمة المرور الحالية' : 'Current Password',
    newLabel: lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password',
    confirmLabel: lang === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password',
    submitBtn: lang === 'ar' ? 'تحديث كلمة المرور' : 'Update Password',
    successMsg: lang === 'ar' ? 'تم تغيير كلمة المرور بنجاح!' : 'Password changed successfully!',
    successDesc: lang === 'ar' ? 'يمكنك الآن استخدام كلمة المرور الجديدة لتسجيل الدخول.' : 'You can now use your new password next time you log in.',
    errMatch: lang === 'ar' ? 'كلمتا المرور الجديدتان غير متطابقتين.' : 'New passwords do not match.',
    errLength: lang === 'ar' ? 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.' : 'New password must be at least 6 characters.',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t.errMatch);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError(t.errLength);
      return;
    }

    setLoading(true);
    try {
      await ChangeCustomerPassword({
        CurrentPassword: formData.currentPassword,
        NewPassword: formData.newPassword
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const responseData = err.response?.data;
      if (responseData?.errors && Object.keys(responseData.errors).length > 0) {
        const firstErrorKey = Object.keys(responseData.errors)[0];
        setError(responseData.errors[firstErrorKey][0]);
      } else {
        setError(responseData?.message || (lang === 'ar' ? 'فشل تغيير كلمة المرور. يرجى التحقق من كلمة المرور الحالية.' : 'Failed to change password. Please check your current password.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-color)',
      padding: '2rem',
      paddingTop: '120px'
    }}>
      <div className="streetwear-auth-card animate-view reveal active">
        {success ? (
          <div className="rating-modal-success" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={56} style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem', display: 'block' }} />
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{t.successMsg}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t.successDesc}</p>
          </div>
        ) : (
          <>
            <div className="auth-card-header">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <KeyRound size={24} style={{ color: 'var(--primary-color)' }} />
                <h2 style={{ margin: 0 }}>{t.title}</h2>
              </div>
              <p>{t.desc}</p>
            </div>

            {error && <div className="auth-error-banner">{error}</div>}

            <form className="streetwear-auth-form" onSubmit={handleSubmit}>
              <div className="streetwear-form-group">
                <label>
                  <Lock size={16} /> 
                  <span>{t.currentLabel}</span>
                </label>
                <input 
                  type="password" 
                  name="currentPassword" 
                  className="streetwear-form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="streetwear-form-group">
                <label>
                  <Lock size={16} /> 
                  <span>{t.newLabel}</span>
                </label>
                <input 
                  type="password" 
                  name="newPassword" 
                  className="streetwear-form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="streetwear-form-group">
                <label>
                  <Lock size={16} /> 
                  <span>{t.confirmLabel}</span>
                </label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className="streetwear-form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button className="cta-button-redesigned auth-submit-btn" disabled={loading} style={{ marginTop: '1rem' }}>
                {loading ? <Loader2 className="spinner" size={20} /> : t.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
