import { useState } from "react";
import Logo from "../assets/LogoNew.svg";
import "../components/header.css";
import BlueButton from "./BlueButton";
import { HashLink } from "react-router-hash-link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="header_wrapper">
        <div className="header">

          <div className="header_left_side">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>

          <div className="header_right_side">
            <ul className="header_right_side_ul">
              <li>
                <HashLink smooth to="/#aboutUs">
                  About Us
                </HashLink>
              </li>
              <li className="dropdown">
                <a href="#">Services</a>

                <ul className="dropdownMenu">
                  <li><a href="/brokerage">Brokerage</a></li>
                  <li><a href="/sell">Sell Your Property</a></li>
                  <li><a href="/appartments">Rentals</a></li>
                </ul>
              </li>
              <li><a href="/projects/">Projects</a></li>
              <li><a href="/blog/">Press</a></li>
              <li><a href="/careers/">Careers</a></li>
              <li><BlueButton linkText="#contactUs" linkDesc="Contact Us" /></li>
            </ul>
          </div>

        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mobile_header_wrapper">

        <div className="mobile_header_left">
          <a href="/">
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
            <li><a href="#"><HashLink smooth to="/#aboutUs">
              About Us
            </HashLink></a></li>
            <li><a href="/brokerage">Brokerage</a></li>
            <li><a href="/sell">Sell Your Property</a></li>
            <li><a href="/appartments">Rentals</a></li>
            <li><a href="/projects/">Projects</a></li>
            <li><a href="/blog/">Press</a></li>
            <li><a href="/careers/">Careers</a></li>
            <li><BlueButton linkText="/contact/" linkDesc="Contact Us" /></li>
          </ul>

        </div>
      </div>
    </>
  );
}