import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productsApi = createApi ({
    reducerPath:"productsApi",
    tagTypes:['products'],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    endpoints:(builder) => ({
        getAllProducts:builder.query({
            query:() => "/products",
            providesTags: (result) => 
                result
                ? [...result.map(() => ({type: 'products'})), {type: 'products',},]
                : [{type: 'products'}]
        }),
        addProducts:builder.mutation({
            query:(newData) => ({
                url:"/products",
                method:"POST",
                body:newData
            }),
            invalidatesTags: ['products']
        }),
        deleteProduct:builder.mutation({
            query:(id) => ({
                url:`/products/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['products']
        }),
        editProduct:builder.mutation({
            query:({id, ...updateData}) => ({
                url:`/products/${id}`,
                method: 'PUT',
                body:updateData
            })   
        }),
        invalidatesTags: ['products']
    })
})

export const {useGetAllProductsQuery, useAddProductsMutation, useDeleteProductMutation, useEditProductMutation } = productsApi