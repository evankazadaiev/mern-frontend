import { createContext } from 'react';

export const ChatContext = createContext({
  activeChatObj: null,
  contacts: null,
  messages: null,
  setActiveChat: () => {},
  setContacts: () => {},
  setMessages: () => {}
});
