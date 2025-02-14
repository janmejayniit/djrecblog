import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Header = () => {
  const { t } = useTranslation();  // t function for translation

  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('Blog')}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mt-0 float-end">
            {
              localStorage.getItem('id') ?
                  <>
                    <li className="nav-item">
                      <Link to="/logout" className="nav-link">{t("Logout")}</Link>
                    </li>
                  </>
                  :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">{t("Login")}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">{t("Register")}</Link>
                    </li>
                  </>
            }

          </ul>
        </div>

      </div>
    </nav>
  );
}
export default Header;