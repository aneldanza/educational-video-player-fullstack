import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import {
  uniqueNamesGenerator,
  names,
  colors,
  Config,
} from "unique-names-generator";
import { useCreateCommentMutation } from "../app/createVideosApi";
import { useState } from "react";
import { csrfToken } from "../utils";
import { CreateComment } from "../types";

interface NewCommentProps {
  videoId: string;
}

const customConfig: Config = {
  dictionaries: [names, colors],
  separator: "_",
  length: 2,
};

export const NewComment: React.FC<NewCommentProps> = ({ videoId }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [createComment] = useCreateCommentMutation();

  const handleInputHighlight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(true);
    setValue(e.target.value);
  };

  const handleComment = async () => {
    const userId = uniqueNamesGenerator(customConfig);
    const payload: { token: string; comment: CreateComment } = {
      token: csrfToken(),
      comment: {
        video_id: videoId,
        content: value,
        user_id: userId,
      },
    };

    try {
      await createComment(payload).unwrap();
    } catch (e) {
        console.log('failed to create new comment')
    }
  };

  return (
    <div className="flex flex-row space-x-4">
      <div
        className={`w-full border px-4 py-2 rounded-3xl self-center flex ${
          focused ? "border-black" : "border-gray-300"
        }`}
      >
        <ChatBubbleLeftEllipsisIcon className="w-5 mr-2" />
        <input
          className="outline-transparent"
          onChange={handleInputHighlight}
          value={value}
        />
      </div>
      <div className="primary-btn" onClick={handleComment}>Comment</div>
    </div>
  );
};
