import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";
import "./Careers.css";

export default function Careers() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "posts"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔥 только вакансии
      const filtered = data.filter((item) => item.type === "job");

      setJobs(filtered);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Header />

      <div className="careersWrapper">
        <h1>Careers</h1>

        {/* 📦 вакансии */}
        <div className="jobsGrid">
          {jobs.map((job) => (
            <div className="jobCard" key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.content}</p>

              {/* 👇 якорь на форму */}
              <a href="#apply">Apply</a>
            </div>
          ))}
        </div>

        {/* 📩 форма */}
        <div className="applySection" id="apply">
          <h2>Apply Now</h2>

          <form
            action="https://formspree.io/f/YOUR_ID"
            method="POST"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <input
              type="file"
              name="cv"
              required
            />

            <button type="submit">Send CV</button>
          </form>
        </div>
      </div>
      <ContactUs />
      <MediaLinks />
      <Footer />
    </div>
  );
}