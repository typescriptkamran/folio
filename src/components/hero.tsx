"use client";

import Link from "next/link";
import { ArrowUpRight, Code, Briefcase, User } from "lucide-react";
import { useState, useEffect } from "react";

type Language = "en" | "es" | "fr"; // Define the language keys

export default function Hero() {
  const [currentLang, setCurrentLang] = useState<Language>("en"); // Type currentLang to one of "en", "es", or "fr"
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = {
    en: {
      greeting: "Welcome to",
      name: "Muhammad Kamran Ali Rana",
      title: "Product Manager & Full Stack Developer",
      description:
        "I specialize in e-commerce solutions, AI chatbot development, and creating high-performance web applications with Next.js and React.",
      cta: "View My Work",
      contact: "Contact Me",
    },
    es: {
      greeting: "Bienvenido a",
      name: "Muhammad Kamran Ali Rana",
      title: "Gerente de Producto & Desarrollador Full Stack",
      description:
        "Me especializo en soluciones de comercio electrónico, desarrollo de chatbots con IA y creación de aplicaciones web de alto rendimiento con Next.js y React.",
      cta: "Ver Mi Trabajo",
      contact: "Contáctame",
    },
    fr: {
      greeting: "Bienvenue sur",
      name: "Muhammad Kamran Ali Rana",
      title: "Chef de Produit & Développeur Full Stack",
      description:
        "Je me spécialise dans les solutions e-commerce, le développement de chatbots IA et la création d'applications web haute performance avec Next.js et React.",
      cta: "Voir Mon Travail",
      contact: "Me Contacter",
    },
  };

  // Typing animation effect
  useEffect(() => {
    const titles = [
      texts[currentLang].title,
      "E-Commerce Specialist",
      "AI Chatbot Developer",
      "UX/UI Designer",
    ];

    let currentChar = 0;
    let isDeleting = false;
    let textToType = titles[currentTextIndex];

    const typeWriter = () => {
      if (isDeleting) {
        setTypedText((prev) => prev.substring(0, prev.length - 1));
        if (typedText === "") {
          isDeleting = false;
          setCurrentTextIndex((currentTextIndex + 1) % titles.length);
          textToType = titles[(currentTextIndex + 1) % titles.length];
        }
      } else {
        setTypedText(textToType.substring(0, currentChar + 1));
        currentChar++;
        if (currentChar === textToType.length) {
          isDeleting = true;
          setTimeout(() => {}, 2000); // Pause before deleting
        }
      }
    };

    const timer = setTimeout(typeWriter, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [typedText, currentTextIndex, currentLang]);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="mb-4 flex space-x-4">
                <button
                  onClick={() => setCurrentLang("en")}
                  className={`px-3 py-1 rounded-full text-sm ${currentLang === "en" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setCurrentLang("es")}
                  className={`px-3 py-1 rounded-full text-sm ${currentLang === "es" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  ES
                </button>
                <button
                  onClick={() => setCurrentLang("fr")}
                  className={`px-3 py-1 rounded-full text-sm ${currentLang === "fr" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  FR
                </button>
              </div>

              <p className="text-blue-600 font-medium mb-2">
                {texts[currentLang].greeting}
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                {texts[currentLang].name}
              </h1>

              <div className="h-12 mb-4">
                <h2 className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {texts[currentLang].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  href="#portfolio"
                  className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {texts[currentLang].cta}
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  {texts[currentLang].contact}
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center -top-4 -right-4 shadow-lg">
                <Code className="w-12 h-12 text-blue-600" />
              </div>
              <div className="absolute w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center -bottom-2 -left-2 shadow-lg">
                <Briefcase className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="w-3/4 h-3/4 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Muhammad Kamran Ali Rana"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
