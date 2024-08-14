import { useAppSelector } from "../app/hooks"

export function PostsList() {
  const posts = useAppSelector(state => state.posts)  

  return (
    <div>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </div>
  )
}