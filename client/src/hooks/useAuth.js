import { useSelector } from 'react-redux';

export function useAuth() {
  const user = useSelector(state => state.user);
  const { email, id, name, token, surname } = user;

  return {
    isAuth: !!email,
    id,
    name,
    email,
    surname,
    token
  }

}
