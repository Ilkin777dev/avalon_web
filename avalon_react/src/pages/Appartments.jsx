// Apartments.jsx

import ReactCompareImage from "react-compare-image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

import "./appartments.css";

export default function Appartments() {

  const [apartments, setApartments] = useState([]);

  const fetchApartments = async () => {

    const snapshot = await getDocs(collection(db, "posts"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filtered = data.filter(
      (item) => item.type === "apartment"
    );

    setApartments(filtered);

  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div>

      <Header />

      <div className="appartmentsWrapper">

        <h1>Apartments</h1>

        <div className="appartments">

          {apartments.map((ap) => (

            <div
              className="appartmentCard"
              key={ap.id}
            >

              {/* BEFORE AFTER */}

              <div className="appartmentMedia">
  {ap.beforeImages?.[0] && ap.afterImages?.[0] ? (
    <ReactCompareImage
      leftImage={ap.previewBefore}
      rightImage={ap.previewAfter}
    />
  ) : (
    <img
      src={ap.imageUrl}
      alt={ap.title}
    />
  )}
</div>

              {/* INFO */}

              <div className="appartmentCardDesc">

                <h3>{ap.title}</h3>

                {ap.price && (
                  <p>
                    <b>Price:</b> {ap.price}$
                  </p>
                )}

                {ap.content && (
                  <p>
                    <b>Description:</b> {ap.content}
                  </p>
                )}

                {ap.rooms && (
                  <p>
                    <b>Rooms:</b> {ap.rooms}
                  </p>
                )}

                {ap.location && (
                  <p>
                    <b>Address:</b> {ap.location}
                  </p>
                )}

                <Link
                  to={`/apartment/${ap.id}`}
                  className="moreBtn"
                >
                  View Apartment
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ContactUs />
      <Footer />

    </div>
  );
}