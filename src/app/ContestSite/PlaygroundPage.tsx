import React from "react";
import { ContestProps } from ".";
import { useUrl } from "@/api/hooks/url";
import NotImplementedPage from "./Components/NotImplemented";

const PlaygroundPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const contest = url.query.get("contest");

  if (contest === "f7b586ce-dffd-4fa0-9dc8-d3660423b7e6") {
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
