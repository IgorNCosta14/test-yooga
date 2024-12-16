import { Router } from 'express';
import { GetNearbyLocationsController } from '../controllers/GetNearbyLocations.controller';
import { GetPositionDistancesController } from '../controllers/GetPositionDistances.controller';

export const router = Router();

const getPositionDistancesController = new GetPositionDistancesController();
const getNearbyLocationsController = new GetNearbyLocationsController();

router.get('/distances', getPositionDistancesController.handle);
router.get('/nearby', getNearbyLocationsController.handle);
