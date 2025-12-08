export interface SlideProps {
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
  onLog: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void;
}

export enum CodeLanguage {
  PYTHON = 'python',
  JSON = 'json',
  JAVASCRIPT = 'javascript'
}

export interface CodeBlockProps {
  code: string;
  language: CodeLanguage;
  title?: string;
  highlightLines?: number[];
}

export interface TerminalLog {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}