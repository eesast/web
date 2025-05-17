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
  getCharacterId(): number;
  setCharacterId(value: number): IDMsg;

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
    characterId: number,
    teamId: number,
  }
}

export class CharacterMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): CharacterMsg;

  getTeamId(): number;
  setTeamId(value: number): CharacterMsg;

  getCharacterType(): MessageType_pb.CharacterType;
  setCharacterType(value: MessageType_pb.CharacterType): CharacterMsg;

  getSideFlag(): number;
  setSideFlag(value: number): CharacterMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CharacterMsg.AsObject;
  static toObject(includeInstance: boolean, msg: CharacterMsg): CharacterMsg.AsObject;
  static serializeBinaryToWriter(message: CharacterMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CharacterMsg;
  static deserializeBinaryFromReader(message: CharacterMsg, reader: jspb.BinaryReader): CharacterMsg;
}

export namespace CharacterMsg {
  export type AsObject = {
    characterId: number,
    teamId: number,
    characterType: MessageType_pb.CharacterType,
    sideFlag: number,
  }
}

export class EconomyResourceMsg extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): EconomyResourceMsg;

  getProcess(): number;
  setProcess(value: number): EconomyResourceMsg;

  getEconomyResourceType(): MessageType_pb.EconomyResourceType;
  setEconomyResourceType(value: MessageType_pb.EconomyResourceType): EconomyResourceMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EconomyResourceMsg.AsObject;
  static toObject(includeInstance: boolean, msg: EconomyResourceMsg): EconomyResourceMsg.AsObject;
  static serializeBinaryToWriter(message: EconomyResourceMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EconomyResourceMsg;
  static deserializeBinaryFromReader(message: EconomyResourceMsg, reader: jspb.BinaryReader): EconomyResourceMsg;
}

export namespace EconomyResourceMsg {
  export type AsObject = {
    teamId: number,
    process: number,
    economyResourceType: MessageType_pb.EconomyResourceType,
  }
}

export class AdditionResourceMsg extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): AdditionResourceMsg;

  getHp(): number;
  setHp(value: number): AdditionResourceMsg;

  getAdditionResourceType(): MessageType_pb.AdditionResourceType;
  setAdditionResourceType(value: MessageType_pb.AdditionResourceType): AdditionResourceMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdditionResourceMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AdditionResourceMsg): AdditionResourceMsg.AsObject;
  static serializeBinaryToWriter(message: AdditionResourceMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdditionResourceMsg;
  static deserializeBinaryFromReader(message: AdditionResourceMsg, reader: jspb.BinaryReader): AdditionResourceMsg;
}

export namespace AdditionResourceMsg {
  export type AsObject = {
    teamId: number,
    hp: number,
    additionResourceType: MessageType_pb.AdditionResourceType,
  }
}

export class ConstructionMsg extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): ConstructionMsg;

  getHp(): number;
  setHp(value: number): ConstructionMsg;

  getConstructionType(): MessageType_pb.ConstructionType;
  setConstructionType(value: MessageType_pb.ConstructionType): ConstructionMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructionMsg.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructionMsg): ConstructionMsg.AsObject;
  static serializeBinaryToWriter(message: ConstructionMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructionMsg;
  static deserializeBinaryFromReader(message: ConstructionMsg, reader: jspb.BinaryReader): ConstructionMsg;
}

export namespace ConstructionMsg {
  export type AsObject = {
    teamId: number,
    hp: number,
    constructionType: MessageType_pb.ConstructionType,
  }
}

export class MoveMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): MoveMsg;

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
    characterId: number,
    angle: number,
    timeInMilliseconds: number,
    teamId: number,
  }
}

export class SendMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): SendMsg;

  getToCharacterId(): number;
  setToCharacterId(value: number): SendMsg;

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
    characterId: number,
    toCharacterId: number,
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
  getCharacterId(): number;
  setCharacterId(value: number): AttackMsg;

  getTeamId(): number;
  setTeamId(value: number): AttackMsg;

  getAttackRange(): number;
  setAttackRange(value: number): AttackMsg;

  getAttackedCharacterId(): number;
  setAttackedCharacterId(value: number): AttackMsg;

  getAttackedTeam(): number;
  setAttackedTeam(value: number): AttackMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttackMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AttackMsg): AttackMsg.AsObject;
  static serializeBinaryToWriter(message: AttackMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttackMsg;
  static deserializeBinaryFromReader(message: AttackMsg, reader: jspb.BinaryReader): AttackMsg;
}

export namespace AttackMsg {
  export type AsObject = {
    characterId: number,
    teamId: number,
    attackRange: number,
    attackedCharacterId: number,
    attackedTeam: number,
  }
}

export class CastMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): CastMsg;

  getSkillId(): number;
  setSkillId(value: number): CastMsg;

  getCastedCharacterIdList(): Array<number>;
  setCastedCharacterIdList(value: Array<number>): CastMsg;
  clearCastedCharacterIdList(): CastMsg;
  addCastedCharacterId(value: number, index?: number): CastMsg;

  getTeamId(): number;
  setTeamId(value: number): CastMsg;

  getAttackRange(): number;
  setAttackRange(value: number): CastMsg;

  getX(): number;
  setX(value: number): CastMsg;
  hasX(): boolean;
  clearX(): CastMsg;

  getY(): number;
  setY(value: number): CastMsg;
  hasY(): boolean;
  clearY(): CastMsg;

  getAngle(): number;
  setAngle(value: number): CastMsg;
  hasAngle(): boolean;
  clearAngle(): CastMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CastMsg.AsObject;
  static toObject(includeInstance: boolean, msg: CastMsg): CastMsg.AsObject;
  static serializeBinaryToWriter(message: CastMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CastMsg;
  static deserializeBinaryFromReader(message: CastMsg, reader: jspb.BinaryReader): CastMsg;
}

