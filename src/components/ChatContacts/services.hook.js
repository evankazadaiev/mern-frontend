import React, { useState, useEffect } from "react";
import {useHttp} from "../../hooks/http.hook";

export const useServices = () => {
  const [rooms, setRooms] = useState(null);
  const { request, loading } = useHttp();
  
  const getRooms = async () => {
    const req = {
      url: 'chat/rooms',
      method: 'GET'
    };
    
    const { rooms } = await request(req);
    setRooms(rooms);
    console.log(rooms);
    return rooms;
  };


  useEffect(() => {
    // getRooms();
  }, [])

  return { getRooms, rooms, loading }
};

export default useServices;
