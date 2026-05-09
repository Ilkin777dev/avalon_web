import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import "./ProjectPage.css";

import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "posts", id);

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setProject(snapshot.data());
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <Header />

      <div className="projectWrapper">
        <h1>{project.title}</h1>

        {/* ГЛАВНАЯ ФОТКА */}
        <img
          className="mainProjectImage"
          src={project.imageUrl}
          alt=""
        />

        {/* HTML CONTENT */}
        <div
          className="projectContent"
          dangerouslySetInnerHTML={{
            __html: project.content,
          }}
        ></div>

        {/* ГАЛЕРЕЯ */}
        {project.images && (
          <div className="projectGallery">
            {project.images.map((image, index) => (
              <img key={index} src={image} alt="" />
            ))}
          </div>
        )}
      </div>

      <ContactUs />
      <MediaLinks />
      <Footer />
    </div>
  );
}