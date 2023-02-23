import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css'
const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(<App />);
