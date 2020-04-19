import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import MODES from '../../constants/modes';

export const useFormInitials = (mode, userById, getUserById) => {
  const userId = useParams().id;
  const [ready, setReady] = useState(false);
  const [formInitials, setFormInitials] = useState({ username: '', name: '', surname: '', email: '', password: '', passwordConfirmation: '' });

  useEffect(() => {
    console.log(userById);
    let isSubscribed = true;
    if(mode === MODES.UPDATE && isSubscribed) {
      const prefillForm = async () => {
        setReady(false);
        try {
          const { email, name, surname } = userById;
          setFormInitials({ email, name, surname, });
          setReady(true);
        } catch (error) {
          setReady(false);
        }
      };
      prefillForm();
    }
    return () => ( isSubscribed = false )
  }, [userId, userById]);

  useEffect(() => {
    mode === MODES.UPDATE && getUserById(userId);
  }, [mode])
  
  return { userId, formInitials, ready }
};
