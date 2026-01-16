import { useState, useEffect } from 'react';
import { Mail, MapPin, Globe, Lock, BarChart3, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileStats from '@/components/ProfileStats';
import ProfileForm from '@/components/ProfileForm';
import { useAuthContext } from '@/contexts/AuthContext';
import { getProfile, saveProfile, updatePrivacySettings } from '@/utils/api';
import { validateProfileForm } from '@/utils/validation';

type ProfileData = {
  name: string;
  email: string;
  title: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
  avatar: string;
};

const Profile = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    title: "",
    location: "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
    avatar: "",
  });

  // Fetch profile on load
  useEffect(() => {
    if (!user) return;

    getProfile()
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          // No profile yet → initialize from auth user
          setProfileData({
            name: user.full_name || user.username,
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
      .catch((err) => {
        console.error("Failed to load profile:", err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setValidationErrors({});
    setSelectedAvatarFile(null);
    // Reload profile data to reset any changes
    if (user) {
      getProfile()
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setProfileData(data);
          }
        })
        .catch((err) => console.error("Failed to reload profile:", err));
    }
  };

  // Save profile
  const handleSave = async () => {
    if (!user) return;

    // Validate all fields before saving
    const errors = validateProfileForm({
      title: profileData.title,
      location: profileData.location,
      bio: profileData.bio,
      github: profileData.github,
      linkedin: profileData.linkedin,
      website: profileData.website,
    });

    // If there are validation errors, show toast and focus first invalid field
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      });

      // Focus first invalid field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    try {
      // TODO: Backend integration for avatar upload
      // When backend endpoint is ready, uncomment and wire up:
      // if (selectedAvatarFile) {
      //   const formData = new FormData();
      //   formData.append('avatar', selectedAvatarFile);
      //   formData.append('profileData', JSON.stringify(profileData));
      //   const savedProfile = await uploadProfileWithAvatar(formData);
      //   setProfileData(savedProfile);
      // } else {
      //   const savedProfile = await saveProfile(profileData);
      //   setProfileData(savedProfile);
      // }

      // For now, just save profile data without avatar file
      const savedProfile = await saveProfile(profileData);
      setProfileData(savedProfile);
      setIsEditing(false);
      setValidationErrors({});
      setSelectedAvatarFile(null);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (err) {
      console.error("Failed to save profile:", err);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Generic input handler
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Avatar update handler
  const handleAvatarChange = (newAvatar: string, file?: File) => {
    setProfileData((prev) => ({
      ...prev,
      avatar: newAvatar,
    }));
    // Store the file for later upload
    if (file) {
      setSelectedAvatarFile(file);
    } else {
      setSelectedAvatarFile(null);
    }
  };

  // Check if form is valid (for disabling save button)
  const isFormValid = () => {
    // Professional title is required
    if (!profileData.title || profileData.title.trim().length < 3) {
      return false;
    }
    // Check if there are any validation errors
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaveDisabled={isEditing && !isFormValid()}
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

            {/* Privacy Settings Card */}
            <Card className="glass-card animate-slide-in-up p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Privacy Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-portfolio" className="text-sm font-medium">
                      Public Portfolio
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Allow anyone to view your portfolio
                    </p>
                  </div>
                  <Switch
                    id="public-portfolio"
                    checked={isPublic}
                    onCheckedChange={async (checked) => {
                      try {
                        await updatePrivacySettings({ is_public: checked });
                        setIsPublic(checked);
                        toast({
                          title: checked ? "Portfolio is now public" : "Portfolio is now private",
                          description: checked
                            ? "Anyone can view your portfolio at /portfolio/" + (user?.username || '')
                            : "Only you can view your portfolio",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update privacy settings",
                          variant: "destructive",
                        });
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics" className="text-sm font-medium">
                      Enable Analytics
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Track portfolio views and statistics
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={analyticsEnabled}
                    onCheckedChange={async (checked) => {
                      try {
                        await updatePrivacySettings({ analytics_enabled: checked });
                        setAnalyticsEnabled(checked);
                        toast({
                          title: checked ? "Analytics enabled" : "Analytics disabled",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update analytics settings",
                          variant: "destructive",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              {isPublic && user?.username && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Your portfolio is live!
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-900 dark:text-blue-100">
                          /portfolio/{user.username}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user.username}`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                            toast({
                              title: "Link copied!",
                              description: "Portfolio URL copied to clipboard",
                            });
                          }}
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
              validationErrors={validationErrors}
              onValidationChange={setValidationErrors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;