import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { newsApi } from "../../services/newsApi";
import s from "./HomePage.module.scss";

interface GraphData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}

interface TextData {
  href: string;
  id: number;
  predicted_class: number;
  title_en: string;
  title_ru: string;
  date: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage: React.FC = () => {

  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [textData, setTextData] = useState<TextData[]>([]);

  const { data: dataAllStatistics } = newsApi.useGetAllStatisticsQuery("");
  const { data: dataLastDay, isLoading: isLoadingLastDay } = newsApi.useGetNewsLastDayQuery("");
  const { data: dataLastWeek } = newsApi.useGetNewsLastWeekQuery("");

  useEffect(() => {
    if (!isLoadingLastDay && dataLastDay) {
      updateGraphAndText(dataLastDay, dataLastDay.data);
    }
  }, [dataLastDay, isLoadingLastDay]);

  const updateGraphAndText = (statisticsData: any, textData?: TextData[]) => {
    if (statisticsData?.statistics) {
      const { predicted_class_0, predicted_class_1 } = statisticsData.statistics;
      setGraphData({
        labels: ["Всего новостей", "Выявлено угроз"],
        datasets: [
          {
            data: [predicted_class_0 + predicted_class_1, predicted_class_1],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      });
    }

    if (textData) {
      setTextData(textData);
    }
  };

  return (
    <div className={s.container}>

      ТЕСТТТТТ
      <div className={s.buttonGroup}>
        <button onClick={() => updateGraphAndText(dataAllStatistics)}>Все время</button>
        <button onClick={() => updateGraphAndText(dataLastWeek, dataLastWeek?.data)}>Последняя неделя</button>
        <button onClick={() => updateGraphAndText(dataLastDay, dataLastDay?.data)}>Последний день</button>
      </div>
      {graphData && graphData.datasets && (
        <div className={s.chartContainer}>
          <Doughnut data={graphData} />
        </div>
      )}
      {textData && (
        <div className={s.textDataContainer}>
          {textData
          // .slice(0, 30)
          .map((item, index) => (
            <div key={index} className={`${s.textDataItem} ${item.predicted_class === 1 ? s.highlighted : ''}`}>
              {item.title_ru != "" ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.title_ru}</a>
              ) : (
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.title_en}</a>
              )}

              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
