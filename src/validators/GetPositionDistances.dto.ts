import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class GetPositionDistancesDTO {
    @IsNotEmpty({ message: 'Latitude (lat) is required.' })
    @IsNumber({}, { message: 'Latitude (lat) must be a number.' })
    @Min(-90, { message: 'Latitude (lat) must be between -90 and 90.' })
    @Max(90, { message: 'Latitude (lat) must be between -90 and 90.' })
    @Type(() => Number)
    lat!: number;

    @IsNotEmpty({ message: 'Longitude (lon) is required.' })
    @IsNumber({}, { message: 'Longitude (lon) must be a number.' })
    @Min(-180, { message: 'Longitude (lon) must be between -180 and 180.' })
    @Max(180, { message: 'Longitude (lon) must be between -180 and 180.' })
    @Type(() => Number)
    lon!: number;
}