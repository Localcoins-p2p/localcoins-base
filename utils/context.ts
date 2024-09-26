import { createContext } from 'react';

export interface IUser {
  id: string;
  name: string;
  publicKey: string;
}
export interface IAppContext {
  context: {
    user?: IUser;
  };
  setUser?: (user: IUser) => void;
}

export const AppContext = createContext<IAppContext>({ context: {} });
