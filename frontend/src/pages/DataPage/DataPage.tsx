import React, { useState, ChangeEvent, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import s from './DataPage.module.scss'
import NewsItem from '../../components/NewsItem/NewsItem'
import { newsApi } from '../../services/newsApi'
import { Pagination } from '@mui/material'

export interface INewsItem {
    doc_id: string
    title_en: string
    title_ru: string
    date: string
    href: string
    image: string
    country: string[]
    city: string[]
}

const DataPage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
    const [_lastSearch, setLastSearch] = useState<{ message: string } | null>(null);

    const {
        data: news,
        refetch
    } = newsApi.useGetElasticDataQuery(page);

    const [search, {
        data: searchNews,
    }] = newsApi.usePostSearchNewsMutation();

    useEffect(() => {
        if (isSearchActive) {
            refetch()
        }
    }, [searchNews, refetch, isSearchActive])

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        if (!isSearchActive) {
            refetch();
        }
    };

    const handleSearch = async () => {
        const params = { message: searchQuery }
        await search(params)
        setLastSearch(params);
        setIsSearchActive(true)
    }

    // const refetchSearchResults = () => {
    //     if (lastSearch) {
    //         search(lastSearch)
    //     }
    // }

    const handleReset = () => {
        setSearchQuery("")
        setIsSearchActive(false)
        refetch()
    }

    const totalPages = news?.total_pages || 0

    return (
        <>
            <div className={s.inputContainer}>
                <TextField
                    className={s.searchInput}
                    label="Поиск новостей"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button className={s.button} variant="contained" color="primary" onClick={handleSearch}>
                    Поиск
                </Button>
                <Button className={s.button} variant="outlined" color="secondary" onClick={handleReset}>
                    Сброс
                </Button>
            </div>
            <div className={s.container}>
                {!isSearchActive && news && news.results.map((item: INewsItem) => (
                    <NewsItem news={item} key={item.doc_id} 
                    // refetch={refetch} 
                    />
                ))}
                {isSearchActive && searchNews && searchNews.results.map((item: INewsItem) => (
                    <NewsItem news={item} key={item.doc_id} 
                    // refetch={refetchSearchResults} 
                    />
                ))}
            </div>
            {!isSearchActive && (
                <div className={s.pagination}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}
        </>
    )
}

export default DataPage
