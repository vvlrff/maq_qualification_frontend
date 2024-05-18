import { MapContainer as Map, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import "./NewsMap.scss";

interface CountryFeature {
  type: string;
  properties: {
    ADMIN: string;
    color: string;
    text: string[];
  };
}

interface NewsMapProps {
  countries: GeoJsonObject;
}

const NewsMap: React.FC<NewsMapProps> = ({ countries }) => {

  const mapStyle: React.CSSProperties = {
    height: "calc(90vh - 80px)",
    display: "flex",
    alignItems: "stretch",
  };

  const onEachCountry = (country: CountryFeature, layer: L.Layer) => {
    const name = country.properties.ADMIN;
    const textWithIndices = country.properties.text
      .map((oneText, index) => `${index + 1}. ${oneText}`)
      .join('<br>');
    layer.bindPopup(`<div style="font-weight: bold;">${name}</div> <div>${textWithIndices}</div>`);
  };

  const style = (feature: any) => {
    return {

      fillColor: feature.properties.color,
      weight: 1,
      color: "black",
      fillOpacity: 1,
    };
  };


  return (
    <Map
      style={mapStyle}
      zoom={2}
      center={[45, 0]}
    >
      <GeoJSON
        style={style}
        data={countries}
        onEachFeature={onEachCountry}
      />
    </Map>
  );
};

export default NewsMap;