import "./preview.css";
import { useEffect, useRef } from "react";
interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
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
                const handleError = (err) => {
                  const root = document.querySelector("#root");
                  root.innerHTML =
                    '<div style="color: red"><h4>Runtime Error</h4>' + err + "</div>";
                  console.error(err);
                };
                window.addEventListener('error', (event) => {
                  event.preventDefault()
                  handleError(event.error)
                })
                window.addEventListener('message', (e) => { 
                    try {
                        eval(e.data)
                    } catch (err) {
                      handleError(err)
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
  console.log("bundling staus:,", bundlingStatus);
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
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
