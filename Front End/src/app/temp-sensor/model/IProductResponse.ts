export interface IProductResponse {
    name: string;
    minTemp: number;
    maxTemp: number;
    airHumidity: number;
    groundHumidity: number;
    notes: string;
    image: string[]
}