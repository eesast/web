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

var jspb = require("google-protobuf");
var goog = jspb;
var global =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof window !== "undefined" && window) ||
  (typeof global !== "undefined" && global) ||
  (typeof self !== "undefined" && self) ||
  function () {
    return this;
  }.call(null) ||
  Function("return this")();

goog.exportSymbol("proto.protobuf.BulletType", null, global);
goog.exportSymbol("proto.protobuf.GameState", null, global);
goog.exportSymbol("proto.protobuf.PlaceType", null, global);
goog.exportSymbol("proto.protobuf.PlayerState", null, global);
goog.exportSymbol("proto.protobuf.PlayerType", null, global);
goog.exportSymbol("proto.protobuf.PropType", null, global);
goog.exportSymbol("proto.protobuf.ShapeType", null, global);
goog.exportSymbol("proto.protobuf.StudentBuffType", null, global);
goog.exportSymbol("proto.protobuf.StudentType", null, global);
goog.exportSymbol("proto.protobuf.TrickerBuffType", null, global);
goog.exportSymbol("proto.protobuf.TrickerType", null, global);
/**
 * @enum {number}
 */
proto.protobuf.BulletType = {
  NULL_BULLET_TYPE: 0,
  FLYING_KNIFE: 1,
  COMMON_ATTACK_OF_TRICKER: 2,
  BOMB_BOMB: 3,
  JUMPY_DUMPTY: 4,
  STRIKE: 5,
};

/**
 * @enum {number}
 */
proto.protobuf.PlaceType = {
  NULL_PLACE_TYPE: 0,
  LAND: 1,
  WALL: 2,
  GRASS: 3,
  CLASSROOM: 4,
  GATE: 5,
  HIDDEN_GATE: 6,
  WINDOW: 7,
  DOOR3: 8,
  DOOR5: 9,
  DOOR6: 10,
  CHEST: 11,
};

/**
 * @enum {number}
 */
proto.protobuf.ShapeType = {
  NULL_SHAPE_TYPE: 0,
  CIRCLE: 1,
  SQUARE: 2,
};

/**
 * @enum {number}
 */
proto.protobuf.PropType = {
  NULL_PROP_TYPE: 0,
  ADD_SPEED: 1,
  ADD_LIFE_OR_CLAIRAUDIENCE: 2,
  ADD_HP_OR_AP: 3,
  SHIELD_OR_SPEAR: 4,
  KEY3: 5,
  KEY5: 6,
  KEY6: 7,
  RECOVERY_FROM_DIZZINESS: 8,
  CRAFTING_BENCH: 9,
};

/**
 * @enum {number}
 */
proto.protobuf.StudentBuffType = {
  NULL_SBUFF_TYPE: 0,
  STUDENT_ADD_SPEED: 1,
  ADD_LIFE: 2,
  SHIELD: 3,
  STUDENT_INVISIBLE: 4,
};

/**
 * @enum {number}
 */
proto.protobuf.PlayerState = {
  NULL_STATUS: 0,
  IDLE: 1,
  LEARNING: 2,
  ADDICTED: 3,
  QUIT: 4,
  GRADUATED: 5,
  TREATED: 6,
  RESCUED: 7,
  STUNNED: 8,
  TREATING: 9,
  RESCUING: 10,
  SWINGING: 11,
  ATTACKING: 12,
  LOCKING: 13,
  RUMMAGING: 14,
  CLIMBING: 15,
  OPENING_A_CHEST: 16,
  USING_SPECIAL_SKILL: 17,
  OPENING_A_GATE: 18,
};

/**
 * @enum {number}
 */
proto.protobuf.TrickerBuffType = {
  NULL_TBUFF_TYPE: 0,
  TRICKER_ADD_SPEED: 1,
  SPEAR: 2,
  ADD_AP: 3,
  CLAIRAUDIENCE: 4,
  TRICKER_INVISIBLE: 5,
};

/**
 * @enum {number}
 */
proto.protobuf.PlayerType = {
  NULL_PLAYER_TYPE: 0,
  STUDENT_PLAYER: 1,
  TRICKER_PLAYER: 2,
};

/**
 * @enum {number}
 */
proto.protobuf.StudentType = {
  NULL_STUDENT_TYPE: 0,
  ATHLETE: 1,
  TEACHER: 2,
  STRAIGHT_A_STUDENT: 3,
  ROBOT: 4,
  TECH_OTAKU: 5,
  SUNSHINE: 6,
};

/**
 * @enum {number}
 */
proto.protobuf.TrickerType = {
  NULL_TRICKER_TYPE: 0,
  ASSASSIN: 1,
  KLEE: 2,
  A_NOISY_PERSON: 3,
  IDOL: 4,
};

/**
 * @enum {number}
 */
proto.protobuf.GameState = {
  NULL_GAME_STATE: 0,
  GAME_START: 1,
  GAME_RUNNING: 2,
  GAME_END: 3,
};

goog.object.extend(exports, proto.protobuf);
