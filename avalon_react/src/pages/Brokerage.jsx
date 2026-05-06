import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";
import "./Brokerage.css";

// 🔥 иконки
import { FaHome, FaDollarSign, FaChartLine } from "react-icons/fa";

export default function Brokerage() {
  return (
    <div>
      <Header />

      <div className="brokerage_wrapper">

        {/* HERO */}
        <div className="brokerage_hero">
          <h1>Brokerage Services</h1>
          <p>
            We provide full-cycle real estate brokerage services, helping you
            buy, sell, and invest in premium properties with confidence.
          </p>
        </div>

        {/* SERVICES */}
        <div className="brokerage_services">
          <h2>What We Do</h2>

          <div className="services_grid">

            <div className="service_card">
              <div className="icon">
                <FaHome />
              </div>
              <h3>Property Buying</h3>
              <p>We help you find the perfect property based on your needs.</p>
            </div>

            <div className="service_card">
              <div className="icon">
                <FaDollarSign />
              </div>
              <h3>Property Selling</h3>
              <p>Maximize your property's value with our expert strategy.</p>
            </div>

            <div className="service_card">
              <div className="icon">
                <FaChartLine />
              </div>
              <h3>Investment Consulting</h3>
              <p>Smart real estate investments tailored to your goals.</p>
            </div>

          </div>
        </div>

        {/* ADVANTAGES */}
        <div className="brokerage_advantages">
          <h2>Why Choose Us</h2>

          <ul>
            <li>✔ Experienced real estate professionals</li>
            <li>✔ Personalized approach</li>
            <li>✔ Market insights & analytics</li>
            <li>✔ Trusted by hundreds of clients</li>
          </ul>
        </div>

        {/* Contact Us Form */}
        <ContactUs />
        <MediaLinks />
        <Footer />

      </div>
    </div>
  );
}