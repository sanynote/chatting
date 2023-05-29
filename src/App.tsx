import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/main.routes";
import { useRecoilState } from "recoil";
import { UserInfo } from "../src/store/auth/user.info";
import { GET_CURRENT_USER } from "./api/auth/api.get.user";

function App() {
  const [user, setUser] = useRecoilState(UserInfo);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const accessToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN!);


  const getUserData = React.useCallback(async () => {
    if (accessToken) {
      setIsLoading(true);
      try {
        const { status, data } = await GET_CURRENT_USER();
        if (status === 200) return data.response;
        console.log("유저정보 가져오기");
      } catch (e) {
        console.log('에러')
        setIsLoading(false);
      }
    }
    return null;
  }, [user]);

  React.useLayoutEffect(() => {
    getUserData().then(async (user) => {
      await setUser(user);
      setIsLoading(false);
    });
  }, [accessToken]);

  return (
    <React.Suspense fallback={<div>...loading</div>}>
      {isLoading ? null : <RouterProvider router={router} />}
    </React.Suspense>
  );
}

export default App;
