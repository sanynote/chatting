import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/main.routes";
import { useRecoilState } from "recoil";
import { UserInfo } from "../src/store/auth/user.info";
import { GET_CURRENT_USER } from "./api/auth/api.get.user";
import { GET_IMAGE } from "./api/auth/api.image";
import { AxiosError } from "axios";

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
        if (e instanceof AxiosError && e.response) {
          const code = e.response.status;
          if (code === 400) alert("아이디 또는 비밀번호가 잘못되었습니다.");
          if (code === 500) alert("서버에러");
        } else {
          throw new Error("예상하지 못한 에러,,");
        }
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
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 400) alert("유저의 아이디를 확인해주세요");
        if (code === 404) alert("kind 필드를 다시 확인해주세요");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
      }
    }
  };

  React.useLayoutEffect(() => {
    getUserData().then(async (user) => {
      const uuid = user?.id;
      if (uuid) {
        const profileImage = await setImgToUser(uuid);
        setUser({ ...user, profileImage });
      }
    });
  }, [accessToken]);

  React.useEffect(() => {
    if (isLoading && user) setIsLoading(false);
  }, [user, isLoading]);

  // isLoading으로 통신 여부 기록하고, user가 set될때 통신이 완료되었다는 의미 -> 완료되었다면 로딩을 꺼줌

  return (
    <React.Suspense fallback={<div>...loading</div>}>
      {isLoading ? null : <RouterProvider router={router} />}
    </React.Suspense>
  );
}

export default App;
