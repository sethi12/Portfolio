import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, User, FolderOpen, Send, Briefcase, Code, Terminal, Zap, HardHat, Server, Cloud, Database } from 'lucide-react';

// --- Configuration Data (Finalized for Chaitanya Sethi) ---
// const config = {
//   developerName: "Chaitanya Sethi",
//   tagline: "Mobile & Cloud Architect | Crafting Cross-Platform Experiences with AI Integration.",
//   skills: [
//     "Flutter", "Firebase", "Google Cloud", "ReactJS", "NextJS", "NodeJS", "MongoDB", "AWS", "Supabase", "Java"
//   ],
//   projects: [
//     {
//       id: 1,
//       title: "Zizzle: AI-Enhanced Social Media Platform",
//       description: "A feature-rich mobile social media app with reels, chat, payments, and unique AI tools (Gemini API integration for image generation, chat, and voice control).",
//       tech: ["Flutter", "Firebase", "NodeJS", "Google Cloud", "Gemini API"],
//       liveLink: "INSERT_ZIZZLE_PLAYSTORE_URL_HERE",
//       repoLink: "INSERT_ZIZZLE_GITHUB_URL_HERE",
//       iconType: "Mobile"
//     },
//     {
//       id: 2,
//       title: "Modern E-Commerce Platform (React/Firebase)",
//       description: "A high-performance e-commerce site using a modern JAMstack approach, focusing on clean UI/UX with **Tailwind CSS** and secure payment gateway integration.",
//       tech: ["ReactJS", "NodeJS", "Firebase", "Tailwind CSS"],
//       liveLink: "INSERT_ECOMMERCE_FIREBASE_VERCEL_URL_HERE",
//       repoLink: "INSERT_ECOMMERCE_FIREBASE_GITHUB_URL_HERE",
//       iconType: "Web"
//     },
//     {
//       id: 3,
//       title: "Robust E-Commerce Backend System (MERN)",
//       description: "A traditional, scalable full-stack e-commerce solution built with the MERN stack to demonstrate deep expertise in comprehensive backend and database architecture.",
//       tech: ["ReactJS", "ExpressJS", "MongoDB", "Bootstrap"],
//       liveLink: "INSERT_ECOMMERCE_MERN_VERCEL_URL_HERE",
//       repoLink: "INSERT_ECOMMERCE_MERN_GITHUB_URL_HERE",
//       iconType: "Web"
//     },
//     // The Java Swing/MySQL project is mentioned in the summary below
//   ],
//   contact: {
//     email: "chaitanya.sethi.dev@example.com", // Placeholder
//     linkedin: "https://linkedin.com/in/chaitanyasethi-placeholder", // Placeholder
//     github: "https://github.com/chaitanyasethi-placeholder", // Placeholder
//   }
// };
const config = {
  developerName: "Chaitanya Sethi",
  tagline: "Mobile • Cloud • Full-Stack Engineer | Building High-Performance Apps With AI & Scalable Architectures.",
  skills: [
    "Flutter", "Firebase", "Google Cloud", "ReactJS", "NextJS", "NodeJS",
    "MongoDB", "AWS", "Supabase", "Java"
  ],

  projects: [
    {
      id: 1,
      title: "Zizzle – AI-Powered Social Media App",
      description:
        "A next-generation social platform built entirely in Flutter with a fully optimized reel engine, real-time chat system, creator monetization (₹19/₹99/₹249 plans), global content boosting, and AI utilities powered by Gemini API for smart chat, image generation, and voice-activated commands. Implemented fast-start video playback, caching, BetterPlayer optimization, and a global audio controller for synchronized UI updates across widgets.",
      tech: ["Flutter", "Firebase", "NodeJS", "Google Cloud", "Gemini API"],
      liveLink: "https://play.google.com/store/apps/details?id=com.InbredTechno.Zizzle",
      repoLink: "https://github.com/sethi12/zizzle",
      iconType: "Mobile"
    },

    {
      id: 2,
      title: "Modern E-Commerce Platform (React + Firebase)",
      description:
        "A fully dynamic e-commerce platform with responsive UI/UX designed using Tailwind CSS. Includes secure user authentication, product filtering, cart management, wishlist system, and Firebase-based real-time database reads with optimized queries. Deployed on Vercel with blazing-fast static generation.",
      tech: ["ReactJS", "NodeJS", "Firebase", "Tailwind CSS"],
      liveLink: "INSERT_ECOMMERCE_FIREBASE_VERCEL_URL_HERE",
      repoLink: "INSERT_ECOMMERCE_FIREBASE_GITHUB_URL_HERE",
      iconType: "Web"
    },

    {
      id: 3,
      title: "Enterprise-Grade E-Commerce Backend (MERN Stack)",
      description:
        "A scalable backend architecture with Express APIs, JWT authentication, role-based access, order workflow, and MongoDB aggregation for high-speed filtering. Designed to model real-world e-commerce operations including admin dashboards, inventory logic, and payment workflow simulation.",
      tech: ["ReactJS", "ExpressJS", "MongoDB", "Bootstrap"],
      liveLink: "INSERT_ECOMMERCE_MERN_VERCEL_URL_HERE",
      repoLink: "INSERT_ECOMMERCE_MERN_GITHUB_URL_HERE",
      iconType: "Web"
    }
  ],

  contact: {
    email: "sethichaitanya03@gmail.com",
    linkedin: "https://www.linkedin.com/in/chaitanya-sethi-420974229/",
    github: "https://github.com/sethi12",
  }
};

