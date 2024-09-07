import { Pin } from "@/app/(tabs)";
import api from "@/utils/api.service";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface PinContextProps {
  pins: Pin[] | null;
  setPins: React.Dispatch<React.SetStateAction<Pin[] | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getCurrentPin: (currentId: string) => Pin | null;
  getPrevPin: (currentId: string) => Pin | null;
  getNextPin: (currentId: string) => Pin | null;
  //   opacityOverlay: number;
  //   setOpacityOverlay: React.Dispatch<React.SetStateAction<number>>;
  //   changeOpacity: (opacity: number) => void;
}

export const PinContext = createContext<PinContextProps>({
  pins: null,
  setPins: () => null,
  currentPage: 1,
  setCurrentPage: () => null,
  getCurrentPin: (currentId: string) => null,
  getPrevPin: (currentId: string) => null,
  getNextPin: (currentId: string) => null,
  //   opacityOverlay: 1,
  //   setOpacityOverlay: () => null,
  //   changeOpacity: () => null,
});

interface PinContextProviderProps {
  children: ReactNode;
}

export const PinContextProvider = ({ children }: PinContextProviderProps) => {
  const [pins, setPins] = useState<Pin[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [opacityOverlay, setOpacityOverlay] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let link =
          "https://66d09bc0181d059277df2c5f.mockapi.io/api/pin?limit=10&page=" +
          currentPage;

        // console.log(link);
        // console.log((currentPage - 1) * 10 + 1);
        let rest = await api.get("/pin");
        console.log(rest.data);

        const response = await fetch(link);
        const json = rest.data as Pin[];
        pins ? setPins([...pins, ...json]) : setPins(json);

        // console.log({ json });
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      console.log({ pins });
    };
    fetchData();
  }, [currentPage]);

  const getCurrentPin = (currentId: string) => {
    return pins?.find((pin) => pin._id === currentId) || null;
  };

  const getPrevPin = (currentId: string) => {
    const currentIndex = pins?.findIndex((pin) => pin._id === currentId);
    if (currentIndex) {
      const prevIndex = currentIndex - 1;
      return pins ? pins[prevIndex] : null;
    }
    return null;
  };
  const getNextPin = (currentId: string) => {
    const currentIndex = pins?.findIndex((pin) => pin._id === currentId);
    if (currentIndex) {
      const nextIndex = currentIndex + 1;
      return pins ? pins[nextIndex] : null;
    }
    return null;
  };

  //   const changeOpacityTab = (opacity: number) => {
  //     setOpacityOverlay(opacity);
  //   };

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
        // opacityOverlay,
        // setOpacityOverlay,
        // changeOpacity: changeOpacityTab,
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
