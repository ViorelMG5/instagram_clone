import { useState } from "react";
import StoryIcon from "./StoryIcon";

export default function Story() {
  const [story, setStory] = useState<boolean | null>(true);

  return (
    <div>
      <ul className="flex gap-3">
        <StoryIcon hasStory={story} />
        <StoryIcon hasStory={story} />
        <StoryIcon hasStory={story} />
        <StoryIcon hasStory={story} />
        <StoryIcon hasStory={story} />
        <StoryIcon hasStory={story} />
      </ul>
    </div>
  );
}
