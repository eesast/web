import axios from "axios";
import { ITeam } from "../redux/types/state";

export const getTeams = async (
  self: boolean,
  contestId: number,
  token: string,
  begin?: number,
  end?: number
) => {
  if (!begin && !end) {
    const response = await axios.get(
      `/v1/teams?self=${self}&contestId=${contestId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data as ITeam[];
  } else {
    const response = await axios.get(
      `/v1/teams?self=${self}&contestId=${contestId}&begin=${begin}&end=${end}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data as ITeam[];
  }
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

export const updateTeam = async (
  id: number,
  name: string,
  description: string,
  contestId: number,
  members: number[],
  token: string
) => {
  await axios.put(
    `/v1/teams/${id}`,
    {
      name,
      description,
      contestId,
      members
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const deleteTeam = async (id: number, token: string) => {
  await axios.delete(`/v1/teams/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addTeamMember = async (
  teamId: number,
  id: number,
  inviteCode: string,
  token: string
) => {
  await axios.post(
    `/v1/teams/${teamId}/members`,
    {
      id,
      inviteCode
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getContestId = async (type: string, year: number) => {
  const response = await axios.get(`/v1/contests?type=${type}&year=${year}`);
  return response.data[0].id as number;
};
