'use client';
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux-store';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/client';
import { setUser } from '../redux-store/userSlice';
import ReduxProvider from '../redux-store/ReduxProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider>{children}</ReduxProvider>
    </ApolloProvider>
  );
}