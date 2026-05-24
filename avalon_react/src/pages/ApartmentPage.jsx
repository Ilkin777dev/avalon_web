// ApartmentPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

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

  if (!apartment) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <Header />

      <div className="apartmentPageWrapper">

        <h1>{apartment.title}</h1>

        {/* INFO */}

        <div className="apartmentInfo">

          {apartment.price && (
            <p>
              <b>Price:</b> {apartment.price}$
            </p>
          )}

          {apartment.location && (
            <p>
              <b>Location:</b> {apartment.location}
            </p>
          )}

          {apartment.rooms && (
            <p>
              <b>Rooms:</b> {apartment.rooms}
            </p>
          )}

        </div>

        {/* CONTENT */}

        {apartment.content && (
          <div
            className="apartmentContent"
            dangerouslySetInnerHTML={{
              __html: apartment.content,
            }}
          />
        )}

        {/* BEFORE */}

        {apartment.beforeImages?.length > 0 && (

          <>

            <h2 className="galleryTitle">
              Before
            </h2>

            <div className="apartmentGallery">

              {apartment.beforeImages.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                />

              ))}

            </div>

          </>

        )}

        {/* AFTER */}

        {apartment.afterImages?.length > 0 && (

          <>

            <h2 className="galleryTitle">
              After
            </h2>

            <div className="apartmentGallery">

              {apartment.afterImages.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                />

              ))}

            </div>

          </>

        )}

        {/* MORE */}

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