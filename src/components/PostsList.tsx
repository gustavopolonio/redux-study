import { Link } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAllPosts } from "../features/posts/postsSlice"
import { PostAuthor } from "./PostAuthor"
import { PostTimeAgo } from "./PostTimeAgo"
import { ReactionButtons } from "./ReactionButtons"

export function PostsList() {
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div>
      {orderedPosts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <PostTimeAgo createdAt={post.createdAt} />
          <PostAuthor userId={post.createdBy} />
          <p>{post.content}</p>
          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`}>
            Go to post
          </Link>
        </li>
      ))}
    </div>
  )
}