import { useState } from "react"
import "./contactUs.css"

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Form data:", form)

    alert("Message sent!")

    setForm({
      name: "",
      surname: "",
      email: "",
      phone: ""
    })
  }

  return (
    <div className="contact_us_section_wrapper" id="contactUs">
      
      <div className="sec_title">
        <h3>CONTACT US</h3>
      </div>

      <div className="contact_us_section">

        {/* MAP */}
        <div className="contact_us_map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.234267156237!2d-74.75516686915195!3d40.24500556128509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c15841e71ce58d%3A0xe4143880d1540bee!2zOTkwIFNwcnVjZSBTdCAjMTAxLCBMYXdyZW5jZSBUb3duc2hpcCwgTkogMDg2NDgsINCh0KjQkA!5e0!3m2!1sru!2saz!4v1777386221084!5m2!1sru!2saz"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>

        {/* FORM */}
        <div className="contact_us_form_wrapper">
          <form onSubmit={handleSubmit}>

            <h2>Countact Us</h2>
            <p>Questions? Comments? We’re here to help. Send us a message and we’ll be in touch shortly.</p>

            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="surname"
              placeholder="Surname..."
              value={form.surname}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail..."
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number..."
              value={form.phone}
              onChange={handleChange}
            />

            <textarea placeholder="Your message . . ." rows="5" cols="33">
            </textarea>

            <button type="submit">SEND</button>

          </form>
        </div>

      </div>
    </div>
  )
}