import * as jspb from 'google-protobuf'



export enum GameState { 
  NULL_GAME_STATE = 0,
  GAME_START = 1,
  GAME_RUNNING = 2,
  GAME_END = 3,
}
export enum PlaceType { 
  NULL_PLACE_TYPE = 0,
  HOME = 1,
  SPACE = 2,
  RUIN = 3,
  SHADOW = 4,
  ASTEROID = 5,
  RESOURCE = 6,
  CONSTRUCTION = 7,
  WORMHOLE = 8,
}
export enum ShapeType { 
  NULL_SHAPE_TYPE = 0,
  CIRCLE = 1,
  SQUARE = 2,
}
export enum PlayerType { 
  NULL_PLAYER_TYPE = 0,
  SHIP = 1,
  TEAM = 2,
}
export enum ShipType { 
  NULL_SHIP_TYPE = 0,
  CIVILIAN_SHIP = 1,
  MILITARY_SHIP = 2,
  FLAG_SHIP = 3,
}
export enum ShipState { 
  NULL_STATUS = 0,
  IDLE = 1,
  PRODUCING = 2,
  CONSTRUCTING = 3,
  RECOVERING = 4,
  RECYCLING = 5,
  ATTACKING = 6,
  SWINGING = 7,
  STUNNED = 8,
  MOVING = 9,
}
export enum WeaponType { 
  NULL_WEAPON_TYPE = 0,
  LASERGUN = 1,
  PLASMAGUN = 2,
  SHELLGUN = 3,
  MISSILEGUN = 4,
  ARCGUN = 5,
}
export enum ConstructorType { 
  NULL_CONSTRUCTOR_TYPE = 0,
  CONSTRUCTOR1 = 1,
  CONSTRUCTOR2 = 2,
  CONSTRUCTOR3 = 3,
}
export enum ArmorType { 
  NULL_ARMOR_TYPE = 0,
  ARMOR1 = 1,
  ARMOR2 = 2,
  ARMOR3 = 3,
}
export enum ShieldType { 
  NULL_SHIELD_TYPE = 0,
  SHIELD1 = 1,
  SHIELD2 = 2,
  SHIELD3 = 3,
}
export enum ProducerType { 
  NULL_PRODUCER_TYPE = 0,
  PRODUCER1 = 1,
  PRODUCER2 = 2,
  PRODUCER3 = 3,
}
export enum ModuleType { 
  NULL_MODULE_TYPE = 0,
  MODULE_PRODUCER1 = 1,
  MODULE_PRODUCER2 = 2,
  MODULE_PRODUCER3 = 3,
  MODULE_CONSTRUCTOR1 = 4,
  MODULE_CONSTRUCTOR2 = 5,
  MODULE_CONSTRUCTOR3 = 6,
  MODULE_ARMOR1 = 7,
  MODULE_ARMOR2 = 8,
  MODULE_ARMOR3 = 9,
  MODULE_SHIELD1 = 10,
  MODULE_SHIELD2 = 11,
  MODULE_SHIELD3 = 12,
  MODULE_LASERGUN = 13,
  MODULE_PLASMAGUN = 14,
  MODULE_SHELLGUN = 15,
  MODULE_MISSILEGUN = 16,
  MODULE_ARCGUN = 17,
}
export enum BulletType { 
  NULL_BULLET_TYPE = 0,
  LASER = 1,
  PLASMA = 2,
  SHELL = 3,
  MISSILE = 4,
  ARC = 5,
}
export enum ConstructionType { 
  NULL_CONSTRUCTION_TYPE = 0,
  FACTORY = 1,
  COMMUNITY = 2,
  FORT = 3,
}
export enum NewsType { 
  NULL_NEWS_TYPE = 0,
  TEXT = 1,
  BINARY = 2,
}
export enum PlayerTeam { 
  NULL_TEAM = 0,
  RED = 1,
  BLUE = 2,
}
