import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import Header from "../components/Header"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import "./Post.css"

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
        <div className="postContainer">
          <div className="postImage">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
              />
            )}
          </div>

          <div className="postText">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        </div>
      </div>

      <ContactUs />
      <Footer />

    </div>
  )
}