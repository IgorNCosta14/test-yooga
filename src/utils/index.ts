// import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { IHaversine, IUtils } from '../interfaces/utils.interfaces';

export class Utils implements IUtils {
    haversine({ lat1, lon1, lat2, lon2 }: IHaversine): number {
        const EARTH_RADIUS = 6371e3;
        function toRad(value: number): number {
            return (value * Math.PI) / 180;
        }

        const φ1 = toRad(lat1);
        const φ2 = toRad(lat2);
        const Δφ = toRad(lat2 - lat1);
        const Δλ = toRad(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    readCoordinatesFile({ fileName }: { fileName: string; }): { 
        latitude: number; 
        longitude: number;
    }[] {
        const filePath = path.join(__dirname, '../data', fileName);
        const data = fs.readFileSync(filePath, 'utf8');

        return data.split('\n').slice(1).map(line => {
            const [lat, lon] = line.trim().split(' ');

            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        });
    }

    validateCoordinatesFile({ fileName }: { fileName: string; }): boolean {
        try {
            const filePath = path.join(__dirname, '../data', fileName);
            const content = fs.readFileSync(filePath, 'utf-8');

            const lines = content.split('\n').map(line => line.trim());
   
            const isValid = lines.slice(1).every(line => {
                const regex = /^-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?$/;
                return regex.test(line);
            });

            return isValid;
        } catch (error) {
            return false;
        }
    }
}