/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetArticle
// ====================================================

export interface GetArticle_article_by_pk_author {
  __typename: "user";
  username: string | null;
}

export interface GetArticle_article_by_pk_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface GetArticle_article_by_pk_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: GetArticle_article_by_pk_article_tags_tag;
}

export interface GetArticle_article_by_pk_article_likers_aggregate_aggregate {
  __typename: "article_liker_aggregate_fields";
  count: number | null;
}

export interface GetArticle_article_by_pk_article_likers_aggregate {
  __typename: "article_liker_aggregate";
  aggregate: GetArticle_article_by_pk_article_likers_aggregate_aggregate | null;
}

export interface GetArticle_article_by_pk {
  __typename: "article";
  id: number;
  title: string;
  authorId: string;
  /**
   * An object relationship
   */
  author: GetArticle_article_by_pk_author;
  alias: string;
  abstract: string | null;
  content: string;
  created_at: any;
  updated_at: any;
  /**
   * An array relationship
   */
  article_tags: GetArticle_article_by_pk_article_tags[];
  /**
   * An aggregated array relationship
   */
  article_likers_aggregate: GetArticle_article_by_pk_article_likers_aggregate;
}

export interface GetArticle {
  /**
   * fetch data from the table: "article" using primary key columns
   */
  article_by_pk: GetArticle_article_by_pk | null;
}

export interface GetArticleVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ViewArticle
// ====================================================

export interface ViewArticle_update_article_public_returning_author {
  __typename: "user";
  username: string | null;
}

export interface ViewArticle_update_article_public_returning_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface ViewArticle_update_article_public_returning_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: ViewArticle_update_article_public_returning_article_tags_tag;
}

export interface ViewArticle_update_article_public_returning_article_likers_aggregate_aggregate {
  __typename: "article_liker_aggregate_fields";
  count: number | null;
}

export interface ViewArticle_update_article_public_returning_article_likers_aggregate_nodes_liker {
  __typename: "user";
  username: string | null;
}

export interface ViewArticle_update_article_public_returning_article_likers_aggregate_nodes {
  __typename: "article_liker";
  /**
   * An object relationship
   */
  liker: ViewArticle_update_article_public_returning_article_likers_aggregate_nodes_liker;
}

export interface ViewArticle_update_article_public_returning_article_likers_aggregate {
  __typename: "article_liker_aggregate";
  aggregate: ViewArticle_update_article_public_returning_article_likers_aggregate_aggregate | null;
  nodes: ViewArticle_update_article_public_returning_article_likers_aggregate_nodes[];
}

export interface ViewArticle_update_article_public_returning {
  __typename: "article_public";
  id: number | null;
  title: string | null;
  alias: string | null;
  abstract: string | null;
  content: string | null;
  authorId: string | null;
  /**
   * An object relationship
   */
  author: ViewArticle_update_article_public_returning_author | null;
  views: number | null;
  /**
   * An array relationship
   */
  article_tags: ViewArticle_update_article_public_returning_article_tags[];
  /**
   * An aggregated array relationship
   */
  article_likers_aggregate: ViewArticle_update_article_public_returning_article_likers_aggregate;
}

export interface ViewArticle_update_article_public {
  __typename: "article_public_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: ViewArticle_update_article_public_returning[];
}

export interface ViewArticle {
  /**
   * update data of the table: "article_public"
   */
  update_article_public: ViewArticle_update_article_public | null;
}

export interface ViewArticleVariables {
  alias: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetArticleFeeds
// ====================================================

export interface GetArticleFeeds_article_public_author {
  __typename: "user";
  username: string | null;
}

export interface GetArticleFeeds_article_public_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface GetArticleFeeds_article_public_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: GetArticleFeeds_article_public_article_tags_tag;
}

export interface GetArticleFeeds_article_public_article_likers_aggregate_aggregate {
  __typename: "article_liker_aggregate_fields";
  count: number | null;
}

export interface GetArticleFeeds_article_public_article_likers_aggregate {
  __typename: "article_liker_aggregate";
  aggregate: GetArticleFeeds_article_public_article_likers_aggregate_aggregate | null;
}

