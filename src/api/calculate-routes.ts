import { Hono } from 'hono';

export interface RouteRequest {
  origin: { lat: number; lon: number };
  destinations: { lat: number; lon: number }[];
  profile: 'car' | 'bike' | 'foot';
}

export interface RouteResponse {
  routes: Array<{
    destination: string;
    distance: number;
    duration: number;
    geometry: any;
  }>;
}

const app = new Hono();

app.post('/api/calculate-routes', async (c) => {
  const body = (await c.req.json()) as RouteRequest;
  // TODO: integrate OSRM
  const result: RouteResponse = {
    routes: body.destinations.map((dest, idx) => ({
      destination: String(idx),
      distance: 0,
      duration: 0,
      geometry: null,
    })),
  };
  return c.json(result);
});

export default app;
