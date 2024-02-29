import * as jspb from 'google-protobuf'

import * as MessageType_pb from './MessageType_pb';


export class MessageOfShip extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfShip;

  getY(): number;
  setY(value: number): MessageOfShip;

  getSpeed(): number;
  setSpeed(value: number): MessageOfShip;

  getHp(): number;
  setHp(value: number): MessageOfShip;

  getArmor(): number;
  setArmor(value: number): MessageOfShip;

  getShield(): number;
  setShield(value: number): MessageOfShip;

  getTeamId(): number;
  setTeamId(value: number): MessageOfShip;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfShip;

  getGuid(): number;
  setGuid(value: number): MessageOfShip;

  getShipState(): MessageType_pb.ShipState;
  setShipState(value: MessageType_pb.ShipState): MessageOfShip;

  getShipType(): MessageType_pb.ShipType;
  setShipType(value: MessageType_pb.ShipType): MessageOfShip;

  getViewRange(): number;
  setViewRange(value: number): MessageOfShip;

  getProducerType(): MessageType_pb.ProducerType;
  setProducerType(value: MessageType_pb.ProducerType): MessageOfShip;

  getConstructorType(): MessageType_pb.ConstructorType;
  setConstructorType(value: MessageType_pb.ConstructorType): MessageOfShip;

  getArmorType(): MessageType_pb.ArmorType;
  setArmorType(value: MessageType_pb.ArmorType): MessageOfShip;

  getShieldType(): MessageType_pb.ShieldType;
  setShieldType(value: MessageType_pb.ShieldType): MessageOfShip;

  getWeaponType(): MessageType_pb.WeaponType;
  setWeaponType(value: MessageType_pb.WeaponType): MessageOfShip;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfShip;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfShip.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfShip): MessageOfShip.AsObject;
  static serializeBinaryToWriter(message: MessageOfShip, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfShip;
  static deserializeBinaryFromReader(message: MessageOfShip, reader: jspb.BinaryReader): MessageOfShip;
}

export namespace MessageOfShip {
  export type AsObject = {
    x: number,
    y: number,
    speed: number,
    hp: number,
    armor: number,
    shield: number,
    teamId: number,
    playerId: number,
    guid: number,
    shipState: MessageType_pb.ShipState,
    shipType: MessageType_pb.ShipType,
    viewRange: number,
    producerType: MessageType_pb.ProducerType,
    constructorType: MessageType_pb.ConstructorType,
    armorType: MessageType_pb.ArmorType,
    shieldType: MessageType_pb.ShieldType,
    weaponType: MessageType_pb.WeaponType,
    facingDirection: number,
  }
}

export class MessageOfBullet extends jspb.Message {
  getType(): MessageType_pb.BulletType;
  setType(value: MessageType_pb.BulletType): MessageOfBullet;

  getX(): number;
  setX(value: number): MessageOfBullet;

  getY(): number;
  setY(value: number): MessageOfBullet;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfBullet;

  getDamage(): number;
  setDamage(value: number): MessageOfBullet;

  getTeamId(): number;
  setTeamId(value: number): MessageOfBullet;

  getGuid(): number;
  setGuid(value: number): MessageOfBullet;

  getBombRange(): number;
  setBombRange(value: number): MessageOfBullet;

  getSpeed(): number;
  setSpeed(value: number): MessageOfBullet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfBullet.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfBullet): MessageOfBullet.AsObject;
  static serializeBinaryToWriter(message: MessageOfBullet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfBullet;
  static deserializeBinaryFromReader(message: MessageOfBullet, reader: jspb.BinaryReader): MessageOfBullet;
}

export namespace MessageOfBullet {
  export type AsObject = {
    type: MessageType_pb.BulletType,
    x: number,
    y: number,
    facingDirection: number,
    damage: number,
    teamId: number,
    guid: number,
    bombRange: number,
    speed: number,
  }
}

export class MessageOfBombedBullet extends jspb.Message {
  getType(): MessageType_pb.BulletType;
  setType(value: MessageType_pb.BulletType): MessageOfBombedBullet;

  getX(): number;
  setX(value: number): MessageOfBombedBullet;

  getY(): number;
  setY(value: number): MessageOfBombedBullet;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfBombedBullet;

  getMappingId(): number;
  setMappingId(value: number): MessageOfBombedBullet;

  getBombRange(): number;
  setBombRange(value: number): MessageOfBombedBullet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfBombedBullet.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfBombedBullet): MessageOfBombedBullet.AsObject;
  static serializeBinaryToWriter(message: MessageOfBombedBullet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfBombedBullet;
  static deserializeBinaryFromReader(message: MessageOfBombedBullet, reader: jspb.BinaryReader): MessageOfBombedBullet;
}