// --- SVG Definitions for Tech Logos (Inline Assets) ---

const TechLogo = ({ name, size = 20 }) => {
  const logos = {
    Flutter: {
      color: "#02569B",
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.08 193.38l-157.1-158a18.3 18.3 0 00-25.9 0L19.28 193.38a18.3 18.3 0 000 25.89l157.1 157.99a18.3 18.3 0 0025.9 0l157.7-158a18.3 18.3 0 000-25.88zm-157.06 182.2L64.8 219.21l-3.3 3.3a18.3 18.3 0 000 25.89l157.1 158a18.3 18.3 0 0025.9 0l157.7-158a18.3 18.3 0 000-25.89l-3.3-3.3-157.1 156.4a18.3 18.3 0 01-25.88 0z"/></svg>
    },
    Firebase: {
      color: "#FFCA28",
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M192 31.9L64 256h128L64 512l320-256H256L384 0 192 31.9z"/></svg>
    },
    ReactJS: {
      color: "#61DAFB",
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440 256c0-11.8-2.5-23.3-7.2-34L351.5 88.2c-15.3-29.4-46.7-47.5-80.4-47.5h-94.2c-33.7 0-65.1 18.1-80.4 47.5L15.2 222c-4.7 10.7-7.2 22.2-7.2 34 0 71.3 57.3 128.8 128 128.8 19.3 0 37.8-4.5 54.3-12.2l12.4 23.4c-1.3 2.5-2.6 5-3.9 7.4-41.2 78.4-150.5 106.3-228.9 65.1-78.4-41.2-106.3-150.5-65.1-228.9s150.5-106.3 228.9-65.1c71.6 37.7 114.9 113.1 114.9 193.9 0 4.2-.2 8.4-.5 12.5 1.5-1.9 3.1-3.7 4.7-5.5 50.4-56.3 80.5-131.5 80.5-212.8zM224 352a96 96 0 100-192 96 96 0 000 192zM128 256a96 96 0 11192 0 96 96 0 01-192 0z"/></svg>
    },
    NextJS: {
      color: "#FFFFFF",
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="currentColor" d="M14.83 31.32L21.75 44h4.5l-8.49-14.73zM28.09 30.79L36.21 16H42.79L28.09 41.71zM11.63 16h6.81l-3.41 6.82zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm14.16 29.89L25.84 27.5l2.42-4.18-8.42 14.71-3.08-5.32 8.44-14.73L21.03 8.28H38.16L24 24.16z"/></svg>
    },
    NodeJS: {
      color: "#68A063",
      svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 256v128h32l32 32h128l32-32V256H0zm256 0v128l32 32h128l32-32V256H256zM0 128v128h32l32-32V128H0zm256 0v128l32-32V128H256z"/></svg>
    },
    // Using Lucide icons for others for file size efficiency and common representation
    MongoDB: { color: "#47A248", svg: <Database className="w-5 h-5" /> },
    ExpressJS: { color: "#FFFFFF", svg: <Server className="w-5 h-5" /> },
    "Tailwind CSS": { color: "#38B2AC", svg: <Code className="w-5 h-5" /> },
    "Google Cloud": { color: "#4285F4", svg: <Cloud className="w-5 h-5" /> },
    "Gemini API": { color: "#8E2DE2", svg: <Terminal className="w-5 h-5" /> },
    AWS: { color: "#FF9900", svg: <HardHat className="w-5 h-5" /> },
    Supabase: { color: "#3ECF8E", svg: <Database className="w-5 h-5" /> },
    Java: { color: "#F8981D", svg: <Code className="w-5 h-5" /> },
    Dart: { color: "#0175C2", svg: <Code className="w-5 h-5" /> },
    Bootstrap: { color: "#7952B3", svg: <Code className="w-5 h-5" /> },
    Github: { color: "#C6C6C6", svg: <Github className="w-5 h-5" /> },
    Vercel: { color: "#FFFFFF", svg: <Cloud className="w-5 h-5" /> }
  };

  const logo = logos[name];
  if (!logo) return <span className="text-gray-400">{name}</span>;

  return (
    <div style={{ color: logo.color }} className="w-full h-full p-0.5" title={name}>
      {React.cloneElement(logo.svg, { style: { height: size, width: size } })}
    </div>
  );
};

