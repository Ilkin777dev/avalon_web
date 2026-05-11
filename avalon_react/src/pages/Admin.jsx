import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

import { db, auth } from "../firebase";
import Logo from "../assets/LogoNew.svg";
import "./Admin.css";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [mode, setMode] = useState("blog");

  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");

  const navigate = useNavigate();

  // 📦 GET POSTS
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ validate file
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  // 🔥 CREATE
  const createItem = async () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    if (mode !== "job" && (!previewImage || images.length === 0)) {
      alert("Upload preview and gallery");
      return;
    }

    if (mode === "apartment" && (!price || !location)) {
      alert("Fill apartment fields");
      return;
    }

    let previewImageUrl = "";
    let imageUrls = [];

    // 🔥 preview upload
    if (mode !== "job") {
      const compressedPreview = await imageCompression(previewImage, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedPreview);
      formData.append("upload_preset", "blog_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      previewImageUrl = data.secure_url;
    }

    // 🔥 gallery upload
    if (mode !== "job") {
      for (const img of images) {
        const compressed = await imageCompression(img, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append("file", compressed);
        formData.append("upload_preset", "blog_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        imageUrls.push(data.secure_url);
      }
    }

    await addDoc(collection(db, "posts"), {
      title,
      content,
      type: mode,
      imageUrl: previewImageUrl,
      images: imageUrls,
      price,
      location,
      rooms,
      createdAt: Date.now(),
    });

    // reset
    setTitle("");
    setContent("");
    setImages([]);
    setPreviewImage(null);
    setPrice("");
    setLocation("");
    setRooms("");

    fetchPosts();
    alert("Created!");
  };

  // ❌ delete
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  // logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="adminWrapper">
      <div className="adminContainer">

        <div className="adminUpper">
          <img src={Logo} alt="Logo" />
          <h1>Admin Panel</h1>
        </div>

        <div className="adminLower">
          <div className="adminContForm">

            {/* modes */}
            <div style={{ marginBottom: 20 }}>
              <button onClick={() => setMode("blog")}>Blog</button>
              <button onClick={() => setMode("project")}>Projects</button>
              <button onClick={() => setMode("apartment")}>Apartments</button>
              <button onClick={() => setMode("job")}>Careers</button>
            </div>

            {/* form */}
            <input
              className="blogTitle"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
              className="blogDesc"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <br /><br />

            {/* uploads */}
            {mode !== "job" && (
              <>
                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewImage(e.target.files[0])
                  }
                />
                <p>{previewImage?.name}</p>

                <br />

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setImages(
                      Array.from(e.target.files).filter(validateFile)
                    )
                  }
                />
                <p>{images.length} gallery images</p>
              </>
            )}

            <br />

            <button onClick={createItem}>
              Create {mode}
            </button>

            <br /><br />

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <hr />

        {/* POSTS LIST */}
        <div className="adminContentWrapper">
          <div className="adminContent">

            <h2>All {mode}</h2>

            {posts
              .filter((p) => p.type === mode)
              .map((post) => (
                <div
                  key={post.id}
                  className="adminPostCard"
                >
                  <h3>{post.title}</h3>
                  <button onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </div>
              ))}

          </div>
        </div>

      </div>
    </div>
  );
}