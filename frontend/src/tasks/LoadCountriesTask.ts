import legendItems from "../entities/LegendItems";
import countriesData from "../data/countries.json";
import { INews } from "../models/INews";

interface CountryData {
  type: string;
  features: CountryFeature[];
}

interface CountryFeature {
  type: string;
  properties: {
    color: string;
    text: string[];
    ADMIN: string;
    ISO_A3: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

class LoadCountryTask {
  newsData: INews[];
  setState: (state: any) => void;

  constructor(newsData: INews[], setState: (state: any) => void) {
    this.newsData = newsData;
    this.setState = setState;
  }

  load = () => {
    this.processData(this.newsData);
  };

  processData = (newsCountries: INews[]) => {

    if (!countriesData || !(countriesData as CountryData).features) {
      console.error("Countries data is not loaded");
      return;
    }

    for (let i = 0; i < (countriesData as CountryData).features.length; i++) {
      const country = (countriesData as CountryData).features[i];
      let textData: string[] = [];

      for (let j = 0; j < newsCountries.length; j++) {
        if (newsCountries[j].country.includes(country.properties.ADMIN)) {
          textData.push(newsCountries[j].title_ru);
        }
      }

      country.properties.text = textData;

      this.setCountryColor(country);
    }

    this.setState((countriesData as CountryData).features);
  };

  setCountryColor = (country: CountryFeature) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.text.length)
    );

    if (legendItem != null) {
      country.properties.color = legendItem.color;
    }
  };
}

export default LoadCountryTask;
