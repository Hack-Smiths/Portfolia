import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  title?: string;
  description?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedFileTypes = ['.pdf', '.doc', '.docx'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  title = "Upload Resume",
  description = "Upload your resume in PDF or DOC format"
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      setUploadStatus('error');
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setIsUploading(true);
      setUploadStatus('idle');

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStatus('success');
          onFileUpload?.(file);
        }
      }, 200);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: maxFileSize,
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setIsUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-foreground-muted mb-4">{description}</p>
      </div>

      {!uploadedFile ? (
        <Card
          {...getRootProps()}
          className={`glass-card p-8 border-2 border-dashed cursor-pointer transition-all duration-300 ${
            isDragActive && !isDragReject
              ? 'border-primary bg-primary/5 glow-primary'
              : isDragReject
              ? 'border-destructive bg-destructive/5'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            {isDragActive ? (
              <div>
                <p className="text-lg font-medium text-primary mb-2">
                  {isDragReject ? 'File type not supported' : 'Drop your file here'}
                </p>
                <p className="text-sm text-foreground-muted">
                  {isDragReject ? 'Please use PDF, DOC, or DOCX files' : 'Release to upload'}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">
                  Drag & drop your resume here, or{' '}
                  <span className="text-primary">browse files</span>
                </p>
                <p className="text-sm text-foreground-muted mb-4">
                  Supports: {acceptedFileTypes.join(', ')} • Max size: {formatFileSize(maxFileSize)}
                </p>
                <Button className="btn-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="glass-card p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium truncate">{uploadedFile.name}</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive"
                  onClick={removeFile}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-foreground-muted mb-3">
                {formatFileSize(uploadedFile.size)}
              </p>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {uploadStatus === 'success' && (
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload complete</span>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="flex items-center space-x-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload failed</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {uploadedFile && uploadStatus === 'success' && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success mb-1">
                Resume uploaded successfully!
              </p>
              <p className="text-sm text-foreground-muted">
                Our AI will analyze your resume and extract key achievements and skills to enhance your portfolio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;