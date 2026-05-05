import { FaEnvelope, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa"
import "./mediaLinks.css"

export default function MediaLinks() {
  return (
    <div className="media_links_wrapper">
      <div className="media_links_row">

        {/* EMAIL */}
        <a href="mailto:info@avalon.com">
          <div className="media_link_card">
            <div className="media_link_card_left">
              <FaEnvelope size={24} color="#0F2A45" />
            </div>
            <div className="media_link_card_right">
              <p>E-mail:</p>
              <p><b>info@avalon.com</b></p>
            </div>
          </div>
        </a>

        {/* PHONE */}
        <a href="tel:+123456789">
          <div className="media_link_card">
            <div className="media_link_card_left">
              <FaPhone size={24} color="#0F2A45" />
            </div>
            <div className="media_link_card_right">
              <p>Phone:</p>
              <p><b>+123 456 789</b></p>
            </div>
          </div>
        </a>

        {/* FACEBOOK */}
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <div className="media_link_card">
            <div className="media_link_card_left">
              <FaFacebook size={24} color="#0F2A45" />
            </div>
            <div className="media_link_card_right">
              <p>Facebook:</p>
              <p><b>avalon</b></p>
            </div>
          </div>
        </a>

        {/* INSTAGRAM */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <div className="media_link_card">
            <div className="media_link_card_left">
              <FaInstagram size={24} color="#0F2A45" />
            </div>
            <div className="media_link_card_right">
              <p>Instagram:</p>
              <p><b>@avalon</b></p>
            </div>
          </div>
        </a>

      </div>
    </div>
  )
}