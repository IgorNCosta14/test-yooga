import axios from 'axios';
import { IFetchNearbyPlacesResponse, IGoogleMapsAdapter } from '../interfaces/googleMapsAdapter.interface';

export class GoogleMapsAdapter implements IGoogleMapsAdapter {
    async fetchNearbyPlaces({ lat, lon }: { lat: number; lon: number; }): Promise<IFetchNearbyPlacesResponse[]> {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

        const params = {
            location: `${lat},${lon}`,
            rankby: 'distance',
            type: 'store',
            key: process.env.GOOGLE_MAPS_API_KEY
        };

        const response = await axios.get(url, { params }).then((res) => {
            return res.data
        }).catch((err) => {
            throw new Error(`Error when searching: ${err.message}`)
        });

        return response.results.slice(0, 5).map((place: any) => ({
            name: place.name,
            address: place.vicinity,
            location: place.geometry.location,
        }));
    }
}