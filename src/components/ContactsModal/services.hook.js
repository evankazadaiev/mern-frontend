import React, { useCallback } from "react";
import {useHttp} from "../../hooks/http.hook";

export const useServices = () => {
  const { request, loading } = useHttp();
  
  const getUsersTable = async (pageInfo) => {
    const req = {
      url: 'users',
      method: 'GET',
      params: pageInfo
    };
    
    const data = await request(req);
    return data;
  };
  
  const initRoom = async (id) => {
    const req = {
      url: 'chat/rooms/init',
      method: 'POST',
      data: { id }
    };
    const data = await request(req);
    return data;
  };
  
  return { getUsersTable, initRoom, loading }
};

export default useServices;
