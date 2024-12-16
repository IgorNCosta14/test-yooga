import axios from 'axios';
import {
  IGoogleMapsAdapter,
  INearbySearchResponse,
} from '../interfaces/googleMapsAdapter.interface';

export class GoogleMapsAdapter implements IGoogleMapsAdapter {
  async fetchNearbyPlaces({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }): Promise<INearbySearchResponse> {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

    const params = {
      location: `${lat},${lon}`,
      rankby: 'distance',
      type: 'store',
      key: process.env.GOOGLE_MAPS_API_KEY,
    };

    const response = await axios
      .get<INearbySearchResponse>(url, { params })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(`Error when searching: ${err.message}`);
      });

    return response;
  }
}
