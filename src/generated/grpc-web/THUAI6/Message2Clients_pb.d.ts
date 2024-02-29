import * as jspb from "google-protobuf";

import * as MessageType_pb from "./MessageType_pb";

export class MessageOfStudent extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfStudent;

  getY(): number;
  setY(value: number): MessageOfStudent;

  getSpeed(): number;
  setSpeed(value: number): MessageOfStudent;

  getDetermination(): number;
  setDetermination(value: number): MessageOfStudent;

  getAddiction(): number;
  setAddiction(value: number): MessageOfStudent;

  getTimeUntilSkillAvailableList(): Array<number>;
  setTimeUntilSkillAvailableList(value: Array<number>): MessageOfStudent;
  clearTimeUntilSkillAvailableList(): MessageOfStudent;
  addTimeUntilSkillAvailable(value: number, index?: number): MessageOfStudent;

  getPropList(): Array<MessageType_pb.PropType>;
  setPropList(value: Array<MessageType_pb.PropType>): MessageOfStudent;
  clearPropList(): MessageOfStudent;
  addProp(value: MessageType_pb.PropType, index?: number): MessageOfStudent;

  getPlayerState(): MessageType_pb.PlayerState;
  setPlayerState(value: MessageType_pb.PlayerState): MessageOfStudent;

  getGuid(): number;
  setGuid(value: number): MessageOfStudent;

  getBulletType(): MessageType_pb.BulletType;
  setBulletType(value: MessageType_pb.BulletType): MessageOfStudent;

  getLearningSpeed(): number;
  setLearningSpeed(value: number): MessageOfStudent;

  getTreatSpeed(): number;
  setTreatSpeed(value: number): MessageOfStudent;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfStudent;

  getViewRange(): number;
  setViewRange(value: number): MessageOfStudent;

  getRadius(): number;
  setRadius(value: number): MessageOfStudent;

  getDangerAlert(): number;
  setDangerAlert(value: number): MessageOfStudent;

  getScore(): number;
  setScore(value: number): MessageOfStudent;

  getTreatProgress(): number;
  setTreatProgress(value: number): MessageOfStudent;

  getRescueProgress(): number;
  setRescueProgress(value: number): MessageOfStudent;

  getStudentType(): MessageType_pb.StudentType;
  setStudentType(value: MessageType_pb.StudentType): MessageOfStudent;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfStudent;

  getBuffList(): Array<MessageType_pb.StudentBuffType>;
  setBuffList(value: Array<MessageType_pb.StudentBuffType>): MessageOfStudent;
  clearBuffList(): MessageOfStudent;
  addBuff(
    value: MessageType_pb.StudentBuffType,
    index?: number,
  ): MessageOfStudent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfStudent.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfStudent,
  ): MessageOfStudent.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfStudent,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfStudent;
  static deserializeBinaryFromReader(
    message: MessageOfStudent,
    reader: jspb.BinaryReader,
  ): MessageOfStudent;
}

export namespace MessageOfStudent {
  export type AsObject = {
    x: number;
    y: number;
    speed: number;
    determination: number;
    addiction: number;
    timeUntilSkillAvailableList: Array<number>;
    propList: Array<MessageType_pb.PropType>;
    playerState: MessageType_pb.PlayerState;
    guid: number;
    bulletType: MessageType_pb.BulletType;
    learningSpeed: number;
    treatSpeed: number;
    playerId: number;
    viewRange: number;
    radius: number;
    dangerAlert: number;
    score: number;
    treatProgress: number;
    rescueProgress: number;
    studentType: MessageType_pb.StudentType;
    facingDirection: number;
    buffList: Array<MessageType_pb.StudentBuffType>;
  };
}

