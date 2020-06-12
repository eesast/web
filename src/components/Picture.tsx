import React from "react";

const Picture: React.FC<React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = (props) => {
  const { alt, src, ...restProps } = props;
  return (
    <picture
      css={`
        height: 100%;
      `}
    >
      <source
        type="image/webp"
        srcSet={`${src}?x-oss-process=image/quality,q_90/format,webp`}
      />
      <source srcSet={src} />
      <img {...restProps} alt={alt} />
    </picture>
  );
};

export default Picture;
