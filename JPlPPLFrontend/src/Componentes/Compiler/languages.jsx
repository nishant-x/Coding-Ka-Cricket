import './Compiler.css';
import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="languageSelector_container">
      <p className="languageSelector_label">Language:</p>
      <div>
        <button
          onClick={handleMenuToggle}
          className="languageSelector_button"
        >
          {language}
        </button>
        {isMenuOpen && (
          <div className="languageSelector_menu">
            {languages.map(([lang, version]) => (
              <div
                key={lang}
                className={`languageSelector_item ${
                  lang === language ? "active" : ""
                }`}
                onClick={() => {
                  onSelect(lang);
                  setIsMenuOpen(false);
                }}
              >
                <span>{lang}</span>
                <span className="languageSelector_version">({version})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
