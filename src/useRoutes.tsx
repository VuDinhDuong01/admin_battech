import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { lazy, useContext, Suspense } from 'react'

import { path } from '~/contants/path'
import { Theme } from "./hook";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { IsLoading } from "./components/isLoading/IsLoading";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword.pages";

const Login = lazy(() => import('./pages/Login/Login.pages'))
const Posts = lazy(() => import('./pages/Posts/Posts.Page'))
const AddPost = lazy(() => import("./pages/AddTopic/AddTopic.Page"));
const AddAuthor = lazy(() => import("./pages/AddAuthor/AddAuthor.Page"))
const AddTag = lazy(() => import("./pages/AddTag/AddTag.Page"))
const AddTopic = lazy(() => import("./pages/AddPost/AddPost.Page"))
const Topic = lazy(() => import("~/pages/Topic/Topic.Page"))
const Author = lazy(() => import("~/pages/Author/Author.Page"))
const Tag = lazy(() => import('~/pages/Tag/Tag.Page'))

export const Routes = () => {
  const { authentication } = useContext(Theme)
  const IsProtectedRouter = () => {
    return authentication ? <Outlet /> : <Navigate to={path.login} />
  }

  const IsNotProtectedRouter = () => {
    return !authentication ? <Outlet /> : <Navigate to={path.post} />
  }

  const element = useRoutes([
    {
      path: path.login,
      element: <IsNotProtectedRouter />,
      children: [
        {
          path: '',
          element: <Suspense fallback={<IsLoading />} ><Login /></Suspense>,
        },
      ]
    },
    {
      path: '',
      element: <IsProtectedRouter />,
      children: [
        {
          path: '',
          element: <Suspense fallback={<IsLoading />}><MainLayout /></Suspense>,
          children: [
            {
              path: path.post,
              element: <Posts />
            },
            {
              path: path.addpost,
              element: <AddPost />
            }, {
              path: path.addauthor,
              element: <AddAuthor />
            }, {
              path: path.addtag,
              element: <AddTag />
            }, {
              path: path.addtopic,
              element: <AddTopic />
            }, {
              path: path.topic,
              element: <Topic />
            },
            {
              path: path.author,
              element: <Author />
            }, {
              path: path.tag,
              element: <Tag />
            }
          ]
        },
      ],

    },
    {
      path: path.resetPassword,
      element: <IsNotProtectedRouter />,
      children: [
        {
          path: '',
          element: <Suspense fallback={<IsLoading />} ><ResetPassword /></Suspense>
        }
      ]
    },
  ])
  return element;
}