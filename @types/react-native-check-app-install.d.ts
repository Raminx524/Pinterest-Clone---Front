declare module "react-native-check-app-install" {
  const CheckAppInstall: {
    isAppInstalled: (packageName: string) => Promise<boolean>;
    APP_PACKAGE_NAMES: {
      WHATSAPP: string;
      MESSENGER: string;
      [key: string]: string; // Дополнительно, если есть другие пакеты
    };
  };
  export default CheckAppInstall;
}
