import React, { useState } from 'react';
import dayjs from 'dayjs';
import MyMap from '../../components/Map/MyMap';
import { newsApi } from '../../services/newsApi';
import NewsCard from '../../components/NewsCard/NewsCard';
import s from './MapPage.module.scss';
import { INews } from '../../models/INews';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MapPageDay: React.FC = () => {
  const { data: newsGuardianLastDay } = newsApi.useGetNewsGuardianLastDayQuery("");
  const [selectedItem, setSelectedItem] = useState<INews | null>(null);
  const navigate = useNavigate()

  const handleOpenCard = (item: INews) => {
    setSelectedItem(item);
  };

  const handleCloseCard = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Helmet>
        <title>Карта за день</title>
      </Helmet>

      <div className={s.container}>
        <div className={s.buttons}>
          <button onClick={() => navigate("/map_week")}>Неделя</button>
          <button onClick={() => navigate("/map")}>Все время</button>
        </div>

        <div className={s.sidebar}>
          {newsGuardianLastDay ? (
            <>
              {newsGuardianLastDay.result.map((item: INews) => {
                return (
                  <div key={item.id} className={s.item} onClick={() => handleOpenCard(item)}>
                    <div className={s.title}>{item.title_ru}</div>
                    <div>Дата: {dayjs(item.date).format('DD-MM-YYYY')}</div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>

        <div className={s.map}>
          <MyMap data={newsGuardianLastDay} />
        </div>

        {selectedItem && (
          <div className={s.overlay}>
            <NewsCard item={selectedItem} onClose={handleCloseCard} />
          </div>
        )}
      </div><div className={s.container}>
        <div className={s.buttons}>
          <button onClick={() => navigate("/map_week")}>Неделя</button>
          <button onClick={() => navigate("/map")}>Все время</button>
        </div>

        <div className={s.sidebar}>
          {newsGuardianLastDay ? (
            <>
              {newsGuardianLastDay.result.map((item: INews) => {
                return (
                  <div key={item.id} className={s.item} onClick={() => handleOpenCard(item)}>
                    <div className={s.title}>{item.title_ru}</div>
                    <div>Дата: {dayjs(item.date).format('DD-MM-YYYY')}</div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>

        <div className={s.map}>
          <MyMap data={newsGuardianLastDay} />
        </div>

        {selectedItem && (
          <div className={s.overlay}>
            <NewsCard item={selectedItem} onClose={handleCloseCard} />
          </div>
        )}
      </div>
    </>

  );
};

export default MapPageDay;
