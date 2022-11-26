declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string
      NEXT_PUBLIC_MAPBOX_MAP_LIGHT_STYLE: string;
      NEXT_PUBLIC_MAPBOX_MAP_DARK_STYLE: string;
      NEXT_PUBLIC_API_URL: string
    }
  }
}

export {}
