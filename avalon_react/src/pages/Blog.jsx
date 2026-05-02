import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header"
import "./blog.css"

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(data);
  };

  fetchPosts();
}, []);

  return (
    <div>
      <Header></Header>

      <div className="blog_section">
        <h1>Blog</h1>

      {posts.map((post) => (
        <div
        className="blogCard"
          key={post.id}
          // style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
        >
          <img
            src={post.imageUrl}
            alt=""
            // style={{
            //   width: "300px",
            //   borderRadius: "10px",
            // }}
          />
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
          <p>{post.slug}</p>
        </div>
      ))}
      </div>        
      
    </div>
  );
}
