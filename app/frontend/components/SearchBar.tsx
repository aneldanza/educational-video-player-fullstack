import Select, { components, SingleValue } from "react-select";
import { useGetVideosByUserIdQuery } from "../app/createVideosApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type VideoOption = {
  label: string;
  value: string;
};

const userId = "anel_danza";

const customStyles = {
  control: (base: any) => ({
    ...base,
    flexDirection: "row-reverse",
    minWidth: "300px",
  }),
  clearIndicator: (base: any) => ({
    ...base,
    position: "absolute",
    right: 0,
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingRight: "2.3rem",
  }),
};

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <MagnifyingGlassIcon className="w-3" />
      </components.DropdownIndicator>
    )
  );
};

const OptionLabel = (option: VideoOption) => {
  return (
    <div className="flex">
      <div className="grow overflow-ellipsis whitespace-nowrap overflow-hidden">
        {option.label}
      </div>
    </div>
  );
};

export const SearchBar: React.FC = () => {
  const { data, isSuccess, isLoading } = useGetVideosByUserIdQuery(userId);
  const navigate = useNavigate();

  const handleOptionChange = (newValue: SingleValue<VideoOption>) => {
    newValue && navigate(`/videos/${newValue.value}`)
  }
  return (
    <div className="flex w-1/3">
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
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        styles={customStyles}
        formatOptionLabel={OptionLabel}
        isLoading={isLoading}
        onChange={handleOptionChange}
      />
    </div>
  );
};
