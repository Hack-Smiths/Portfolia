import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Upload } from 'lucide-react';
import FileUpload from './FileUpload';

interface ResumeUploadDialogProps {
  children: React.ReactNode;
}

const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Here you would typically send the file to your backend for processing
    console.log('File uploaded:', file.name);
  };

  const handleAnalyzeResume = () => {
    if (uploadedFile) {
      // Simulate AI analysis
      console.log('Analyzing resume:', uploadedFile.name);
      // Close dialog after analysis starts
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Upload Resume</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <FileUpload
            onFileUpload={handleFileUpload}
            title="Upload Your Resume"
            description="Upload your resume in PDF or DOC format. Our AI will extract achievements, skills, and experience to enhance your portfolio."
          />

          {uploadedFile && (
            <div className="space-y-4">
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
                    Identify key achievements and quantify impact
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Generate compelling project descriptions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Suggest portfolio improvements
                  </li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="btn-primary flex-1" 
                  onClick={handleAnalyzeResume}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with AI
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Later
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;