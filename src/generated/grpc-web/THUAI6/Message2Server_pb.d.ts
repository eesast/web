import * as jspb from "google-protobuf";

import * as MessageType_pb from "./MessageType_pb";

export class PlayerMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): PlayerMsg;

  getStudentType(): MessageType_pb.StudentType;
  setStudentType(value: MessageType_pb.StudentType): PlayerMsg;

  getTrickerType(): MessageType_pb.TrickerType;
  setTrickerType(value: MessageType_pb.TrickerType): PlayerMsg;

  getPlayerType(): MessageType_pb.PlayerType;
  setPlayerType(value: MessageType_pb.PlayerType): PlayerMsg;

  getJobTypeCase(): PlayerMsg.JobTypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerMsg.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerMsg): PlayerMsg.AsObject;
  static serializeBinaryToWriter(
    message: PlayerMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PlayerMsg;
  static deserializeBinaryFromReader(
    message: PlayerMsg,
    reader: jspb.BinaryReader,
  ): PlayerMsg;
}

export namespace PlayerMsg {
  export type AsObject = {
    playerId: number;
    studentType: MessageType_pb.StudentType;
    trickerType: MessageType_pb.TrickerType;
    playerType: MessageType_pb.PlayerType;
  };

  export enum JobTypeCase {
    JOB_TYPE_NOT_SET = 0,
    STUDENT_TYPE = 2,
    TRICKER_TYPE = 3,
  }
}

export class MoveMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): MoveMsg;

  getAngle(): number;
  setAngle(value: number): MoveMsg;

  getTimeInMilliseconds(): number;
  setTimeInMilliseconds(value: number): MoveMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveMsg.AsObject;
  static toObject(includeInstance: boolean, msg: MoveMsg): MoveMsg.AsObject;
  static serializeBinaryToWriter(
    message: MoveMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MoveMsg;
  static deserializeBinaryFromReader(
    message: MoveMsg,
    reader: jspb.BinaryReader,
  ): MoveMsg;
}

export namespace MoveMsg {
  export type AsObject = {
    playerId: number;
    angle: number;
    timeInMilliseconds: number;
  };
}

export class PropMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): PropMsg;

  getPropType(): MessageType_pb.PropType;
  setPropType(value: MessageType_pb.PropType): PropMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropMsg.AsObject;
  static toObject(includeInstance: boolean, msg: PropMsg): PropMsg.AsObject;
  static serializeBinaryToWriter(
    message: PropMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): PropMsg;
  static deserializeBinaryFromReader(
    message: PropMsg,
    reader: jspb.BinaryReader,
  ): PropMsg;
}

export namespace PropMsg {
  export type AsObject = {
    playerId: number;
    propType: MessageType_pb.PropType;
  };
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

  getMessageCase(): SendMsg.MessageCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMsg.AsObject;
  static toObject(includeInstance: boolean, msg: SendMsg): SendMsg.AsObject;
  static serializeBinaryToWriter(
    message: SendMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): SendMsg;
  static deserializeBinaryFromReader(
    message: SendMsg,
    reader: jspb.BinaryReader,
  ): SendMsg;
}

export namespace SendMsg {
  export type AsObject = {
    playerId: number;
    toPlayerId: number;
    textMessage: string;
    binaryMessage: Uint8Array | string;
  };

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttackMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AttackMsg): AttackMsg.AsObject;
  static serializeBinaryToWriter(
    message: AttackMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): AttackMsg;
  static deserializeBinaryFromReader(
    message: AttackMsg,
    reader: jspb.BinaryReader,
  ): AttackMsg;
}

export namespace AttackMsg {
  export type AsObject = {
    playerId: number;
    angle: number;
  };
}

export class IDMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): IDMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IDMsg.AsObject;
  static toObject(includeInstance: boolean, msg: IDMsg): IDMsg.AsObject;
  static serializeBinaryToWriter(
    message: IDMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): IDMsg;
  static deserializeBinaryFromReader(
    message: IDMsg,
    reader: jspb.BinaryReader,
  ): IDMsg;
}

export namespace IDMsg {
  export type AsObject = {
    playerId: number;
  };
}

export class TreatAndRescueMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): TreatAndRescueMsg;

  getToPlayerId(): number;
  setToPlayerId(value: number): TreatAndRescueMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TreatAndRescueMsg.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: TreatAndRescueMsg,
  ): TreatAndRescueMsg.AsObject;
  static serializeBinaryToWriter(
    message: TreatAndRescueMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): TreatAndRescueMsg;
  static deserializeBinaryFromReader(
    message: TreatAndRescueMsg,
    reader: jspb.BinaryReader,
  ): TreatAndRescueMsg;
}

export namespace TreatAndRescueMsg {
  export type AsObject = {
    playerId: number;
    toPlayerId: number;
  };
}

export class SkillMsg extends jspb.Message {
  getPlayerId(): number;
  setPlayerId(value: number): SkillMsg;

  getSkillId(): number;
  setSkillId(value: number): SkillMsg;

  getSkillParam(): number;
  setSkillParam(value: number): SkillMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SkillMsg.AsObject;
  static toObject(includeInstance: boolean, msg: SkillMsg): SkillMsg.AsObject;
  static serializeBinaryToWriter(
    message: SkillMsg,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): SkillMsg;
  static deserializeBinaryFromReader(
    message: SkillMsg,
    reader: jspb.BinaryReader,
  ): SkillMsg;
}

export namespace SkillMsg {
  export type AsObject = {
    playerId: number;
    skillId: number;
    skillParam: number;
  };
}
