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

  const [mode, setMode] = useState("blog");

  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");

  const navigate = useNavigate();

  // 📦 Получение данных
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

  // ✅ Проверка файлов
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed");
      return false;
    }

    return true;
  };

  // 🔥 Создание
  const createItem = async () => {
    // базовая проверка
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    // если НЕ job -> нужны картинки
    if (mode !== "job" && images.length === 0) {
      alert("Upload images");
      return;
    }

    // апартаменты
    if (mode === "apartment" && (!price || !location)) {
      alert("Fill apartment fields");
      return;
    }

    let imageUrls = [];

    // 📷 Upload в Cloudinary
    if (mode !== "job") {
      for (const image of images) {
        // 🔥 compression
        const compressedFile = await imageCompression(image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const formData = new FormData();

        formData.append("file", compressedFile);
        formData.append("upload_preset", "blog_upload");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        imageUrls.push(data.secure_url);
      }
    }

    // 🧱 Основные данные
    const baseData = {
      title,
      content,
      images: imageUrls,
      imageUrl: imageUrls[0] || "",
      type: mode,
      createdAt: Date.now(),
    };

    // 🏠 Доп поля
    const extraData =
      mode === "apartment"
        ? {
            price,
            location,
            rooms,
          }
        : {};

    // 🔥 Создание документа
    await addDoc(collection(db, "posts"), {
      ...baseData,
      ...extraData,
    });

    // 🧹 Очистка
    setTitle("");
    setContent("");
    setImages([]);
    setPrice("");
    setLocation("");
    setRooms("");

    fetchPosts();

    alert("Created!");
  };

  // ❌ Удаление
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  // 🚪 Logout
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
            {/* 🔘 режимы */}
            <div style={{ marginBottom: 20 }}>
              <button onClick={() => setMode("blog")}>Blog Posts</button>

              <button
                onClick={() => setMode("apartment")}
                style={{ marginLeft: 10 }}
              >
                Apartments
              </button>

              <button
                onClick={() => setMode("project")}
                style={{ marginLeft: 10 }}
              >
                Projects
              </button>

              <button onClick={() => setMode("job")} style={{ marginLeft: 10 }}>
                Careers
              </button>
            </div>

            {/* 🧾 форма */}
            <input
              className="blogTitle"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <textarea
              className="blogDesc"
              placeholder={
                mode === "blog"
                  ? "Content"
                  : mode === "apartment"
                    ? "Description"
                    : mode === "project"
                      ? "Project Description"
                      : "Job Description"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* 🏠 поля апартаментов */}
            {mode === "apartment" && (
              <>
                <br />
                <br />

                <input
                  className="appartPrice"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="appartLocation"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="appartRooms"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </>
            )}

            <br />
            <br />

            {/* 📷 Upload */}
            {mode !== "job" && (
              <>
                <label className="fileUpload">
                  <span className="uploadBtn">Choose files</span>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);

                      const validFiles = files.filter(validateFile);

                      setImages(validFiles);
                    }}
                  />
                </label>

                <p className="fileName">
                  {images.length > 0
                    ? `${images.length} files selected`
                    : "No files chosen"}
                </p>
              </>
            )}

            <br />
            <br />

            <button onClick={createItem}>
              {mode === "blog"
                ? "Create Post"
                : mode === "apartment"
                  ? "Create Apartment"
                  : mode === "project"
                    ? "Create Project"
                    : "Create Job"}
            </button>

            <br />
            <br />

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <hr />

        {/* 📦 список */}
        <div className="adminContentWrapper">
          <div className="adminContent">
            <h2>
              {mode === "blog"
                ? "All Blog Posts"
                : mode === "apartment"
                  ? "All Apartments"
                  : mode === "project"
                    ? "All Projects"
                    : "All Jobs"}
            </h2>

            {posts
              .filter((p) =>
                mode === "blog"
                  ? p.type === "blog" || !p.type
                  : mode === "apartment"
                    ? p.type === "apartment"
                    : mode === "project"
                      ? p.type === "project"
                      : p.type === "job",
              )
              .map((post) => (
                <div
                  key={post.id}
                  style={{
                    border: "1px solid gray",
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <h3>{post.title}</h3>

                  {mode === "apartment" && (
                    <>
                      <p>💰 {post.price}</p>
                      <p>📍 {post.location}</p>
                      <p>🛏 {post.rooms}</p>
                    </>
                  )}

                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
