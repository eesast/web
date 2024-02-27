import { useEffect, useState } from "react";
import { RpcError } from "grpc-web";
import { AvailableServiceClient } from "../../generated/grpc-web/ServicesServiceClientPb";
import * as MessageType from "../../generated/grpc-web/MessageType_pb";
import * as Message2Clients from "../../generated/grpc-web/Message2Clients_pb";
import * as Message2Server from "../../generated/grpc-web/Message2Server_pb";
import { Col, Layout, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useUrl } from "../../api/hooks/url";
import { ContestProps } from ".";

interface Loc {
  x: number;
  y: number;
}

const StreamPage: React.FC<ContestProps> = ({ mode, user }) => {
  const url = useUrl();
  const [streamUrl, setStreamUrl] = useState<string>("https://api.eesast.com");
  if (url.query.get("url") !== null) {
    setStreamUrl("http://" + url.query.get("url"));
  }
  const [gameTime, setGameTime] = useState(0);
  const [studentScore, setStudentScore] = useState(0);
  const [trickerScore, setTrickerScore] = useState(0);
  const [student1Loc, setStudent1Loc] = useState<Loc>({ x: 0, y: 0 });
  const [student2Loc, setStudent2Loc] = useState<Loc>({ x: 0, y: 0 });
  const [student3Loc, setStudent3Loc] = useState<Loc>({ x: 0, y: 0 });
  const [student4Loc, setStudent4Loc] = useState<Loc>({ x: 0, y: 0 });
  const [trickerLoc, setTrickerLoc] = useState<Loc>({ x: 0, y: 0 });
  useEffect(() => {
    const client = new AvailableServiceClient(streamUrl + ":8879");
    const request = new Message2Server.IDMsg();
    request.setPlayerId(99);
    client.tryConnection(
      request,
      {},
      (error: RpcError, response: Message2Clients.BoolRes) => {
        if (!error) {
          console.log("Success making gRPC call:", response.toObject());
          const spectator = new Message2Server.PlayerMsg();
          spectator.setPlayerId(2024);
          const stream = client.addPlayer(spectator, {});
          stream.on("data", (response) => {
            console.log("Received message from server:", response.toObject());
            if (response.getGameState() === MessageType.GameState.GAME_END) {
              stream.cancel();
              console.log("Game Ended.");
            }
            let allMessage = response.getAllMessage();
            setGameTime(allMessage?.getGameTime() || 0);
            setStudentScore(allMessage?.getStudentScore() || 0);
            setTrickerScore(allMessage?.getTrickerScore() || 0);
            let objMessageList = response.getObjMessageList();
            setStudent1Loc({
              x: objMessageList[0]?.getStudentMessage()?.getX() || 0,
              y: objMessageList[0]?.getStudentMessage()?.getY() || 0,
            });
            setStudent2Loc({
              x: objMessageList[1]?.getStudentMessage()?.getX() || 0,
              y: objMessageList[1]?.getStudentMessage()?.getY() || 0,
            });
            setStudent3Loc({
              x: objMessageList[2]?.getStudentMessage()?.getX() || 0,
              y: objMessageList[2]?.getStudentMessage()?.getY() || 0,
            });
            setStudent4Loc({
              x: objMessageList[3]?.getStudentMessage()?.getX() || 0,
              y: objMessageList[3]?.getStudentMessage()?.getY() || 0,
            });
            setTrickerLoc({
              x: objMessageList[4]?.getTrickerMessage()?.getX() || 0,
              y: objMessageList[4]?.getTrickerMessage()?.getY() || 0,
            });
          });
          stream.on("status", (status) => {
            console.log("Received status from server:", status);
          });
          stream.on("error", (error) => {
            console.error("Error making gRPC call:", error);
          });
          stream.on("end", () => {
            console.log("Server ended streaming connection.");
          });
        } else {
          console.error("Error making gRPC call:", error);
        }
      },
    );
  });

  const canvasRef = React.useRef(null);
  const h = 50;
  const w = 50;
  const h_px = 10;
  const w_px = 10;
  const width = w * w_px;
  const height = h * h_px;

  const colorMap: { [key: number]: string } = {
    0: "#FFFFFF", // Space
    6: "brown", // Wall
    7: "green", // Grass
    8: "lightpink", // Classroom
    9: "lightskyblue", // Gate
    10: "grey", // Emergency
    11: "grey", // Window
    12: "khaki", // Door
    13: "khaki", // Door
    14: "khaki", // Door
    15: "orange", // Chest
  };

  const map = [
    [
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 6, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 15, 6, 6, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 15, 0, 0,
      0, 6,
    ],
    [
      6, 6, 0, 0, 0, 0, 9, 6, 6, 7, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 6, 6, 7,
      7, 6, 6, 6, 6, 6, 6, 11, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 7, 7, 6, 6, 7,
      7, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 13, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 7, 7, 7, 0,
      0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6,
    ],
    [
      6, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0,
      0, 6, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0,
      0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 6,
    ],
    [
      6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 7, 6, 0, 6,
    ],
    [
      6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 7, 6, 0, 6,
    ],
    [
      6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 6, 12, 6, 6, 6, 6, 6, 6, 11, 6, 6, 0,
      0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 6, 0,
      6,
    ],
    [
      6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0,
      0, 0, 0, 0, 0, 0, 15, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0,
      6,
    ],
    [
      6, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6,
      0, 0, 0, 0, 0, 7, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
      0, 0, 0, 0, 7, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
      0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
      0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 11, 6,
      0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0,
      6,
    ],
    [
      6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 6, 7, 0, 0,
      6,
    ],
    [
      6, 7, 7, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 6,
    ],
    [
      6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0,
      5, 0, 7, 7, 6, 0, 0, 0, 0, 0, 0, 7, 6, 6, 6, 6, 15, 0, 0, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 6, 7, 7, 0,
      0, 0, 0, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 7, 6, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 0,
      0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 6, 6, 0, 10, 0,
      6,
    ],
    [
      6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 6, 6, 6, 7, 0, 0, 0, 6,
    ],
    [
      6, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 6, 7, 0, 2, 0, 0, 6,
    ],
    [
      6, 0, 6, 0, 0, 0, 0, 0, 0, 6, 11, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 6,
    ],
    [
      6, 0, 6, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
    ],
    [
      6, 0, 11, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 12, 6, 6, 6, 0, 0, 0, 0, 6, 6,
      6, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 6,
    ],
    [
      6, 0, 6, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 6, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 7, 7, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 6, 7, 0, 0, 0, 8, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 7,
      7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 6,
    ],
    [
      6, 0, 6, 6, 6, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6,
      7, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0,
      7, 7, 7, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 6, 7, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 6, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6,
    ],
    [
      6, 6, 0, 0, 7, 7, 6, 7, 7, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0,
      4, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0,
      6,
    ],
    [
      6, 6, 15, 0, 0, 0, 7, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 11, 6, 0, 0, 0, 0,
      0, 6,
    ],
    [
      6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 6, 15, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7,
      0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 0, 0, 0, 6, 6, 6, 11, 6, 0, 0, 6, 6, 6,
      7, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 6, 0, 6, 7, 7, 6, 7,
      0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 14, 6, 6, 6, 0, 0, 0, 0, 0, 7, 0, 0, 6, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 7, 6, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 7, 6, 0, 6, 6, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 7, 6, 0,
      0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 7, 6, 6, 6, 0, 0, 6,
    ],
    [
      6, 0, 0, 0, 0, 0, 6, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 6, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 6, 6, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6,
      6, 11, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 6, 6, 6, 6, 6, 7, 0, 0, 0, 10, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0,
      0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 7, 6, 6, 0, 0, 0,
      6,
    ],
    [
      6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 15, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 7, 7, 6, 6, 0, 0, 0,
      6,
    ],
    [
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    ],
  ];

  const drawMap = (ctx: CanvasRenderingContext2D) => {
    for (var i = 0; i < h; i++) {
      for (var j = 0; j < w; j++) {
        ctx.fillStyle = colorMap[map[i][j]];
        ctx.fillRect(i * h_px, j * w_px, h_px, w_px);
      }
    }
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    location: Loc,
    isTricker: boolean = false,
  ) => {
    ctx.beginPath();
    ctx.arc(
      location.x / 100,
      location.y / 100,
      Math.min(h_px, w_px) / 2,
      0,
      Math.PI * 2,
      true,
    );
    ctx.fillStyle = "rgb(0, 0, 200)";
    if (isTricker) ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    let canvas: HTMLCanvasElement = canvasRef.current;
    let context = canvas.getContext("2d")!;
    context.clearRect(0, 0, height, width);
    drawMap(context);
    drawPlayer(context, student1Loc);
    drawPlayer(context, student2Loc);
    drawPlayer(context, student3Loc);
    drawPlayer(context, student4Loc);
    drawPlayer(context, trickerLoc, true);
  });

  return (
    <Layout>
      <Col
        css={`
          margin-top: 45px;
          margin-left: 80px;
        `}
      >
        <Row>
          <Title level={5}>Game Time: {gameTime / 1000} sec</Title>
        </Row>
        <Row>
          <Title level={5}>Student Score: {studentScore}</Title>
        </Row>
        <Row>
          <Title level={5}>Tricker Score: {trickerScore}</Title>
        </Row>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ border: "1px solid #000000" }}
        ></canvas>
      </Col>
    </Layout>
  );
};

export default StreamPage;
