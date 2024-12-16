export interface IHaversine {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export interface IUtils {
  haversine({ lat1, lon1, lat2, lon2 }: IHaversine): number;
  readCoordinatesFile({ fileName }: { fileName: string }): {
    latitude: number;
    longitude: number;
  }[];
  validateCoordinatesFile({ fileName }: { fileName: string }): boolean;
}
