import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import {
  uniqueNamesGenerator,
  names,
  colors,
  Config,
} from "unique-names-generator";
import { Formik, Form } from "formik";
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

  const [createComment] = useCreateCommentMutation();

  const initialValues: { comment: string } = { comment: "" };

  const handleComment = async (content: string) => {
    const userId = uniqueNamesGenerator(customConfig);
    const payload: { token: string; comment: CreateComment } = {
      token: csrfToken(),
      comment: {
        video_id: videoId,
        content: content,
        user_id: userId,
      },
    };

    try {
      await createComment(payload).unwrap();
    } catch (e) {
      console.log("failed to create new comment");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleComment(values.comment);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form className="flex flex-row space-x-4">
            <div
              className={`w-full border px-4 p-2 rounded-3xl self-center flex ${
                focused ? "border-black" : "border-gray-300"
              }`}
            >
              <ChatBubbleLeftEllipsisIcon className="w-5 mr-2" />
              <input
                type="text"
                id="comment"
                name="comment"
                value={props.values.comment}
                onChange={(e) => {
                  props.handleChange(e);
                  setFocused(true);
                }}
                className="outline-transparent w-full"
              />
            </div>
            <button type="submit" className="primary-btn">
              Comment
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
