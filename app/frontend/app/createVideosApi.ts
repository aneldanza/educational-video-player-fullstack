import {
    createApi,
    fetchBaseQuery,
    // BaseQueryFn,
    // FetchArgs,
  } from "@reduxjs/toolkit/query/react";
  import type {
    FetchBaseQueryMeta,
    FetchBaseQueryError,
  } from "@reduxjs/toolkit/query";
  import { Video } from "../types";
  
  const baseUrl = "/api/v1";
  
  const baseQuery = fetchBaseQuery({
    baseUrl,
    // credentials: "same-origin",
    prepareHeaders: (headers) => headers.set("Content-Type", "application/json"),
  });
  
//   const baseQueryWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
//   > = async (args, api, extraOptions) => {
//     return await baseQuery(args, api, extraOptions);
//   };
  
  export const videosApi = createApi({
    reducerPath: "videosApi",
    baseQuery: baseQuery,
    tagTypes: ['Video'],
    endpoints: (builder) => ({
      getVideosByUserId: builder.query<{videos: Video[]}, string>({
        query: (userId) => {
          return {
            url: "/videos",
            params: { user_id: userId },
          };
        },
        providesTags: ['Video'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformResponse: (res: any) => {
            return res
        },
        transformErrorResponse: (
          val: FetchBaseQueryError,
          meta: FetchBaseQueryMeta | undefined,
          arg: string
        ) => {
          console.log(val);
          console.log(meta);
          console.log(arg);
        },
      }),
      uploadVideo: builder.mutation<any, {video: any, csrfToken: string}>({
        query: (payload) => {
            return {
                url: "videos",
                method: 'post',
                body: JSON.stringify(payload.video),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-Token": payload.csrfToken,
                }
            }
        },
        invalidatesTags: ['Video'],
        transformResponse: (res: any) => {
            return res;
        },
        transformErrorResponse: (
            val: FetchBaseQueryError,
            meta: FetchBaseQueryMeta | undefined,
            arg: any
          ) => {
            console.log(val);
            console.log(meta);
            console.log(arg);
          },
      })
    }),
  });
  
  export const { useGetVideosByUserIdQuery, useUploadVideoMutation } = videosApi;