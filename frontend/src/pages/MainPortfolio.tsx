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
import { getPortfolioPreview } from '@/utils/api';
import { templates, TemplateType } from '@/utils/themes';
import PortfolioNavbar from '@/components/portfolio/PortfolioNavbar';
import ContactSection from '@/components/portfolio/ContactSection';

interface MainPortfolioProps {
  portfolioData?: any;
  isPublicView?: boolean;
}

const MainPortfolio = ({ portfolioData: propData, isPublicView = false }: MainPortfolioProps = {}) => {
  const [searchParams] = useSearchParams();
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('classic');
  const { user, loading } = useAuthContext();
  const [portfolioData, setPortfolioData] = useState(propData || null);
  const [isLoading, setIsLoading] = useState(!propData);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam && ['classic', 'creative', 'modern'].includes(templateParam)) {
      setCurrentTemplate(templateParam as TemplateType);
    }
  }, [searchParams]);

  useEffect(() => {
    // If data is provided via props (public view), use it
    if (propData) {
      setPortfolioData(propData);
      if (propData.theme_preference && templates[propData.theme_preference as TemplateType]) {
        setCurrentTemplate(propData.theme_preference as TemplateType);
      }
      setIsLoading(false);
      return;
    }

    // Otherwise fetch authenticated user's portfolio
    async function fetchPortfolio() {
      try {
        const data = await getPortfolioPreview(); // Call backend
        setPortfolioData(data);
        if (data.theme_preference && templates[data.theme_preference as TemplateType]) {
          setCurrentTemplate(data.theme_preference as TemplateType);
        }
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


      {/* Public Navbar (Only if public view and data exists) */}
      {isPublicView && portfolioData && (
        <PortfolioNavbar
          name={portfolioData.name.split(' ')[0]}
          activeSection={activeSection}
        />
      )}

      <main className="pt-0 pb-0">

        {/* Template 1: Professional Clean Design */}
        {currentTemplate === 'classic' && (
          <div className="space-y-0 relative">
            {/* Subtle Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.03) 0%, transparent 50%), 
                                  radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.02) 0%, transparent 50%)`
              }} />
            </div>

            {/* Clean Professional Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
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

                    {/* CTA to Contact Section */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Get In Touch
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

            {/* Professional About Me Section */}
            <section id="about" className="py-20 px-6 relative bg-muted/30">
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

            {/* Professional Stats Section */}
            <section className="py-12 px-6 relative">
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
                    <div className="text-muted-foreground text-sm">Certifications</div>
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


            {/* Professional Projects Section */}
            <section id="projects" className="py-20 px-6 relative">
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
            <section id="skills" className="py-20 px-6 relative bg-muted/30">
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

            {/* Experience & Achievements Section */}
            <section id="experience" className="py-20 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Experience & Achievements</h2>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Work Experience */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold flex items-center mb-6">
                      <Briefcase className="w-6 h-6 mr-3 text-primary" />
                      Work History
                    </h3>
                    {portfolioData.work_experience && portfolioData.work_experience.map((job: any, i: number) => (
                      <Card key={i} className="p-6 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-xl font-bold">{job.position}</h4>
                        <div className="flex justify-between text-sm text-foreground-muted mb-2">
                          <span className="font-medium text-primary">{job.company}</span>
                          <span>{job.duration}</span>
                        </div>
                        <p className="text-sm text-foreground-muted">{job.description}</p>
                      </Card>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold flex items-center mb-6">
                      <Trophy className="w-6 h-6 mr-3 text-primary" />
                      Key Milestones
                    </h3>
                    <div className="space-y-6">
                      {portfolioData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{achievement.title}</h4>
                            <p className="text-sm text-foreground-muted mb-1">{achievement.issuer} • {achievement.date}</p>
                            <p className="text-sm text-foreground-muted">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* New Contact Section */}
            <ContactSection
              username={portfolioData.username || ""}
              email={portfolioData.email}
              github={portfolioData.github}
              linkedin={portfolioData.linkedin}
              resumeUrl={portfolioData.resume}
            />

          </div>
        )}


        {/* Template 2: Elegant Professional Design */}
        {currentTemplate === 'creative' && (
          <div className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-900 dark:via-orange-950 dark:to-slate-900">


            {/* Elegant Hero Section */}
            <section id="home" className="relative flex items-center justify-center overflow-hidden pt-6 pb-12">
              {/* Sophisticated Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Elegant Text Content */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Available for opportunities</span>
                      </div>

                      <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 dark:from-white dark:via-orange-100 dark:to-white bg-clip-text text-transparent">
                          {portfolioData.name}
                        </span>
                      </h1>

                      <div className="space-y-4">
                        <p className="text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300">
                          {portfolioData.title}
                        </p>
                        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                      </div>
                    </div>

                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                      {portfolioData.tagline}
                    </p>

                    {/* Elegant Contact Row */}
                    <div className="flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8"
                      >
                        <Mail className="w-5 h-5 mr-3" />
                        Get In Touch
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8"
                      >
                        <Download className="w-5 h-5 mr-3" />
                        Download CV
                      </Button>
                    </div>
                  </div>

                  {/* Elegant Profile Section */}
                  <div className="relative">
                    <div className="relative z-10 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700">
                      <div className="text-center space-y-6">
                        <Avatar className="w-32 h-32 mx-auto ring-4 ring-orange-500/20 shadow-xl">
                          <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                          <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            {portfolioData.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span>{portfolioData.location}</span>
                          </div>

                          <div className="flex justify-center space-x-4">
                            <a href={`https://github.com/${portfolioData.github}`} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                            <a href={`https://linkedin.com/in/${portfolioData.linkedin}`} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                              <Linkedin className="w-5 h-5" />
                            </a>
                            <a href={`mailto:${portfolioData.email}`} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                              <Mail className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refined About Section */}
            <section className="py-8 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-6"></div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl border border-slate-200 dark:border-slate-700">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                        {portfolioData.about}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white flex items-center">
                            <Target className="w-5 h-5 mr-2 text-orange-500" />
                            Current Focus
                          </h4>
                          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li>• AI & Machine Learning</li>
                            <li>• Full-Stack Development</li>
                            <li>• Open Source Contributions</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white flex items-center">
                            <Lightbulb className="w-5 h-5 mr-2 text-red-500" />
                            Interests
                          </h4>
                          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li>• Cloud Architecture</li>
                            <li>• Developer Experience</li>
                            <li>• Product Strategy</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-3xl flex items-center justify-center">
                          <div className="text-6xl font-bold text-orange-600 dark:text-orange-400">
                            {portfolioData.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sophisticated Projects Grid */}
            <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 relative">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">Crafting digital experiences with cutting-edge technology</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-6"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.projects.map((project: any) => (
                    <div key={project.id} className="group relative">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">

                        {/* Project Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            {project.featured && (
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Featured
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.description}</p>

                          {/* Features Section */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.features?.slice(0, 3).map((feature: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                              {project.features && project.features.length > 3 && (
                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-full">
                                  +{project.features.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.slice(0, 3).map((tech: string) => (
                              <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full">
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm rounded-full">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-3">
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                              <Eye className="w-4 h-4 mr-2" />
                              Demo
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-300 dark:border-slate-600">
                              <Github className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section - Keep Similar */}
            <section id="skills" className="py-24 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Skills</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">Expertise across the full technology stack</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-6"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(skillsByCategory).map(([category, skills]: [string, any[]]) => (
                    <div key={category} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{category}</h3>
                      <div className="space-y-4">
                        {skills.map((skill: any) => {
                          const skillLevel = skill.level || 70;
                          const getStarLevel = (level: number) => {
                            if (level >= 85) return 3;
                            if (level >= 70) return 2;
                            return 1;
                          };
                          const starCount = getStarLevel(skillLevel);

                          return (
                            <div key={skill.name} className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(3)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < starCount
                                      ? 'text-orange-500 fill-orange-500'
                                      : 'text-slate-300 dark:text-slate-600'
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Enhanced Achievements Section */}
            <section id="experience" className="py-16 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Key Achievements</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">Milestones that shaped my journey</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-6"></div>
                </div>

                {/* Mobile/Tablet: Grid Layout */}
                <div className="block lg:hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    {portfolioData.achievements.map((achievement: any, index: number) => (
                      <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-center mb-3">
                          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                          <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{achievement.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-center">{achievement.title}</h3>
                        <p className="text-orange-600 dark:text-orange-400 text-sm mb-2 font-medium text-center">{achievement.issuer}</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 text-center">{achievement.description}</p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                          <p className="mb-1">ID: {achievement.type === 'internship' ? 'INT-2024-001' : 'AWD-2024-002'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Timeline Layout */}
                <div className="hidden lg:block relative max-w-5xl mx-auto">
                  {/* Vertical Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>

                  <div className="space-y-16">
                    {portfolioData.achievements.map((achievement: any, index: number) => (
                      <div key={index} className="relative flex items-center">
                        {/* Timeline Dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>

                        {/* Content positioned left or right */}
                        <div className={`w-full flex ${index % 2 === 0 ? 'justify-start pr-8' : 'justify-end pl-8'}`}>
                          <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                              <div className="space-y-3">
                                <div className="flex items-center justify-center">
                                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{achievement.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{achievement.title}</h3>
                                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">{achievement.issuer}</p>
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{achievement.description}</p>
                                <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-600">
                                  <p>ID: {achievement.type === 'internship' ? 'INT-2024-001' : 'AWD-2024-002'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Certificates Grid */}
            <section className="py-24 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Certifications</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">Professional credentials and continuous learning</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mt-6"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioData.certificates.map((cert: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{cert.title}</h3>
                        <p className="text-orange-600 dark:text-orange-400 font-medium mb-2">{cert.issuer}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{cert.date}</p>

                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          <p className="mb-2">Professional certification demonstrating expertise in cloud computing fundamentals and best practices.</p>
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-medium">ID:</span> {cert.credentialId}
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* New Contact Section */}
            <ContactSection
              username={portfolioData.username || ""}
              email={portfolioData.email}
              github={portfolioData.github}
              linkedin={portfolioData.linkedin}
              resumeUrl={portfolioData.resume}
            />
          </div>
        )}



        {/* Template 3: Futuristic Glassmorphism - 2040 Portfolio */}
        {currentTemplate === 'modern' && (
          <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden -mt-44 -mb-20">
            {/* Animated Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
              {/* Particle Field */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-electric rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Nebula Gradients */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-pulse/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Enhanced About Section - Moved to Top */}
            <section id="about" className="relative flex items-center justify-center px-6 pt-20 pb-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-6xl font-black text-gradient-primary mb-6">About Me</h2>
                  <div className="w-48 h-2 bg-gradient-primary mx-auto rounded-full glow-electric"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Enhanced Profile Section */}
                  <div className="relative">
                    <div className="glass-card p-12 rounded-3xl border border-electric/20 shadow-2xl backdrop-blur-xl bg-white/5 transform hover:scale-105 transition-all duration-700 hover:shadow-electric/50">
                      <div className="text-center space-y-8">
                        <Avatar className="w-48 h-48 mx-auto ring-4 ring-electric/30 shadow-2xl">
                          <AvatarImage src="/placeholder.svg" alt={portfolioData.name} />
                          <AvatarFallback className="text-6xl font-bold bg-gradient-primary text-white">
                            {portfolioData.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className="space-y-4">
                          <h1 className="text-4xl lg:text-5xl font-black text-gradient-primary">
                            {portfolioData.name}
                          </h1>
                          <p className="text-xl lg:text-2xl font-semibold text-electric">
                            {portfolioData.title}
                          </p>
                          <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full glow-electric"></div>
                        </div>

                        {/* AI Badge */}
                        <div className="bg-gradient-primary px-6 py-3 rounded-full text-white text-sm font-bold shadow-lg glow-primary inline-block">
                          <Sparkles className="w-5 h-5 inline mr-2" />
                          AI Portfolio v3.0
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Content */}
                  <div className="space-y-8">
                    <div className="glass-card p-8 rounded-3xl border border-electric/20 shadow-2xl backdrop-blur-xl bg-white/5">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Professional Profile</h3>
                        </div>

                        <p className="text-lg text-white/80 leading-relaxed">
                          {portfolioData.about}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 pt-6">
                          <div className="space-y-4">
                            <h4 className="font-bold text-white flex items-center">
                              <Target className="w-5 h-5 mr-3 text-electric" />
                              Current Focus
                            </h4>
                            <ul className="space-y-2 text-white/70">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-electric rounded-full mr-3"></div>
                                AI & Machine Learning
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-electric rounded-full mr-3"></div>
                                Full-Stack Development
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-electric rounded-full mr-3"></div>
                                Open Source Contributions
                              </li>
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-bold text-white flex items-center">
                              <Lightbulb className="w-5 h-5 mr-3 text-pulse" />
                              Expertise Areas
                            </h4>
                            <ul className="space-y-2 text-white/70">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-pulse rounded-full mr-3"></div>
                                Cloud Architecture
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-pulse rounded-full mr-3"></div>
                                Developer Experience
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-pulse rounded-full mr-3"></div>
                                Product Strategy
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                          <Button className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-bold hover:glow-primary transition-all duration-300">
                            <Download className="w-5 h-5 mr-2" />
                            Download Resume
                          </Button>
                          <Button variant="outline" className="border-2 border-electric/50 text-electric hover:bg-electric/20 px-6 py-3 rounded-xl font-bold hover:glow-electric transition-all duration-300">
                            <Mail className="w-5 h-5 mr-2" />
                            Get In Touch
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Projects Section */}
            <section id="projects" className="py-16 px-6 relative">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-gradient-primary mb-4">Projects</h2>
                  <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full glow-electric"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                  {portfolioData.projects.map((project: any, index: number) => (
                    <div
                      key={project.id}
                      className="group animate-fade-in h-full"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="glass-card p-8 rounded-3xl border border-electric/20 shadow-2xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-electric/50 h-full flex flex-col">
                        {/* Holographic Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-3xl"></div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center glow-electric">
                              <Code className="w-7 h-7 text-electric" />
                            </div>
                            {project.featured && (
                              <div className="bg-gradient-primary px-3 py-1.5 rounded-full text-white text-xs font-bold glow-primary">
                                <Star className="w-3 h-3 inline mr-1" />
                                Featured
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl font-black text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                            {project.title}
                          </h3>

                          <p className="text-white/70 text-sm mb-6 leading-relaxed flex-grow">
                            {project.description}
                          </p>

                          <div className="space-y-4 mt-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.map((tech: string, i: number) => (
                                <span key={i} className="px-2 py-1 rounded-full text-xs font-medium bg-electric/20 text-electric border border-electric/30">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <Button
                                className="flex-1 bg-gradient-primary text-white border-0 rounded-xl px-4 py-2 text-sm font-bold hover:glow-primary transition-all duration-300"
                                asChild
                              >
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Demo
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                className="border-2 border-electric/50 text-electric hover:bg-electric/20 rounded-xl px-4 py-2 text-sm font-bold hover:glow-electric transition-all duration-300"
                                asChild
                              >
                                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Enhanced Skills Section */}
            <section id="skills" className="py-16 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-gradient-primary mb-4">Skills</h2>
                  <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full glow-electric"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                  {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any], categoryIndex: number) => (
                    <div
                      key={category}
                      className="glass-card p-8 rounded-3xl border border-electric/20 shadow-2xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-electric/50 animate-fade-in"
                      style={{ animationDelay: `${categoryIndex * 200}ms` }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary mr-4">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{category}</h3>
                      </div>

                      {/* Skills Grid */}
                      <div className="space-y-4">
                        {categorySkills.map((skill: any, skillIndex: number) => (
                          <div
                            key={skillIndex}
                            className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-electric/10 hover:border-electric/30 transition-all duration-300"
                          >
                            <span className="text-white font-medium">{skill.name}</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.ceil(skill.level / 20)
                                    ? 'text-electric fill-electric'
                                    : 'text-white/20'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Enhanced Achievements Section */}
            <section id="experience" className="py-16 px-6 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-gradient-primary mb-4">Achievements</h2>
                  <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full glow-electric"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative">
                  {portfolioData.achievements.map((achievement: any, index: number) => (
                    <div
                      key={index}
                      className="glass-card p-8 rounded-3xl border border-electric/20 shadow-2xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-lg animate-fade-in"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center glow-primary">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-electric font-bold text-lg">{achievement.date}</div>
                            <div className="text-white/60 text-sm">
                              {achievement.type === 'internship' ? 'Professional Experience' : 'Award & Recognition'}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-2xl font-black text-white">{achievement.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Building className="w-5 h-5 text-electric" />
                            <p className="text-electric font-bold text-lg">{achievement.issuer}</p>
                          </div>
                          <p className="text-white/80 leading-relaxed">{achievement.description}</p>
                        </div>

                        <div className="pt-4 border-t border-electric/20">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-white/60" />
                              <span className="text-white/60">Role: {achievement.type === 'internship' ? 'Software Engineering Intern' : 'Award Recipient'}</span>
                            </div>
                            <div className="text-white/60">
                              ID: {achievement.type === 'internship' ? 'INT-2024-001' : 'AWD-2024-002'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* New Contact Section */}
            <ContactSection
              username={portfolioData.username || ""}
              email={portfolioData.email}
              github={portfolioData.github}
              linkedin={portfolioData.linkedin}
              resumeUrl={portfolioData.resume}
            />
          </div>
        )}

      </main>
    </div>
  );
};

export default MainPortfolio;