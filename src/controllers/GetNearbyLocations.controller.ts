import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetNearbyLocationsUseCase } from '../useCases/GetNearbyLocations.useCase';
import { GetCoordinatesUseCase } from '../useCases/GetCoordinates.useCase';

export class GetNearbyLocationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const getCoordinatesUseCase = container.resolve(GetCoordinatesUseCase);
      const coordinates = await getCoordinatesUseCase.execute(
        'LatitudeLongitude.txt',
      );

      const getNearbyLocationsUseCase = container.resolve(
        GetNearbyLocationsUseCase,
      );
      const response = await getNearbyLocationsUseCase.execute({
        coordinates,
      });

      return res.status(200).json({
        status: 'success',
        message: 'Search for nearby stores successfully executed',
        points: response,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
