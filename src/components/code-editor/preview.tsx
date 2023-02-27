import { useEffect, useRef } from "react";
interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  const html = `
        <html>
            <head></head>
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
  return (
    <div>
      <iframe
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
