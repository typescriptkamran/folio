import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Kamran</h3>
            <p className="text-gray-600 mb-4">
              Full Stack Developer & Designer specializing in creating
              beautiful, functional, and accessible web experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/@WillsonTim"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Twitter | X</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/typescript-kamran"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/typescriptkamran/"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-600">hello@kamranbuilds.com</span>
              </li>
{/*               <li className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li> */}
{/*               <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-600">San Francisco, CA</span>
              </li> */}
            </ul>
          </div>

          {/* Languages Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Languages</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  English
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  Español
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  Français
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {currentYear} Kamran. All rights reserved.
          </div>

          <div className="text-sm text-gray-500">
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
