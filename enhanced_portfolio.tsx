import { useState, useEffect } from "react";
import { 
  Home, 
  FileText, 
  Code, 
  Mail, 
  Sun, 
  Moon, 
  ExternalLink,
  Github,
  Linkedin,
  Download,
  ChevronDown,
  Database,
  Cpu,
  BarChart3,
  Zap,
  Brain,
  Target
} from "lucide-react";

// Animated Background Component
function AnimatedBackground({ isDarkMode }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? 'bg-blue-400/20' : 'bg-blue-200/30'} animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Skill Badge Component
function SkillBadge({ icon: Icon, name, level, isDarkMode }) {
  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
        : 'bg-white/70 border-gray-200 hover:bg-white/90'
    }`}>
      <Icon className="w-4 h-4 text-blue-500" />
      <span className="text-sm font-medium">{name}</span>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-1 h-1 rounded-full ${i < level ? 'bg-blue-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ title, description, image, tools, githubLink, isDarkMode, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isDarkMode ? "bg-gray-800/70 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-900/80 to-transparent' : 'from-black/20 to-transparent'}`} />
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <Code className="w-16 h-16 text-white opacity-70" />
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tools.map((tool, i) => (
            <span
              key={i}
              className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600 text-gray-300"
                  : "bg-gray-100 border-gray-200 text-gray-700"
              }`}
            >
              {tool}
            </span>
          ))}
        </div>
        
        <a
          href={githubLink}
          className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors group"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm font-medium">View Project</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

// Typing Animation Component
function TypingAnimation({ texts, isDarkMode }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = texts[currentIndex];
    
    if (isTyping) {
      if (currentText.length < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [currentText, currentIndex, isTyping, texts]);

  return (
    <span className="text-blue-500 font-semibold">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ["home", "cv", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    { icon: Database, name: "Python", level: 4 },
    { icon: BarChart3, name: "Pandas", level: 4 },
    { icon: Brain, name: "Machine Learning", level: 3 },
    { icon: Cpu, name: "IoT Systems", level: 4 },
    { icon: Zap, name: "Embedded C", level: 5 },
    { icon: Target, name: "Data Analysis", level: 4 },
  ];

  const projects = [
    {
      title: "Health Monitoring Ring (IoT + Embedded C)",
      description: "An IoT-enabled wearable device that tracks vital signs like heart rate and body temperature using advanced sensor integration and real-time data processing.",
      tools: ["Embedded C", "IoT", "Sensors", "Real-time Processing"],
      githubLink: "https://github.com/ECEmanav/Health-Monitoring-System-IoT-Project.git"
    },
    {
      title: "Spotify Data Analysis using Python",
      description: "Comprehensive analysis of music listening patterns using Python, featuring advanced data visualization and trend analysis to uncover insights about music preferences.",
      tools: ["Python", "Pandas", "Matplotlib", "Data Visualization"],
      githubLink: "#"
    },
    {
      title: "Excel Dashboards for Sales Tracking",
      description: "Dynamic, interactive dashboards that visualize key performance indicators and sales metrics, enabling data-driven decision making for business growth.",
      tools: ["Excel", "PowerBI", "Data Visualization", "KPI Tracking"],
      githubLink: "#"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      <AnimatedBackground isDarkMode={isDarkMode} />
      
      {/* Enhanced Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-20 flex flex-col items-center justify-between py-6 z-50 backdrop-blur-md border-r transition-all duration-300 ${
        isDarkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200"
      }`}>
        <nav className="flex flex-col space-y-6 mt-12">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "cv", icon: FileText, label: "Resume" },
            { id: "projects", icon: Code, label: "Projects" },
            { id: "contact", icon: Mail, label: "Contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
              <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            isDarkMode
              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
              : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-20 relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="transform transition-all duration-1000"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manav Behl
              </h1>
              <div className="text-xl md:text-2xl mb-8 h-8">
                <TypingAnimation 
                  texts={["Data Analyst", "Electronics Engineer", "IoT Developer", "Problem Solver"]}
                  isDarkMode={isDarkMode}
                />
              </div>
              
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <Database className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Bridging the gap between <span className="text-blue-500 font-semibold">data insights</span> and 
                <span className="text-purple-500 font-semibold"> engineering excellence</span>. 
                Currently pursuing MSc in Data and Society at TUM.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {skills.map((skill, i) => (
                  <SkillBadge key={i} {...skill} isDarkMode={isDarkMode} />
                ))}
              </div>
              
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>View My Work</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section id="cv" className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional Background
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"
              }`}>
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">MSc Data and Society</h4>
                    <p className="text-sm text-gray-500">Technical University of Munich (TUM)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">B.Tech Electronics & Communication</h4>
                    <p className="text-sm text-gray-500">CGPA: 7.52</p>
                  </div>
                </div>
              </div>
              
              <div className={`p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"
              }`}>
                <h3 className="text-2xl font-bold mb-4 text-purple-500">Experience</h3>
                <div>
                  <h4 className="font-semibold">Management Trainee (Inside Sales)</h4>
                  <p className="text-sm text-gray-500 mb-2">Spinny HQ</p>
                  <p className="text-sm">Excel-based sales tracking and communication systems</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Download className="w-4 h-4" />
                <span>Download Full Resume</span>
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={i} 
                  {...project} 
                  isDarkMode={isDarkMode}
                  delay={i * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className={`p-8 rounded-2xl backdrop-blur-sm ${
                isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/70 border border-gray-200"
              }`}>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full p-4 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white/80 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full p-4 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white/80 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className={`w-full p-4 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      isDarkMode
                        ? "bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white/80 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                  <button
                    onClick={() => alert('Message sent! (Demo only)')}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">Connect with Me</h3>
                <div className="space-y-4">
                  {[
                    { icon: Github, label: "GitHub", href: "#" },
                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                    { icon: Mail, label: "Email", href: "mailto:manav@example.com" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-gray-700/50"
                          : "bg-white/70 hover:bg-white/90"
                      }`}
                    >
                      <social.icon className="w-6 h-6 text-blue-500" />
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}