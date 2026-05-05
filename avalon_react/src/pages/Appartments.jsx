// src/pages/Apartments.jsx
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import Header from "../components/Header"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import "./appartments.css"

export default function Appartments() {
  const [apartments, setApartments] = useState([])

  const fetchApartments = async () => {
    const snapshot = await getDocs(collection(db, "posts"))

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // 👇 фильтрация
    const filtered = data.filter(item => item.type === "apartment")

    setApartments(filtered)
  }

  useEffect(() => {
    fetchApartments()
  }, [])

  return (
    <div>
      <Header />
      <div className="appartmentsWrapper">
        <h1>Apartments</h1>
        <div className="appartments">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 20
          }}>
            {apartments.map(ap => (
              <div
                className="appartmentCard"
                key={ap.id}
              >
                <img
                  src={ap.imageUrl}
                  alt={ap.title}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />

                <div className="appartmentCardDesc">
                  <h3>{ap.title}</h3>

                  <p><b>Price :</b> {ap.price}$</p>
                  <p><b>Description :</b> {ap.content}</p>
                  <p><b>Rooms :</b> {ap.rooms}</p>
                  <p><b>Address :</b> {ap.location}</p>
                  <p><b>Rooms number :</b> {ap.rooms}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </div>
  )
}