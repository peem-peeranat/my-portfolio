import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-base-200 border-t border-base-content/10 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base-content/70 text-xs sm:text-sm text-center md:text-left"
          >
            {t('footerText')}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-row md:flex-row gap-5 md:gap-4 pt-4 md:pt-0 border-t border-base-content/10 md:border-0 w-full md:w-auto justify-center"
          >
            {/* Social icons สำหรับ mobile จะอยู่ตรงกลางและมี gap มากขึ้น */}
            {[
              { icon: <FaFacebook className="text-xl md:text-lg" />, label: "Facebook", url: "https://www.facebook.com/peem.peeranat.588954/" },
              { icon: <FaInstagram className="text-xl md:text-lg" />, label: "Instagram", url: "https://www.instagram.com/peanut.prn/" },
              { icon: <FaLinkedin className="text-xl md:text-lg" />, label: "LinkedIn", url: "https://www.linkedin.com/in/peeranat-rattanakulpermpoon-854141272/" },
              { icon: <FaGithub className="text-xl md:text-lg" />, label: "GitHub", url: "https://github.com/peem-peeranat" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/50 hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
                title={social.label}
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}