import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { userLoggedOut } from "../features/auth/authSlice"
import { selectCurrentUser } from "../features/users/usersSlice"

export function Navbar() {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoggedIn = !!user

  function handleLogout() {
    dispatch(userLoggedOut())
    navigate('/')
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Redux Content</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}