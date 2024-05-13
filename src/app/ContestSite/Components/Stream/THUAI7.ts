import { RpcError } from "grpc-web";
import { AvailableServiceClient } from "@/generated/grpc-web/THUAI7/ServicesServiceClientPb";
import * as MessageType from "@/generated/grpc-web/THUAI7/MessageType_pb";
import * as Message2Clients from "@/generated/grpc-web/THUAI7/Message2Clients_pb";
import * as Message2Server from "@/generated/grpc-web/THUAI7/Message2Server_pb";
import { StreamProps } from "../../StreamPage";
import { message } from "antd";

const streamTHUAI7: (props: StreamProps) => void = ({
  streamUrl,
  port,
  update,
}) => {
  const client = new AvailableServiceClient(streamUrl + port);
  const request = new Message2Server.IDMsg();
  const playerID = Math.floor(Math.random() * 9999) + 2024;
  request.setPlayerId(playerID);
  client.tryConnection(
    request,
    {},
    (error: RpcError, response: Message2Clients.BoolRes) => {
      if (!error) {
        console.log("Success making gRPC call:", response.toObject());
        const spectator = new Message2Server.PlayerMsg();
        spectator.setPlayerId(playerID);
        const stream = client.addPlayer(spectator, {});
        stream.on("data", (response) => {
          if (response.getGameState() === MessageType.GameState.GAME_END) {
            stream.cancel();
            message.info("对战结束");
            console.log("Game Ended.");
          }
          update(response);
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
        message.warning({ content: "直播连接失败", key: "failMessage" });
        console.error("Error making gRPC call:", error);
      }
    },
  );
};

export default streamTHUAI7;
