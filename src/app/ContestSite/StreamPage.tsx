import { useState } from "react";
import React from "react";
import { useUrl } from "../../api/hooks/url";
import { ContestProps } from ".";
import THUAI6 from "./Components/THUAI6/StreamNative";

export interface StreamProps {
  url: string;
}

const StreamPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const Contest_id = url.query.get("contest");
  const [streamUrl, setStreamUrl] = useState<string>("https://api.eesast.com");
  if (url.query.get("url") !== null) {
    setStreamUrl("http://" + url.query.get("url"));
  }
  if (Contest_id === "211b9ac2-f004-489d-bd71-4bdde335b597")
    return <THUAI6 url={streamUrl} />;
};

export default StreamPage;
