import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";
import "./Sell.css";
import { useState } from "react";

export default function Sell() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form); // потом подключим отправку

    alert("Request sent!");
  };

  return (
    <div>
      <Header />

      <div className="sell_wrapper">

        {/* HERO */}
        <div className="sell_hero">
          <h1>Sell Your Property</h1>
          <p>
            We help you sell your property quickly and at the best market price.
          </p>
        </div>

        {/* FORM */}
        <div className="sell_form_wrapper">
          <h2>Submit Your Property</h2>

          <form onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input
              name="type"
              placeholder="Property Type (Apartment, Villa...)"
              onChange={handleChange}
            />

            <input
              name="price"
              placeholder="Expected Price"
              onChange={handleChange}
            />

            <button type="submit">Send Request</button>

          </form>
        </div>

      </div>

        {/* <ContactUs /> */}
        <MediaLinks />
        <Footer />
    </div>
  );
}