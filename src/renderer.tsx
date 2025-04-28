import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
