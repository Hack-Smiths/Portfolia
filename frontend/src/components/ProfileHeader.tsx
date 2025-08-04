import { Edit, Eye, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileHeader = ({ isEditing, onEdit, onSave, onCancel }: ProfileHeaderProps) => {
  return (
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
            <Button variant="outline" onClick={onCancel} className="interactive">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button className="btn-primary" onClick={onSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="interactive">
              <Eye className="w-4 h-4 mr-2" />
              Preview Portfolio
            </Button>
            <Button className="btn-primary" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;