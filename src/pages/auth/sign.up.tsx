import React from 'react';
import {useForm} from "react-hook-form";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => console.log(data)
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default SignUp;
