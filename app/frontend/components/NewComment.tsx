import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const NewComment = () => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleInputHighlight = () => {
    setFocused(true)
  }

  return (
    <div className="flex flex-row space-x-4">
      <div className={`w-full border px-4 py-2 rounded-3xl self-center flex ${focused ? 'border-black' : 'border-gray-300'}`}>
        <ChatBubbleLeftEllipsisIcon className="w-5 mr-2" />
        <input className="outline-transparent" onChange={handleInputHighlight}/>
      </div>
      <div>Comment</div>
    </div>
  );
};
