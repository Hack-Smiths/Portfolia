import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, FileText, Award, Brain, ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Landing = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const phrases = [
    'Import from GitHub...',
    'Upload Resume...',
    'Summarize with AI...',
    'Build & Share...'
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const typePhrase = () => {
      const phrase = phrases[currentPhrase];
      let index = 0;
      
      const typeInterval = setInterval(() => {
        setTypewriterText(phrase.slice(0, index + 1));
        index++;
        
        if (index >= phrase.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }, 2000);
        }
      }, 100);
    };

    typePhrase();
  }, [currentPhrase]);

  const features = [
    {
      icon: Github,
      title: 'Auto-Import Projects',
      description: 'Connect GitHub and automatically import your best repositories'
    },
    {
      icon: Brain,
      title: 'AI Enhancement',
      description: 'Let AI craft compelling descriptions and highlight your impact'
    },
    {
      icon: FileText,
      title: 'Resume Integration',
      description: 'Upload your resume and extract achievements automatically'
    },
    {
      icon: Award,
      title: 'Smart Showcase',
      description: 'Beautiful portfolios that highlight your unique strengths'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Portfolios Created' },
    { value: '95%', label: 'Interview Success' },
    { value: '2.5x', label: 'Faster Hiring' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          {/* Orbiting Icons */}
          <div className="orbit-container mx-auto mb-12">
            <div className="orbit-icon">
              <Github className="w-5 h-5" />
            </div>
            <div className="orbit-icon">
              <FileText className="w-5 h-5" />
            </div>
            <div className="orbit-icon">
              <Brain className="w-5 h-5" />
            </div>
            <div className="orbit-icon">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-space font-bold mb-6 animate-fade-in">
            <span className="text-gradient-primary">AI-Powered</span><br />
            Internship Portfolio Builder
          </h1>

          <div className="h-8 mb-6 flex items-center justify-center">
            <span className="text-xl text-foreground-muted typewriter font-mono">
              {typewriterText}
            </span>
          </div>

          <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-10 animate-slide-in-up">
            One platform. Infinite potential. Build your professional identity — smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up">
            <Link to="/auth">
              <Button className="btn-primary text-lg px-8 py-4 glow-primary">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button className="btn-ghost text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-slide-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gradient-primary">{stat.value}</div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6 text-gradient-primary">
              Everything you need to stand out
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              From project imports to AI-enhanced descriptions, we've got every aspect of portfolio building covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card interactive group animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="glass-card max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6">
              Ready to build your <span className="text-gradient-primary">standout portfolio</span>?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Join thousands of students who've landed their dream internships with AI-enhanced portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="btn-primary text-lg px-8 py-4">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button className="btn-ghost text-lg px-8 py-4">
                <Star className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-space font-bold text-xl text-gradient-primary">
                PortFolia
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-foreground-muted">
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Team Credits</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;