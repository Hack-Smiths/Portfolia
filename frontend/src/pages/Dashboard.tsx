import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Github, FileText, Eye, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AIAssistant from '@/components/AIAssistant';

const Dashboard = () => {
  const [completionProgress] = useState(75);

  const stats = [
    { 
      label: 'Total Projects', 
      value: '8', 
      icon: Github, 
      color: 'text-electric',
      bgColor: 'bg-electric/10'
    },
    { 
      label: 'AI Summaries', 
      value: '12', 
      icon: TrendingUp, 
      color: 'text-pulse',
      bgColor: 'bg-pulse/10'
    },
    { 
      label: 'Portfolios Shared', 
      value: '3', 
      icon: Eye, 
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const actionCards = [
    {
      title: 'Add Project',
      description: 'Import from GitHub or add manually',
      icon: Plus,
      color: 'electric',
      link: '/projects'
    },
    {
      title: 'Upload Resume',
      description: 'Extract achievements automatically',
      icon: FileText,
      color: 'pulse',
      link: '/achievements'
    },
    {
      title: 'View Portfolio',
      description: 'See how your portfolio looks',
      icon: Eye,
      color: 'success',
      link: '/portfolio'
    }
  ];

  const recentActivity = [
    {
      action: 'Imported "E-commerce React App" from GitHub',
      time: '2 hours ago',
      icon: Github,
      status: 'completed'
    },
    {
      action: 'Added "AWS Cloud Internship" achievement',
      time: '1 day ago',
      icon: CheckCircle,
      status: 'completed'
    },
    {
      action: 'Generated AI summary for "ML Project"',
      time: '2 days ago',
      icon: TrendingUp,
      status: 'completed'
    },
    {
      action: 'Updated portfolio theme to "Modern"',
      time: '3 days ago',
      icon: Eye,
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-space font-bold mb-2">
            Welcome back, <span className="text-gradient-primary">Alex</span> 👋
          </h1>
          <p className="text-foreground-muted text-lg">
            Let's continue building your amazing portfolio
          </p>
        </div>

        {/* Profile Completion */}
        <Card className="glass-card mb-8 animate-slide-in-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Profile Completion</h2>
              <p className="text-foreground-muted text-sm">
                Complete your profile to increase visibility
              </p>
            </div>
            <div className="text-2xl font-bold text-gradient-primary">
              {completionProgress}%
            </div>
          </div>
          <div className="relative">
            <Progress value={completionProgress} className="h-3" />
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse-slow" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4 text-xs">
            <div className="flex items-center text-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Profile Info
            </div>
            <div className="flex items-center text-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Projects Added
            </div>
            <div className="flex items-center text-warning">
              <Clock className="w-3 h-3 mr-1" />
              Skills Section
            </div>
            <div className="flex items-center text-foreground-muted">
              <Clock className="w-3 h-3 mr-1" />
              Resume Upload
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground-muted text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Action Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-space font-bold text-gradient-primary">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {actionCards.map((card, index) => (
                <Link key={index} to={card.link}>
                  <Card className="glass-card interactive group animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:glow-primary transition-all`}>
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-foreground-muted text-sm">{card.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-2xl font-space font-bold text-gradient-primary">
              Recent Activity
            </h2>
            <Card className="glass-card animate-slide-in-right">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center mt-1">
                      <activity.icon className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-foreground-muted">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Portfolio Preview CTA */}
        <Card className="glass-card mt-8 animate-slide-in-up">
          <div className="text-center">
            <h2 className="text-2xl font-space font-bold mb-3">
              Ready to share your <span className="text-gradient-primary">portfolio</span>?
            </h2>
            <p className="text-foreground-muted mb-6">
              Your portfolio is looking great! Preview it and share with potential employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button className="btn-primary">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Portfolio
                </Button>
              </Link>
              <Link to="/export">
                <Button variant="outline">
                  Export & Share
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <AIAssistant />
    </div>
  );
};

export default Dashboard;