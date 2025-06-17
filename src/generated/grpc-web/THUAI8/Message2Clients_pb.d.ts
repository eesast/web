import * as jspb from 'google-protobuf'

import * as MessageType_pb from './MessageType_pb';


export class MessageOfMonkeySkill extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): MessageOfMonkeySkill;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfMonkeySkill;

  getAngle(): number;
  setAngle(value: number): MessageOfMonkeySkill;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfMonkeySkill.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfMonkeySkill): MessageOfMonkeySkill.AsObject;
  static serializeBinaryToWriter(message: MessageOfMonkeySkill, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfMonkeySkill;
  static deserializeBinaryFromReader(message: MessageOfMonkeySkill, reader: jspb.BinaryReader): MessageOfMonkeySkill;
}

export namespace MessageOfMonkeySkill {
  export type AsObject = {
    teamId: number,
    playerId: number,
    angle: number,
  }
}

export class MessageOfCharacter extends jspb.Message {
  getGuid(): number;
  setGuid(value: number): MessageOfCharacter;

  getTeamId(): number;
  setTeamId(value: number): MessageOfCharacter;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfCharacter;

  getCharacterType(): MessageType_pb.CharacterType;
  setCharacterType(value: MessageType_pb.CharacterType): MessageOfCharacter;

  getCharacterActiveState(): MessageType_pb.CharacterState;
  setCharacterActiveState(value: MessageType_pb.CharacterState): MessageOfCharacter;

  getIsBlind(): boolean;
  setIsBlind(value: boolean): MessageOfCharacter;

  getBlindTime(): number;
  setBlindTime(value: number): MessageOfCharacter;

  getIsStunned(): boolean;
  setIsStunned(value: boolean): MessageOfCharacter;

  getStunnedTime(): number;
  setStunnedTime(value: number): MessageOfCharacter;

  getIsInvisible(): boolean;
  setIsInvisible(value: boolean): MessageOfCharacter;

  getInvisibleTime(): number;
  setInvisibleTime(value: number): MessageOfCharacter;

  getIsBurned(): boolean;
  setIsBurned(value: boolean): MessageOfCharacter;

  getBurnedTime(): number;
  setBurnedTime(value: number): MessageOfCharacter;

  getHarmCut(): number;
  setHarmCut(value: number): MessageOfCharacter;

  getHarmCutTime(): number;
  setHarmCutTime(value: number): MessageOfCharacter;

  getCharacterPassiveState(): MessageType_pb.CharacterState;
  setCharacterPassiveState(value: MessageType_pb.CharacterState): MessageOfCharacter;

  getX(): number;
  setX(value: number): MessageOfCharacter;

  getY(): number;
  setY(value: number): MessageOfCharacter;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfCharacter;

  getSpeed(): number;
  setSpeed(value: number): MessageOfCharacter;

  getViewRange(): number;
  setViewRange(value: number): MessageOfCharacter;

  getCommonAttack(): number;
  setCommonAttack(value: number): MessageOfCharacter;

  getCommonAttackCd(): number;
  setCommonAttackCd(value: number): MessageOfCharacter;

  getCommonAttackRange(): number;
  setCommonAttackRange(value: number): MessageOfCharacter;

  getSkillAttackCd(): number;
  setSkillAttackCd(value: number): MessageOfCharacter;

  getEconomyDepletion(): number;
  setEconomyDepletion(value: number): MessageOfCharacter;

  getKillScore(): number;
  setKillScore(value: number): MessageOfCharacter;

  getHp(): number;
  setHp(value: number): MessageOfCharacter;

  getShieldEquipment(): number;
  setShieldEquipment(value: number): MessageOfCharacter;

  getShoesEquipment(): number;
  setShoesEquipment(value: number): MessageOfCharacter;

  getShoesTime(): number;
  setShoesTime(value: number): MessageOfCharacter;

  getIsPurified(): boolean;
  setIsPurified(value: boolean): MessageOfCharacter;

  getPurifiedTime(): number;
  setPurifiedTime(value: number): MessageOfCharacter;

  getIsBerserk(): boolean;
  setIsBerserk(value: boolean): MessageOfCharacter;

  getBerserkTime(): number;
  setBerserkTime(value: number): MessageOfCharacter;

  getAttackBuffNum(): number;
  setAttackBuffNum(value: number): MessageOfCharacter;

