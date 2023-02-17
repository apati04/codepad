import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { Button, TextField } from '@material-ui/core';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
    const ref = useRef<any>();
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
        console.log("result", result);
        setCode(result.outputFiles[0].text);
    };
    return (
        <div>
            <div style={{ width: '600px' }}>
                <TextField
                    minRows={"3"}
                    multiline
                    fullWidth
                    variant="outlined"
                    onKeyDownCapture={({ ctrlKey, key = '' }) => {
                        if (ctrlKey && key.toLowerCase() === 'enter') {
                            handleSubmit()
                        }
                    }}
                    maxRows={"7"}
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
            </div>


            <div>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </div>
            <pre>{code}</pre>
            <iframe src="test.html" />
        </div>
    );
};

export default App
