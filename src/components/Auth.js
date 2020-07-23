import React, {
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'src/components/SplashScreen';
import { auth, logout } from 'src/store/actions/accountActions';
import authService from 'src/services/authService';
import { adminAuth } from 'src/store/actions/adminAction';

function Auth({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isAdminAuthenticated = useSelector((state) => state.admin.isAdminAuthenticated);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      authService.setAxiosInterceptors({
        onLogout: () => dispatch(logout())
      });
      // authService.handleAuthentication();
      if (isAuthenticated) {
        await dispatch(auth());
      } else if (isAdminAuthenticated) {
        await dispatch(adminAuth());
      }


      // if (authService.isAuthenticated()) {
      //   const user = await authService.loginInWithToken();
      //   console.log("hello");

      // }

      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any
};

export default Auth;
