import React, { useState } from 'react';
import { X, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChangeCustomerPassword } from '../api/Customer';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

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
        onClose();
      }, 2000);
    } catch (err) {
      const responseData = err.response?.data;
      if (responseData?.errors && Object.keys(responseData.errors).length > 0) {
        // Extract validation errors if returned from ModelState
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
    <div className="modal-overlay active" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()} style={{
        position: 'static',
        transform: 'none',
        opacity: 1,
        visibility: 'visible',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        maxWidth: '420px'
      }}>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        {success ? (
          <div className="rating-modal-success" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>{t.successMsg}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t.successDesc}</p>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <h2>{t.title}</h2>
              <p>{t.desc}</p>
            </div>

            {error && <div className="auth-error" style={{ marginBottom: '1rem' }}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label><Lock size={16} /> {t.currentLabel}</label>
                <input 
                  type="password" 
                  name="currentPassword" 
                  className="form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label><Lock size={16} /> {t.newLabel}</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  className="form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label><Lock size={16} /> {t.confirmLabel}</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className="form-input" 
                  placeholder="••••••••" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button className="cta-button auth-submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
                {loading ? <Loader2 className="spinner" size={20} /> : t.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
