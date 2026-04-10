import { Feather, Terminal } from "lucide-react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Feather size={20} />
          <span>Aether CMS &copy; {currentYear}</span>
        </div>
        <div className="footer-status">
          <Terminal size={14} />
          <span>System Operational</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
