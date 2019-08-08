import axios from "axios";
import { ITeam } from "../redux/types/state";

export const getTeams = async (
  self: boolean,
  contestId: number,
  token: string
) => {
  const response = await axios.get(
    `/v1/teams?self=${self}&contestId=${contestId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data as ITeam[];
};

export const createTeam = async (
  name: string,
  description: string,
  contestId: number,
  token: string
) => {
  const response = await axios.post(
    "/v1/teams",
    {
      name,
      description,
      contestId
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.inviteCode as string;
};
