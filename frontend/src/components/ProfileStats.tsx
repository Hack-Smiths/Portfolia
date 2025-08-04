import { TrendingUp, Eye, User, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ProfileStats = () => {
  const completionPercentage = 85;
  const stats = [
    { label: 'Profile Views', value: '247', trend: '+12%' },
    { label: 'Projects', value: '8', trend: '+2' },
    { label: 'Achievements', value: '12', trend: '+1' },
    { label: 'Skills', value: '18', trend: '+3' }
  ];

  return (
    <Card className="glass-card animate-slide-in-up">
      <div className="text-center mb-6">
        <h3 className="text-lg font-space font-semibold mb-2">Portfolio Analytics</h3>
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto relative">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gradient-primary">{completionPercentage}%</span>
            </div>
          </div>
          <p className="text-sm text-foreground-muted">Profile Completion</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <span className="text-foreground-muted text-sm">{stat.label}</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{stat.value}</span>
              <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full interactive">
          <Eye className="w-4 h-4 mr-2" />
          View Public Portfolio
        </Button>
        <Button variant="outline" className="w-full interactive">
          <TrendingUp className="w-4 h-4 mr-2" />
          Analytics Dashboard
        </Button>
      </div>
    </Card>
  );
};

export default ProfileStats;