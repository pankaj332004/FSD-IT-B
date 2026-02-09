import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = (email) => {
    login(email)
    navigate(email === 'admin@gmail.com' ? '/admin' : '/user')
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => handleLogin('user@gmail.com')}>Login as User</button>
      <button onClick={() => handleLogin('admin@gmail.com')}>Login as Admin</button>
    </>
  )
}

export default Login
