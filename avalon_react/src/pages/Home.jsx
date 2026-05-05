import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Header from "../components/Header";
import HeroScreen from "../components/HeroScreen";
import WhatWeOffer from "../components/WhatWeOffer";
import AboutUs from "../components/AboutUs";
import OurTeam from "../components/OurTeam";
import BlueButton from "../components/BlueButton";
import ContTextTransBut from "../components/ContTextTransBut";
import ContTextBlueBut from "../components/ContTextBlueBut";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";
import CareersImage from "../assets/Careers/careers_image.png";
import "../App.css";

export default function Home() {
  const [apartments, setApartments] = useState([]);

  const fetchLatest = async () => {
    const snapshot = await getDocs(collection(db, "posts"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const latest = data
      .filter((item) => item.type === "apartment")
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3);

    setApartments(latest);
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <div className="blogSectionWrapper">
      <div className="blogSection">
        <Header />
        <HeroScreen />
        <WhatWeOffer />

        {/* Pluses Section */}
        <div className="pluses_wrapper">
          <div className="pluses">
            <div className="pluses_card">
              <div className="pluses_title">
                <h2>1.5 m²</h2>
              </div>
              <div className="pluses_text">
                <h3>
                  COMPLETED AND <br /> UNDER DEVELOPMENT
                </h3>
              </div>
            </div>
            <div className="pluses_card">
              <div className="pluses_title">
                <h2>1000+</h2>
              </div>
              <div className="pluses_text">
                <h3>UNITS</h3>
              </div>
            </div>
            <div className="pluses_card">
              <div className="pluses_title">
                <h2>100+</h2>
              </div>
              <div className="pluses_text">
                <h3>SATISFIED CLIENTS</h3>
              </div>
            </div>
          </div>
        </div>

        <AboutUs />
        <OurTeam />

        {/* 🔥 NEW: Apartments Section */}
        <div className="mainAppartWrapper">
          <div className="mainAppart">
            <h2>LATEST APARTMENTS</h2>

            <div
              className="rowAppart"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 20,
              }}
            >
              {apartments.map((ap) => (
                <div
                  key={ap.id}
                  style={{
                    border: "1px solid #18181B",
                    padding: 20,
                    overflow: "hidden",
                  }}
                >
                  <img
                    className="mainAppartCardImg"
                    src={ap.imageUrl}
                    alt={ap.title}
                  />

                  <div className="mainAppartCardCont">
                    <h3>{ap.title}</h3>
                    <div className="mainAppartCardDesc">
                        <p>{ap.content}</p>
                    </div>
                    <div className="mainAppartCardAdv">
                        <p>{ap.rooms} rooms</p>
                        <p>{ap.price}</p>
                        <p>{ap.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mainAppartButt">
              <BlueButton linkText="/appartments/" linkDesc="View More" />
            </div>
          </div>
        </div>

        {/* Main Page Blog Section */}

        <div className="mainBlogSection">
          <div className="mainBlog">
            <div className="mainBlogCont">
              <h2>SHAPING THE FUTURE: INSIGHTS FROM THE AVALON DEVELOPMENT TEAM</h2>
              <p>
                Welcome to the official Avalon blog. In the world of development, the only constant is change. From the first line of code (or the first brick laid) to the final deployment, every project is a journey of turning abstract ideas into functional realities.
                <br />
                <br />
                This space is dedicated to sharing that journey with you—offering a look under the hood of our latest projects, our thoughts on emerging technologies, and the strategies we use to build for the long term.
                </p>
                <BlueButton linkText="/blog/" linkDesc="OUR BLOG" />
            </div>
          </div>
        </div>

        {/* Carrers Section */}
        <div className="careersSectionWrapper">
          <div className="careersSection">
            <h2>CAREERS</h2>
            <div className="careersSectionCont">
              <div className="careersLeft">
                <img src={CareersImage} alt="Careers" />
              </div>
              <div className="careersRight">
                <ContTextBlueBut title="JOIN THE ARCHITECTS OF GLOBAL COMMERCE" text="Careers at Avalon are defined by a commitment to operational excellence and technical innovation. We foster a culture of integrity and high-performance, offering our professionals the tools to solve the most demanding industrial challenges. If you are driven by results and ready to execute projects on a global scale, your next chapter starts here." link="/careers" textLink="Learn More" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <ContactUs />

        {/* Media Links Section */}
        <MediaLinks />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
