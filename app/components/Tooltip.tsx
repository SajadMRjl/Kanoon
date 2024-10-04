import React, { useState } from "react";
import "./Tooltip.css";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(!visible)}
      style={{
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {children}
      {visible && <div className="tooltip-box">{content}</div>}
    </div>
  );
};

export default Tooltip;
