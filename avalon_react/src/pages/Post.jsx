import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import Header from "../components/Header"
import "./blog.css"

export default function Post() {
  const { id } = useParams()

  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost(docSnap.data())
      }
    }

    fetchPost()
  }, [id])

  if (!post) {
    return <h1>Loading...</h1>
  }

  return (
    <div>

    <Header></Header>

    <div className="postWrapper">
      {post.imageUrl && (
      <img
        src={post.imageUrl}
        alt={post.title}
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      />
    )}

    <h1>{post.title}</h1>
    <p>{post.content}</p>
    </div>

  </div>
  )
}