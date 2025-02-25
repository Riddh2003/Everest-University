import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext({
  isOpenForSideBar: true,
  toggleSidebar: () => { }
});

export const ThemeProvider = ({ children }) => {
  const [isOpenForSideBar, setIsOpenForSideBar] = useState(true);

  const toggleSidebar = () => {
    setIsOpenForSideBar(prevState => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isOpenForSideBar, toggleSidebar, setIsOpenForSideBar }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
