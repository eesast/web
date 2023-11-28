import React from "react";
import styled from "styled-components";
import Center from "../../Components/Center";

interface BackgroundProps {
  mode?: String;
  imageIndex?: number;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({
  mode,
  children,
  imageIndex,
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

  const ActionCard = styled.div`
    width: 360px;
    padding-top: 12px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
    border-radius: 8px;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.25);
    background-color: ${mode === "light"
      ? `rgba(255, 255, 255, 0.5)`
      : `rgba(0, 0, 0, 0.5)`};
    backdrop-filter: blur(36px);
  `;

  const backgrounds = [
    `/backgrounds/tsinghua-fall.jpg`,
    `/backgrounds/integrated-circuits.jpg`,
    `/backgrounds/signals.jpg`,
    `/backgrounds/cognition.jpg`,
  ];
  const background =
    imageIndex !== undefined
      ? backgrounds[imageIndex]
      : backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <Background url={background}>
      <Center>
        <ActionCard>{children}</ActionCard>
      </Center>
    </Background>
  );
};

export default Background;
