import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, FileText, Award, Brain, ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ResumeUploadDialog from '@/components/ResumeUploadDialog';

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
      description: 'Upload your resume and extract achievements automatically',
      interactive: true
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
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Simplified Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-400/8 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-400/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Enhanced Orbiting Icons with Centered Heading */}
          <div className="relative mb-8">
            {/* Orbit Container with Enhanced Effects */}
            <div className="orbit-container mx-auto relative">
              {/* Inner Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse-slow" />
              
              {/* Orbiting Icons with Enhanced Styling */}
              <div className="orbit-icon bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Github className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="orbit-icon bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="orbit-icon bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Brain className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="orbit-icon bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            
            {/* Enhanced Centered Heading */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-fade-in">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent drop-shadow-sm font-black tracking-tight">
                    AI-Powered
                  </span>
                  <br />
                  <span className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent mt-2 block tracking-wide">
                    Internship Portfolio Builder
                  </span>
                </h1>
              </div>
            </div>
          </div>

            {/* Enhanced Typewriter Effect */}
            <div className="h-8 mb-4 flex items-center justify-center">
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 dark:border-slate-700/30">
                <span className="text-lg text-foreground-muted typewriter font-mono bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  {typewriterText}
                </span>
              </div>
            </div>

            {/* Enhanced Tagline */}
            <p className="text-xl lg:text-2xl text-foreground-muted max-w-3xl mx-auto mb-6 animate-slide-in-up font-medium leading-relaxed">
              One platform. <span className="text-gradient-primary font-semibold">Infinite potential.</span> Build your professional identity — smarter.
            </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-up">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/dummy-portfolio">
              <Button variant="outline" className="border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="w-4 h-4 mr-2" />
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-white/30 dark:border-slate-700/30">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted font-medium">{stat.label}</div>
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
            {features.map((feature, index) => {
              const FeatureCard = (
                <Card key={index} className="glass-card interactive group animate-slide-in-up cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground-muted text-sm">{feature.description}</p>
                </Card>
              );

              return feature.interactive ? (
                <ResumeUploadDialog key={index}>
                  {FeatureCard}
                </ResumeUploadDialog>
              ) : (
                FeatureCard
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6 text-gradient-primary">
              About PortFolia
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-12">
              We believe every student deserves to showcase their potential. PortFolia combines cutting-edge AI with beautiful design to help you create portfolios that truly represent your skills and achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Enhanced</h3>
              <p className="text-foreground-muted">
                Our AI analyzes your projects and achievements to craft compelling descriptions that highlight your unique impact and potential.
              </p>
            </Card>

            <Card className="glass-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
              <p className="text-foreground-muted">
                Connect your GitHub, upload your resume, and watch as we automatically import and enhance your professional profile.
              </p>
            </Card>

            <Card className="glass-card text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Results</h3>
              <p className="text-foreground-muted">
                Create stunning, professional portfolios that stand out to recruiters and help you land your dream internship or job.
              </p>
            </Card>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-gradient-primary">Join thousands of successful students</h3>
              <p className="text-foreground-muted mb-8 text-lg max-w-2xl mx-auto">
                Our AI-powered platform has helped students from top universities secure internships at leading tech companies, startups, and organizations worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">95%</div>
                  <div className="text-sm text-foreground-muted">Interview Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">2.5x</div>
                  <div className="text-sm text-foreground-muted">Faster Hiring Process</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">10K+</div>
                  <div className="text-sm text-foreground-muted">Portfolios Created</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto opacity-60">
                <div className="text-center p-3 bg-white/30 rounded-lg">
                  <div className="text-xs font-medium">Google</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-lg">
                  <div className="text-xs font-medium">Microsoft</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-lg">
                  <div className="text-xs font-medium">Meta</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-lg">
                  <div className="text-xs font-medium">Apple</div>
                </div>
              </div>
            </div>
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