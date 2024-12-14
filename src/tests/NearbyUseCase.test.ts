import { IGoogleMapsAdapter } from "../interfaces/googleMapsAdapter.interface";
import { NearbyUseCase } from "../useCase/Nearby.useCase";

describe("NearbyUseCase", () => {
    let nearbyUseCase: NearbyUseCase;
    let mockGoogleMapsAdapter: jest.Mocked<IGoogleMapsAdapter>;

    beforeEach(() => {
        mockGoogleMapsAdapter = {
            fetchNearbyPlaces: jest.fn()
        };

        nearbyUseCase = new NearbyUseCase(mockGoogleMapsAdapter);
    });

    it("should return nearby places for each coordinate", async () => {
        mockGoogleMapsAdapter.fetchNearbyPlaces.mockResolvedValue({
            results: [
                {
                    name: "Place 1",
                    vicinity: "Address 1",
                    geometry: {
                        location: {
                            lat: 1,
                            lng: 1
                        }
                    }
                }, {
                    name: "Place 2",
                    vicinity: "Address 2",
                    geometry: {
                        location: {
                            lat: 2,
                            lng: 2
                        }
                    }
                }, {
                    name: "Place 3",
                    vicinity: "Address 3",
                    geometry: {
                        location: {
                            lat: 3,
                            lng: 3
                        }
                    }
                }, {
                    name: "Place 4",
                    vicinity: "Address 4",
                    geometry: {
                        location: {
                            lat: 4,
                            lng: 4
                        }
                    }
                }, {
                    name: "Place 5",
                    vicinity: "Address 5",
                    geometry: {
                        location: {
                            lat: 5,
                            lng: 5
                        }
                    }
                }
            ]
        });

        const coordinates = [
            { latitude: -22.951321545009705, longitude: -43.21040413125191 },
            { latitude: 30.328676601368205, longitude: 35.44443730801659 },
        ];

        const result = await nearbyUseCase.execute({ coordinates });

        expect(result).toEqual([
            {
                point: 1,
                coordinates: { latitude: -22.951321545009705, longitude: -43.21040413125191 },
                nearbyPlaces: [
                    { name: "Place 1", address: "Address 1", location: { lat: 1, lng: 1 } },
                    { name: "Place 2", address: "Address 2", location: { lat: 2, lng: 2 } },
                    { name: "Place 3", address: "Address 3", location: { lat: 3, lng: 3 } },
                    { name: "Place 4", address: "Address 4", location: { lat: 4, lng: 4 } },
                    { name: "Place 5", address: "Address 5", location: { lat: 5, lng: 5 } }
                ]
            },
            {
                point: 2,
                coordinates: { latitude: 30.328676601368205, longitude: 35.44443730801659 },
                nearbyPlaces: [
                    { name: "Place 1", address: "Address 1", location: { lat: 1, lng: 1 } },
                    { name: "Place 2", address: "Address 2", location: { lat: 2, lng: 2 } },
                    { name: "Place 3", address: "Address 3", location: { lat: 3, lng: 3 } },
                    { name: "Place 4", address: "Address 4", location: { lat: 4, lng: 4 } },
                    { name: "Place 5", address: "Address 5", location: { lat: 5, lng: 5 } }
                ]
            }
        ]);

        expect(mockGoogleMapsAdapter.fetchNearbyPlaces).toHaveBeenCalledTimes(2);

        expect(mockGoogleMapsAdapter.fetchNearbyPlaces).toHaveBeenCalledWith({ 
            lat: -22.951321545009705, 
            lon: -43.21040413125191 
        });

        expect(mockGoogleMapsAdapter.fetchNearbyPlaces).toHaveBeenCalledWith({ 
            lat: 30.328676601368205, 
            lon: 35.44443730801659 
        });
    });

    it("should return an error if the search for nearby places fails", async () => {
        mockGoogleMapsAdapter.fetchNearbyPlaces.mockRejectedValue(
            new Error("Error when searching: Google Maps API error")
        );

        const coordinates = [
            { latitude: -22.951321545009705, longitude: -43.21040413125191 }
        ];

        await expect(
            nearbyUseCase.execute({ coordinates })
        ).rejects.toThrow("Error when searching: Google Maps API error");

        expect(mockGoogleMapsAdapter.fetchNearbyPlaces).toHaveBeenCalledTimes(1);

        expect(mockGoogleMapsAdapter.fetchNearbyPlaces).toHaveBeenCalledWith({ 
            lat: -22.951321545009705, 
            lon: -43.21040413125191
        });
    });
})