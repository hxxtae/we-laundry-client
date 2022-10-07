import NonUserRouter from './routers/NonUserRouter';
import ThemeButton from './components/ThemeButton';
import LoginLoading from './pages/Login/LoginLoading';
import { useAuthFetch } from './hooks';

interface IAuthContextProps {
  children: JSX.Element;
}

function AuthContext({ children }: IAuthContextProps) {
const { user, isLoading } = useAuthFetch();

  return (
    <>
      {isLoading ? <LoginLoading /> :
        user ? children :
          <NonUserRouter />
      }
      <ThemeButton />
    </>
  )
}

export default AuthContext;
