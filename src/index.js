import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)


// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );
