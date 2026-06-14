import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <h1 className="page-title">Access denied. Admin only.</h1>;
  }

  return children;
}

export default AdminRoute;