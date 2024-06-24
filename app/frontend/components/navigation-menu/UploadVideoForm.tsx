import { useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  LinkIcon,
  TagIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import isEqual from "lodash.isequal";
import { csrfToken } from "../../utils";
import { useUploadVideoMutation } from "../../app/createVideosApi";
import { FormInput } from "../layout-components/FormInput";
import { FormTextarea } from "../layout-components/FormTextarea";
import { useEffect, useState } from "react";
import { defaultUserId } from "../../utils";

const uploadValidationSchema = Yup.object({
  title: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(300, "Must be 300 characters or less")
    .required("Required"),
  url: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

interface UploadVideoFormProps {
  closeModal: () => void;
}

export const UploadVideoForm: React.FC<UploadVideoFormProps> = ({
  closeModal,
}) => {
  const [uploadVideo, { isError, isSuccess }] = useUploadVideoMutation();
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  let initialValues = {
    title: "",
    description: "",
    url: "",
  };

  let validationSchema = uploadValidationSchema;

  useEffect(() => {
    if (isError) {
      setError("Could not upload the video");
    } else if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, isError]);

  const uploadNewVideo = async (values: {
    title: string;
    description: string;
    url: string;
  }) => {
    const video = {
      title: values.title,
      description: values.description,
      video_url: values.url,
      user_id: searchParams.get("user_id") || defaultUserId,
    };

    const token = csrfToken();

    try {
      await uploadVideo({ video, token }).unwrap();
    } catch (e) {
      setError("Failed to upload a video");
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div className="text-xl font-bold mb-4">Upload Video</div>
        <div className="error">{error}</div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          uploadNewVideo(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
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
            <FormInput
              icon={<LinkIcon className="w-5 mr-2" />}
              value={props.values.url}
              name={"url"}
              handleChange={props.handleChange}
              placeholder="https://www.your-video-link.com"
              meta={props.getFieldMeta("url")}
            />

            <div className="flex space-x-4 justify-end">
              <button
                type="reset"
                className="secondary-btn"
                onClick={() => props.setValues(initialValues)}
              >
                Reset
              </button>
              <button
                className={`primary-btn ${
                  isEqual(props.values, initialValues) &&
                  "pointer-events-none bg-opacity-50 border-opacity-50"
                }`}
                type="submit"
              >
                Upload
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
