import "./App.css"
import { Counter } from "./components/Counter"
import { PostForm } from "./components/PostForm"
import { PostsList } from "./components/PostsList"

export const App = () => {
  return (
    <div>
      <Counter />
      <PostsList />
      <PostForm />
    </div>
  )
}
