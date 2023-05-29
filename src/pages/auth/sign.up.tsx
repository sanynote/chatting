import React from 'react';
import {useForm} from "react-hook-form";
import {useRecoilState} from "recoil";
import {UserInfo} from "../../store/auth/user.info";
import {useNavigate} from "react-router-dom";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => console.log(data)
  const [user, setUser] = useRecoilState(UserInfo);
  const navigate = useNavigate()

  if (user)
    return <div>이미 로그인 된 상태입니다. <p>로그아웃 후 회원가입을 진행해주세요</p> <button onClick={()=> navigate("/")}>메인페이지로 돌아가 로그아웃진행하기</button></div>;

  return (
    <div>
      <h3>회원가입 페이지</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label htmlFor="accountId">아이디</label>
        <input
          id="accountId"
          type="text"
          placeholder="test@email.com"
          {...register("accountId")}
        />
        <button>중복확인</button></div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임"
            {...register("nickname")}
          />
          <button>중복확인</button></div>
        <div>
          <label htmlFor="phoneNumber">휴대폰 번호</label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="010-1111-1111"
            {...register("phoneNumber")}
          />
          <button>중복확인</button></div>
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