export class MessageOfTricker extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfTricker;

  getY(): number;
  setY(value: number): MessageOfTricker;

  getSpeed(): number;
  setSpeed(value: number): MessageOfTricker;

  getTimeUntilSkillAvailableList(): Array<number>;
  setTimeUntilSkillAvailableList(value: Array<number>): MessageOfTricker;
  clearTimeUntilSkillAvailableList(): MessageOfTricker;
  addTimeUntilSkillAvailable(value: number, index?: number): MessageOfTricker;

  getPropList(): Array<MessageType_pb.PropType>;
  setPropList(value: Array<MessageType_pb.PropType>): MessageOfTricker;
  clearPropList(): MessageOfTricker;
  addProp(value: MessageType_pb.PropType, index?: number): MessageOfTricker;

  getTrickerType(): MessageType_pb.TrickerType;
  setTrickerType(value: MessageType_pb.TrickerType): MessageOfTricker;

  getGuid(): number;
  setGuid(value: number): MessageOfTricker;

  getScore(): number;
  setScore(value: number): MessageOfTricker;

  getPlayerId(): number;
  setPlayerId(value: number): MessageOfTricker;

  getViewRange(): number;
  setViewRange(value: number): MessageOfTricker;

  getRadius(): number;
  setRadius(value: number): MessageOfTricker;

  getPlayerState(): MessageType_pb.PlayerState;
  setPlayerState(value: MessageType_pb.PlayerState): MessageOfTricker;

  getTrickDesire(): number;
  setTrickDesire(value: number): MessageOfTricker;

  getClassVolume(): number;
  setClassVolume(value: number): MessageOfTricker;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfTricker;

  getBulletType(): MessageType_pb.BulletType;
  setBulletType(value: MessageType_pb.BulletType): MessageOfTricker;

  getBuffList(): Array<MessageType_pb.TrickerBuffType>;
  setBuffList(value: Array<MessageType_pb.TrickerBuffType>): MessageOfTricker;
  clearBuffList(): MessageOfTricker;
  addBuff(
    value: MessageType_pb.TrickerBuffType,
    index?: number,
  ): MessageOfTricker;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfTricker.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfTricker,
  ): MessageOfTricker.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfTricker,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfTricker;
  static deserializeBinaryFromReader(
    message: MessageOfTricker,
    reader: jspb.BinaryReader,
  ): MessageOfTricker;
}

export namespace MessageOfTricker {
  export type AsObject = {
    x: number;
    y: number;
    speed: number;
    timeUntilSkillAvailableList: Array<number>;
    propList: Array<MessageType_pb.PropType>;
    trickerType: MessageType_pb.TrickerType;
    guid: number;
    score: number;
    playerId: number;
    viewRange: number;
    radius: number;
    playerState: MessageType_pb.PlayerState;
    trickDesire: number;
    classVolume: number;
    facingDirection: number;
    bulletType: MessageType_pb.BulletType;
    buffList: Array<MessageType_pb.TrickerBuffType>;
  };
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

  getGuid(): number;
  setGuid(value: number): MessageOfBullet;

  getTeam(): MessageType_pb.PlayerType;
  setTeam(value: MessageType_pb.PlayerType): MessageOfBullet;

  getBombRange(): number;
  setBombRange(value: number): MessageOfBullet;

  getSpeed(): number;
  setSpeed(value: number): MessageOfBullet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfBullet.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfBullet,
  ): MessageOfBullet.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfBullet,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfBullet;
  static deserializeBinaryFromReader(
    message: MessageOfBullet,
    reader: jspb.BinaryReader,
  ): MessageOfBullet;
}

export namespace MessageOfBullet {
  export type AsObject = {
    type: MessageType_pb.BulletType;
    x: number;
    y: number;
    facingDirection: number;
    guid: number;
    team: MessageType_pb.PlayerType;
    bombRange: number;
    speed: number;
  };
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
  static toObject(
    includeInstance: boolean,
    msg: MessageOfBombedBullet,
  ): MessageOfBombedBullet.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfBombedBullet,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfBombedBullet;
  static deserializeBinaryFromReader(
    message: MessageOfBombedBullet,
    reader: jspb.BinaryReader,
  ): MessageOfBombedBullet;
}

export namespace MessageOfBombedBullet {
  export type AsObject = {
    type: MessageType_pb.BulletType;
    x: number;
    y: number;
    facingDirection: number;
    mappingId: number;
    bombRange: number;
  };
}

export class MessageOfProp extends jspb.Message {
  getType(): MessageType_pb.PropType;
  setType(value: MessageType_pb.PropType): MessageOfProp;

  getX(): number;
  setX(value: number): MessageOfProp;

  getY(): number;
  setY(value: number): MessageOfProp;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfProp;

  getGuid(): number;
  setGuid(value: number): MessageOfProp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfProp.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfProp,
  ): MessageOfProp.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfProp,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfProp;
  static deserializeBinaryFromReader(
    message: MessageOfProp,
    reader: jspb.BinaryReader,
  ): MessageOfProp;
}

export namespace MessageOfProp {
  export type AsObject = {
    type: MessageType_pb.PropType;
    x: number;
    y: number;
    facingDirection: number;
    guid: number;
  };
}

