import {useState} from "react";
import "./Navbar_styles.css"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navBar-container">
      <div className={`hamburguer ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="lines"></span>
        <span className="lines"></span>
        <span className="lines"></span>
      </div>
      
      {isOpen && (
        <div className="menu">
          <a href="#historial">Historial</a>
          <a href="#settings">Settings</a>
        </div>
      )}
    </nav>
  );
}