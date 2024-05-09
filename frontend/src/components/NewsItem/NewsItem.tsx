import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { newsApi } from "../../services/newsApi"
import { INewsItem } from "../../pages/DataPage/DataPage"
import s from "./NewsItem.module.scss"
import { Button } from "@mui/material"

const NewsItem = ({ news, refetch }: { news: INewsItem; refetch: () => void }) => {
  const [deleteNews] = newsApi.useDeleteNewsByIdMutation()

  const handleDelete = async (docId: string) => {
    await deleteNews({ id: docId })
    setTimeout(() => refetch(), 200)
  }

  return (
    <>
      <Link to={`/data/${news.doc_id}`} className={s.link}>
      <div key={news.doc_id} className={s.item}>
        <div className={s.textContainer}>
          <div className={s.title}>{news.title_ru}</div>
          <div className={s.text}>en: {news.title_en}</div>
          {/* <div>Страны: {news.country.length > 1 ? (
            news.country.map((country: string) => <span key={country}> {country}</span>)
          ) : (
            <span>{news.country}</span>
          )}</div>
          <div>Города: {news.city.join(", ")}</div> */}
          <div className={s.date}>Дата: {
          dayjs(news.date).format('DD-MM-YYYY HH:mm:ss')}</div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(news.doc_id)}
          >
            Удалить
          </Button>
        </div>
      </div>
      </Link>
    </>
  )
}

export default NewsItem
