/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContestNotices
// ====================================================

export interface GetContestNotices_contest_info {
  __typename: "contest_info";
  content: string;
  created_at: any;
  updated_at: any;
  files: string | null;
  id: any;
  title: string;
}

export interface GetContestNotices {
  /**
   * fetch data from the table: "contest_info"
   */
  contest_info: GetContestNotices_contest_info[];
}

export interface GetContestNoticesVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateContestNotice
// ====================================================

export interface UpdateContestNotice_update_contest_info_returning {
  __typename: "contest_info";
  id: any;
}

export interface UpdateContestNotice_update_contest_info {
  __typename: "contest_info_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateContestNotice_update_contest_info_returning[];
}

export interface UpdateContestNotice {
  /**
   * update data of the table: "contest_info"
   */
  update_contest_info: UpdateContestNotice_update_contest_info | null;
}

export interface UpdateContestNoticeVariables {
  id: any;
  title: string;
  content: string;
  files?: string | null;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddContestNotice
// ====================================================

export interface AddContestNotice_insert_contest_info_returning {
  __typename: "contest_info";
  id: any;
}

export interface AddContestNotice_insert_contest_info {
  __typename: "contest_info_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddContestNotice_insert_contest_info_returning[];
}

export interface AddContestNotice {
  /**
   * insert data into the table: "contest_info"
   */
  insert_contest_info: AddContestNotice_insert_contest_info | null;
}

export interface AddContestNoticeVariables {
  title: string;
  content: string;
  files?: string | null;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContestNotice
// ====================================================

export interface DeleteContestNotice_delete_contest_info_returning {
  __typename: "contest_info";
  id: any;
}

export interface DeleteContestNotice_delete_contest_info {
  __typename: "contest_info_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteContestNotice_delete_contest_info_returning[];
}

export interface DeleteContestNotice {
  /**
   * delete data from the table: "contest_info"
   */
  delete_contest_info: DeleteContestNotice_delete_contest_info | null;
}

export interface DeleteContestNoticeVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContests
// ====================================================

export interface GetContests_contest {
  __typename: "contest";
  contest_name: string;
  description: string | null;
  end_date: any;
  id: any;
  start_date: any;
  contest_type: string;
}

export interface GetContests {
  /**
   * fetch data from the table: "contest"
   */
  contest: GetContests_contest[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddContest
// ====================================================

export interface AddContest_insert_contest_returning {
  __typename: "contest";
  id: any;
}

export interface AddContest_insert_contest {
  __typename: "contest_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddContest_insert_contest_returning[];
}

export interface AddContest {
  /**
   * insert data into the table: "contest"
   */
  insert_contest: AddContest_insert_contest | null;
}

export interface AddContestVariables {
  start_date: any;
  end_date: any;
  description?: string | null;
  contest_name: string;
  contest_type: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateContest
// ====================================================

export interface UpdateContest_update_contest_returning {
  __typename: "contest";
  id: any;
}

export interface UpdateContest_update_contest {
  __typename: "contest_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateContest_update_contest_returning[];
}

export interface UpdateContest {
  /**
   * update data of the table: "contest"
   */
  update_contest: UpdateContest_update_contest | null;
}

export interface UpdateContestVariables {
  id: any;
  description?: string | null;
  contest_name: string;
  end_date: any;
  start_date: any;
  contest_type: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContest
// ====================================================

export interface DeleteContest_delete_contest_returning {
  __typename: "contest";
  id: any;
}

export interface DeleteContest_delete_contest {
  __typename: "contest_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteContest_delete_contest_returning[];
}

export interface DeleteContest {
  /**
   * delete data from the table: "contest"
   */
  delete_contest: DeleteContest_delete_contest | null;
}

export interface DeleteContestVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContestManager
// ====================================================

export interface GetContestManager_contest_manager_user {
  __typename: "user";
  _id: string;
  name: string | null;
  email: string | null;
}

export interface GetContestManager_contest_manager {
  __typename: "contest_manager";
  /**
   * An object relationship
   */
  user: GetContestManager_contest_manager_user;
}

export interface GetContestManager {
  /**
   * fetch data from the table: "contest_manager"
   */
  contest_manager: GetContestManager_contest_manager[];
}

export interface GetContestManagerVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContestAllManager
// ====================================================

export interface DeleteContestAllManager_delete_contest_manager {
  __typename: "contest_manager_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteContestAllManager {
  /**
   * delete data from the table: "contest_manager"
   */
  delete_contest_manager: DeleteContestAllManager_delete_contest_manager | null;
}

export interface DeleteContestAllManagerVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddContestManager
// ====================================================

export interface AddContestManager_insert_contest_manager {
  __typename: "contest_manager_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface AddContestManager {
  /**
   * insert data into the table: "contest_manager"
   */
  insert_contest_manager: AddContestManager_insert_contest_manager | null;
}

export interface AddContestManagerVariables {
  contest_id: any;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser_Id
// ====================================================

export interface GetUser_Id_user {
  __typename: "user";
  _id: string;
}

export interface GetUser_Id {
  /**
   * fetch data from the table: "user"
   */
  user: GetUser_Id_user[];
}

export interface GetUser_IdVariables {
  email: string;
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContestAllTeams
// ====================================================

export interface DeleteContestAllTeams_delete_contest_team {
  __typename: "contest_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteContestAllTeams {
  /**
   * delete data from the table: "contest_team"
   */
  delete_contest_team: DeleteContestAllTeams_delete_contest_team | null;
}

export interface DeleteContestAllTeamsVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContestAllInfo
// ====================================================

export interface DeleteContestAllInfo_delete_contest_info {
  __typename: "contest_info_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteContestAllInfo {
  /**
   * delete data from the table: "contest_info"
   */
  delete_contest_info: DeleteContestAllInfo_delete_contest_info | null;
}

export interface DeleteContestAllInfoVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteContestAllRooms
// ====================================================

export interface DeleteContestAllRooms_delete_contest_room {
  __typename: "contest_room_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteContestAllRooms {
  /**
   * delete data from the table: "contest_room"
   */
  delete_contest_room: DeleteContestAllRooms_delete_contest_room | null;
}

export interface DeleteContestAllRoomsVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryContestManager
// ====================================================

export interface QueryContestManager_contest_manager {
  __typename: "contest_manager";
  user_id: string;
}

export interface QueryContestManager {
  /**
   * fetch data from the table: "contest_manager"
   */
  contest_manager: QueryContestManager_contest_manager[];
}

export interface QueryContestManagerVariables {
  contest_id: any;
  user_id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTeam
// ====================================================

export interface InsertTeam_insert_contest_team {
  __typename: "contest_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface InsertTeam {
  /**
   * insert data into the table: "contest_team"
   */
  insert_contest_team: InsertTeam_insert_contest_team | null;
}

export interface InsertTeamVariables {
  team_name: string;
  team_intro?: string | null;
  team_leader: string;
  invited_code: string;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsTeamLeader
// ====================================================

export interface IsTeamLeader_contest_team {
  __typename: "contest_team";
  team_id: any;
}

export interface IsTeamLeader {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: IsTeamLeader_contest_team[];
}

export interface IsTeamLeaderVariables {
  _id: string;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsTeamMember
// ====================================================

export interface IsTeamMember_contest_team_member {
  __typename: "contest_team_member";
  team_id: any;
}

export interface IsTeamMember {
  /**
   * fetch data from the table: "contest_team_member"
   */
  contest_team_member: IsTeamMember_contest_team_member[];
}

export interface IsTeamMemberVariables {
  _id: string;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCodeUpdateTime
// ====================================================

export interface GetCodeUpdateTime_contest_code {
  __typename: "contest_code";
  code1_update_time: any | null;
  code2_update_time: any | null;
  code3_update_time: any | null;
  code4_update_time: any | null;
  code5_update_time: any | null;
  code6_update_time: any | null;
}

export interface GetCodeUpdateTime {
  /**
   * fetch data from the table: "contest_code"
   */
  contest_code: GetCodeUpdateTime_contest_code[];
}

export interface GetCodeUpdateTimeVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTeamInfo
// ====================================================

export interface GetAllTeamInfo_contest_team_team_contest_id {
  __typename: "contest";
  contest_name: string;
}

export interface GetAllTeamInfo_contest_team_team_leader_id {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetAllTeamInfo_contest_team_contest_team_members_user_as_contest_team_member {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetAllTeamInfo_contest_team_contest_team_members {
  __typename: "contest_team_member";
  /**
   * An object relationship
   */
  user_as_contest_team_member: GetAllTeamInfo_contest_team_contest_team_members_user_as_contest_team_member;
}

export interface GetAllTeamInfo_contest_team {
  __typename: "contest_team";
  team_name: string;
  created_at: any;
  invited_code: string | null;
  /**
   * 已有人员数量
   */
  member_num: number;
  score: string | null;
  status: string | null;
  status2: string | null;
  contest_score: string | null;
  team_id: any;
  submitted_code_num: number;
  /**
   * An object relationship
   */
  team_contest_id: GetAllTeamInfo_contest_team_team_contest_id;
  team_intro: string | null;
  /**
   * An object relationship
   */
  team_leader_id: GetAllTeamInfo_contest_team_team_leader_id | null;
  /**
   * An array relationship
   */
  contest_team_members: GetAllTeamInfo_contest_team_contest_team_members[];
}

export interface GetAllTeamInfo {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: GetAllTeamInfo_contest_team[];
}

export interface GetAllTeamInfoVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTeamInfo_score
// ====================================================

export interface GetAllTeamInfo_score_contest_team_team_contest_id {
  __typename: "contest";
  contest_name: string;
}

export interface GetAllTeamInfo_score_contest_team_team_leader_id {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetAllTeamInfo_score_contest_team_contest_team_members_user_as_contest_team_member {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetAllTeamInfo_score_contest_team_contest_team_members {
  __typename: "contest_team_member";
  /**
   * An object relationship
   */
  user_as_contest_team_member: GetAllTeamInfo_score_contest_team_contest_team_members_user_as_contest_team_member;
}

export interface GetAllTeamInfo_score_contest_team {
  __typename: "contest_team";
  team_name: string;
  created_at: any;
  invited_code: string | null;
  /**
   * 已有人员数量
   */
  member_num: number;
  score: string | null;
  status: string | null;
  status2: string | null;
  contest_score: string | null;
  team_id: any;
  submitted_code_num: number;
  /**
   * An object relationship
   */
  team_contest_id: GetAllTeamInfo_score_contest_team_team_contest_id;
  team_intro: string | null;
  /**
   * An object relationship
   */
  team_leader_id: GetAllTeamInfo_score_contest_team_team_leader_id | null;
  /**
   * An array relationship
   */
  contest_team_members: GetAllTeamInfo_score_contest_team_contest_team_members[];
}

export interface GetAllTeamInfo_score {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: GetAllTeamInfo_score_contest_team[];
}

export interface GetAllTeamInfo_scoreVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamInfo
// ====================================================

export interface GetTeamInfo_contest_team_team_contest_id {
  __typename: "contest";
  contest_name: string;
}

export interface GetTeamInfo_contest_team_team_leader_id {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetTeamInfo_contest_team_contest_team_members_user_as_contest_team_member {
  __typename: "user";
  _id: string;
  class: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface GetTeamInfo_contest_team_contest_team_members {
  __typename: "contest_team_member";
  /**
   * An object relationship
   */
  user_as_contest_team_member: GetTeamInfo_contest_team_contest_team_members_user_as_contest_team_member;
}

export interface GetTeamInfo_contest_team {
  __typename: "contest_team";
  team_name: string;
  created_at: any;
  invited_code: string | null;
  /**
   * 已有人员数量
   */
  member_num: number;
  score: string | null;
  status: string | null;
  status2: string | null;
  contest_score: string | null;
  team_id: any;
  submitted_code_num: number;
  /**
   * An object relationship
   */
  team_contest_id: GetTeamInfo_contest_team_team_contest_id;
  team_intro: string | null;
  /**
   * An object relationship
   */
  team_leader_id: GetTeamInfo_contest_team_team_leader_id | null;
  /**
   * An array relationship
   */
  contest_team_members: GetTeamInfo_contest_team_contest_team_members[];
}

export interface GetTeamInfo {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: GetTeamInfo_contest_team[];
}

export interface GetTeamInfoVariables {
  contest_id: any;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTeamMember
// ====================================================

export interface InsertTeamMember_insert_contest_team_member {
  __typename: "contest_team_member_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface InsertTeamMember {
  /**
   * insert data into the table: "contest_team_member"
   */
  insert_contest_team_member: InsertTeamMember_insert_contest_team_member | null;
}

export interface InsertTeamMemberVariables {
  team_id: any;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTeam
// ====================================================

export interface UpdateTeam_update_contest_team {
  __typename: "contest_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface UpdateTeam {
  /**
   * update data of the table: "contest_team"
   */
  update_contest_team: UpdateTeam_update_contest_team | null;
}

export interface UpdateTeamVariables {
  team_id: any;
  team_intro: string;
  team_name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMemberInfo
// ====================================================

export interface GetMemberInfo_contest_team_team_leader_id {
  __typename: "user";
  name: string | null;
  id: any | null;
  _id: string;
}

export interface GetMemberInfo_contest_team {
  __typename: "contest_team";
  /**
   * An object relationship
   */
  team_leader_id: GetMemberInfo_contest_team_team_leader_id | null;
}

export interface GetMemberInfo_contest_team_member_user_as_contest_team_member {
  __typename: "user";
  id: any | null;
  _id: string;
  name: string | null;
}

export interface GetMemberInfo_contest_team_member {
  __typename: "contest_team_member";
  /**
   * An object relationship
   */
  user_as_contest_team_member: GetMemberInfo_contest_team_member_user_as_contest_team_member;
}

export interface GetMemberInfo {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: GetMemberInfo_contest_team[];
  /**
   * fetch data from the table: "contest_team_member"
   */
  contest_team_member: GetMemberInfo_contest_team_member[];
}

export interface GetMemberInfoVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTeam
// ====================================================

export interface DeleteTeam_delete_contest_team {
  __typename: "contest_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteTeam {
  /**
   * delete data from the table: "contest_team"
   */
  delete_contest_team: DeleteTeam_delete_contest_team | null;
}

export interface DeleteTeamVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAllTeamMember
// ====================================================

export interface DeleteAllTeamMember_delete_contest_team_member {
  __typename: "contest_team_member_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteAllTeamMember {
  /**
   * delete data from the table: "contest_team_member"
   */
  delete_contest_team_member: DeleteAllTeamMember_delete_contest_team_member | null;
}

export interface DeleteAllTeamMemberVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTeamMember
// ====================================================

export interface DeleteTeamMember_delete_contest_team_member {
  __typename: "contest_team_member_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteTeamMember {
  /**
   * delete data from the table: "contest_team_member"
   */
  delete_contest_team_member: DeleteTeamMember_delete_contest_team_member | null;
}

export interface DeleteTeamMemberVariables {
  user_id: string;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllContest
// ====================================================

export interface GetAllContest_contest {
  __typename: "contest";
  id: any;
  contest_name: string;
  description: string | null;
  start_date: any;
  end_date: any;
}

export interface GetAllContest {
  /**
   * fetch data from the table: "contest"
   */
  contest: GetAllContest_contest[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContestInfo
// ====================================================

export interface GetContestInfo_contest {
  __typename: "contest";
  contest_name: string;
  contest_type: string;
  description: string | null;
  start_date: any;
  end_date: any;
  status: string;
}

export interface GetContestInfo {
  /**
   * fetch data from the table: "contest"
   */
  contest: GetContestInfo_contest[];
}

export interface GetContestInfoVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIntroContent
// ====================================================

export interface GetIntroContent_article {
  __typename: "article";
  content: string;
}

export interface GetIntroContent {
  /**
   * fetch data from the table: "article"
   */
  article: GetIntroContent_article[];
}

export interface GetIntroContentVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateIntro
// ====================================================

export interface UpdateIntro_update_article {
  __typename: "article_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface UpdateIntro {
  /**
   * update data of the table: "article"
   */
  update_article: UpdateIntro_update_article | null;
}

export interface UpdateIntroVariables {
  id: number;
  content?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRoomInfo
// ====================================================

export interface GetRoomInfo_contest_room_contest_room_teams_contest_team {
  __typename: "contest_team";
  team_name: string;
  team_id: any;
}

export interface GetRoomInfo_contest_room_contest_room_teams {
  __typename: "contest_room_team";
  /**
   * An object relationship
   */
  contest_team: GetRoomInfo_contest_room_contest_room_teams_contest_team;
}

export interface GetRoomInfo_contest_room {
  __typename: "contest_room";
  created_at: any;
  result: string | null;
  room_id: any;
  status: boolean;
  /**
   * An array relationship
   */
  contest_room_teams: GetRoomInfo_contest_room_contest_room_teams[];
}

export interface GetRoomInfo {
  /**
   * fetch data from the table: "contest_room"
   */
  contest_room: GetRoomInfo_contest_room[];
}

export interface GetRoomInfoVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRoomInfo_status
// ====================================================

export interface GetRoomInfo_status_contest_room {
  __typename: "contest_room";
  room_id: any;
  status: boolean;
  created_at: any;
}

export interface GetRoomInfo_status {
  /**
   * fetch data from the table: "contest_room"
   */
  contest_room: GetRoomInfo_status_contest_room[];
}

export interface GetRoomInfo_statusVariables {
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertRoom
// ====================================================

export interface InsertRoom_insert_contest_room_one {
  __typename: "contest_room";
  room_id: any;
}

export interface InsertRoom {
  /**
   * insert a single row into the table: "contest_room"
   */
  insert_contest_room_one: InsertRoom_insert_contest_room_one | null;
}

export interface InsertRoomVariables {
  contest_id: any;
  team1_id: any;
  team2_id: any;
  created_at: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRoom
// ====================================================

export interface DeleteRoom_delete_contest_room_team {
  __typename: "contest_room_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteRoom_delete_contest_room {
  __typename: "contest_room_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteRoom {
  /**
   * delete data from the table: "contest_room_team"
   */
  delete_contest_room_team: DeleteRoom_delete_contest_room_team | null;
  /**
   * delete data from the table: "contest_room"
   */
  delete_contest_room: DeleteRoom_delete_contest_room | null;
}

export interface DeleteRoomVariables {
  room_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode1
// ====================================================

export interface UpsertCode1_insert_contest_code_one {
  __typename: "contest_code";
  code1_update_time: any | null;
}

export interface UpsertCode1 {
  /**
   * insert a single row into the table: "contest_code"
   */
  insert_contest_code_one: UpsertCode1_insert_contest_code_one | null;
}

export interface UpsertCode1Variables {
  code: string;
  code1_update_time: any;
  team_id: any;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode2
// ====================================================

export interface UpsertCode2_insert_contest_code_one {
  __typename: "contest_code";
  code2_update_time: any | null;
}

export interface UpsertCode2 {
  /**
   * insert a single row into the table: "contest_code"
   */
  insert_contest_code_one: UpsertCode2_insert_contest_code_one | null;
}

export interface UpsertCode2Variables {
  code: string;
  code2_update_time: any;
  team_id: any;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode3
// ====================================================

export interface UpsertCode3_insert_contest_code_one {
  __typename: "contest_code";
  code3_update_time: any | null;
}

export interface UpsertCode3 {
  /**
   * insert a single row into the table: "contest_code"
   */
  insert_contest_code_one: UpsertCode3_insert_contest_code_one | null;
}

export interface UpsertCode3Variables {
  code: string;
  code3_update_time: any;
  team_id: any;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode4
// ====================================================

export interface UpsertCode4_insert_contest_code_one {
  __typename: "contest_code";
  code4_update_time: any | null;
}

export interface UpsertCode4 {
  /**
   * insert a single row into the table: "contest_code"
   */
  insert_contest_code_one: UpsertCode4_insert_contest_code_one | null;
}

export interface UpsertCode4Variables {
  code: string;
  code4_update_time: any;
  team_id: any;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryTeamID
// ====================================================

export interface QueryTeamID_contest_team {
  __typename: "contest_team";
  team_id: any;
  status: string | null;
}

export interface QueryTeamID {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: QueryTeamID_contest_team[];
}

export interface QueryTeamIDVariables {
  team_name: string;
  contest_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateContestStatus
// ====================================================

export interface UpdateContestStatus_update_contest_returning {
  __typename: "contest";
  status: string;
}

export interface UpdateContestStatus_update_contest {
  __typename: "contest_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateContestStatus_update_contest_returning[];
}

export interface UpdateContestStatus {
  /**
   * update data of the table: "contest"
   */
  update_contest: UpdateContestStatus_update_contest | null;
}

export interface UpdateContestStatusVariables {
  contest_id: any;
  status: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAidApplications
// ====================================================

export interface GetAidApplications_aid_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  department: string | null;
  class: string | null;
}

export interface GetAidApplications_aid_application {
  __typename: "aid_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetAidApplications_aid_application_student;
  aid: string;
  amount: number;
  code: string;
  thank_letter: string | null;
  form_url: string | null;
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetAidApplications {
  /**
   * fetch data from the table: "aid_application"
   */
  aid_application: GetAidApplications_aid_application[];
}

export interface GetAidApplicationsVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAidApplicationsForCounselors
// ====================================================

export interface GetAidApplicationsForCounselors_aid_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  department: string | null;
  class: string | null;
}

export interface GetAidApplicationsForCounselors_aid_application {
  __typename: "aid_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetAidApplicationsForCounselors_aid_application_student;
  aid: string;
  amount: number;
  code: string;
  thank_letter: string | null;
  form_url: string | null;
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetAidApplicationsForCounselors {
  /**
   * fetch data from the table: "aid_application"
   */
  aid_application: GetAidApplicationsForCounselors_aid_application[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddAidApplication
// ====================================================

export interface AddAidApplication_insert_aid_application_returning {
  __typename: "aid_application";
  id: any;
}

export interface AddAidApplication_insert_aid_application {
  __typename: "aid_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddAidApplication_insert_aid_application_returning[];
}

export interface AddAidApplication {
  /**
   * insert data into the table: "aid_application"
   */
  insert_aid_application: AddAidApplication_insert_aid_application | null;
}

export interface AddAidApplicationVariables {
  student_id: string;
  aid: string;
  amount: number;
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAidApplication
// ====================================================

export interface UpdateAidApplication_update_aid_application_returning {
  __typename: "aid_application";
  id: any;
}

export interface UpdateAidApplication_update_aid_application {
  __typename: "aid_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateAidApplication_update_aid_application_returning[];
}

export interface UpdateAidApplication {
  /**
   * update data of the table: "aid_application"
   */
  update_aid_application: UpdateAidApplication_update_aid_application | null;
}

export interface UpdateAidApplicationVariables {
  id: any;
  thank_letter?: string | null;
  form_url?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAidApplication
// ====================================================

export interface DeleteAidApplication_delete_aid_application_returning {
  __typename: "aid_application";
  id: any;
}

export interface DeleteAidApplication_delete_aid_application {
  __typename: "aid_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteAidApplication_delete_aid_application_returning[];
}

export interface DeleteAidApplication {
  /**
   * delete data from the table: "aid_application"
   */
  delete_aid_application: DeleteAidApplication_delete_aid_application | null;
}

export interface DeleteAidApplicationVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetApprovedMentorApplications
// ====================================================

export interface GetApprovedMentorApplications_mentor_application_student {
  __typename: "user";
  _id: string;
  name: string | null;
}

export interface GetApprovedMentorApplications_mentor_application_mentor {
  __typename: "user";
  _id: string;
  name: string | null;
}

export interface GetApprovedMentorApplications_mentor_application {
  __typename: "mentor_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetApprovedMentorApplications_mentor_application_student;
  /**
   * An object relationship
   */
  mentor: GetApprovedMentorApplications_mentor_application_mentor;
  statement: string;
  /**
   * approved | submitted
   */
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetApprovedMentorApplications {
  /**
   * fetch data from the table: "mentor_application"
   */
  mentor_application: GetApprovedMentorApplications_mentor_application[];
}

export interface GetApprovedMentorApplicationsVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToMessages
// ====================================================

export interface SubscribeToMessages_mentor_message {
  __typename: "mentor_message";
  created_at: any;
  from_id: string;
  id: any;
  payload: string;
  to_id: string;
}

export interface SubscribeToMessages {
  /**
   * fetch data from the table: "mentor_message"
   */
  mentor_message: SubscribeToMessages_mentor_message[];
}

export interface SubscribeToMessagesVariables {
  from_id: string;
  to_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMessage
// ====================================================

export interface AddMessage_insert_mentor_message_returning {
  __typename: "mentor_message";
  id: any;
}

export interface AddMessage_insert_mentor_message {
  __typename: "mentor_message_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddMessage_insert_mentor_message_returning[];
}

export interface AddMessage {
  /**
   * insert data into the table: "mentor_message"
   */
  insert_mentor_message: AddMessage_insert_mentor_message | null;
}

export interface AddMessageVariables {
  from_id: string;
  to_id: string;
  payload: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHonorApplications
// ====================================================

export interface GetHonorApplications_honor_application {
  __typename: "honor_application";
  id: any;
  honor: string;
  statement: string;
  attachment_url: string | null;
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetHonorApplications {
  /**
   * fetch data from the table: "honor_application"
   */
  honor_application: GetHonorApplications_honor_application[];
}

export interface GetHonorApplicationsVariables {
  _id: string;
  _gte: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHonorApplicationsForCounselors
// ====================================================

export interface GetHonorApplicationsForCounselors_honor_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  class: string | null;
}

export interface GetHonorApplicationsForCounselors_honor_application {
  __typename: "honor_application";
  id: any;
  honor: string;
  statement: string;
  attachment_url: string | null;
  status: string;
  /**
   * An object relationship
   */
  student: GetHonorApplicationsForCounselors_honor_application_student;
  created_at: any;
  updated_at: any;
}

export interface GetHonorApplicationsForCounselors {
  /**
   * fetch data from the table: "honor_application"
   */
  honor_application: GetHonorApplicationsForCounselors_honor_application[];
}

export interface GetHonorApplicationsForCounselorsVariables {
  _gte: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddHonorApplication
// ====================================================

export interface AddHonorApplication_insert_honor_application_returning {
  __typename: "honor_application";
  id: any;
}

export interface AddHonorApplication_insert_honor_application {
  __typename: "honor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddHonorApplication_insert_honor_application_returning[];
}

export interface AddHonorApplication {
  /**
   * insert data into the table: "honor_application"
   */
  insert_honor_application: AddHonorApplication_insert_honor_application | null;
}

export interface AddHonorApplicationVariables {
  student_id: string;
  honor: string;
  statement: string;
  attachment_url?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateHonorApplication
// ====================================================

export interface UpdateHonorApplication_update_honor_application_returning {
  __typename: "honor_application";
  id: any;
}

export interface UpdateHonorApplication_update_honor_application {
  __typename: "honor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateHonorApplication_update_honor_application_returning[];
}

export interface UpdateHonorApplication {
  /**
   * update data of the table: "honor_application"
   */
  update_honor_application: UpdateHonorApplication_update_honor_application | null;
}

export interface UpdateHonorApplicationVariables {
  id: any;
  honor: string;
  statement: string;
  attachment_url?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteHonorApplication
// ====================================================

export interface DeleteHonorApplication_delete_honor_application_returning {
  __typename: "honor_application";
  id: any;
}

export interface DeleteHonorApplication_delete_honor_application {
  __typename: "honor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteHonorApplication_delete_honor_application_returning[];
}

export interface DeleteHonorApplication {
  /**
   * delete data from the table: "honor_application"
   */
  delete_honor_application: DeleteHonorApplication_delete_honor_application | null;
}

export interface DeleteHonorApplicationVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateHonorApplicationStatus
// ====================================================

export interface UpdateHonorApplicationStatus_update_honor_application_returning {
  __typename: "honor_application";
  id: any;
  status: string;
}

export interface UpdateHonorApplicationStatus_update_honor_application {
  __typename: "honor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateHonorApplicationStatus_update_honor_application_returning[];
}

export interface UpdateHonorApplicationStatus {
  /**
   * update data of the table: "honor_application"
   */
  update_honor_application: UpdateHonorApplicationStatus_update_honor_application | null;
}

export interface UpdateHonorApplicationStatusVariables {
  id: any;
  status: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMentorApplications
// ====================================================

export interface GetMentorApplications_mentor_application_student {
  __typename: "user";
  name: string | null;
  department: string | null;
  email: string | null;
  phone: string | null;
}

export interface GetMentorApplications_mentor_application_mentor_mentor_available {
  __typename: "mentor_available";
  available: boolean;
}

export interface GetMentorApplications_mentor_application_mentor {
  __typename: "user";
  name: string | null;
  department: string | null;
  /**
   * An object relationship
   */
  mentor_available: GetMentorApplications_mentor_application_mentor_mentor_available | null;
}

export interface GetMentorApplications_mentor_application {
  __typename: "mentor_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetMentorApplications_mentor_application_student;
  /**
   * An object relationship
   */
  mentor: GetMentorApplications_mentor_application_mentor;
  statement: string;
  /**
   * approved | submitted
   */
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetMentorApplications {
  /**
   * fetch data from the table: "mentor_application"
   */
  mentor_application: GetMentorApplications_mentor_application[];
}

export interface GetMentorApplicationsVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMentorApplicationsForCounselors
// ====================================================

export interface GetMentorApplicationsForCounselors_mentor_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  class: string | null;
  department: string | null;
  email: string | null;
  phone: string | null;
}

export interface GetMentorApplicationsForCounselors_mentor_application_mentor_mentor_available {
  __typename: "mentor_available";
  available: boolean;
}

export interface GetMentorApplicationsForCounselors_mentor_application_mentor {
  __typename: "user";
  name: string | null;
  department: string | null;
  /**
   * An object relationship
   */
  mentor_available: GetMentorApplicationsForCounselors_mentor_application_mentor_mentor_available | null;
}

export interface GetMentorApplicationsForCounselors_mentor_application {
  __typename: "mentor_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetMentorApplicationsForCounselors_mentor_application_student;
  /**
   * An object relationship
   */
  mentor: GetMentorApplicationsForCounselors_mentor_application_mentor;
  statement: string;
  /**
   * approved | submitted
   */
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetMentorApplicationsForCounselors {
  /**
   * fetch data from the table: "mentor_application"
   */
  mentor_application: GetMentorApplicationsForCounselors_mentor_application[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMentorAvailable
// ====================================================

export interface GetMentorAvailable_mentor_available {
  __typename: "mentor_available";
  available: boolean;
}

export interface GetMentorAvailable {
  /**
   * fetch data from the table: "mentor_available"
   */
  mentor_available: GetMentorAvailable_mentor_available[];
}

export interface GetMentorAvailableVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeMentorAvailable
// ====================================================

export interface ChangeMentorAvailable_insert_mentor_available_one {
  __typename: "mentor_available";
  mentor_id: string;
  available: boolean;
}

export interface ChangeMentorAvailable {
  /**
   * insert a single row into the table: "mentor_available"
   */
  insert_mentor_available_one: ChangeMentorAvailable_insert_mentor_available_one | null;
}

export interface ChangeMentorAvailableVariables {
  _id: string;
  available: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMentorApplicationStatus
// ====================================================

export interface UpdateMentorApplicationStatus_update_mentor_application_returning {
  __typename: "mentor_application";
  id: any;
}

export interface UpdateMentorApplicationStatus_update_mentor_application {
  __typename: "mentor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateMentorApplicationStatus_update_mentor_application_returning[];
}

export interface UpdateMentorApplicationStatus {
  /**
   * update data of the table: "mentor_application"
   */
  update_mentor_application: UpdateMentorApplicationStatus_update_mentor_application | null;
}

export interface UpdateMentorApplicationStatusVariables {
  id: any;
  status: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMentorApplication
// ====================================================

export interface AddMentorApplication_insert_mentor_application_returning {
  __typename: "mentor_application";
  id: any;
}

export interface AddMentorApplication_insert_mentor_application {
  __typename: "mentor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddMentorApplication_insert_mentor_application_returning[];
}

export interface AddMentorApplication {
  /**
   * insert data into the table: "mentor_application"
   */
  insert_mentor_application: AddMentorApplication_insert_mentor_application | null;
}

export interface AddMentorApplicationVariables {
  student_id: string;
  mentor_id: string;
  statement: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMentorApplication
// ====================================================

export interface UpdateMentorApplication_update_mentor_application_returning {
  __typename: "mentor_application";
  id: any;
}

export interface UpdateMentorApplication_update_mentor_application {
  __typename: "mentor_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateMentorApplication_update_mentor_application_returning[];
}

export interface UpdateMentorApplication {
  /**
   * update data of the table: "mentor_application"
   */
  update_mentor_application: UpdateMentorApplication_update_mentor_application | null;
}

export interface UpdateMentorApplicationVariables {
  id: any;
  statement: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMentorApplication
// ====================================================

export interface DeleteMentorApplication_delete_mentor_application_by_pk {
  __typename: "mentor_application";
  id: any;
}

export interface DeleteMentorApplication {
  /**
   * delete single row from the table: "mentor_application"
   */
  delete_mentor_application_by_pk: DeleteMentorApplication_delete_mentor_application_by_pk | null;
}

export interface DeleteMentorApplicationVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMentorList
// ====================================================

export interface GetMentorList_user_by_role_user_matched_aggregate {
  __typename: "mentor_application_aggregate_fields";
  count: number;
}

export interface GetMentorList_user_by_role_user_matched {
  __typename: "mentor_application_aggregate";
  aggregate: GetMentorList_user_by_role_user_matched_aggregate | null;
}

export interface GetMentorList_user_by_role_user_total_aggregate {
  __typename: "mentor_application_aggregate_fields";
  count: number;
}

export interface GetMentorList_user_by_role_user_total {
  __typename: "mentor_application_aggregate";
  aggregate: GetMentorList_user_by_role_user_total_aggregate | null;
}

export interface GetMentorList_user_by_role_user_mentor_available {
  __typename: "mentor_available";
  available: boolean;
}

export interface GetMentorList_user_by_role_user {
  __typename: "user";
  /**
   * An aggregate relationship
   */
  matched: GetMentorList_user_by_role_user_matched;
  /**
   * An aggregate relationship
   */
  total: GetMentorList_user_by_role_user_total;
  /**
   * An object relationship
   */
  mentor_available: GetMentorList_user_by_role_user_mentor_available | null;
}

export interface GetMentorList_user_by_role {
  __typename: "user_by_role_user";
  _id: string;
  name: string;
  department: string;
  user: GetMentorList_user_by_role_user | null;
}

export interface GetMentorList {
  user_by_role: GetMentorList_user_by_role[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertMentorInfo
// ====================================================

export interface UpsertMentorInfo_insert_mentor_info_one {
  __typename: "mentor_info";
  mentor_id: string;
}

export interface UpsertMentorInfo {
  /**
   * insert a single row into the table: "mentor_info"
   */
  insert_mentor_info_one: UpsertMentorInfo_insert_mentor_info_one | null;
}

export interface UpsertMentorInfoVariables {
  achievement?: string | null;
  background?: string | null;
  field?: string | null;
  intro?: string | null;
  mentor_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMentorInfo
// ====================================================

export interface GetMentorInfo_mentor_info_by_pk_user {
  __typename: "user";
  name: string | null;
  email: string | null;
}

export interface GetMentorInfo_mentor_info_by_pk {
  __typename: "mentor_info";
  /**
   * 学术成果
   */
  achievement: string | null;
  /**
   * 教育背景
   */
  background: string | null;
  /**
   * 研究领域
   */
  field: string | null;
  /**
   * 简要信息：联系方式、职位等
   */
  intro: string | null;
  mentor_id: string;
  /**
   * An object relationship
   */
  user: GetMentorInfo_mentor_info_by_pk_user;
}

export interface GetMentorInfo {
  /**
   * fetch data from the table: "mentor_info" using primary key columns
   */
  mentor_info_by_pk: GetMentorInfo_mentor_info_by_pk | null;
}

export interface GetMentorInfoVariables {
  mentor_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotices
// ====================================================

export interface GetNotices_info_notice {
  __typename: "info_notice";
  id: any;
  title: string;
  content: string;
  created_at: any;
  updated_at: any;
  files: string | null;
  notice_type: string;
}

export interface GetNotices {
  /**
   * fetch data from the table: "info_notice"
   */
  info_notice: GetNotices_info_notice[];
}

export interface GetNoticesVariables {
  notice_type?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateNotice
// ====================================================

export interface UpdateNotice_update_info_notice_returning {
  __typename: "info_notice";
  id: any;
}

export interface UpdateNotice_update_info_notice {
  __typename: "info_notice_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateNotice_update_info_notice_returning[];
}

export interface UpdateNotice {
  /**
   * update data of the table: "info_notice"
   */
  update_info_notice: UpdateNotice_update_info_notice | null;
}

export interface UpdateNoticeVariables {
  id: any;
  title: string;
  content: string;
  files?: string | null;
  notice_type: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddNotice
// ====================================================

export interface AddNotice_insert_info_notice_returning {
  __typename: "info_notice";
  id: any;
}

export interface AddNotice_insert_info_notice {
  __typename: "info_notice_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddNotice_insert_info_notice_returning[];
}

export interface AddNotice {
  /**
   * insert data into the table: "info_notice"
   */
  insert_info_notice: AddNotice_insert_info_notice | null;
}

export interface AddNoticeVariables {
  title: string;
  content: string;
  files?: string | null;
  notice_type: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteNotice
// ====================================================

export interface DeleteNotice_delete_info_notice_returning {
  __typename: "info_notice";
  id: any;
}

export interface DeleteNotice_delete_info_notice {
  __typename: "info_notice_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteNotice_delete_info_notice_returning[];
}

export interface DeleteNotice {
  /**
   * delete data from the table: "info_notice"
   */
  delete_info_notice: DeleteNotice_delete_info_notice | null;
}

export interface DeleteNoticeVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetScholarshipApplications
// ====================================================

export interface GetScholarshipApplications_scholarship_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  department: string | null;
  class: string | null;
}

export interface GetScholarshipApplications_scholarship_application {
  __typename: "scholarship_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetScholarshipApplications_scholarship_application_student;
  scholarship: string;
  honor: string;
  amount: number;
  code: string;
  thank_letter: string | null;
  form_url: string | null;
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetScholarshipApplications {
  /**
   * fetch data from the table: "scholarship_application"
   */
  scholarship_application: GetScholarshipApplications_scholarship_application[];
}

export interface GetScholarshipApplicationsVariables {
  _id: string;
  _gte: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetScholarshipApplicationsForCounselors
// ====================================================

export interface GetScholarshipApplicationsForCounselors_scholarship_application_student {
  __typename: "user";
  id: any | null;
  name: string | null;
  department: string | null;
  class: string | null;
}

export interface GetScholarshipApplicationsForCounselors_scholarship_application {
  __typename: "scholarship_application";
  id: any;
  /**
   * An object relationship
   */
  student: GetScholarshipApplicationsForCounselors_scholarship_application_student;
  scholarship: string;
  honor: string;
  amount: number;
  code: string;
  thank_letter: string | null;
  form_url: string | null;
  status: string;
  created_at: any;
  updated_at: any;
}

export interface GetScholarshipApplicationsForCounselors {
  /**
   * fetch data from the table: "scholarship_application"
   */
  scholarship_application: GetScholarshipApplicationsForCounselors_scholarship_application[];
}

export interface GetScholarshipApplicationsForCounselorsVariables {
  _gte: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddScholarshipApplication
// ====================================================

export interface AddScholarshipApplication_insert_scholarship_application_returning {
  __typename: "scholarship_application";
  id: any;
}

export interface AddScholarshipApplication_insert_scholarship_application {
  __typename: "scholarship_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: AddScholarshipApplication_insert_scholarship_application_returning[];
}

export interface AddScholarshipApplication {
  /**
   * insert data into the table: "scholarship_application"
   */
  insert_scholarship_application: AddScholarshipApplication_insert_scholarship_application | null;
}

export interface AddScholarshipApplicationVariables {
  student_id: string;
  scholarship: string;
  honor: string;
  amount: number;
  code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScholarshipApplication
// ====================================================

export interface UpdateScholarshipApplication_update_scholarship_application_returning {
  __typename: "scholarship_application";
  id: any;
}

export interface UpdateScholarshipApplication_update_scholarship_application {
  __typename: "scholarship_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: UpdateScholarshipApplication_update_scholarship_application_returning[];
}

export interface UpdateScholarshipApplication {
  /**
   * update data of the table: "scholarship_application"
   */
  update_scholarship_application: UpdateScholarshipApplication_update_scholarship_application | null;
}

export interface UpdateScholarshipApplicationVariables {
  id: any;
  thank_letter?: string | null;
  form_url?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScholarshipApplication
// ====================================================

export interface DeleteScholarshipApplication_delete_scholarship_application_returning {
  __typename: "scholarship_application";
  id: any;
}

export interface DeleteScholarshipApplication_delete_scholarship_application {
  __typename: "scholarship_application_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeleteScholarshipApplication_delete_scholarship_application_returning[];
}

export interface DeleteScholarshipApplication {
  /**
   * delete data from the table: "scholarship_application"
   */
  delete_scholarship_application: DeleteScholarshipApplication_delete_scholarship_application | null;
}

export interface DeleteScholarshipApplicationVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostgraduateFeeds
// ====================================================

export interface GetPostgraduateFeeds_postgraduate_mentor_info_intend_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_intend_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetPostgraduateFeeds_postgraduate_mentor_info_intend_aggregate_max | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_intend {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetPostgraduateFeeds_postgraduate_mentor_info_intend_aggregate | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_in_contact_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_in_contact_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetPostgraduateFeeds_postgraduate_mentor_info_in_contact_aggregate_max | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_in_contact {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetPostgraduateFeeds_postgraduate_mentor_info_in_contact_aggregate | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_confirmed_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_confirmed_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetPostgraduateFeeds_postgraduate_mentor_info_confirmed_aggregate_max | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_confirmed {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetPostgraduateFeeds_postgraduate_mentor_info_confirmed_aggregate | null;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info {
  __typename: "postgraduate_mentor_info";
  id: number;
  created_at: any;
  updated_at: any;
  mentor: string;
  field: string;
  /**
   * 固定名额
   */
  phd_quota: any;
  /**
   * 非固定名额
   */
  phd_quota_unfixed: any;
  contact: string;
  alternate_contact: string | null;
  home_page: string | null;
  detail_info: string | null;
  /**
   * 创建此信息用户id，有权更改
   */
  user_id: string;
  /**
   * An aggregate relationship
   */
  intend: GetPostgraduateFeeds_postgraduate_mentor_info_intend;
  /**
   * An aggregate relationship
   */
  in_contact: GetPostgraduateFeeds_postgraduate_mentor_info_in_contact;
  /**
   * An aggregate relationship
   */
  confirmed: GetPostgraduateFeeds_postgraduate_mentor_info_confirmed;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_aggregate_aggregate {
  __typename: "postgraduate_mentor_info_aggregate_fields";
  count: number;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_aggregate {
  __typename: "postgraduate_mentor_info_aggregate";
  aggregate: GetPostgraduateFeeds_postgraduate_mentor_info_aggregate_aggregate | null;
}

export interface GetPostgraduateFeeds {
  /**
   * fetch data from the table: "postgraduate_mentor_info"
   */
  postgraduate_mentor_info: GetPostgraduateFeeds_postgraduate_mentor_info[];
  /**
   * fetch aggregated fields from the table: "postgraduate_mentor_info"
   */
  postgraduate_mentor_info_aggregate: GetPostgraduateFeeds_postgraduate_mentor_info_aggregate;
}

export interface GetPostgraduateFeedsVariables {
  limit?: number | null;
  offset?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUnverifiedMentorInfo
// ====================================================

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_userEditor {
  __typename: "user";
  name: string | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_intend_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_intend_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetUnverifiedMentorInfo_postgraduate_mentor_info_intend_aggregate_max | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_intend {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetUnverifiedMentorInfo_postgraduate_mentor_info_intend_aggregate | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact_aggregate_max | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact_aggregate | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed_aggregate_max {
  __typename: "postgraduate_application_max_fields";
  updated_at: any | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
  max: GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed_aggregate_max | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed_aggregate | null;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info {
  __typename: "postgraduate_mentor_info";
  id: number;
  created_at: any;
  updated_at: any;
  mentor: string;
  field: string;
  /**
   * 固定名额
   */
  phd_quota: any;
  /**
   * 非固定名额
   */
  phd_quota_unfixed: any;
  contact: string;
  alternate_contact: string | null;
  home_page: string | null;
  detail_info: string | null;
  /**
   * 创建此信息用户id，有权更改
   */
  user_id: string;
  /**
   * An object relationship
   */
  userEditor: GetUnverifiedMentorInfo_postgraduate_mentor_info_userEditor;
  /**
   * An aggregate relationship
   */
  intend: GetUnverifiedMentorInfo_postgraduate_mentor_info_intend;
  /**
   * An aggregate relationship
   */
  in_contact: GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact;
  /**
   * An aggregate relationship
   */
  confirmed: GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_aggregate_aggregate {
  __typename: "postgraduate_mentor_info_aggregate_fields";
  count: number;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_aggregate {
  __typename: "postgraduate_mentor_info_aggregate";
  aggregate: GetUnverifiedMentorInfo_postgraduate_mentor_info_aggregate_aggregate | null;
}

export interface GetUnverifiedMentorInfo {
  /**
   * fetch data from the table: "postgraduate_mentor_info"
   */
  postgraduate_mentor_info: GetUnverifiedMentorInfo_postgraduate_mentor_info[];
  /**
   * fetch aggregated fields from the table: "postgraduate_mentor_info"
   */
  postgraduate_mentor_info_aggregate: GetUnverifiedMentorInfo_postgraduate_mentor_info_aggregate;
}

export interface GetUnverifiedMentorInfoVariables {
  limit?: number | null;
  offset?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertPostgraduateInfo
// ====================================================

export interface InsertPostgraduateInfo_insert_postgraduate_mentor_info_one {
  __typename: "postgraduate_mentor_info";
  id: number;
}

export interface InsertPostgraduateInfo {
  /**
   * insert a single row into the table: "postgraduate_mentor_info"
   */
  insert_postgraduate_mentor_info_one: InsertPostgraduateInfo_insert_postgraduate_mentor_info_one | null;
}

export interface InsertPostgraduateInfoVariables {
  mentor: string;
  field: string;
  contact: string;
  alternate_contact?: string | null;
  detail_info?: string | null;
  home_page?: string | null;
  phd_quota?: any | null;
  phd_quota_unfixed?: any | null;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePostgraduateInfo
// ====================================================

export interface UpdatePostgraduateInfo_update_postgraduate_mentor_info_by_pk {
  __typename: "postgraduate_mentor_info";
  id: number;
}

export interface UpdatePostgraduateInfo {
  /**
   * update single row of the table: "postgraduate_mentor_info"
   */
  update_postgraduate_mentor_info_by_pk: UpdatePostgraduateInfo_update_postgraduate_mentor_info_by_pk | null;
}

export interface UpdatePostgraduateInfoVariables {
  id: number;
  mentor: string;
  field: string;
  contact: string;
  alternate_contact?: string | null;
  detail_info?: string | null;
  home_page?: string | null;
  phd_quota?: any | null;
  phd_quota_unfixed?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePostgraduateInfo
// ====================================================

export interface DeletePostgraduateInfo_delete_postgraduate_mentor_info_returning {
  __typename: "postgraduate_mentor_info";
  id: number;
}

export interface DeletePostgraduateInfo_delete_postgraduate_mentor_info {
  __typename: "postgraduate_mentor_info_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: DeletePostgraduateInfo_delete_postgraduate_mentor_info_returning[];
}

export interface DeletePostgraduateInfo {
  /**
   * delete data from the table: "postgraduate_mentor_info"
   */
  delete_postgraduate_mentor_info: DeletePostgraduateInfo_delete_postgraduate_mentor_info | null;
}

export interface DeletePostgraduateInfoVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertApplication
// ====================================================

export interface InsertApplication_insert_postgraduate_application_one {
  __typename: "postgraduate_application";
  /**
   * intend, in_contact, confirmed
   */
  status: string;
}

export interface InsertApplication {
  /**
   * insert a single row into the table: "postgraduate_application"
   */
  insert_postgraduate_application_one: InsertApplication_insert_postgraduate_application_one | null;
}

export interface InsertApplicationVariables {
  mentor_info_id: number;
  status: string;
  user_id: string;
  verified: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyMentorInfo
// ====================================================

export interface VerifyMentorInfo_update_postgraduate_mentor_info_by_pk {
  __typename: "postgraduate_mentor_info";
  id: number;
}

export interface VerifyMentorInfo {
  /**
   * update single row of the table: "postgraduate_mentor_info"
   */
  update_postgraduate_mentor_info_by_pk: VerifyMentorInfo_update_postgraduate_mentor_info_by_pk | null;
}

export interface VerifyMentorInfoVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostgraduateApplicationFeeds
// ====================================================

export interface GetPostgraduateApplicationFeeds_postgraduate_application_aggregate_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
}

export interface GetPostgraduateApplicationFeeds_postgraduate_application_aggregate {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetPostgraduateApplicationFeeds_postgraduate_application_aggregate_aggregate | null;
}

export interface GetPostgraduateApplicationFeeds_postgraduate_application_mentor {
  __typename: "postgraduate_mentor_info";
  mentor: string;
}

export interface GetPostgraduateApplicationFeeds_postgraduate_application_user {
  __typename: "user";
  name: string | null;
  class: string | null;
}

export interface GetPostgraduateApplicationFeeds_postgraduate_application {
  __typename: "postgraduate_application";
  created_at: any;
  mentor_info_id: number;
  /**
   * intend, in_contact, confirmed
   */
  status: string;
  updated_at: any;
  user_id: string;
  /**
   * An object relationship
   */
  mentor: GetPostgraduateApplicationFeeds_postgraduate_application_mentor;
  /**
   * An object relationship
   */
  user: GetPostgraduateApplicationFeeds_postgraduate_application_user;
}

export interface GetPostgraduateApplicationFeeds {
  /**
   * fetch aggregated fields from the table: "postgraduate_application"
   */
  postgraduate_application_aggregate: GetPostgraduateApplicationFeeds_postgraduate_application_aggregate;
  /**
   * fetch data from the table: "postgraduate_application"
   */
  postgraduate_application: GetPostgraduateApplicationFeeds_postgraduate_application[];
}

export interface GetPostgraduateApplicationFeedsVariables {
  offset?: number | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSelfPostgraduateApplications
// ====================================================

export interface GetSelfPostgraduateApplications_postgraduate_application_mentor {
  __typename: "postgraduate_mentor_info";
  mentor: string;
}

export interface GetSelfPostgraduateApplications_postgraduate_application_history {
  __typename: "postgraduate_application_history";
  /**
   * intend, in_contact, confirmed_unverified, confirmed_verified, delete
   */
  status: string;
}

export interface GetSelfPostgraduateApplications_postgraduate_application {
  __typename: "postgraduate_application";
  created_at: any;
  mentor_info_id: number;
  /**
   * An object relationship
   */
  mentor: GetSelfPostgraduateApplications_postgraduate_application_mentor;
  /**
   * intend, in_contact, confirmed
   */
  status: string;
  updated_at: any;
  user_id: string;
  verified: boolean;
  /**
   * An array relationship
   */
  history: GetSelfPostgraduateApplications_postgraduate_application_history[];
}

export interface GetSelfPostgraduateApplications_postgraduate_application_aggregate_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number;
}

export interface GetSelfPostgraduateApplications_postgraduate_application_aggregate {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetSelfPostgraduateApplications_postgraduate_application_aggregate_aggregate | null;
}

export interface GetSelfPostgraduateApplications {
  /**
   * fetch data from the table: "postgraduate_application"
   */
  postgraduate_application: GetSelfPostgraduateApplications_postgraduate_application[];
  /**
   * fetch aggregated fields from the table: "postgraduate_application"
   */
  postgraduate_application_aggregate: GetSelfPostgraduateApplications_postgraduate_application_aggregate;
}

export interface GetSelfPostgraduateApplicationsVariables {
  user_id: string;
  offset?: number | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSelfConfirmedApplication
// ====================================================

export interface GetSelfConfirmedApplication_postgraduate_application {
  __typename: "postgraduate_application";
  mentor_info_id: number;
}

export interface GetSelfConfirmedApplication {
  /**
   * fetch data from the table: "postgraduate_application"
   */
  postgraduate_application: GetSelfConfirmedApplication_postgraduate_application[];
}

export interface GetSelfConfirmedApplicationVariables {
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyPostgraduateApplication
// ====================================================

export interface VerifyPostgraduateApplication_update_postgraduate_application_by_pk {
  __typename: "postgraduate_application";
  verified: boolean;
}

export interface VerifyPostgraduateApplication {
  /**
   * update single row of the table: "postgraduate_application"
   */
  update_postgraduate_application_by_pk: VerifyPostgraduateApplication_update_postgraduate_application_by_pk | null;
}

export interface VerifyPostgraduateApplicationVariables {
  mentor_info_id: number;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePostgraduateApplication
// ====================================================

export interface DeletePostgraduateApplication_delete_postgraduate_application_by_pk {
  __typename: "postgraduate_application";
  mentor_info_id: number;
  user_id: string;
}

export interface DeletePostgraduateApplication {
  /**
   * delete single row from the table: "postgraduate_application"
   */
  delete_postgraduate_application_by_pk: DeletePostgraduateApplication_delete_postgraduate_application_by_pk | null;
}

export interface DeletePostgraduateApplicationVariables {
  mentor_info_id: number;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetPostAppHistory
// ====================================================

export interface SetPostAppHistory_insert_postgraduate_application_history_one {
  __typename: "postgraduate_application_history";
  created_at: any;
}

export interface SetPostAppHistory {
  /**
   * insert a single row into the table: "postgraduate_application_history"
   */
  insert_postgraduate_application_history_one: SetPostAppHistory_insert_postgraduate_application_history_one | null;
}

export interface SetPostAppHistoryVariables {
  user_id: string;
  mentor_info_id: number;
  status: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostAppHistory
// ====================================================

export interface GetPostAppHistory_postgraduate_application_history_mentor {
  __typename: "postgraduate_mentor_info";
  mentor: string;
}

export interface GetPostAppHistory_postgraduate_application_history_user {
  __typename: "user";
  name: string | null;
  class: string | null;
}

export interface GetPostAppHistory_postgraduate_application_history {
  __typename: "postgraduate_application_history";
  created_at: any;
  mentor_info_id: number;
  /**
   * intend, in_contact, confirmed_unverified, confirmed_verified, delete
   */
  status: string;
  user_id: string;
  updated_at: any;
  /**
   * An object relationship
   */
  mentor: GetPostAppHistory_postgraduate_application_history_mentor;
  /**
   * An object relationship
   */
  user: GetPostAppHistory_postgraduate_application_history_user;
}

export interface GetPostAppHistory_postgraduate_application_history_aggregate_aggregate {
  __typename: "postgraduate_application_history_aggregate_fields";
  count: number;
}

export interface GetPostAppHistory_postgraduate_application_history_aggregate {
  __typename: "postgraduate_application_history_aggregate";
  aggregate: GetPostAppHistory_postgraduate_application_history_aggregate_aggregate | null;
}

export interface GetPostAppHistory {
  /**
   * fetch data from the table: "postgraduate_application_history"
   */
  postgraduate_application_history: GetPostAppHistory_postgraduate_application_history[];
  /**
   * fetch aggregated fields from the table: "postgraduate_application_history"
   */
  postgraduate_application_history_aggregate: GetPostAppHistory_postgraduate_application_history_aggregate;
}

export interface GetPostAppHistoryVariables {
  offset?: number | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  __typename: "user";
  _id: string;
  id: any | null;
  name: string | null;
  username: string | null;
  department: string | null;
  class: string | null;
  phone: string | null;
  email: string | null;
}

export interface GetUser {
  /**
   * fetch data from the table: "user"
   */
  user: GetUser_user[];
}

export interface GetUserVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserById
// ====================================================

export interface GetUserById_user {
  __typename: "user";
  _id: string;
  id: any | null;
  username: string | null;
}

export interface GetUserById {
  /**
   * fetch data from the table: "user"
   */
  user: GetUserById_user[];
}

export interface GetUserByIdVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserByName
// ====================================================

export interface GetUserByName_user {
  __typename: "user";
  _id: string;
}

export interface GetUserByName {
  /**
   * fetch data from the table: "user"
   */
  user: GetUserByName_user[];
}

export interface GetUserByNameVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_update_user {
  __typename: "user_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface UpdateUser {
  /**
   * update data of the table: "user"
   */
  update_user: UpdateUser_update_user | null;
}

export interface UpdateUserVariables {
  _id: string;
  id: any;
  username?: string | null;
  phone?: string | null;
  name?: string | null;
  department?: string | null;
  class?: string | null;
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserForTeacher
// ====================================================

export interface UpdateUserForTeacher_update_user {
  __typename: "user_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface UpdateUserForTeacher {
  /**
   * update data of the table: "user"
   */
  update_user: UpdateUserForTeacher_update_user | null;
}

export interface UpdateUserForTeacherVariables {
  _id: string;
  id?: any | null;
  username?: string | null;
  phone?: string | null;
  name?: string | null;
  department?: string | null;
  class?: string | null;
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamID
// ====================================================

export interface GetTeamID_contest_team {
  __typename: "contest_team";
  team_id: any;
}

export interface GetTeamID {
  /**
   * fetch data from the table: "contest_team"
   */
  contest_team: GetTeamID_contest_team[];
}

export interface GetTeamIDVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_delete_mentor_available {
  __typename: "mentor_available_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_postgraduate_mentor_info {
  __typename: "postgraduate_mentor_info_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_aid_application {
  __typename: "aid_application_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_contest_manager {
  __typename: "contest_manager_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_contest_room_team {
  __typename: "contest_room_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_contest_team {
  __typename: "contest_team_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_contest_team_member {
  __typename: "contest_team_member_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_honor_application {
  __typename: "honor_application_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_mentor_message {
  __typename: "mentor_message_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_postgraduate_application {
  __typename: "postgraduate_application_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_postgraduate_application_history {
  __typename: "postgraduate_application_history_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_postgraduate_mentor_info_pending {
  __typename: "postgraduate_mentor_info_pending_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_scholarship_application {
  __typename: "scholarship_application_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser_delete_user {
  __typename: "user_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface DeleteUser {
  /**
   * delete data from the table: "mentor_available"
   */
  delete_mentor_available: DeleteUser_delete_mentor_available | null;
  /**
   * delete data from the table: "postgraduate_mentor_info"
   */
  delete_postgraduate_mentor_info: DeleteUser_delete_postgraduate_mentor_info | null;
  /**
   * delete data from the table: "aid_application"
   */
  delete_aid_application: DeleteUser_delete_aid_application | null;
  /**
   * delete data from the table: "contest_manager"
   */
  delete_contest_manager: DeleteUser_delete_contest_manager | null;
  /**
   * delete data from the table: "contest_room_team"
   */
  delete_contest_room_team: DeleteUser_delete_contest_room_team | null;
  /**
   * delete data from the table: "contest_team"
   */
  delete_contest_team: DeleteUser_delete_contest_team | null;
  /**
   * delete data from the table: "contest_team_member"
   */
  delete_contest_team_member: DeleteUser_delete_contest_team_member | null;
  /**
   * delete data from the table: "honor_application"
   */
  delete_honor_application: DeleteUser_delete_honor_application | null;
  /**
   * delete data from the table: "mentor_message"
   */
  delete_mentor_message: DeleteUser_delete_mentor_message | null;
  /**
   * delete data from the table: "postgraduate_application"
   */
  delete_postgraduate_application: DeleteUser_delete_postgraduate_application | null;
  /**
   * delete data from the table: "postgraduate_application_history"
   */
  delete_postgraduate_application_history: DeleteUser_delete_postgraduate_application_history | null;
  /**
   * delete data from the table: "postgraduate_mentor_info_pending"
   */
  delete_postgraduate_mentor_info_pending: DeleteUser_delete_postgraduate_mentor_info_pending | null;
  /**
   * delete data from the table: "scholarship_application"
   */
  delete_scholarship_application: DeleteUser_delete_scholarship_application | null;
  /**
   * delete data from the table: "user"
   */
  delete_user: DeleteUser_delete_user | null;
}

export interface DeleteUserVariables {
  _id: string;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWeekly
// ====================================================

export interface GetWeekly_weekly {
  __typename: "weekly";
  id: number;
  title: string;
  url: string;
}

export interface GetWeekly {
  /**
   * fetch data from the table: "weekly"
   */
  weekly: GetWeekly_weekly[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
