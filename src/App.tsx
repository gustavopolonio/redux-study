import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FeedPostsPage } from "./pages/FeedPostsPage";
import { PostPage } from "./pages/PostPage";
import { EditPostPage } from "./pages/EditPostPage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import { useAppDispatch } from "./app/hooks";
import { fetchUsers } from "./features/users/usersSlice";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/posts',
    element: (
      <>
        <Navbar />
        <FeedPostsPage />
      </>
    ),
  },
  {
    path: '/posts/:postId',
    element: <PostPage />
  },
  {
    path: '/posts/:postId/edit',
    element: <EditPostPage />
  }
])

export const App = () => {
  const dispatch = useAppDispatch()

  dispatch(fetchUsers())

  return (
    <RouterProvider router={router} />
  )
}
