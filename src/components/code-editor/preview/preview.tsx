import "./preview.css";
import { useEffect, useRef } from "react";
interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  const html = `
        <html>
            <head>
              <style>
                html {
                  background-color: white;
                }
              </style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (e) => { 
                        try {
                            eval(e.data)
                        } catch (err) {
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>'
                            console.error(err)
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code, html]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ background: "white" }}
        width="100%"
        height="100%"
        title="code-editor"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
