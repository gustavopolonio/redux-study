import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectPostByID } from "../features/posts/postsSlice"
import { PostAuthor } from "../components/PostAuthor"
import { PostTimeAgo } from "../components/PostTimeAgo"
import { ReactionButtons } from "../components/ReactionButtons"
import { selectCurrentUserID } from "../features/auth/authSlice"

export function PostPage() {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostByID(state, postId!))
  const userId = useAppSelector(selectCurrentUserID)

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
      <ReactionButtons post={post} />
      {userId === post.createdBy && (
        <div>
          <Link to={`/posts/${post.id}/edit`}>Edit post</Link>
        </div>
      )}
      <div>
        <Link to='/posts'>Back to posts</Link>
      </div>
    </div>
  )
}