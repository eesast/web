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

goog.exportSymbol('proto.protobuf.ArmorType', null, global);
goog.exportSymbol('proto.protobuf.BulletType', null, global);
goog.exportSymbol('proto.protobuf.ConstructionType', null, global);
goog.exportSymbol('proto.protobuf.ConstructorType', null, global);
goog.exportSymbol('proto.protobuf.GameState', null, global);
goog.exportSymbol('proto.protobuf.ModuleType', null, global);
goog.exportSymbol('proto.protobuf.NewsType', null, global);
goog.exportSymbol('proto.protobuf.PlaceType', null, global);
goog.exportSymbol('proto.protobuf.PlayerTeam', null, global);
goog.exportSymbol('proto.protobuf.PlayerType', null, global);
goog.exportSymbol('proto.protobuf.ProducerType', null, global);
goog.exportSymbol('proto.protobuf.ShapeType', null, global);
goog.exportSymbol('proto.protobuf.ShieldType', null, global);
goog.exportSymbol('proto.protobuf.ShipState', null, global);
goog.exportSymbol('proto.protobuf.ShipType', null, global);
goog.exportSymbol('proto.protobuf.WeaponType', null, global);
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
  RUIN: 3,
  SHADOW: 4,
  ASTEROID: 5,
  RESOURCE: 6,
  CONSTRUCTION: 7,
  WORMHOLE: 8
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
  SHIP: 1,
  TEAM: 2
};

/**
 * @enum {number}
 */
proto.protobuf.ShipType = {
  NULL_SHIP_TYPE: 0,
  CIVILIAN_SHIP: 1,
  MILITARY_SHIP: 2,
  FLAG_SHIP: 3
};

/**
 * @enum {number}
 */
proto.protobuf.ShipState = {
  NULL_STATUS: 0,
  IDLE: 1,
  PRODUCING: 2,
  CONSTRUCTING: 3,
  RECOVERING: 4,
  RECYCLING: 5,
  ATTACKING: 6,
  SWINGING: 7,
  STUNNED: 8,
  MOVING: 9
};

/**
 * @enum {number}
 */
proto.protobuf.WeaponType = {
  NULL_WEAPON_TYPE: 0,
  LASERGUN: 1,
  PLASMAGUN: 2,
  SHELLGUN: 3,
  MISSILEGUN: 4,
  ARCGUN: 5
};

/**
 * @enum {number}
 */
proto.protobuf.ConstructorType = {
  NULL_CONSTRUCTOR_TYPE: 0,
  CONSTRUCTOR1: 1,
  CONSTRUCTOR2: 2,
  CONSTRUCTOR3: 3
};

/**
 * @enum {number}
 */
proto.protobuf.ArmorType = {
  NULL_ARMOR_TYPE: 0,
  ARMOR1: 1,
  ARMOR2: 2,
  ARMOR3: 3
};

/**
 * @enum {number}
 */
proto.protobuf.ShieldType = {
  NULL_SHIELD_TYPE: 0,
  SHIELD1: 1,
  SHIELD2: 2,
  SHIELD3: 3
};

/**
 * @enum {number}
 */
proto.protobuf.ProducerType = {
  NULL_PRODUCER_TYPE: 0,
  PRODUCER1: 1,
  PRODUCER2: 2,
  PRODUCER3: 3
};

/**
 * @enum {number}
 */
proto.protobuf.ModuleType = {
  NULL_MODULE_TYPE: 0,
  MODULE_PRODUCER1: 1,
  MODULE_PRODUCER2: 2,
  MODULE_PRODUCER3: 3,
  MODULE_CONSTRUCTOR1: 4,
  MODULE_CONSTRUCTOR2: 5,
  MODULE_CONSTRUCTOR3: 6,
  MODULE_ARMOR1: 7,
  MODULE_ARMOR2: 8,
  MODULE_ARMOR3: 9,
  MODULE_SHIELD1: 10,
  MODULE_SHIELD2: 11,
  MODULE_SHIELD3: 12,
  MODULE_LASERGUN: 13,
  MODULE_PLASMAGUN: 14,
  MODULE_SHELLGUN: 15,
  MODULE_MISSILEGUN: 16,
  MODULE_ARCGUN: 17
};

/**
 * @enum {number}
 */
proto.protobuf.BulletType = {
  NULL_BULLET_TYPE: 0,
  LASER: 1,
  PLASMA: 2,
  SHELL: 3,
  MISSILE: 4,
  ARC: 5
};

/**
 * @enum {number}
 */
proto.protobuf.ConstructionType = {
  NULL_CONSTRUCTION_TYPE: 0,
  FACTORY: 1,
  COMMUNITY: 2,
  FORT: 3
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
  RED: 1,
  BLUE: 2
};

goog.object.extend(exports, proto.protobuf);
