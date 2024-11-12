import { AppContext } from '@/utils/context';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { gql, useQuery } from 'urql';

export const GET_USER = gql`
  query User {
    user {
      id
      name
      publicKey
      termsAccepted
      country
      points
    }
  }
`;

function SetContext() {
  const [{ fetching: fetchingCurrentUser, data: userData }, refetchQuery] =
    useQuery({
      query: GET_USER,
      pause: !Cookies.get('token'),
    });
  const { setUser, setFetching } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setFetching?.(fetchingCurrentUser && !userData?.user);
    if (userData?.user) {
      const interval = setInterval(() => {
        refetchQuery({ requestPolicy: 'network-only' });
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [fetchingCurrentUser]);

  useEffect(() => {
    if (!fetchingCurrentUser && userData?.user) {
      setUser?.(userData.user);
      if (
        (!userData?.user?.name || !userData?.user?.country) &&
        pathname !== '/profile'
      ) {
        router.push('/profile');
      } else if (!userData?.user?.termsAccepted) {
        router.push('/disclaimer');
      }
    }
  }, [fetchingCurrentUser, userData]);

  return null;
}

export default SetContext;
