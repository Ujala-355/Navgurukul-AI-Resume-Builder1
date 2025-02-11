import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';

interface EnhancedResumePageProps {
  enhancedContent: string;
}

const EnhancedResumePage: React.FC<EnhancedResumePageProps> = ({ enhancedContent }) => {
  const [sections, setSections] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const parseContent = (text: string) => {
      // Remove the "Improved Resume Text:" prefix and clean up extra newlines
      const cleanText = text
        .replace('Improved Resume Text:', '')
        .trim()
        .replace(/\n{3,}/g, '\n\n');

      // Split into sections more reliably
      const sections: { [key: string]: string[] } = {};
      const sectionMatches = cleanText.matchAll(/(?:^|\n)([A-Za-z\s]+):\s*\n((?:(?!\n[A-Za-z\s]+:).|\n)*)/g);

      for (const match of sectionMatches) {
        const [, title, content] = match;
        const sectionTitle = title.trim();
        
        // Process content based on section type
        let lines = content
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);

        // Special handling for Experience section
        if (sectionTitle === 'Experience') {
          const processedLines: string[] = [];
          let currentEntry = '';
          
          lines.forEach(line => {
            if (line.includes('|') || /^\d{4}/.test(line)) {
              if (currentEntry) {
                processedLines.push(currentEntry.trim());
              }
              currentEntry = line;
            } else {
              currentEntry += '\n' + line;
            }
          });
          
          if (currentEntry) {
            processedLines.push(currentEntry.trim());
          }
          
          lines = processedLines;
        }

        sections[sectionTitle] = lines;
      }

      return sections;
    };

    setSections(parseContent(enhancedContent));
  }, [enhancedContent]);

  const handleContentChange = (section: string, index: number, newValue: string) => {
    setSections(prev => {
      const updatedSections = { ...prev };
      updatedSections[section][index] = newValue;
      return updatedSections;
    });
  };

  const renderSection = (title: string, lines: string[]) => {
    switch(title) {
      case 'Contact Information':
        return (
          <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
            {lines.map((line, index) => {
              const [key, value] = line.split(': ').map(part => part.trim());
              const Icon = {
                'Email': Mail,
                'Phone': Phone,
                'GitHub': Github,
                'LinkedIn': Linkedin,
                'Location': MapPin
              }[key] as React.ElementType;
              
              return (
                <div key={index} className="flex items-center">
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none hover:bg-gray-50 p-1 rounded"
                    onBlur={(e) => handleContentChange(title, index, `${key}: ${e.target.textContent}`)}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case 'Experience':
        return (
          <div className="space-y-6">
            {lines.map((line, index) => {
              const parts = line.split('\n');
              const header = parts[0];
              const details = parts.slice(1);
              
              return (
                <div key={index} className="mb-6">
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="font-bold text-lg text-gray-800 mb-2"
                    onBlur={(e) => {
                      const newValue = e.target.textContent + '\n' + details.join('\n');
                      handleContentChange(title, index, newValue);
                    }}
                  >
                    {header}
                  </div>
                  {details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      contentEditable
                      suppressContentEditableWarning
                      className="text-gray-700 outline-none hover:bg-gray-50 p-2 rounded whitespace-pre-wrap pl-6"
                      onBlur={(e) => {
                        const newDetails = [...details];
                        newDetails[detailIndex] = e.target.textContent || '';
                        const newValue = header + '\n' + newDetails.join('\n');
                        handleContentChange(title, index, newValue);
                      }}
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );

      case 'Skills':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lines.map((line, index) => (
              <div
                key={index}
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700 outline-none hover:bg-gray-50 p-2 rounded-lg bg-gray-50"
                onBlur={(e) => handleContentChange(title, index, e.target.textContent || '')}
              >
                {line}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            {lines.map((line, index) => (
              <div
                key={index}
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700 outline-none hover:bg-gray-50 p-2 rounded whitespace-pre-wrap"
                onBlur={(e) => handleContentChange(title, index, e.target.textContent || '')}
              >
                {line}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="max-w-[850px] mx-auto bg-white min-h-screen p-8 shadow-lg">
      {Object.entries(sections).map(([title, lines]) => (
        <div key={title} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            {title}
          </h2>
          {renderSection(title, lines)}
        </div>
      ))}
    </div>
  );
};

export default EnhancedResumePage;