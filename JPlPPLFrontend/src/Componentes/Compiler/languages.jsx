import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <p className="text-sm text-slate-300">Language</p>
      <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)} className="mt-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100">
        {language}
      </button>
      {isMenuOpen && (
        <div className="absolute z-20 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-soft">
          {languages.map(([lang, version]) => (
            <button
              key={lang}
              type="button"
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${lang === language ? "bg-indigo-500/20 text-indigo-200" : "text-slate-200 hover:bg-slate-800"}`}
              onClick={() => {
                onSelect(lang);
                setIsMenuOpen(false);
              }}
            >
              <span>{lang}</span>
              <span className="text-xs text-slate-400">({version})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
