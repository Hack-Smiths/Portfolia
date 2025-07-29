import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Download, ExternalLink, Mail, MapPin, Sparkles, Copy, QrCode, Star, Calendar, Building, Palette, Zap, Waves, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AIAssistant from '@/components/AIAssistant';

const Portfolio = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('modern');

  const themes = {
    modern: {
      name: 'Modern Glass',
      icon: <Palette className="w-4 h-4" />,
      styles: {
        background: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
        card: 'backdrop-blur-xl bg-white/40 border border-white/20 shadow-2xl hover:shadow-3xl',
        text: 'text-slate-900',
        accent: 'bg-gradient-to-r from-blue-600 to-purple-600',
        glow: 'shadow-blue-500/25'
      }
    },
    electric: {
      name: 'Electric Neon',
      icon: <Zap className="w-4 h-4" />,
      styles: {
        background: 'bg-gradient-to-br from-black via-gray-900 to-purple-900',
        card: 'backdrop-blur-xl bg-gray-900/60 border border-cyan-400/30 shadow-2xl hover:shadow-cyan-400/40',
        text: 'text-white',
        accent: 'bg-gradient-to-r from-cyan-400 to-purple-500',
        glow: 'shadow-cyan-400/50'
      }
    },
    ocean: {
      name: 'Ocean Wave',
      icon: <Waves className="w-4 h-4" />,
      styles: {
        background: 'bg-gradient-to-br from-blue-100 via-teal-50 to-emerald-100',
        card: 'backdrop-blur-xl bg-white/50 border border-teal-200/50 shadow-2xl hover:shadow-teal-400/30',
        text: 'text-slate-800',
        accent: 'bg-gradient-to-r from-teal-500 to-emerald-600',
        glow: 'shadow-teal-400/40'
      }
    }
  };

  const currentStyles = themes[currentTheme].styles;

  const portfolioData = {
    profile: {
      name: 'Alex Johnson',
      title: 'Full-Stack Developer & AI Enthusiast',
      location: 'San Francisco, CA',
      email: 'alex.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate full-stack developer with 3+ years of experience building scalable web applications. Specialized in React, Node.js, and AI integration. Always eager to learn new technologies and solve complex problems.',
      socials: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        portfolio: 'https://alexjohnson.dev'
      }
    },
    projects: [
      {
        id: 1,
        title: 'E-commerce React App',
        description: 'Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard. Built with React, Node.js, and Stripe.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com/alexjohnson/ecommerce-app',
        demo: 'https://ecommerce-demo.vercel.app',
        featured: true
      },
      {
        id: 2,
        title: 'AI Chat Application',
        description: 'Real-time chat application with AI-powered responses using OpenAI API. Features include file sharing, emoji reactions, and message encryption.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
        tech: ['Next.js', 'OpenAI', 'Socket.io', 'PostgreSQL'],
        github: 'https://github.com/alexjohnson/ai-chat',
        demo: 'https://ai-chat-demo.vercel.app',
        featured: true
      },
      {
        id: 3,
        title: 'Data Visualization Dashboard',
        description: 'Interactive business analytics dashboard with real-time data visualization and reporting features.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
        tech: ['D3.js', 'Python', 'Flask', 'SQLite'],
        github: 'https://github.com/alexjohnson/data-viz',
        demo: 'https://data-viz-demo.netlify.app',
        featured: false
      }
    ],
    achievements: [
      {
        type: 'internship',
        title: 'Software Engineering Intern',
        organization: 'TechCorp Inc.',
        date: 'Jun 2024 - Aug 2024',
        description: 'Developed microservices architecture, improved API performance by 40%'
      },
      {
        type: 'award',
        title: 'Best Innovation Award',
        organization: 'University Hackathon',
        date: '2024',
        description: 'First place for developing an AI-powered sustainability platform'
      },
      {
        type: 'certificate',
        title: 'AWS Certified Solutions Architect',
        organization: 'Amazon Web Services',
        date: '2024',
        description: 'Cloud architecture certification covering design principles'
      }
    ],
    skills: {
      'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      'Backend': ['Node.js', 'Python', 'GraphQL', 'REST APIs'],
      'Database': ['MongoDB', 'PostgreSQL', 'Redis'],
      'Cloud': ['AWS', 'Docker', 'Kubernetes'],
      'Tools': ['Git', 'Figma', 'Postman', 'VS Code']
    }
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText('https://portfolia.dev/alex-johnson');
    // Show toast notification
  };

  return (
    <div className={`min-h-screen pt-16 transition-all duration-700 ${currentStyles.background}`}>
      {/* Floating Theme Switcher */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {Object.entries(themes).map(([key, theme]) => (
          <Button
            key={key}
            size="sm"
            variant={currentTheme === key ? "default" : "outline"}
            onClick={() => setCurrentTheme(key)}
            className={`w-12 h-12 p-0 rounded-xl transition-all duration-300 ${
              currentTheme === key 
                ? `${currentStyles.accent} text-white ${currentStyles.glow}` 
                : `bg-white/20 backdrop-blur-sm border-white/30 hover:${currentStyles.glow}`
            }`}
            title={theme.name}
          >
            {theme.icon}
          </Button>
        ))}
      </div>

      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12 animate-fade-in">
            {/* Enhanced Profile Image */}
            <div className="relative group">
              <div className={`absolute -inset-1 ${currentStyles.accent} rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse`} />
              <div className="relative">
                <img
                  src={portfolioData.profile.avatar}
                  alt={portfolioData.profile.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${currentStyles.accent} rounded-full border-4 border-white flex items-center justify-center`}>
                  <Globe className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
            </div>

            {/* Enhanced Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <h1 className={`text-4xl lg:text-6xl font-bold ${currentStyles.text} bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-size-200`}>
                  {portfolioData.profile.name}
                </h1>
                {isEditMode && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="w-10 h-10 p-0 hover:bg-white/20">
                        <Sparkles className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={currentStyles.card}>
                      <DialogHeader>
                        <DialogTitle>✨ Edit with AI</DialogTitle>
                      </DialogHeader>
                      <AIEditForm section="profile" />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <p className={`text-2xl ${currentStyles.text} opacity-90 mb-4 font-medium`}>
                {portfolioData.profile.title}
              </p>
              
              <div className={`flex items-center justify-center lg:justify-start space-x-6 ${currentStyles.text} opacity-75 mb-6 text-lg`}>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{portfolioData.profile.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>{portfolioData.profile.email}</span>
                </div>
              </div>

              <p className={`${currentStyles.text} opacity-80 mb-8 max-w-3xl text-lg leading-relaxed`}>
                {portfolioData.profile.bio}
              </p>

              {/* Enhanced Social Links */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
                {[
                  { href: portfolioData.profile.socials.github, icon: Github, label: 'GitHub' },
                  { href: portfolioData.profile.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    asChild
                    className={`${currentStyles.card} hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-300`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5 mr-2" />
                      {social.label}
                    </a>
                  </Button>
                ))}
                <Button 
                  size="lg" 
                  className={`${currentStyles.accent} text-white hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-300`}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Resume
                </Button>
                <Button 
                  size="lg" 
                  onClick={copyPortfolioLink}
                  className={`${currentStyles.accent} text-white hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-300`}
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Edit Mode Toggle */}
        <div className="flex justify-between items-center mb-12">
          <div className={`text-lg ${currentStyles.text} opacity-75`}>
            Portfolio Preview • <span className="text-emerald-500 font-semibold">Live</span>
          </div>
          <div className="flex space-x-4">
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="lg"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`${isEditMode ? currentStyles.accent + ' text-white' : currentStyles.card} hover:${currentStyles.glow} transition-all duration-300`}
            >
              {isEditMode ? 'Exit Edit' : 'Edit Mode'}
            </Button>
            <Link to="/export">
              <Button size="lg" className={`${currentStyles.accent} text-white hover:${currentStyles.glow} transition-all duration-300`}>
                <ExternalLink className="w-5 h-5 mr-2" />
                Export & Share
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Projects Section */}
        <section className="mb-16 animate-slide-in-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl lg:text-5xl font-bold ${currentStyles.text} bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent`}>
              Featured Projects
            </h2>
            {isEditMode && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="ghost" className="hover:bg-white/20">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Edit with AI
                  </Button>
                </DialogTrigger>
                <DialogContent className={currentStyles.card}>
                  <DialogHeader>
                    <DialogTitle>✨ Edit Projects with AI</DialogTitle>
                  </DialogHeader>
                  <AIEditForm section="projects" />
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioData.projects.filter(p => p.featured).map((project, index) => (
              <Card 
                key={project.id} 
                className={`${currentStyles.card} hover:${currentStyles.glow} group overflow-hidden transform hover:scale-105 transition-all duration-500 animate-slide-in-right`} 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-6 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${currentStyles.text}`}>{project.title}</h3>
                <p className={`${currentStyles.text} opacity-75 mb-6 leading-relaxed`}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className={`${currentStyles.accent} text-white px-3 py-1 text-sm font-medium`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button size="lg" variant="outline" asChild className={`${currentStyles.card} hover:${currentStyles.glow} flex-1`}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="lg" asChild className={`${currentStyles.accent} text-white hover:${currentStyles.glow} flex-1`}>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Achievements Section */}
          <section className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-bold ${currentStyles.text} bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent`}>
                Achievements
              </h2>
              {isEditMode && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="hover:bg-white/20">
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={currentStyles.card}>
                    <DialogHeader>
                      <DialogTitle>✨ Edit Achievements with AI</DialogTitle>
                    </DialogHeader>
                    <AIEditForm section="achievements" />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-6">
              {portfolioData.achievements.map((achievement, index) => (
                <Card 
                  key={index} 
                  className={`${currentStyles.card} hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-300 animate-slide-in-right`} 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full ${currentStyles.accent} flex items-center justify-center mt-1 shadow-lg`}>
                      {achievement.type === 'internship' && <Building className="w-6 h-6 text-white" />}
                      {achievement.type === 'award' && <Star className="w-6 h-6 text-white" />}
                      {achievement.type === 'certificate' && <Badge className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${currentStyles.text} mb-1`}>{achievement.title}</h3>
                      <p className={`${currentStyles.text} opacity-75 font-medium`}>{achievement.organization}</p>
                      <p className={`text-sm ${currentStyles.text} opacity-60 flex items-center mt-2 mb-3`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {achievement.date}
                      </p>
                      <p className={`${currentStyles.text} opacity-80 leading-relaxed`}>{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Skills Section */}
          <section className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-bold ${currentStyles.text} bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent`}>
                Skills
              </h2>
              {isEditMode && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="hover:bg-white/20">
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={currentStyles.card}>
                    <DialogHeader>
                      <DialogTitle>✨ Edit Skills with AI</DialogTitle>
                    </DialogHeader>
                    <AIEditForm section="skills" />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-6">
              {Object.entries(portfolioData.skills).map(([category, skills], index) => (
                <Card 
                  key={category} 
                  className={`${currentStyles.card} hover:${currentStyles.glow} transform hover:scale-105 transition-all duration-300 animate-slide-in-right`} 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <h3 className={`text-xl font-bold mb-4 ${currentStyles.text}`}>{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className={`${currentStyles.accent} text-white px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-200`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Enhanced Footer */}
        <footer className={`mt-24 pt-12 border-t ${currentTheme === 'electric' ? 'border-gray-700' : 'border-gray-200'} text-center animate-fade-in`}>
          <div className={`${currentStyles.text} opacity-75 text-lg mb-4`}>
            Made with 💻 by{' '}
            <span className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent`}>
              Smart Internship Portfolio Builder
            </span>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <Button variant="ghost" size="lg" className="hover:bg-white/20">
              <QrCode className="w-6 h-6" />
            </Button>
          </div>
        </footer>
      </div>

      <AIAssistant />
    </div>
  );

  function AIEditForm({ section }) {
    return (
      <div className="space-y-4">
        <div className={`${currentStyles.card} p-4 rounded-lg`}>
          <p className={`text-sm ${currentStyles.text} opacity-75`}>
            AI will analyze your {section} and suggest improvements for better impact and clarity.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button className={`w-full ${currentStyles.accent} text-white hover:${currentStyles.glow}`}>
            ✨ Make it more impactful
          </Button>
          <Button className={`w-full ${currentStyles.accent} text-white hover:${currentStyles.glow}`}>
            🚀 Optimize for recruiters
          </Button>
          <Button className="w-full" variant="outline">
            📝 Improve clarity
          </Button>
          <Button className="w-full" variant="outline">
            🎯 Add missing keywords
          </Button>
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium ${currentStyles.text}`}>Custom AI prompt:</label>
          <Textarea 
            placeholder="Tell AI how you want to improve this section..."
            rows={2}
            className={currentStyles.card}
          />
          <Button className={`w-full ${currentStyles.accent} text-white`}>Apply AI Enhancement</Button>
        </div>
      </div>
    );
  }
};

export default Portfolio;