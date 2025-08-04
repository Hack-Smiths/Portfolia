import { Github, Linkedin, Globe, MapPin, Mail, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ProfileData {
  name: string;
  email: string;
  title: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

const ProfileForm = ({ profileData, isEditing, onInputChange }: ProfileFormProps) => {
  const socialLinks = [
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { key: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' }
  ];

  const privacySettings = [
    {
      title: 'Public Portfolio',
      description: 'Allow your portfolio to be discovered by recruiters',
      enabled: true
    },
    {
      title: 'Contact Information',
      description: 'Show email and location on public portfolio',
      enabled: true
    },
    {
      title: 'Analytics Tracking',
      description: 'Track portfolio views and visitor analytics',
      enabled: false
    },
    {
      title: 'Direct Messaging',
      description: 'Allow recruiters to contact you directly',
      enabled: true
    }
  ];

  return (
    <Card className="glass-card animate-slide-in-right">
      <div className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-space font-semibold mb-6 text-gradient-primary">
            Personal Information
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className={`transition-all ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={`transition-all ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={profileData.title}
                onChange={(e) => onInputChange('title', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., Full-Stack Developer, Data Scientist"
                className={`transition-all ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => onInputChange('location', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., San Francisco, CA"
                className={`transition-all ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => onInputChange('bio', e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell visitors about yourself, your experience, and what you're passionate about..."
                className={`transition-all resize-none ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
              />
              {isEditing && (
                <div className="flex justify-between text-xs text-foreground-muted">
                  <span>Make it compelling and professional</span>
                  <span className={profileData.bio.length > 450 ? 'text-warning' : ''}>
                    {profileData.bio.length}/500 characters
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="text-lg font-space font-semibold text-gradient-primary">Social Links</h4>
          
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.key} className="space-y-2">
                <Label htmlFor={link.key} className="flex items-center space-x-2">
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Label>
                <Input
                  id={link.key}
                  value={profileData[link.key as keyof ProfileData]}
                  onChange={(e) => onInputChange(link.key, e.target.value)}
                  disabled={!isEditing}
                  placeholder={link.placeholder}
                  className={`transition-all ${isEditing ? 'ring-2 ring-primary/20' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="text-lg font-space font-semibold text-gradient-primary">Privacy & Visibility</h4>
          
          <div className="space-y-4">
            {privacySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-foreground-muted">
                    {setting.description}
                  </p>
                </div>
                <Switch 
                  defaultChecked={setting.enabled}
                  disabled={!isEditing}
                  className="ml-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileForm;