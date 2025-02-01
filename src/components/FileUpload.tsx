import React from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length) {
      onFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div
      className="relative border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-all cursor-pointer bg-blue-50/50 group"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInput}
      />
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      
      <div className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Upload Your Resume
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your resume here or click to browse
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            <span>PDF</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            <span>DOC</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            <span>DOCX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;