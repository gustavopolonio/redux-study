import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FeedPostsPage } from "./pages/FeedPostsPage";
import { PostPage } from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedPostsPage />,
  },
  {
    path: '/posts/:postId',
    element: <PostPage />
  }
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
