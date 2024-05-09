import { useParams } from "react-router-dom";
import { newsApi } from "../../services/newsApi";
import s from "./IdPage.module.scss";


const IdPage = () => {
    const { id } = useParams();
    const docId = String(id);

    const { data } = newsApi.useGetElasticNewsByIdQuery({ id: docId });

    return (
        <section className={s.section}>
            <div className={s.content}>
                <p className={s.text}>{data?.document.title_ru}</p>
                <p className={s.text}>{data?.document.title_en}</p>
                <div>Страны: {data?.document.country.join(", ")}</div>
                <div>Города: {data?.document.city.join(", ")}</div>
                <div className={s.miscContainer}>
                    <div className={s.date}>Дата публикации: {data?.document.date}</div>
                    <a href={data?.document.href} className={s.source}>Источник: {data?.document.href}</a>
                </div>
            </div>
        </section>
    );
};

export default IdPage;
