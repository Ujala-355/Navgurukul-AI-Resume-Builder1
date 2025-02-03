import React from 'react';
import { ResumeScore } from '../types';
import { Award, CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreDisplayProps {
  score: ResumeScore;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const getScoreColor = (value: number): string => {
    if (value >= 90) return '#22c55e'; // green
    if (value >= 80) return '#3b82f6'; // blue
    if (value >= 70) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getFeedback = (value: number): string => {
    if (value >= 90) return 'Excellent resume! Highly competitive for most positions.';
    if (value >= 80) return 'Strong resume with good potential for improvement.';
    if (value >= 70) return 'Good foundation, but needs enhancement in key areas.';
    return 'Requires significant improvements to be competitive.';
  };

  const color = getScoreColor(score.analysis.atsScore);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <div 
          className="relative w-48 h-48 rounded-full border-8 flex items-center justify-center mb-6 transition-all duration-300"
          style={{ borderColor: color }}
        >
          <Award className="absolute top-6 w-8 h-8" style={{ color }} />
          <span className="text-5xl font-bold" style={{ color }}>
            {score.analysis.atsScore}
          </span>
        </div>
        <p className="text-xl text-gray-800 max-w-md text-center font-medium">
          {getFeedback(score.analysis.atsScore)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-green-800 mb-4">
            <CheckCircle className="w-5 h-5 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {score.analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-green-900">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-amber-800 mb-4">
            <AlertCircle className="w-5 h-5 mr-2" />
            Suggested Improvements
          </h3>
          <ul className="space-y-3">
            {score.analysis.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span className="text-amber-900">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;