export namespace CastMsg {
  export type AsObject = {
    characterId: number,
    skillId: number,
    castedCharacterIdList: Array<number>,
    teamId: number,
    attackRange: number,
    x?: number,
    y?: number,
    angle?: number,
  }

  export enum XCase { 
    _X_NOT_SET = 0,
    X = 6,
  }

  export enum YCase { 
    _Y_NOT_SET = 0,
    Y = 7,
  }

  export enum AngleCase { 
    _ANGLE_NOT_SET = 0,
    ANGLE = 8,
  }
}

export class AttackConstructionMsg extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): AttackConstructionMsg;

  getCharacterId(): number;
  setCharacterId(value: number): AttackConstructionMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttackConstructionMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AttackConstructionMsg): AttackConstructionMsg.AsObject;
  static serializeBinaryToWriter(message: AttackConstructionMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttackConstructionMsg;
  static deserializeBinaryFromReader(message: AttackConstructionMsg, reader: jspb.BinaryReader): AttackConstructionMsg;
}

export namespace AttackConstructionMsg {
  export type AsObject = {
    teamId: number,
    characterId: number,
  }
}

export class AttackAdditionResourceMsg extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): AttackAdditionResourceMsg;

  getCharacterId(): number;
  setCharacterId(value: number): AttackAdditionResourceMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AttackAdditionResourceMsg.AsObject;
  static toObject(includeInstance: boolean, msg: AttackAdditionResourceMsg): AttackAdditionResourceMsg.AsObject;
  static serializeBinaryToWriter(message: AttackAdditionResourceMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AttackAdditionResourceMsg;
  static deserializeBinaryFromReader(message: AttackAdditionResourceMsg, reader: jspb.BinaryReader): AttackAdditionResourceMsg;
}

export namespace AttackAdditionResourceMsg {
  export type AsObject = {
    teamId: number,
    characterId: number,
  }
}

export class ConstructMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): ConstructMsg;

  getTeamId(): number;
  setTeamId(value: number): ConstructMsg;

  getConstructionType(): MessageType_pb.ConstructionType;
  setConstructionType(value: MessageType_pb.ConstructionType): ConstructMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructMsg.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructMsg): ConstructMsg.AsObject;
  static serializeBinaryToWriter(message: ConstructMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructMsg;
  static deserializeBinaryFromReader(message: ConstructMsg, reader: jspb.BinaryReader): ConstructMsg;
}

export namespace ConstructMsg {
  export type AsObject = {
    characterId: number,
    teamId: number,
    constructionType: MessageType_pb.ConstructionType,
  }
}

export class ConstructTrapMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): ConstructTrapMsg;

  getTeamId(): number;
  setTeamId(value: number): ConstructTrapMsg;

  getTrapType(): MessageType_pb.TrapType;
  setTrapType(value: MessageType_pb.TrapType): ConstructTrapMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructTrapMsg.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructTrapMsg): ConstructTrapMsg.AsObject;
  static serializeBinaryToWriter(message: ConstructTrapMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructTrapMsg;
  static deserializeBinaryFromReader(message: ConstructTrapMsg, reader: jspb.BinaryReader): ConstructTrapMsg;
}

export namespace ConstructTrapMsg {
  export type AsObject = {
    characterId: number,
    teamId: number,
    trapType: MessageType_pb.TrapType,
  }
}

export class EquipMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): EquipMsg;

  getEquipmentType(): MessageType_pb.EquipmentType;
  setEquipmentType(value: MessageType_pb.EquipmentType): EquipMsg;

  getTeamId(): number;
  setTeamId(value: number): EquipMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EquipMsg.AsObject;
  static toObject(includeInstance: boolean, msg: EquipMsg): EquipMsg.AsObject;
  static serializeBinaryToWriter(message: EquipMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EquipMsg;
  static deserializeBinaryFromReader(message: EquipMsg, reader: jspb.BinaryReader): EquipMsg;
}

export namespace EquipMsg {
  export type AsObject = {
    characterId: number,
    equipmentType: MessageType_pb.EquipmentType,
    teamId: number,
  }
}

export class RecoverMsg extends jspb.Message {
  getCharacterId(): number;
  setCharacterId(value: number): RecoverMsg;

  getRecoveredHp(): number;
  setRecoveredHp(value: number): RecoverMsg;

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
    characterId: number,
    recoveredHp: number,
    teamId: number,
  }
}

export class CreatCharacterMsg extends jspb.Message {
  getCharacterType(): MessageType_pb.CharacterType;
  setCharacterType(value: MessageType_pb.CharacterType): CreatCharacterMsg;

  getTeamId(): number;
  setTeamId(value: number): CreatCharacterMsg;

  getBirthpointIndex(): number;
  setBirthpointIndex(value: number): CreatCharacterMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatCharacterMsg.AsObject;
  static toObject(includeInstance: boolean, msg: CreatCharacterMsg): CreatCharacterMsg.AsObject;
  static serializeBinaryToWriter(message: CreatCharacterMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatCharacterMsg;
  static deserializeBinaryFromReader(message: CreatCharacterMsg, reader: jspb.BinaryReader): CreatCharacterMsg;
}

export namespace CreatCharacterMsg {
  export type AsObject = {
    characterType: MessageType_pb.CharacterType,
    teamId: number,
    birthpointIndex: number,
  }
}

