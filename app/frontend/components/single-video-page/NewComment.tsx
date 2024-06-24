import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import {
  uniqueNamesGenerator,
  names,
  colors,
  Config,
} from "unique-names-generator";
import { Formik, Form } from "formik";
import { useCreateCommentMutation } from "../../app/createVideosApi";
import { csrfToken } from "../../utils";
import { CreateComment } from "../../types";
import { FormInput } from "../layout-components/FormInput";
import * as Yup from "yup";
import { useState } from "react";

interface NewCommentProps {
  videoId: string;
}

const customConfig: Config = {
  dictionaries: [names, colors],
  separator: "_",
  length: 2,
};

export const NewComment: React.FC<NewCommentProps> = ({ videoId }) => {
  const [createComment] = useCreateCommentMutation();
  const [error, setError] = useState<string>("");
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
      setError("Failed to create new comment");
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
        validationSchema={Yup.object({
          comment: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
        })}
      >
        {(props) => (
          <div>
            <Form className="flex flex-row space-x-4">
              <FormInput
                value={props.values.comment}
                name={"comment"}
                icon={<ChatBubbleLeftEllipsisIcon className="w-5 mr-2" />}
                handleChange={props.handleChange}
                placeholder="Add your comment.."
                meta={props.getFieldMeta("comment")}
              />

              <button type="submit" className="primary-btn self-start">
                Comment
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <div className="error">{error}</div>
    </div>
  );
};
