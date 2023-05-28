import React from "react";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";

function MainPage() {
  React.useEffect(() => {
    console.log(user, "user");
  });
  const user = useRecoilValue(UserInfo);
  const navigate = useNavigate();
  if (user) return <div>채팅방으로 이동하기</div>;

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
