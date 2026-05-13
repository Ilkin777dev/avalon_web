import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

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
      try {
        const docRef = doc(db, "posts", id);

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setProject(snapshot.data());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div>
        <Header />

        <div className="projectWrapper">
          <h1>Loading...</h1>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="projectWrapper">
        {/* TITLE */}
        <h1 className="projectTitle">
          {project.title}
        </h1>

        {/* PREVIEW IMAGE */}
        <img
          className="mainProjectImage"
          src={project.imageUrl}
          alt={project.title}
        />

        {/* CONTENT */}
        <div
          className="projectContent"
          dangerouslySetInnerHTML={{
            __html: project.content,
          }}
        />

        {/* GALLERY */}
        {project.images &&
          project.images.length > 0 && (
            <div className="projectGallery">
              {project.images.map(
                (image, index) => (
                  <motion.div
  className="galleryItem"
  key={index}
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
    delay: index * 0.1,
  }}
>
                    <img
                      src={image}
                      alt={`project-${index}`}
                    />
                  </motion.div>
                )
              )}
            </div>
          )}
      </div>

      <ContactUs />
      <MediaLinks />
      <Footer />
    </div>
  );
}