import { memo } from "react";

interface ProfileCardProps {
    name: string
}
const ProfileCard:React.FC<ProfileCardProps> = ({name}) => {
    console.log("ProfileCard Rendered");
    return (
        <div>
            {name}
        </div>
    );
};

export default memo(ProfileCard);