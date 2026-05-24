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
import Logo from "../assets/LogoNew.svg";

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

  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);

  const navigate = useNavigate();

  // FETCH POSTS

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

  // VALIDATE FILE

  const validateFile = (file) => {

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    return allowed.includes(file.type);

  };

  // UPLOAD IMAGE

  const uploadImage = async (file) => {

    const compressed = await imageCompression(file, {
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

    return data.secure_url;

  };

  // CREATE / UPDATE

  const createItem = async () => {

    if (!title) {
      alert("Title required");
      return;
    }

    // EXISTING POST

    let existingPost = null;

    if (editingId) {

      existingPost = posts.find(
        (p) => p.id === editingId
      );

    }

    // IMAGES

    let blogImageUrl =
      existingPost?.imageUrl || null;

    let previewImageUrl =
      existingPost?.imageUrl || null;

    let galleryUrls =
      existingPost?.images || [];

    let beforeGallery =
      existingPost?.beforeImages || [];

    let afterGallery =
      existingPost?.afterImages || [];

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

        galleryUrls = [];

        for (const img of images) {

          const url =
            await uploadImage(img);

          galleryUrls.push(url);

        }

      }

    }

    // APARTMENT

    if (mode === "apartment") {

      if (beforeImages.length > 0) {

        beforeGallery = [];

        for (const img of beforeImages) {

          const url =
            await uploadImage(img);

          beforeGallery.push(url);

        }

      }

      if (afterImages.length > 0) {

        afterGallery = [];

        for (const img of afterImages) {

          const url =
            await uploadImage(img);

          afterGallery.push(url);

        }

      }

    }

    // POST DATA

    const postData = {

      title,

      content: content || null,

      type: mode,

      imageUrl:
        blogImageUrl ||
        previewImageUrl ||
        null,

      images:
        galleryUrls.length > 0
          ? galleryUrls
          : [],

      beforeImages:
        beforeGallery.length > 0
          ? beforeGallery
          : [],

      afterImages:
        afterGallery.length > 0
          ? afterGallery
          : [],

      price: price || null,
      location: location || null,
      rooms: rooms || null,
      moreLink: moreLink || null,

      createdAt:
        existingPost?.createdAt ||
        Date.now(),

    };

    // UPDATE

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

  // EDIT

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

  // DELETE

  const deletePost = async (id) => {

    await deleteDoc(
      doc(db, "posts", id)
    );

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

            <br /><br />

            {/* CONTENT */}

            <textarea
              className="blogDesc"
              placeholder="Content"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            <br /><br />

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

                <h3>Preview Image</h3>

                <input
                  type="file"
                  onChange={(e) =>
                    setPreviewImage(
                      e.target.files[0]
                    )
                  }
                />

                <br /><br />

                <h3>Gallery Images</h3>

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

                <br /><br />

                <input
                  className="blogTitle"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

                <br /><br />

                <input
                  className="blogTitle"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={(e) =>
                    setRooms(e.target.value)
                  }
                />

                <br /><br />

                <input
                  className="blogTitle"
                  placeholder="More Link"
                  value={moreLink}
                  onChange={(e) =>
                    setMoreLink(e.target.value)
                  }
                />

                <br /><br />

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

                <p>
                  {
                    beforeImages.length
                  } before images
                </p>

                <br /><br />

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

                <p>
                  {
                    afterImages.length
                  } after images
                </p>

              </>
            )}

            <br /><br />

            <button onClick={createItem}>

              {editingId
                ? "Update"
                : "Create"}{" "}

              {mode}

            </button>

            <br /><br />

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
              .filter(
                (p) => p.type === mode
              )
              .map((post) => (

                <div
                  key={post.id}
                  className="adminPostCard"
                >

                  <h3>
                    {post.title}
                  </h3>

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