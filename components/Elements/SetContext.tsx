import { AppContext } from '@/utils/context';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { gql, useQuery } from 'urql';

export const GET_USER = gql`
  query User {
    user {
      id
      name
      publicKey
    }
  }
`;

function SetContext() {
  const [{ fetching: fetchingCurrentUser, data: userData }] = useQuery({
    query: GET_USER,
    pause: !Cookies.get('token'),
  });
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    if (!fetchingCurrentUser && userData?.user) {
      setUser?.(userData.user);
    }
  }, [fetchingCurrentUser, userData]);

  return null;
}

export default SetContext;
