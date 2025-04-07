import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.scss";
import { footerLinks } from "./footerLinks";
import logo from "@/assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.first}>
          {footerLinks.map((section, index) => (
            <div key={index} className={styles[`div${index + 1}`]}>
              <p className={styles.title}>{section.title}</p>
              <ul className={styles.links}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={styles.link}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.second}>
          <div className={`${styles.socials}`}>
            <Link href="https://facebook.com/yourpage" aria-label="Facebook">
              <FaFacebook size={35} color="white" />
            </Link>
            <Link
              href="https://instagram.com/yourhandle"
              aria-label="Instagram"
            >
              <FaInstagram size={35} color="white" />
            </Link>
            <Link href="https://youtube.com/" aria-label="YouTube">
              <FaYoutube size={35} color="white" />
            </Link>
            <Link
              href="https://linkedin.com/company/yourcompany"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={35} color="white" />
            </Link>
            <Link href="https://x.com/yourhandle" aria-label="X">
              <FaXTwitter size={35} color="white" />
            </Link>
          </div>

          <div className={styles.logo}>
            <div>
              <h1>ENSA</h1>
              <h2>TANGER</h2>
            </div>
            <Image
              src={logo}
              alt="ENSA"
              title="ENSA Tanger"
              priority
              height={48}
            />
          </div>

          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} ENSAT. The Director and Fellows of
            ENSAT
          </p>
        </div>
      </section>
    </footer>
  );
}
export default Footer;
