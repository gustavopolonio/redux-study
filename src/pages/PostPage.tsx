import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectPostByID } from "../features/posts/postsSlice"
import { PostAuthor } from "../components/PostAuthor"
import { PostTimeAgo } from "../components/PostTimeAgo"

export function PostPage() {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostByID(state, postId!))

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
      <PostTimeAgo createdAt={post.createdAt} />
      <PostAuthor userId={post.createdBy} />
      <p>{post.content}</p>
      <div>
        <Link to={`/posts/${post.id}/edit`}>Edit post</Link>
      </div>
      <div>
        <Link to='/'>Back to home</Link>
      </div>
    </div>
  )
}