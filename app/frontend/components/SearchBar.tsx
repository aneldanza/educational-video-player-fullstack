import Select from "react-select";
import { useGetVideosByUserIdQuery } from "../app/createVideosApi";

// type VideoOption = {
//   label: string;
//   value: string;
// };

const userId = "anel_danza";

export const SearchBar: React.FC = () => {
  const { data, isSuccess } = useGetVideosByUserIdQuery(userId);

  return (
    <div>
      <Select
        options={
          isSuccess
            ? data.videos.map((video) => {
                return { label: video.title, value: video.id };
              })
            : []
        }
        isClearable={true}
        isSearchable={true}
      />
    </div>
  );
};
