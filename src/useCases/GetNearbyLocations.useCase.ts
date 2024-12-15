import { inject, injectable } from "tsyringe";
import { IDistancesUseCaseResponse, IGoogleMapsAdapter } from "../interfaces/googleMapsAdapter.interface";

@injectable()
export class GetNearbyLocationsUseCase {
    constructor(
        @inject("GoogleMapsAdapter")
        private googleMapsAdapter: IGoogleMapsAdapter
    ) {}

    async execute({ coordinates }: { 
        coordinates: {
            latitude: number;
            longitude: number;
        }[]
    }): Promise<IDistancesUseCaseResponse[]> {
        const points: IDistancesUseCaseResponse[] = [];

        for (let index = 0; index < coordinates.length; index++) {
            const point = coordinates[index];

            const nearbyPlaces = await this.googleMapsAdapter.fetchNearbyPlaces({
                lat: point.latitude,
                lon: point.longitude
            });

            const formattedNearbyPlaces = nearbyPlaces.results.slice(0, 5).map((place: any) => ({
                name: place.name,
                address: place.vicinity,
                location: place.geometry.location,
            }));

            points.push({
                point: index + 1,
                coordinates: {
                    latitude: point.latitude,
                    longitude: point.longitude,
                },
                nearbyPlaces: formattedNearbyPlaces
            })
        };

        return points;
    }
}