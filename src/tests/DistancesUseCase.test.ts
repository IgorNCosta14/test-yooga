import { DistancesUseCase } from "../useCase/Distances.userCase";
import { IUtils } from "../interfaces/utils.interfaces";

describe("DistancesUseCase", () => {
    let distancesUseCase: DistancesUseCase;
    let mockUtils: jest.Mocked<IUtils>;

    beforeEach(() => {
        mockUtils = {
            haversine: jest.fn(),
            readCoordinatesFile: jest.fn(),
            validateCoordinatesFile: jest.fn(),
        };

        distancesUseCase = new DistancesUseCase();
        distancesUseCase['utils'] = mockUtils;
    });

    it("should calculate the distance between the coordinates", async () => {
        mockUtils.haversine.mockReturnValueOnce(1751405).mockReturnValueOnce(1981551);

        const coordinates = [
            { latitude: -22.951321545009705, longitude: -43.21040413125191 },
            { latitude: 30.328676601368205, longitude: 35.44443730801659 },
        ];

        const result = await distancesUseCase.execute({
            lat: -20.316635319330466,
            lon: -40.29026198968673,
            coordinates,
        });

        expect(result).toEqual([
            "Ponto 1 (Latitude -22.951321545009705, Longitude -43.21040413125191) - Distância 1751405m",
            "Ponto 2 (Latitude 30.328676601368205, Longitude 35.44443730801659) - Distância 1981551m",
        ]);

        expect(mockUtils.haversine).toHaveBeenCalledTimes(2);
        expect(mockUtils.haversine).toHaveBeenCalledWith({
            lat1: -20.316635319330466,
            lon1: -40.29026198968673,
            lat2: -22.951321545009705,
            lon2: -43.21040413125191,
        });
        expect(mockUtils.haversine).toHaveBeenCalledWith({
            lat1: -20.316635319330466,
            lon1: -40.29026198968673,
            lat2: 30.328676601368205,
            lon2: 35.44443730801659,
        });
    });

    it("should calculate the distance between the coordinates", async () => {
        await expect(
            distancesUseCase.execute({
                lat: 1,
                lon: undefined as unknown as number,
                coordinates: [],
            })
        ).rejects.toThrow("Latitude and longitude are required");
    });

    it("should return an empty list if there are no coordinates", async () => {
        const result = await distancesUseCase.execute({
            lat: 5,
            lon: 10,
            coordinates: [],
        });

        expect(result).toEqual([]);
        expect(mockUtils.haversine).not.toHaveBeenCalled();
    });

})