export namespace MessageOfBombedBullet {
  export type AsObject = {
    type: MessageType_pb.BulletType,
    x: number,
    y: number,
    facingDirection: number,
    mappingId: number,
    bombRange: number,
  }
}

export class MessageOfFactory extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfFactory;

  getY(): number;
  setY(value: number): MessageOfFactory;

  getHp(): number;
  setHp(value: number): MessageOfFactory;

  getTeamId(): number;
  setTeamId(value: number): MessageOfFactory;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfFactory.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfFactory): MessageOfFactory.AsObject;
  static serializeBinaryToWriter(message: MessageOfFactory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfFactory;
  static deserializeBinaryFromReader(message: MessageOfFactory, reader: jspb.BinaryReader): MessageOfFactory;
}

export namespace MessageOfFactory {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
  }
}

export class MessageOfCommunity extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfCommunity;

  getY(): number;
  setY(value: number): MessageOfCommunity;

  getHp(): number;
  setHp(value: number): MessageOfCommunity;

  getTeamId(): number;
  setTeamId(value: number): MessageOfCommunity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfCommunity.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfCommunity): MessageOfCommunity.AsObject;
  static serializeBinaryToWriter(message: MessageOfCommunity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfCommunity;
  static deserializeBinaryFromReader(message: MessageOfCommunity, reader: jspb.BinaryReader): MessageOfCommunity;
}

export namespace MessageOfCommunity {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
  }
}

export class MessageOfFort extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfFort;

  getY(): number;
  setY(value: number): MessageOfFort;

  getHp(): number;
  setHp(value: number): MessageOfFort;

  getTeamId(): number;
  setTeamId(value: number): MessageOfFort;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfFort.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfFort): MessageOfFort.AsObject;
  static serializeBinaryToWriter(message: MessageOfFort, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfFort;
  static deserializeBinaryFromReader(message: MessageOfFort, reader: jspb.BinaryReader): MessageOfFort;
}

export namespace MessageOfFort {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
    teamId: number,
  }
}

export class MessageOfWormhole extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfWormhole;

  getY(): number;
  setY(value: number): MessageOfWormhole;

  getHp(): number;
  setHp(value: number): MessageOfWormhole;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfWormhole.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfWormhole): MessageOfWormhole.AsObject;
  static serializeBinaryToWriter(message: MessageOfWormhole, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfWormhole;
  static deserializeBinaryFromReader(message: MessageOfWormhole, reader: jspb.BinaryReader): MessageOfWormhole;
}

export namespace MessageOfWormhole {
  export type AsObject = {
    x: number,
    y: number,
    hp: number,
  }
}

export class MessageOfResource extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfResource;

  getY(): number;
  setY(value: number): MessageOfResource;

  getProgress(): number;
  setProgress(value: number): MessageOfResource;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfResource.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfResource): MessageOfResource.AsObject;
  static serializeBinaryToWriter(message: MessageOfResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfResource;
  static deserializeBinaryFromReader(message: MessageOfResource, reader: jspb.BinaryReader): MessageOfResource;
}

export namespace MessageOfResource {
  export type AsObject = {
    x: number,
    y: number,
    progress: number,
  }
}

export class MessageOfHome extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfHome;

  getY(): number;
  setY(value: number): MessageOfHome;

  getHp(): number;
  setHp(value: number): MessageOfHome;

  getTeamId(): number;
  setTeamId(value: number): MessageOfHome;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfHome.AsObject;
  static toObject(includeInstance: boolean, msg: MessageOfHome): MessageOfHome.AsObject;
  static serializeBinaryToWriter(message: MessageOfHome, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfHome;
  static deserializeBinaryFromReader(message: MessageOfHome, reader: jspb.BinaryReader): MessageOfHome;
}

export namespace MessageOfHome {
  export type AsObject = {
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

  getMoney(): number;
  setMoney(value: number): MessageOfTeam;

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
    money: number,
  }
}

export class MessageOfObj extends jspb.Message {
  getShipMessage(): MessageOfShip | undefined;
  setShipMessage(value?: MessageOfShip): MessageOfObj;
  hasShipMessage(): boolean;
  clearShipMessage(): MessageOfObj;

  getBulletMessage(): MessageOfBullet | undefined;
  setBulletMessage(value?: MessageOfBullet): MessageOfObj;
  hasBulletMessage(): boolean;
  clearBulletMessage(): MessageOfObj;

  getFactoryMessage(): MessageOfFactory | undefined;
  setFactoryMessage(value?: MessageOfFactory): MessageOfObj;
  hasFactoryMessage(): boolean;
  clearFactoryMessage(): MessageOfObj;

