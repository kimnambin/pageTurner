import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {SignupStyle} from './Signup';
import {useAuth} from '../hooks/useAuth';
import React from 'react';

export interface SignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const {userResetPassword, resetPWrq, userResetRequest} = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    resetPWrq ? userResetPassword(data) : userResetRequest(data);
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register('email', {required: true})}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>

          {resetPWrq && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register('password', {required: true})}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요.</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="small" scheme="primary">
              {resetPWrq ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export default ResetPassword;
