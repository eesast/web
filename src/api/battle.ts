import axios from "axios";
import { ITeam } from "../redux/types/state";

export const getBattleHistory = async (contestId: number, teamId: number) => {};

export const startBattle = async (
  contestId: number,
  teams: number[],
  serverIP: string,
  port: number
) => {
  try {
    const room = await axios.post(`/v1/rooms`, {
      contestId: contestId,
      teams: teams,
      ip: serverIP,
      port: port
    });
    const roomId = (room.data as string).split("/").pop();
    await axios.put(`/v1/rooms/${roomId}/status`, { status: 1 });
  } catch (e) {
    return "Error: Battle not start";
  }
};
