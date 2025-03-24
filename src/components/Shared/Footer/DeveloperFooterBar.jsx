import React from "react";

const DeveloperFooterBar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        background: "#1f2022",
        fontWeight: "500",
        fontSize: "14px",
      }}
    >
      <p style={{ color: "#fff" }}>
        Created by{" "}
        <a
          href="https://www.trysoft.in"
          style={{ color: "#fff" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          TrySoft
        </a>{" "}
        and{" "}
        <a
          href="https://www.gitnexa.com"
          style={{ color: "#fff" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitNexa
        </a>
      </p>
    </div>
  );
};

export default DeveloperFooterBar;
