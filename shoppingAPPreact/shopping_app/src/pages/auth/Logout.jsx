import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate('/login')
  }, [])

  return null
}

export default Logout
