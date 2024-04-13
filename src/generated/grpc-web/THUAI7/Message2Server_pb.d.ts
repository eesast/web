import * as jspb from 'google-protobuf'

import * as MessageType_pb from './MessageType_pb';


export class NullRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NullRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NullRequest): NullRequest.AsObject;
  static serializeBinaryToWriter(message: NullRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NullRequest;
  static deserializeBinaryFromReader(message: NullRequest, reader: jspb.BinaryReader): NullRequest;
}

export namespace NullRequest {
  export type AsObject = {
  }
}

export class IDMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): IDMsg;

  getTeamId(): number;
  setTeamId(value: number): IDMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IDMsg.AsObject;
  static toObject(includeInstance: boolean, msg: IDMsg): IDMsg.AsObject;
  static serializeBinaryToWriter(message: IDMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IDMsg;
  static deserializeBinaryFromReader(message: IDMsg, reader: jspb.BinaryReader): IDMsg;
}

export namespace IDMsg {
  export type AsObject = {
    playerId: number,
    teamId: number,
  }
}

export class PlayerMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): PlayerMsg;

  getTeamId(): number;
  setTeamId(value: number): PlayerMsg;

  getShipType(): MessageType_pb.ShipType;
  setShipType(value: MessageType_pb.ShipType): PlayerMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerMsg.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerMsg): PlayerMsg.AsObject;
  static serializeBinaryToWriter(message: PlayerMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerMsg;
  static deserializeBinaryFromReader(message: PlayerMsg, reader: jspb.BinaryReader): PlayerMsg;
}

export namespace PlayerMsg {
  export type AsObject = {
    playerId: number,
    teamId: number,
    shipType: MessageType_pb.ShipType,
  }
}

export class MoveMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): MoveMsg;

  getAngle(): number;
  setAngle(value: number): MoveMsg;

  getTimeInMilliseconds(): number;
  setTimeInMilliseconds(value: number): MoveMsg;

  getTeamId(): number;
  setTeamId(value: number): MoveMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveMsg.AsObject;
  static toObject(includeInstance: boolean, msg: MoveMsg): MoveMsg.AsObject;
  static serializeBinaryToWriter(message: MoveMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveMsg;
  static deserializeBinaryFromReader(message: MoveMsg, reader: jspb.BinaryReader): MoveMsg;
}

export namespace MoveMsg {
  export type AsObject = {
    playerId: number,
    angle: number,
    timeInMilliseconds: number,
    teamId: number,
  }
}

export class SendMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): SendMsg;

  getToPlayerId(): number;
  setToPlayerId(value: number): SendMsg;

  getTextMessage(): string;
  setTextMessage(value: string): SendMsg;

  getBinaryMessage(): Uint8Array | string;
  getBinaryMessage_asU8(): Uint8Array;
  getBinaryMessage_asB64(): string;
  setBinaryMessage(value: Uint8Array | string): SendMsg;

  getTeamId(): number;
  setTeamId(value: number): SendMsg;

  getMessageCase(): SendMsg.MessageCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMsg.AsObject;
  static toObject(includeInstance: boolean, msg: SendMsg): SendMsg.AsObject;
  static serializeBinaryToWriter(message: SendMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMsg;
  static deserializeBinaryFromReader(message: SendMsg, reader: jspb.BinaryReader): SendMsg;
}

export namespace SendMsg {
  export type AsObject = {
    playerId: number,
    toPlayerId: number,
    textMessage: string,
    binaryMessage: Uint8Array | string,
    teamId: number,
  }

  export enum MessageCase { 
    MESSAGE_NOT_SET = 0,
    TEXT_MESSAGE = 3,
    BINARY_MESSAGE = 4,
  }
}

export class AttackMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): AttackMsg;

  getAngle(): number;
  setAngle(value: number): AttackMsg;

  getTeamId(): number;
  setTeamId(value: number): AttackMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttackMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AttackMsg): AttackMsg.AsObject;
  static serializeBinaryToWriter(message: AttackMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttackMsg;
  static deserializeBinaryFromReader(message: AttackMsg, reader: jspb.BinaryReader): AttackMsg;
}

export namespace AttackMsg {
  export type AsObject = {
    playerId: number,
    angle: number,
    teamId: number,
  }
}

export class ConstructMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): ConstructMsg;

  getConstructionType(): MessageType_pb.ConstructionType;
  setConstructionType(value: MessageType_pb.ConstructionType): ConstructMsg;

  getTeamId(): number;
  setTeamId(value: number): ConstructMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructMsg.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructMsg): ConstructMsg.AsObject;
  static serializeBinaryToWriter(message: ConstructMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructMsg;
  static deserializeBinaryFromReader(message: ConstructMsg, reader: jspb.BinaryReader): ConstructMsg;
}

export namespace ConstructMsg {
  export type AsObject = {
    playerId: number,
    constructionType: MessageType_pb.ConstructionType,
    teamId: number,
  }
}

export class RecoverMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): RecoverMsg;

  getRecover(): number;
  setRecover(value: number): RecoverMsg;

  getTeamId(): number;
  setTeamId(value: number): RecoverMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoverMsg.AsObject;
  static toObject(includeInstance: boolean, msg: RecoverMsg): RecoverMsg.AsObject;
  static serializeBinaryToWriter(message: RecoverMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoverMsg;
  static deserializeBinaryFromReader(message: RecoverMsg, reader: jspb.BinaryReader): RecoverMsg;
}

export namespace RecoverMsg {
  export type AsObject = {
    playerId: number,
    recover: number,
    teamId: number,
  }
}

export class InstallMsg extends jspb.Message {
  getModuleType(): MessageType_pb.ModuleType;
  setModuleType(value: MessageType_pb.ModuleType): InstallMsg;

  getPlayerId(): number;
  setPlayerId(value: number): InstallMsg;

  getTeamId(): number;
  setTeamId(value: number): InstallMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InstallMsg.AsObject;
  static toObject(includeInstance: boolean, msg: InstallMsg): InstallMsg.AsObject;
  static serializeBinaryToWriter(message: InstallMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InstallMsg;
  static deserializeBinaryFromReader(message: InstallMsg, reader: jspb.BinaryReader): InstallMsg;
}

export namespace InstallMsg {
  export type AsObject = {
    moduleType: MessageType_pb.ModuleType,
    playerId: number,
    teamId: number,
  }
}

export class BuildShipMsg extends jspb.Message {
  getShipType(): MessageType_pb.ShipType;
  setShipType(value: MessageType_pb.ShipType): BuildShipMsg;

  getTeamId(): number;
  setTeamId(value: number): BuildShipMsg;

  getBirthpointIndex(): number;
  setBirthpointIndex(value: number): BuildShipMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BuildShipMsg.AsObject;
  static toObject(includeInstance: boolean, msg: BuildShipMsg): BuildShipMsg.AsObject;
  static serializeBinaryToWriter(message: BuildShipMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BuildShipMsg;
  static deserializeBinaryFromReader(message: BuildShipMsg, reader: jspb.BinaryReader): BuildShipMsg;
}

export namespace BuildShipMsg {
  export type AsObject = {
    shipType: MessageType_pb.ShipType,
    teamId: number,
    birthpointIndex: number,
  }
}

