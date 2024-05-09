import React from 'react';
import dayjs from 'dayjs';
import s from './NewsCard.module.scss';

interface NewsCardProps {
  item: {
    id: number;
    title_ru: string;
    title_en: string;
    date: string;
    image: string;
    city: string[];
    href: string;
    country: string[];
  };
  onClose: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onClose }) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className={`${s.modal} ${s.open}`} onClick={onClose}>
      <div className={s.modalContent} onClick={handleModalClick}>
        <div className={`${s.title} ${s.bold}`}>{item.title_ru}</div>
        <div className={`${s.title} ${s.bold}`}>{item.title_en}</div>
        {item.country.length > 0 && (
          <div className={s.title}>Страны: {item.country.join(', ')}</div>
        )}
        {item.city.length > 0 && (
          <div className={s.title}>Города: {item.city.join(', ')}</div>
        )}
        <a href={item.href} className={s.title}>{item.href}</a>
        <div>Дата: {dayjs(item.date).format('DD.MM.YYYY')}</div>
      </div>
    </div>
  );
};

export default NewsCard;