  getAttackBuffTime(): number;
  setAttackBuffTime(value: number): MessageOfCharacter;

  getSpeedBuffTime(): number;
  setSpeedBuffTime(value: number): MessageOfCharacter;

  getVisionBuffTime(): number;
  setVisionBuffTime(value: number): MessageOfCharacter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfCharacter.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfCharacter): MessageOfCharacter.AsObject;
  static serializeBinaryToWriter(message: MessageOfCharacter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfCharacter;
  static deserializeBinaryFromReader(message: MessageOfCharacter, reader: jspb.BinaryReader): MessageOfCharacter;
}

export namespace MessageOfCharacter {
  export type AsObject = {
    guid: number,
    teamId: number,
    playerId: number,
    characterType: MessageType_pb.CharacterType,
    characterActiveState: MessageType_pb.CharacterState,
    isBlind: boolean,
    blindTime: number,
    isStunned: boolean,
    stunnedTime: number,
    isInvisible: boolean,
    invisibleTime: number,
    isBurned: boolean,
    burnedTime: number,
    harmCut: number,
    harmCutTime: number,
    characterPassiveState: MessageType_pb.CharacterState,
    x: number,
    y: number,
    facingDirection: number,
    speed: number,
    viewRange: number,
    commonAttack: number,
    commonAttackCd: number,
    commonAttackRange: number,
    skillAttackCd: number,
    economyDepletion: number,
    killScore: number,
    hp: number,
    shieldEquipment: number,
    shoesEquipment: number,
    shoesTime: number,
    isPurified: boolean,
    purifiedTime: number,
    isBerserk: boolean,
    berserkTime: number,
    attackBuffNum: number,
    attackBuffTime: number,
    speedBuffTime: number,
    visionBuffTime: number,
  }
}

export class MessageOfBarracks extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfBarracks;

  getY(): number;
  setY(value: number): MessageOfBarracks;

  getHp(): number;
  setHp(value: number): MessageOfBarracks;

  getTeamId(): number;
  setTeamId(value: number): MessageOfBarracks;

  getId(): number;
  setId(value: number): MessageOfBarracks;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfBarracks.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfBarracks): MessageOfBarracks.AsObject;
  static serializeBinaryToWriter(message: MessageOfBarracks, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfBarracks;
  static deserializeBinaryFromReader(message: MessageOfBarracks, reader: jspb.BinaryReader): MessageOfBarracks;
}

export namespace MessageOfBarracks {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
    id: number,
  }
}

export class MessageOfSpring extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfSpring;

  getY(): number;
  setY(value: number): MessageOfSpring;

  getHp(): number;
  setHp(value: number): MessageOfSpring;

  getTeamId(): number;
  setTeamId(value: number): MessageOfSpring;

  getId(): number;
  setId(value: number): MessageOfSpring;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfSpring.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfSpring): MessageOfSpring.AsObject;
  static serializeBinaryToWriter(message: MessageOfSpring, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfSpring;
  static deserializeBinaryFromReader(message: MessageOfSpring, reader: jspb.BinaryReader): MessageOfSpring;
}

export namespace MessageOfSpring {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
    id: number,
  }
}

export class MessageOfFarm extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfFarm;

  getY(): number;
  setY(value: number): MessageOfFarm;

  getHp(): number;
  setHp(value: number): MessageOfFarm;

  getTeamId(): number;
  setTeamId(value: number): MessageOfFarm;

  getId(): number;
  setId(value: number): MessageOfFarm;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfFarm.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfFarm): MessageOfFarm.AsObject;
  static serializeBinaryToWriter(message: MessageOfFarm, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfFarm;
  static deserializeBinaryFromReader(message: MessageOfFarm, reader: jspb.BinaryReader): MessageOfFarm;
}

export namespace MessageOfFarm {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
    id: number,
  }
}

export class MessageOfTrap extends jspb.Message {
  getTrapType(): MessageType_pb.TrapType;
  setTrapType(value: MessageType_pb.TrapType): MessageOfTrap;

  getX(): number;
  setX(value: number): MessageOfTrap;

  getY(): number;
  setY(value: number): MessageOfTrap;

  getTeamId(): number;
  setTeamId(value: number): MessageOfTrap;

  getId(): number;
  setId(value: number): MessageOfTrap;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfTrap.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfTrap): MessageOfTrap.AsObject;
  static serializeBinaryToWriter(message: MessageOfTrap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfTrap;
  static deserializeBinaryFromReader(message: MessageOfTrap, reader: jspb.BinaryReader): MessageOfTrap;
}

