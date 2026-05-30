import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type UptimeContextType = {
  elapsed: number;
};

const UptimeContext = createContext<UptimeContextType | undefined>(undefined);

export const UptimeProvider = ({ children }: { children: ReactNode }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <UptimeContext.Provider value={{ elapsed }}>
      {children}
    </UptimeContext.Provider>
  );
};

export const useUptime = () => {
  const context = useContext(UptimeContext);
  if (context === undefined) {
    throw new Error('useUptime must be used within UptimeProvider');
  }
  return context.elapsed;
};
