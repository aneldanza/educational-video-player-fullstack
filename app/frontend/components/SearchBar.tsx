import Select, { components } from "react-select";
import { useGetVideosByUserIdQuery } from "../app/createVideosApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// type VideoOption = {
//   label: string;
//   value: string;
// };

const userId = "anel_danza";

const customStyles = {
    control: (base: any) => ({
      ...base,
      flexDirection: 'row-reverse',
      minWidth: '300px',
    }),
    clearIndicator: (base: any) => ({
        ...base,
        position: 'absolute',
        right: 0
    })
  }

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <MagnifyingGlassIcon className="w-3" />
      </components.DropdownIndicator>
    )
  );
};

export const SearchBar: React.FC = () => {
  const { data, isSuccess } = useGetVideosByUserIdQuery(userId);

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
      />
    </div>
  );
};
