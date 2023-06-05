import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/main.routes";
import { useRecoilState } from "recoil";
import { UserInfo } from "../src/store/auth/user.info";
import { GET_CURRENT_USER } from "./api/auth/api.get.user";
import { GET_IMAGE } from "./api/auth/api.image";

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
      } catch (e) {
        console.log("에러");
        setIsLoading(false);
      }
    }
    return null;
  }, [user]);

  const setImgToUser = async (uuid: string) => {
    try {
      const { status, data } = await GET_IMAGE(uuid);
      if (status === 200 && data.response) {
        return data.response.location[0];
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useLayoutEffect(() => {
    getUserData().then(async (user) => {
      const uuid = user?.id;
      if (uuid) {
        const profileImage = await setImgToUser(uuid);

        const newUser = {
          ...user,
          profileImage,
        };
        await setUser(newUser);
        setIsLoading(false);
      }
    });
  }, [accessToken]);

  return (
    <React.Suspense fallback={<div>...loading</div>}>
      {isLoading ? null : <RouterProvider router={router} />}
    </React.Suspense>
  );
}

export default App;
