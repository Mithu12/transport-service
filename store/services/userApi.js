import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://limadi-api.atiar.info/api/v1', prepareHeaders: (headers, {getState}) => {
            const {token} = getState().userInfo
            headers.set('app-role', 'company')
            headers.set('Content-Type', 'application/json')
            if (token)
                headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `auth/login`, method: 'POST', body,
            }),
            invalidatesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),
        getFilterData: builder.query({
            query: () => ({
                url: `company/filter-management/get-filters`, method: 'GET',
            }),
            providesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),
        addNewFilter: builder.mutation({
            query: (body) => ({
                url: `company/filter-management/add`, method: 'POST', body
            }),
            invalidatesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),
        updateFilter: builder.mutation({
            query: (body) => ({
                url: `company/filter-management/update`, method: 'POST', body
            }),
            invalidatesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),
        deleteFilter: builder.mutation({
            query: (body) => ({
                url: `company/filter-management/delete`, method: 'POST', body
            }),
            invalidatesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),
        searchByFilter: builder.query({
            query: (body) => ({
                url: `company/cloud-request/request-search`, method: 'POST', body
            }),
            // invalidatesTags: ['Filters'],
            transformResponse(response, meta, arg) {
                return response.data
            }
        }),

    }),

})


export const {
    useLoginMutation,
    useGetFilterDataQuery,
    useAddNewFilterMutation,
    useUpdateFilterMutation,
    useDeleteFilterMutation,
    useSearchByFilterQuery
} = userApi