import { Pin } from "@/app/(tabs)";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PinContextProps {
  pins: Pin[] | null;
  setPins: React.Dispatch<React.SetStateAction<Pin[] | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getCurrentPin: (currentId: any) => Pin | null;
  getPrevPin: (currentId: any) => Pin | null;
  getNextPin: (currentId: any) => Pin | null;
}

export const PinContext = createContext<PinContextProps>({
  pins: null,
  setPins: () => null,
  currentPage: 1,
  setCurrentPage: () => null,
  getCurrentPin: (currentId: any) => null,
  getPrevPin: (currentId: any) => null,
  getNextPin: (currentId: any) => null,
});

interface PinContextProviderProps {
  children: ReactNode;
}

export const PinContextProvider = ({ children }: PinContextProviderProps) => {
  const [pins, setPins] = useState<Pin[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let link =
          "https://66d09bc0181d059277df2c5f.mockapi.io/api/pin?limit=10&page=" +
          currentPage;

        // console.log(link);
        // console.log((currentPage - 1) * 10 + 1);

        const response = await fetch(link);
        const json = (await response.json()) as Pin[];
        pins ? setPins([...pins, ...json]) : setPins(json);

        console.log({ json });
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      console.log({ pins });
    };
    fetchData();
  }, [currentPage]);

  const getCurrentPin = (currentId) => {
    return pins
      ? pins.find((pin) => pin.id === currentId)
        ? pins.find((pin) => pin.id === currentId)
        : null
      : null;
  };

  const getPrevPin = (currentId) => {
    const currentIndex = pins?.findIndex((pin) => pin.id === currentId);
    const prevIndex = currentIndex - 1;
    return pins ? pins[prevIndex] : null;
  };
  const getNextPin = (currentId) => {
    const currentIndex = pins?.findIndex((pin) => pin.id === currentId);
    const nextIndex = currentIndex + 1;
    return pins ? pins[nextIndex] : null;
  };

  return (
    <PinContext.Provider
      value={{
        pins,
        setPins,
        currentPage,
        setCurrentPage,
        getCurrentPin,
        getPrevPin,
        getNextPin,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const usePinContext = (): PinContextProps => {
  const context = useContext(PinContext);
  if (context === undefined) {
    throw new Error("registerContext must be used within a RegisterProvider");
  }
  return context;
};
