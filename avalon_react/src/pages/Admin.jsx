// Admin.jsx

import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import imageCompression from "browser-image-compression";

import { db, auth } from "../firebase";
import Logo from "../assets/LogoNew.png";

import "./Admin.css";

export default function Admin() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [mode, setMode] = useState("blog");
  const [editingId, setEditingId] = useState(null);

  // BLOG
  const [blogImage, setBlogImage] = useState(null);

  // PROJECT
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);

  // APARTMENT
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [moreLink, setMoreLink] = useState("");

  // PREVIEW IMAGES
  const [previewBefore, setPreviewBefore] = useState(null);
  const [previewAfter, setPreviewAfter] = useState(null);

  // GALLERIES
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);

  const navigate = useNavigate();

  const fetchPosts = async () => {

    const snapshot = await getDocs(
      collection(db, "posts")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(data);

  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const validateFile = (file) => {

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    return allowed.includes(file.type);

  };

  const uploadImage = async (file) => {

    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const formData = new FormData();

    formData.append("file", compressed);

    formData.append(
      "upload_preset",
      "blog_upload"
    );

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.secure_url;

  };

  const createItem = async () => {

    if (!title) {
      alert("Title required");
      return;
    }

    let blogImageUrl = null;

    let previewImageUrl = null;

    let galleryUrls = [];

    let previewBeforeUrl = null;
    let previewAfterUrl = null;

    let beforeGallery = [];
    let afterGallery = [];

    // BLOG
    if (mode === "blog") {

      if (blogImage) {

        blogImageUrl =
          await uploadImage(blogImage);

      }

    }

    // PROJECT
    if (mode === "project") {

      if (previewImage) {

        previewImageUrl =
          await uploadImage(previewImage);

      }

      if (images.length > 0) {

        for (const img of images) {

          galleryUrls.push(
            await uploadImage(img)
          );

        }

      }

    }

    // APARTMENT
    if (mode === "apartment") {

      // PREVIEW BEFORE
      if (previewBefore) {

        previewBeforeUrl =
          await uploadImage(previewBefore);

      }

      // PREVIEW AFTER
      if (previewAfter) {

        previewAfterUrl =
          await uploadImage(previewAfter);

      }

      // BEFORE GALLERY
      if (beforeImages.length > 0) {

        for (const img of beforeImages) {

          beforeGallery.push(
            await uploadImage(img)
          );

        }

      }

      // AFTER GALLERY
      if (afterImages.length > 0) {

        for (const img of afterImages) {

          afterGallery.push(
            await uploadImage(img)
          );

        }

      }

    }

    const postData = {

      title,
      content: content || null,
      type: mode,

      // BLOG / PROJECT
      imageUrl:
        blogImageUrl ||
        previewImageUrl ||
        null,

      images:
        galleryUrls.length
          ? galleryUrls
          : null,

      // APARTMENT
      previewBefore:
        previewBeforeUrl || null,

      previewAfter:
        previewAfterUrl || null,

      beforeImages:
        beforeGallery.length
          ? beforeGallery
          : null,

      afterImages:
        afterGallery.length
          ? afterGallery
          : null,

      price: price || null,
      location: location || null,
      rooms: rooms || null,
      moreLink: moreLink || null,

      createdAt: Date.now(),

    };

    if (editingId) {

      await updateDoc(
        doc(db, "posts", editingId),
        postData
      );

    } else {

      await addDoc(
        collection(db, "posts"),
        postData
      );

    }

    // RESET
    setTitle("");
    setContent("");

    setBlogImage(null);

    setPreviewImage(null);
    setImages([]);

    setPreviewBefore(null);
    setPreviewAfter(null);

    setBeforeImages([]);
    setAfterImages([]);

    setPrice("");
    setLocation("");
    setRooms("");
    setMoreLink("");

    setEditingId(null);

    fetchPosts();

    alert(
      editingId
        ? "Updated!"
        : "Created!"
    );

  };

  const handleEdit = (post) => {

    setMode(post.type);

    setEditingId(post.id);

    setTitle(post.title || "");

    setContent(post.content || "");

    setPrice(post.price || "");

    setLocation(post.location || "");

    setRooms(post.rooms || "");

    setMoreLink(post.moreLink || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const deletePost = async (id) => {

    await deleteDoc(
      doc(db, "posts", id)
    );

    fetchPosts();

  };

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/login");

  };

  return (
    <div className="adminWrapper">

      <div className="adminContainer">

        <div className="adminUpper">

          <img
            src={Logo}
            alt="Logo"
          />

          <h1>Admin Panel</h1>

        </div>

        <div className="adminLower">

          <div className="adminContForm">

            {/* MODES */}

            <div style={{ marginBottom: 20 }}>

              <button
                onClick={() => setMode("blog")}
              >
                Blog
              </button>

              <button
                onClick={() => setMode("project")}
              >
                Projects
              </button>

              <button
                onClick={() => setMode("apartment")}
              >
                Apartments
              </button>

              <button
                onClick={() => setMode("job")}
              >
                Careers
              </button>

            </div>

            {/* TITLE */}

            <input
              className="blogTitle"
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <br />
            <br />

            {/* CONTENT */}

            <textarea
              className="blogDesc"
              placeholder="Content"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            <br />
            <br />

            {/* BLOG */}

            {mode === "blog" && (
              <>

                <h3>Blog Image</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setBlogImage(
                      e.target.files[0]
                    )
                  }
                />

              </>
            )}

            {/* PROJECT */}

            {mode === "project" && (
              <>

                <h3>Preview</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewImage(
                      e.target.files[0]
                    )
                  }
                />

                <br />
                <br />

                <h3>Gallery</h3>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setImages(
                      Array.from(
                        e.target.files
                      ).filter(validateFile)
                    )
                  }
                />

              </>
            )}

            {/* APARTMENT */}

            {mode === "apartment" && (
              <>

                <input
                  className="blogTitle"
                  placeholder="Price"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={(e) =>
                    setRooms(e.target.value)
                  }
                />

                <br />
                <br />

                <input
                  className="blogTitle"
                  placeholder="More Link"
                  value={moreLink}
                  onChange={(e) =>
                    setMoreLink(e.target.value)
                  }
                />

                <br />
                <br />

                {/* PREVIEWS */}

                <h3>Preview Before</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewBefore(
                      e.target.files[0]
                    )
                  }
                />

                <br />
                <br />

                <h3>Preview After</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewAfter(
                      e.target.files[0]
                    )
                  }
                />

                <br />
                <br />

                {/* BEFORE GALLERY */}

                <h3>Before Gallery</h3>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setBeforeImages(
                      Array.from(
                        e.target.files
                      ).filter(validateFile)
                    )
                  }
                />

                <br />
                <br />

                {/* AFTER GALLERY */}

                <h3>After Gallery</h3>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setAfterImages(
                      Array.from(
                        e.target.files
                      ).filter(validateFile)
                    )
                  }
                />

              </>
            )}

            <br />
            <br />

            <button onClick={createItem}>

              {editingId
                ? "Update"
                : "Create"}{" "}

              {mode}

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

            <h2>All {mode}</h2>

            {posts
              .filter((p) => p.type === mode)
              .map((post) => (

                <div
                  key={post.id}
                  className="adminPostCard"
                >

                  <h3>{post.title}</h3>

                  <button
                    onClick={() =>
                      handleEdit(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePost(post.id)
                    }
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