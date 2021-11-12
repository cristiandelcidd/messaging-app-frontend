/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_APIKEY: string;
  readonly VITE_FIREBASE_AUTHDOMAIN: string;
  readonly VITE_FIREBASE_PROJECTID: string;
  readonly VITE_FIREBASE_STORAGEBUCKET: string;
  readonly VITE_FIREBASE_MESSAGINGSENDERID: string;
  readonly VITE_FIREBASE_APPID: string;

  readonly VITE_PUSHER_CLUSTER: string;
  readonly VITE_PUSHER_APPKEY: string;

  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
