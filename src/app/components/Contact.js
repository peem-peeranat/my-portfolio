import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

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
            <span className="text-base-content">{t('contact')} </span>
            <span className="font-semibold text-base-content">{t('getInTouch')}</span>
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
                    <a href="mailto:hello@example.com" className="text-base lg:text-lg text-base-content hover:text-primary transition-colors" data-font="english">
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="text-primary mt-0.5">
                    <FiMapPin className="text-lg lg:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base-content/70 text-sm mb-1">{t('location')}</h4>
                    <p className="text-base lg:text-lg text-base-content" data-font="english">Bangkok, Thailand</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 lg:gap-5">
                  <div className="text-primary mt-0.5">
                    <FiPhone className="text-lg lg:text-xl" />
                  </div>
                  <div>
                    <h4 className="text-base-content/70 text-sm mb-1">{t('phone')}</h4>
                    <a href="tel:+66123456789" className="text-base lg:text-lg text-base-content hover:text-primary transition-colors" data-font="english">
                      +66 123 456 789
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

            <form className="space-y-5 lg:space-y-6">
              <div className="grid grid-cols-1 gap-5 lg:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-base-content/80 mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
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
                  rows={4}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;