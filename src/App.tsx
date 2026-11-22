import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import UserPage from "./components/Pages/UserPage";
import ModeratorPage from "./components/Pages/ModeratorPage";
import AdminPage from "./components/Pages/AdminPage";


function App() {
  const [page, setPage] = useState("user");

  return (
    <>
      <nav className="navbar px-3" style={{ backgroundColor: "#7B3306" }}>
        <span className="navbar-brand text-light">☕ Kávé Lista Manager 4000</span>
        <div>
          <button
            className={page === "user" ? "btn btn-light me-2" : "btn btn-outline-light me-2"}
            onClick={() => setPage("user")}
          >
            Felhasználó
          </button>
          <button
            className={page === "moderator" ? "btn btn-light me-2" : "btn btn-outline-light me-2"}
            onClick={() => setPage("moderator")}
          >
            Moderátor
          </button>
          <button
            className={page === "admin" ? "btn btn-light" : "btn btn-outline-light"}
            onClick={() => setPage("admin")}
          >
            Admin
          </button>
        </div>
      </nav>

      <div className="container-fluid p-3">
        {page === "user" && <UserPage />}
        {page === "moderator" && <ModeratorPage />}
        {page === "admin" && <AdminPage />}
      </div>
    </>
  );
}

export default App;