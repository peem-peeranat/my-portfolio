import { useLanguage } from '../context/LanguageContext';

const navigation = [['Home', 'hero'], ['About', 'about'], ['Work', 'experience'], ['Projects', 'projects'], ['Contact', 'contact']];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-name display">PEERANAT</p>
        <p>FULL STACK DEVELOPER<br />BANGKOK, THAILAND</p>
        <a className="text-link accent-link" href="#hero">BACK TO TOP <span aria-hidden="true">↑</span></a>
      </div>
      <div className="footer-bottom">
        <p>{t('footerText')}</p>
        <nav aria-label="Footer navigation">{navigation.map(([label, target]) => <a key={target} href={`#${target}`}>{label}</a>)}</nav>
      </div>
    </footer>
  );
}
