import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.detail || "Invalid email or password");

    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated floating shapes */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>🌱 GreenRoute AI</h1>
        <p style={styles.subtitle}>Eco-Smart Logistics Optimization</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;

/* ---------- ULTRA PREMIUM STYLES ---------- */

const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #0f766e, #064e3b, #0f766e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },

  /* Animated Floating Blobs */
  shape1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.15)",
    top: "-50px",
    left: "-50px",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "float 6s ease-in-out infinite",
  },

  shape2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(255,255,255,0.10)",
    bottom: "-80px",
    right: "-80px",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "float 7s ease-in-out infinite",
  },

  card: {
    width: "380px",
    padding: "45px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.20)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
    textAlign: "center",
    zIndex: 10,
    animation: "fadeIn 1s ease",
  },

  title: {
    fontSize: "32px",
    color: "white",
    fontWeight: 700,
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#e5e7eb",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
  padding: "13px 15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
  background: "rgba(255,255,255,0.35)",
  color: "#ffffff",
  backdropFilter: "blur(10px)",
  transition: "0.2s",
  caretColor: "white",
  "::placeholder": {
    color: "rgba(255,255,255,0.85)",
  }
},


  button: {
    marginTop: "10px",
    padding: "13px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    color: "#064e3b",
    background: "white",
    boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },

  error: {
  marginTop: "15px",
  padding: "12px 15px",
  borderRadius: "10px",
  background: "rgba(255, 77, 77, 0.25)",  // brighter red
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textAlign: "center",
  border: "1px solid rgba(255, 77, 77, 0.6)",
  backdropFilter: "blur(6px)",
  animation: "fadeIn 0.4s ease",
  boxShadow: "0 2px 10px rgba(255,0,0,0.4)",
  },
};

// Add global animation styles
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Inject animation into document only once
if (!document.getElementById("login-animations")) {
  const styleTag = document.createElement("style");
  styleTag.id = "login-animations";
  styleTag.innerHTML = globalStyles;
  document.head.appendChild(styleTag);
}