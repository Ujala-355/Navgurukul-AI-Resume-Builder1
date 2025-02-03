import React, { useState } from 'react';
import { FileText, Wand2, BookOpen, Download } from 'lucide-react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ScoreDisplay from './components/ScoreDisplay';
import { ResumeScore } from './types';

function App() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [score, setScore] = useState<ResumeScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    setScore(null);
    setError(null);
    
    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const response = await axios.post('https://resume-review-backend.onrender.com/api/upload-resume-with-diff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setScore(response.data.atsScore);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Navgurukul AI Resume Builder</h1>
                <p className="text-sm text-gray-600">Powered by AI to optimize your career journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <BookOpen className="w-5 h-5 mr-1" />
                <span>Guide</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Enhance Your Resume</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Upload your resume and let our AI analyze its strength, providing you with actionable insights 
                and optimization suggestions.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <FileUpload onFileUpload={handleFileUpload} />
              {fileName && (
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Selected file: {fileName}</span>
                </div>
              )}

              {error && (
                <div className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {loading && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing your resume...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {score && (
            <div className="border-t border-gray-100 bg-gradient-to-b from-white to-blue-50 p-8">
              <div className="max-w-2xl mx-auto">
                <ScoreDisplay score={score} />
                <div className="mt-8 flex justify-center">
                  {/* <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-md">
                    <Download className="w-5 h-5 mr-2" />
                    Download Optimization Report
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Navgurukul AI Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
