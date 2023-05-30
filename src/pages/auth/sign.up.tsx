import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";
import {
  CERTIFICATION_PHONE,
  CHECK_ACCOUNT_ID,
  CHECK_NICKNAME,
} from "../../api/auth/api.sign.up";
import { AxiosError } from "axios";

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [user, setUser] = useRecoilState(UserInfo);
  const [isIdLocked, setIsIdLocked] = React.useState(false);
  const [isNicknameLocked, setIsNicknameLocked] = React.useState(false);
  const [isPhoneLocked, setIsPhoneLocked] = React.useState(false);
  const navigate = useNavigate();

  const duplicateId = async () => {
    const accountIdCheck = getValues("accountId");
    try {
      const { status, data } = await CHECK_ACCOUNT_ID(accountIdCheck);
      if (status === 200) {
        setIsIdLocked(data.response["validateAccountId"]);
        alert("사용가능한 아이디입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 409) {
        alert("이미 존재하는 아이디입니다.");
      }
    }
  };

  const duplicateNickname = async () => {
    const nicknameCheck = getValues("nickname");
    try {
      const { status, data } = await CHECK_NICKNAME(nicknameCheck);
      if (status === 200) {
        setIsNicknameLocked(data.response["validateNickname"]);
        alert("사용가능한 닉네임입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 409) {
        alert("이미 존재하는 닉네임입니다.");
      }
    }
  };

  const duplicatePhone = async () => {
    const phoneNumberCheck = getValues("phoneNumber");
    try {
      const { status, data } = await CERTIFICATION_PHONE(phoneNumberCheck);
      if (status === 200) {
        setIsPhoneLocked(data.response["validatePhone"]);
        alert("사용가능한 핸드폰 번호 입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 409) {
        alert("이미 존재하는 번호입니다.");
      }
    }
  };

  if (user)
    return (
      <div>
        이미 로그인 된 상태입니다. <p>로그아웃 후 회원가입을 진행해주세요</p>{" "}
        <button onClick={() => navigate("/")}>
          메인페이지로 돌아가 로그아웃진행하기
        </button>
      </div>
    );

  return (
    <div>
      <h3>회원가입 페이지</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <>
            <label htmlFor="accountId">아이디</label>
            <input
              disabled={isIdLocked}
              id="accountId"
              type="text"
              placeholder="accountId"
              {...register("accountId", {
                required: "아이디를 입력해주세요",
                pattern: {
                  value: /^[A-za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/,
                  message: "아이디 형식에 맞지 않습니다.",
                },
              })}
            />
            <button disabled={isIdLocked} onClick={duplicateId}>
              중복확인
            </button>
            {errors?.accountId?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="nickname">닉네임</label>
            <input
              disabled={isNicknameLocked}
              id="nickname"
              type="text"
              placeholder="닉네임"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,12}$/,
                  message: "닉네임 형식에 맞지 않습니다.",
                },
              })}
            />
            <button onClick={duplicateNickname} disabled={isNicknameLocked}>중복확인</button>
            {errors?.nickname?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="phoneNumber">휴대폰 번호</label>
            <input
              disabled={isPhoneLocked}
              id="phoneNumber"
              type="text"
              placeholder="010-1111-1111"
              {...register("phoneNumber", {
                required: "핸드폰 번호를 입력해주세요",
                pattern: {
                  value: /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/,
                  message: "번호 형식에 맞지 않습니다.",
                },
              })}
            />
            <button onClick={duplicatePhone} disabled={isPhoneLocked} >중복확인</button>
            {errors?.phoneNumber?.message}
          </>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="****************"
            {...register("password")}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="****************"
            {...register("confirmPassword")}
          />
        </div>
        <button type="submit">회원가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
