import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.scss";
import logo from "@/assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Footer");

  // Get footer sections from translations
  const footerSections = [
    {
      key: "about",
      links: [
        { key: "contactUs", href: "/contact" },
        { key: "careers", href: "/jobs" },
        { key: "directions", href: "/map" },
      ],
    },
    {
      key: "resources",
      links: [
        { key: "calendar", href: "/calendar" },
        { key: "library", href: "/library" },
        { key: "portal", href: "/portal" },
      ],
    },
    {
      key: "legal",
      links: [
        { key: "privacy", href: "/privacy" },
        { key: "accessibility", href: "/accessibility" },
        { key: "terms", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.first}>
          {footerSections.map((section, index) => (
            <div key={index} className={styles[`div${index + 1}`]}>
              <p className={styles.title}>
                {t(`sections.${section.key}.title`)}
              </p>
              <ul className={styles.links}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={styles.link}>
                    <Link href={link.href}>
                      {t(`sections.${section.key}.links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.second}>
          <div className={`${styles.socials}`}>
            <Link
              href="https://facebook.com/ensatanger"
              aria-label={t("socialLinks.facebook")}
            >
              <FaFacebook size={35} color="white" />
            </Link>
            <Link
              href="https://www.instagram.com/ensatanger"
              aria-label={t("socialLinks.instagram")}
            >
              <FaInstagram size={35} color="white" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCYA_OZWbeGT9YQGvHzhAvCQ"
              aria-label={t("socialLinks.youtube")}
            >
              <FaYoutube size={35} color="white" />
            </Link>
            <Link
              href="https://ma.linkedin.com/company/ensat-tanger"
              aria-label={t("socialLinks.linkedin")}
            >
              <FaLinkedin size={35} color="white" />
            </Link>
            <Link
              href="https://x.com/ensatg"
              aria-label={t("socialLinks.twitter")}
            >
              <FaXTwitter size={35} color="white" />
            </Link>
          </div>

          <div className={styles.logo}>
            <div>
              <h1>{t("logo.main")}</h1>
              <h2>{t("logo.sub")}</h2>
            </div>
            <Image
              src={logo}
              alt={t("logo.alt")}
              title={t("logo.title")}
              priority
              height={48}
            />
          </div>

          <p className={styles.copyright}>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
