import Logo from "../assets/LogoNew.svg";
import "./Footer.css"

export default function Footer() {
    return (
        <>
            <div class="footer_wrapper">
                <div class="footer">
                    <div class="footer_left">
                        <a href="#"><img src={Logo} alt="Avalon Logo" /></a>
                    </div>
                    <div class="footer_right">
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="/apartments">Appartments</a></li>
                            <li><a href="#">Projects</a></li>
                            <li><a href="/blog/">Blog</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="copywrite_section">
                <p>
                    © 2026 Avalon Management Group. All rights reserved
                </p>
            </div>
        </>
    )
}