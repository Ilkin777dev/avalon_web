import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Logo from "../assets/LogoNew.svg"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      alert("Login successful!")

      navigate("/admin")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
      <img src={Logo} alt="Avalon Development Logo" />

      <br /><br />
      <h1>LOGIN</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  )
}