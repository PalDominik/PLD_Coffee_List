import type { Role } from "../../Types/Type";

interface NavbarProps {
  role: Role;
  onChange: (role: Role) => void;
}

const pages: { key: Role; label: string }[] = [
  { key: "user", label: "User" },
  { key: "moderator", label: "Moderator" },
  { key: "admin", label: "Admin" },
];

export default function Navbar({ role, onChange }: NavbarProps) {
  return (
    <nav className="navbar shadow-sm" style={{ backgroundColor: "#7B3306" }}>
      <div className="container-fluid">
        <span className="navbar-brand text-light fw-bold">☕ Coffee Manager</span>
        <div className="d-flex gap-2">
          {pages.map((p) => (
            <button
              key={p.key}
              className={`btn btn-sm ${role === p.key ? "btn-light" : "btn-outline-light"}`}
              onClick={() => onChange(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}