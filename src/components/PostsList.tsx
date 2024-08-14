import { Link } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAllPosts } from "../features/posts/postsSlice"
import { PostAuthor } from "./PostAuthor"

export function PostsList() {
  const posts = useAppSelector(selectAllPosts)

  return (
    <div>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <PostAuthor userId={post.createdBy} />
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}>
            Go to post
          </Link>
        </li>
      ))}
    </div>
  )
}