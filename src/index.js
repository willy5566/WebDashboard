import React from "react";
import ReactDOM from "react-dom/client";
import DashboardApp from "./dashboard/DashboardApp";
import "normalize.css"
import "./style.css";


function App() {
    return (
        <DashboardApp />
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);