import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FeedPostsPage } from "./pages/FeedPostsPage";
import { PostPage } from "./pages/PostPage";
import { EditPostPage } from "./pages/EditPostPage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";

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
  return (
    <RouterProvider router={router} />
  )
}
