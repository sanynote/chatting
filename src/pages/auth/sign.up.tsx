import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";
import {
  CERTIFICATION_PHONE,
  CHECK_ACCOUNT_ID,
  CHECK_NICKNAME,
  SIGN_UP,
} from "../../api/auth/api.sign.up";
import { AxiosError } from "axios";
import BackButton from "../../common/back.button";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (datas: any) => {
    try {
      console.log(datas, "datas");
      const { status, data } = await SIGN_UP(datas);
      if (status === 201) {
        alert("회원가입에 성공했습니다. 로그인페이지로 이동합니다.");
        navigate("/signin");
      }
    } catch (e) {
      console.log(e, "e");
    }
  };

  const [user, setUser] = useRecoilState(UserInfo);
  const [accountIdLocked, setAccountIdLocked] = React.useState(false);
  const [nicknameLocked, setNicknameLocked] = React.useState(false);
  const [phoneLocked, setPhoneLocked] = React.useState(false);
  const [isMarketing, setIsMarketing] = React.useState(false);

  const navigate = useNavigate();

  const accountIdValue = watch("accountId");
  const nicknameValue = watch("nickname");
  const phoneValue = watch("phone");

  const lockIdDuplicateButton = () => {
    if (accountIdLocked) return true;
    if (!(accountIdValue && errors?.accountId?.message === undefined))
      return true;
    return false;
  };

  const lockNicknameDuplicateButton = () => {
    if (nicknameLocked) return true;
    if (!(nicknameValue && errors?.nickname?.message === undefined))
      return true;
    return false;
  };

  const lockPhoneDuplicateButton = () => {
    if (phoneLocked) return true;
    if (!(phoneValue && errors?.phone?.message === undefined)) return true;
    return false;
  };

  const duplicateId = async () => {
    try {
      const { status, data } = await CHECK_ACCOUNT_ID(accountIdValue);
      if (status === 200) {
        setAccountIdLocked(data.response["validateAccountId"]);
        alert("사용가능한 아이디입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 409) alert("이미 존재하는 아이디입니다.");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
      }
    }
  };

  const duplicateNickname = async () => {
    try {
      const { status, data } = await CHECK_NICKNAME(nicknameValue);
      if (status === 200) {
        setNicknameLocked(data.response["validateNickname"]);
        alert("사용가능한 닉네임입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 409) alert("이미 존재하는 닉네임입니다.");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
      }
    }
  };

  const duplicatePhone = async () => {
    try {
      const { status, data } = await CERTIFICATION_PHONE(phoneValue);
      if (status === 200) {
        setPhoneLocked(data.response["validatePhone"]);
        alert("사용가능한 핸드폰 번호 입니다.");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 409) alert("이미 가입된 번호입니다.");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
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
      <BackButton />
      <h3>회원가입 페이지</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <>
            <label htmlFor="accountId">아이디</label>
            <input
              disabled={accountIdLocked}
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
            <button
              type="button"
              disabled={lockIdDuplicateButton()}
              onClick={duplicateId}
            >
              중복확인
            </button>
            {errors?.accountId?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="nickname">닉네임</label>
            <input
              disabled={nicknameLocked}
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
            <button
              type="button"
              onClick={duplicateNickname}
              disabled={lockNicknameDuplicateButton()}
            >
              중복확인
            </button>
            {errors?.nickname?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="phone">휴대폰 번호</label>
            <input
              disabled={phoneLocked}
              id="phone"
              type="text"
              placeholder="010-1111-1111"
              {...register("phone", {
                required: "핸드폰 번호를 입력해주세요",
                pattern: {
                  value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
                  message: "번호 형식에 맞지 않습니다.",
                },
              })}
            />
            <button
              type="button"
              onClick={duplicatePhone}
              disabled={lockPhoneDuplicateButton()}
            >
              중복확인
            </button>
            {errors?.phone?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="****************"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "비밀번호는 최소 8자, 하나 이상의 문자, 숫자 및 특수문자입니다.",
                },
              })}
            />
            {errors?.password?.message}
          </>
        </div>
        <div>
          <>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="****************"
              {...register("confirmPassword", {
                required: "비밀번호를 입력해주세요",
                validate: {
                  check: (val) => {
                    if (watch("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "비밀번호는 최소 8자, 하나 이상의 문자, 숫자 및 특수문자입니다.",
                },
              })}
            />
            {errors?.confirmPassword?.message}
          </>
        </div>
        <input
          id="isMarketing"
          type="checkbox"
          {...register("isMarketing", { value: isMarketing })}
          onClick={() => setIsMarketing((prevState) => !prevState)}
        />
        <label>마케팅 수신동의</label>

        <div>
          <button type="submit">회원가입하기</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
