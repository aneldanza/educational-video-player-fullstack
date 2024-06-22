import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchBaseQueryMeta,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Video, VideoData, CreateComment, CommentData } from "../types";

// const baseUrl = "/";
const baseUrl = "/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => headers.set("Content-Type", "application/json"),
});

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: baseQuery,
  tagTypes: ["Video", "Comment", "Videos"],
  endpoints: (builder) => ({
    getVideosByUserId: builder.query<{ videos: VideoData[] }, string>({
      query: (userId) => {
        return {
          url: "/videos",
          params: { user_id: userId },
        };
      },
      providesTags: ["Videos"],
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
    uploadVideo: builder.mutation<any, { video: Video; token: string }>({
      query: (payload) => {
        return {
          url: "videos",
          method: "post",
          body: JSON.stringify(payload.video),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-Token": payload.token,
          },
        };
      },
      invalidatesTags: ["Videos"],
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
      providesTags: ["Video"]
    }),
    getImagePaths: builder.query({
      query: () => '/videos/get_image_paths'
    }),
    getCommentsByVideoId: builder.query<{comments: CommentData[]}, string>({
      query: (videoId) => `comments?video_id=${videoId}`,
      providesTags: ['Comment']
    }),
    createComment: builder.mutation<any, {comment: CreateComment; token: string}>({
      query: (payload) => {
        return {
          url: "comments",
          method: "post",
          body: JSON.stringify(payload.comment),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-Token": payload.token,
          },
        };
      }, 
      invalidatesTags: ["Comment", "Video"]
    })
  }),
});

export const {
  useGetVideosByUserIdQuery,
  useUploadVideoMutation,
  useGetVideoByIdQuery,
  useGetImagePathsQuery,
  useGetCommentsByVideoIdQuery,
  useCreateCommentMutation
} = videosApi;
