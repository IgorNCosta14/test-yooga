import { container } from 'tsyringe';
import { IGoogleMapsAdapter } from '../interfaces/googleMapsAdapter.interface';
import { GoogleMapsAdapter } from '../adapters/GoogleMaps.adapter';

container.registerSingleton<IGoogleMapsAdapter>(
  'GoogleMapsAdapter',
  GoogleMapsAdapter,
);
