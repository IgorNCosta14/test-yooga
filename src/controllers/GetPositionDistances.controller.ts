import { Request, Response } from "express";
import { GetPositionDistancesUseCase } from "../useCases/GetPositionDistances.useCase";
import { plainToInstance } from "class-transformer";
import { GetPositionDistancesDTO } from "../validators/GetPositionDistances.dto";
import { validate } from "class-validator";
import { container } from "tsyringe";
import { GetCoordinatesUseCase } from "../useCases/GetCoordinates.useCase";

export class GetPositionDistancesController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { lat, lon } = req.query;

            const dto = plainToInstance(GetPositionDistancesDTO, { lat, lon });

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

            const getPositionDistancesUseCase = container.resolve(GetPositionDistancesUseCase);
            const response = await getPositionDistancesUseCase.execute({
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