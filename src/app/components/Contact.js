import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const contacts = [
  ['EMAIL', 'peempeeranat@gmail.com', 'mailto:peempeeranat@gmail.com'],
  ['PHONE', '0937127928', 'tel:0937127928'],
  ['LOCATION', 'Sutthisan Winitchai Rd, Samsen Nai, Phaya Thai, Bangkok 10400', null],
];

const socialLinks = [
  ['Facebook', 'https://www.facebook.com/peem.peeranat.588954/'],
  ['Instagram', 'https://www.instagram.com/peanut.prn/'],
  ['LinkedIn', 'https://www.linkedin.com/in/peeranat-rattanakulpermpoon-854141272/'],
  ['GitHub', 'https://github.com/peem-peeranat'],
];

function SuccessDialog({ onClose, language }) {
  const closeButton = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeButton.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <motion.div className="success-dialog" role="dialog" aria-modal="true" aria-labelledby="success-title" data-lenis-prevent initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeButton} type="button" className="dialog-close" onClick={onClose} aria-label="Close confirmation">×</button>
        <p className="eyebrow">MESSAGE RECEIVED</p>
        <h3 id="success-title" className="display">{language === 'th' ? 'ขอบคุณครับ' : 'THANK YOU'}</h3>
        <p>{language === 'th' ? 'ผมจะติดต่อกลับโดยเร็วที่สุด' : 'I will get back to you as soon as possible.'}</p>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/meokdvng', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      setStatus('success');
      setShowSuccess(true);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="site-section contact-section" aria-labelledby="contact-title">
      <div className="section-marker"><span>06</span><span>CONTACT</span></div>
      <div className="contact-layout">
        <motion.div className="contact-intro" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow">START A CONVERSATION / 05</p>
          <h2 id="contact-title" className="display">LET’S<br />TALK</h2>
          <p>{t('contactDescription2')}</p>
          <a className="contact-email" href="mailto:peempeeranat@gmail.com">peempeeranat@gmail.com <span aria-hidden="true">↗</span></a>

          <dl className="contact-details">
            {contacts.map(([label, value, href]) => <div key={label}><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value}</dd></div>)}
          </dl>
          <div className="contact-socials" aria-label="Social links">
            {socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}
          </div>
        </motion.div>

        <motion.div className="contact-form-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: 0.08 }}>
          <p className="form-label">{t('sendMessage')}</p>
          <form className="editorial-form" onSubmit={handleSubmit}>
            <label><span>{t('name')}</span><input type="text" name="name" autoComplete="name" required /></label>
            <label><span>{t('email')}</span><input type="email" name="email" autoComplete="email" required /></label>
            <label><span>{t('message')}</span><textarea name="message" rows="5" required /></label>
            <button type="submit" className="form-submit" disabled={status === 'sending'}>{status === 'sending' ? 'SENDING…' : <>{t('sendMessage')} <span aria-hidden="true">↗</span></>}</button>
            <p className="form-status" aria-live="polite">{status === 'error' ? (language === 'th' ? 'ส่งข้อความไม่สำเร็จ กรุณาลองอีกครั้ง' : 'Message could not be sent. Please try again.') : ''}</p>
          </form>
        </motion.div>
      </div>
      {showSuccess && <SuccessDialog language={language} onClose={() => { setShowSuccess(false); setStatus('idle'); }} />}
    </section>
  );
}