export namespace MessageOfTrap {
  export type AsObject = {
    trapType: MessageType_pb.TrapType,
    x: number,
    y: number,
    teamId: number,
    id: number,
  }
}

export class MessageOfEconomyResource extends jspb.Message {
  getEconomyResourceType(): MessageType_pb.EconomyResourceType;
  setEconomyResourceType(value: MessageType_pb.EconomyResourceType): MessageOfEconomyResource;

  getEconomyResourceState(): MessageType_pb.EconomyResourceState;
  setEconomyResourceState(value: MessageType_pb.EconomyResourceState): MessageOfEconomyResource;

  getX(): number;
  setX(value: number): MessageOfEconomyResource;

  getY(): number;
  setY(value: number): MessageOfEconomyResource;

  getProcess(): number;
  setProcess(value: number): MessageOfEconomyResource;

  getId(): number;
  setId(value: number): MessageOfEconomyResource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfEconomyResource.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfEconomyResource): MessageOfEconomyResource.AsObject;
  static serializeBinaryToWriter(message: MessageOfEconomyResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfEconomyResource;
  static deserializeBinaryFromReader(message: MessageOfEconomyResource, reader: jspb.BinaryReader): MessageOfEconomyResource;
}

export namespace MessageOfEconomyResource {
  export type AsObject = {
    economyResourceType: MessageType_pb.EconomyResourceType,
    economyResourceState: MessageType_pb.EconomyResourceState,
    x: number,
    y: number,
    process: number,
    id: number,
  }
}

export class MessageOfAdditionResource extends jspb.Message {
  getAdditionResourceType(): MessageType_pb.AdditionResourceType;
  setAdditionResourceType(value: MessageType_pb.AdditionResourceType): MessageOfAdditionResource;

  getAdditionResourceState(): MessageType_pb.AdditionResourceState;
  setAdditionResourceState(value: MessageType_pb.AdditionResourceState): MessageOfAdditionResource;

  getX(): number;
  setX(value: number): MessageOfAdditionResource;

  getY(): number;
  setY(value: number): MessageOfAdditionResource;

  getHp(): number;
  setHp(value: number): MessageOfAdditionResource;

  getId(): number;
  setId(value: number): MessageOfAdditionResource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfAdditionResource.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfAdditionResource): MessageOfAdditionResource.AsObject;
  static serializeBinaryToWriter(message: MessageOfAdditionResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfAdditionResource;
  static deserializeBinaryFromReader(message: MessageOfAdditionResource, reader: jspb.BinaryReader): MessageOfAdditionResource;
}

export namespace MessageOfAdditionResource {
  export type AsObject = {
    additionResourceType: MessageType_pb.AdditionResourceType,
    additionResourceState: MessageType_pb.AdditionResourceState,
    x: number,
    y: number,
    hp: number,
    id: number,
  }
}

export class MessageOfConstruction extends jspb.Message {
  getConstructionType(): MessageType_pb.ConstructionType;
  setConstructionType(value: MessageType_pb.ConstructionType): MessageOfConstruction;

  getX(): number;
  setX(value: number): MessageOfConstruction;

  getY(): number;
  setY(value: number): MessageOfConstruction;

  getHp(): number;
  setHp(value: number): MessageOfConstruction;

  getTeamId(): number;
  setTeamId(value: number): MessageOfConstruction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfConstruction.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfConstruction): MessageOfConstruction.AsObject;
  static serializeBinaryToWriter(message: MessageOfConstruction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfConstruction;
  static deserializeBinaryFromReader(message: MessageOfConstruction, reader: jspb.BinaryReader): MessageOfConstruction;
}

export namespace MessageOfConstruction {
  export type AsObject = {
    constructionType: MessageType_pb.ConstructionType,
    x: number,
    y: number,
    hp: number,
    teamId: number,
  }
}

export class MessageOfMap extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): MessageOfMap;

  getWidth(): number;
  setWidth(value: number): MessageOfMap;

  getRowsList(): Array<MessageOfMap.Row>;
  setRowsList(value: Array<MessageOfMap.Row>): MessageOfMap;
  clearRowsList(): MessageOfMap;
  addRows(value?: MessageOfMap.Row, index?: number): MessageOfMap.Row;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfMap.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfMap): MessageOfMap.AsObject;
  static serializeBinaryToWriter(message: MessageOfMap, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfMap;
  static deserializeBinaryFromReader(message: MessageOfMap, reader: jspb.BinaryReader): MessageOfMap;
}

