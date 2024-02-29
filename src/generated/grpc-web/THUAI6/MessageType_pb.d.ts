import * as jspb from "google-protobuf";

export enum BulletType {
  NULL_BULLET_TYPE = 0,
  FLYING_KNIFE = 1,
  COMMON_ATTACK_OF_TRICKER = 2,
  BOMB_BOMB = 3,
  JUMPY_DUMPTY = 4,
  STRIKE = 5,
}
export enum PlaceType {
  NULL_PLACE_TYPE = 0,
  LAND = 1,
  WALL = 2,
  GRASS = 3,
  CLASSROOM = 4,
  GATE = 5,
  HIDDEN_GATE = 6,
  WINDOW = 7,
  DOOR3 = 8,
  DOOR5 = 9,
  DOOR6 = 10,
  CHEST = 11,
}
export enum ShapeType {
  NULL_SHAPE_TYPE = 0,
  CIRCLE = 1,
  SQUARE = 2,
}
export enum PropType {
  NULL_PROP_TYPE = 0,
  ADD_SPEED = 1,
  ADD_LIFE_OR_CLAIRAUDIENCE = 2,
  ADD_HP_OR_AP = 3,
  SHIELD_OR_SPEAR = 4,
  KEY3 = 5,
  KEY5 = 6,
  KEY6 = 7,
  RECOVERY_FROM_DIZZINESS = 8,
  CRAFTING_BENCH = 9,
}
export enum StudentBuffType {
  NULL_SBUFF_TYPE = 0,
  STUDENT_ADD_SPEED = 1,
  ADD_LIFE = 2,
  SHIELD = 3,
  STUDENT_INVISIBLE = 4,
}
export enum PlayerState {
  NULL_STATUS = 0,
  IDLE = 1,
  LEARNING = 2,
  ADDICTED = 3,
  QUIT = 4,
  GRADUATED = 5,
  TREATED = 6,
  RESCUED = 7,
  STUNNED = 8,
  TREATING = 9,
  RESCUING = 10,
  SWINGING = 11,
  ATTACKING = 12,
  LOCKING = 13,
  RUMMAGING = 14,
  CLIMBING = 15,
  OPENING_A_CHEST = 16,
  USING_SPECIAL_SKILL = 17,
  OPENING_A_GATE = 18,
}
export enum TrickerBuffType {
  NULL_TBUFF_TYPE = 0,
  TRICKER_ADD_SPEED = 1,
  SPEAR = 2,
  ADD_AP = 3,
  CLAIRAUDIENCE = 4,
  TRICKER_INVISIBLE = 5,
}
export enum PlayerType {
  NULL_PLAYER_TYPE = 0,
  STUDENT_PLAYER = 1,
  TRICKER_PLAYER = 2,
}
export enum StudentType {
  NULL_STUDENT_TYPE = 0,
  ATHLETE = 1,
  TEACHER = 2,
  STRAIGHT_A_STUDENT = 3,
  ROBOT = 4,
  TECH_OTAKU = 5,
  SUNSHINE = 6,
}
export enum TrickerType {
  NULL_TRICKER_TYPE = 0,
  ASSASSIN = 1,
  KLEE = 2,
  A_NOISY_PERSON = 3,
  IDOL = 4,
}
export enum GameState {
  NULL_GAME_STATE = 0,
  GAME_START = 1,
  GAME_RUNNING = 2,
  GAME_END = 3,
}
