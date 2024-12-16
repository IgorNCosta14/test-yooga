export interface IGoogleMapsAdapter {
  fetchNearbyPlaces({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }): Promise<INearbySearchResponse>;
}

export interface IFetchNearbyPlacesResponse {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface IDistancesUseCaseResponse {
  point: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  nearbyPlaces: IFetchNearbyPlacesResponse[];
}

export interface INearbyPlace {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface INearbySearchResponse {
  results: INearbyPlace[];
}