// --- Custom Components ---

/**
 * Creates the simulated 3D/holographic depth effect for the hero card.
 */
const HolographicCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleTilt = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const tiltX = ((clientY - centerY) / centerY) * 10;
    const tiltY = ((clientX - centerX) / centerX) * -10;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('touchmove', handleTilt, { passive: true });
        card.addEventListener('touchend', resetTilt);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleTilt);
        card.removeEventListener('mouseleave', resetTilt);
        card.removeEventListener('touchmove', handleTilt);
        card.removeEventListener('touchend', resetTilt);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out hover:shadow-2xl hover:shadow-cyan-500/50 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ icon: Icon, title }) => (
  <h2 className="text-3xl font-extrabold text-cyan-400 mb-8 flex items-center">
    <Icon className="w-6 h-6 mr-3 text-emerald-400" />
    {title}
  </h2>
);

const ProjectCard = ({ project }) => {
    const MainIcon = project.iconType === "Mobile" ? Terminal : Briefcase;
    const liveText = project.iconType === "Mobile" ? "Live on Play Store" : "Live Website";

    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-cyan-500 transition duration-300 transform hover:scale-[1.02] flex flex-col h-full">
        {/* Project Icon/Image Placeholder */}
        <div className="flex justify-between items-start mb-4">
            <MainIcon className="w-8 h-8 text-fuchsia-400" />
            <div className="text-xs text-gray-500">
                {liveText}
            </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm flex-grow">{project.description}</p>

        {/* Technology Logos */}
        <div className="border-t border-gray-700 pt-4 mb-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t, index) => (
                <div key={index} className="h-6 w-6">
                    <TechLogo name={t} size={24} />
                </div>
              ))}
            </div>
        </div>

        {/* Action Links */}
        <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-700">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-sm bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 transition duration-200 text-center font-semibold"
          >
            {liveText}
          </a>
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-sm bg-gray-700 text-cyan-300 rounded-lg hover:bg-gray-600 transition duration-200 text-center font-semibold"
          >
            GitHub Repo
          </a>
        </div>
        {/* Reminder for placeholder links */}
        {/* {(project.liveLink.includes('INSERT') || project.repoLink.includes('INSERT')) && (
            // <p className="text-red-400 text-xs mt-2 text-center">**Update links in code!**</p>
        )} */}
      </div>
    );
};


// --- Sections ---

const HeroSection = ({ developerName, tagline, onContactClick }) => (
  <div className="relative h-screen flex items-center justify-center p-4">
    {/* Background Grid/Pattern */}
    <div className="absolute inset-0 bg-black opacity-30 [mask-image:radial-gradient(transparent,black)]">
      <div className="h-full w-full bg-[size:30px_30px] opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #083344 1px, transparent 1px), linear-gradient(to bottom, #083344 1px, transparent 1px)' }}></div>
    </div>
    <div className="z-10 text-center">
      <HolographicCard className="bg-gray-900/90 backdrop-blur-sm p-8 md:p-12 lg:p-16 rounded-3xl border border-cyan-800/50 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter" style={{ textShadow: '0 0 10px rgba(0,255,255,0.7)' }}>
          {developerName}
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400 font-light mb-8 italic">
          {tagline}
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-full transition-all duration-300 hover:bg-cyan-500 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            See Live Work
          </a>
          <button
            onClick={onContactClick}
            className="px-6 py-3 bg-fuchsia-600 text-white font-bold rounded-full transition-all duration-300 hover:bg-fuchsia-500 transform hover:scale-105 shadow-lg shadow-fuchsia-500/30"
          >
            Get In Touch
          </button>
        </div>
      </HolographicCard>
    </div>
  </div>
);

