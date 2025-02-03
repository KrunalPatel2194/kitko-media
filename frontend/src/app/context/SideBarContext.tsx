import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
  language: 'en' | 'fr';
  toggleSidebar: () => void;
  toggleLanguage: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: true,
  language: 'en',
  toggleSidebar: () => {},
  toggleLanguage: () => {}
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <SidebarContext.Provider value={{ 
      isSidebarOpen, 
      language, 
      toggleSidebar, 
      toggleLanguage 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);