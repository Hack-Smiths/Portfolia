import { useState, useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { validateImageFile } from '@/utils/validation';

interface ProfileAvatarProps {
  name: string;
  avatar: string;
  isEditing: boolean;
  onAvatarChange?: (newAvatar: string, file?: File) => void;
}

const ProfileAvatar = ({ name, avatar, isEditing, onAvatarChange }: ProfileAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      setPreviewUrl(null);
      setSelectedFile(null);
      return;
    }

    // Clear any previous errors
    setError(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      setSelectedFile(file);
      // Notify parent component with preview URL and file
      onAvatarChange?.(result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Notify parent to revert to original avatar
    onAvatarChange?.(avatar);
  };

  // Use preview URL if available, otherwise use the avatar prop
  const displayAvatar = previewUrl || avatar;

  return (
    <div className="mb-6">
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar className="w-32 h-32 ring-4 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
          <AvatarImage src={displayAvatar} alt={name} />
          <AvatarFallback className="text-2xl font-space font-bold bg-gradient-primary text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={!isEditing}
        />

        {/* Hover overlay with upload button */}
        {isEditing && (
          <div className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <Button
              size="sm"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12 p-0"
              onClick={handleUploadClick}
              type="button"
            >
              <Camera className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Camera button when not hovering */}
        {isEditing && !isHovered && (
          <Button
            size="sm"
            className="absolute bottom-0 right-0 w-10 h-10 rounded-full p-0 bg-gradient-primary text-white hover:glow-primary transition-all"
            onClick={handleUploadClick}
            type="button"
          >
            <Camera className="w-4 h-4" />
          </Button>
        )}

        {/* Remove button when image is selected */}
        {isEditing && selectedFile && (
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-0 right-0 w-8 h-8 rounded-full p-0"
            onClick={handleRemoveImage}
            type="button"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Upload instructions and error messages */}
      {isEditing && (
        <div className="mt-3 text-center">
          {!selectedFile && !error && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              className="text-xs"
              type="button"
            >
              <Upload className="w-3 h-3 mr-1" />
              Change Photo
            </Button>
          )}

          {selectedFile && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              ✓ Image selected: {selectedFile.name}
            </p>
          )}

          {error && (
            <p className="text-xs text-destructive font-medium">
              {error}
            </p>
          )}

          {!error && !selectedFile && (
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, or WebP • Max 2MB
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;