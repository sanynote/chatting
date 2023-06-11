import React, { ChangeEvent } from "react";
import "./image.css";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { SET_IMAGE } from "../../api/auth/api.image";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import BackButton from "../../common/back.button";

interface Props {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1024,
};

function ImageUploadModal({ isModal, setIsModal }: Props) {
  const [user, setUser] = useRecoilState(UserInfo);
  const firstImage = user ? user.profileImage : "";
  const [imageUrl, setImageUrl] = React.useState(firstImage);
  const [imageFile, setImageFile] = React.useState<File>();
  const [isImageSave, setIsImageSave] = React.useState(false);

  React.useEffect(() => {
    if (!isImageSave) setTimeout(() => setIsModal(false), 100);
  }, [isImageSave]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    // 미리보기 url 생성
    setImageFile(e.target.files[0]);
    // 이미지 file 자체
  };
  const changeImageButton = async () => {
    if (!imageFile) return;

    try {
      const compressedFile = await imageCompression(imageFile, options);
      setIsImageSave(true);
      const { status, data } = await SET_IMAGE("profileImage", compressedFile);

      if (status === 201) {
        if (user) {
          setUser({ ...user, profileImage: data.response.location[0] });
          alert("프로필사진 변경에 성공했습니다.");
          setIsImageSave(false);
        }
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 401) alert("권한이 없어 작업을 진행할 수 없습니다.");
        if (code === 422) alert("데이터 형식이 일치하지 않습니다.");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
      }
      alert("프로필사진 변경에 실패했습니다.");
    }
  };
  const navigate = useNavigate();
  if (!isModal) return null;
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
    <div className="modalArea">
      <BackButton />
      <p>
        {imageUrl && <img src={imageUrl} style={{ width: 100, height: 100 }} />}
      </p>
      <input
        type="file"
        id="imageInput"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleImageChange}
      />

      <div onClick={changeImageButton}>프로필 사진 변경하기 확정!</div>
    </div>
  );
}

export default ImageUploadModal;
