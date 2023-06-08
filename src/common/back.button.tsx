import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../assets/back_button.svg";

function BackButton() {
  const navigate = useNavigate();
  const backButtonFunction = () => {
    navigate(-1);
  };

  return (
    <BackArrow onClick={() => backButtonFunction()} style={{ padding: 10 }} />
  );
}

export default BackButton;
