import React from "react";

const Picture: React.FC<React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = (props) => {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${props.src}?x-oss-process=image/quality,q_90/format,webp`}
      />
      <source srcSet={props.src} />
      <img {...props} alt={props.alt} />
    </picture>
  );
};

export default Picture;
