import {create} from 'zustand';

interface StoreState {
  isloggedIn: boolean; // 상태

  // actions
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

// 토큰 관리
export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>(set => ({
  isloggedIn: getToken() ? true : false, // 초기값

  storeLogin: (token: string) => {
    set({isloggedIn: true});
    setToken(token);
  },
  storeLogout: () => {
    set({isloggedIn: false});
    window.location.href = '/login';
    removeToken();
  },
}));
