import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64415ca7792fe886a8a59c82.mockapi.io/api' //using mockapi
    }),
  tagTypes: ['Heroes'],
  endpoints: builder => ({
    getHeroes: builder.query({
      query: () => '/heroes',
      providesTags: ['Heroes']
    }),
    createHero: builder.mutation({
      query: hero => ({
        url: '/heroes',
        method: 'POST',
        body: hero
      }),
      invalidatesTags: ['Heroes']
    }),
    deleteHero: builder.mutation({
      query: id => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes']
    })
  })
})

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
} = apiSlice
