import React from "react";
import { useForm } from "react-hook-form";
import { SIGN_IN } from "../../api/auth/api.user";
import { useRecoilState } from "recoil";
import { UserInfo } from "../../store/auth/user.info";

function SignIn() {
  const [user, setUser] = useRecoilState(UserInfo);
  const { register, handleSubmit } = useForm();
  React.useEffect(() => {
    console.log(user, "user");
  }, [user]);
  const onSubmit = async (signInFormData: any) => {
    console.log(signInFormData);
    try {
      const { status, data } = await SIGN_IN(signInFormData);

      if (status) {
        console.log(status, "status");
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
      }
    } catch (e) {
      console.log(e, "에러");
    }
  };
  return (
    <div>
      <h3>로그인페이지</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="accountId">아이디</label>
        <input
          id="accountId"
          type="text"
          placeholder="test@email.com"
          {...register("accountId")}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="****************"
          {...register("password")}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default SignIn;
