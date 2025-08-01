import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  Star,
  Activity,
  BarChart3,
  Building,
  GraduationCap,
  Eye,
  Home,
  Globe,
  Code,
  Sparkles,
  Briefcase,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DummyPortfolio = () => {
  const currentStyles = {
    background: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900',
    card: 'backdrop-blur-2xl bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10',
    text: 'text-slate-900 dark:text-slate-100',
    accent: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30',
    glow: 'shadow-3xl shadow-purple-500/30 hover:shadow-purple-500/50',
    header: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border-white/30 dark:border-slate-700/30',
    mesh: 'opacity-20',
    special: 'bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-gradient-to-r from-indigo-500/30 to-purple-600/30'
  };
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
      { name: "React", category: "Frontend" },
      { name: "Python", category: "Backend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Django", category: "Backend" },
      { name: "AWS", category: "Cloud" },
      { name: "Machine Learning", category: "AI/ML" },
      { name: "Docker", category: "DevOps" },
      { name: "PostgreSQL", category: "Database" }
    ]
  };

  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof portfolioData.skills>);

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

        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-1">
              {project.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

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

  return (
    <div className={`min-h-screen transition-all duration-700 ${currentStyles.background}`}>
      {/* Fixed Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/">
          <Button 
            size="sm" 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      {/* Portfolio Header - Floating */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-xl px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Live Portfolio</p>
              <p className="text-xs text-muted-foreground">Demo Version</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className={`absolute inset-0 transition-all duration-700 ${currentStyles.mesh}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <main className="pt-20 pb-20 relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="relative group mb-12">
                {/* Enhanced Avatar Glow Effect */}
                <div className="absolute -inset-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse-slow" />
                <div className="absolute -inset-8 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-300 to-purple-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-all duration-300" />
                
                <Avatar className="relative w-48 h-48 mx-auto ring-8 ring-white/20 dark:ring-slate-800/20 shadow-3xl transform group-hover:scale-105 transition-all duration-500">
                  <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {portfolioData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Enhanced Status Indicator */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-xl animate-bounce-slow">
                  <Activity className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              
              {/* Enhanced Typography */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight animate-fade-in">
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
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                <div className="flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 dark:border-slate-700/30 shadow-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{portfolioData.location}</span>
                </div>
                <a 
                  href={`mailto:${portfolioData.email}`}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Get in Touch</span>
                  <Sparkles className="w-4 h-4 ml-1" />
                </a>
                <div className="flex space-x-4">
                  <a 
                    href={`https://github.com/${portfolioData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://linkedin.com/in/${portfolioData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary hover:shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Card className={`${currentStyles.card} p-8 hover:${currentStyles.glow} transition-all duration-500 group`}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 mr-3 text-indigo-500" />
                  About Me
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                {portfolioData.about}
              </p>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                <Code className="w-10 h-10 mr-4 text-indigo-500" />
                Featured Projects
              </h2>
              <p className="text-xl text-muted-foreground">
                A showcase of my technical skills and creativity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, index) => (
                <div key={project.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                <BarChart3 className="w-10 h-10 mr-4 text-purple-500" />
                Technical Skills
              </h2>
              <p className="text-xl text-muted-foreground">
                Technologies and tools I work with
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
                <Card key={category} className={`${currentStyles.card} p-6 text-center group hover:${currentStyles.glow} transition-all duration-300 animate-slide-in-up`} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
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
                        className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300"
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

        {/* Achievements Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                <Trophy className="w-10 h-10 mr-4 text-yellow-500" />
                Achievements & Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                My professional journey and accomplishments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {portfolioData.achievements.map((achievement, index) => (
                <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow} transition-all duration-500 group animate-slide-in-up`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${currentStyles.text} mb-1`}>{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {achievement.issuer} • {achievement.date}
                      </p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioData.certificates.map((cert, index) => (
                <Card key={index} className={`${currentStyles.card} p-6 hover:${currentStyles.glow} transition-all duration-500 group animate-slide-in-up`} style={{ animationDelay: `${index * 200 + 400}ms` }}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${currentStyles.text} mb-1`}>{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {cert.issuer} • {cert.date}
                      </p>
                      <Badge variant="outline" className="text-xs">ID: {cert.credentialId}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DummyPortfolio;