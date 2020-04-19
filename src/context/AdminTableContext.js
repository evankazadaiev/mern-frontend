import { createContext } from 'react';


export const AdminTableContext = createContext({
  filters: {
    search: ''
  },
  setFilters: () => {}
});
