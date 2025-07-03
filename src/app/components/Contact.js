import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  // Custom form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/meokdvng', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowModal(true);
        e.target.reset(); // Reset form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section id="contact" className="section relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 bg-base-200 overflow-hidden">
      <div className="max-w-6xl w-full relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            <span className="text-base-content" data-font={language === 'th' ? 'thai' : 'english'}>{t('getInTouch')}</span>
          </h2>
          <div className="w-12 lg:w-16 h-px bg-base-content/30 mt-3 lg:mt-4 mx-auto"></div>
          <p className="text-base lg:text-lg text-base-content/80 mt-4 lg:mt-6 max-w-2xl mx-auto px-4">
            {t('contactDescription2')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-10 order-2 lg:order-1"
          >
            <div className="space-y-5 lg:space-y-6">
              <h3 className="text-xl lg:text-2xl font-medium text-base-content">{t('directContact')}</h3>

              <div className="space-y-5 lg:space-y-6">
                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="text-primary mt-0.5">
                    <FiMail className="text-lg lg:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base-content/70 text-sm mb-1">{t('email')}</h4>
                    <a href="mailto:peempeeranat@gmail.com" className="text-base lg:text-lg text-base-content hover:text-primary transition-colors" data-font="english">
                      peempeeranat@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="text-primary mt-0.5">
                    <FiMapPin className="text-lg lg:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base-content/70 text-sm mb-1">{t('location')}</h4>
                    <p className="text-base lg:text-lg text-base-content" data-font="english">Sutthisan Winitchai Rd, Samsen Nai, Phaya Thai, Bangkok 10400</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="text-primary mt-0.5">
                    <FiPhone className="text-lg lg:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base-content/70 text-sm mb-1">{t('phone')}</h4>
                    <a href="tel:0937127928" className="text-base lg:text-lg text-base-content hover:text-primary transition-colors" data-font="english">
                      0937127928
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 lg:pt-8 border-t border-base-content/10">
              <h3 className="text-xl lg:text-2xl font-medium text-base-content mb-4 lg:mb-6">{t('socialMedia')}</h3>
              <div className="flex gap-4 lg:gap-5">
                {[
                  { icon: <FaFacebook className="text-lg lg:text-xl" />, label: "Facebook", url: "https://www.facebook.com/peem.peeranat.588954/" },
                  { icon: <FaInstagram className="text-lg lg:text-xl" />, label: "Instagram", url: "https://www.instagram.com/peanut.prn/" },
                  { icon: <FaLinkedin className="text-lg lg:text-xl" />, label: "LinkedIn", url: "https://www.linkedin.com/in/peeranat-rattanakulpermpoon-854141272/" },
                  { icon: <FaGithub className="text-lg lg:text-xl" />, label: "GitHub", url: "https://github.com/peem-peeranat" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-content/80 hover:text-primary transition-colors"
                    whileHover={{ y: -3 }}
                  >
                    {social.icon}
                    <span className="sr-only" data-font="english">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
          >
            <h3 className="text-xl lg:text-2xl font-medium text-base-content">{t('sendMessage')}</h3>

            <AnimatePresence>
              {showModal && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Blurred and soft overlay background */}
                  <motion.div
                    className="absolute inset-0 bg-base-200/80 backdrop-blur-[6px]"
                    style={{ zIndex: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.div
                    className="relative max-w-md w-full z-10"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.35 }}
                  >
                    <div className="alert shadow-2xl rounded-2xl border border-base-content/10 flex flex-col items-center p-10 z-10 relative bg-base-100/95">
                      {/* Close button */}
                      <button
                        className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-error"
                        onClick={handleCloseModal}
                        aria-label="Close"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {/* Animated icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current text-primary h-14 w-14 mb-4 animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* Main message */}
                      <div
                        className={`text-2xl font-extrabold mb-2 text-center text-primary ${language === 'th' ? 'font-thai' : 'font-english'}`}
                      >
                        {language === 'th'
                          ? 'ขอบคุณสำหรับการติดต่อ!'
                          : 'Thank you for contacting me!'}
                      </div>
                      {/* Subtext */}
                      <div
                        className={`text-base-content/70 text-center mb-2 ${language === 'th' ? 'font-thai' : 'font-english'}`}
                        dangerouslySetInnerHTML={{
                          __html:
                            language === 'th'
                              ? 'ผมจะติดต่อกลับโดยเร็วที่สุด<br/>ขอให้วันนี้เป็นวันที่ดีนะครับ 😊'
                              : 'I will get back to you as soon as possible.<br/>Have a wonderful day! 😊',
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* End AnimatePresence/modal */}
            {!showModal && (
              <form className="space-y-5 lg:space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-5 lg:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-base-content/80 mb-2">
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-base-100 border-b border-base-content/20 focus:border-primary focus:outline-none transition-colors text-base"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-base-content/80 mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-base-100 border-b border-base-content/20 focus:border-primary focus:outline-none transition-colors text-base"
                      placeholder=""
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-base-content/80 mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-base-100 border-b border-base-content/20 focus:border-primary focus:outline-none transition-colors text-base resize-none"
                    placeholder=""
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-5 lg:px-6 py-2.5 lg:py-3 bg-primary text-base-100 hover:bg-primary/90 transition-colors text-sm lg:text-base rounded-lg"
                >
                  {t('sendMessage')}
                  <FiSend className="ml-2 text-sm lg:text-base" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;