import { Request, Response } from "express";
import { DistancesUseCase } from "../useCases/Distances.userCase";
import { plainToInstance } from "class-transformer";
import { DistancesDTO } from "../validators/distances.dto";
import { validate } from "class-validator";
import { container } from "tsyringe";
import { GetCoordinatesUseCase } from "../useCases/GetCoordinates.useCase";

export class LocationDistancesController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { lat, lon } = req.query;

            const dto = plainToInstance(DistancesDTO, { lat, lon });

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

            const distancesUseCase = container.resolve(DistancesUseCase);
            const response = await distancesUseCase.execute({
                lat: dto.lat,
                lon: dto.lon,
                coordinates
            });
        
            return res.status(200).json({
                status: "success",
                message: "Distances calculated successfully.",
                distances: response
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