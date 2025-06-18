import React from "react";
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { step2Store } from '../state/store';
import type { Coordinates } from '../state/step2State';

// Simple placeholder map component using Leaflet
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export function Step2() {
  const state = useSnapshot(step2Store);
  const [map, setMap] = useState<L.Map>();

  useEffect(() => {
    if (!map) {
      const m = L.map('map').setView([48.77, 9.18], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(m);
      setMap(m);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if ((layer as any).options?.attribution !== undefined) return;
        map.removeLayer(layer);
      });
      state.customTargets.forEach((target) => {
        L.marker([target.coordinates.lat, target.coordinates.lon], { icon: L.icon({ iconUrl: 'orange-marker.png' }) })
          .addTo(map!)
          .bindPopup(target.label);
      });
    }
  }, [map, state.customTargets]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Step 2: Zielauswahl</h2>
      <div id="map" style={{ height: 400 }} aria-label="Karte" />
    </div>
  );
}
