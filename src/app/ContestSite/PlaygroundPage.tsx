import React from "react";
import { ContestProps } from ".";
import { useUrl } from "@/api/hooks/url";
import NotImplementedPage from "./Components/NotImplemented";

const PlaygroundPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const contest = url.query.get("contest");

  if (contest === "b4e3f620-49f7-4883-ba0f-81cbfdcf6196") {
    return (
      <div>
        <h1>Playground for THUAI7, not implemented yet.</h1>
      </div>
    );
  } else {
    return <NotImplementedPage />;
  }
};

export default PlaygroundPage;
