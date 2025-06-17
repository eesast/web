// source: MessageType.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.protobuf.AdditionResourceState', null, global);
goog.exportSymbol('proto.protobuf.AdditionResourceType', null, global);
goog.exportSymbol('proto.protobuf.CharacterBuffType', null, global);
goog.exportSymbol('proto.protobuf.CharacterState', null, global);
goog.exportSymbol('proto.protobuf.CharacterType', null, global);
goog.exportSymbol('proto.protobuf.ConstructionType', null, global);
goog.exportSymbol('proto.protobuf.EconomyResourceState', null, global);
goog.exportSymbol('proto.protobuf.EconomyResourceType', null, global);
goog.exportSymbol('proto.protobuf.EquipmentType', null, global);
goog.exportSymbol('proto.protobuf.GameState', null, global);
goog.exportSymbol('proto.protobuf.NewsType', null, global);
goog.exportSymbol('proto.protobuf.PlaceType', null, global);
goog.exportSymbol('proto.protobuf.PlayerTeam', null, global);
goog.exportSymbol('proto.protobuf.PlayerType', null, global);
goog.exportSymbol('proto.protobuf.ShapeType', null, global);
goog.exportSymbol('proto.protobuf.TrapType', null, global);
/**
 * @enum {number}
 */
proto.protobuf.GameState = {
  NULL_GAME_STATE: 0,
  GAME_START: 1,
  GAME_RUNNING: 2,
  GAME_END: 3
};

/**
 * @enum {number}
 */
proto.protobuf.PlaceType = {
  NULL_PLACE_TYPE: 0,
  HOME: 1,
  SPACE: 2,
  BARRIER: 3,
  BUSH: 4,
  ECONOMY_RESOURCE: 5,
  ADDITION_RESOURCE: 6,
  CONSTRUCTION: 7,
  TRAP: 8
};

/**
 * @enum {number}
 */
proto.protobuf.ShapeType = {
  NULL_SHAPE_TYPE: 0,
  CIRCLE: 1,
  SQUARE: 2
};

/**
 * @enum {number}
 */
proto.protobuf.PlayerType = {
  NULL_PLAYER_TYPE: 0,
  CHARACTER: 1,
  TEAM: 2
};

/**
 * @enum {number}
 */
proto.protobuf.CharacterType = {
  NULL_CHARACTER_TYPE: 0,
  TANGSENG: 1,
  SUNWUKONG: 2,
  ZHUBAJIE: 3,
  SHAWUJING: 4,
  BAILONGMA: 5,
  MONKID: 6,
  JIULING: 7,
  HONGHAIER: 8,
  NIUMOWANG: 9,
  TIESHAN: 10,
  ZHIZHUJING: 11,
  PAWN: 12
};

/**
 * @enum {number}
 */
proto.protobuf.CharacterState = {
  NULL_CHARACTER_STATE: 0,
  IDLE: 1,
  HARVESTING: 2,
  ATTACKING: 3,
  SKILL_CASTING: 4,
  CONSTRUCTING: 5,
  MOVING: 6,
  BLIND: 7,
  KNOCKED_BACK: 8,
  STUNNED: 9,
  INVISIBLE: 10,
  HEALING: 11,
  BERSERK: 12,
  BURNED: 13,
  DECEASED: 14
};

/**
 * @enum {number}
 */
proto.protobuf.CharacterBuffType = {
  NULL_CHARACTER_BUFF_TYPE: 0,
  ATTACK_BUFF1: 1,
  ATTACK_BUFF2: 2,
  ATTACK_BUFF3: 3,
  DEFENSE_BUFF: 4,
  SPEED_BUFF: 5,
  VISION_BUFF: 6
};

/**
 * @enum {number}
 */
proto.protobuf.EconomyResourceType = {
  NULL_ECONOMY_RESOURCE_TYPE: 0,
  SMALL_ECONOMY_RESOURCE: 1,
  MEDIUM_ECONOMY_RESOURCE: 2,
  LARGE_ECONOMY_RESOURCE: 3
};

/**
 * @enum {number}
 */
proto.protobuf.AdditionResourceType = {
  NULL_ADDITION_RESOURCE_TYPE: 0,
  LIFE_POOL1: 1,
  LIFE_POOL2: 2,
  LIFE_POOL3: 3,
  CRAZY_MAN1: 4,
  CRAZY_MAN2: 5,
  CRAZY_MAN3: 6,
  QUICK_STEP: 7,
  WIDE_VIEW: 8
};

/**
 * @enum {number}
 */
proto.protobuf.EconomyResourceState = {
  NULL_ECONOMY_RESOURCE_STSTE: 0,
  HARVESTABLE: 1,
  BEING_HARVESTED: 2,
  HARVESTED: 3
};

/**
 * @enum {number}
 */
proto.protobuf.AdditionResourceState = {
  NULL_ADDITION_RESOURCE_STATE: 0,
  BEATABLE: 1,
  BEING_BEATEN: 2,
  BEATEN: 3
};

/**
 * @enum {number}
 */
proto.protobuf.EquipmentType = {
  NULL_EQUIPMENT_TYPE: 0,
  SMALL_HEALTH_POTION: 1,
  MEDIUM_HEALTH_POTION: 2,
  LARGE_HEALTH_POTION: 3,
  SMALL_SHIELD: 4,
  MEDIUM_SHIELD: 5,
  LARGE_SHIELD: 6,
  SPEEDBOOTS: 7,
  PURIFICATION_POTION: 8,
  INVISIBILITY_POTION: 9,
  BERSERK_POTION: 10
};

/**
 * @enum {number}
 */
proto.protobuf.ConstructionType = {
  NULL_CONSTRUCTION_TYPE: 0,
  BARRACKS: 1,
  SPRING: 2,
  FARM: 3
};

/**
 * @enum {number}
 */
proto.protobuf.TrapType = {
  NULL_TRAP_TYPE: 0,
  HOLE: 1,
  CAGE: 2
};

/**
 * @enum {number}
 */
proto.protobuf.NewsType = {
  NULL_NEWS_TYPE: 0,
  TEXT: 1,
  BINARY: 2
};

/**
 * @enum {number}
 */
proto.protobuf.PlayerTeam = {
  NULL_TEAM: 0,
  BUDDHISTS_TEAM: 1,
  MONSTERS_TEAM: 2
};

goog.object.extend(exports, proto.protobuf);
