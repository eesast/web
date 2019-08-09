import axios from "axios";
import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Site } from "../App";

export interface IApiSiteProps {
  setSite: (site: Site) => void;
}

const ApiSite: React.FC<IApiSiteProps> = ({ setSite }) => {
  setSite("others");

  return <SwaggerUI url={`${axios.defaults.baseURL}/v1/swagger.yaml`} />;
};

export default ApiSite;