export class MessageOfPickedProp extends jspb.Message {
  getType(): MessageType_pb.PropType;
  setType(value: MessageType_pb.PropType): MessageOfPickedProp;

  getX(): number;
  setX(value: number): MessageOfPickedProp;

  getY(): number;
  setY(value: number): MessageOfPickedProp;

  getFacingDirection(): number;
  setFacingDirection(value: number): MessageOfPickedProp;

  getMappingId(): number;
  setMappingId(value: number): MessageOfPickedProp;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfPickedProp.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfPickedProp,
  ): MessageOfPickedProp.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfPickedProp,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfPickedProp;
  static deserializeBinaryFromReader(
    message: MessageOfPickedProp,
    reader: jspb.BinaryReader,
  ): MessageOfPickedProp;
}

export namespace MessageOfPickedProp {
  export type AsObject = {
    type: MessageType_pb.PropType;
    x: number;
    y: number;
    facingDirection: number;
    mappingId: number;
  };
}

export class MessageOfClassroom extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfClassroom;

  getY(): number;
  setY(value: number): MessageOfClassroom;

  getProgress(): number;
  setProgress(value: number): MessageOfClassroom;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfClassroom.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfClassroom,
  ): MessageOfClassroom.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfClassroom,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfClassroom;
  static deserializeBinaryFromReader(
    message: MessageOfClassroom,
    reader: jspb.BinaryReader,
  ): MessageOfClassroom;
}

export namespace MessageOfClassroom {
  export type AsObject = {
    x: number;
    y: number;
    progress: number;
  };
}

export class MessageOfGate extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfGate;

  getY(): number;
  setY(value: number): MessageOfGate;

  getProgress(): number;
  setProgress(value: number): MessageOfGate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfGate.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfGate,
  ): MessageOfGate.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfGate,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfGate;
  static deserializeBinaryFromReader(
    message: MessageOfGate,
    reader: jspb.BinaryReader,
  ): MessageOfGate;
}

export namespace MessageOfGate {
  export type AsObject = {
    x: number;
    y: number;
    progress: number;
  };
}

export class MessageOfHiddenGate extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfHiddenGate;

  getY(): number;
  setY(value: number): MessageOfHiddenGate;

  getOpened(): boolean;
  setOpened(value: boolean): MessageOfHiddenGate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfHiddenGate.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfHiddenGate,
  ): MessageOfHiddenGate.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfHiddenGate,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfHiddenGate;
  static deserializeBinaryFromReader(
    message: MessageOfHiddenGate,
    reader: jspb.BinaryReader,
  ): MessageOfHiddenGate;
}

export namespace MessageOfHiddenGate {
  export type AsObject = {
    x: number;
    y: number;
    opened: boolean;
  };
}

export class MessageOfDoor extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfDoor;

  getY(): number;
  setY(value: number): MessageOfDoor;

  getIsOpen(): boolean;
  setIsOpen(value: boolean): MessageOfDoor;

  getProgress(): number;
  setProgress(value: number): MessageOfDoor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfDoor.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfDoor,
  ): MessageOfDoor.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfDoor,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfDoor;
  static deserializeBinaryFromReader(
    message: MessageOfDoor,
    reader: jspb.BinaryReader,
  ): MessageOfDoor;
}

export namespace MessageOfDoor {
  export type AsObject = {
    x: number;
    y: number;
    isOpen: boolean;
    progress: number;
  };
}

export class MessageOfChest extends jspb.Message {
  getX(): number;
  setX(value: number): MessageOfChest;

  getY(): number;
  setY(value: number): MessageOfChest;

  getProgress(): number;
  setProgress(value: number): MessageOfChest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfChest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfChest,
  ): MessageOfChest.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfChest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfChest;
  static deserializeBinaryFromReader(
    message: MessageOfChest,
    reader: jspb.BinaryReader,
  ): MessageOfChest;
}

export namespace MessageOfChest {
  export type AsObject = {
    x: number;
    y: number;
    progress: number;
  };
}

export class MessageOfMap extends jspb.Message {
  getRowList(): Array<MessageOfMap.Row>;
  setRowList(value: Array<MessageOfMap.Row>): MessageOfMap;
  clearRowList(): MessageOfMap;
  addRow(value?: MessageOfMap.Row, index?: number): MessageOfMap.Row;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfMap.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfMap,
  ): MessageOfMap.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfMap,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfMap;
  static deserializeBinaryFromReader(
    message: MessageOfMap,
    reader: jspb.BinaryReader,
  ): MessageOfMap;
}

