import { useState, useEffect } from "react"
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import { db, auth } from "../firebase"
import Logo from "../assets/LogoNew.svg"
import "./Admin.css"

export default function Admin() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])

  const [image, setImage] = useState(null)

  const [mode, setMode] = useState("blog")

  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [rooms, setRooms] = useState("")

  const navigate = useNavigate()

  // 📦 Получение данных
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"))

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 🔥 Создание
  const createItem = async () => {
    if (!title || !content || (mode !== "job" && !image)) {
      alert("Fill all fields")
      return
    }

    if (mode === "apartment" && (!price || !location)) {
      alert("Fill apartment fields")
      return
    }

    let imageUrl = ""

    // 📷 только если не job
    if (mode !== "job") {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "blog_upload")

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpdlzlhke/image/upload",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()
      imageUrl = data.secure_url
    }

    const baseData = {
      title,
      content,
      imageUrl,
      type: mode,
      createdAt: Date.now()
    }

    const extraData =
      mode === "apartment"
        ? {
            price,
            location,
            rooms
          }
        : {}

    await addDoc(collection(db, "posts"), {
      ...baseData,
      ...extraData
    })

    // очистка
    setTitle("")
    setContent("")
    setImage(null)
    setPrice("")
    setLocation("")
    setRooms("")

    fetchPosts()
    alert("Created!")
  }

  // ❌ Удаление
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id))
    fetchPosts()
  }

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    const maxSize = 15 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed")
      return false
    }

    if (file.size > maxSize) {
      alert("File size must be less than 15MB")
      return false
    }

    return true
  }

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
              <button onClick={() => setMode("blog")}>
                Blog Posts
              </button>

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

              <button
                onClick={() => setMode("job")}
                style={{ marginLeft: 10 }}
              >
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

            <br /><br />

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
                <br /><br />

                <input
                  className="appartPrice"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />

                <input
                  className="appartLocation"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <br /><br />

                <input
                  className="appartRooms"
                  placeholder="Rooms"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </>
            )}

            <br /><br />

            {/* 📷 upload (не для job) */}
            {mode !== "job" && (
              <>
                <label className="fileUpload">
                  <span className="uploadBtn">Choose file</span>

                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (!file) return

                      if (validateFile(file)) {
                        setImage(file)
                      } else {
                        e.target.value = ""
                      }
                    }}
                  />
                </label>

                <p className="fileName">
                  {image ? image.name : "No file chosen"}
                </p>
              </>
            )}

            <br /><br />

            <button onClick={createItem}>
              {mode === "blog"
                ? "Create Post"
                : mode === "apartment"
                ? "Create Apartment"
                : mode === "project"
                ? "Create Project"
                : "Create Job"}
            </button>

            <br /><br />

            <button onClick={handleLogout}>
              Logout
            </button>
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
              .filter(p =>
                mode === "blog"
                  ? p.type === "blog" || !p.type
                  : mode === "apartment"
                  ? p.type === "apartment"
                  : mode === "project"
                  ? p.type === "project"
                  : p.type === "job"
              )
              .map(post => (
                <div
                  key={post.id}
                  style={{
                    border: "1px solid gray",
                    padding: 10,
                    marginTop: 10
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

                  <button onClick={() => deletePost(post.id)}>
                    Delete
                  </button>
                </div>
              ))}

          </div>
        </div>

      </div>
    </div>
  )
}