export namespace MessageOfMap {
  export type AsObject = {
    height: number,
    width: number,
    rowsList: Array<MessageOfMap.Row.AsObject>,
  }

  export class Row extends jspb.Message {
    getColsList(): Array<MessageType_pb.PlaceType>;
    setColsList(value: Array<MessageType_pb.PlaceType>): Row;
    clearColsList(): Row;
    addCols(value: MessageType_pb.PlaceType, index?: number): Row;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Row.AsObject;
    static toObject(includeInstance: boolean, msg: Row): Row.AsObject;
    static serializeBinaryToWriter(message: Row, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Row;
    static deserializeBinaryFromReader(message: Row, reader: jspb.BinaryReader): Row;
  }

  export namespace Row {
    export type AsObject = {
      colsList: Array<MessageType_pb.PlaceType>,
    }
  }

}

export class MessageOfTeam extends jspb.Message {
  getTeamId(): number;
  setTeamId(value: number): MessageOfTeam;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfTeam;

  getScore(): number;
  setScore(value: number): MessageOfTeam;

  getEnergy(): number;
  setEnergy(value: number): MessageOfTeam;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfTeam.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfTeam): MessageOfTeam.AsObject;
  static serializeBinaryToWriter(message: MessageOfTeam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfTeam;
  static deserializeBinaryFromReader(message: MessageOfTeam, reader: jspb.BinaryReader): MessageOfTeam;
}

export namespace MessageOfTeam {
  export type AsObject = {
    teamId: number,
    playerId: number,
    score: number,
    energy: number,
  }
}

export class MessageOfObj extends jspb.Message {
  getCharacterMessage(): MessageOfCharacter | undefined;
  setCharacterMessage(value?: MessageOfCharacter): MessageOfObj;
  hasCharacterMessage(): boolean;
  clearCharacterMessage(): MessageOfObj;

  getBarracksMessage(): MessageOfBarracks | undefined;
  setBarracksMessage(value?: MessageOfBarracks): MessageOfObj;
  hasBarracksMessage(): boolean;
  clearBarracksMessage(): MessageOfObj;

  getSpringMessage(): MessageOfSpring | undefined;
  setSpringMessage(value?: MessageOfSpring): MessageOfObj;
  hasSpringMessage(): boolean;
  clearSpringMessage(): MessageOfObj;

  getFarmMessage(): MessageOfFarm | undefined;
  setFarmMessage(value?: MessageOfFarm): MessageOfObj;
  hasFarmMessage(): boolean;
  clearFarmMessage(): MessageOfObj;

  getTrapMessage(): MessageOfTrap | undefined;
  setTrapMessage(value?: MessageOfTrap): MessageOfObj;
  hasTrapMessage(): boolean;
  clearTrapMessage(): MessageOfObj;

  getEconomyResourceMessage(): MessageOfEconomyResource | undefined;
  setEconomyResourceMessage(value?: MessageOfEconomyResource): MessageOfObj;
  hasEconomyResourceMessage(): boolean;
  clearEconomyResourceMessage(): MessageOfObj;

  getAdditionResourceMessage(): MessageOfAdditionResource | undefined;
  setAdditionResourceMessage(value?: MessageOfAdditionResource): MessageOfObj;
  hasAdditionResourceMessage(): boolean;
  clearAdditionResourceMessage(): MessageOfObj;

  getMapMessage(): MessageOfMap | undefined;
  setMapMessage(value?: MessageOfMap): MessageOfObj;
  hasMapMessage(): boolean;
  clearMapMessage(): MessageOfObj;

  getNewsMessage(): MessageOfNews | undefined;
  setNewsMessage(value?: MessageOfNews): MessageOfObj;
  hasNewsMessage(): boolean;
  clearNewsMessage(): MessageOfObj;

  getTeamMessage(): MessageOfTeam | undefined;
  setTeamMessage(value?: MessageOfTeam): MessageOfObj;
  hasTeamMessage(): boolean;
  clearTeamMessage(): MessageOfObj;

