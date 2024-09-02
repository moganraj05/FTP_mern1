import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
          <div > 
          {user && (
            <div className="container" >
               <Link to="/" className="my-link"><h1>Workout Buddy</h1></Link>
               <Link to="/bmi" className="bmi-head"><h1>BMI Calculator</h1></Link>
            <nav>
            <div>
              <span className="my-link">{user.email}</span>
              <button className="buttu" onClick={handleClick}>Log out</button>
            </div>
            </nav>
            </div>
          )}
          </div>
          {!user && (
            <div > 
              <Link to="/login" className="my-link2">Login</Link>
              <Link to="/signup" className="my-link1">signup</Link>
            </div>
          )}
    </header>
  )
}

export default Navbar