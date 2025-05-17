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
  BARRIER = 3,
  BUSH = 4,
  ECONOMY_RESOURCE = 5,
  ADDITION_RESOURCE = 6,
  CONSTRUCTION = 7,
  TRAP = 8,
}
export enum ShapeType { 
  NULL_SHAPE_TYPE = 0,
  CIRCLE = 1,
  SQUARE = 2,
}
export enum PlayerType { 
  NULL_PLAYER_TYPE = 0,
  CHARACTER = 1,
  TEAM = 2,
}
export enum CharacterType { 
  NULL_CHARACTER_TYPE = 0,
  TANGSENG = 1,
  SUNWUKONG = 2,
  ZHUBAJIE = 3,
  SHAWUJING = 4,
  BAILONGMA = 5,
  MONKID = 6,
  JIULING = 7,
  HONGHAIER = 8,
  NIUMOWANG = 9,
  TIESHAN = 10,
  ZHIZHUJING = 11,
  PAWN = 12,
}
export enum CharacterState { 
  NULL_CHARACTER_STATE = 0,
  IDLE = 1,
  HARVESTING = 2,
  ATTACKING = 3,
  SKILL_CASTING = 4,
  CONSTRUCTING = 5,
  MOVING = 6,
  BLIND = 7,
  KNOCKED_BACK = 8,
  STUNNED = 9,
  INVISIBLE = 10,
  HEALING = 11,
  BERSERK = 12,
  BURNED = 13,
  DECEASED = 14,
}
export enum CharacterBuffType { 
  NULL_CHARACTER_BUFF_TYPE = 0,
  ATTACK_BUFF1 = 1,
  ATTACK_BUFF2 = 2,
  ATTACK_BUFF3 = 3,
  DEFENSE_BUFF = 4,
  SPEED_BUFF = 5,
  VISION_BUFF = 6,
}
export enum EconomyResourceType { 
  NULL_ECONOMY_RESOURCE_TYPE = 0,
  SMALL_ECONOMY_RESOURCE = 1,
  MEDIUM_ECONOMY_RESOURCE = 2,
  LARGE_ECONOMY_RESOURCE = 3,
}
export enum AdditionResourceType { 
  NULL_ADDITION_RESOURCE_TYPE = 0,
  LIFE_POOL1 = 1,
  LIFE_POOL2 = 2,
  LIFE_POOL3 = 3,
  CRAZY_MAN1 = 4,
  CRAZY_MAN2 = 5,
  CRAZY_MAN3 = 6,
  QUICK_STEP = 7,
  WIDE_VIEW = 8,
}
export enum EconomyResourceState { 
  NULL_ECONOMY_RESOURCE_STSTE = 0,
  HARVESTABLE = 1,
  BEING_HARVESTED = 2,
  HARVESTED = 3,
}
export enum AdditionResourceState { 
  NULL_ADDITION_RESOURCE_STATE = 0,
  BEATABLE = 1,
  BEING_BEATEN = 2,
  BEATEN = 3,
}
export enum EquipmentType { 
  NULL_EQUIPMENT_TYPE = 0,
  SMALL_HEALTH_POTION = 1,
  MEDIUM_HEALTH_POTION = 2,
  LARGE_HEALTH_POTION = 3,
  SMALL_SHIELD = 4,
  MEDIUM_SHIELD = 5,
  LARGE_SHIELD = 6,
  SPEEDBOOTS = 7,
  PURIFICATION_POTION = 8,
  INVISIBILITY_POTION = 9,
  BERSERK_POTION = 10,
}
export enum ConstructionType { 
  NULL_CONSTRUCTION_TYPE = 0,
  BARRACKS = 1,
  SPRING = 2,
  FARM = 3,
}
export enum TrapType { 
  NULL_TRAP_TYPE = 0,
  HOLE = 1,
  CAGE = 2,
}
export enum NewsType { 
  NULL_NEWS_TYPE = 0,
  TEXT = 1,
  BINARY = 2,
}
export enum PlayerTeam { 
  NULL_TEAM = 0,
  BUDDHISTS_TEAM = 1,
  MONSTERS_TEAM = 2,
}
