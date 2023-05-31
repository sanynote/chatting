import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MyPage from "../pages/image/my.page";

const MainPage = React.lazy(() => import("../pages/main/main.page"));
const SignUp = React.lazy(() => import("../pages/auth/sign.up"));
const SignIn = React.lazy(() => import("../pages/auth/sign.in"));
const NotFound = React.lazy(() => import("../pages/notFound/not.found"));
const ChatPage = React.lazy(() => import("../pages/chatting/chat.page"));

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  { path: "/mypage", element: <MyPage /> },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
