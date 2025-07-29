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
  Edit3
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import AIEditAssistant from "@/components/AIEditAssistant";

const Portfolio = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('glass');
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const templates = {
    glass: {
      name: 'Glass Morphism',
      icon: <Palette className="w-4 h-4" />,
      layout: 'modern-grid',
      styles: {
        background: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900',
        card: 'backdrop-blur-2xl bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10',
        text: 'text-slate-900 dark:text-slate-100',
        accent: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30',
        glow: 'shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/50',
        header: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border-white/30 dark:border-slate-700/30',
        mesh: 'opacity-20',
        special: 'bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-gradient-to-r from-indigo-500/30 to-purple-600/30'
      }
    },
    neon: {
      name: 'Cyberpunk Neon',
      icon: <Zap className="w-4 h-4" />,
      layout: 'cyber-layout',
      styles: {
        background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden',
        card: 'backdrop-blur-xl bg-slate-900/90 border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:border-cyan-300/70',
        text: 'text-cyan-50',
        accent: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50',
        glow: 'shadow-3xl shadow-electric hover:shadow-cyan-400/60',
        header: 'bg-slate-900/95 backdrop-blur-xl border-cyan-400/30',
        mesh: 'opacity-40',
        special: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50'
      }
    },
    minimal: {
      name: 'Minimal Clean',
      icon: <Waves className="w-4 h-4" />,
      layout: 'clean-layout',
      styles: {
        background: 'bg-gradient-to-br from-gray-50 to-slate-100 dark:from-slate-800 dark:to-slate-900',
        card: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl hover:shadow-2xl',
        text: 'text-gray-900 dark:text-gray-100',
        accent: 'bg-slate-900 dark:bg-slate-700 text-white shadow-lg hover:bg-slate-800 dark:hover:bg-slate-600',
        glow: 'shadow-2xl hover:shadow-3xl',
        header: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-gray-200 dark:border-slate-700',
        mesh: 'opacity-15',
        special: 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-gray-300 dark:border-slate-600'
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

  const SkillCard = ({ category, categorySkills }: { category: string, categorySkills: any[] }) => (
    <Card className={`${currentStyles.card} p-6 text-center group hover:${currentStyles.glow} transition-all duration-300`}>
      <div className="mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
          {category === 'Frontend' && <Star className="w-6 h-6 text-white" />}
          {category === 'Backend' && <Building className="w-6 h-6 text-white" />}
          {category === 'Cloud' && <Award className="w-6 h-6 text-white" />}
          {category === 'AI/ML' && <BarChart3 className="w-6 h-6 text-white" />}
          {category === 'DevOps' && <Activity className="w-6 h-6 text-white" />}
          {category === 'Database' && <GraduationCap className="w-6 h-6 text-white" />}
        </div>
        <h3 className={`text-lg font-semibold ${currentStyles.text} mb-3`}>{category}</h3>
      </div>
      <div className="space-y-2">
        {categorySkills.map((skill, skillIndex) => (
          <Badge 
            key={skillIndex} 
            variant="secondary" 
            className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </Card>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <Card className={`${currentStyles.card} overflow-hidden group hover:${currentStyles.glow} transition-all duration-700 transform hover:-translate-y-2 relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
      
      <div className="p-6 relative z-10">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
          <Code className="w-6 h-6 text-white" />
        </div>
        
        {project.featured && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none shadow-lg z-20">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-xl font-bold group-hover:text-primary transition-colors duration-300 ${currentStyles.text}`}>
            {project.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="font-medium">{project.stars}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech: string, index: number) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-white/20 backdrop-blur-md text-slate-700 dark:text-slate-300 border-white/30 hover:bg-white/30 transition-all duration-300" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30" asChild>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );

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
      
      {/* Portfolio Header - Sticky Below Navbar */}
      <header className={`sticky top-16 left-0 right-0 z-40 border-b border-white/20 dark:border-slate-700/20 transition-all duration-700 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-b-3xl mx-4 shadow-lg`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-base text-foreground">Portfolio Preview</p>
                <p className="text-xs text-muted-foreground">Live • Last updated 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={isEditMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`${isEditMode ? 'bg-gradient-primary text-white' : 'bg-white/50 dark:bg-slate-800/50'} transition-all duration-300 rounded-xl`}
              >
                <Settings className="w-4 h-4 mr-2" />
                {isEditMode ? 'Exit Edit' : 'Edit Mode'}
              </Button>
              <Link to="/export">
                <Button size="sm" className="bg-gradient-primary text-white hover:glow-primary rounded-xl shadow-lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Export & Share
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Template Switcher */}
      <div className="fixed top-32 right-6 z-40 space-y-3">
        <div className="text-xs text-center text-muted-foreground mb-2 font-medium">Templates</div>
        {Object.entries(templates).map(([key, template]) => (
          <Button
            key={key}
            size="sm"
            variant={currentTemplate === key ? "default" : "outline"}
            onClick={() => setCurrentTemplate(key)}
            className={`w-14 h-14 p-0 rounded-xl transition-all duration-300 ${
              currentTemplate === key 
                ? `bg-gradient-primary text-white glow-primary` 
                : `bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/50`
            }`}
            title={template.name}
          >
            {template.icon}
          </Button>
        ))}
      </div>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          {/* Background Effects */}
          <div className={`absolute inset-0 transition-all duration-700 ${currentStyles.mesh}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="relative group mb-12">
                {/* Avatar Glow Effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse-slow" />
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
                
                <Avatar className="relative w-48 h-48 mx-auto ring-8 ring-white/20 dark:ring-slate-800/20 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {portfolioData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status Indicator */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg animate-bounce-slow">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Enhanced Typography */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  {portfolioData.name}
                </h1>
                
                <div className="relative">
                  <p className={`text-2xl md:text-4xl font-bold ${currentStyles.text} mb-2`}>
                    {portfolioData.title}
                  </p>
                  <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
                </div>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                  {portfolioData.tagline}
                </p>
              </div>
              
              {/* Enhanced Contact Info */}
              <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-12">
                <div className="flex items-center space-x-3 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 dark:border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{portfolioData.location}</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 dark:border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{portfolioData.email}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className={`${currentStyles.accent} hover:${currentStyles.glow} transition-all duration-300`}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button className={`${currentStyles.accent} hover:${currentStyles.glow} transition-all duration-300`}>
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" className={`backdrop-blur-sm ${currentTemplate === 'neon' ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-100' : 'bg-white/20 border-white/30'} transition-all duration-300`}>
                <Download className="w-4 h-4 mr-2" />
                Resume PDF
              </Button>
              <Button variant="outline" className={`backdrop-blur-sm ${currentTemplate === 'neon' ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-100' : 'bg-white/20 border-white/30'} transition-all duration-300`} onClick={copyPortfolioLink}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow} transition-all duration-300`}>
                <Code className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {portfolioData.projects.length}
                </div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </Card>
              <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow} transition-all duration-300`}>
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {portfolioData.achievements.length}
                </div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </Card>
              <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow} transition-all duration-300`}>
                <Trophy className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {portfolioData.certificates.length}
                </div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </Card>
              <Card className={`${currentStyles.card} p-6 text-center hover:${currentStyles.glow} transition-all duration-300`}>
                <BarChart3 className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {portfolioData.skills.length}
                </div>
                <div className="text-sm text-muted-foreground">Skills</div>
              </Card>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {/* About Section */}
          <section className="animate-fade-in relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
            </div>
            <Card className={`${currentStyles.card} p-8 max-w-4xl mx-auto text-center hover:${currentStyles.glow} transition-all duration-300 relative`}>
              <EditButton section="About Me" />
              <p className={`text-lg leading-relaxed ${currentStyles.text}`}>
                {portfolioData.about}
              </p>
            </Card>
          </section>

          {/* Projects Section */}
          <section className="animate-fade-in relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Showcasing my latest work in web development, AI, and full-stack applications
              </p>
            </div>
            <EditButton section="Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, index) => (
                <div key={project.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="animate-fade-in relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                Technical Skills
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Proficiency levels in various technologies and programming languages
              </p>
            </div>
            <EditButton section="Skills" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
                <div key={category} className="animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                  <SkillCard category={category} categorySkills={categorySkills} />
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section - Journey Design */}
          <section className="animate-fade-in relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                Achievements Journey
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional milestones and career highlights
              </p>
            </div>
            <EditButton section="Achievements" />
            
            {/* Journey Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-30"></div>
              
              <div className="space-y-12">
                {portfolioData.achievements.map((achievement, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-slide-in-up`} style={{ animationDelay: `${index * 300}ms` }}>
                    {/* Achievement Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <Card className={`${currentStyles.card} p-6 hover:${currentStyles.glow} transition-all duration-300 transform hover:scale-105`}>
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                              {achievement.type === 'internship' ? 
                                <Briefcase className="w-6 h-6 text-white" /> : 
                                <Trophy className="w-6 h-6 text-white" />
                              }
                            </div>
                            <Badge variant="outline" className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50">
                              {achievement.date}
                            </Badge>
                          </div>
                          
                          <div>
                            <h3 className={`text-xl font-bold mb-2 ${currentStyles.text}`}>
                              {achievement.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Building className="w-4 h-4 mr-1" />
                              {achievement.issuer}
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certificates Section - Enhanced Cards */}
          <section className="animate-fade-in relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                Certificates & Credentials
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional certifications and completed courses
              </p>
            </div>
            <EditButton section="Certificates" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.certificates.map((cert, index) => (
                <Card key={index} className={`${currentStyles.card} p-8 hover:${currentStyles.glow} transition-all duration-300 animate-slide-in-up transform hover:-translate-y-2 relative overflow-hidden`} style={{ animationDelay: `${index * 200}ms` }}>
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-8 translate-x-8"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="bg-success/20 text-success border-success/30 font-medium">
                        ✓ Verified
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className={`text-xl font-bold leading-tight ${currentStyles.text}`}>
                        {cert.title}
                      </h3>
                      
                      <div className="space-y-2">
                        <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{cert.date}</span>
                          <Badge variant="outline" className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                            ID: {cert.credentialId}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-4 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>

      <AIEditAssistant 
        isOpen={!!editingSection} 
        onClose={() => setEditingSection(null)} 
        section={editingSection || ''} 
      />
      <AIAssistant />
    </div>
  );
};

export default Portfolio;