  getCommunityMessage(): MessageOfCommunity | undefined;
  setCommunityMessage(value?: MessageOfCommunity): MessageOfObj;
  hasCommunityMessage(): boolean;
  clearCommunityMessage(): MessageOfObj;

  getFortMessage(): MessageOfFort | undefined;
  setFortMessage(value?: MessageOfFort): MessageOfObj;
  hasFortMessage(): boolean;
  clearFortMessage(): MessageOfObj;

  getWormholeMessage(): MessageOfWormhole | undefined;
  setWormholeMessage(value?: MessageOfWormhole): MessageOfObj;
  hasWormholeMessage(): boolean;
  clearWormholeMessage(): MessageOfObj;

  getHomeMessage(): MessageOfHome | undefined;
  setHomeMessage(value?: MessageOfHome): MessageOfObj;
  hasHomeMessage(): boolean;
  clearHomeMessage(): MessageOfObj;

  getResourceMessage(): MessageOfResource | undefined;
  setResourceMessage(value?: MessageOfResource): MessageOfObj;
  hasResourceMessage(): boolean;
  clearResourceMessage(): MessageOfObj;

  getMapMessage(): MessageOfMap | undefined;
  setMapMessage(value?: MessageOfMap): MessageOfObj;
  hasMapMessage(): boolean;
  clearMapMessage(): MessageOfObj;

  getNewsMessage(): MessageOfNews | undefined;
  setNewsMessage(value?: MessageOfNews): MessageOfObj;
  hasNewsMessage(): boolean;
  clearNewsMessage(): MessageOfObj;

  getBombedBulletMessage(): MessageOfBombedBullet | undefined;
  setBombedBulletMessage(value?: MessageOfBombedBullet): MessageOfObj;
  hasBombedBulletMessage(): boolean;
  clearBombedBulletMessage(): MessageOfObj;

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
    shipMessage?: MessageOfShip.AsObject,
    bulletMessage?: MessageOfBullet.AsObject,
    factoryMessage?: MessageOfFactory.AsObject,
    communityMessage?: MessageOfCommunity.AsObject,
    fortMessage?: MessageOfFort.AsObject,
    wormholeMessage?: MessageOfWormhole.AsObject,
    homeMessage?: MessageOfHome.AsObject,
    resourceMessage?: MessageOfResource.AsObject,
    mapMessage?: MessageOfMap.AsObject,
    newsMessage?: MessageOfNews.AsObject,
    bombedBulletMessage?: MessageOfBombedBullet.AsObject,
    teamMessage?: MessageOfTeam.AsObject,
  }

  export enum MessageOfObjCase { 
    MESSAGE_OF_OBJ_NOT_SET = 0,
    SHIP_MESSAGE = 1,
    BULLET_MESSAGE = 2,
    FACTORY_MESSAGE = 3,
    COMMUNITY_MESSAGE = 4,
    FORT_MESSAGE = 5,
    WORMHOLE_MESSAGE = 6,
    HOME_MESSAGE = 7,
    RESOURCE_MESSAGE = 8,
    MAP_MESSAGE = 9,
    NEWS_MESSAGE = 10,
    BOMBED_BULLET_MESSAGE = 11,
    TEAM_MESSAGE = 12,
  }
}

export class MessageOfAll extends jspb.Message {
  getGameTime(): number;
  setGameTime(value: number): MessageOfAll;

  getRedTeamScore(): number;
  setRedTeamScore(value: number): MessageOfAll;

  getBlueTeamScore(): number;
  setBlueTeamScore(value: number): MessageOfAll;

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
    redTeamScore: number,
    blueTeamScore: number,
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

export class ShipInfoRes extends jspb.Message {
  getShipInfoList(): Array<MessageOfShip>;
  setShipInfoList(value: Array<MessageOfShip>): ShipInfoRes;
  clearShipInfoList(): ShipInfoRes;
  addShipInfo(value?: MessageOfShip, index?: number): MessageOfShip;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShipInfoRes.AsObject;
  static toObject(includeInstance: boolean, msg: ShipInfoRes): ShipInfoRes.AsObject;
  static serializeBinaryToWriter(message: ShipInfoRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShipInfoRes;
  static deserializeBinaryFromReader(message: ShipInfoRes, reader: jspb.BinaryReader): ShipInfoRes;
}

export namespace ShipInfoRes {
  export type AsObject = {
    shipInfoList: Array<MessageOfShip.AsObject>,
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
  }

  export enum NewsCase { 
    NEWS_NOT_SET = 0,
    TEXT_MESSAGE = 1,
    BINARY_MESSAGE = 4,
  }
}

