import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import ContactForm from "@/components/contact-form";
import PortfolioItem from "@/components/portfolio-item";
import {
  ArrowUpRight,
  Code,
  Briefcase,
  Laptop,
  PenTool,
  Server,
  Globe,
  Lightbulb,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I am an experienced Product Manager with a strong background in
                e-commerce, full-stack development, and UI/UX design. Currently,
                I lead innovative product strategies at E-Commerce Group, where
                I drive growth, optimize user experiences, and develop
                cutting-edge digital solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With extensive expertise in Next.js (App Router), React, and
                full-stack development, I specialize in creating
                high-performance applications that enhance engagement and
                conversion. My journey in tech is complemented by a solid
                foundation in sales, business development, and customer
                experience, allowing me to bridge the gap between technology and
                business objectives.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get In Touch
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            What I Do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Product Management & Strategy
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Designing and executing digital product roadmaps.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Enhancing customer experiences with data-driven insights.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Managing cross-functional teams for seamless execution.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Full-Stack Development
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Building scalable web applications using Next.js, React, and
                    TypeScript.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Integrating APIs and third-party services to optimize
                    platform efficiency.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Ensuring security and best practices in web development.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                E-Commerce Solutions
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Developing custom e-commerce platforms and solutions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Implementing seamless payment gateways, authentication, and
                    checkout flows.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    Utilizing Convex for database persistence and transaction
                    handling.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">My Skills</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I've developed expertise in various technologies and tools to
              deliver comprehensive solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                title: "Frontend Development",
                description: "React, Next.js, Vue, HTML5, CSS3, Tailwind",
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: "Backend Development",
                description: "Node.js, Express, Python, PostgreSQL, MongoDB",
              },
              {
                icon: <PenTool className="w-6 h-6" />,
                title: "UI/UX Design",
                description: "Figma, Adobe XD, Responsive Design, Wireframing",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Web Performance",
                description: "Optimization, SEO, Analytics, Accessibility",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Project Management",
                description: "Agile, Scrum, JIRA, Version Control",
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                title: "Problem Solving",
                description:
                  "Critical thinking, Debugging, Technical Architecture",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              My Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "A full-featured online store with product management, cart, and checkout functionality.",
                tags: [
                  { name: "React", color: "blue" },
                  { name: "Node.js", color: "green" },
                  { name: "MongoDB", color: "yellow" },
                ],
              },
              {
                title: "Portfolio Website",
                description:
                  "A responsive portfolio website with dark mode and content management system.",
                tags: [
                  { name: "Next.js", color: "indigo" },
                  { name: "Tailwind", color: "purple" },
                  { name: "Supabase", color: "green" },
                ],
              },
              {
                title: "Task Management App",
                description:
                  "A collaborative task management application with real-time updates.",
                tags: [
                  { name: "Vue", color: "green" },
                  { name: "Firebase", color: "yellow" },
                  { name: "Vuetify", color: "blue" },
                ],
              },
              {
                title: "Social Media Dashboard",
                description:
                  "An analytics dashboard for tracking social media performance metrics.",
                tags: [
                  { name: "React", color: "blue" },
                  { name: "D3.js", color: "orange" },
                  { name: "Express", color: "gray" },
                ],
              },
              {
                title: "Fitness Tracking App",
                description:
                  "A mobile-first application for tracking workouts and nutrition.",
                tags: [
                  { name: "React Native", color: "blue" },
                  { name: "GraphQL", color: "pink" },
                  { name: "TypeScript", color: "indigo" },
                ],
              },
              {
                title: "Real Estate Platform",
                description:
                  "A property listing and management platform with map integration.",
                tags: [
                  { name: "Next.js", color: "indigo" },
                  { name: "PostgreSQL", color: "blue" },
                  { name: "Mapbox", color: "green" },
                ],
              },
            ].map((project, index) => (
              <PortfolioItem
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Get In Touch
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a project in mind or want to discuss a potential
                collaboration? Feel free to reach out!
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
