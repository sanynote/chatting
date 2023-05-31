import React from "react";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import ImageUploadModal from "./image.upload.modal";

function MyPage() {
  const user = useRecoilValue(UserInfo);
  const [isModal, setIsModal] = React.useState(false);
  return (
    <>
      <div>
        <p>
          <img src={user?.profileImage} style={{ width: 100, height: 100 }} />
        </p>
        <div onClick={() => setIsModal((prevState) => !prevState)}>
          {user?.nickname}님의 프로필 사진 변경하기
        </div>
      </div>
      <ImageUploadModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}

export default MyPage;
