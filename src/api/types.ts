/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContestNotices
// ====================================================

export interface GetContestNotices_contest_info {
  __typename: "contest_info";
  id: any;
  title: string;
  content: string;
  created_at: any;
  updated_at: any;
  files: string | null;
  contest_type: string;
}

export interface GetContestNotices {
  /**
   * fetch data from the table: "contest_info"
   */
  contest_info: GetContestNotices_contest_info[];
}

export interface GetContestNoticesVariables {
  contest_type?: string | null;
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
   * data of the affected rows by the mutation
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
  contest_type: string;
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
   * data of the affected rows by the mutation
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
  contest_type: string;
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
  count: number | null;
}

export interface GetMentorList_user_by_role_user_matched {
  __typename: "mentor_application_aggregate";
  aggregate: GetMentorList_user_by_role_user_matched_aggregate | null;
}

export interface GetMentorList_user_by_role_user_total_aggregate {
  __typename: "mentor_application_aggregate_fields";
  count: number | null;
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
   * An aggregated array relationship
   */
  matched: GetMentorList_user_by_role_user_matched;
  /**
   * An aggregated array relationship
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
  /**
   * perform the action: "user_by_role"
   */
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
  notice_type?: string | null;
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
   * data of the affected rows by the mutation
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
  count: number | null;
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
  count: number | null;
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
  count: number | null;
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
   * An aggregated array relationship
   */
  intend: GetPostgraduateFeeds_postgraduate_mentor_info_intend;
  /**
   * An aggregated array relationship
   */
  in_contact: GetPostgraduateFeeds_postgraduate_mentor_info_in_contact;
  /**
   * An aggregated array relationship
   */
  confirmed: GetPostgraduateFeeds_postgraduate_mentor_info_confirmed;
}

export interface GetPostgraduateFeeds_postgraduate_mentor_info_aggregate_aggregate {
  __typename: "postgraduate_mentor_info_aggregate_fields";
  count: number | null;
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
  count: number | null;
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
  count: number | null;
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
  count: number | null;
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
   * An aggregated array relationship
   */
  intend: GetUnverifiedMentorInfo_postgraduate_mentor_info_intend;
  /**
   * An aggregated array relationship
   */
  in_contact: GetUnverifiedMentorInfo_postgraduate_mentor_info_in_contact;
  /**
   * An aggregated array relationship
   */
  confirmed: GetUnverifiedMentorInfo_postgraduate_mentor_info_confirmed;
}

