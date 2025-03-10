import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Make sure to install with: npm install animate.css

const Intro = ({ onStart }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100 text-white position-relative"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient Background
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)", // Soft Glow Effect
        overflow: "hidden",
      }}
    >
      {/* Floating Heading */}
      <h1
        className="display-2 fw-bold mb-3 animate__animated animate__fadeInDown"
        style={{
          textShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        To-Do List
      </h1>

      {/* Subtext */}
      <p className="lead text-center animate__animated animate__fadeInUp">
        Stay organized, track tasks, and boost your productivity!
      </p>

      {/* Glassmorphic Button */}
      <button
        className="btn btn-lg fw-semibold shadow-lg animate__animated animate__zoomIn"
        onClick={onStart}
        style={{
          background: "rgba(255, 255, 255, 0.2)", // Glass Effect
          border: "none",
          borderRadius: "50px",
          padding: "12px 30px",
          color: "white",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.4)")}
        onMouseOut={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
      >
         Get Started
      </button>

      {/* Footer */}
      <div className="position-absolute bottom-0 mb-3">
        <p className="small text-light opacity-75">
          Designed with ❤️ to keep you on track!
        </p>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Intro;
