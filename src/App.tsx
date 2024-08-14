import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FeedPostsPage } from "./pages/FeedPostsPage";
import { PostPage } from "./pages/PostPage";
import { EditPostPage } from "./pages/EditPostPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedPostsPage />,
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
