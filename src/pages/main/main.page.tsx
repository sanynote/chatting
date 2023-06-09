import React from "react";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import BackButton from "../../common/back.button";

function MainPage() {
  const [user, setUser] = useRecoilState(UserInfo);
  const navigate = useNavigate();

  const signOut = async () => {
    const refreshToken = localStorage.getItem(
      `${process.env.REACT_APP_REFRESH_TOKEN}`
    );
    if (refreshToken) {
      try {
        const { status } = await axios.patch(
          `${process.env.REACT_APP_USER}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        if (status) alert("success logout");
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          const code = e.response.status;
          if (code === 500) throw new Error("서버에러");
        } else {
          throw new Error("예상하지 못한 에러,,");
        }
      }
      setUser(null);
      localStorage.clear();
    }
  };

  if (user) {
    return (
      <>
        <div>로그인 된 상태입니다. </div>
        <div onClick={() => navigate("/chat")}>채팅방으로 이동하기</div>
        <div onClick={() => navigate("/mypage")}>마이페이지로 이동하기</div>
        <button onClick={signOut}>로그아웃하기</button>
      </>
    );
  }

  return (
    <div>
      <h2>회원만 입장할 수 있는 채팅앱입니다. 로그인 해주세요</h2>

      <div>
        <div onClick={() => navigate("/signup")}>회원가입하기</div>
        <div onClick={() => navigate("/signin")}>로그인하기</div>
      </div>
    </div>
  );
}

export default MainPage;
