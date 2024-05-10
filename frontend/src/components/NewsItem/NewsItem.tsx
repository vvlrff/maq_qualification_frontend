// import { newsApi } from "../../services/newsApi"
import { INewsItem } from "../../pages/DataPage/DataPage"
import s from "./NewsItem.module.scss"
// import { Button } from "@mui/material"

const NewsItem = ({ news
  // , refetch 
}: { news: INewsItem
  // ; refetch: () => void 
}) => {
  // const [deleteNews] = newsApi.useDeleteNewsByIdMutation()

  // const handleDelete = async (docId: string) => {
  //   await deleteNews({ id: docId })
  //   refetch()
  // }

  return (
    <>

      <section className={s.section}>
        <div className={s.content}>
          <p className={s.text}>{news?.title_ru}</p>
          <p className={s.text}>{news?.title_en}</p>

          <p className={s.text}>Страны: {news?.country}</p>
          <p className={s.text}>Города: {news?.city}</p>

          <div className={s.miscContainer}>
            <div className={s.date}>Дата публикации: {news?.date}</div>
            <a href={news?.href} className={s.source}>Источник: {news?.href}</a>
          </div>

          {/* <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(news.doc_id)}
          >
            Удалить
          </Button> */}
        </div>
      </section>
    </>
  )
}

export default NewsItem
