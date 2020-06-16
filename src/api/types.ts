/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetToken
// ====================================================

export interface GetToken {
  token: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetId
// ====================================================

export interface GetId {
  _id: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmail
// ====================================================

export interface GetEmail {
  email: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRole
// ====================================================

export interface GetRole {
  role: string | null;
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
}

export interface GetNotices {
  /**
   * fetch data from the table: "info_notice"
   */
  info_notice: GetNotices_info_notice[];
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
