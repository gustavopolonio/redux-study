import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { updatePost } from "../features/posts/postsSlice"

interface PostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface PostFormElements extends HTMLFormElement {
  elements: PostFormFields
}

export function EditPostPage() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.posts.find(post => post.id === postId))

  if (!post) {
    return (
      <div>
        <h2>Post not found</h2>
      </div>
    )
  }

  function handleEditPost(e: React.FormEvent<PostFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(updatePost({
      id: post!.id,
      title,
      content
    }))

    e.currentTarget.reset()

    navigate(`/posts/${post!.id}`)
  }

  return (
    <section>
      <h2>Edit post</h2>

      <form onSubmit={handleEditPost}>
        <label>
          Post title
          <input type="text" name="postTitle" defaultValue={post.title} />
        </label>

        <label>
          Post content
          <textarea name="postContent" defaultValue={post.content} />
        </label>

        <button type="submit">Edit post</button>
      </form>
    </section>
  )
}