import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "../models/INews";


export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.aicrisismap.ru:8443",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('user') || '{}')?.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Home
    getAllStatistics: builder.query<any, string>({
      query: () => ({
        url: `/data/get_statistics`,
      })
    }),
    getNewsLastDay: builder.query<any, string>({
      query: () => ({
        url: `/data/news_last_24_hours`,
      })
    }),
    getNewsLastWeek: builder.query<any, string>({
      query: () => ({
        url: `/data/news_last_week`,
      })
    }),
    // Map
    getNewsGuardian: builder.query<any, string>({
      query: () => ({
        url: `/data/news_guardian`,
      })
    }),
    getNewsGuardianLastDay: builder.query<any, string>({
      query: () => ({
        url: `/data/news_guardian_last_day`,
      })
    }),
    getNewsGuardianLastWeek: builder.query<any, string>({
      query: () => ({
        url: `/data/news_guardian_last_week`,
      })
    }),
    getNewsById: builder.query<INews, number>({
      query: (id) => ({
        url: `/data/news_guardian/${id}`,
      })
    }),
    // Elastic
    getElasticData: builder.query<any, number>({
      query: (page = 1) => ({
        url: `/elasticsearch/get_elastic_data`,
        params: { page }
      })
    }),
    getElasticNewsById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/elasticsearch/get_by_id/${id}`,
      })
    }),
    postSearchNews: builder.mutation<any, { message: string }>({
      query: ({ message }) => ({
        url: `/elasticsearch/search`,
        method: "POST",
        body: {
          message
        }
      })
    }),
    deleteNewsById: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/elasticsearch/delete/${id}`,
        method: "DELETE",
      })
    }),
  }),
});

export const {
  useGetAllStatisticsQuery,
  useGetNewsLastDayQuery,
  useGetNewsLastWeekQuery,
  useGetNewsGuardianLastDayQuery,
  useGetNewsGuardianLastWeekQuery,
  useGetNewsGuardianQuery,
  useGetNewsByIdQuery,
  useDeleteNewsByIdMutation,
  useGetElasticDataQuery,
  usePostSearchNewsMutation
} = newsApi;