import React from "react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
    return (
        <footer className="bg-dark text-white mt-3">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5 className="mb-2">{t("About Us")}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        </div>
        <div className="col-md-4">
          <h5>{t("Quick Links")}</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white">{t('Home')}</a></li>
            <li><a href="#" className="text-white">{t('About')}</a></li>
            <li><a href="#" className="text-white">{t('Services')}</a></li>
            <li><a href="#" className="text-white">{t('Contact')}</a></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h5>{t("Contact Us")}</h5>
          <ul className="list-unstyled">
            <li><a href="mailto:info@example.com" className="text-white">info@example.com</a></li>
            <li><a href="tel:+1234567890" className="text-white">+123 456 7890</a></li>
            <li><a href="#" className="text-white">1234 Street Name, City, Country</a></li>
          </ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <p>&copy; 2025 Your Company. {t("All rights reserved")}.</p>
        </div>
      </div>
    </div>
  </footer>
    )
}

export default Footer;