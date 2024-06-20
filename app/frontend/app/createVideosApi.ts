import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchBaseQueryMeta,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Video } from "../types";

const baseUrl = "/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => headers.set("Content-Type", "application/json"),
});

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: baseQuery,
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    getVideosByUserId: builder.query<{ videos: Video[] }, string>({
      query: (userId) => {
        return {
          url: "/videos",
          params: { user_id: userId },
        };
      },
      providesTags: ["Video"],
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
    uploadVideo: builder.mutation<any, { video: any; csrfToken: string }>({
      query: (payload) => {
        return {
          url: "videos",
          method: "post",
          body: JSON.stringify(payload.video),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-Token": payload.csrfToken,
          },
        };
      },
      invalidatesTags: ["Video"],
      transformErrorResponse: (
        val: FetchBaseQueryError,
        meta: FetchBaseQueryMeta | undefined,
        arg: any
      ) => {
        console.log(val);
        console.log(meta);
        console.log(arg);
      },
    }),
    getVideoById: builder.query<any, string>({
      query: (id) => `/videos/single?video_id=${id}`,
      transformErrorResponse: (
        val: FetchBaseQueryError,
        meta: FetchBaseQueryMeta | undefined,
        arg: string
      ) => {
        console.log(val);
        console.log(meta);
        console.log(arg);
      },
      transformResponse: (res) => console.log(res)
    })
  }),
});

export const { useGetVideosByUserIdQuery, useUploadVideoMutation, useGetVideoByIdQuery } = videosApi;
