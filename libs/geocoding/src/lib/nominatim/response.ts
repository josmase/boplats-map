export interface GeocodingResponse {
  type: string;
  licence: string;
  features: GeocodingFeature[];
}

export interface GeocodingFeature {
  queryId: string;
  type: string;
  properties: {
    place_id: number;
    osm_type: string;
    osm_id: number;
    place_rank: number;
    category: string;
    type: string;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
  };
  bbox: [number, number, number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}
