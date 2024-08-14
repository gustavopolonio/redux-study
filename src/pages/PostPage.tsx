import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"

export function PostPage() {
  const { postId } = useParams()

  const post = useAppSelector(state => state.posts.find(post => post.id === postId))

  if (!post) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to='/'>Back to home</Link>
    </div>
  )
}