export namespace MessageOfMap {
  export type AsObject = {
    rowList: Array<MessageOfMap.Row.AsObject>;
  };

  export class Row extends jspb.Message {
    getColList(): Array<MessageType_pb.PlaceType>;
    setColList(value: Array<MessageType_pb.PlaceType>): Row;
    clearColList(): Row;
    addCol(value: MessageType_pb.PlaceType, index?: number): Row;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Row.AsObject;
    static toObject(includeInstance: boolean, msg: Row): Row.AsObject;
    static serializeBinaryToWriter(
      message: Row,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): Row;
    static deserializeBinaryFromReader(
      message: Row,
      reader: jspb.BinaryReader,
    ): Row;
  }

  export namespace Row {
    export type AsObject = {
      colList: Array<MessageType_pb.PlaceType>;
    };
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
  static toObject(
    includeInstance: boolean,
    msg: MessageOfNews,
  ): MessageOfNews.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfNews,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfNews;
  static deserializeBinaryFromReader(
    message: MessageOfNews,
    reader: jspb.BinaryReader,
  ): MessageOfNews;
}

export namespace MessageOfNews {
  export type AsObject = {
    textMessage: string;
    binaryMessage: Uint8Array | string;
    fromId: number;
    toId: number;
  };

  export enum NewsCase {
    NEWS_NOT_SET = 0,
    TEXT_MESSAGE = 1,
    BINARY_MESSAGE = 4,
  }
}

export class MessageOfObj extends jspb.Message {
  getStudentMessage(): MessageOfStudent | undefined;
  setStudentMessage(value?: MessageOfStudent): MessageOfObj;
  hasStudentMessage(): boolean;
  clearStudentMessage(): MessageOfObj;

  getTrickerMessage(): MessageOfTricker | undefined;
  setTrickerMessage(value?: MessageOfTricker): MessageOfObj;
  hasTrickerMessage(): boolean;
  clearTrickerMessage(): MessageOfObj;

  getPropMessage(): MessageOfProp | undefined;
  setPropMessage(value?: MessageOfProp): MessageOfObj;
  hasPropMessage(): boolean;
  clearPropMessage(): MessageOfObj;

  getBulletMessage(): MessageOfBullet | undefined;
  setBulletMessage(value?: MessageOfBullet): MessageOfObj;
  hasBulletMessage(): boolean;
  clearBulletMessage(): MessageOfObj;

  getBombedBulletMessage(): MessageOfBombedBullet | undefined;
  setBombedBulletMessage(value?: MessageOfBombedBullet): MessageOfObj;
  hasBombedBulletMessage(): boolean;
  clearBombedBulletMessage(): MessageOfObj;

  getClassroomMessage(): MessageOfClassroom | undefined;
  setClassroomMessage(value?: MessageOfClassroom): MessageOfObj;
  hasClassroomMessage(): boolean;
  clearClassroomMessage(): MessageOfObj;

  getDoorMessage(): MessageOfDoor | undefined;
  setDoorMessage(value?: MessageOfDoor): MessageOfObj;
  hasDoorMessage(): boolean;
  clearDoorMessage(): MessageOfObj;

  getGateMessage(): MessageOfGate | undefined;
  setGateMessage(value?: MessageOfGate): MessageOfObj;
  hasGateMessage(): boolean;
  clearGateMessage(): MessageOfObj;

  getChestMessage(): MessageOfChest | undefined;
  setChestMessage(value?: MessageOfChest): MessageOfObj;
  hasChestMessage(): boolean;
  clearChestMessage(): MessageOfObj;

  getHiddenGateMessage(): MessageOfHiddenGate | undefined;
  setHiddenGateMessage(value?: MessageOfHiddenGate): MessageOfObj;
  hasHiddenGateMessage(): boolean;
  clearHiddenGateMessage(): MessageOfObj;

  getNewsMessage(): MessageOfNews | undefined;
  setNewsMessage(value?: MessageOfNews): MessageOfObj;
  hasNewsMessage(): boolean;
  clearNewsMessage(): MessageOfObj;

  getMapMessage(): MessageOfMap | undefined;
  setMapMessage(value?: MessageOfMap): MessageOfObj;
  hasMapMessage(): boolean;
  clearMapMessage(): MessageOfObj;

