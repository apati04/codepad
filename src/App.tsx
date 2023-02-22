import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const handleSubmit = async () => {
        if (!ref.current) {
            return;
        }
        iframe.current.srcdoc = html;
        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });
        // setCode(result.outputFiles[0].text);
        const { text } = result.outputFiles[0]
        iframe.current.contentWindow.postMessage(text, '*')
    };
    // const htmlSrc = 'http://jbook.localhost:3000/test.html'
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
    `
    return (
        <div style={{ padding: 48, }}>
            <div id="codeEditor-One-Container" style={{ width: '600px', height: '100%', padding: 20 }}>
                <TextareaAutosize
                    minRows={"20"}
                    style={{ width: '100%' }}
                    id="codeEditor-One"
                    onKeyDownCapture={({ ctrlKey, key = '' }) => {
                        if (ctrlKey && key.toLowerCase() === 'enter') {
                            handleSubmit()
                        }
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <div>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>
                </div>
                <div>
                    <pre>{code}</pre>
                </div>
            </div>
            <div style={{ width: '600px', padding: 20, height: 'auto' }}>
                <iframe width="100%" height="100%" title="code-editor" ref={iframe} sandbox="allow-scripts" srcDoc={html}></iframe>
            </div>
        </div>
    );
};

export default App
