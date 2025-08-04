import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileStats from '@/components/ProfileStats';
import ProfileForm from '@/components/ProfileForm';

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
    // Save profile data to backend/localStorage
    localStorage.setItem('portfolioProfile', JSON.stringify(profileData));
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (newAvatar: string) => {
    setProfileData(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary Card */}
            <Card className="glass-card animate-slide-in-up">
              <div className="text-center">
                <ProfileAvatar
                  name={profileData.name}
                  avatar={profileData.avatar}
                  isEditing={isEditing}
                  onAvatarChange={handleAvatarChange}
                />
                
                <h2 className="text-xl font-space font-semibold mb-1">{profileData.name}</h2>
                <p className="text-foreground-muted text-sm mb-4">{profileData.title}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-foreground-muted">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground-muted">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                {profileData.bio && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {profileData.bio.length > 120 
                        ? `${profileData.bio.substring(0, 120)}...` 
                        : profileData.bio
                      }
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Portfolio Analytics */}
            <ProfileStats />
          </div>

          {/* Main Content - Profile Form */}
          <div className="lg:col-span-2">
            <ProfileForm
              profileData={profileData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;