export interface GetArticleFeeds_article_public {
  __typename: "article_public";
  id: number | null;
  alias: string | null;
  title: string | null;
  abstract: string | null;
  views: number | null;
  created_at: any | null;
  /**
   * An object relationship
   */
  author: GetArticleFeeds_article_public_author | null;
  /**
   * An array relationship
   */
  article_tags: GetArticleFeeds_article_public_article_tags[];
  /**
   * An aggregated array relationship
   */
  article_likers_aggregate: GetArticleFeeds_article_public_article_likers_aggregate;
}

export interface GetArticleFeeds {
  /**
   * fetch data from the table: "article_public"
   */
  article_public: GetArticleFeeds_article_public[];
}

export interface GetArticleFeedsVariables {
  limit?: number | null;
  cursor: any;
  authorId?: string | null;
  title?: string | null;
  alias?: string | null;
  abstract?: string | null;
  content?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertArticle
// ====================================================

export interface InsertArticle_insert_article_one {
  __typename: "article";
  id: number;
}

export interface InsertArticle {
  /**
   * insert a single row into the table: "article"
   */
  insert_article_one: InsertArticle_insert_article_one | null;
}

export interface InsertArticleVariables {
  abstract?: string | null;
  alias: string;
  content: string;
  authorId: string;
  title: string;
  tags: article_tag_insert_input[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateArticle
// ====================================================

export interface UpdateArticle_update_article_by_pk_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface UpdateArticle_update_article_by_pk_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: UpdateArticle_update_article_by_pk_article_tags_tag;
}

export interface UpdateArticle_update_article_by_pk {
  __typename: "article";
  id: number;
  /**
   * An array relationship
   */
  article_tags: UpdateArticle_update_article_by_pk_article_tags[];
}

export interface UpdateArticle_insert_article_tag {
  __typename: "article_tag_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateArticle {
  /**
   * update single row of the table: "article"
   */
  update_article_by_pk: UpdateArticle_update_article_by_pk | null;
  /**
   * insert data into the table: "article_tag"
   */
  insert_article_tag: UpdateArticle_insert_article_tag | null;
}

export interface UpdateArticleVariables {
  id: number;
  abstract?: string | null;
  alias: string;
  authorId: string;
  content: string;
  title: string;
  tags: article_tag_insert_input[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteArticle
// ====================================================

export interface DeleteArticle_delete_article_tag {
  __typename: "article_tag_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteArticle_delete_article_liker {
  __typename: "article_liker_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteArticle_delete_article_by_pk {
  __typename: "article";
  id: number;
}

export interface DeleteArticle {
  /**
   * delete data from the table: "article_tag"
   */
  delete_article_tag: DeleteArticle_delete_article_tag | null;
  /**
   * delete data from the table: "article_liker"
   */
  delete_article_liker: DeleteArticle_delete_article_liker | null;
  /**
   * delete single row from the table: "article"
   */
  delete_article_by_pk: DeleteArticle_delete_article_by_pk | null;
}

export interface DeleteArticleVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeArticle
// ====================================================

export interface LikeArticle_insert_article_liker_one {
  __typename: "article_liker";
  article_id: number;
  user_id: string;
}

export interface LikeArticle {
  /**
   * insert a single row into the table: "article_liker"
   */
  insert_article_liker_one: LikeArticle_insert_article_liker_one | null;
}

export interface LikeArticleVariables {
  article_id: number;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnlikeArticle
// ====================================================

export interface UnlikeArticle_delete_article_liker_by_pk {
  __typename: "article_liker";
  article_id: number;
  user_id: string;
}

export interface UnlikeArticle {
  /**
   * delete single row from the table: "article_liker"
   */
  delete_article_liker_by_pk: UnlikeArticle_delete_article_liker_by_pk | null;
}

export interface UnlikeArticleVariables {
  article_id: number;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserArticleLike
// ====================================================

export interface GetUserArticleLike_article_liker_by_pk {
  __typename: "article_liker";
  article_id: number;
  user_id: string;
}

export interface GetUserArticleLike {
  /**
   * fetch data from the table: "article_liker" using primary key columns
   */
  article_liker_by_pk: GetUserArticleLike_article_liker_by_pk | null;
}

export interface GetUserArticleLikeVariables {
  article_id: number;
  user_id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comment_user {
  __typename: "user";
  username: string | null;
}

export interface GetComments_comment {
  __typename: "comment";
  content: string;
  /**
   * An object relationship
   */
  user: GetComments_comment_user;
}

export interface GetComments {
  /**
   * fetch data from the table: "comment"
   */
  comment: GetComments_comment[];
}

export interface GetCommentsVariables {
  article_id: number;
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
  phd_quota: any;
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
  phd_quota: any;
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
  status?: string | null;
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
// GraphQL query operation: GetPostgraudateApplicationFeeds
// ====================================================

export interface GetPostgraudateApplicationFeeds_postgraduate_application_aggregate_aggregate {
  __typename: "postgraduate_application_aggregate_fields";
  count: number | null;
}

export interface GetPostgraudateApplicationFeeds_postgraduate_application_aggregate {
  __typename: "postgraduate_application_aggregate";
  aggregate: GetPostgraudateApplicationFeeds_postgraduate_application_aggregate_aggregate | null;
}

export interface GetPostgraudateApplicationFeeds_postgraduate_application_mentor {
  __typename: "postgraduate_mentor_info";
  mentor: string;
}

export interface GetPostgraudateApplicationFeeds_postgraduate_application_user {
  __typename: "user";
  name: string | null;
}

export interface GetPostgraudateApplicationFeeds_postgraduate_application {
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
  mentor: GetPostgraudateApplicationFeeds_postgraduate_application_mentor;
  /**
   * An object relationship
   */
  user: GetPostgraudateApplicationFeeds_postgraduate_application_user;
}

export interface GetPostgraudateApplicationFeeds {
  /**
   * fetch aggregated fields from the table: "postgraduate_application"
   */
  postgraduate_application_aggregate: GetPostgraudateApplicationFeeds_postgraduate_application_aggregate;
  /**
   * fetch data from the table: "postgraduate_application"
   */
  postgraduate_application: GetPostgraudateApplicationFeeds_postgraduate_application[];
}

export interface GetPostgraudateApplicationFeedsVariables {
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
// GraphQL query operation: GetTag
// ====================================================

export interface GetTag_tag_tag_articles_aggregate_aggregate {
  __typename: "article_tag_aggregate_fields";
  count: number | null;
}

export interface GetTag_tag_tag_articles_aggregate_nodes_article {
  __typename: "article";
  id: number;
  title: string;
  abstract: string | null;
  alias: string;
}

export interface GetTag_tag_tag_articles_aggregate_nodes {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  article: GetTag_tag_tag_articles_aggregate_nodes_article;
}

export interface GetTag_tag_tag_articles_aggregate {
  __typename: "article_tag_aggregate";
  aggregate: GetTag_tag_tag_articles_aggregate_aggregate | null;
  nodes: GetTag_tag_tag_articles_aggregate_nodes[];
}

export interface GetTag_tag {
  __typename: "tag";
  tag_name: string;
  /**
   * An aggregated array relationship
   */
  tag_articles_aggregate: GetTag_tag_tag_articles_aggregate;
}

export interface GetTag {
  /**
   * fetch data from the table: "tag"
   */
  tag: GetTag_tag[];
}

export interface GetTagVariables {
  id?: any | null;
  tag?: string | null;
  with_articles: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTag
// ====================================================

export interface InsertTag_insert_tag_one {
  __typename: "tag";
  id: any;
  tag_name: string;
}

export interface InsertTag {
  /**
   * insert a single row into the table: "tag"
   */
  insert_tag_one: InsertTag_insert_tag_one | null;
}

export interface InsertTagVariables {
  tag: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTags
// ====================================================

export interface InsertTags_insert_tag_returning {
  __typename: "tag";
  id: any;
  tag_name: string;
}

export interface InsertTags_insert_tag {
  __typename: "tag_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: InsertTags_insert_tag_returning[];
}

export interface InsertTags {
  /**
   * insert data into the table: "tag"
   */
  insert_tag: InsertTags_insert_tag | null;
}

export interface InsertTagsVariables {
  objects: tag_insert_input[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTag
// ====================================================

export interface UpdateTag_update_tag_by_pk {
  __typename: "tag";
  id: any;
  tag_name: string;
}

export interface UpdateTag {
  /**
   * update single row of the table: "tag"
   */
  update_tag_by_pk: UpdateTag_update_tag_by_pk | null;
}

export interface UpdateTagVariables {
  id: any;
  tag?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTag
// ====================================================

export interface DeleteTag_delete_article_tag {
  __typename: "article_tag_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface DeleteTag_delete_tag_by_pk {
  __typename: "tag";
  id: any;
  tag_name: string;
}

export interface DeleteTag {
  /**
   * delete data from the table: "article_tag"
   */
  delete_article_tag: DeleteTag_delete_article_tag | null;
  /**
   * delete single row from the table: "tag"
   */
  delete_tag_by_pk: DeleteTag_delete_tag_by_pk | null;
}

export interface DeleteTagVariables {
  id: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertArticleTag
// ====================================================

export interface InsertArticleTag_insert_article_tag_one_article_author {
  __typename: "user";
  username: string | null;
}

export interface InsertArticleTag_insert_article_tag_one_article_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface InsertArticleTag_insert_article_tag_one_article_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: InsertArticleTag_insert_article_tag_one_article_article_tags_tag;
}

export interface InsertArticleTag_insert_article_tag_one_article {
  __typename: "article";
  alias: string;
  title: string;
  /**
   * An object relationship
   */
  author: InsertArticleTag_insert_article_tag_one_article_author;
  /**
   * An array relationship
   */
  article_tags: InsertArticleTag_insert_article_tag_one_article_article_tags[];
}

export interface InsertArticleTag_insert_article_tag_one_tag {
  __typename: "tag";
  tag_name: string;
}

export interface InsertArticleTag_insert_article_tag_one {
  __typename: "article_tag";
  article_id: number;
  tag_id: any;
  /**
   * An object relationship
   */
  article: InsertArticleTag_insert_article_tag_one_article;
  /**
   * An object relationship
   */
  tag: InsertArticleTag_insert_article_tag_one_tag;
}

export interface InsertArticleTag {
  /**
   * insert a single row into the table: "article_tag"
   */
  insert_article_tag_one: InsertArticleTag_insert_article_tag_one | null;
}

export interface InsertArticleTagVariables {
  article_id: number;
  tag_id: any;
  with_article: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteArticleTag
// ====================================================

export interface DeleteArticleTag_delete_article_tag_by_pk_article_author {
  __typename: "user";
  username: string | null;
}

export interface DeleteArticleTag_delete_article_tag_by_pk_article_article_tags_tag {
  __typename: "tag";
  tag_name: string;
}

export interface DeleteArticleTag_delete_article_tag_by_pk_article_article_tags {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  tag: DeleteArticleTag_delete_article_tag_by_pk_article_article_tags_tag;
}

export interface DeleteArticleTag_delete_article_tag_by_pk_article {
  __typename: "article";
  alias: string;
  title: string;
  /**
   * An object relationship
   */
  author: DeleteArticleTag_delete_article_tag_by_pk_article_author;
  /**
   * An array relationship
   */
  article_tags: DeleteArticleTag_delete_article_tag_by_pk_article_article_tags[];
}

export interface DeleteArticleTag_delete_article_tag_by_pk_tag {
  __typename: "tag";
  tag_name: string;
}

export interface DeleteArticleTag_delete_article_tag_by_pk {
  __typename: "article_tag";
  /**
   * An object relationship
   */
  article: DeleteArticleTag_delete_article_tag_by_pk_article;
  /**
   * An object relationship
   */
  tag: DeleteArticleTag_delete_article_tag_by_pk_tag;
}

export interface DeleteArticleTag {
  /**
   * delete single row from the table: "article_tag"
   */
  delete_article_tag_by_pk: DeleteArticleTag_delete_article_tag_by_pk | null;
}

export interface DeleteArticleTagVariables {
  article_id: number;
  tag_id: any;
  with_article: boolean;
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

/**
 * unique or primary key constraints on table "article"
 */
export enum article_constraint {
  article_alias_key = "article_alias_key",
  article_pkey = "article_pkey",
}

/**
 * unique or primary key constraints on table "article_liker"
 */
export enum article_liker_constraint {
  article_liker_pkey = "article_liker_pkey",
}

/**
 * update columns of table "article_liker"
 */
export enum article_liker_update_column {
  article_id = "article_id",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "article_tag"
 */
export enum article_tag_constraint {
  article_tag_pkey = "article_tag_pkey",
}

/**
 * update columns of table "article_tag"
 */
export enum article_tag_update_column {
  article_id = "article_id",
  tag_id = "tag_id",
}

/**
 * update columns of table "article"
 */
export enum article_update_column {
  abstract = "abstract",
  alias = "alias",
  authorId = "authorId",
  content = "content",
  created_at = "created_at",
  id = "id",
  title = "title",
  updated_at = "updated_at",
  views = "views",
  visible = "visible",
}

/**
 * unique or primary key constraints on table "comment"
 */
export enum comment_constraint {
  comment_pkey = "comment_pkey",
}

/**
 * update columns of table "comment"
 */
export enum comment_update_column {
  article_id = "article_id",
  content = "content",
  created_at = "created_at",
  id = "id",
  updated_at = "updated_at",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "mentor_application"
 */
export enum mentor_application_constraint {
  mentor_application_pkey1 = "mentor_application_pkey1",
}

/**
 * update columns of table "mentor_application"
 */
export enum mentor_application_update_column {
  created_at = "created_at",
  id = "id",
  mentor_id = "mentor_id",
  statement = "statement",
  status = "status",
  student_id = "student_id",
  updated_at = "updated_at",
}

/**
 * unique or primary key constraints on table "mentor_available"
 */
export enum mentor_available_constraint {
  mentor_available_mentor_id_key = "mentor_available_mentor_id_key",
  mentor_available_pkey = "mentor_available_pkey",
}

/**
 * update columns of table "mentor_available"
 */
export enum mentor_available_update_column {
  available = "available",
  created_at = "created_at",
  mentor_id = "mentor_id",
  updated_at = "updated_at",
}

/**
 * unique or primary key constraints on table "tag"
 */
export enum tag_constraint {
  tag_pkey = "tag_pkey",
  tag_tag_key = "tag_tag_key",
}

/**
 * update columns of table "tag"
 */
export enum tag_update_column {
  id = "id",
  tag_name = "tag_name",
}

/**
 * unique or primary key constraints on table "user"
 */
export enum user_constraint {
  user_id_key = "user_id_key",
  user_pkey = "user_pkey",
  user_student_id_key = "user_student_id_key",
  user_username_key = "user_username_key",
}

/**
 * update columns of table "user"
 */
export enum user_update_column {
  _id = "_id",
  class = "class",
  created_at = "created_at",
  department = "department",
  email = "email",
  id = "id",
  name = "name",
  phone = "phone",
  updated_at = "updated_at",
  username = "username",
}

/**
 * expression to compare columns of type Boolean. All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * expression to compare columns of type Int. All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * input type for inserting array relation for remote table "article"
 */
export interface article_arr_rel_insert_input {
  data: article_insert_input[];
  on_conflict?: article_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "article". All fields are combined with a logical 'AND'.
 */
export interface article_bool_exp {
  _and?: (article_bool_exp | null)[] | null;
  _not?: article_bool_exp | null;
  _or?: (article_bool_exp | null)[] | null;
  abstract?: String_comparison_exp | null;
  alias?: String_comparison_exp | null;
  article_likers?: article_liker_bool_exp | null;
  article_tags?: article_tag_bool_exp | null;
  author?: user_bool_exp | null;
  authorId?: String_comparison_exp | null;
  comments?: comment_bool_exp | null;
  content?: String_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: Int_comparison_exp | null;
  title?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  views?: Int_comparison_exp | null;
  visible?: Boolean_comparison_exp | null;
}

/**
 * input type for inserting data into table "article"
 */
export interface article_insert_input {
  abstract?: string | null;
  alias?: string | null;
  article_likers?: article_liker_arr_rel_insert_input | null;
  article_tags?: article_tag_arr_rel_insert_input | null;
  author?: user_obj_rel_insert_input | null;
  authorId?: string | null;
  comments?: comment_arr_rel_insert_input | null;
  content?: string | null;
  created_at?: any | null;
  id?: number | null;
  title?: string | null;
  updated_at?: any | null;
  views?: number | null;
  visible?: boolean | null;
}

/**
 * input type for inserting array relation for remote table "article_liker"
 */
export interface article_liker_arr_rel_insert_input {
  data: article_liker_insert_input[];
  on_conflict?: article_liker_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "article_liker". All fields are combined with a logical 'AND'.
 */
export interface article_liker_bool_exp {
  _and?: (article_liker_bool_exp | null)[] | null;
  _not?: article_liker_bool_exp | null;
  _or?: (article_liker_bool_exp | null)[] | null;
  article?: article_bool_exp | null;
  article_id?: Int_comparison_exp | null;
  liker?: user_bool_exp | null;
  user_id?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "article_liker"
 */
export interface article_liker_insert_input {
  article?: article_obj_rel_insert_input | null;
  article_id?: number | null;
  liker?: user_obj_rel_insert_input | null;
  user_id?: string | null;
}

/**
 * on conflict condition type for table "article_liker"
 */
export interface article_liker_on_conflict {
  constraint: article_liker_constraint;
  update_columns: article_liker_update_column[];
  where?: article_liker_bool_exp | null;
}

/**
 * input type for inserting object relation for remote table "article"
 */
export interface article_obj_rel_insert_input {
  data: article_insert_input;
  on_conflict?: article_on_conflict | null;
}

/**
 * on conflict condition type for table "article"
 */
export interface article_on_conflict {
  constraint: article_constraint;
  update_columns: article_update_column[];
  where?: article_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "article_tag"
 */
export interface article_tag_arr_rel_insert_input {
  data: article_tag_insert_input[];
  on_conflict?: article_tag_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "article_tag". All fields are combined with a logical 'AND'.
 */
export interface article_tag_bool_exp {
  _and?: (article_tag_bool_exp | null)[] | null;
  _not?: article_tag_bool_exp | null;
  _or?: (article_tag_bool_exp | null)[] | null;
  article?: article_bool_exp | null;
  article_id?: Int_comparison_exp | null;
  tag?: tag_bool_exp | null;
  tag_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "article_tag"
 */
export interface article_tag_insert_input {
  article?: article_obj_rel_insert_input | null;
  article_id?: number | null;
  tag?: tag_obj_rel_insert_input | null;
  tag_id?: any | null;
}

/**
 * on conflict condition type for table "article_tag"
 */
export interface article_tag_on_conflict {
  constraint: article_tag_constraint;
  update_columns: article_tag_update_column[];
  where?: article_tag_bool_exp | null;
}

/**
 * expression to compare columns of type bigint. All fields are combined with logical 'AND'.
 */
export interface bigint_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "comment"
 */
export interface comment_arr_rel_insert_input {
  data: comment_insert_input[];
  on_conflict?: comment_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "comment". All fields are combined with a logical 'AND'.
 */
export interface comment_bool_exp {
  _and?: (comment_bool_exp | null)[] | null;
  _not?: comment_bool_exp | null;
  _or?: (comment_bool_exp | null)[] | null;
  article?: article_bool_exp | null;
  article_id?: Int_comparison_exp | null;
  content?: String_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  user?: user_bool_exp | null;
  user_id?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "comment"
 */
export interface comment_insert_input {
  article?: article_obj_rel_insert_input | null;
  article_id?: number | null;
  content?: string | null;
  created_at?: any | null;
  id?: any | null;
  updated_at?: any | null;
  user?: user_obj_rel_insert_input | null;
  user_id?: string | null;
}

/**
 * on conflict condition type for table "comment"
 */
export interface comment_on_conflict {
  constraint: comment_constraint;
  update_columns: comment_update_column[];
  where?: comment_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "mentor_application"
 */
export interface mentor_application_arr_rel_insert_input {
  data: mentor_application_insert_input[];
  on_conflict?: mentor_application_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "mentor_application". All fields are combined with a logical 'AND'.
 */
export interface mentor_application_bool_exp {
  _and?: (mentor_application_bool_exp | null)[] | null;
  _not?: mentor_application_bool_exp | null;
  _or?: (mentor_application_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  mentor?: user_bool_exp | null;
  mentor_id?: String_comparison_exp | null;
  statement?: String_comparison_exp | null;
  status?: String_comparison_exp | null;
  student?: user_bool_exp | null;
  student_id?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "mentor_application"
 */
export interface mentor_application_insert_input {
  created_at?: any | null;
  id?: any | null;
  mentor?: user_obj_rel_insert_input | null;
  mentor_id?: string | null;
  statement?: string | null;
  status?: string | null;
  student?: user_obj_rel_insert_input | null;
  student_id?: string | null;
  updated_at?: any | null;
}

/**
 * on conflict condition type for table "mentor_application"
 */
export interface mentor_application_on_conflict {
  constraint: mentor_application_constraint;
  update_columns: mentor_application_update_column[];
  where?: mentor_application_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "mentor_available". All fields are combined with a logical 'AND'.
 */
export interface mentor_available_bool_exp {
  _and?: (mentor_available_bool_exp | null)[] | null;
  _not?: mentor_available_bool_exp | null;
  _or?: (mentor_available_bool_exp | null)[] | null;
  available?: Boolean_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  mentor_id?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "mentor_available"
 */
export interface mentor_available_insert_input {
  available?: boolean | null;
  created_at?: any | null;
  mentor_id?: string | null;
  updated_at?: any | null;
}

/**
 * input type for inserting object relation for remote table "mentor_available"
 */
export interface mentor_available_obj_rel_insert_input {
  data: mentor_available_insert_input;
  on_conflict?: mentor_available_on_conflict | null;
}

/**
 * on conflict condition type for table "mentor_available"
 */
export interface mentor_available_on_conflict {
  constraint: mentor_available_constraint;
  update_columns: mentor_available_update_column[];
  where?: mentor_available_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "tag". All fields are combined with a logical 'AND'.
 */
export interface tag_bool_exp {
  _and?: (tag_bool_exp | null)[] | null;
  _not?: tag_bool_exp | null;
  _or?: (tag_bool_exp | null)[] | null;
  id?: uuid_comparison_exp | null;
  tag_articles?: article_tag_bool_exp | null;
  tag_name?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "tag"
 */
export interface tag_insert_input {
  id?: any | null;
  tag_articles?: article_tag_arr_rel_insert_input | null;
  tag_name?: string | null;
}

/**
 * input type for inserting object relation for remote table "tag"
 */
export interface tag_obj_rel_insert_input {
  data: tag_insert_input;
  on_conflict?: tag_on_conflict | null;
}

/**
 * on conflict condition type for table "tag"
 */
export interface tag_on_conflict {
  constraint: tag_constraint;
  update_columns: tag_update_column[];
  where?: tag_bool_exp | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'.
 */
export interface user_bool_exp {
  _and?: (user_bool_exp | null)[] | null;
  _id?: String_comparison_exp | null;
  _not?: user_bool_exp | null;
  _or?: (user_bool_exp | null)[] | null;
  articles?: article_bool_exp | null;
  class?: String_comparison_exp | null;
  comments?: comment_bool_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  department?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  id?: bigint_comparison_exp | null;
  like_articles?: article_liker_bool_exp | null;
  mentor_applications_mentor?: mentor_application_bool_exp | null;
  mentor_applications_student?: mentor_application_bool_exp | null;
  mentor_available?: mentor_available_bool_exp | null;
  name?: String_comparison_exp | null;
  phone?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  username?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "user"
 */
export interface user_insert_input {
  _id?: string | null;
  articles?: article_arr_rel_insert_input | null;
  class?: string | null;
  comments?: comment_arr_rel_insert_input | null;
  created_at?: any | null;
  department?: string | null;
  email?: string | null;
  id?: any | null;
  like_articles?: article_liker_arr_rel_insert_input | null;
  mentor_applications_mentor?: mentor_application_arr_rel_insert_input | null;
  mentor_applications_student?: mentor_application_arr_rel_insert_input | null;
  mentor_available?: mentor_available_obj_rel_insert_input | null;
  name?: string | null;
  phone?: string | null;
  updated_at?: any | null;
  username?: string | null;
}

/**
 * input type for inserting object relation for remote table "user"
 */
export interface user_obj_rel_insert_input {
  data: user_insert_input;
  on_conflict?: user_on_conflict | null;
}

/**
 * on conflict condition type for table "user"
 */
export interface user_on_conflict {
  constraint: user_constraint;
  update_columns: user_update_column[];
  where?: user_bool_exp | null;
}

/**
 * expression to compare columns of type uuid. All fields are combined with logical 'AND'.
 */
export interface uuid_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
