import React from "react";
import styled from "styled-components";
import Center from "../../Components/Center";

interface BackgroundProps {
  mode?: string;
  imageIndex: number;
  children: React.ReactNode;
  width?: number;
  height?: number;
  blur?: number;
}

const Background: React.FC<BackgroundProps> = ({
  mode,
  imageIndex,
  children,
  width,
  height,
  blur,
}) => {
  const Background = styled.div<{ url: string }>`
    height: calc(100vh - 72px);
    width: 100%;
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ActionCard = styled.div<{
    width?: number;
    height?: number;
    blur?: number;
  }>`
    width: ${({ width }) => (width ? `${width}px` : "360px")};
    height: ${({ height }) => (height ? `${height}px` : "auto")};
    padding-top: 12px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
    border-radius: 8px;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
    background-color: ${mode === "light"
      ? `rgba(255, 255, 255, 0.5)`
      : `rgba(0, 0, 0, 0.5)`};
    backdrop-filter: blur(
      ${({ blur }) => (blur !== undefined ? `${blur}px` : "36px")}
    );
  `;

  const backgrounds = [
    `./backgrounds/tsinghua-fall.jpg`,
    `./backgrounds/integrated-circuits.jpg`,
    `./backgrounds/signals.jpg`,
    `./backgrounds/cognition.jpg`,
  ];
  const background = backgrounds[Math.floor(imageIndex * backgrounds.length)];

  return (
    <Background url={background}>
      <Center>
        <ActionCard width={width} height={height} blur={blur}>
          {children}
        </ActionCard>
      </Center>
    </Background>
  );
};

export default Background;
