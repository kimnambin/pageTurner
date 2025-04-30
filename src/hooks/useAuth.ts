import {login, resetPassword, resetRequest, signup} from '../api/auth.api';
import {LoginProps} from '../pages/Login';
import {useAuthStore} from '../store/authStore';
import useAlert from './useAlert';
import {useNavigate} from 'react-router-dom';
import {SignupProps} from '../pages/Signup';
import {useState} from 'react';

export const useAuth = () => {
  // 상태
  const {storeLogin, storeLogout, isloggedIn} = useAuthStore();
  const {showAlert} = useAlert();
  const nav = useNavigate();

  // 메서드
  const userLogin = (data: LoginProps) => {
    login(data).then(
      res => {
        // 상태 변화
        storeLogin(res.token);

        showAlert('로그인 성공!!');
        nav('/');
      },
      () => {
        showAlert('로그인 실패 ㅠㅠ');
      },
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then(() => {
      showAlert('성공!!');
      nav('/login');
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호 초기화 되었습니다.');
      nav('/login');
    });
  };

  const [resetPWrq, setResetPWrq] = useState(false);

  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetPWrq(true);
    });
  };

  // 리턴
  return {
    userLogin,
    userSignup,
    userResetPassword,
    resetPWrq,
    userResetRequest,
  };
};
