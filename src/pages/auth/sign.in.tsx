import React from "react";
import { useForm } from "react-hook-form";
import { SIGN_IN } from "../../api/auth/api.sign.in";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function SignIn() {
  const [user, setUser] = useRecoilState(UserInfo);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (signInFormData: any) => {
    console.log(signInFormData);
    try {
      const { status, data } = await SIGN_IN(signInFormData);

      if (status) {
        const { response } = data;
        localStorage.setItem(
          process.env.REACT_APP_ACCESS_TOKEN!,
          response.accessToken
        );
        localStorage.setItem(
          process.env.REACT_APP_REFRESH_TOKEN!,
          response.refreshToken
        );
        setUser(response);
        alert("로그인에 성공했습니다. 채팅방으로 이동합니다.");
        navigate("/chat");
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const code = e.response.status;
        if (code === 400) alert("아이디 또는 비밀번호가 잘못되었습니다.");
        if (code === 500) alert("서버에러");
      } else {
        throw new Error("예상하지 못한 에러,,");
      }
    }
  };

  if (user)
    return (
      <div>
        이미 로그인 된 상태입니다.{" "}
        <button onClick={() => navigate("/")}>메인페이지로 돌아가기</button>
      </div>
    );

  return (
    <div>
      <h3>로그인페이지</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="accountId">아이디</label>
          <input
            id="accountId"
            type="text"
            placeholder="아이디를 입력하세요"
            {...register("accountId")}
          />
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default SignIn;
