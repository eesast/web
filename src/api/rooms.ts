import axios from "axios";
// import { ITeam } from "../redux/types/state";

export interface IRoom {
  id: number;
  contestId: number;
  status: 0 | 1 | 2;
  teams: number[];
  ip: string;
  port: number;
  scores: number[];
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export const getBattleHistory = async (contestId: number, teamId: number) => {};

export const startBattle = async (
  contestId: number,
  teams: number[],
  port: number
) => {
  try {
    await axios.post(`/v1/rooms`, {
      contestId: contestId,
      teams: teams,
      ip: "127.0.0.1", // ip暂无实际作用
      port: port,
    });
  } catch (e) {
    return "Error: Battle not start";
  }
};

export const getRooms = async (contestId: number, status: number) => {
  const response = await axios.get(
    `/v1/rooms?contestId=${contestId}&self=true`
  );
  return response.data as IRoom[];
};
