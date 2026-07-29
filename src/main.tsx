import React, { Component, ErrorInfo, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", background: "#FBF6EE", color: "#1F3329", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem", color: "#1F3329" }}>KS Beauty</h1>
          <p style={{ fontSize: "1.1rem", color: "#7A2E38", fontWeight: 600, marginBottom: "1rem" }}>
            Error: {this.state.error?.message || "Unknown rendering exception"}
          </p>
          <pre style={{ textAlign: "left", background: "#1F3329", color: "#FBF6EE", padding: "1rem", borderRadius: "12px", fontSize: "12px", maxWidth: "90vw", overflowX: "auto", marginBottom: "1.5rem" }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{ padding: "0.75rem 1.75rem", borderRadius: "9999px", background: "#1F3329", color: "#FBF6EE", fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
