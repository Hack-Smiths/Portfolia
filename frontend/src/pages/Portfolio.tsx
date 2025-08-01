import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download,
  Copy,
  Star,
  Calendar,
  MapPin,
  Award,
  Code,
  Eye,
  Share2,
  Sparkles,
  Palette,
  Zap,
  Waves,
  Globe,
  Building,
  Settings,
  Trophy,
  GraduationCap,
  BarChart3,
  Activity,
  Briefcase,
  Edit3,
  CheckCircle,
  ArrowRight,
  Code2,
  Rocket,
  Target,
  Lightbulb,
  User,
  BookOpen,
  Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import AIEditAssistant from "@/components/AIEditAssistant";

const Portfolio = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('classic');
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const templates = {
    classic: {
      name: 'Classic Pro',
      icon: <Briefcase className="w-4 h-4" />,
      layout: 'corporate-clean',
      styles: {
        background: 'bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900',
        card: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300',
        text: 'text-gray-900 dark:text-gray-100',
        accent: 'bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300',
        glow: 'shadow-xl hover:shadow-2xl',
        header: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-gray-200 dark:border-slate-700',
        mesh: 'opacity-5'
      }
    },
    creative: {
      name: 'Creative Canvas',
      icon: <Palette className="w-4 h-4" />,
      layout: 'designer-artistic',
      styles: {
        background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 dark:from-slate-900 dark:via-purple-900 dark:to-pink-900',
        card: 'backdrop-blur-xl bg-slate-900/80 border border-purple-500/30 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:border-purple-400/50',
        text: 'text-gray-100 dark:text-gray-100',
        accent: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50',
        glow: 'shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/60',
        header: 'bg-slate-900/95 backdrop-blur-xl border-purple-500/30',
        mesh: 'opacity-30'
      }
    },
    modern: {
      name: 'Modern Grid',
      icon: <Zap className="w-4 h-4" />,
      layout: 'tech-sidebar',
      styles: {
        background: 'bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
        card: 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-300',
        text: 'text-gray-900 dark:text-gray-100',
        accent: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30',
        glow: 'shadow-lg hover:shadow-xl',
        header: 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600',
        mesh: 'opacity-10'
      }
    }
  };

  const currentStyles = templates[currentTemplate].styles;

  const portfolioData = {
    name: "Alex Chen",
    title: "Full-Stack Developer & AI Enthusiast",
    tagline: "Building the future with code, one project at a time",
    location: "San Francisco, CA",
    email: "alex.chen@email.com",
    github: "alex-dev",
    linkedin: "alexchen-dev",
    about: "Aspiring full-stack developer with a passion for AI and machine learning. Experienced in React, Python, and cloud technologies. Currently pursuing Computer Science degree while building real-world applications and contributing to open-source projects.",
    
    projects: [
      {
        id: 1,
        title: "E-commerce API",
        description: "Full-stack e-commerce platform with Django REST Framework, JWT authentication, and payment integration",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        tech: ["Django", "PostgreSQL", "Redis", "Docker"],
        features: ["User Authentication", "Payment Processing", "Admin Dashboard", "Real-time Inventory"],
        stars: 123,
        demo: "https://demo.example.com",
        repo: "https://github.com/alex-dev/ecommerce-api",
        featured: true
      },
      {
        id: 2,
        title: "AI Chat Application",
        description: "Real-time chat app with AI assistant integration using OpenAI API and WebSockets",
        image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&h=250&fit=crop",
        tech: ["Node.js", "Socket.io", "OpenAI", "Express"],
        features: ["AI-Powered Responses", "Real-time Messaging", "Message History", "Multi-user Support"],
        stars: 234,
        demo: "https://chat.example.com",
        repo: "https://github.com/alex-dev/ai-chat",
        featured: true
      },
      {
        id: 3,
        title: "Portfolio Dashboard",
        description: "Modern React dashboard with TypeScript, TailwindCSS, and responsive design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        tech: ["React", "TypeScript", "TailwindCSS", "Vite"],
        features: ["Responsive Design", "Dark Mode", "Performance Optimized", "Modern UI"],
        stars: 87,
        demo: "https://portfolio.example.com",
        repo: "https://github.com/alex-dev/portfolio",
        featured: false
      }
    ],

    achievements: [
      {
        title: "Software Engineering Intern",
        issuer: "TechCorp Inc.",
        date: "Summer 2024",
        type: "internship",
        description: "Developed microservices architecture, improved API performance by 40%"
      },
      {
        title: "Best Innovation Award",
        issuer: "University Hackathon",
        date: "2024",
        type: "award",
        description: "First place for developing an AI-powered sustainability platform"
      }
    ],

    certificates: [
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024",
        credentialId: "AWS-12345"
      },
      {
        title: "Google Data Analytics Certificate",
        issuer: "Google",
        date: "2023",
        credentialId: "GOOGLE-67890"
      }
    ],

    skills: [
      { name: "React", level: 85, category: "Frontend" },
      { name: "Python", level: 90, category: "Backend" },
      { name: "TypeScript", level: 80, category: "Frontend" },
      { name: "Django", level: 75, category: "Backend" },
      { name: "AWS", level: 60, category: "Cloud" },
      { name: "Machine Learning", level: 70, category: "AI/ML" },
      { name: "Docker", level: 65, category: "DevOps" },
      { name: "PostgreSQL", level: 70, category: "Database" }
    ]
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText("https://portfolio.alexchen.dev");
  };

  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

  const EditButton = ({ section }: { section: string }) => (
    isEditMode && (
      <Button
        size="sm"
        variant="outline"
        className="absolute top-4 right-4 z-10 w-8 h-8 p-0 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white shadow-lg"
        onClick={() => setEditingSection(section)}
      >
        <Edit3 className="w-4 h-4 text-gray-700" />
      </Button>
    )
  );

  return (
    <div className={`min-h-screen transition-all duration-700 ${currentStyles.background}`}>
      <Navbar />
      
      {/* Portfolio Header - Floating */}
      <header className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 w-[95%] max-w-4xl`}>
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-base text-foreground">Portfolio Preview</p>
                <p className="text-xs text-muted-foreground">Live • Last updated 2 hours ago</p>
              </div>
              <div className="sm:hidden">
                <p className="font-semibold text-sm text-foreground">Preview</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant={isEditMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`${isEditMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white/50 dark:bg-slate-800/50'} transition-all duration-300 rounded-xl text-xs sm:text-sm px-2 sm:px-3`}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">{isEditMode ? 'Exit Edit' : 'Edit Mode'}</span>
                <span className="sm:hidden">{isEditMode ? 'Exit' : 'Edit'}</span>
              </Button>
              <Link to="/export">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg rounded-xl shadow-lg text-xs sm:text-sm px-2 sm:px-3">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Export & Share</span>
                  <span className="sm:hidden">Export</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Vertical Template Switcher */}
      <div className="fixed top-32 right-6 z-40">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-xl p-3 shadow-lg">
          <div className="text-xs text-center text-muted-foreground mb-3 font-medium">Templates</div>
          <div className="flex flex-col space-y-2">
            {Object.entries(templates).map(([key, template]) => (
              <Button
                key={key}
                size="sm"
                variant={currentTemplate === key ? "default" : "outline"}
                onClick={() => setCurrentTemplate(key)}
                className={`w-12 h-12 p-0 rounded-lg transition-all duration-300 ${
                  currentTemplate === key 
                    ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg` 
                    : `bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/50`
                }`}
                title={template.name}
              >
                {template.icon}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="pt-44 pb-20">
        
        {/* Template 1: Classic Pro - Corporate & Clean */}
        {currentTemplate === 'classic' && (
          <div className="space-y-0">
            {/* Header Section - Full Width Professional */}
            <section className="relative bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-32 h-32 border-4 border-blue-100 dark:border-blue-900 shadow-lg">
                      <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                      <AvatarFallback className="text-4xl font-bold bg-blue-600 text-white">
                        {portfolioData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 text-center lg:text-left space-y-4">
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {portfolioData.name}
                      </h1>
                      <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                        {portfolioData.title}
                      </p>
                      <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{portfolioData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{portfolioData.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <Button className={currentStyles.accent}>
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button className={currentStyles.accent}>
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                        <Download className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Me - Horizontal Card */}
            <section className="py-16 px-6 bg-gray-50 dark:bg-slate-900">
              <div className="max-w-7xl mx-auto">
                <Card className={`${currentStyles.card} p-8 relative`}>
                  <EditButton section="About Me" />
                  <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">About Me</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {portfolioData.about}
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* Stats Summary - Horizontal Row */}
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{portfolioData.projects.length}+</div>
                    <div className="text-gray-600 dark:text-gray-400">Projects</div>
                  </Card>
                  <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{portfolioData.achievements.length}+</div>
                    <div className="text-gray-600 dark:text-gray-400">Achievements</div>
                  </Card>
                  <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{portfolioData.certificates.length}+</div>
                    <div className="text-gray-600 dark:text-gray-400">Certificates</div>
                  </Card>
                  <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{portfolioData.skills.length}+</div>
                    <div className="text-gray-600 dark:text-gray-400">Skills</div>
                  </Card>
                </div>
              </div>
            </section>

            {/* Projects - Grid View */}
            <section className="py-16 px-6 bg-gray-50 dark:bg-slate-900">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Projects</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                  <EditButton section="Projects" />
                  {portfolioData.projects.map((project) => (
                    <Card key={project.id} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        {project.featured && (
                          <Badge className="bg-blue-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" className={`flex-1 ${currentStyles.accent}`} asChild>
                          <a href={project.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills - Category Pills */}
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technical Skills</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="space-y-8 relative">
                  <EditButton section="Skills" />
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <Card key={category} className={`${currentStyles.card} p-6`}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="secondary" 
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Achievements - Timeline */}
            <section className="py-16 px-6 bg-gray-50 dark:bg-slate-900">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Achievements</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="space-y-6 relative">
                  <EditButton section="Achievements" />
                  {portfolioData.achievements.map((achievement, index) => (
                    <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          {achievement.type === 'internship' ? 
                            <Briefcase className="w-6 h-6 text-white" /> : 
                            <Trophy className="w-6 h-6 text-white" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              {achievement.title}
                            </h3>
                            <Badge variant="outline">{achievement.date}</Badge>
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{achievement.issuer}</p>
                          <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Certificates - Grid */}
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Certifications</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <EditButton section="Certificates" />
                  {portfolioData.certificates.map((cert, index) => (
                    <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {cert.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{cert.date}</p>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center space-x-6 mb-6">
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
                <p className="text-gray-600 dark:text-gray-400">© 2024 {portfolioData.name}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        )}

        {/* Template 2: Creative Canvas - Dark Designer Vibe */}
        {currentTemplate === 'creative' && (
          <div className="space-y-0">
            {/* Hero Section - Center Aligned with Glow */}
            <section className="relative py-32 px-6 overflow-hidden">
              <div className={`absolute inset-0 ${currentStyles.mesh}`}>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Badge className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 text-lg">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Available for Creative Projects
                    </Badge>
                    
                    <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {portfolioData.name}
                      </span>
                    </h1>
                    
                    <div className="space-y-4">
                      <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                        {portfolioData.title}
                      </p>
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {portfolioData.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 justify-center">
                    <Button className={`${currentStyles.accent} px-8 py-4 text-lg font-semibold`}>
                      <Rocket className="w-5 h-5 mr-3" />
                      View My Work
                    </Button>
                    <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                      <User className="w-5 h-5 mr-3" />
                      Get In Touch
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* About Me - Quote Style */}
            <section className="py-24 px-6">
              <div className="max-w-5xl mx-auto text-center">
                <Card className={`${currentStyles.card} p-12 relative`}>
                  <EditButton section="About Me" />
                  <blockquote className="text-2xl md:text-3xl font-light text-gray-100 leading-relaxed italic">
                    "{portfolioData.about}"
                  </blockquote>
                  <div className="mt-8 text-cyan-400 font-semibold">— {portfolioData.name}</div>
                </Card>
              </div>
            </section>

            {/* Stats - Circular Dials */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-32 h-32 bg-slate-900 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">{portfolioData.projects.length}+</div>
                          <div className="text-xs text-gray-400">Projects</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-32 h-32 bg-slate-900 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-400">{portfolioData.achievements.length}+</div>
                          <div className="text-xs text-gray-400">Awards</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-32 h-32 bg-slate-900 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-pink-400">{portfolioData.certificates.length}+</div>
                          <div className="text-xs text-gray-400">Certs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-32 h-32 bg-slate-900 rounded-full border-4 border-purple-500/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">{portfolioData.skills.length}+</div>
                          <div className="text-xs text-gray-400">Skills</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects - Carousel Style */}
            <section className="py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Featured Work
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="relative space-y-12">
                  <EditButton section="Projects" />
                  {portfolioData.projects.map((project, index) => (
                    <Card key={project.id} className={`${currentStyles.card} p-8 hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-500`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                          <div className="flex items-start justify-between mb-6">
                            <h3 className="text-3xl font-bold text-gray-100 mb-4">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <Badge className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                                <Star className="w-4 h-4 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-3 mb-8">
                            {project.tech.map((tech: string, i: number) => (
                              <Badge key={i} className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex space-x-4">
                            <Button className={currentStyles.accent} asChild>
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-5 h-5 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                            <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" asChild>
                              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5 mr-2" />
                                Source Code
                              </a>
                            </Button>
                          </div>
                        </div>
                        
                        <div className={index % 2 === 0 ? "order-2" : "order-1"}>
                          <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
                            <div className="relative bg-slate-800 rounded-xl p-6 border border-purple-500/30">
                              <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                                <Code2 className="w-16 h-16 text-purple-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills - Radial Map */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Tech Arsenal
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="relative">
                  <EditButton section="Skills" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <Card key={category} className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow}`}>
                        <div className="mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Layers className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-100">{category}</h3>
                        </div>
                        <div className="space-y-3">
                          {categorySkills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="text-purple-300">
                              {skill.name}
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements - Horizontal Timeline */}
            <section className="py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Journey Milestones
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="relative">
                  <EditButton section="Achievements" />
                  <div className="flex flex-col md:flex-row gap-8">
                    {portfolioData.achievements.map((achievement, index) => (
                      <Card key={index} className={`${currentStyles.card} p-8 flex-1 hover:${currentStyles.glow}`}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            {achievement.type === 'internship' ? 
                              <Briefcase className="w-8 h-8 text-white" /> : 
                              <Trophy className="w-8 h-8 text-white" />
                            }
                          </div>
                          <div className="text-cyan-400 text-sm font-semibold mb-2">{achievement.date}</div>
                          <h3 className="text-xl font-bold text-gray-100 mb-2">
                            {achievement.title}
                          </h3>
                          <p className="text-purple-400 font-medium mb-3">{achievement.issuer}</p>
                          <p className="text-gray-300 text-sm">{achievement.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Certificates - Accordion Style */}
            <section className="py-24 px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    Credentials
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="space-y-4 relative">
                  <EditButton section="Certificates" />
                  {portfolioData.certificates.map((cert, index) => (
                    <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-100">{cert.title}</h3>
                            <p className="text-purple-400">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                          <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer - Dark with Floating Icons */}
            <footer className="py-16 px-6 border-t border-purple-500/30">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center space-x-8 mb-8">
                  <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg hover:shadow-purple-500/50">
                    <Github className="w-6 h-6" />
                  </Button>
                  <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/50">
                    <Linkedin className="w-6 h-6" />
                  </Button>
                  <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg hover:shadow-purple-500/50">
                    <Mail className="w-6 h-6" />
                  </Button>
                </div>
                <p className="text-gray-400">© 2024 {portfolioData.name}. Crafted with passion and code.</p>
              </div>
            </footer>
          </div>
        )}

        {/* Template 3: Modern Grid - Two Column Layout */}
        {currentTemplate === 'modern' && (
          <div className="flex min-h-screen">
            {/* Left Sidebar */}
            <div className="w-80 bg-white dark:bg-slate-800 border-r border-gray-300 dark:border-slate-600 fixed left-0 top-20 bottom-0 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Profile */}
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-indigo-200 dark:border-indigo-800">
                    <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      {portfolioData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{portfolioData.name}</h1>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{portfolioData.title}</p>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  <Button className={`w-full justify-start ${currentStyles.accent}`}>
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button className={`w-full justify-start ${currentStyles.accent}`}>
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-indigo-200 dark:border-indigo-800">
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Stats</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-indigo-50 dark:bg-indigo-950/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{portfolioData.projects.length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{portfolioData.skills.length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Skills</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span>{portfolioData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 ml-80">
              <div className="p-8 space-y-12">
                
                {/* About & Download */}
                <section>
                  <Card className={`${currentStyles.card} p-8 relative`}>
                    <EditButton section="About Me" />
                    <div className="flex items-start justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">About Me</h2>
                      <Button className={currentStyles.accent}>
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {portfolioData.about}
                    </p>
                  </Card>
                </section>

                {/* Projects - Masonry Grid */}
                <section>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Projects</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                    <EditButton section="Projects" />
                    {portfolioData.projects.map((project) => (
                      <Card key={project.id} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                          </div>
                          {project.featured && (
                            <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                          <Button size="sm" className={`flex-1 ${currentStyles.accent}`} asChild>
                            <a href={project.repo} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Skills - Tag Cloud */}
                <section>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Skills</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-6 relative">
                    <EditButton section="Skills" />
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <Card key={category} className={`${currentStyles.card} p-6`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-indigo-600" />
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Achievements - Bullet List */}
                <section>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Achievements</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-4 relative">
                    <EditButton section="Achievements" />
                    {portfolioData.achievements.map((achievement, index) => (
                      <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                        <div className="flex items-start gap-4">
                          <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                            {achievement.date}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{achievement.issuer}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{achievement.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Certificates - Card Stack */}
                <section>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Certifications</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    <EditButton section="Certificates" />
                    {portfolioData.certificates.map((cert, index) => (
                      <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                          <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {cert.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{cert.issuer}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{cert.date}</p>
                        
                        <Button variant="outline" size="sm" className="w-full border-indigo-200 dark:border-indigo-800">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Assistants */}
      <AIAssistant />
      {editingSection && (
        <AIEditAssistant
          isOpen={!!editingSection}
          section={editingSection}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;