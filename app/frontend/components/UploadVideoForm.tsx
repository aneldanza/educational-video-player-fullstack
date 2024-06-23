import { Formik, Form } from "formik";
import {
  LinkIcon,
  TagIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { csrfToken } from "../utils";
import { useUploadVideoMutation } from "../app/createVideosApi";
import { FormInput } from "./FormInput";

interface UploadVideoFormProps {
  closeModal: () => void;
}

export const UploadVideoForm:React.FC<UploadVideoFormProps> = ({closeModal}) => {
  const [uploadVideo] = useUploadVideoMutation();
  const initialValues = {
    title: "",
    description: "",
    url: "",
  };

  const uploadNewVideo = async (values: {
    title: string;
    description: string;
    url: string;
  }) => {
    const video = {
      title: values.title,
      description: values.description,
      video_url: values.url,
      user_id: "anel_danza",
    };

    const token = csrfToken();

    try {
      await uploadVideo({ video, token }).unwrap();
    } catch (e) {
      console.error("failed to upload a video");
    }
  };

  return (
    <div className="p-4">
      <div className="text-xl font-bold mb-4">Upload Video</div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          uploadNewVideo(values);
          actions.resetForm();
          actions.setSubmitting(false);
          closeModal()
        }}
      >
        {(props) => (
          <Form className="flex flex-col space-y-4">
            <FormInput
              icon={<TagIcon className="w-5 mr-2" />}
              value={props.values.title}
              name={"title"}
              handleChange={props.handleChange}
              placeholder="Title your video"
            />
            <FormInput
              icon={<ChatBubbleLeftEllipsisIcon className="w-5 mr-2" />}
              value={props.values.description}
              name={"description"}
              handleChange={props.handleChange}
              placeholder="Add description"
            />
            <FormInput
              icon={<LinkIcon className="w-5 mr-2" />}
              value={props.values.url}
              name={"url"}
              handleChange={props.handleChange}
              placeholder="https://www.your-video-link.com"
            />

            <div className="flex space-x-4 justify-end">
              <button type="reset" className="secondary-btn">
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                Upload
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
