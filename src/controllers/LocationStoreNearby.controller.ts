import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { container } from "tsyringe";
import { NearbyDTO } from "../validators/nearby.dto";
import { NearbyUseCase } from "../useCase/Nearby.useCase";
import { GetCoordinatesUseCase } from "../useCase/GetCoordinates.useCase";

export class LocationNearbyController {    
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { lat, lon } = req.query;

            const dto = plainToInstance(NearbyDTO, { lat, lon });

            const errors = await validate(dto);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();

                return res.status(400).json({
                    status: "error",
                    message: "Validation error in parameters.",
                    errors: errorMessages 
                });
            }

            const getCoordinatesUseCase = container.resolve(GetCoordinatesUseCase);
            const coordinates = await getCoordinatesUseCase.execute("LatitudeLongitude.txt");
            
            const nearbyUseCase = container.resolve(NearbyUseCase);
            const response = await nearbyUseCase.execute({
                lat: dto.lat,
                lon: dto.lon,
                coordinates
            });
        
            return res.status(200).json({
                status: "success",
                message: "Search for nearby stores successfully executed",
                points: response
            })
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error.",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}