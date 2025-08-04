import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileAvatarProps {
  name: string;
  avatar: string;
  isEditing: boolean;
  onAvatarChange?: (newAvatar: string) => void;
}

const ProfileAvatar = ({ name, avatar, isEditing, onAvatarChange }: ProfileAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAvatarUpload = () => {
    // Mock avatar upload functionality
    const newAvatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b412cf6c?w=150&h=150&fit=crop&crop=face'
    ];
    const randomAvatar = newAvatars[Math.floor(Math.random() * newAvatars.length)];
    onAvatarChange?.(randomAvatar);
  };

  return (
    <div 
      className="relative inline-block mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="w-32 h-32 ring-4 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="text-2xl font-space font-bold bg-gradient-primary text-white">
          {name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      {isEditing && (
        <div className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="sm"
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12 p-0"
            onClick={handleAvatarUpload}
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      )}
      
      {isEditing && !isHovered && (
        <Button
          size="sm"
          className="absolute bottom-0 right-0 w-10 h-10 rounded-full p-0 bg-gradient-primary text-white hover:glow-primary transition-all"
          onClick={handleAvatarUpload}
        >
          <Camera className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ProfileAvatar;