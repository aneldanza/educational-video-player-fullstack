import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchBaseQueryMeta,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Video, VideoData } from "../types";

// const baseUrl = "/";
const baseUrl = "/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => headers.set("Content-Type", "application/json"),
});

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: baseQuery,
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    getVideosByUserId: builder.query<{ videos: VideoData[] }, string>({
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
    uploadVideo: builder.mutation<any, { video: Video; csrfToken: string }>({
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
    getVideoById: builder.query<{ video: VideoData }, string>({
      query: (id) => `/videos/${id}`,
    }),
    getImagePaths: builder.query({
      query: () => '/videos/get_image_paths'
    }),
    getCommentsByVideoId: builder.query<{comments: any}, string>({
      query: (videoId) => `comments?video_id=${videoId}`
    })
  }),
});

export const {
  useGetVideosByUserIdQuery,
  useUploadVideoMutation,
  useGetVideoByIdQuery,
  useGetImagePathsQuery,
  useGetCommentsByVideoIdQuery
} = videosApi;
