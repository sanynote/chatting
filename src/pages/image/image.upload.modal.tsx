import React, { ChangeEvent } from "react";
import "./image.css";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { SET_IMAGE } from "../../api/auth/api.image";
interface Props {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ImageUploadModal({ isModal, setIsModal }: Props) {
  const [user, setUser] = useRecoilState(UserInfo);
  const firstImage = user ? user.profileImage : "";
  const [imageUrl, setImageUrl] = React.useState(firstImage);
  const [imageFile, setImageFile] = React.useState<File>();
  const [imageFileBlob, setImageFileBlob] = React.useState("");

  React.useEffect(() => {
    console.log(imageUrl, "ddkdkdk");
  }, [imageUrl]);

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
    console.log(imageUrl, imageFile, imageFileBlob, "랄랄루");
    if (!imageFile) return;

    try {
      // const formData = new FormData();
      // formData.append("kind", "profileImage");
      // formData.append("file", imageFile);

      const { status, data } = await SET_IMAGE("profileImage", imageFile);

      if (status === 201) console.log(status, "success");
    } catch (e) {
      console.log(e, "e");
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
