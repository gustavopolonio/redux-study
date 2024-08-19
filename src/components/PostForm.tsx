import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectCurrentUserID } from "../features/auth/authSlice"
import { addPost } from "../features/posts/postsSlice"

interface PostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface PostFormElements extends HTMLFormElement {
  elements: PostFormFields
}

export function PostForm() {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUserID)

  function handleCreatePost(e: React.FormEvent<PostFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (userId) {
      dispatch(addPost(title, content, userId))
      e.currentTarget.reset()
    }
  }

  return (
    <section>
      <h2>Add new post</h2>

      <form onSubmit={handleCreatePost}>
        <label>
          Post title
          <input type="text" name="postTitle" required />
        </label>

        <label>
          Post content
          <textarea name="postContent" required />
        </label>

        <button type="submit">Create post</button>
      </form>
    </section>
  )
}