import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import "./blog.css";

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

      const filtered = data.filter(
        (item) => item.type === "blog" || !item.type
      );

      setPosts(filtered);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />

      <div className="blog_section">
        <h1>Press</h1>

        <div className="blog_grid">
          {posts.map((post) => (
            <div className="blogCard" key={post.id}>
              <img src={post.imageUrl} alt="" />

              <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>

              <p>{post.content}</p>
              <p className="slug">{post.slug}</p>
            </div>
          ))}
        </div>
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
}