export interface GetUnverifiedMentorInfo_postgraduate_mentor_info_aggregate_aggregate {
  __typename: "postgraduate_mentor_info_aggregate_fields";
  count: number | null;
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
   * data of the affected rows by the mutation
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
  count: number | null;
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
  count: number | null;
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
  count: number | null;
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
// GraphQL mutation operation: InsertThuai
// ====================================================

export interface InsertThuai_insert_thuai {
  __typename: "thuai_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface InsertThuai {
  /**
   * insert data into the table: "thuai"
   */
  insert_thuai: InsertThuai_insert_thuai | null;
}

export interface InsertThuaiVariables {
  team_name: string;
  team_sum: string;
  team_leader: string;
  invited_code: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsTeamLeader
// ====================================================

export interface IsTeamLeader_user_team_as_leader {
  __typename: "thuai";
  team_id: any;
}

export interface IsTeamLeader_user {
  __typename: "user";
  /**
   * An array relationship
   */
  team_as_leader: IsTeamLeader_user_team_as_leader[];
}

export interface IsTeamLeader {
  /**
   * fetch data from the table: "user"
   */
  user: IsTeamLeader_user[];
}

export interface IsTeamLeaderVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsTeamMember
// ====================================================

export interface IsTeamMember_user_team_as_member {
  __typename: "team_member";
  team_id: any;
}

export interface IsTeamMember_user {
  __typename: "user";
  /**
   * An array relationship
   */
  team_as_member: IsTeamMember_user_team_as_member[];
}

export interface IsTeamMember {
  /**
   * fetch data from the table: "user"
   */
  user: IsTeamMember_user[];
}

export interface IsTeamMemberVariables {
  _id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeamInfo
// ====================================================

export interface GetTeamInfo_thuai_team_members_user {
  __typename: "user";
  name: string | null;
}

export interface GetTeamInfo_thuai_team_members {
  __typename: "team_member";
  /**
   * An object relationship
   */
  user: GetTeamInfo_thuai_team_members_user;
}

export interface GetTeamInfo_thuai_user {
  __typename: "user";
  name: string | null;
}

export interface GetTeamInfo_thuai {
  __typename: "thuai";
  invited_code: string | null;
  team_leader: string | null;
  team_name: string;
  team_sum: string;
  status: string | null;
  /**
   * An array relationship
   */
  team_members: GetTeamInfo_thuai_team_members[];
  /**
   * An object relationship
   */
  user: GetTeamInfo_thuai_user | null;
}

export interface GetTeamInfo {
  /**
   * fetch data from the table: "thuai"
   */
  thuai: GetTeamInfo_thuai[];
}

export interface GetTeamInfoVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCode
// ====================================================

export interface GetCode_thuai_code {
  __typename: "thuai_code";
  code_1: string | null;
  code_2: string | null;
  code_3: string | null;
  code_4: string | null;
}

export interface GetCode {
  /**
   * fetch data from the table: "thuai_code"
   */
  thuai_code: GetCode_thuai_code[];
}

export interface GetCodeVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTeamInfo
// ====================================================

export interface GetAllTeamInfo_thuai_team_members_user {
  __typename: "user";
  name: string | null;
}

export interface GetAllTeamInfo_thuai_team_members {
  __typename: "team_member";
  /**
   * An object relationship
   */
  user: GetAllTeamInfo_thuai_team_members_user;
}

export interface GetAllTeamInfo_thuai_user {
  __typename: "user";
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface GetAllTeamInfo_thuai {
  __typename: "thuai";
  team_id: any;
  team_name: string;
  team_sum: string;
  invited_code: string | null;
  score: number;
  status: string | null;
  /**
   * An array relationship
   */
  team_members: GetAllTeamInfo_thuai_team_members[];
  /**
   * An object relationship
   */
  user: GetAllTeamInfo_thuai_user | null;
}

export interface GetAllTeamInfo {
  /**
   * fetch data from the table: "thuai"
   */
  thuai: GetAllTeamInfo_thuai[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTeamMember
// ====================================================

export interface InsertTeamMember_insert_team_member {
  __typename: "team_member_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface InsertTeamMember {
  /**
   * insert data into the table: "team_member"
   */
  insert_team_member: InsertTeamMember_insert_team_member | null;
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

export interface UpdateTeam_update_thuai {
  __typename: "thuai_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateTeam {
  /**
   * update data of the table: "thuai"
   */
  update_thuai: UpdateTeam_update_thuai | null;
}

export interface UpdateTeamVariables {
  team_id: any;
  team_name: string;
  team_sum?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMemberInfo
// ====================================================

export interface GetMemberInfo_team_member_user {
  __typename: "user";
  name: string | null;
  id: any | null;
  _id: string;
}

export interface GetMemberInfo_team_member {
  __typename: "team_member";
  /**
   * An object relationship
   */
  user: GetMemberInfo_team_member_user;
}

export interface GetMemberInfo {
  /**
   * fetch data from the table: "team_member"
   */
  team_member: GetMemberInfo_team_member[];
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

export interface DeleteTeam_delete_thuai {
  __typename: "thuai_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteTeam {
  /**
   * delete data from the table: "thuai"
   */
  delete_thuai: DeleteTeam_delete_thuai | null;
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

export interface DeleteAllTeamMember_delete_team_member {
  __typename: "team_member_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteAllTeamMember {
  /**
   * delete data from the table: "team_member"
   */
  delete_team_member: DeleteAllTeamMember_delete_team_member | null;
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

export interface DeleteTeamMember_delete_team_member {
  __typename: "team_member_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteTeamMember {
  /**
   * delete data from the table: "team_member"
   */
  delete_team_member: DeleteTeamMember_delete_team_member | null;
}

export interface DeleteTeamMemberVariables {
  user_id: string;
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
   * number of affected rows by the mutation
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
// GraphQL mutation operation: InsertCode
// ====================================================

export interface InsertCode_insert_thuai_code {
  __typename: "thuai_code_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface InsertCode {
  /**
   * insert data into the table: "thuai_code"
   */
  insert_thuai_code: InsertCode_insert_thuai_code | null;
}

export interface InsertCodeVariables {
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertRoom
// ====================================================

export interface InsertRoom_insert_thuai_room_one {
  __typename: "thuai_room";
  room_id: any;
}

export interface InsertRoom {
  /**
   * insert a single row into the table: "thuai_room"
   */
  insert_thuai_room_one: InsertRoom_insert_thuai_room_one | null;
}

export interface InsertRoomVariables {
  team1_id?: any | null;
  team2_id?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode1
// ====================================================

export interface UpsertCode1_insert_thuai_code_one {
  __typename: "thuai_code";
  team_id: any;
}

export interface UpsertCode1 {
  /**
   * insert a single row into the table: "thuai_code"
   */
  insert_thuai_code_one: UpsertCode1_insert_thuai_code_one | null;
}

export interface UpsertCode1Variables {
  code?: string | null;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode2
// ====================================================

export interface UpsertCode2_insert_thuai_code_one {
  __typename: "thuai_code";
  team_id: any;
}

export interface UpsertCode2 {
  /**
   * insert a single row into the table: "thuai_code"
   */
  insert_thuai_code_one: UpsertCode2_insert_thuai_code_one | null;
}

export interface UpsertCode2Variables {
  code?: string | null;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode3
// ====================================================

export interface UpsertCode3_insert_thuai_code_one {
  __typename: "thuai_code";
  team_id: any;
}

export interface UpsertCode3 {
  /**
   * insert a single row into the table: "thuai_code"
   */
  insert_thuai_code_one: UpsertCode3_insert_thuai_code_one | null;
}

export interface UpsertCode3Variables {
  code?: string | null;
  team_id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertCode4
// ====================================================

export interface UpsertCode4_insert_thuai_code_one {
  __typename: "thuai_code";
  team_id: any;
}

export interface UpsertCode4 {
  /**
   * insert a single row into the table: "thuai_code"
   */
  insert_thuai_code_one: UpsertCode4_insert_thuai_code_one | null;
}

export interface UpsertCode4Variables {
  code?: string | null;
  team_id: any;
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
   * number of affected rows by the mutation
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
   * number of affected rows by the mutation
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
