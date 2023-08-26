import React, { useEffect, useState } from "react";
import styled from "styled-components";
export default function PregressiveImage({
  imgSrc,
  previewSrc,
  width,
  height,
}) {
  const [usedSrc, setUsedSrc] = useState(previewSrc);
  const imgElement = React.useRef(null);
  const [heights, setHeight] = useState();
  const [usedEffectStyle, setUsedEffectStyle] = useState({
    filter: "blur(3px)",
    clipPath: "inset(0)",
  });
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      setUsedSrc(img.src);
      setUsedEffectStyle({});
    };
  }, []);

  return (
    <img
      src={usedSrc}
      width={width}
      height={height}
      style={{
        transition: "filter 0.1s ease-out",
        ...usedEffectStyle,
        objectFit: "cover",
        objectPosition: "0px 8px",
      }}
    />
  );
}
