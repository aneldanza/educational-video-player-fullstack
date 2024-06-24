import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TagIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import isEqual from "lodash.isequal";
import { csrfToken } from "../../utils";
import {
  useUpdateVideoByIdMutation,
  useGetVideoByIdQuery,
} from "../../app/createVideosApi";
import { FormInput } from "../layout-components/FormInput";
import { FormTextarea } from "../layout-components/FormTextarea";
import { useEffect, useState } from "react";

const editValidationSchema = Yup.object({
  title: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(300, "Must be 300 characters or less")
    .required("Required"),
});

interface EditVideoFormProps {
  closeModal: () => void;
}

export const EditVideoForm: React.FC<EditVideoFormProps> = ({ closeModal }) => {
  const [
    updateVideoById,
    { isError: isUpdateError, isSuccess: isUpdateSuccess },
  ] = useUpdateVideoByIdMutation();
  const [serverError, setError] = useState<string>("");

  const { videoId } = useParams();

  const { data, isSuccess } = useGetVideoByIdQuery(videoId || "");

  useEffect(() => {
    if (isUpdateError) {
      setError("Could not update the video");
    } else if (isUpdateSuccess) {
      closeModal();
    }
  }, [isUpdateError, isUpdateSuccess]);

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div className="text-xl font-bold mb-4">Edit Video</div>
        <div className="error">{serverError}</div>
      </div>
      {isSuccess && (
        <Formik
          initialValues={{
            title: data.video.title,
            description: data.video.description,
          }}
          onSubmit={async (values, actions) => {
            const data = {
              video_id: videoId!,
              ...values,
            };

            await updateVideoById({ data, token: csrfToken() }).unwrap();
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          validationSchema={editValidationSchema}
        >
          {(props) => (
            <Form className="flex flex-col space-y-4">
              <FormInput
                icon={<TagIcon className="w-5 mr-2" />}
                value={props.values.title}
                name={"title"}
                handleChange={props.handleChange}
                placeholder="Title your video"
                meta={props.getFieldMeta("title")}
              />

              <FormTextarea
                icon={
                  <ChatBubbleLeftEllipsisIcon className="w-5 mr-2 self-start" />
                }
                value={props.values.description}
                name={"description"}
                handleChange={props.handleChange}
                placeholder="Add description"
                meta={props.getFieldMeta("description")}
              />

              <div className="flex space-x-4 justify-end">
                <button
                  type="reset"
                  className="secondary-btn"
                  onClick={() =>
                    props.setValues({
                      title: data.video.title,
                      description: data.video.description,
                    })
                  }
                >
                  Reset
                </button>
                <button
                  className={`primary-btn ${
                    isEqual(props.values, {
                      title: data.video.title,
                      description: data.video.description,
                    }) && "pointer-events-none bg-opacity-50 border-opacity-50"
                  }`}
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
