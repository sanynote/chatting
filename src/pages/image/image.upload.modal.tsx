import React, { ChangeEvent } from "react";
import "./image.css";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { SET_IMAGE } from "../../api/auth/api.image";
import imageCompression from "browser-image-compression";

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

  const closeButton = () => {
    setIsModal(false);
  };

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
      const { status, data } = await SET_IMAGE("profileImage", compressedFile);

      if (status === 201) {
        if (user) {
          setUser({ ...user, profileImage: data.response.location[0] });
          alert("프로필사진 변경에 성공했습니다.");
          setIsModal(false);
        }
      }
    } catch (e) {
      console.log(e, "e");
      alert("프로필사진 변경에 실패했습니다.");
    }
  };
  if (!isModal) return null;
  return (
    <div className="modalArea">
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

      <div onClick={closeButton}>모달 끄기</div>
    </div>
  );
}

export default ImageUploadModal;
