import { useState, useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileStats from '@/components/ProfileStats';
import ProfileForm from '@/components/ProfileForm';
import { useAuthContext } from '@/contexts/AuthContext';
import { getProfile, saveProfile } from '@/utils/api'; // Adjust the import based on your API structure
import { set } from 'date-fns';

const Profile = () => {
  const {user} = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    title: "",
    location: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    avatar: ""
  });
  useEffect(() => {
    if (!user) return;
    getProfile()
      .then((data) => {
        if (Object.keys(data).length === 0) {
          // No profile yet, set empty defaults
          setProfileData({
            name: user.username,
            email: user.email,
            title: "",
            location: "",
            bio: "",
            github: "",
            linkedin: "",
            website: "",
            avatar: "",
          });
        } else {
          setProfileData(data);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
    saveProfile(profileData)
      .then((data) => setProfileData(data)) // ✅ renamed saved -> data
      .catch((err) => console.error(err));
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