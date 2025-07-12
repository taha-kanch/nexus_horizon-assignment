"use client";
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './index';
import { setUser } from './userSlice';

function UserLoader({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        dispatch(setUser(JSON.parse(user)));
      }
    }
  }, [dispatch]);
  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <UserLoader>{children}</UserLoader>
    </Provider>
  );
} 