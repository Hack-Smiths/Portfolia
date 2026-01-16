import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Upload, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { uploadResume, confirmResume } from '@/utils/api';
import ResumeDataEditor from './ResumeDataEditor';

interface ResumeUploadDialogProps {
  children: React.ReactNode;
  onUploadSuccess?: () => void;
}

interface ExtractedData {
  name: string;
  title: string;
  location: string;
  email: string;
  about: string;
  github: string;
  linkedin: string;
  website: string;
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    features: string[];
  }>;
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  work_experience: Array<{
    title: string;
    company: string;
    duration: string;
    location: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    description: string;
  }>;
  achievements: Array<{
    title: string;
    issuer: string;
    date: string;
    type: string;
    description: string;
  }>;
}

const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({ children, onUploadSuccess }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [editedData, setEditedData] = useState<ExtractedData | null>(null);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);

  // Selection state for selective import
  const [selectedItems, setSelectedItems] = useState<{
    work_experience: Set<number>;
    projects: Set<number>;
    skills: Set<number>;
    certifications: Set<number>;
    achievements: Set<number>;
  }>({
    work_experience: new Set(),
    projects: new Set(),
    skills: new Set(),
    certifications: new Set(),
    achievements: new Set()
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or DOCX file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadResume(file);
      setExtractedData(response.extracted_data);
      setEditedData(response.extracted_data); // Initialize edited data with extracted data
      setResumeId(response.resume_id);

      // Initialize selection state - select all items by default
      setSelectedItems({
        work_experience: new Set(response.extracted_data.work_experience.map((_, i) => i)),
        projects: new Set(response.extracted_data.projects.map((_, i) => i)),
        skills: new Set(response.extracted_data.skills.map((_, i) => i)),
        certifications: new Set(response.extracted_data.certifications.map((_, i) => i)),
        achievements: new Set(response.extracted_data.achievements.map((_, i) => i))
      });

      toast({
        title: 'Resume uploaded successfully!',
        description: 'Review the extracted data below.',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      let errorMessage = 'Failed to upload resume. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Please log in to upload your resume';
      } else if (error.response?.status === 415) {
        errorMessage = 'Unsupported file type. Please upload PDF or DOCX';
      } else if (error.response?.status === 422) {
        errorMessage = error.response?.data?.detail || 'Invalid file format';
      }

      toast({
        title: 'Upload failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = async () => {
    if (!resumeId || !editedData) return;

    setConfirming(true);
    try {
      // Filter data to only include selected items
      const selectedData = {
        ...editedData,
        work_experience: editedData.work_experience.filter((_, i) => selectedItems.work_experience.has(i)),
        projects: editedData.projects.filter((_, i) => selectedItems.projects.has(i)),
        skills: editedData.skills.filter((_, i) => selectedItems.skills.has(i)),
        certifications: editedData.certifications.filter((_, i) => selectedItems.certifications.has(i)),
        achievements: editedData.achievements.filter((_, i) => selectedItems.achievements.has(i))
      };

      await confirmResume(resumeId, selectedData);

      const totalSelected = selectedItems.work_experience.size + selectedItems.projects.size +
        selectedItems.skills.size + selectedItems.certifications.size +
        selectedItems.achievements.size;

      toast({
        title: 'Resume imported successfully!',
        description: `Imported ${totalSelected} selected items to your portfolio.`,
      });

      // Reset and close
      setFile(null);
      setExtractedData(null);
      setEditedData(null);
      setResumeId(null);
      setSelectedItems({
        work_experience: new Set(),
        projects: new Set(),
        skills: new Set(),
        certifications: new Set(),
        achievements: new Set()
      });
      setIsOpen(false);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error: any) {
      console.error('Confirm error:', error);
      toast({
        title: 'Failed to save resume data',
        description: error.response?.data?.detail || 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setConfirming(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setExtractedData(null);
    setEditedData(null);
    setResumeId(null);
    setSelectedItems({
      work_experience: new Set(),
      projects: new Set(),
      skills: new Set(),
      certifications: new Set(),
      achievements: new Set()
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Upload Resume</span>
          </DialogTitle>
          <DialogDescription>
            Upload your resume and let AI extract your information to auto-populate your portfolio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          {!extractedData ? (
            <>
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${file
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  }`}
              >
                <input
                  type="file"
                  id="resume-upload-dialog"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />

                {!file ? (
                  <label htmlFor="resume-upload-dialog" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Click to upload resume</p>
                    <p className="text-xs text-muted-foreground">PDF or DOCX (Max 10MB)</p>
                  </label>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      disabled={uploading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* AI Features */}
              <div className="bg-gradient-soft p-6 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  AI Enhancement Features
                </h4>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Extract and categorize technical skills
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Identify key achievements and projects
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Auto-categorize into portfolio sections
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Smart skill level detection
                  </li>
                </ul>
              </div>

              {/* Upload Button */}
              {file && (
                <div className="flex space-x-3">
                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-primary flex-1"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCancel} disabled={uploading}>
                    Cancel
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {/* Success Message */}
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Data extracted successfully!
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Review and edit the information below, then confirm to import into your portfolio.
                  </p>
                </div>
              </div>

              {/* Resume Data Editor */}
              {editedData && (
                <ResumeDataEditor
                  data={editedData}
                  onDataChange={setEditedData}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                />
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="btn-primary flex-1"
                >
                  {confirming ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm & Import
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={confirming}
                >
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                After importing, you can continue editing in your profile and portfolio sections
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;