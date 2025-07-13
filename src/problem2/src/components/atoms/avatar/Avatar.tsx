import {
  AvatarFallback,
  AvatarImage,
  Avatar as UiAvatar,
} from "@/libs/ui/avatar";

type AvatarProps = {
  imgUrl?: string;
  alt?: string;
  className?: string;
};

const Avatar = (props: AvatarProps) => {
  const { imgUrl, alt, className = "" } = props;

  return (
    <UiAvatar className={className}>
      <AvatarImage src={imgUrl} alt={alt} />
      <AvatarFallback className="bg-gray-200" />
    </UiAvatar>
  );
};

export default Avatar;
