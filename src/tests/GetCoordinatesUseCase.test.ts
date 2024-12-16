import { IUtils } from '../interfaces/utils.interface';
import { GetCoordinatesUseCase } from '../useCases/GetCoordinates.useCase';

describe('GetCoordinatesUseCase', () => {
  let getCoordinatesUseCase: GetCoordinatesUseCase;
  let mockUtils: jest.Mocked<IUtils>;

  beforeEach(() => {
    mockUtils = {
      haversine: jest.fn(),
      readCoordinatesFile: jest.fn(),
      validateCoordinatesFile: jest.fn(),
    };

    getCoordinatesUseCase = new GetCoordinatesUseCase();
    getCoordinatesUseCase['utils'] = mockUtils;
  });

  it('should return an array of coordinates', async () => {
    mockUtils.validateCoordinatesFile.mockReturnValueOnce(true);
    mockUtils.readCoordinatesFile.mockReturnValueOnce([
      { latitude: -22.951321545009705, longitude: -43.21040413125191 },
      { latitude: 30.328676601368205, longitude: 35.44443730801659 },
    ]);

    const result = await getCoordinatesUseCase.execute('validFile.txt');

    expect(result).toEqual([
      { latitude: -22.951321545009705, longitude: -43.21040413125191 },
      { latitude: 30.328676601368205, longitude: 35.44443730801659 },
    ]);

    expect(mockUtils.validateCoordinatesFile).toHaveBeenCalledWith({
      fileName: 'validFile.txt',
    });

    expect(mockUtils.readCoordinatesFile).toHaveBeenCalledWith({
      fileName: 'validFile.txt',
    });
  });

  it('should return an error if file name is not provided', async () => {
    await expect(getCoordinatesUseCase.execute('')).rejects.toThrow(
      'File name is required',
    );

    expect(mockUtils.validateCoordinatesFile).not.toHaveBeenCalled();

    expect(mockUtils.readCoordinatesFile).not.toHaveBeenCalled();
  });

  it('should return an error if file format is invalid', async () => {
    mockUtils.validateCoordinatesFile.mockReturnValue(false);

    await expect(
      getCoordinatesUseCase.execute('invalidFile.txt'),
    ).rejects.toThrow('The coordinates file is not in a valid format');

    expect(mockUtils.validateCoordinatesFile).toHaveBeenCalledWith({
      fileName: 'invalidFile.txt',
    });

    expect(mockUtils.readCoordinatesFile).not.toHaveBeenCalled();
  });
});
