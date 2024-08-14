import { Link } from "react-router-dom"
import { useAppSelector } from "../app/hooks"

export function PostsList() {
  const posts = useAppSelector(state => state.posts)

  return (
    <div>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}>
            Go to post
          </Link>
        </li>
      ))}
    </div>
  )
}