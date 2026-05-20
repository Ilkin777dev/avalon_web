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

  const [mode, setMode] = useState("blog");

  // PROJECTS
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);

  // APARTMENTS
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [moreLink, setMoreLink] = useState("");

  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const navigate = useNavigate();

  // FETCH POSTS
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

  // VALIDATE
  const validateFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    return allowedTypes.includes(file.type);
  };

  // CLOUDINARY UPLOAD
  const uploadImage = async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const formData = new FormData();

    formData.append("file", compressed);
    formData.append("upload_preset", "blog_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.secure_url;
  };

  // CREATE ITEM
  const createItem = async () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    // PROJECT VALIDATION
    if (mode === "project") {
      if (!previewImage || images.length === 0) {
        alert("Upload preview & gallery");
        return;
      }
    }

    // APARTMENT VALIDATION
    if (mode === "apartment") {
      if (
        !price ||
        !location ||
        !rooms ||
        !beforeImage ||
        !afterImage
      ) {
        alert("Fill apartment fields");
        return;
      }
    }

    let previewImageUrl = "";
    let galleryUrls = [];

    let beforeUrl = "";
    let afterUrl = "";

    // PROJECTS
    if (mode === "project") {
      previewImageUrl = await uploadImage(previewImage);

      for (const img of images) {
        const url = await uploadImage(img);
        galleryUrls.push(url);
      }
    }

    // APARTMENTS
    if (mode === "apartment") {
      beforeUrl = await uploadImage(beforeImage);
      afterUrl = await uploadImage(afterImage);

      // APARTMENT GALLERY
      for (const img of images) {
        const url = await uploadImage(img);
        galleryUrls.push(url);
      }
    }

    // CREATE DOC
    await addDoc(collection(db, "posts"), {
      title,
      content,
      type: mode,

      // PROJECTS
      imageUrl: previewImageUrl,
      images: galleryUrls,

      // APARTMENTS
      beforeImage: beforeUrl,
      afterImage: afterUrl,

      // EXTRA
      price,
      location,
      rooms,
      moreLink,

      createdAt: Date.now(),
    });

    // RESET
    setTitle("");
    setContent("");

    setPreviewImage(null);
    setImages([]);

    setBeforeImage(null);
    setAfterImage(null);

    setPrice("");
    setLocation("");
    setRooms("");
    setMoreLink("");

    fetchPosts();

    alert("Created!");
  };

  // DELETE
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));

    fetchPosts();
  };

  // LOGOUT
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

            {/* MODES */}

            <div style={{ marginBottom: 20 }}>
              <button onClick={() => setMode("blog")}>
                Blog
              </button>

              <button
                onClick={() => setMode("project")}
                style={{ marginLeft: 10 }}
              >
                Projects
              </button>

              <button
                onClick={() => setMode("apartment")}
                style={{ marginLeft: 10 }}
              >
                Apartments
              </button>

              <button
                onClick={() => setMode("job")}
                style={{ marginLeft: 10 }}
              >
                Careers
              </button>
            </div>

            {/* TITLE */}

            <input
              className="blogTitle"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            {/* CONTENT */}

            <textarea
              className="blogDesc"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <br />

            {/* PROJECTS */}

            {mode === "project" && (
              <>
                <h3>Preview Image</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewImage(e.target.files[0])
                  }
                />

                <p>
                  {previewImage
                    ? previewImage.name
                    : "No preview selected"}
                </p>

                <br />

                <h3>Gallery Images</h3>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setImages(
                      Array.from(e.target.files).filter(validateFile)
                    )
                  }
                />

                <p>
                  {images.length} gallery images selected
                </p>
              </>
            )}

            {/* APARTMENTS */}

            {mode === "apartment" && (
              <>
                <input
                  className="blogTitle"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="More Link"
                  value={moreLink}
                  onChange={(e) => setMoreLink(e.target.value)}
                />

                <br />
                <br />

                <h3>Before Image</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setBeforeImage(e.target.files[0])
                  }
                />

                <p>
                  {beforeImage
                    ? beforeImage.name
                    : "No before image"}
                </p>

                <br />

                <h3>After Image</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setAfterImage(e.target.files[0])
                  }
                />

                <p>
                  {afterImage
                    ? afterImage.name
                    : "No after image"}
                </p>

                <br />

                <h3>Apartment Gallery</h3>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setImages(
                      Array.from(e.target.files).filter(validateFile)
                    )
                  }
                />

                <p>
                  {images.length} apartment gallery images
                </p>
              </>
            )}

            <br />
            <br />

            <button onClick={createItem}>
              Create {mode}
            </button>

            <br />
            <br />

            <button onClick={handleLogout}>
              Logout
            </button>

          </div>
        </div>

        <hr />

        {/* POSTS */}

        <div className="adminContentWrapper">
          <div className="adminContent">

            <h2>
              All {mode}
            </h2>

            {posts
              .filter((p) => p.type === mode)
              .map((post) => (
                <div
                  key={post.id}
                  className="adminPostCard"
                >
                  <h3>{post.title}</h3>

                  <button
                    onClick={() => deletePost(post.id)}
                  >
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