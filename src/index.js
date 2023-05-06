import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// Create a new root using the ReactDOM.createRoot function
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app using the root's render method
root.render(
  // Wrap the App component in a React.StrictMode component
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
