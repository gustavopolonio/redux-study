import { Counter } from "../components/Counter"
import { PostForm } from "../components/PostForm"
import { PostsList } from "../components/PostsList"

export function FeedPostsPage() {

  return (
    <div>
      <Counter />
      <PostForm />
      <PostsList />
    </div>
  )
}