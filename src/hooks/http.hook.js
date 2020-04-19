import {useState, useCallback, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { http } from '../http';
import axios from 'axios';

export const useHttp = () => {
  // const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (request) => {
    const {
      url,
      method = 'GET',
      data = {},
      headers = {},
      params = {},
    } = request;
    
    setLoading(true);
    try {
      let options = {
        url,
        method,
        headers
      };
      
      if (data) options.data = data;

      if(params) options.params = params;

      if(headers) options.headers = headers;
      
      // if (body) {
      //   body = JSON.stringify(body);
      //   headers['Content-Type'] = 'application/json';
      // }
      // headers['Authorization'] = token ?? '';
      try {
        const req = await http.request(options);
        setLoading(false);
        return req;
      } catch (error) {
        setLoading(false);
      }
      // const data = await response.json();
      //
      // if(!response.ok) {
      //   throw new Error(data.message || 'Something went wrong');
      // }
    } catch(e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);
  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError }
};
