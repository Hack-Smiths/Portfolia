import { useState } from 'react';
import { User, Mail, MapPin, Github, Linkedin, Globe, Camera, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    title: 'Full-Stack Developer & AI Enthusiast',
    location: 'San Francisco, CA',
    bio: 'Passionate full-stack developer with 3+ years of experience building scalable web applications. Specialized in React, Node.js, and AI integration. Always eager to learn new technologies and solve complex problems.',
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    website: 'https://alexjohnson.dev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl lg:text-4xl font-space font-bold text-gradient-primary mb-2">
              Profile Settings
            </h1>
            <p className="text-foreground-muted">
              Manage your personal information and portfolio details
            </p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="btn-primary" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button className="btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="glass-card animate-slide-in-up">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
                <p className="text-foreground-muted text-sm mb-4">{profileData.title}</p>
                
                <div className="space-y-2 text-sm text-foreground-muted">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Portfolio Stats */}
            <Card className="glass-card mt-6 animate-slide-in-up">
              <h3 className="text-lg font-semibold mb-4">Portfolio Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground-muted">Profile Completion</span>
                  <span className="font-semibold text-primary">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground-muted">Total Views</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground-muted">Projects</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground-muted">Achievements</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Eye className="w-4 h-4 mr-2" />
                View Public Portfolio
              </Button>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card animate-slide-in-right">
              <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Full-Stack Developer, Data Scientist"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Me</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell visitors about yourself, your experience, and what you're passionate about..."
                  />
                  {isEditing && (
                    <p className="text-xs text-foreground-muted">
                      {profileData.bio.length}/500 characters
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Social Links</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center space-x-2">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </Label>
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center space-x-2">
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Personal Website</span>
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold">Privacy Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Public Portfolio</p>
                        <p className="text-sm text-foreground-muted">
                          Allow your portfolio to be discovered by recruiters
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Contact Information</p>
                        <p className="text-sm text-foreground-muted">
                          Show email and location on public portfolio
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Visible
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;