const AboutSection = () => (
  <section id="about" className="py-20 px-4 md:px-8 bg-gray-900">
    <div className="max-w-6xl mx-auto">
      <SectionTitle icon={User} title="About The Architect" />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-lg text-gray-300">
<p>
I am an MCA candidate at Amity University, specializing in architecting fast, scalable, and cloud-powered applications that deliver seamless, real-world performance.
</p>

<p>
  I engineer production-grade mobile applications in **Flutter/Dart**, design robust backends using **Node.js/Express**, and build modern web apps with **ReactJS/Next.js**. I work extensively with **Firebase, Supabase, AWS, Google Cloud**, and both SQL/NoSQL databases to deliver secure and scalable systems.
</p>

<p className="text-cyan-300 font-semibold italic">
  My flagship creation, Zizzle, showcases real-world engineering — optimized reel playback, proactive caching, global audio controllers, AI integrations (Gemini), real-time chat, and a complete monetization ecosystem.
</p>

        </div>
        <div>
          <SectionTitle icon={Code} title="Skill Matrix" />
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {config.skills.map((skill, index) => {
              const delay = index * 0.05;
              return (
                <div
                  key={skill}
                  className="p-3 bg-gray-800 rounded-xl border border-gray-700 transition duration-300 hover:bg-gray-700/50 text-center w-24 h-24 flex flex-col items-center justify-center"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${delay}s backwards`,
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <TechLogo name={skill} size={30} />
                  <span className="text-xs font-medium text-gray-300 mt-2">{skill}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-20 px-4 md:px-8 bg-gray-950 border-t border-b border-gray-800">
    <div className="max-w-6xl mx-auto">
      <SectionTitle icon={FolderOpen} title="Live Deployments & Code" />
      <div className="grid md:grid-cols-3 gap-8">
        {config.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {/* <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
        {/* <p className="text-gray-400 text-sm">
          **Additional Project:** Completed a fully functional **Hotel Management System** using **Java Swing** for the frontend and **MySQL** for robust data storage, demonstrating proficiency in traditional desktop application development and relational databases.
        </p> }
      </div> */}
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // SIMULATION: In a real application, this is where you would use fetch()
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        console.log('Form Submitted:', formData);
        setStatus('Message Sent! I will be in touch soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Please fill out all fields.');
      }
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <SectionTitle icon={Send} title="Initiate Contact Protocol" />
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl border border-gray-700">
            {['name', 'email'].map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-900 text-white border border-cyan-800 rounded-lg focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition duration-200"
              />
            ))}
            <textarea
              name="message"
              placeholder="Your Message (max 500 characters)"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              maxLength="500"
              className="w-full p-3 bg-gray-900 text-white border border-cyan-800 rounded-lg focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition duration-200 resize-none"
            />
            <button
              type="submit"
              disabled={status.startsWith('Sending')}
              className="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg transition duration-300 hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {status.startsWith('Sending') ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Transmit Data'
              )}
            </button>
            {status && !status.startsWith('Sending') && (
              <p className={`text-center font-semibold ${status.includes('Sent') ? 'text-emerald-400' : 'text-red-400'}`}>
                {status}
              </p>
            )}
          </form>

          {/* Contact Details */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4 border-b border-cyan-700 pb-2">Direct Links</h3>
            <div className="space-y-6">
              <a href={`mailto:${config.contact.email}`} className="flex items-center text-gray-300 hover:text-cyan-400 transition duration-200 group">
                <Mail className="w-6 h-6 mr-3 text-cyan-400 group-hover:scale-110 transition" />
                <span className="text-lg">sethichaitanya03@gmail.com</span>
              </a>
              <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition duration-200 group">
                <Linkedin className="w-6 h-6 mr-3 text-cyan-400 group-hover:scale-110 transition" />
                <span className="text-lg">LinkedIn Profile</span>
              </a>
              <a href={config.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition duration-200 group">
                <Github className="w-6 h-6 mr-3 text-cyan-400 group-hover:scale-110 transition" />
                <span className="text-lg">GitHub Repositories</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Application ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md shadow-lg shadow-black/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <a href="#hero" className="text-2xl font-extrabold text-cyan-400 tracking-wider hover:text-cyan-300 transition duration-200">
        CS.<span className="text-fuchsia-400">ARCHITECT</span>
      </a>
      <nav className="hidden md:flex space-x-8">
        {['About', 'Projects', 'Contact'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 text-lg relative group"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        ))}
      </nav>
      {/* Mobile Menu Placeholder - In a real app, this would be a hamburger menu */}
      <div className="md:hidden">
        <button className="text-cyan-400 p-2 border border-cyan-700 rounded hover:bg-gray-800">
          <Terminal className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-950/90 border-t border-gray-800 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} {config.developerName}. All rights reserved.</p>
      {/* <p className="mt-1">
        Built with <span className="text-cyan-400">React</span> and <span className="text-fuchsia-400">Tailwind CSS</span> for a futuristic experience.
      </p> */}
    </div>
  </footer>
);

export default function App() {
  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans" id="hero">
      {/* Tailwind CSS import via CDN (required for single-file HTML/JSX demos) */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #030712; /* Gray-950 equivalent */
          scroll-behavior: smooth;
        }

        /* Keyframes for simple element entrance animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Apply a subtle glow/glitch effect to the entire app for 3D/sci-fi feel */
        #root > div {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.05);
        }
      `}</style>
      <Header />
      <main>
        <HeroSection
          developerName={config.developerName}
          tagline={config.tagline}
          onContactClick={handleContactClick}
        />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
