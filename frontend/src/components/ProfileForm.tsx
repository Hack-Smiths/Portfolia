import { Github, Linkedin, Globe, MapPin, Mail, User, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  validateTitle,
  validateLocation,
  validateBio,
  validateGitHubUrl,
  validateLinkedInUrl,
  validateWebsiteUrl,
} from '@/utils/validation';

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
  validationErrors?: Record<string, string>;
  onValidationChange?: (errors: Record<string, string>) => void;
}

const ProfileForm = ({
  profileData,
  isEditing,
  onInputChange,
  validationErrors = {},
  onValidationChange,
}: ProfileFormProps) => {
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

  // Validate field on blur
  const handleBlur = (field: keyof ProfileData) => {
    if (!isEditing || !onValidationChange) return;

    let error: string | null = null;
    const value = profileData[field];

    switch (field) {
      case 'title':
        error = validateTitle(value);
        break;
      case 'location':
        error = validateLocation(value);
        break;
      case 'bio':
        error = validateBio(value);
        break;
      case 'github':
        error = validateGitHubUrl(value);
        break;
      case 'linkedin':
        error = validateLinkedInUrl(value);
        break;
      case 'website':
        error = validateWebsiteUrl(value);
        break;
    }

    const newErrors = { ...validationErrors };
    if (error) {
      newErrors[field] = error;
    } else {
      delete newErrors[field];
    }
    onValidationChange(newErrors);
  };

  // Helper to get error styling
  const getInputClassName = (field: string) => {
    const hasError = validationErrors[field];
    const baseClass = 'transition-all';
    if (!isEditing) return baseClass;
    if (hasError) return `${baseClass} ring-2 ring-destructive/50 border-destructive`;
    return `${baseClass} ring-2 ring-primary/20`;
  };

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
                  className={getInputClassName('name')}
                />
                {validationErrors.name && isEditing && (
                  <div className="flex items-start gap-1 text-xs text-destructive">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{validationErrors.name}</span>
                  </div>
                )}
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
                  className={getInputClassName('email')}
                />
                {validationErrors.email && isEditing && (
                  <div className="flex items-start gap-1 text-xs text-destructive">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{validationErrors.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-1">
                Professional Title
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={profileData.title}
                onChange={(e) => onInputChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                disabled={!isEditing}
                placeholder="e.g., Full-Stack Developer, Data Scientist"
                className={getInputClassName('title')}
              />
              {validationErrors.title && isEditing && (
                <div className="flex items-start gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{validationErrors.title}</span>
                </div>
              )}
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
                onBlur={() => handleBlur('location')}
                disabled={!isEditing}
                placeholder="e.g., San Francisco, CA"
                className={getInputClassName('location')}
              />
              {validationErrors.location && isEditing && (
                <div className="flex items-start gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{validationErrors.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => onInputChange('bio', e.target.value)}
                onBlur={() => handleBlur('bio')}
                disabled={!isEditing}
                rows={4}
                maxLength={500}
                placeholder="Tell visitors about yourself, your experience, and what you're passionate about..."
                className={`resize-none ${getInputClassName('bio')}`}
              />
              {isEditing && (
                <div className="flex justify-between text-xs text-foreground-muted">
                  <span>Make it compelling and professional</span>
                  <span className={profileData.bio.length > 450 ? 'text-warning' : ''}>
                    {profileData.bio.length}/500 characters
                  </span>
                </div>
              )}
              {validationErrors.bio && isEditing && (
                <div className="flex items-start gap-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{validationErrors.bio}</span>
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
                  onBlur={() => handleBlur(link.key as keyof ProfileData)}
                  disabled={!isEditing}
                  placeholder={link.placeholder}
                  className={getInputClassName(link.key)}
                />
                {validationErrors[link.key] && isEditing && (
                  <div className="flex items-start gap-1 text-xs text-destructive">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{validationErrors[link.key]}</span>
                  </div>
                )}
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