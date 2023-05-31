import React, { ChangeEvent } from "react";
import "./image.css";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
interface Props {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ImageUploadModal({ isModal, setIsModal }: Props) {
  const [user, setUser] = useRecoilState(UserInfo);
  const userProfile = user?.profileImage;
  const [imageFile, setImageFile] = React.useState<File>();

  React.useEffect(() => {
    console.log(imageFile, "ddkdkdk");
  }, [imageFile]);

  const closeButton = () => {
    setIsModal(false);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  if (!isModal) return null;
  return (
    <div className="modalArea">
      <p>
        <img src={userProfile} style={{ width: 100, height: 100 }} />
      </p>

      <input
        type="file"
        id="imageInput"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleImageChange}
      />

      <div onClick={closeButton}>모달 끄기</div>
    </div>
  );
}

export default ImageUploadModal;
