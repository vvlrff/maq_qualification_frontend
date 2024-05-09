import { useState, useEffect } from "react";
import Loading from "./Loading";
import NewsMap from "./NewsMap";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";
import Legend from "./Legend";

const MyMap = ({ data }: { data: any }) => {
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const loadCountriesTask = new LoadCountriesTask(data.result, setCountries);
      loadCountriesTask.load();
    }
  }, [data]);

  return (
    <>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <>
          <NewsMap countries={countries} />
          <Legend />
        </>
      )}
    </>
  );
};

export default MyMap;