  getMessageOfObjCase(): MessageOfObj.MessageOfObjCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfObj.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfObj): MessageOfObj.AsObject;
  static serializeBinaryToWriter(message: MessageOfObj, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfObj;
  static deserializeBinaryFromReader(message: MessageOfObj, reader: jspb.BinaryReader): MessageOfObj;
}

export namespace MessageOfObj {
  export type AsObject = {
    characterMessage?: MessageOfCharacter.AsObject,
    barracksMessage?: MessageOfBarracks.AsObject,
    springMessage?: MessageOfSpring.AsObject,
    farmMessage?: MessageOfFarm.AsObject,
    trapMessage?: MessageOfTrap.AsObject,
    economyResourceMessage?: MessageOfEconomyResource.AsObject,
    additionResourceMessage?: MessageOfAdditionResource.AsObject,
    mapMessage?: MessageOfMap.AsObject,
    newsMessage?: MessageOfNews.AsObject,
    teamMessage?: MessageOfTeam.AsObject,
  }

  export enum MessageOfObjCase { 
    MESSAGE_OF_OBJ_NOT_SET = 0,
    CHARACTER_MESSAGE = 1,
    BARRACKS_MESSAGE = 2,
    SPRING_MESSAGE = 3,
    FARM_MESSAGE = 4,
    TRAP_MESSAGE = 5,
    ECONOMY_RESOURCE_MESSAGE = 6,
    ADDITION_RESOURCE_MESSAGE = 7,
    MAP_MESSAGE = 8,
    NEWS_MESSAGE = 9,
    TEAM_MESSAGE = 10,
  }
}

export class MessageOfAll extends jspb.Message {
  getGameTime(): number;
  setGameTime(value: number): MessageOfAll;

  getBuddhistsTeamScore(): number;
  setBuddhistsTeamScore(value: number): MessageOfAll;

  getMonstersTeamScore(): number;
  setMonstersTeamScore(value: number): MessageOfAll;

  getBuddhistsTeamEconomy(): number;
  setBuddhistsTeamEconomy(value: number): MessageOfAll;

  getMonstersTeamEconomy(): number;
  setMonstersTeamEconomy(value: number): MessageOfAll;

  getBuddhistsHeroHp(): number;
  setBuddhistsHeroHp(value: number): MessageOfAll;

  getMonstersHeroHp(): number;
  setMonstersHeroHp(value: number): MessageOfAll;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfAll.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfAll): MessageOfAll.AsObject;
  static serializeBinaryToWriter(message: MessageOfAll, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfAll;
  static deserializeBinaryFromReader(message: MessageOfAll, reader: jspb.BinaryReader): MessageOfAll;
}

export namespace MessageOfAll {
  export type AsObject = {
    gameTime: number,
    buddhistsTeamScore: number,
    monstersTeamScore: number,
    buddhistsTeamEconomy: number,
    monstersTeamEconomy: number,
    buddhistsHeroHp: number,
    monstersHeroHp: number,
  }
}

export class MessageToClient extends jspb.Message {
  getObjMessageList(): Array<MessageOfObj>;
  setObjMessageList(value: Array<MessageOfObj>): MessageToClient;
  clearObjMessageList(): MessageToClient;
  addObjMessage(value?: MessageOfObj, index?: number): MessageOfObj;

  getGameState(): MessageType_pb.GameState;
  setGameState(value: MessageType_pb.GameState): MessageToClient;

  getAllMessage(): MessageOfAll | undefined;
  setAllMessage(value?: MessageOfAll): MessageToClient;
  hasAllMessage(): boolean;
  clearAllMessage(): MessageToClient;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageToClient.AsObject;
  static toObject(includeInstance: boolean, msg: MessageToClient): MessageToClient.AsObject;
  static serializeBinaryToWriter(message: MessageToClient, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageToClient;
  static deserializeBinaryFromReader(message: MessageToClient, reader: jspb.BinaryReader): MessageToClient;
}

export namespace MessageToClient {
  export type AsObject = {
    objMessageList: Array<MessageOfObj.AsObject>,
    gameState: MessageType_pb.GameState,
    allMessage?: MessageOfAll.AsObject,
  }
}

export class MoveRes extends jspb.Message {
  getActualSpeed(): number;
  setActualSpeed(value: number): MoveRes;

  getActualAngle(): number;
  setActualAngle(value: number): MoveRes;

