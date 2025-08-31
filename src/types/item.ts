export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  geometry: GeoJSON.Point;
  }