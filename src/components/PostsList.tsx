import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchPosts, selectAllPosts, selectPostsError, selectPostsStatus } from "../features/posts/postsSlice"
import { PostAuthor } from "./PostAuthor"
import { PostTimeAgo } from "./PostTimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { ReactNode, useEffect } from "react"

export function PostsList() {
  const dispatch = useAppDispatch()
  const postsStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content: ReactNode

  if (postsStatus === 'pending') {
    content = <div>Loading...</div>
  } else if (postsStatus === 'rejected') {
    content = <div>{postsError}</div>
  } else  if (postsStatus === 'completed') {
    content = (
      <div>
        {orderedPosts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <PostTimeAgo createdAt={post.date} />
            <PostAuthor userId={post.user} />
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

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  )
}