export type Video = {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
};

export type VideoData = {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
  id: string;
  created_at: string;
  num_comments: number;
};

export type CreateComment = {
  video_id: string;
  content: string;
  user_id: string;
};

export type CommentData = {
  user_id: string;
  created_at: string;
  content: string;
  video_id: string;
  id: string;
};
