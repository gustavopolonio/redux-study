import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { userLoggedIn } from "../features/auth/authSlice"
import { selectAllUsers } from "../features/users/usersSlice"

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}

interface LoginPageFormElements extends HTMLFormElement {
  elements: LoginPageFormFields
}

export function LoginPage() {
  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent<LoginPageFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const userId = elements.username.value

    dispatch(userLoggedIn(userId))
    navigate('/posts')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <select name="username">
          <option value="">-- Select your username --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <button type="submit">Log in</button>
      </form>
    </div>
  )
}