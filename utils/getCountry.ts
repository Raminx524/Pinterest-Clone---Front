import GetLocation from "react-native-get-location";
import axios from "axios";

export const getCountryFromLocation = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    const { latitude, longitude } = location;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    // Extract country name from response
    const country = response.data.address.country;

    return country;
  } catch (error) {
    console.error("Error getting country:", error);
    return null;
  }
};
