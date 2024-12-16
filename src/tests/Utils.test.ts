import { Utils } from '../utils';
import fs from 'fs';

jest.mock('fs');

describe('Utils - Test haversine method', () => {
  const utils = new Utils();

  it('should calculate the distance between two pairs of coordinates', () => {
    const distance = utils.haversine({
      lat1: 0,
      lon1: 0,
      lat2: 0,
      lon2: 1,
    });

    expect(distance).toBeCloseTo(111195, 0);
  });

  it('should return an error if the latitude is out of range', () => {
    expect(() => {
      utils.haversine({
        lat1: 100,
        lon1: 0,
        lat2: 0,
        lon2: 1,
      });
    }).toThrow(
      'Invalid coordinates. Ensure latitudes are between -90 and 90, and longitudes are between -180 and 180.',
    );
  });

  it('should return an error if the longitude is out of range', () => {
    expect(() => {
      utils.haversine({
        lat1: 0,
        lon1: 200,
        lat2: 0,
        lon2: 1,
      });
    }).toThrow(
      'Invalid coordinates. Ensure latitudes are between -90 and 90, and longitudes are between -180 and 180.',
    );
  });
});

describe('Utils - Test validateCoordinatesFile method', () => {
  const utils = new Utils();

  it('should return true if the coordinates file is valid', () => {
    const mockFileContent = `Latitude Longitude\n-22.951321545009705, -43.21040413125191\n40.43214447302087, 116.57037490892017`;

    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = utils.validateCoordinatesFile({ fileName: 'validFile.txt' });

    expect(result).toBe(true);
  });

  it('should return false if the coordinates file is invalid', () => {
    const mockFileContent = `Latitude Longitude\naaaaa, bbbbb`;

    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = utils.validateCoordinatesFile({
      fileName: 'invalidFile.txt',
    });

    expect(result).toBe(false);
  });

  it('should return false if the coordinates file does not exist', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });

    const result = utils.validateCoordinatesFile({
      fileName: 'nonExistentFile.txt',
    });

    expect(result).toBe(false);
  });
});

describe('Utils - Test readCoordinatesFile method', () => {
  const utils = new Utils();

  it('should correctly parse a valid coordinates file', () => {
    const mockFileContent = `Latitude Longitude\n-90, -180\n90, 180`;
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = utils.readCoordinatesFile({ fileName: 'validFile.txt' });

    expect(result).toEqual([
      { latitude: -90, longitude: -180 },
      { latitude: 90, longitude: 180 },
    ]);
  });

  it('should return an empty array if the file is empty', () => {
    const mockFileContent = `Latitude Longitude`;
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = utils.readCoordinatesFile({ fileName: 'emptyFile.txt' });

    expect(result).toEqual([]);
  });

  it('should return an error if the parse fails', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => {
      utils.readCoordinatesFile({ fileName: 'nonExistentFile.txt' });
    }).toThrow('Failed to read coordinates file.');
  });
});
