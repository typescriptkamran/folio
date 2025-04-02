"use client";

import { useState } from "react";

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
  className?: string;
}

export default function LanguageSwitcher({
  onLanguageChange,
  className = "",
}: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState("en");

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded-full text-sm ${currentLang === "en" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("es")}
        className={`px-3 py-1 rounded-full text-sm ${currentLang === "es" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`}
        aria-label="Switch to Spanish"
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange("fr")}
        className={`px-3 py-1 rounded-full text-sm ${currentLang === "fr" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors`}
        aria-label="Switch to French"
      >
        FR
      </button>
    </div>
  );
}