  getActSuccess(): boolean;
  setActSuccess(value: boolean): MoveRes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveRes.AsObject;
  static toObject(includeInstance: boolean, msg: MoveRes): MoveRes.AsObject;
  static serializeBinaryToWriter(message: MoveRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveRes;
  static deserializeBinaryFromReader(message: MoveRes, reader: jspb.BinaryReader): MoveRes;
}

export namespace MoveRes {
  export type AsObject = {
    actualSpeed: number,
    actualAngle: number,
    actSuccess: boolean,
  }
}

export class CreatCharacterRes extends jspb.Message {
  getActSuccess(): boolean;
  setActSuccess(value: boolean): CreatCharacterRes;

  getPlayerId(): number;
  setPlayerId(value: number): CreatCharacterRes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatCharacterRes.AsObject;
  static toObject(includeInstance: boolean, msg: CreatCharacterRes): CreatCharacterRes.AsObject;
  static serializeBinaryToWriter(message: CreatCharacterRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatCharacterRes;
  static deserializeBinaryFromReader(message: CreatCharacterRes, reader: jspb.BinaryReader): CreatCharacterRes;
}

export namespace CreatCharacterRes {
  export type AsObject = {
    actSuccess: boolean,
    playerId: number,
  }
}

export class BoolRes extends jspb.Message {
  getActSuccess(): boolean;
  setActSuccess(value: boolean): BoolRes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolRes.AsObject;
  static toObject(includeInstance: boolean, msg: BoolRes): BoolRes.AsObject;
  static serializeBinaryToWriter(message: BoolRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BoolRes;
  static deserializeBinaryFromReader(message: BoolRes, reader: jspb.BinaryReader): BoolRes;
}

export namespace BoolRes {
  export type AsObject = {
    actSuccess: boolean,
  }
}

export class CharacterInfoRes extends jspb.Message {
  getCharacterInfoList(): Array<MessageOfCharacter>;
  setCharacterInfoList(value: Array<MessageOfCharacter>): CharacterInfoRes;
  clearCharacterInfoList(): CharacterInfoRes;
  addCharacterInfo(value?: MessageOfCharacter, index?: number): MessageOfCharacter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CharacterInfoRes.AsObject;
  static toObject(includeInstance: boolean, msg: CharacterInfoRes): CharacterInfoRes.AsObject;
  static serializeBinaryToWriter(message: CharacterInfoRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CharacterInfoRes;
  static deserializeBinaryFromReader(message: CharacterInfoRes, reader: jspb.BinaryReader): CharacterInfoRes;
}

export namespace CharacterInfoRes {
  export type AsObject = {
    characterInfoList: Array<MessageOfCharacter.AsObject>,
  }
}

export class EcoRes extends jspb.Message {
  getEconomy(): number;
  setEconomy(value: number): EcoRes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EcoRes.AsObject;
  static toObject(includeInstance: boolean, msg: EcoRes): EcoRes.AsObject;
  static serializeBinaryToWriter(message: EcoRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EcoRes;
  static deserializeBinaryFromReader(message: EcoRes, reader: jspb.BinaryReader): EcoRes;
}

export namespace EcoRes {
  export type AsObject = {
    economy: number,
  }
}

export class MessageOfNews extends jspb.Message {
  getTextMessage(): string;
  setTextMessage(value: string): MessageOfNews;

  getBinaryMessage(): Uint8Array | string;
  getBinaryMessage_asU8(): Uint8Array;
  getBinaryMessage_asB64(): string;
  setBinaryMessage(value: Uint8Array | string): MessageOfNews;

  getFromId(): number;
  setFromId(value: number): MessageOfNews;

  getToId(): number;
  setToId(value: number): MessageOfNews;

  getTeamId(): number;
  setTeamId(value: number): MessageOfNews;

  getNewsCase(): MessageOfNews.NewsCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfNews.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfNews): MessageOfNews.AsObject;
  static serializeBinaryToWriter(message: MessageOfNews, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfNews;
  static deserializeBinaryFromReader(message: MessageOfNews, reader: jspb.BinaryReader): MessageOfNews;
}

export namespace MessageOfNews {
  export type AsObject = {
    textMessage: string,
    binaryMessage: Uint8Array | string,
    fromId: number,
    toId: number,
    teamId: number,
  }

  export enum NewsCase { 
    NEWS_NOT_SET = 0,
    TEXT_MESSAGE = 1,
    BINARY_MESSAGE = 2,
  }
}

