import { inject, injectable } from "tsyringe";
import { IDistancesUseCaseResponse, IGoogleMapsAdapter } from "../interfaces/googleMapsAdapter.interface";

@injectable()
export class NearbyUseCase {
    constructor(
        @inject("GoogleMapsAdapter")
        private googleMapsAdapter: IGoogleMapsAdapter
    ) {}

    async execute({ lat, lon, coordinates }: { 
        lat: number; 
        lon: number; 
        coordinates: {
            latitude: number;
            longitude: number;
        }[]  
    }): Promise<IDistancesUseCaseResponse[]> {
        if (!lat || !lon) {
            throw new Error("Latitude and longitude are required");
        }

        const points: IDistancesUseCaseResponse[] = [];

        for (let index = 0; index < coordinates.length; index++) {
            const point = coordinates[index];

            const nearbyPlaces = await this.googleMapsAdapter.fetchNearbyPlaces({ 
                lat: point.latitude, 
                lon: point.longitude 
            });

            points.push({
                point: index + 1,
                coordinates: {
                    latitude: point.latitude,
                    longitude: point.longitude,
                },
                nearbyPlaces
            })
        };

        return points;
    }
}