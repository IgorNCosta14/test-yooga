import { Router } from "express";
import { LocationDistancesController } from "../controllers/LocationsDistances.controller";
import { LocationNearbyController } from "../controllers/LocationStoreNearby.controller";

export const router = Router();

const locationDistancesController = new LocationDistancesController();
const locationNearbyController = new LocationNearbyController();

router.get("/distances", locationDistancesController.handle);
router.get("/nearby", locationNearbyController.handle);