import { IUtils } from '../interfaces/utils.interface';
import { Utils } from '../utils';

export class GetCoordinatesUseCase {
  private utils: IUtils;

  constructor() {
    this.utils = new Utils();
  }

  async execute(fileName: string): Promise<
    {
      latitude: number;
      longitude: number;
    }[]
  > {
    if (!fileName) {
      throw new Error('File name is required');
    }

    const validCoordinatesFile = this.utils.validateCoordinatesFile({
      fileName,
    });

    if (!validCoordinatesFile) {
      throw new Error('The coordinates file is not in a valid format');
    }

    return this.utils.readCoordinatesFile({
      fileName,
    });
  }
}
