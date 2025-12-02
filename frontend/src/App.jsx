import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DeliveryForm from "./pages/DeliveryForm";
import EcoMatch from "./pages/EcoMatch";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import MapView from "./pages/MapView";
import ProtectedRoute from "./components/ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on Login page
  const hideNavbar = location.pathname === "/login" || location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/delivery" 
          element={
            <ProtectedRoute>
              <DeliveryForm />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/eco-match" 
          element={
            <ProtectedRoute>
              <EcoMatch />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
