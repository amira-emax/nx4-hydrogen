import {createContext, type ReactNode, useContext, useState} from 'react';

export type SheetType = 'search' | 'cart' | 'mobile' | 'closed';

type SheetContextValue = {
  type: SheetType;
  open: (mode: SheetType) => void;
  close: () => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

export function SheetProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<SheetType>('closed');

  return (
    <SheetContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const sheet = useContext(SheetContext);
  if (!sheet) {
    throw new Error('useSheet must be used within an SheetProvider');
  }
  return sheet;
}
