export interface Coordinates {
  lat: number;
  lon: number;
}

export interface CustomTarget {
  id: string;
  label: string;
  coordinates: Coordinates;
}

export interface Step2State {
  mode: 'praesidium' | 'custom';
  selectedReviere: string[];
  customTargets: CustomTarget[];
  selectedPraesidium: string | null;
  searchQuery: string;
  isLoading: boolean;
  geocodingCache: Map<string, Coordinates>;
}
