import { Formik, Form } from "formik";
import { LinkIcon } from "@heroicons/react/24/outline";
import { csrfToken } from "../utils";
import { useUploadVideoMutation } from "../app/createVideosApi";
import { FormInput } from "./FormInput";

export const UploadVideoForm = () => {
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
    <div>
      <div>Upload Video</div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          uploadNewVideo(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <FormInput
              icon={<LinkIcon className="w-5 mr-2" />}
              value={props.values.url}
              name={"url"}
              handleChange={props.handleChange}
            />
            {/* <Field id="title" name="title" className="form-input"/>
            <Field id="description" name="description" className="form-input"/>
            <Field id="url" name="url" className="form-input"/> */}
            <div className="flex space-x-4">
              <button className="secondary-btn">Cancel</button>
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
