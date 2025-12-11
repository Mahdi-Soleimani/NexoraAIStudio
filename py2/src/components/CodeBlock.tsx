import { useEffect, useRef, useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

const CodeBlock = ({ code, language = 'Python', showLineNumbers = true }: CodeBlockProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const codeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (codeRef.current) {
            observer.observe(codeRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const highlightCode = (code: string) => {
        return code
            .replace(/\b(if|else|elif|for|in|def|return|print|import|from|class|while|break|continue)\b/g, '<span class="keyword">$1</span>')
            .replace(/(['"])(.*?)\1/g, '<span class="string">$1$2$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
            .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');
    };

    const lines = code.split('\n');

    return (
        <div
            ref={codeRef}
            className={`code-block ${isVisible ? 'animate-fadeIn' : ''}`}
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div className="code-header">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
            </div>
            {/* Language Label */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600
            }}>
                {language}
            </div>
            <pre>
                <code>
                    {showLineNumbers ? (
                        lines.map((line, index) => (
                            <div key={index} style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                <span style={{
                                    color: 'var(--text-muted)',
                                    userSelect: 'none',
                                    minWidth: '2em',
                                    textAlign: 'right'
                                }}>
                                    {index + 1}
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
                            </div>
                        ))
                    ) : (
                        <span dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
                    )}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