  getMessageOfObjCase(): MessageOfObj.MessageOfObjCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfObj.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfObj,
  ): MessageOfObj.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfObj,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfObj;
  static deserializeBinaryFromReader(
    message: MessageOfObj,
    reader: jspb.BinaryReader,
  ): MessageOfObj;
}

export namespace MessageOfObj {
  export type AsObject = {
    studentMessage?: MessageOfStudent.AsObject;
    trickerMessage?: MessageOfTricker.AsObject;
    propMessage?: MessageOfProp.AsObject;
    bulletMessage?: MessageOfBullet.AsObject;
    bombedBulletMessage?: MessageOfBombedBullet.AsObject;
    classroomMessage?: MessageOfClassroom.AsObject;
    doorMessage?: MessageOfDoor.AsObject;
    gateMessage?: MessageOfGate.AsObject;
    chestMessage?: MessageOfChest.AsObject;
    hiddenGateMessage?: MessageOfHiddenGate.AsObject;
    newsMessage?: MessageOfNews.AsObject;
    mapMessage?: MessageOfMap.AsObject;
  };

  export enum MessageOfObjCase {
    MESSAGE_OF_OBJ_NOT_SET = 0,
    STUDENT_MESSAGE = 1,
    TRICKER_MESSAGE = 2,
    PROP_MESSAGE = 3,
    BULLET_MESSAGE = 4,
    BOMBED_BULLET_MESSAGE = 5,
    CLASSROOM_MESSAGE = 6,
    DOOR_MESSAGE = 7,
    GATE_MESSAGE = 8,
    CHEST_MESSAGE = 9,
    HIDDEN_GATE_MESSAGE = 10,
    NEWS_MESSAGE = 11,
    MAP_MESSAGE = 12,
  }
}

export class MessageOfAll extends jspb.Message {
  getGameTime(): number;
  setGameTime(value: number): MessageOfAll;

  getSubjectFinished(): number;
  setSubjectFinished(value: number): MessageOfAll;

  getStudentGraduated(): number;
  setStudentGraduated(value: number): MessageOfAll;

  getStudentQuited(): number;
  setStudentQuited(value: number): MessageOfAll;

  getStudentScore(): number;
  setStudentScore(value: number): MessageOfAll;

  getTrickerScore(): number;
  setTrickerScore(value: number): MessageOfAll;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageOfAll.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: MessageOfAll,
  ): MessageOfAll.AsObject;
  static serializeBinaryToWriter(
    message: MessageOfAll,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageOfAll;
  static deserializeBinaryFromReader(
    message: MessageOfAll,
    reader: jspb.BinaryReader,
  ): MessageOfAll;
}

export namespace MessageOfAll {
  export type AsObject = {
    gameTime: number;
    subjectFinished: number;
    studentGraduated: number;
    studentQuited: number;
    studentScore: number;
    trickerScore: number;
  };
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
  static toObject(
    includeInstance: boolean,
    msg: MessageToClient,
  ): MessageToClient.AsObject;
  static serializeBinaryToWriter(
    message: MessageToClient,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MessageToClient;
  static deserializeBinaryFromReader(
    message: MessageToClient,
    reader: jspb.BinaryReader,
  ): MessageToClient;
}

export namespace MessageToClient {
  export type AsObject = {
    objMessageList: Array<MessageOfObj.AsObject>;
    gameState: MessageType_pb.GameState;
    allMessage?: MessageOfAll.AsObject;
  };
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
  static serializeBinaryToWriter(
    message: MoveRes,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): MoveRes;
  static deserializeBinaryFromReader(
    message: MoveRes,
    reader: jspb.BinaryReader,
  ): MoveRes;
}

export namespace MoveRes {
  export type AsObject = {
    actualSpeed: number;
    actualAngle: number;
    actSuccess: boolean;
  };
}

export class BoolRes extends jspb.Message {
  getActSuccess(): boolean;
  setActSuccess(value: boolean): BoolRes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolRes.AsObject;
  static toObject(includeInstance: boolean, msg: BoolRes): BoolRes.AsObject;
  static serializeBinaryToWriter(
    message: BoolRes,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): BoolRes;
  static deserializeBinaryFromReader(
    message: BoolRes,
    reader: jspb.BinaryReader,
  ): BoolRes;
}

export namespace BoolRes {
  export type AsObject = {
    actSuccess: boolean;
  };
}
