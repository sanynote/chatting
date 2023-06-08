import React from "react";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import ImageUploadModal from "./image.upload.modal";
import { useNavigate } from "react-router-dom";
import BackButton from "../../common/back.button";

function MyPage() {
  const user = useRecoilValue(UserInfo);
  const [isModal, setIsModal] = React.useState(false);
  const navigate = useNavigate();
  if (!user)
    return (
      <>
        <div>로그인이 필요한 페이지입니다.</div>
        <button onClick={() => navigate("/signin")}>
          로그인 화면으로 돌아가기
        </button>
      </>
    );
  return (
    <>
      <BackButton />
      <div>
        {user?.profileImage ? (
          <p>
            <img src={user?.profileImage} style={{ width: 100, height: 100 }} />
          </p>
        ) : (
          <p>프로필 사진이 없습니다. 설정해보세요</p>
        )}

        <div onClick={() => setIsModal((prevState) => !prevState)}>
          {user?.nickname}님의 프로필 사진 변경하기
        </div>
      </div>
      <ImageUploadModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}

export default MyPage;
