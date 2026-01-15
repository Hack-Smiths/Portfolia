import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { useAuthContext } from '@/contexts/AuthContext';
import { getPortfolioPreview } from '@/utils/api'; // Adjust the import based on your API structure

interface MainPortfolioProps {
  portfolioData?: any;
  isPublicView?: boolean;
}

const MainPortfolio = ({ portfolioData: propData, isPublicView = false }: MainPortfolioProps = {}) => {
  const [searchParams] = useSearchParams();
  const [currentTemplate, setCurrentTemplate] = useState('classic');
  const { user, loading } = useAuthContext();
  const [portfolioData, setPortfolioData] = useState(propData || null);
  const [isLoading, setIsLoading] = useState(!propData);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && ['classic', 'creative', 'modern'].includes(templateParam)) {
      setCurrentTemplate(templateParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // If data is provided via props (public view), use it
    if (propData) {
      setPortfolioData(propData);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch authenticated user's portfolio
    async function fetchPortfolio() {
      try {
        const data = await getPortfolioPreview(); // Call backend
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio preview:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPortfolio();
  }, [propData]);

  if (loading || isLoading) return <p>Loading...</p>;

  if (!portfolioData) return <p>No portfolio data found</p>;
  // Set template from URL params


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
      name: 'Dev Terminal',
      icon: <Code2 className="w-4 h-4" />,
      layout: 'terminal-dev',
      styles: {
        background: 'bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-900 dark:via-orange-950 dark:to-slate-900',
        card: 'bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300',
        text: 'text-slate-900 dark:text-slate-100',
        accent: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-300',
        glow: 'shadow-lg hover:shadow-xl',
        header: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-orange-200 dark:border-slate-700',
        mesh: 'opacity-10'
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

  return (
    <div className={`min-h-screen transition-all duration-700 ${currentStyles.background}`}>

      <main className="pt-2 pb-20">

        {/* Template 1: Professional Clean Design */}
        {currentTemplate === 'classic' && (
          <div className="space-y-6 relative">
            {/* Subtle Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.03) 0%, transparent 50%), 
                                  radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.02) 0%, transparent 50%)`
              }} />
            </div>

            {/* Clean Professional Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center">
              <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* Professional Avatar */}
                  <div className="flex-shrink-0 relative">
                    <Avatar className="w-48 h-48 lg:w-56 lg:h-56 mx-auto ring-4 ring-border shadow-xl">
                      <AvatarImage src={portfolioData.avatar || "/placeholder.svg"} alt={portfolioData.name} className="object-cover" />
                      <AvatarFallback className="text-5xl font-bold bg-primary text-primary-foreground">
                        {portfolioData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    {/* Professional Status Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Available</span>
                    </div>
                  </div>

                  {/* Professional Typography */}
                  <div className="flex-1 text-center lg:text-left space-y-6">
                    <div className="space-y-4">
                      <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                        {portfolioData.name}
                      </h1>

                      <div className="space-y-2">
                        <p className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                          {portfolioData.title}
                        </p>
                        <div className="w-24 h-1 bg-primary mx-auto lg:mx-0 rounded-full" />
                      </div>

                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        {portfolioData.tagline}
                      </p>
                    </div>

                    {/* Clean Contact Info */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <div className="bg-card border border-border px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{portfolioData.location}</span>
                      </div>
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="bg-card border border-border px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{portfolioData.email}</span>
                      </a>
                      <a
                        href={`https://github.com/${portfolioData.github}`}
                        className="bg-card border border-border px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">GitHub</span>
                      </a>
                      <a
                        href={`https://linkedin.com/in/${portfolioData.linkedin}`}
                        className="bg-card border border-border px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">LinkedIn</span>
                      </a>
                    </div>

                    {/* Professional CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={copyPortfolioLink}
                      >
                        <Copy className="w-5 h-5 mr-3" />
                        Share Portfolio
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="w-5 h-5 mr-3" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Stats Section */}
            <section className="py-6 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{portfolioData.projects.length}+</div>
                    <div className="text-muted-foreground text-sm">Projects</div>
                  </Card>
                  <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{portfolioData.achievements.length}+</div>
                    <div className="text-muted-foreground text-sm">Achievements</div>
                  </Card>
                  <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{portfolioData.certificates.length}+</div>
                    <div className="text-muted-foreground text-sm">Certificates</div>
                  </Card>
                  <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{portfolioData.skills.length}+</div>
                    <div className="text-muted-foreground text-sm">Skills</div>
                  </Card>
                </div>
              </div>
            </section>

            {/* Professional About Me Section */}
            <section className="py-6 px-6 relative">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                  </div>
                  <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  <div className="p-8">
                    <div className="max-w-3xl mx-auto">
                      <p className="text-lg text-muted-foreground leading-relaxed text-center">
                        {portfolioData.about}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Professional Projects Section */}
            <section className="py-20 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
                  </div>
                  <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Showcasing innovation through code with cutting-edge technology
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                  {portfolioData.projects.map((project, index) => (
                    <Card
                      key={project.id}
                      className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-primary" />
                          </div>
                          {project.featured && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-foreground">
                            {project.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-sm bg-secondary px-2 py-1 rounded">
                            <Star className="w-3 h-3 text-primary" />
                            <span className="text-foreground">{project.stars}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech: string, i: number) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Key Features */}
                        {project.features && project.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-foreground mb-2">
                              Key Features:
                            </h4>
                            <div className="grid grid-cols-1 gap-1">
                              {project.features.slice(0, 2).map((feature: string, i: number) => (
                                <div key={i} className="text-xs text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-3 h-3 mr-2" />
                              Demo
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a href={project.repo} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Professional Skills Section */}
            <section className="py-20 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Technical Skills</h2>
                  </div>
                  <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Expertise across the full development spectrum
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative px-4">
                  {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
                    <Card
                      key={category}
                      className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 mx-4"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-6">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                            {category === 'Frontend' && <Lightbulb className="w-5 h-5 text-primary" />}
                            {category === 'Backend' && <Code2 className="w-5 h-5 text-primary" />}
                            {category === 'Cloud' && <Globe className="w-5 h-5 text-primary" />}
                            {category === 'AI/ML' && <Activity className="w-5 h-5 text-primary" />}
                            {category === 'DevOps' && <Settings className="w-5 h-5 text-primary" />}
                            {category === 'Database' && <Layers className="w-5 h-5 text-primary" />}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {category}
                            </h3>
                            <div className="w-12 h-0.5 bg-primary rounded-full mt-1" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          {(categorySkills as typeof portfolioData.skills).map((skill, skillIndex) => {
                            const skillLevel = skill.level || 70;
                            const getStarLevel = (level: number) => {
                              if (level >= 85) return 'professional';
                              if (level >= 70) return 'intermediate';
                              return 'beginner';
                            };
                            const starLevel = getStarLevel(skillLevel);
                            const starCount = starLevel === 'professional' ? 3 : starLevel === 'intermediate' ? 2 : 1;

                            return (
                              <div
                                key={skillIndex}
                                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                              >
                                <span className="font-medium text-foreground">{skill.name}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(3)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < starCount
                                        ? 'text-primary fill-primary'
                                        : 'text-muted-foreground'
                                        }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Ultra-Premium Achievements Timeline - Animated Vertical Timeline */}
            <section className="py-20 px-6 relative">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mr-4 glow-primary">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-gradient-primary">Achievements & Milestones</h2>
                  </div>
                  <div className="w-32 h-1.5 bg-gradient-primary mx-auto rounded-full glow-primary mb-6" />
                  <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                    Celebrating moments of growth and recognition in my journey
                  </p>
                </div>

                {/* Mobile Cards Layout */}
                <div className="block md:hidden">
                  <div className="grid gap-6">
                    {portfolioData.achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className="glass-card group/card hover:glow-primary transition-all duration-700 border-electric/20 hover:border-electric/40 tilt overflow-hidden animate-fade-in"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        {/* Hover Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-pulse/5 to-accent/5 opacity-0 group-hover/card:opacity-100 transition-all duration-500 rounded-xl" />

                        <div className="relative z-10 p-6">
                          <div className="flex items-start space-x-4 mb-4">
                            {/* Icon */}
                            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                              {achievement.type === 'internship' ?
                                <Briefcase className="w-6 h-6 text-white" /> :
                                <Trophy className="w-6 h-6 text-white" />
                              }
                            </div>

                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-foreground group-hover/card:text-gradient-primary transition-all duration-300 mb-2">
                                {achievement.title}
                              </h3>
                              <div className="flex items-center space-x-2 text-accent font-semibold text-sm">
                                <Building className="w-4 h-4" />
                                <span>{achievement.issuer}</span>
                              </div>
                            </div>

                            <Badge className="bg-gradient-to-r from-electric/20 to-pulse/20 border-electric/30 text-foreground px-3 py-1 rounded-lg shadow-lg text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {achievement.date}
                            </Badge>
                          </div>

                          <p className="text-foreground-muted leading-relaxed group-hover/card:text-foreground transition-colors duration-300 mb-4">
                            {achievement.description}
                          </p>

                          {/* Achievement Type Badge */}
                          <div className="flex justify-end">
                            <Badge
                              variant="outline"
                              className={`${achievement.type === 'internship'
                                ? 'border-blue-500/30 text-blue-600 bg-blue-500/10'
                                : 'border-yellow-500/30 text-yellow-600 bg-yellow-500/10'
                                } px-3 py-1 rounded-lg font-medium`}
                            >
                              {achievement.type === 'internship' ? '💼 Internship' : '🏆 Award'}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Desktop Timeline Layout */}
                <div className="hidden md:block relative">
                  {/* Animated Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-primary rounded-full glow-primary animate-slide-in-up" />

                  <div className="space-y-12">
                    {portfolioData.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="relative flex items-start animate-slide-in-right group"
                        style={{ animationDelay: `${index * 300}ms` }}
                      >
                        {/* Timeline Marker */}
                        <div className="relative z-10 mr-8">
                          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-4 border-white/30 dark:border-slate-800/30">
                            {achievement.type === 'internship' ?
                              <Briefcase className="w-8 h-8 text-white" /> :
                              <Trophy className="w-8 h-8 text-white" />
                            }
                          </div>
                        </div>

                        {/* Achievement Card */}
                        <Card className="flex-1 glass-card group/card hover:glow-primary transition-all duration-700 border-electric/20 hover:border-electric/40 tilt overflow-hidden">
                          {/* Hover Background Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-pulse/5 to-accent/5 opacity-0 group-hover/card:opacity-100 transition-all duration-500 rounded-xl" />

                          <div className="relative z-10 p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-foreground group-hover/card:text-gradient-primary transition-all duration-300 mb-2">
                                  {achievement.title}
                                </h3>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2 text-accent font-semibold">
                                    <Building className="w-4 h-4" />
                                    <span>{achievement.issuer}</span>
                                  </div>
                                </div>
                              </div>

                              <Badge className="bg-gradient-to-r from-electric/20 to-pulse/20 border-electric/30 text-foreground px-4 py-2 rounded-xl shadow-lg">
                                <Calendar className="w-4 h-4 mr-2" />
                                {achievement.date}
                              </Badge>
                            </div>

                            <p className="text-foreground-muted leading-relaxed group-hover/card:text-foreground transition-colors duration-300">
                              {achievement.description}
                            </p>

                            {/* Achievement Type Badge */}
                            <div className="mt-6 flex justify-end">
                              <Badge
                                variant="outline"
                                className={`${achievement.type === 'internship'
                                  ? 'border-blue-500/30 text-blue-600 bg-blue-500/10'
                                  : 'border-yellow-500/30 text-yellow-600 bg-yellow-500/10'
                                  } px-3 py-1 rounded-lg font-medium`}
                              >
                                {achievement.type === 'internship' ? '💼 Internship' : '🏆 Award'}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Certificates Section */}
            <section className="py-16 px-6 relative pb-0">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-gradient-primary mb-4">Certifications</h2>
                  <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
                  <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                    Professional certifications and continuous learning achievements
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {portfolioData.certificates.map((cert, index) => (
                    <Card
                      key={index}
                      className="glass-card group hover:glow-accent transition-all duration-500 border-accent/20 hover:border-accent/40 overflow-hidden"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-pulse/5 to-electric/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                      <div className="relative z-10 p-8">
                        <div className="flex items-start justify-between mb-6">
                          {/* Icon Box */}
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                            {/* Or text-primary-foreground if your theme uses white here */}
                          </div>

                          {/* Date Badge */}
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                            <Calendar className="w-3 h-3 mr-2" />
                            {cert.date}
                          </Badge>
                        </div>


                        <div className="space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient-accent transition-all duration-300 mb-2">
                              {cert.title}
                            </h3>
                            <p className="text-accent font-semibold text-lg">
                              {cert.issuer}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground-muted">Credential ID:</span>
                              <span className="font-mono text-foreground bg-secondary px-2 py-1 rounded">
                                {cert.credentialId}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-2 border-electric/50 text-electric hover:bg-electric/20 rounded-xl font-bold transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Template 2: Creative Timeline Design */}
        {currentTemplate === 'creative' && (
          <div className="relative bg-gradient-creative min-h-screen -mt-2 -mb-20">
            {/* Same exact content as Portfolio.tsx template 2, without edit buttons */}
            <div className="text-center py-20 text-white">
              <h1 className="text-6xl font-bold mb-4">{portfolioData.name}</h1>
              <p className="text-xl mb-8">{portfolioData.tagline}</p>
            </div>
          </div>
        )}

        {/* Template 3: Futuristic Modern Design */}
        {currentTemplate === 'modern' && (
          <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden -mt-2 -mb-20">
            {/* Same exact content as Portfolio.tsx template 3, without edit buttons */}
            <div className="text-center py-20 text-white">
              <h1 className="text-6xl font-bold mb-4 text-gradient-primary">{portfolioData.name}</h1>
              <p className="text-xl mb-8">{portfolioData.tagline}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPortfolio;