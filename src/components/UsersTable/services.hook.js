import React, { useCallback } from "react";
import {useHttp} from "../../hooks/http.hook";

export const useServices = () => {
  const { request, loading } = useHttp();
  
  const getUsersTable = useCallback(async (pageInfo) => {
    const req = {
      url: 'users',
      method: 'GET',
      params: pageInfo
    };
    
    const data = await request(req);
    return data;
  }, []);
  
  return { getUsersTable, loading }
};

export default useServices;
