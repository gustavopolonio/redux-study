import { nanoid } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addPost } from "../features/posts/postsSlice"
import { selectAllUsers } from "../features/users/usersSlice"

interface PostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface PostFormElements extends HTMLFormElement {
  elements: PostFormFields
}

export function PostForm() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  function handleCreatePost(e: React.FormEvent<PostFormElements>) {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const postAuthorId = elements.postAuthor.value

    dispatch(addPost(title, content, postAuthorId))

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add new post</h2>

      <form onSubmit={handleCreatePost}>
        <label>
          Post title
          <input type="text" name="postTitle" required />
        </label>

        <select name="postAuthor" required>
          <option value="">--Who's creating this post?--</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <label>
          Post content
          <textarea name="postContent" required />
        </label>

        <button type="submit">Create post</button>
      </form>
    </section>
  )
}