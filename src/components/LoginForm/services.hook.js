import React, {useContext, useCallback} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

import { successNotify, errorNotify } from '../../utils/toast.utils';

const useServices = (notify) => {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  
  const handleLogin = useCallback(async (values) => {
    try {
      const req = {
        url: 'auth/login',
        method: 'POST',
        data: {...values},
      };
      const data = await request(req);
      await auth.login(data.token, data.refreshToken, data.id);
      if(notify) successNotify('Login successful!');
      return data;
    } catch (e) {
      return errorNotify('Error occured!')
    }
  }, [request]);
  
  return { handleLogin, loading }
};

export default useServices;
