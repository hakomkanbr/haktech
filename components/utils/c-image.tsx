import Image from "next/image";
import ImageContainer from "./image-container";
import { useState } from "react";
import SkeletonElement from "./skeleton";
import { Skeleton } from "antd";
import { useEffect } from "react";

export const imgLoader = ({ src, width, quality }: any) => {
  return `${process.env.NEXT_PUBLIC_BASE_DOMIN}${src}`;
};

export default function CustomImage({
  width,
  height,
  radius,
  margin,
  cstyle,
  src,
  alt,
  loader,
  layout = "responsive",
  imgWidth,
  imgHeight,
  priority = false,
  objectFit,
  objectPosition,
  placeholder = "blur",
  loading = "lazy",
  onLoadingComplete = () => false,
}: any) {
  const [loadingImg, setLoadingImg] = useState(false);
  return (
    <ImageContainer
      width={width}
      height={height}
      radius={radius}
      margin={margin}
      cstyle={cstyle}
    >
      {loadingImg && <Skeleton.Image active={true} />}
      <Image
        loader={loader}
        src={src}
        alt={alt}
        layout={layout}
        width={imgWidth}
        height={imgHeight}
        // loader={}
        blurDataURL={src}
        priority={priority}
        objectFit={objectFit}
        objectPosition={objectPosition}
        placeholder={placeholder}
        loading={loading}
        onLoad={() => {
          setLoadingImg(true);
        }}
        onLoadingComplete={() => {
          setLoadingImg(false);
        }}
      />
    </ImageContainer>
  );
}
