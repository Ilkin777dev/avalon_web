import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import ReactCompareImage from "react-compare-image";

import { db } from "../firebase";

import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

import "./ApartmentPage.css";

export default function ApartmentPage() {
  const { id } = useParams();

  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      const docRef = doc(db, "posts", id);

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setApartment(snapshot.data());
      }
    };

    fetchApartment();
  }, [id]);

  if (!apartment) return <p>Loading...</p>;

  return (
    <div>
      <Header />

      <div className="apartmentPageWrapper">

        <h1>{apartment.title}</h1>

        {/* BEFORE AFTER */}
        {apartment.beforeImage && apartment.afterImage && (
          <div className="compareWrapper">
            <ReactCompareImage
              leftImage={apartment.beforeImage}
              rightImage={apartment.afterImage}
            />
          </div>
        )}

        {/* INFO */}
        <div className="apartmentInfo">
          <p><b>Price:</b> {apartment.price}$</p>
          <p><b>Location:</b> {apartment.location}</p>
          <p><b>Rooms:</b> {apartment.rooms}</p>
        </div>

        {/* CONTENT */}
        <div
          className="apartmentContent"
          dangerouslySetInnerHTML={{
            __html: apartment.content,
          }}
        />

        {/* GALLERY */}
        {apartment.images?.length > 0 && (
          <div className="apartmentGallery">
            {apartment.images.map((img, index) => (
              <img key={index} src={img} alt="" />
            ))}
          </div>
        )}

        {/* MORE BUTTON */}
        {apartment.moreLink && (
          <a
            href={apartment.moreLink}
            target="_blank"
            rel="noreferrer"
            className="moreBtn"
          >
            More →
          </a>
        )}

      </div>

      <ContactUs />
      <Footer />
    </div>
  );
}