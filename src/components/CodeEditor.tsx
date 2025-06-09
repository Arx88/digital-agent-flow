
import React from 'react';

interface CodeEditorProps {
  file: string;
  language: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  file, 
  language, 
  readOnly = false 
}) => {
  const cssCode = `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header and Navigation */
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #667eea;
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s both;
}`;

  return (
    <div className="h-full bg-gray-900 text-white font-mono text-sm overflow-auto">
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-2">
          {readOnly ? 'Viewing' : 'Editing'} {file}
        </div>
        <pre className="whitespace-pre-wrap">
          <code className="text-gray-300 leading-relaxed">
            {cssCode.split('\n').map((line, index) => (
              <div 
                key={index} 
                className={`flex ${index >= 19 && index <= 21 ? 'bg-blue-900/30' : ''}`}
              >
                <span className="text-gray-500 w-8 text-right mr-4 select-none">
                  {index + 1}
                </span>
                <span className="flex-1">
                  {line.split('').map((char, charIndex) => (
                    <span 
                      key={charIndex}
                      className={
                        char === '{' || char === '}' ? 'text-yellow-400' :
                        char === ':' || char === ';' ? 'text-red-400' :
                        /[#.]/.test(char) ? 'text-green-400' :
                        /[0-9]/.test(char) ? 'text-blue-400' :
                        line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('*/') ? 'text-gray-500' :
                        'text-gray-300'
                      }
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
