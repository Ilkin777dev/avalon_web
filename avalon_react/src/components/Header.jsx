import { useState } from "react";
import Logo from "../assets/LogoNew.svg";
import "../components/header.css";
import BlueButton from "./BlueButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="header_wrapper">
        <div className="header">

          <div className="header_left_side">
            <a href="#">
              <img src={Logo} alt="" />
            </a>
          </div>

          <div className="header_right_side">
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Appartments</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><BlueButton /></li>
            </ul>
          </div>

        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mobile_header_wrapper">

        <div className="mobile_header_left">
          <a href="#">
            <img src={Logo} alt="" />
          </a>
        </div>

        <div className="mobile_header_right">

          <div
            id="nav-icon1"
            className={menuOpen ? "open" : ""}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile_menu_wrapper ${menuOpen ? "active" : ""}`}>
        <div className="mobile_menu">

          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Appartments</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><BlueButton /></li>
          </ul>

        </div>
      </div>
    </>
  );
}