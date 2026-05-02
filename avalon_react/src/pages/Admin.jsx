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

export default function Admin() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  const [image, setImage] = useState(null)

  // Получение постов
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"))

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPosts(data)
  }

  // Загружаем посты при открытии страницы
  useEffect(() => {
    fetchPosts()
  }, [])

  // Создание поста
  const createPost = async () => {
  if (!title || !content || !image) {
    alert("Fill all fields")
    return
  }

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

  const imageUrl = data.secure_url

  await addDoc(collection(db, "posts"), {
    title,
    content,
    imageUrl,
    slug: title.toLowerCase().replaceAll(" ", "-"),
    createdAt: Date.now()
  })

  setTitle("")
  setContent("")
  setImage(null)

  fetchPosts()

  alert("Post created!")
}

  // Удаление поста
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id))

    fetchPosts()
  }

  // Logout
  const handleLogout = async () => {
    await signOut(auth)

    navigate("/login")
  }

  const validateFile = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]

  const maxSize = 15 * 1024 * 1024 // 15MB

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
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

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

      <br /><br />

      <button onClick={createPost}>
        Create Post
      </button>

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <h2>All Posts</h2>

      {posts.map(post => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginTop: 10
          }}
        >
          <h3>{post.title}</h3>

          <button onClick={() => deletePost(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}