import { IUtils } from "../interfaces/utils.interface";
import { Utils } from "../utils";

export class DistancesUseCase {
    private utils: IUtils

    constructor() {
        this.utils = new Utils();
    }

    async execute({ lat, lon, coordinates }: { 
        lat: number; 
        lon: number; 
        coordinates: {
            latitude: number;
            longitude: number;
        }[]
    }): Promise<string[]> {
        if (!lat || !lon) {
            throw new Error("Latitude and longitude are required");
        }

        const distances = coordinates.map((point, index) => {
            const distance = this.utils.haversine({
                lat1: lat,
                lon1: lon,
                lat2: point.latitude,
                lon2: point.longitude,
            });

            return `Ponto ${index + 1} (Latitude ${point.latitude}, Longitude ${point.longitude}) - Distância ${Math.round(distance)}m`;
        });

        return distances;
    }
}