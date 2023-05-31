import React from "react";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../store/auth/user.info";

function MyPage() {
  const user = useRecoilValue(UserInfo);
  return (
    <div>
      <p>
        <img src={user?.profileImage} style={{ width: 100, height: 100 }} />
      </p>
      <div>{user?.nickname}님의 프로필 사진 변경하기</div>
    </div>
  );
}

export default MyPage;
