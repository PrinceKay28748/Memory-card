import { useState } from "react";
import FrontPage from "./frontpage";
import "./App.css";

export default function App() {
  const [showFrontPage, setShowFrontPage] = useState(true);

  return (
    <div>
      {showFrontPage && <FrontPage />}
        
    </div>
  );
}