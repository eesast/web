import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  json: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "aid_application" */
export type Aid_Application = {
  __typename?: 'aid_application';
  aid: Scalars['String']['output'];
  amount: Scalars['Int']['output'];
  code: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  form_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  student: User;
  student_id: Scalars['String']['output'];
  student_uuid: Scalars['uuid']['output'];
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "aid_application" */
export type Aid_Application_Aggregate = {
  __typename?: 'aid_application_aggregate';
  aggregate?: Maybe<Aid_Application_Aggregate_Fields>;
  nodes: Array<Aid_Application>;
};

/** aggregate fields of "aid_application" */
export type Aid_Application_Aggregate_Fields = {
  __typename?: 'aid_application_aggregate_fields';
  avg?: Maybe<Aid_Application_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Aid_Application_Max_Fields>;
  min?: Maybe<Aid_Application_Min_Fields>;
  stddev?: Maybe<Aid_Application_Stddev_Fields>;
  stddev_pop?: Maybe<Aid_Application_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aid_Application_Stddev_Samp_Fields>;
  sum?: Maybe<Aid_Application_Sum_Fields>;
  var_pop?: Maybe<Aid_Application_Var_Pop_Fields>;
  var_samp?: Maybe<Aid_Application_Var_Samp_Fields>;
  variance?: Maybe<Aid_Application_Variance_Fields>;
};


/** aggregate fields of "aid_application" */
export type Aid_Application_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Aid_Application_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Aid_Application_Avg_Fields = {
  __typename?: 'aid_application_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "aid_application". All fields are combined with a logical 'AND'. */
export type Aid_Application_Bool_Exp = {
  _and?: InputMaybe<Array<Aid_Application_Bool_Exp>>;
  _not?: InputMaybe<Aid_Application_Bool_Exp>;
  _or?: InputMaybe<Array<Aid_Application_Bool_Exp>>;
  aid?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form_url?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<User_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  thank_letter?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "aid_application" */
export enum Aid_Application_Constraint {
  /** unique or primary key constraint on columns "id" */
  AidApplicationPkey1 = 'aid_application_pkey1'
}

/** input type for incrementing numeric columns in table "aid_application" */
export type Aid_Application_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "aid_application" */
export type Aid_Application_Insert_Input = {
  aid?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<User_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Aid_Application_Max_Fields = {
  __typename?: 'aid_application_max_fields';
  aid?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Aid_Application_Min_Fields = {
  __typename?: 'aid_application_min_fields';
  aid?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "aid_application" */
export type Aid_Application_Mutation_Response = {
  __typename?: 'aid_application_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Aid_Application>;
};

/** on_conflict condition type for table "aid_application" */
export type Aid_Application_On_Conflict = {
  constraint: Aid_Application_Constraint;
  update_columns?: Array<Aid_Application_Update_Column>;
  where?: InputMaybe<Aid_Application_Bool_Exp>;
};

/** Ordering options when selecting data from "aid_application". */
export type Aid_Application_Order_By = {
  aid?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_url?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student?: InputMaybe<User_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  thank_letter?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: aid_application */
export type Aid_Application_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "aid_application" */
export enum Aid_Application_Select_Column {
  /** column name */
  Aid = 'aid',
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormUrl = 'form_url',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  ThankLetter = 'thank_letter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "aid_application" */
export type Aid_Application_Set_Input = {
  aid?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Aid_Application_Stddev_Fields = {
  __typename?: 'aid_application_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Aid_Application_Stddev_Pop_Fields = {
  __typename?: 'aid_application_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Aid_Application_Stddev_Samp_Fields = {
  __typename?: 'aid_application_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Aid_Application_Sum_Fields = {
  __typename?: 'aid_application_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "aid_application" */
export enum Aid_Application_Update_Column {
  /** column name */
  Aid = 'aid',
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormUrl = 'form_url',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  ThankLetter = 'thank_letter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Aid_Application_Var_Pop_Fields = {
  __typename?: 'aid_application_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Aid_Application_Var_Samp_Fields = {
  __typename?: 'aid_application_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Aid_Application_Variance_Fields = {
  __typename?: 'aid_application_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "contest" */
export type Contest = {
  __typename?: 'contest';
  contest_name: Scalars['String']['output'];
  contest_type: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_date: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name?: Maybe<Scalars['String']['output']>;
  start_date: Scalars['timestamptz']['output'];
  status: Scalars['String']['output'];
};

/** aggregated selection of "contest" */
export type Contest_Aggregate = {
  __typename?: 'contest_aggregate';
  aggregate?: Maybe<Contest_Aggregate_Fields>;
  nodes: Array<Contest>;
};

/** aggregate fields of "contest" */
export type Contest_Aggregate_Fields = {
  __typename?: 'contest_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Max_Fields>;
  min?: Maybe<Contest_Min_Fields>;
};


/** aggregate fields of "contest" */
export type Contest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contest". All fields are combined with a logical 'AND'. */
export type Contest_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Bool_Exp>>;
  _not?: InputMaybe<Contest_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Bool_Exp>>;
  contest_name?: InputMaybe<String_Comparison_Exp>;
  contest_type?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "contest_code" */
export type Contest_Code = {
  __typename?: 'contest_code';
  code1?: Maybe<Scalars['String']['output']>;
  code1_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code2?: Maybe<Scalars['String']['output']>;
  code2_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code3?: Maybe<Scalars['String']['output']>;
  code3_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code4?: Maybe<Scalars['String']['output']>;
  code4_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code5?: Maybe<Scalars['String']['output']>;
  code5_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code6?: Maybe<Scalars['String']['output']>;
  code6_update_time?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  code_contest_id: Contest;
  /** An object relationship */
  code_team_id: Contest_Team;
  code_type1?: Maybe<Scalars['String']['output']>;
  code_type2?: Maybe<Scalars['String']['output']>;
  code_type3?: Maybe<Scalars['String']['output']>;
  code_type4?: Maybe<Scalars['String']['output']>;
  code_type5?: Maybe<Scalars['String']['output']>;
  code_type6?: Maybe<Scalars['String']['output']>;
  contest_id: Scalars['uuid']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  team_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "contest_code" */
export type Contest_Code_Aggregate = {
  __typename?: 'contest_code_aggregate';
  aggregate?: Maybe<Contest_Code_Aggregate_Fields>;
  nodes: Array<Contest_Code>;
};

/** aggregate fields of "contest_code" */
export type Contest_Code_Aggregate_Fields = {
  __typename?: 'contest_code_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Code_Max_Fields>;
  min?: Maybe<Contest_Code_Min_Fields>;
};


/** aggregate fields of "contest_code" */
export type Contest_Code_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Code_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contest_code". All fields are combined with a logical 'AND'. */
export type Contest_Code_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Code_Bool_Exp>>;
  _not?: InputMaybe<Contest_Code_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Code_Bool_Exp>>;
  code1?: InputMaybe<String_Comparison_Exp>;
  code1_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code2?: InputMaybe<String_Comparison_Exp>;
  code2_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code3?: InputMaybe<String_Comparison_Exp>;
  code3_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code4?: InputMaybe<String_Comparison_Exp>;
  code4_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code5?: InputMaybe<String_Comparison_Exp>;
  code5_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code6?: InputMaybe<String_Comparison_Exp>;
  code6_update_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  code_contest_id?: InputMaybe<Contest_Bool_Exp>;
  code_team_id?: InputMaybe<Contest_Team_Bool_Exp>;
  code_type1?: InputMaybe<String_Comparison_Exp>;
  code_type2?: InputMaybe<String_Comparison_Exp>;
  code_type3?: InputMaybe<String_Comparison_Exp>;
  code_type4?: InputMaybe<String_Comparison_Exp>;
  code_type5?: InputMaybe<String_Comparison_Exp>;
  code_type6?: InputMaybe<String_Comparison_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_code" */
export enum Contest_Code_Constraint {
  /** unique or primary key constraint on columns "team_id" */
  ContestCodePkey = 'contest_code_pkey'
}

/** input type for inserting data into table "contest_code" */
export type Contest_Code_Insert_Input = {
  code1?: InputMaybe<Scalars['String']['input']>;
  code1_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code2?: InputMaybe<Scalars['String']['input']>;
  code2_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code3?: InputMaybe<Scalars['String']['input']>;
  code3_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code4?: InputMaybe<Scalars['String']['input']>;
  code4_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code5?: InputMaybe<Scalars['String']['input']>;
  code5_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code6?: InputMaybe<Scalars['String']['input']>;
  code6_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code_contest_id?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  code_team_id?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  code_type1?: InputMaybe<Scalars['String']['input']>;
  code_type2?: InputMaybe<Scalars['String']['input']>;
  code_type3?: InputMaybe<Scalars['String']['input']>;
  code_type4?: InputMaybe<Scalars['String']['input']>;
  code_type5?: InputMaybe<Scalars['String']['input']>;
  code_type6?: InputMaybe<Scalars['String']['input']>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Code_Max_Fields = {
  __typename?: 'contest_code_max_fields';
  code1?: Maybe<Scalars['String']['output']>;
  code1_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code2?: Maybe<Scalars['String']['output']>;
  code2_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code3?: Maybe<Scalars['String']['output']>;
  code3_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code4?: Maybe<Scalars['String']['output']>;
  code4_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code5?: Maybe<Scalars['String']['output']>;
  code5_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code6?: Maybe<Scalars['String']['output']>;
  code6_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code_type1?: Maybe<Scalars['String']['output']>;
  code_type2?: Maybe<Scalars['String']['output']>;
  code_type3?: Maybe<Scalars['String']['output']>;
  code_type4?: Maybe<Scalars['String']['output']>;
  code_type5?: Maybe<Scalars['String']['output']>;
  code_type6?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Contest_Code_Min_Fields = {
  __typename?: 'contest_code_min_fields';
  code1?: Maybe<Scalars['String']['output']>;
  code1_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code2?: Maybe<Scalars['String']['output']>;
  code2_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code3?: Maybe<Scalars['String']['output']>;
  code3_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code4?: Maybe<Scalars['String']['output']>;
  code4_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code5?: Maybe<Scalars['String']['output']>;
  code5_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code6?: Maybe<Scalars['String']['output']>;
  code6_update_time?: Maybe<Scalars['timestamptz']['output']>;
  code_type1?: Maybe<Scalars['String']['output']>;
  code_type2?: Maybe<Scalars['String']['output']>;
  code_type3?: Maybe<Scalars['String']['output']>;
  code_type4?: Maybe<Scalars['String']['output']>;
  code_type5?: Maybe<Scalars['String']['output']>;
  code_type6?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "contest_code" */
export type Contest_Code_Mutation_Response = {
  __typename?: 'contest_code_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Code>;
};

/** on_conflict condition type for table "contest_code" */
export type Contest_Code_On_Conflict = {
  constraint: Contest_Code_Constraint;
  update_columns?: Array<Contest_Code_Update_Column>;
  where?: InputMaybe<Contest_Code_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_code". */
export type Contest_Code_Order_By = {
  code1?: InputMaybe<Order_By>;
  code1_update_time?: InputMaybe<Order_By>;
  code2?: InputMaybe<Order_By>;
  code2_update_time?: InputMaybe<Order_By>;
  code3?: InputMaybe<Order_By>;
  code3_update_time?: InputMaybe<Order_By>;
  code4?: InputMaybe<Order_By>;
  code4_update_time?: InputMaybe<Order_By>;
  code5?: InputMaybe<Order_By>;
  code5_update_time?: InputMaybe<Order_By>;
  code6?: InputMaybe<Order_By>;
  code6_update_time?: InputMaybe<Order_By>;
  code_contest_id?: InputMaybe<Contest_Order_By>;
  code_team_id?: InputMaybe<Contest_Team_Order_By>;
  code_type1?: InputMaybe<Order_By>;
  code_type2?: InputMaybe<Order_By>;
  code_type3?: InputMaybe<Order_By>;
  code_type4?: InputMaybe<Order_By>;
  code_type5?: InputMaybe<Order_By>;
  code_type6?: InputMaybe<Order_By>;
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_code */
export type Contest_Code_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_code" */
export enum Contest_Code_Select_Column {
  /** column name */
  Code1 = 'code1',
  /** column name */
  Code1UpdateTime = 'code1_update_time',
  /** column name */
  Code2 = 'code2',
  /** column name */
  Code2UpdateTime = 'code2_update_time',
  /** column name */
  Code3 = 'code3',
  /** column name */
  Code3UpdateTime = 'code3_update_time',
  /** column name */
  Code4 = 'code4',
  /** column name */
  Code4UpdateTime = 'code4_update_time',
  /** column name */
  Code5 = 'code5',
  /** column name */
  Code5UpdateTime = 'code5_update_time',
  /** column name */
  Code6 = 'code6',
  /** column name */
  Code6UpdateTime = 'code6_update_time',
  /** column name */
  CodeType1 = 'code_type1',
  /** column name */
  CodeType2 = 'code_type2',
  /** column name */
  CodeType3 = 'code_type3',
  /** column name */
  CodeType4 = 'code_type4',
  /** column name */
  CodeType5 = 'code_type5',
  /** column name */
  CodeType6 = 'code_type6',
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "contest_code" */
export type Contest_Code_Set_Input = {
  code1?: InputMaybe<Scalars['String']['input']>;
  code1_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code2?: InputMaybe<Scalars['String']['input']>;
  code2_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code3?: InputMaybe<Scalars['String']['input']>;
  code3_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code4?: InputMaybe<Scalars['String']['input']>;
  code4_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code5?: InputMaybe<Scalars['String']['input']>;
  code5_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code6?: InputMaybe<Scalars['String']['input']>;
  code6_update_time?: InputMaybe<Scalars['timestamptz']['input']>;
  code_type1?: InputMaybe<Scalars['String']['input']>;
  code_type2?: InputMaybe<Scalars['String']['input']>;
  code_type3?: InputMaybe<Scalars['String']['input']>;
  code_type4?: InputMaybe<Scalars['String']['input']>;
  code_type5?: InputMaybe<Scalars['String']['input']>;
  code_type6?: InputMaybe<Scalars['String']['input']>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "contest_code" */
export enum Contest_Code_Update_Column {
  /** column name */
  Code1 = 'code1',
  /** column name */
  Code1UpdateTime = 'code1_update_time',
  /** column name */
  Code2 = 'code2',
  /** column name */
  Code2UpdateTime = 'code2_update_time',
  /** column name */
  Code3 = 'code3',
  /** column name */
  Code3UpdateTime = 'code3_update_time',
  /** column name */
  Code4 = 'code4',
  /** column name */
  Code4UpdateTime = 'code4_update_time',
  /** column name */
  Code5 = 'code5',
  /** column name */
  Code5UpdateTime = 'code5_update_time',
  /** column name */
  Code6 = 'code6',
  /** column name */
  Code6UpdateTime = 'code6_update_time',
  /** column name */
  CodeType1 = 'code_type1',
  /** column name */
  CodeType2 = 'code_type2',
  /** column name */
  CodeType3 = 'code_type3',
  /** column name */
  CodeType4 = 'code_type4',
  /** column name */
  CodeType5 = 'code_type5',
  /** column name */
  CodeType6 = 'code_type6',
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** unique or primary key constraints on table "contest" */
export enum Contest_Constraint {
  /** unique or primary key constraint on columns "name" */
  ContestNameKey = 'contest_name_key',
  /** unique or primary key constraint on columns "id" */
  ContestPkey = 'contest_pkey'
}

/** 比赛信息 */
export type Contest_Info = {
  __typename?: 'contest_info';
  content: Scalars['String']['output'];
  contest_id: Scalars['uuid']['output'];
  /** An object relationship */
  contest_id_info: Contest;
  created_at: Scalars['timestamptz']['output'];
  files?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "contest_info" */
export type Contest_Info_Aggregate = {
  __typename?: 'contest_info_aggregate';
  aggregate?: Maybe<Contest_Info_Aggregate_Fields>;
  nodes: Array<Contest_Info>;
};

/** aggregate fields of "contest_info" */
export type Contest_Info_Aggregate_Fields = {
  __typename?: 'contest_info_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Info_Max_Fields>;
  min?: Maybe<Contest_Info_Min_Fields>;
};


/** aggregate fields of "contest_info" */
export type Contest_Info_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Info_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contest_info". All fields are combined with a logical 'AND'. */
export type Contest_Info_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Info_Bool_Exp>>;
  _not?: InputMaybe<Contest_Info_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Info_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_id_info?: InputMaybe<Contest_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  files?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_info" */
export enum Contest_Info_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContestInfoPkey = 'contest_info_pkey'
}

/** input type for inserting data into table "contest_info" */
export type Contest_Info_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_id_info?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Info_Max_Fields = {
  __typename?: 'contest_info_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Contest_Info_Min_Fields = {
  __typename?: 'contest_info_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "contest_info" */
export type Contest_Info_Mutation_Response = {
  __typename?: 'contest_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Info>;
};

/** on_conflict condition type for table "contest_info" */
export type Contest_Info_On_Conflict = {
  constraint: Contest_Info_Constraint;
  update_columns?: Array<Contest_Info_Update_Column>;
  where?: InputMaybe<Contest_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_info". */
export type Contest_Info_Order_By = {
  content?: InputMaybe<Order_By>;
  contest_id?: InputMaybe<Order_By>;
  contest_id_info?: InputMaybe<Contest_Order_By>;
  created_at?: InputMaybe<Order_By>;
  files?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_info */
export type Contest_Info_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contest_info" */
export enum Contest_Info_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Files = 'files',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "contest_info" */
export type Contest_Info_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "contest_info" */
export enum Contest_Info_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Files = 'files',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for inserting data into table "contest" */
export type Contest_Insert_Input = {
  contest_name?: InputMaybe<Scalars['String']['input']>;
  contest_type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** 比赛管理员映射表 */
export type Contest_Manager = {
  __typename?: 'contest_manager';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByUserUuid: Users;
  user_id?: Maybe<Scalars['String']['output']>;
  user_uuid: Scalars['uuid']['output'];
};

/** aggregated selection of "contest_manager" */
export type Contest_Manager_Aggregate = {
  __typename?: 'contest_manager_aggregate';
  aggregate?: Maybe<Contest_Manager_Aggregate_Fields>;
  nodes: Array<Contest_Manager>;
};

/** aggregate fields of "contest_manager" */
export type Contest_Manager_Aggregate_Fields = {
  __typename?: 'contest_manager_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Manager_Max_Fields>;
  min?: Maybe<Contest_Manager_Min_Fields>;
};


/** aggregate fields of "contest_manager" */
export type Contest_Manager_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contest_manager". All fields are combined with a logical 'AND'. */
export type Contest_Manager_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Manager_Bool_Exp>>;
  _not?: InputMaybe<Contest_Manager_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Manager_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByUserUuid?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  user_uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_manager" */
export enum Contest_Manager_Constraint {
  /** unique or primary key constraint on columns "user_uuid", "contest_id" */
  ContestManagerPkey = 'contest_manager_pkey'
}

/** input type for inserting data into table "contest_manager" */
export type Contest_Manager_Insert_Input = {
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userByUserUuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Manager_Max_Fields = {
  __typename?: 'contest_manager_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Contest_Manager_Min_Fields = {
  __typename?: 'contest_manager_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "contest_manager" */
export type Contest_Manager_Mutation_Response = {
  __typename?: 'contest_manager_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Manager>;
};

/** on_conflict condition type for table "contest_manager" */
export type Contest_Manager_On_Conflict = {
  constraint: Contest_Manager_Constraint;
  update_columns?: Array<Contest_Manager_Update_Column>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_manager". */
export type Contest_Manager_Order_By = {
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByUserUuid?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_manager */
export type Contest_Manager_Pk_Columns_Input = {
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};

/** select columns of table "contest_manager" */
export enum Contest_Manager_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** input type for updating data in table "contest_manager" */
export type Contest_Manager_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_manager" */
export enum Contest_Manager_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** aggregate max on columns */
export type Contest_Max_Fields = {
  __typename?: 'contest_max_fields';
  contest_name?: Maybe<Scalars['String']['output']>;
  contest_type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Contest_Min_Fields = {
  __typename?: 'contest_min_fields';
  contest_name?: Maybe<Scalars['String']['output']>;
  contest_type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "contest" */
export type Contest_Mutation_Response = {
  __typename?: 'contest_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest>;
};

/** input type for inserting object relation for remote table "contest" */
export type Contest_Obj_Rel_Insert_Input = {
  data: Contest_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_On_Conflict>;
};

/** on_conflict condition type for table "contest" */
export type Contest_On_Conflict = {
  constraint: Contest_Constraint;
  update_columns?: Array<Contest_Update_Column>;
  where?: InputMaybe<Contest_Bool_Exp>;
};

/** Ordering options when selecting data from "contest". */
export type Contest_Order_By = {
  contest_name?: InputMaybe<Order_By>;
  contest_type?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest */
export type Contest_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "contest_room" */
export type Contest_Room = {
  __typename?: 'contest_room';
  contest_id: Scalars['uuid']['output'];
  /** An array relationship */
  contest_room_teams: Array<Contest_Room_Team>;
  /** An aggregate relationship */
  contest_room_teams_aggregate: Contest_Room_Team_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id: Scalars['uuid']['output'];
  status: Scalars['Boolean']['output'];
};


/** columns and relationships of "contest_room" */
export type Contest_RoomContest_Room_TeamsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


/** columns and relationships of "contest_room" */
export type Contest_RoomContest_Room_Teams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};

/** aggregated selection of "contest_room" */
export type Contest_Room_Aggregate = {
  __typename?: 'contest_room_aggregate';
  aggregate?: Maybe<Contest_Room_Aggregate_Fields>;
  nodes: Array<Contest_Room>;
};

/** aggregate fields of "contest_room" */
export type Contest_Room_Aggregate_Fields = {
  __typename?: 'contest_room_aggregate_fields';
  avg?: Maybe<Contest_Room_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Room_Max_Fields>;
  min?: Maybe<Contest_Room_Min_Fields>;
  stddev?: Maybe<Contest_Room_Stddev_Fields>;
  stddev_pop?: Maybe<Contest_Room_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contest_Room_Stddev_Samp_Fields>;
  sum?: Maybe<Contest_Room_Sum_Fields>;
  var_pop?: Maybe<Contest_Room_Var_Pop_Fields>;
  var_samp?: Maybe<Contest_Room_Var_Samp_Fields>;
  variance?: Maybe<Contest_Room_Variance_Fields>;
};


/** aggregate fields of "contest_room" */
export type Contest_Room_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Room_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Contest_Room_Avg_Fields = {
  __typename?: 'contest_room_avg_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "contest_room". All fields are combined with a logical 'AND'. */
export type Contest_Room_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Room_Bool_Exp>>;
  _not?: InputMaybe<Contest_Room_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Room_Bool_Exp>>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_room_teams?: InputMaybe<Contest_Room_Team_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  port?: InputMaybe<Int_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  room_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_room" */
export enum Contest_Room_Constraint {
  /** unique or primary key constraint on columns "room_id" */
  ContestRoomPkey = 'contest_room_pkey'
}

/** input type for incrementing numeric columns in table "contest_room" */
export type Contest_Room_Inc_Input = {
  port?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "contest_room" */
export type Contest_Room_Insert_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_room_teams?: InputMaybe<Contest_Room_Team_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Contest_Room_Max_Fields = {
  __typename?: 'contest_room_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Contest_Room_Min_Fields = {
  __typename?: 'contest_room_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "contest_room" */
export type Contest_Room_Mutation_Response = {
  __typename?: 'contest_room_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Room>;
};

/** input type for inserting object relation for remote table "contest_room" */
export type Contest_Room_Obj_Rel_Insert_Input = {
  data: Contest_Room_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Room_On_Conflict>;
};

/** on_conflict condition type for table "contest_room" */
export type Contest_Room_On_Conflict = {
  constraint: Contest_Room_Constraint;
  update_columns?: Array<Contest_Room_Update_Column>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_room". */
export type Contest_Room_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  contest_room_teams_aggregate?: InputMaybe<Contest_Room_Team_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_room */
export type Contest_Room_Pk_Columns_Input = {
  room_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_room" */
export enum Contest_Room_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Port = 'port',
  /** column name */
  Result = 'result',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "contest_room" */
export type Contest_Room_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Contest_Room_Stddev_Fields = {
  __typename?: 'contest_room_stddev_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Contest_Room_Stddev_Pop_Fields = {
  __typename?: 'contest_room_stddev_pop_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Contest_Room_Stddev_Samp_Fields = {
  __typename?: 'contest_room_stddev_samp_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Contest_Room_Sum_Fields = {
  __typename?: 'contest_room_sum_fields';
  port?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "contest_room_team" */
export type Contest_Room_Team = {
  __typename?: 'contest_room_team';
  /** An object relationship */
  contest_room: Contest_Room;
  /** An object relationship */
  contest_team: Contest_Team;
  room_id: Scalars['uuid']['output'];
  team_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contest_room_team" */
export type Contest_Room_Team_Aggregate = {
  __typename?: 'contest_room_team_aggregate';
  aggregate?: Maybe<Contest_Room_Team_Aggregate_Fields>;
  nodes: Array<Contest_Room_Team>;
};

/** aggregate fields of "contest_room_team" */
export type Contest_Room_Team_Aggregate_Fields = {
  __typename?: 'contest_room_team_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Room_Team_Max_Fields>;
  min?: Maybe<Contest_Room_Team_Min_Fields>;
};


/** aggregate fields of "contest_room_team" */
export type Contest_Room_Team_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_room_team" */
export type Contest_Room_Team_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Room_Team_Max_Order_By>;
  min?: InputMaybe<Contest_Room_Team_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_room_team" */
export type Contest_Room_Team_Arr_Rel_Insert_Input = {
  data: Array<Contest_Room_Team_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Room_Team_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_room_team". All fields are combined with a logical 'AND'. */
export type Contest_Room_Team_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Room_Team_Bool_Exp>>;
  _not?: InputMaybe<Contest_Room_Team_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Room_Team_Bool_Exp>>;
  contest_room?: InputMaybe<Contest_Room_Bool_Exp>;
  contest_team?: InputMaybe<Contest_Team_Bool_Exp>;
  room_id?: InputMaybe<Uuid_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_room_team" */
export enum Contest_Room_Team_Constraint {
  /** unique or primary key constraint on columns "room_id", "team_id" */
  ContestRoomTeamPkey = 'contest_room_team_pkey'
}

/** input type for inserting data into table "contest_room_team" */
export type Contest_Room_Team_Insert_Input = {
  contest_room?: InputMaybe<Contest_Room_Obj_Rel_Insert_Input>;
  contest_team?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Room_Team_Max_Fields = {
  __typename?: 'contest_room_team_max_fields';
  room_id?: Maybe<Scalars['uuid']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_room_team" */
export type Contest_Room_Team_Max_Order_By = {
  room_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Room_Team_Min_Fields = {
  __typename?: 'contest_room_team_min_fields';
  room_id?: Maybe<Scalars['uuid']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_room_team" */
export type Contest_Room_Team_Min_Order_By = {
  room_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_room_team" */
export type Contest_Room_Team_Mutation_Response = {
  __typename?: 'contest_room_team_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Room_Team>;
};

/** on_conflict condition type for table "contest_room_team" */
export type Contest_Room_Team_On_Conflict = {
  constraint: Contest_Room_Team_Constraint;
  update_columns?: Array<Contest_Room_Team_Update_Column>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_room_team". */
export type Contest_Room_Team_Order_By = {
  contest_room?: InputMaybe<Contest_Room_Order_By>;
  contest_team?: InputMaybe<Contest_Team_Order_By>;
  room_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_room_team */
export type Contest_Room_Team_Pk_Columns_Input = {
  room_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_room_team" */
export enum Contest_Room_Team_Select_Column {
  /** column name */
  RoomId = 'room_id',
  /** column name */
  TeamId = 'team_id'
}

/** input type for updating data in table "contest_room_team" */
export type Contest_Room_Team_Set_Input = {
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_room_team" */
export enum Contest_Room_Team_Update_Column {
  /** column name */
  RoomId = 'room_id',
  /** column name */
  TeamId = 'team_id'
}

/** update columns of table "contest_room" */
export enum Contest_Room_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Port = 'port',
  /** column name */
  Result = 'result',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  Status = 'status'
}

/** aggregate var_pop on columns */
export type Contest_Room_Var_Pop_Fields = {
  __typename?: 'contest_room_var_pop_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Contest_Room_Var_Samp_Fields = {
  __typename?: 'contest_room_var_samp_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Contest_Room_Variance_Fields = {
  __typename?: 'contest_room_variance_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** select columns of table "contest" */
export enum Contest_Select_Column {
  /** column name */
  ContestName = 'contest_name',
  /** column name */
  ContestType = 'contest_type',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "contest" */
export type Contest_Set_Input = {
  contest_name?: InputMaybe<Scalars['String']['input']>;
  contest_type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** 比赛队伍 */
export type Contest_Team = {
  __typename?: 'contest_team';
  contest_id: Scalars['uuid']['output'];
  contest_score?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  contest_team_members: Array<Contest_Team_Member>;
  /** An aggregate relationship */
  contest_team_members_aggregate: Contest_Team_Member_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  invited_code?: Maybe<Scalars['String']['output']>;
  /** 已有人员数量 */
  member_num: Scalars['Int']['output'];
  score?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  status2?: Maybe<Scalars['String']['output']>;
  submitted_code_num: Scalars['Int']['output'];
  /** An object relationship */
  team_contest_id: Contest;
  team_id: Scalars['uuid']['output'];
  team_intro?: Maybe<Scalars['String']['output']>;
  team_leader?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  team_leader_byuuid?: Maybe<Users>;
  /** An object relationship */
  team_leader_id?: Maybe<User>;
  team_leader_uuid?: Maybe<Scalars['uuid']['output']>;
  team_name: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_MembersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};

/** aggregated selection of "contest_team" */
export type Contest_Team_Aggregate = {
  __typename?: 'contest_team_aggregate';
  aggregate?: Maybe<Contest_Team_Aggregate_Fields>;
  nodes: Array<Contest_Team>;
};

/** aggregate fields of "contest_team" */
export type Contest_Team_Aggregate_Fields = {
  __typename?: 'contest_team_aggregate_fields';
  avg?: Maybe<Contest_Team_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Team_Max_Fields>;
  min?: Maybe<Contest_Team_Min_Fields>;
  stddev?: Maybe<Contest_Team_Stddev_Fields>;
  stddev_pop?: Maybe<Contest_Team_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contest_Team_Stddev_Samp_Fields>;
  sum?: Maybe<Contest_Team_Sum_Fields>;
  var_pop?: Maybe<Contest_Team_Var_Pop_Fields>;
  var_samp?: Maybe<Contest_Team_Var_Samp_Fields>;
  variance?: Maybe<Contest_Team_Variance_Fields>;
};


/** aggregate fields of "contest_team" */
export type Contest_Team_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Team_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_team" */
export type Contest_Team_Aggregate_Order_By = {
  avg?: InputMaybe<Contest_Team_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Team_Max_Order_By>;
  min?: InputMaybe<Contest_Team_Min_Order_By>;
  stddev?: InputMaybe<Contest_Team_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contest_Team_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contest_Team_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contest_Team_Sum_Order_By>;
  var_pop?: InputMaybe<Contest_Team_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contest_Team_Var_Samp_Order_By>;
  variance?: InputMaybe<Contest_Team_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contest_team" */
export type Contest_Team_Arr_Rel_Insert_Input = {
  data: Array<Contest_Team_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_On_Conflict>;
};

/** aggregate avg on columns */
export type Contest_Team_Avg_Fields = {
  __typename?: 'contest_team_avg_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contest_team" */
export type Contest_Team_Avg_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contest_team". All fields are combined with a logical 'AND'. */
export type Contest_Team_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Team_Bool_Exp>>;
  _not?: InputMaybe<Contest_Team_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Team_Bool_Exp>>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_score?: InputMaybe<String_Comparison_Exp>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invited_code?: InputMaybe<String_Comparison_Exp>;
  member_num?: InputMaybe<Int_Comparison_Exp>;
  score?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  status2?: InputMaybe<String_Comparison_Exp>;
  submitted_code_num?: InputMaybe<Int_Comparison_Exp>;
  team_contest_id?: InputMaybe<Contest_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  team_intro?: InputMaybe<String_Comparison_Exp>;
  team_leader?: InputMaybe<String_Comparison_Exp>;
  team_leader_byuuid?: InputMaybe<Users_Bool_Exp>;
  team_leader_id?: InputMaybe<User_Bool_Exp>;
  team_leader_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  team_name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_team" */
export enum Contest_Team_Constraint {
  /** unique or primary key constraint on columns "team_id" */
  ContestTeamPkey = 'contest_team_pkey'
}

/** input type for incrementing numeric columns in table "contest_team" */
export type Contest_Team_Inc_Input = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Scalars['Int']['input']>;
  submitted_code_num?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "contest_team" */
export type Contest_Team_Insert_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_score?: InputMaybe<Scalars['String']['input']>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  invited_code?: InputMaybe<Scalars['String']['input']>;
  /** 已有人员数量 */
  member_num?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status2?: InputMaybe<Scalars['String']['input']>;
  submitted_code_num?: InputMaybe<Scalars['Int']['input']>;
  team_contest_id?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  team_intro?: InputMaybe<Scalars['String']['input']>;
  team_leader?: InputMaybe<Scalars['String']['input']>;
  team_leader_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  team_leader_id?: InputMaybe<User_Obj_Rel_Insert_Input>;
  team_leader_uuid?: InputMaybe<Scalars['uuid']['input']>;
  team_name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Team_Max_Fields = {
  __typename?: 'contest_team_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  contest_score?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  invited_code?: Maybe<Scalars['String']['output']>;
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  status2?: Maybe<Scalars['String']['output']>;
  submitted_code_num?: Maybe<Scalars['Int']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  team_intro?: Maybe<Scalars['String']['output']>;
  team_leader?: Maybe<Scalars['String']['output']>;
  team_leader_uuid?: Maybe<Scalars['uuid']['output']>;
  team_name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "contest_team" */
export type Contest_Team_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  contest_score?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invited_code?: InputMaybe<Order_By>;
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  status2?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_intro?: InputMaybe<Order_By>;
  team_leader?: InputMaybe<Order_By>;
  team_leader_uuid?: InputMaybe<Order_By>;
  team_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** 队伍、成员映射表 */
export type Contest_Team_Member = {
  __typename?: 'contest_team_member';
  /** An object relationship */
  team_as_contest_team_member: Contest_Team;
  team_id: Scalars['uuid']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  /** An object relationship */
  user_as_contest_team_member: User;
  user_id: Scalars['String']['output'];
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "contest_team_member" */
export type Contest_Team_Member_Aggregate = {
  __typename?: 'contest_team_member_aggregate';
  aggregate?: Maybe<Contest_Team_Member_Aggregate_Fields>;
  nodes: Array<Contest_Team_Member>;
};

/** aggregate fields of "contest_team_member" */
export type Contest_Team_Member_Aggregate_Fields = {
  __typename?: 'contest_team_member_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Team_Member_Max_Fields>;
  min?: Maybe<Contest_Team_Member_Min_Fields>;
};


/** aggregate fields of "contest_team_member" */
export type Contest_Team_Member_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_team_member" */
export type Contest_Team_Member_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Team_Member_Max_Order_By>;
  min?: InputMaybe<Contest_Team_Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_team_member" */
export type Contest_Team_Member_Arr_Rel_Insert_Input = {
  data: Array<Contest_Team_Member_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_team_member". All fields are combined with a logical 'AND'. */
export type Contest_Team_Member_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Team_Member_Bool_Exp>>;
  _not?: InputMaybe<Contest_Team_Member_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Team_Member_Bool_Exp>>;
  team_as_contest_team_member?: InputMaybe<Contest_Team_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_as_contest_team_member?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  user_uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_team_member" */
export enum Contest_Team_Member_Constraint {
  /** unique or primary key constraint on columns "user_id", "team_id" */
  ContestTeamMemberPkey = 'contest_team_member_pkey'
}

/** input type for inserting data into table "contest_team_member" */
export type Contest_Team_Member_Insert_Input = {
  team_as_contest_team_member?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_as_contest_team_member?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Team_Member_Max_Fields = {
  __typename?: 'contest_team_member_max_fields';
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_team_member" */
export type Contest_Team_Member_Max_Order_By = {
  team_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Team_Member_Min_Fields = {
  __typename?: 'contest_team_member_min_fields';
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_team_member" */
export type Contest_Team_Member_Min_Order_By = {
  team_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_team_member" */
export type Contest_Team_Member_Mutation_Response = {
  __typename?: 'contest_team_member_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Team_Member>;
};

/** on_conflict condition type for table "contest_team_member" */
export type Contest_Team_Member_On_Conflict = {
  constraint: Contest_Team_Member_Constraint;
  update_columns?: Array<Contest_Team_Member_Update_Column>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_team_member". */
export type Contest_Team_Member_Order_By = {
  team_as_contest_team_member?: InputMaybe<Contest_Team_Order_By>;
  team_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_as_contest_team_member?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team_member */
export type Contest_Team_Member_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['String']['input'];
};

/** select columns of table "contest_team_member" */
export enum Contest_Team_Member_Select_Column {
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** input type for updating data in table "contest_team_member" */
export type Contest_Team_Member_Set_Input = {
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_team_member" */
export enum Contest_Team_Member_Update_Column {
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** aggregate min on columns */
export type Contest_Team_Min_Fields = {
  __typename?: 'contest_team_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  contest_score?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  invited_code?: Maybe<Scalars['String']['output']>;
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  status2?: Maybe<Scalars['String']['output']>;
  submitted_code_num?: Maybe<Scalars['Int']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  team_intro?: Maybe<Scalars['String']['output']>;
  team_leader?: Maybe<Scalars['String']['output']>;
  team_leader_uuid?: Maybe<Scalars['uuid']['output']>;
  team_name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "contest_team" */
export type Contest_Team_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  contest_score?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  invited_code?: InputMaybe<Order_By>;
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  status2?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_intro?: InputMaybe<Order_By>;
  team_leader?: InputMaybe<Order_By>;
  team_leader_uuid?: InputMaybe<Order_By>;
  team_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_team" */
export type Contest_Team_Mutation_Response = {
  __typename?: 'contest_team_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Team>;
};

/** input type for inserting object relation for remote table "contest_team" */
export type Contest_Team_Obj_Rel_Insert_Input = {
  data: Contest_Team_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_On_Conflict>;
};

/** on_conflict condition type for table "contest_team" */
export type Contest_Team_On_Conflict = {
  constraint: Contest_Team_Constraint;
  update_columns?: Array<Contest_Team_Update_Column>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_team". */
export type Contest_Team_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  contest_score?: InputMaybe<Order_By>;
  contest_team_members_aggregate?: InputMaybe<Contest_Team_Member_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  invited_code?: InputMaybe<Order_By>;
  member_num?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  status2?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
  team_contest_id?: InputMaybe<Contest_Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_intro?: InputMaybe<Order_By>;
  team_leader?: InputMaybe<Order_By>;
  team_leader_byuuid?: InputMaybe<Users_Order_By>;
  team_leader_id?: InputMaybe<User_Order_By>;
  team_leader_uuid?: InputMaybe<Order_By>;
  team_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team */
export type Contest_Team_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_team" */
export enum Contest_Team_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  ContestScore = 'contest_score',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvitedCode = 'invited_code',
  /** column name */
  MemberNum = 'member_num',
  /** column name */
  Score = 'score',
  /** column name */
  Status = 'status',
  /** column name */
  Status2 = 'status2',
  /** column name */
  SubmittedCodeNum = 'submitted_code_num',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  TeamIntro = 'team_intro',
  /** column name */
  TeamLeader = 'team_leader',
  /** column name */
  TeamLeaderUuid = 'team_leader_uuid',
  /** column name */
  TeamName = 'team_name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "contest_team" */
export type Contest_Team_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_score?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  invited_code?: InputMaybe<Scalars['String']['input']>;
  /** 已有人员数量 */
  member_num?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  status2?: InputMaybe<Scalars['String']['input']>;
  submitted_code_num?: InputMaybe<Scalars['Int']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  team_intro?: InputMaybe<Scalars['String']['input']>;
  team_leader?: InputMaybe<Scalars['String']['input']>;
  team_leader_uuid?: InputMaybe<Scalars['uuid']['input']>;
  team_name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Contest_Team_Stddev_Fields = {
  __typename?: 'contest_team_stddev_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contest_team" */
export type Contest_Team_Stddev_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contest_Team_Stddev_Pop_Fields = {
  __typename?: 'contest_team_stddev_pop_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contest_team" */
export type Contest_Team_Stddev_Pop_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contest_Team_Stddev_Samp_Fields = {
  __typename?: 'contest_team_stddev_samp_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contest_team" */
export type Contest_Team_Stddev_Samp_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Contest_Team_Sum_Fields = {
  __typename?: 'contest_team_sum_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Int']['output']>;
  submitted_code_num?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "contest_team" */
export type Contest_Team_Sum_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** update columns of table "contest_team" */
export enum Contest_Team_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  ContestScore = 'contest_score',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  InvitedCode = 'invited_code',
  /** column name */
  MemberNum = 'member_num',
  /** column name */
  Score = 'score',
  /** column name */
  Status = 'status',
  /** column name */
  Status2 = 'status2',
  /** column name */
  SubmittedCodeNum = 'submitted_code_num',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  TeamIntro = 'team_intro',
  /** column name */
  TeamLeader = 'team_leader',
  /** column name */
  TeamLeaderUuid = 'team_leader_uuid',
  /** column name */
  TeamName = 'team_name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Contest_Team_Var_Pop_Fields = {
  __typename?: 'contest_team_var_pop_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contest_team" */
export type Contest_Team_Var_Pop_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contest_Team_Var_Samp_Fields = {
  __typename?: 'contest_team_var_samp_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contest_team" */
export type Contest_Team_Var_Samp_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contest_Team_Variance_Fields = {
  __typename?: 'contest_team_variance_fields';
  /** 已有人员数量 */
  member_num?: Maybe<Scalars['Float']['output']>;
  submitted_code_num?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contest_team" */
export type Contest_Team_Variance_Order_By = {
  /** 已有人员数量 */
  member_num?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
};

/** update columns of table "contest" */
export enum Contest_Update_Column {
  /** column name */
  ContestName = 'contest_name',
  /** column name */
  ContestType = 'contest_type',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status'
}

/** columns and relationships of "honor_application" */
export type Honor_Application = {
  __typename?: 'honor_application';
  attachment_url?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  honor: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  statement: Scalars['String']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  student: User;
  student_id: Scalars['String']['output'];
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
};

/** aggregated selection of "honor_application" */
export type Honor_Application_Aggregate = {
  __typename?: 'honor_application_aggregate';
  aggregate?: Maybe<Honor_Application_Aggregate_Fields>;
  nodes: Array<Honor_Application>;
};

/** aggregate fields of "honor_application" */
export type Honor_Application_Aggregate_Fields = {
  __typename?: 'honor_application_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Honor_Application_Max_Fields>;
  min?: Maybe<Honor_Application_Min_Fields>;
};


/** aggregate fields of "honor_application" */
export type Honor_Application_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Honor_Application_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "honor_application". All fields are combined with a logical 'AND'. */
export type Honor_Application_Bool_Exp = {
  _and?: InputMaybe<Array<Honor_Application_Bool_Exp>>;
  _not?: InputMaybe<Honor_Application_Bool_Exp>;
  _or?: InputMaybe<Array<Honor_Application_Bool_Exp>>;
  attachment_url?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  honor?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  statement?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<User_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "honor_application" */
export enum Honor_Application_Constraint {
  /** unique or primary key constraint on columns "id" */
  HonorApplicationPkey1 = 'honor_application_pkey1'
}

/** input type for inserting data into table "honor_application" */
export type Honor_Application_Insert_Input = {
  attachment_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  honor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<User_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Honor_Application_Max_Fields = {
  __typename?: 'honor_application_max_fields';
  attachment_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  honor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  statement?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Honor_Application_Min_Fields = {
  __typename?: 'honor_application_min_fields';
  attachment_url?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  honor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  statement?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "honor_application" */
export type Honor_Application_Mutation_Response = {
  __typename?: 'honor_application_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Honor_Application>;
};

/** on_conflict condition type for table "honor_application" */
export type Honor_Application_On_Conflict = {
  constraint: Honor_Application_Constraint;
  update_columns?: Array<Honor_Application_Update_Column>;
  where?: InputMaybe<Honor_Application_Bool_Exp>;
};

/** Ordering options when selecting data from "honor_application". */
export type Honor_Application_Order_By = {
  attachment_url?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  honor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  statement?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student?: InputMaybe<User_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: honor_application */
export type Honor_Application_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "honor_application" */
export enum Honor_Application_Select_Column {
  /** column name */
  AttachmentUrl = 'attachment_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Honor = 'honor',
  /** column name */
  Id = 'id',
  /** column name */
  Statement = 'statement',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "honor_application" */
export type Honor_Application_Set_Input = {
  attachment_url?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  honor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "honor_application" */
export enum Honor_Application_Update_Column {
  /** column name */
  AttachmentUrl = 'attachment_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Honor = 'honor',
  /** column name */
  Id = 'id',
  /** column name */
  Statement = 'statement',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** 荣誉申请时间表 */
export type Honor_Time = {
  __typename?: 'honor_time';
  activateIn: Scalars['Int']['output'];
  end_A: Scalars['timestamptz']['output'];
  end_B: Scalars['timestamptz']['output'];
  start_A: Scalars['timestamptz']['output'];
  start_B: Scalars['timestamptz']['output'];
};

/** aggregated selection of "honor_time" */
export type Honor_Time_Aggregate = {
  __typename?: 'honor_time_aggregate';
  aggregate?: Maybe<Honor_Time_Aggregate_Fields>;
  nodes: Array<Honor_Time>;
};

/** aggregate fields of "honor_time" */
export type Honor_Time_Aggregate_Fields = {
  __typename?: 'honor_time_aggregate_fields';
  avg?: Maybe<Honor_Time_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Honor_Time_Max_Fields>;
  min?: Maybe<Honor_Time_Min_Fields>;
  stddev?: Maybe<Honor_Time_Stddev_Fields>;
  stddev_pop?: Maybe<Honor_Time_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Honor_Time_Stddev_Samp_Fields>;
  sum?: Maybe<Honor_Time_Sum_Fields>;
  var_pop?: Maybe<Honor_Time_Var_Pop_Fields>;
  var_samp?: Maybe<Honor_Time_Var_Samp_Fields>;
  variance?: Maybe<Honor_Time_Variance_Fields>;
};


/** aggregate fields of "honor_time" */
export type Honor_Time_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Honor_Time_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Honor_Time_Avg_Fields = {
  __typename?: 'honor_time_avg_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "honor_time". All fields are combined with a logical 'AND'. */
export type Honor_Time_Bool_Exp = {
  _and?: InputMaybe<Array<Honor_Time_Bool_Exp>>;
  _not?: InputMaybe<Honor_Time_Bool_Exp>;
  _or?: InputMaybe<Array<Honor_Time_Bool_Exp>>;
  activateIn?: InputMaybe<Int_Comparison_Exp>;
  end_A?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_B?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_A?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_B?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "honor_time" */
export enum Honor_Time_Constraint {
  /** unique or primary key constraint on columns "activateIn" */
  HonorTimeActivateInKey = 'honor_time_activateIn_key',
  /** unique or primary key constraint on columns "activateIn" */
  HonorTimePkey = 'honor_time_pkey'
}

/** input type for incrementing numeric columns in table "honor_time" */
export type Honor_Time_Inc_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "honor_time" */
export type Honor_Time_Insert_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
  end_A?: InputMaybe<Scalars['timestamptz']['input']>;
  end_B?: InputMaybe<Scalars['timestamptz']['input']>;
  start_A?: InputMaybe<Scalars['timestamptz']['input']>;
  start_B?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Honor_Time_Max_Fields = {
  __typename?: 'honor_time_max_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
  end_A?: Maybe<Scalars['timestamptz']['output']>;
  end_B?: Maybe<Scalars['timestamptz']['output']>;
  start_A?: Maybe<Scalars['timestamptz']['output']>;
  start_B?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Honor_Time_Min_Fields = {
  __typename?: 'honor_time_min_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
  end_A?: Maybe<Scalars['timestamptz']['output']>;
  end_B?: Maybe<Scalars['timestamptz']['output']>;
  start_A?: Maybe<Scalars['timestamptz']['output']>;
  start_B?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "honor_time" */
export type Honor_Time_Mutation_Response = {
  __typename?: 'honor_time_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Honor_Time>;
};

/** on_conflict condition type for table "honor_time" */
export type Honor_Time_On_Conflict = {
  constraint: Honor_Time_Constraint;
  update_columns?: Array<Honor_Time_Update_Column>;
  where?: InputMaybe<Honor_Time_Bool_Exp>;
};

/** Ordering options when selecting data from "honor_time". */
export type Honor_Time_Order_By = {
  activateIn?: InputMaybe<Order_By>;
  end_A?: InputMaybe<Order_By>;
  end_B?: InputMaybe<Order_By>;
  start_A?: InputMaybe<Order_By>;
  start_B?: InputMaybe<Order_By>;
};

/** primary key columns input for table: honor_time */
export type Honor_Time_Pk_Columns_Input = {
  activateIn: Scalars['Int']['input'];
};

/** select columns of table "honor_time" */
export enum Honor_Time_Select_Column {
  /** column name */
  ActivateIn = 'activateIn',
  /** column name */
  EndA = 'end_A',
  /** column name */
  EndB = 'end_B',
  /** column name */
  StartA = 'start_A',
  /** column name */
  StartB = 'start_B'
}

/** input type for updating data in table "honor_time" */
export type Honor_Time_Set_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
  end_A?: InputMaybe<Scalars['timestamptz']['input']>;
  end_B?: InputMaybe<Scalars['timestamptz']['input']>;
  start_A?: InputMaybe<Scalars['timestamptz']['input']>;
  start_B?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Honor_Time_Stddev_Fields = {
  __typename?: 'honor_time_stddev_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Honor_Time_Stddev_Pop_Fields = {
  __typename?: 'honor_time_stddev_pop_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Honor_Time_Stddev_Samp_Fields = {
  __typename?: 'honor_time_stddev_samp_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Honor_Time_Sum_Fields = {
  __typename?: 'honor_time_sum_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "honor_time" */
export enum Honor_Time_Update_Column {
  /** column name */
  ActivateIn = 'activateIn',
  /** column name */
  EndA = 'end_A',
  /** column name */
  EndB = 'end_B',
  /** column name */
  StartA = 'start_A',
  /** column name */
  StartB = 'start_B'
}

/** aggregate var_pop on columns */
export type Honor_Time_Var_Pop_Fields = {
  __typename?: 'honor_time_var_pop_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Honor_Time_Var_Samp_Fields = {
  __typename?: 'honor_time_var_samp_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Honor_Time_Variance_Fields = {
  __typename?: 'honor_time_variance_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** 荣誉类别 */
export type Honor_Type = {
  __typename?: 'honor_type';
  type_name: Scalars['String']['output'];
};

/** aggregated selection of "honor_type" */
export type Honor_Type_Aggregate = {
  __typename?: 'honor_type_aggregate';
  aggregate?: Maybe<Honor_Type_Aggregate_Fields>;
  nodes: Array<Honor_Type>;
};

/** aggregate fields of "honor_type" */
export type Honor_Type_Aggregate_Fields = {
  __typename?: 'honor_type_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Honor_Type_Max_Fields>;
  min?: Maybe<Honor_Type_Min_Fields>;
};


/** aggregate fields of "honor_type" */
export type Honor_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Honor_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "honor_type". All fields are combined with a logical 'AND'. */
export type Honor_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Honor_Type_Bool_Exp>>;
  _not?: InputMaybe<Honor_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Honor_Type_Bool_Exp>>;
  type_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "honor_type" */
export enum Honor_Type_Constraint {
  /** unique or primary key constraint on columns "type_name" */
  HonorTypePkey = 'honor_type_pkey'
}

/** input type for inserting data into table "honor_type" */
export type Honor_Type_Insert_Input = {
  type_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Honor_Type_Max_Fields = {
  __typename?: 'honor_type_max_fields';
  type_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Honor_Type_Min_Fields = {
  __typename?: 'honor_type_min_fields';
  type_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "honor_type" */
export type Honor_Type_Mutation_Response = {
  __typename?: 'honor_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Honor_Type>;
};

/** on_conflict condition type for table "honor_type" */
export type Honor_Type_On_Conflict = {
  constraint: Honor_Type_Constraint;
  update_columns?: Array<Honor_Type_Update_Column>;
  where?: InputMaybe<Honor_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "honor_type". */
export type Honor_Type_Order_By = {
  type_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: honor_type */
export type Honor_Type_Pk_Columns_Input = {
  type_name: Scalars['String']['input'];
};

/** select columns of table "honor_type" */
export enum Honor_Type_Select_Column {
  /** column name */
  TypeName = 'type_name'
}

/** input type for updating data in table "honor_type" */
export type Honor_Type_Set_Input = {
  type_name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "honor_type" */
export enum Honor_Type_Update_Column {
  /** column name */
  TypeName = 'type_name'
}

/** columns and relationships of "info_notice" */
export type Info_Notice = {
  __typename?: 'info_notice';
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  files?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  notice_type: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "info_notice" */
export type Info_Notice_Aggregate = {
  __typename?: 'info_notice_aggregate';
  aggregate?: Maybe<Info_Notice_Aggregate_Fields>;
  nodes: Array<Info_Notice>;
};

/** aggregate fields of "info_notice" */
export type Info_Notice_Aggregate_Fields = {
  __typename?: 'info_notice_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Info_Notice_Max_Fields>;
  min?: Maybe<Info_Notice_Min_Fields>;
};


/** aggregate fields of "info_notice" */
export type Info_Notice_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Info_Notice_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "info_notice". All fields are combined with a logical 'AND'. */
export type Info_Notice_Bool_Exp = {
  _and?: InputMaybe<Array<Info_Notice_Bool_Exp>>;
  _not?: InputMaybe<Info_Notice_Bool_Exp>;
  _or?: InputMaybe<Array<Info_Notice_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  files?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notice_type?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "info_notice" */
export enum Info_Notice_Constraint {
  /** unique or primary key constraint on columns "id" */
  NoticePkey = 'notice_pkey'
}

/** input type for inserting data into table "info_notice" */
export type Info_Notice_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notice_type?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Info_Notice_Max_Fields = {
  __typename?: 'info_notice_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notice_type?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Info_Notice_Min_Fields = {
  __typename?: 'info_notice_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notice_type?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "info_notice" */
export type Info_Notice_Mutation_Response = {
  __typename?: 'info_notice_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Info_Notice>;
};

/** on_conflict condition type for table "info_notice" */
export type Info_Notice_On_Conflict = {
  constraint: Info_Notice_Constraint;
  update_columns?: Array<Info_Notice_Update_Column>;
  where?: InputMaybe<Info_Notice_Bool_Exp>;
};

/** Ordering options when selecting data from "info_notice". */
export type Info_Notice_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  files?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notice_type?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: info_notice */
export type Info_Notice_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "info_notice" */
export enum Info_Notice_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Files = 'files',
  /** column name */
  Id = 'id',
  /** column name */
  NoticeType = 'notice_type',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "info_notice" */
export type Info_Notice_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notice_type?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "info_notice" */
export enum Info_Notice_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Files = 'files',
  /** column name */
  Id = 'id',
  /** column name */
  NoticeType = 'notice_type',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

/** columns and relationships of "mentor_application" */
export type Mentor_Application = {
  __typename?: 'mentor_application';
  chat_status: Scalars['Boolean']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  mentor?: Maybe<User>;
  /** An object relationship */
  mentor_byuuid?: Maybe<Users>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  statement: Scalars['String']['output'];
  /** approved | submitted */
  status: Scalars['String']['output'];
  /** An object relationship */
  student?: Maybe<User>;
  /** An object relationship */
  student_byuuid?: Maybe<Users>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "mentor_application" */
export type Mentor_Application_Aggregate = {
  __typename?: 'mentor_application_aggregate';
  aggregate?: Maybe<Mentor_Application_Aggregate_Fields>;
  nodes: Array<Mentor_Application>;
};

/** aggregate fields of "mentor_application" */
export type Mentor_Application_Aggregate_Fields = {
  __typename?: 'mentor_application_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Mentor_Application_Max_Fields>;
  min?: Maybe<Mentor_Application_Min_Fields>;
};


/** aggregate fields of "mentor_application" */
export type Mentor_Application_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "mentor_application" */
export type Mentor_Application_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Mentor_Application_Max_Order_By>;
  min?: InputMaybe<Mentor_Application_Min_Order_By>;
};

/** input type for inserting array relation for remote table "mentor_application" */
export type Mentor_Application_Arr_Rel_Insert_Input = {
  data: Array<Mentor_Application_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Mentor_Application_On_Conflict>;
};

/** Boolean expression to filter rows from the table "mentor_application". All fields are combined with a logical 'AND'. */
export type Mentor_Application_Bool_Exp = {
  _and?: InputMaybe<Array<Mentor_Application_Bool_Exp>>;
  _not?: InputMaybe<Mentor_Application_Bool_Exp>;
  _or?: InputMaybe<Array<Mentor_Application_Bool_Exp>>;
  chat_status?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  mentor?: InputMaybe<User_Bool_Exp>;
  mentor_byuuid?: InputMaybe<Users_Bool_Exp>;
  mentor_id?: InputMaybe<String_Comparison_Exp>;
  mentor_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  statement?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<User_Bool_Exp>;
  student_byuuid?: InputMaybe<Users_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "mentor_application" */
export enum Mentor_Application_Constraint {
  /** unique or primary key constraint on columns "id" */
  MentorApplicationPkey1 = 'mentor_application_pkey1'
}

/** input type for inserting data into table "mentor_application" */
export type Mentor_Application_Insert_Input = {
  chat_status?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mentor?: InputMaybe<User_Obj_Rel_Insert_Input>;
  mentor_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  /** approved | submitted */
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<User_Obj_Rel_Insert_Input>;
  student_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Mentor_Application_Max_Fields = {
  __typename?: 'mentor_application_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  statement?: Maybe<Scalars['String']['output']>;
  /** approved | submitted */
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "mentor_application" */
export type Mentor_Application_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  statement?: InputMaybe<Order_By>;
  /** approved | submitted */
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Mentor_Application_Min_Fields = {
  __typename?: 'mentor_application_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  statement?: Maybe<Scalars['String']['output']>;
  /** approved | submitted */
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "mentor_application" */
export type Mentor_Application_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  statement?: InputMaybe<Order_By>;
  /** approved | submitted */
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "mentor_application" */
export type Mentor_Application_Mutation_Response = {
  __typename?: 'mentor_application_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Mentor_Application>;
};

/** on_conflict condition type for table "mentor_application" */
export type Mentor_Application_On_Conflict = {
  constraint: Mentor_Application_Constraint;
  update_columns?: Array<Mentor_Application_Update_Column>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};

/** Ordering options when selecting data from "mentor_application". */
export type Mentor_Application_Order_By = {
  chat_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor?: InputMaybe<User_Order_By>;
  mentor_byuuid?: InputMaybe<Users_Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  statement?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student?: InputMaybe<User_Order_By>;
  student_byuuid?: InputMaybe<Users_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: mentor_application */
export type Mentor_Application_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "mentor_application" */
export enum Mentor_Application_Select_Column {
  /** column name */
  ChatStatus = 'chat_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  Statement = 'statement',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "mentor_application" */
export type Mentor_Application_Set_Input = {
  chat_status?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  /** approved | submitted */
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "mentor_application" */
export enum Mentor_Application_Update_Column {
  /** column name */
  ChatStatus = 'chat_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  Statement = 'statement',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "mentor_available" */
export type Mentor_Available = {
  __typename?: 'mentor_available';
  available: Scalars['Boolean']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  mentor_byuuid: Users;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "mentor_available" */
export type Mentor_Available_Aggregate = {
  __typename?: 'mentor_available_aggregate';
  aggregate?: Maybe<Mentor_Available_Aggregate_Fields>;
  nodes: Array<Mentor_Available>;
};

/** aggregate fields of "mentor_available" */
export type Mentor_Available_Aggregate_Fields = {
  __typename?: 'mentor_available_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Mentor_Available_Max_Fields>;
  min?: Maybe<Mentor_Available_Min_Fields>;
};


/** aggregate fields of "mentor_available" */
export type Mentor_Available_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mentor_Available_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "mentor_available". All fields are combined with a logical 'AND'. */
export type Mentor_Available_Bool_Exp = {
  _and?: InputMaybe<Array<Mentor_Available_Bool_Exp>>;
  _not?: InputMaybe<Mentor_Available_Bool_Exp>;
  _or?: InputMaybe<Array<Mentor_Available_Bool_Exp>>;
  available?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  mentor_byuuid?: InputMaybe<Users_Bool_Exp>;
  mentor_id?: InputMaybe<String_Comparison_Exp>;
  mentor_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "mentor_available" */
export enum Mentor_Available_Constraint {
  /** unique or primary key constraint on columns "mentor_uuid" */
  MentorAvailableMentorUuidKey = 'mentor_available_mentor_uuid_key',
  /** unique or primary key constraint on columns "mentor_uuid" */
  MentorAvailablePkey = 'mentor_available_pkey'
}

/** input type for inserting data into table "mentor_available" */
export type Mentor_Available_Insert_Input = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  mentor_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Mentor_Available_Max_Fields = {
  __typename?: 'mentor_available_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Mentor_Available_Min_Fields = {
  __typename?: 'mentor_available_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "mentor_available" */
export type Mentor_Available_Mutation_Response = {
  __typename?: 'mentor_available_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Mentor_Available>;
};

/** input type for inserting object relation for remote table "mentor_available" */
export type Mentor_Available_Obj_Rel_Insert_Input = {
  data: Mentor_Available_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Mentor_Available_On_Conflict>;
};

/** on_conflict condition type for table "mentor_available" */
export type Mentor_Available_On_Conflict = {
  constraint: Mentor_Available_Constraint;
  update_columns?: Array<Mentor_Available_Update_Column>;
  where?: InputMaybe<Mentor_Available_Bool_Exp>;
};

/** Ordering options when selecting data from "mentor_available". */
export type Mentor_Available_Order_By = {
  available?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  mentor_byuuid?: InputMaybe<Users_Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: mentor_available */
export type Mentor_Available_Pk_Columns_Input = {
  mentor_uuid: Scalars['uuid']['input'];
};

/** select columns of table "mentor_available" */
export enum Mentor_Available_Select_Column {
  /** column name */
  Available = 'available',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "mentor_available" */
export type Mentor_Available_Set_Input = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "mentor_available" */
export enum Mentor_Available_Update_Column {
  /** column name */
  Available = 'available',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** 新生导师信息 */
export type Mentor_Info = {
  __typename?: 'mentor_info';
  /** 学术成果 */
  achievement?: Maybe<Scalars['String']['output']>;
  /** 教育背景 */
  background?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** 研究领域 */
  field?: Maybe<Scalars['String']['output']>;
  /** 简要信息：联系方式、职位等 */
  intro?: Maybe<Scalars['String']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  userByMentorUuid: Users;
};

/** aggregated selection of "mentor_info" */
export type Mentor_Info_Aggregate = {
  __typename?: 'mentor_info_aggregate';
  aggregate?: Maybe<Mentor_Info_Aggregate_Fields>;
  nodes: Array<Mentor_Info>;
};

/** aggregate fields of "mentor_info" */
export type Mentor_Info_Aggregate_Fields = {
  __typename?: 'mentor_info_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Mentor_Info_Max_Fields>;
  min?: Maybe<Mentor_Info_Min_Fields>;
};


/** aggregate fields of "mentor_info" */
export type Mentor_Info_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "mentor_info" */
export type Mentor_Info_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Mentor_Info_Max_Order_By>;
  min?: InputMaybe<Mentor_Info_Min_Order_By>;
};

/** input type for inserting array relation for remote table "mentor_info" */
export type Mentor_Info_Arr_Rel_Insert_Input = {
  data: Array<Mentor_Info_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Mentor_Info_On_Conflict>;
};

/** Boolean expression to filter rows from the table "mentor_info". All fields are combined with a logical 'AND'. */
export type Mentor_Info_Bool_Exp = {
  _and?: InputMaybe<Array<Mentor_Info_Bool_Exp>>;
  _not?: InputMaybe<Mentor_Info_Bool_Exp>;
  _or?: InputMaybe<Array<Mentor_Info_Bool_Exp>>;
  achievement?: InputMaybe<String_Comparison_Exp>;
  background?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  field?: InputMaybe<String_Comparison_Exp>;
  intro?: InputMaybe<String_Comparison_Exp>;
  mentor_id?: InputMaybe<String_Comparison_Exp>;
  mentor_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userByMentorUuid?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "mentor_info" */
export enum Mentor_Info_Constraint {
  /** unique or primary key constraint on columns "mentor_uuid" */
  MentorInfoPkey = 'mentor_info_pkey'
}

/** input type for inserting data into table "mentor_info" */
export type Mentor_Info_Insert_Input = {
  /** 学术成果 */
  achievement?: InputMaybe<Scalars['String']['input']>;
  /** 教育背景 */
  background?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 研究领域 */
  field?: InputMaybe<Scalars['String']['input']>;
  /** 简要信息：联系方式、职位等 */
  intro?: InputMaybe<Scalars['String']['input']>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userByMentorUuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Mentor_Info_Max_Fields = {
  __typename?: 'mentor_info_max_fields';
  /** 学术成果 */
  achievement?: Maybe<Scalars['String']['output']>;
  /** 教育背景 */
  background?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 研究领域 */
  field?: Maybe<Scalars['String']['output']>;
  /** 简要信息：联系方式、职位等 */
  intro?: Maybe<Scalars['String']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "mentor_info" */
export type Mentor_Info_Max_Order_By = {
  /** 学术成果 */
  achievement?: InputMaybe<Order_By>;
  /** 教育背景 */
  background?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 研究领域 */
  field?: InputMaybe<Order_By>;
  /** 简要信息：联系方式、职位等 */
  intro?: InputMaybe<Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Mentor_Info_Min_Fields = {
  __typename?: 'mentor_info_min_fields';
  /** 学术成果 */
  achievement?: Maybe<Scalars['String']['output']>;
  /** 教育背景 */
  background?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 研究领域 */
  field?: Maybe<Scalars['String']['output']>;
  /** 简要信息：联系方式、职位等 */
  intro?: Maybe<Scalars['String']['output']>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "mentor_info" */
export type Mentor_Info_Min_Order_By = {
  /** 学术成果 */
  achievement?: InputMaybe<Order_By>;
  /** 教育背景 */
  background?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  /** 研究领域 */
  field?: InputMaybe<Order_By>;
  /** 简要信息：联系方式、职位等 */
  intro?: InputMaybe<Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "mentor_info" */
export type Mentor_Info_Mutation_Response = {
  __typename?: 'mentor_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Mentor_Info>;
};

/** on_conflict condition type for table "mentor_info" */
export type Mentor_Info_On_Conflict = {
  constraint: Mentor_Info_Constraint;
  update_columns?: Array<Mentor_Info_Update_Column>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "mentor_info". */
export type Mentor_Info_Order_By = {
  achievement?: InputMaybe<Order_By>;
  background?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  field?: InputMaybe<Order_By>;
  intro?: InputMaybe<Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userByMentorUuid?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: mentor_info */
export type Mentor_Info_Pk_Columns_Input = {
  mentor_uuid: Scalars['uuid']['input'];
};

/** select columns of table "mentor_info" */
export enum Mentor_Info_Select_Column {
  /** column name */
  Achievement = 'achievement',
  /** column name */
  Background = 'background',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Field = 'field',
  /** column name */
  Intro = 'intro',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "mentor_info" */
export type Mentor_Info_Set_Input = {
  /** 学术成果 */
  achievement?: InputMaybe<Scalars['String']['input']>;
  /** 教育背景 */
  background?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 研究领域 */
  field?: InputMaybe<Scalars['String']['input']>;
  /** 简要信息：联系方式、职位等 */
  intro?: InputMaybe<Scalars['String']['input']>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "mentor_info" */
export enum Mentor_Info_Update_Column {
  /** column name */
  Achievement = 'achievement',
  /** column name */
  Background = 'background',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Field = 'field',
  /** column name */
  Intro = 'intro',
  /** column name */
  MentorId = 'mentor_id',
  /** column name */
  MentorUuid = 'mentor_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "mentor_message" */
export type Mentor_Message = {
  __typename?: 'mentor_message';
  created_at: Scalars['timestamptz']['output'];
  from_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  from_user?: Maybe<User>;
  /** An object relationship */
  from_userbyuuid?: Maybe<Users>;
  from_uuid?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  payload: Scalars['String']['output'];
  to_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  to_user?: Maybe<User>;
  /** An object relationship */
  to_userbyuuid?: Maybe<Users>;
  to_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "mentor_message" */
export type Mentor_Message_Aggregate = {
  __typename?: 'mentor_message_aggregate';
  aggregate?: Maybe<Mentor_Message_Aggregate_Fields>;
  nodes: Array<Mentor_Message>;
};

/** aggregate fields of "mentor_message" */
export type Mentor_Message_Aggregate_Fields = {
  __typename?: 'mentor_message_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Mentor_Message_Max_Fields>;
  min?: Maybe<Mentor_Message_Min_Fields>;
};


/** aggregate fields of "mentor_message" */
export type Mentor_Message_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mentor_Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "mentor_message". All fields are combined with a logical 'AND'. */
export type Mentor_Message_Bool_Exp = {
  _and?: InputMaybe<Array<Mentor_Message_Bool_Exp>>;
  _not?: InputMaybe<Mentor_Message_Bool_Exp>;
  _or?: InputMaybe<Array<Mentor_Message_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  from_id?: InputMaybe<String_Comparison_Exp>;
  from_user?: InputMaybe<User_Bool_Exp>;
  from_userbyuuid?: InputMaybe<Users_Bool_Exp>;
  from_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<String_Comparison_Exp>;
  to_id?: InputMaybe<String_Comparison_Exp>;
  to_user?: InputMaybe<User_Bool_Exp>;
  to_userbyuuid?: InputMaybe<Users_Bool_Exp>;
  to_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "mentor_message" */
export enum Mentor_Message_Constraint {
  /** unique or primary key constraint on columns "id" */
  MentorMessagePkey1 = 'mentor_message_pkey1'
}

/** input type for inserting data into table "mentor_message" */
export type Mentor_Message_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  from_id?: InputMaybe<Scalars['String']['input']>;
  from_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  from_userbyuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  from_uuid?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  payload?: InputMaybe<Scalars['String']['input']>;
  to_id?: InputMaybe<Scalars['String']['input']>;
  to_user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  to_userbyuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  to_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Mentor_Message_Max_Fields = {
  __typename?: 'mentor_message_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  from_uuid?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  payload?: Maybe<Scalars['String']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  to_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Mentor_Message_Min_Fields = {
  __typename?: 'mentor_message_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  from_id?: Maybe<Scalars['String']['output']>;
  from_uuid?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  payload?: Maybe<Scalars['String']['output']>;
  to_id?: Maybe<Scalars['String']['output']>;
  to_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "mentor_message" */
export type Mentor_Message_Mutation_Response = {
  __typename?: 'mentor_message_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Mentor_Message>;
};

/** on_conflict condition type for table "mentor_message" */
export type Mentor_Message_On_Conflict = {
  constraint: Mentor_Message_Constraint;
  update_columns?: Array<Mentor_Message_Update_Column>;
  where?: InputMaybe<Mentor_Message_Bool_Exp>;
};

/** Ordering options when selecting data from "mentor_message". */
export type Mentor_Message_Order_By = {
  created_at?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  from_user?: InputMaybe<User_Order_By>;
  from_userbyuuid?: InputMaybe<Users_Order_By>;
  from_uuid?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  to_user?: InputMaybe<User_Order_By>;
  to_userbyuuid?: InputMaybe<Users_Order_By>;
  to_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: mentor_message */
export type Mentor_Message_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "mentor_message" */
export enum Mentor_Message_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromId = 'from_id',
  /** column name */
  FromUuid = 'from_uuid',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload',
  /** column name */
  ToId = 'to_id',
  /** column name */
  ToUuid = 'to_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "mentor_message" */
export type Mentor_Message_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  from_id?: InputMaybe<Scalars['String']['input']>;
  from_uuid?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  payload?: InputMaybe<Scalars['String']['input']>;
  to_id?: InputMaybe<Scalars['String']['input']>;
  to_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "mentor_message" */
export enum Mentor_Message_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromId = 'from_id',
  /** column name */
  FromUuid = 'from_uuid',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload',
  /** column name */
  ToId = 'to_id',
  /** column name */
  ToUuid = 'to_uuid',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** 导师申请时间表 */
export type Mentor_Time = {
  __typename?: 'mentor_time';
  activateIn: Scalars['Int']['output'];
  end_A: Scalars['timestamptz']['output'];
  end_B: Scalars['timestamptz']['output'];
  end_C: Scalars['timestamptz']['output'];
  end_D: Scalars['timestamptz']['output'];
  end_E: Scalars['timestamptz']['output'];
  start_A: Scalars['timestamptz']['output'];
  start_B: Scalars['timestamptz']['output'];
  start_C: Scalars['timestamptz']['output'];
  start_D: Scalars['timestamptz']['output'];
  start_E: Scalars['timestamptz']['output'];
};

/** aggregated selection of "mentor_time" */
export type Mentor_Time_Aggregate = {
  __typename?: 'mentor_time_aggregate';
  aggregate?: Maybe<Mentor_Time_Aggregate_Fields>;
  nodes: Array<Mentor_Time>;
};

/** aggregate fields of "mentor_time" */
export type Mentor_Time_Aggregate_Fields = {
  __typename?: 'mentor_time_aggregate_fields';
  avg?: Maybe<Mentor_Time_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Mentor_Time_Max_Fields>;
  min?: Maybe<Mentor_Time_Min_Fields>;
  stddev?: Maybe<Mentor_Time_Stddev_Fields>;
  stddev_pop?: Maybe<Mentor_Time_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Mentor_Time_Stddev_Samp_Fields>;
  sum?: Maybe<Mentor_Time_Sum_Fields>;
  var_pop?: Maybe<Mentor_Time_Var_Pop_Fields>;
  var_samp?: Maybe<Mentor_Time_Var_Samp_Fields>;
  variance?: Maybe<Mentor_Time_Variance_Fields>;
};


/** aggregate fields of "mentor_time" */
export type Mentor_Time_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mentor_Time_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Mentor_Time_Avg_Fields = {
  __typename?: 'mentor_time_avg_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "mentor_time". All fields are combined with a logical 'AND'. */
export type Mentor_Time_Bool_Exp = {
  _and?: InputMaybe<Array<Mentor_Time_Bool_Exp>>;
  _not?: InputMaybe<Mentor_Time_Bool_Exp>;
  _or?: InputMaybe<Array<Mentor_Time_Bool_Exp>>;
  activateIn?: InputMaybe<Int_Comparison_Exp>;
  end_A?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_B?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_C?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_D?: InputMaybe<Timestamptz_Comparison_Exp>;
  end_E?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_A?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_B?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_C?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_D?: InputMaybe<Timestamptz_Comparison_Exp>;
  start_E?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "mentor_time" */
export enum Mentor_Time_Constraint {
  /** unique or primary key constraint on columns "activateIn" */
  MentorTimePkey = 'mentor_time_pkey'
}

/** input type for incrementing numeric columns in table "mentor_time" */
export type Mentor_Time_Inc_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "mentor_time" */
export type Mentor_Time_Insert_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
  end_A?: InputMaybe<Scalars['timestamptz']['input']>;
  end_B?: InputMaybe<Scalars['timestamptz']['input']>;
  end_C?: InputMaybe<Scalars['timestamptz']['input']>;
  end_D?: InputMaybe<Scalars['timestamptz']['input']>;
  end_E?: InputMaybe<Scalars['timestamptz']['input']>;
  start_A?: InputMaybe<Scalars['timestamptz']['input']>;
  start_B?: InputMaybe<Scalars['timestamptz']['input']>;
  start_C?: InputMaybe<Scalars['timestamptz']['input']>;
  start_D?: InputMaybe<Scalars['timestamptz']['input']>;
  start_E?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Mentor_Time_Max_Fields = {
  __typename?: 'mentor_time_max_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
  end_A?: Maybe<Scalars['timestamptz']['output']>;
  end_B?: Maybe<Scalars['timestamptz']['output']>;
  end_C?: Maybe<Scalars['timestamptz']['output']>;
  end_D?: Maybe<Scalars['timestamptz']['output']>;
  end_E?: Maybe<Scalars['timestamptz']['output']>;
  start_A?: Maybe<Scalars['timestamptz']['output']>;
  start_B?: Maybe<Scalars['timestamptz']['output']>;
  start_C?: Maybe<Scalars['timestamptz']['output']>;
  start_D?: Maybe<Scalars['timestamptz']['output']>;
  start_E?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Mentor_Time_Min_Fields = {
  __typename?: 'mentor_time_min_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
  end_A?: Maybe<Scalars['timestamptz']['output']>;
  end_B?: Maybe<Scalars['timestamptz']['output']>;
  end_C?: Maybe<Scalars['timestamptz']['output']>;
  end_D?: Maybe<Scalars['timestamptz']['output']>;
  end_E?: Maybe<Scalars['timestamptz']['output']>;
  start_A?: Maybe<Scalars['timestamptz']['output']>;
  start_B?: Maybe<Scalars['timestamptz']['output']>;
  start_C?: Maybe<Scalars['timestamptz']['output']>;
  start_D?: Maybe<Scalars['timestamptz']['output']>;
  start_E?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "mentor_time" */
export type Mentor_Time_Mutation_Response = {
  __typename?: 'mentor_time_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Mentor_Time>;
};

/** on_conflict condition type for table "mentor_time" */
export type Mentor_Time_On_Conflict = {
  constraint: Mentor_Time_Constraint;
  update_columns?: Array<Mentor_Time_Update_Column>;
  where?: InputMaybe<Mentor_Time_Bool_Exp>;
};

/** Ordering options when selecting data from "mentor_time". */
export type Mentor_Time_Order_By = {
  activateIn?: InputMaybe<Order_By>;
  end_A?: InputMaybe<Order_By>;
  end_B?: InputMaybe<Order_By>;
  end_C?: InputMaybe<Order_By>;
  end_D?: InputMaybe<Order_By>;
  end_E?: InputMaybe<Order_By>;
  start_A?: InputMaybe<Order_By>;
  start_B?: InputMaybe<Order_By>;
  start_C?: InputMaybe<Order_By>;
  start_D?: InputMaybe<Order_By>;
  start_E?: InputMaybe<Order_By>;
};

/** primary key columns input for table: mentor_time */
export type Mentor_Time_Pk_Columns_Input = {
  activateIn: Scalars['Int']['input'];
};

/** select columns of table "mentor_time" */
export enum Mentor_Time_Select_Column {
  /** column name */
  ActivateIn = 'activateIn',
  /** column name */
  EndA = 'end_A',
  /** column name */
  EndB = 'end_B',
  /** column name */
  EndC = 'end_C',
  /** column name */
  EndD = 'end_D',
  /** column name */
  EndE = 'end_E',
  /** column name */
  StartA = 'start_A',
  /** column name */
  StartB = 'start_B',
  /** column name */
  StartC = 'start_C',
  /** column name */
  StartD = 'start_D',
  /** column name */
  StartE = 'start_E'
}

/** input type for updating data in table "mentor_time" */
export type Mentor_Time_Set_Input = {
  activateIn?: InputMaybe<Scalars['Int']['input']>;
  end_A?: InputMaybe<Scalars['timestamptz']['input']>;
  end_B?: InputMaybe<Scalars['timestamptz']['input']>;
  end_C?: InputMaybe<Scalars['timestamptz']['input']>;
  end_D?: InputMaybe<Scalars['timestamptz']['input']>;
  end_E?: InputMaybe<Scalars['timestamptz']['input']>;
  start_A?: InputMaybe<Scalars['timestamptz']['input']>;
  start_B?: InputMaybe<Scalars['timestamptz']['input']>;
  start_C?: InputMaybe<Scalars['timestamptz']['input']>;
  start_D?: InputMaybe<Scalars['timestamptz']['input']>;
  start_E?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Mentor_Time_Stddev_Fields = {
  __typename?: 'mentor_time_stddev_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Mentor_Time_Stddev_Pop_Fields = {
  __typename?: 'mentor_time_stddev_pop_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Mentor_Time_Stddev_Samp_Fields = {
  __typename?: 'mentor_time_stddev_samp_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Mentor_Time_Sum_Fields = {
  __typename?: 'mentor_time_sum_fields';
  activateIn?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "mentor_time" */
export enum Mentor_Time_Update_Column {
  /** column name */
  ActivateIn = 'activateIn',
  /** column name */
  EndA = 'end_A',
  /** column name */
  EndB = 'end_B',
  /** column name */
  EndC = 'end_C',
  /** column name */
  EndD = 'end_D',
  /** column name */
  EndE = 'end_E',
  /** column name */
  StartA = 'start_A',
  /** column name */
  StartB = 'start_B',
  /** column name */
  StartC = 'start_C',
  /** column name */
  StartD = 'start_D',
  /** column name */
  StartE = 'start_E'
}

/** aggregate var_pop on columns */
export type Mentor_Time_Var_Pop_Fields = {
  __typename?: 'mentor_time_var_pop_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Mentor_Time_Var_Samp_Fields = {
  __typename?: 'mentor_time_var_samp_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Mentor_Time_Variance_Fields = {
  __typename?: 'mentor_time_variance_fields';
  activateIn?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "aid_application" */
  delete_aid_application?: Maybe<Aid_Application_Mutation_Response>;
  /** delete single row from the table: "aid_application" */
  delete_aid_application_by_pk?: Maybe<Aid_Application>;
  /** delete data from the table: "contest" */
  delete_contest?: Maybe<Contest_Mutation_Response>;
  /** delete single row from the table: "contest" */
  delete_contest_by_pk?: Maybe<Contest>;
  /** delete data from the table: "contest_code" */
  delete_contest_code?: Maybe<Contest_Code_Mutation_Response>;
  /** delete single row from the table: "contest_code" */
  delete_contest_code_by_pk?: Maybe<Contest_Code>;
  /** delete data from the table: "contest_info" */
  delete_contest_info?: Maybe<Contest_Info_Mutation_Response>;
  /** delete single row from the table: "contest_info" */
  delete_contest_info_by_pk?: Maybe<Contest_Info>;
  /** delete data from the table: "contest_manager" */
  delete_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** delete single row from the table: "contest_manager" */
  delete_contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** delete data from the table: "contest_room" */
  delete_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** delete single row from the table: "contest_room" */
  delete_contest_room_by_pk?: Maybe<Contest_Room>;
  /** delete data from the table: "contest_room_team" */
  delete_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** delete single row from the table: "contest_room_team" */
  delete_contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** delete data from the table: "contest_team" */
  delete_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** delete single row from the table: "contest_team" */
  delete_contest_team_by_pk?: Maybe<Contest_Team>;
  /** delete data from the table: "contest_team_member" */
  delete_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** delete single row from the table: "contest_team_member" */
  delete_contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** delete data from the table: "honor_application" */
  delete_honor_application?: Maybe<Honor_Application_Mutation_Response>;
  /** delete single row from the table: "honor_application" */
  delete_honor_application_by_pk?: Maybe<Honor_Application>;
  /** delete data from the table: "honor_time" */
  delete_honor_time?: Maybe<Honor_Time_Mutation_Response>;
  /** delete single row from the table: "honor_time" */
  delete_honor_time_by_pk?: Maybe<Honor_Time>;
  /** delete data from the table: "honor_type" */
  delete_honor_type?: Maybe<Honor_Type_Mutation_Response>;
  /** delete single row from the table: "honor_type" */
  delete_honor_type_by_pk?: Maybe<Honor_Type>;
  /** delete data from the table: "info_notice" */
  delete_info_notice?: Maybe<Info_Notice_Mutation_Response>;
  /** delete single row from the table: "info_notice" */
  delete_info_notice_by_pk?: Maybe<Info_Notice>;
  /** delete data from the table: "mentor_application" */
  delete_mentor_application?: Maybe<Mentor_Application_Mutation_Response>;
  /** delete single row from the table: "mentor_application" */
  delete_mentor_application_by_pk?: Maybe<Mentor_Application>;
  /** delete data from the table: "mentor_available" */
  delete_mentor_available?: Maybe<Mentor_Available_Mutation_Response>;
  /** delete single row from the table: "mentor_available" */
  delete_mentor_available_by_pk?: Maybe<Mentor_Available>;
  /** delete data from the table: "mentor_info" */
  delete_mentor_info?: Maybe<Mentor_Info_Mutation_Response>;
  /** delete single row from the table: "mentor_info" */
  delete_mentor_info_by_pk?: Maybe<Mentor_Info>;
  /** delete data from the table: "mentor_message" */
  delete_mentor_message?: Maybe<Mentor_Message_Mutation_Response>;
  /** delete single row from the table: "mentor_message" */
  delete_mentor_message_by_pk?: Maybe<Mentor_Message>;
  /** delete data from the table: "mentor_time" */
  delete_mentor_time?: Maybe<Mentor_Time_Mutation_Response>;
  /** delete single row from the table: "mentor_time" */
  delete_mentor_time_by_pk?: Maybe<Mentor_Time>;
  /** delete data from the table: "postgraduate_application" */
  delete_postgraduate_application?: Maybe<Postgraduate_Application_Mutation_Response>;
  /** delete single row from the table: "postgraduate_application" */
  delete_postgraduate_application_by_pk?: Maybe<Postgraduate_Application>;
  /** delete data from the table: "postgraduate_application_history" */
  delete_postgraduate_application_history?: Maybe<Postgraduate_Application_History_Mutation_Response>;
  /** delete single row from the table: "postgraduate_application_history" */
  delete_postgraduate_application_history_by_pk?: Maybe<Postgraduate_Application_History>;
  /** delete data from the table: "postgraduate_mentor_info" */
  delete_postgraduate_mentor_info?: Maybe<Postgraduate_Mentor_Info_Mutation_Response>;
  /** delete single row from the table: "postgraduate_mentor_info" */
  delete_postgraduate_mentor_info_by_pk?: Maybe<Postgraduate_Mentor_Info>;
  /** delete data from the table: "postgraduate_mentor_info_pending" */
  delete_postgraduate_mentor_info_pending?: Maybe<Postgraduate_Mentor_Info_Pending_Mutation_Response>;
  /** delete single row from the table: "postgraduate_mentor_info_pending" */
  delete_postgraduate_mentor_info_pending_by_pk?: Maybe<Postgraduate_Mentor_Info_Pending>;
  /** delete data from the table: "scholarship_application" */
  delete_scholarship_application?: Maybe<Scholarship_Application_Mutation_Response>;
  /** delete single row from the table: "scholarship_application" */
  delete_scholarship_application_by_pk?: Maybe<Scholarship_Application>;
  /** delete data from the table: "scholarships_aids" */
  delete_scholarships_aids?: Maybe<Scholarships_Aids_Mutation_Response>;
  /** delete single row from the table: "scholarships_aids" */
  delete_scholarships_aids_by_pk?: Maybe<Scholarships_Aids>;
  /** delete data from the table: "share_course" */
  delete_share_course?: Maybe<Share_Course_Mutation_Response>;
  /** delete single row from the table: "share_course" */
  delete_share_course_by_pk?: Maybe<Share_Course>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "weekly" */
  delete_weekly?: Maybe<Weekly_Mutation_Response>;
  /** delete single row from the table: "weekly" */
  delete_weekly_by_pk?: Maybe<Weekly>;
  /** insert data into the table: "aid_application" */
  insert_aid_application?: Maybe<Aid_Application_Mutation_Response>;
  /** insert a single row into the table: "aid_application" */
  insert_aid_application_one?: Maybe<Aid_Application>;
  /** insert data into the table: "contest" */
  insert_contest?: Maybe<Contest_Mutation_Response>;
  /** insert data into the table: "contest_code" */
  insert_contest_code?: Maybe<Contest_Code_Mutation_Response>;
  /** insert a single row into the table: "contest_code" */
  insert_contest_code_one?: Maybe<Contest_Code>;
  /** insert data into the table: "contest_info" */
  insert_contest_info?: Maybe<Contest_Info_Mutation_Response>;
  /** insert a single row into the table: "contest_info" */
  insert_contest_info_one?: Maybe<Contest_Info>;
  /** insert data into the table: "contest_manager" */
  insert_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** insert a single row into the table: "contest_manager" */
  insert_contest_manager_one?: Maybe<Contest_Manager>;
  /** insert a single row into the table: "contest" */
  insert_contest_one?: Maybe<Contest>;
  /** insert data into the table: "contest_room" */
  insert_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** insert a single row into the table: "contest_room" */
  insert_contest_room_one?: Maybe<Contest_Room>;
  /** insert data into the table: "contest_room_team" */
  insert_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** insert a single row into the table: "contest_room_team" */
  insert_contest_room_team_one?: Maybe<Contest_Room_Team>;
  /** insert data into the table: "contest_team" */
  insert_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** insert data into the table: "contest_team_member" */
  insert_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** insert a single row into the table: "contest_team_member" */
  insert_contest_team_member_one?: Maybe<Contest_Team_Member>;
  /** insert a single row into the table: "contest_team" */
  insert_contest_team_one?: Maybe<Contest_Team>;
  /** insert data into the table: "honor_application" */
  insert_honor_application?: Maybe<Honor_Application_Mutation_Response>;
  /** insert a single row into the table: "honor_application" */
  insert_honor_application_one?: Maybe<Honor_Application>;
  /** insert data into the table: "honor_time" */
  insert_honor_time?: Maybe<Honor_Time_Mutation_Response>;
  /** insert a single row into the table: "honor_time" */
  insert_honor_time_one?: Maybe<Honor_Time>;
  /** insert data into the table: "honor_type" */
  insert_honor_type?: Maybe<Honor_Type_Mutation_Response>;
  /** insert a single row into the table: "honor_type" */
  insert_honor_type_one?: Maybe<Honor_Type>;
  /** insert data into the table: "info_notice" */
  insert_info_notice?: Maybe<Info_Notice_Mutation_Response>;
  /** insert a single row into the table: "info_notice" */
  insert_info_notice_one?: Maybe<Info_Notice>;
  /** insert data into the table: "mentor_application" */
  insert_mentor_application?: Maybe<Mentor_Application_Mutation_Response>;
  /** insert a single row into the table: "mentor_application" */
  insert_mentor_application_one?: Maybe<Mentor_Application>;
  /** insert data into the table: "mentor_available" */
  insert_mentor_available?: Maybe<Mentor_Available_Mutation_Response>;
  /** insert a single row into the table: "mentor_available" */
  insert_mentor_available_one?: Maybe<Mentor_Available>;
  /** insert data into the table: "mentor_info" */
  insert_mentor_info?: Maybe<Mentor_Info_Mutation_Response>;
  /** insert a single row into the table: "mentor_info" */
  insert_mentor_info_one?: Maybe<Mentor_Info>;
  /** insert data into the table: "mentor_message" */
  insert_mentor_message?: Maybe<Mentor_Message_Mutation_Response>;
  /** insert a single row into the table: "mentor_message" */
  insert_mentor_message_one?: Maybe<Mentor_Message>;
  /** insert data into the table: "mentor_time" */
  insert_mentor_time?: Maybe<Mentor_Time_Mutation_Response>;
  /** insert a single row into the table: "mentor_time" */
  insert_mentor_time_one?: Maybe<Mentor_Time>;
  /** insert data into the table: "postgraduate_application" */
  insert_postgraduate_application?: Maybe<Postgraduate_Application_Mutation_Response>;
  /** insert data into the table: "postgraduate_application_history" */
  insert_postgraduate_application_history?: Maybe<Postgraduate_Application_History_Mutation_Response>;
  /** insert a single row into the table: "postgraduate_application_history" */
  insert_postgraduate_application_history_one?: Maybe<Postgraduate_Application_History>;
  /** insert a single row into the table: "postgraduate_application" */
  insert_postgraduate_application_one?: Maybe<Postgraduate_Application>;
  /** insert data into the table: "postgraduate_mentor_info" */
  insert_postgraduate_mentor_info?: Maybe<Postgraduate_Mentor_Info_Mutation_Response>;
  /** insert a single row into the table: "postgraduate_mentor_info" */
  insert_postgraduate_mentor_info_one?: Maybe<Postgraduate_Mentor_Info>;
  /** insert data into the table: "postgraduate_mentor_info_pending" */
  insert_postgraduate_mentor_info_pending?: Maybe<Postgraduate_Mentor_Info_Pending_Mutation_Response>;
  /** insert a single row into the table: "postgraduate_mentor_info_pending" */
  insert_postgraduate_mentor_info_pending_one?: Maybe<Postgraduate_Mentor_Info_Pending>;
  /** insert data into the table: "scholarship_application" */
  insert_scholarship_application?: Maybe<Scholarship_Application_Mutation_Response>;
  /** insert a single row into the table: "scholarship_application" */
  insert_scholarship_application_one?: Maybe<Scholarship_Application>;
  /** insert data into the table: "scholarships_aids" */
  insert_scholarships_aids?: Maybe<Scholarships_Aids_Mutation_Response>;
  /** insert a single row into the table: "scholarships_aids" */
  insert_scholarships_aids_one?: Maybe<Scholarships_Aids>;
  /** insert data into the table: "share_course" */
  insert_share_course?: Maybe<Share_Course_Mutation_Response>;
  /** insert a single row into the table: "share_course" */
  insert_share_course_one?: Maybe<Share_Course>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "weekly" */
  insert_weekly?: Maybe<Weekly_Mutation_Response>;
  /** insert a single row into the table: "weekly" */
  insert_weekly_one?: Maybe<Weekly>;
  /** update data of the table: "aid_application" */
  update_aid_application?: Maybe<Aid_Application_Mutation_Response>;
  /** update single row of the table: "aid_application" */
  update_aid_application_by_pk?: Maybe<Aid_Application>;
  /** update data of the table: "contest" */
  update_contest?: Maybe<Contest_Mutation_Response>;
  /** update single row of the table: "contest" */
  update_contest_by_pk?: Maybe<Contest>;
  /** update data of the table: "contest_code" */
  update_contest_code?: Maybe<Contest_Code_Mutation_Response>;
  /** update single row of the table: "contest_code" */
  update_contest_code_by_pk?: Maybe<Contest_Code>;
  /** update data of the table: "contest_info" */
  update_contest_info?: Maybe<Contest_Info_Mutation_Response>;
  /** update single row of the table: "contest_info" */
  update_contest_info_by_pk?: Maybe<Contest_Info>;
  /** update data of the table: "contest_manager" */
  update_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** update single row of the table: "contest_manager" */
  update_contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** update data of the table: "contest_room" */
  update_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** update single row of the table: "contest_room" */
  update_contest_room_by_pk?: Maybe<Contest_Room>;
  /** update data of the table: "contest_room_team" */
  update_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** update single row of the table: "contest_room_team" */
  update_contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** update data of the table: "contest_team" */
  update_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** update single row of the table: "contest_team" */
  update_contest_team_by_pk?: Maybe<Contest_Team>;
  /** update data of the table: "contest_team_member" */
  update_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** update single row of the table: "contest_team_member" */
  update_contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** update data of the table: "honor_application" */
  update_honor_application?: Maybe<Honor_Application_Mutation_Response>;
  /** update single row of the table: "honor_application" */
  update_honor_application_by_pk?: Maybe<Honor_Application>;
  /** update data of the table: "honor_time" */
  update_honor_time?: Maybe<Honor_Time_Mutation_Response>;
  /** update single row of the table: "honor_time" */
  update_honor_time_by_pk?: Maybe<Honor_Time>;
  /** update data of the table: "honor_type" */
  update_honor_type?: Maybe<Honor_Type_Mutation_Response>;
  /** update single row of the table: "honor_type" */
  update_honor_type_by_pk?: Maybe<Honor_Type>;
  /** update data of the table: "info_notice" */
  update_info_notice?: Maybe<Info_Notice_Mutation_Response>;
  /** update single row of the table: "info_notice" */
  update_info_notice_by_pk?: Maybe<Info_Notice>;
  /** update data of the table: "mentor_application" */
  update_mentor_application?: Maybe<Mentor_Application_Mutation_Response>;
  /** update single row of the table: "mentor_application" */
  update_mentor_application_by_pk?: Maybe<Mentor_Application>;
  /** update data of the table: "mentor_available" */
  update_mentor_available?: Maybe<Mentor_Available_Mutation_Response>;
  /** update single row of the table: "mentor_available" */
  update_mentor_available_by_pk?: Maybe<Mentor_Available>;
  /** update data of the table: "mentor_info" */
  update_mentor_info?: Maybe<Mentor_Info_Mutation_Response>;
  /** update single row of the table: "mentor_info" */
  update_mentor_info_by_pk?: Maybe<Mentor_Info>;
  /** update data of the table: "mentor_message" */
  update_mentor_message?: Maybe<Mentor_Message_Mutation_Response>;
  /** update single row of the table: "mentor_message" */
  update_mentor_message_by_pk?: Maybe<Mentor_Message>;
  /** update data of the table: "mentor_time" */
  update_mentor_time?: Maybe<Mentor_Time_Mutation_Response>;
  /** update single row of the table: "mentor_time" */
  update_mentor_time_by_pk?: Maybe<Mentor_Time>;
  /** update data of the table: "postgraduate_application" */
  update_postgraduate_application?: Maybe<Postgraduate_Application_Mutation_Response>;
  /** update single row of the table: "postgraduate_application" */
  update_postgraduate_application_by_pk?: Maybe<Postgraduate_Application>;
  /** update data of the table: "postgraduate_application_history" */
  update_postgraduate_application_history?: Maybe<Postgraduate_Application_History_Mutation_Response>;
  /** update single row of the table: "postgraduate_application_history" */
  update_postgraduate_application_history_by_pk?: Maybe<Postgraduate_Application_History>;
  /** update data of the table: "postgraduate_mentor_info" */
  update_postgraduate_mentor_info?: Maybe<Postgraduate_Mentor_Info_Mutation_Response>;
  /** update single row of the table: "postgraduate_mentor_info" */
  update_postgraduate_mentor_info_by_pk?: Maybe<Postgraduate_Mentor_Info>;
  /** update data of the table: "postgraduate_mentor_info_pending" */
  update_postgraduate_mentor_info_pending?: Maybe<Postgraduate_Mentor_Info_Pending_Mutation_Response>;
  /** update single row of the table: "postgraduate_mentor_info_pending" */
  update_postgraduate_mentor_info_pending_by_pk?: Maybe<Postgraduate_Mentor_Info_Pending>;
  /** update data of the table: "scholarship_application" */
  update_scholarship_application?: Maybe<Scholarship_Application_Mutation_Response>;
  /** update single row of the table: "scholarship_application" */
  update_scholarship_application_by_pk?: Maybe<Scholarship_Application>;
  /** update data of the table: "scholarships_aids" */
  update_scholarships_aids?: Maybe<Scholarships_Aids_Mutation_Response>;
  /** update single row of the table: "scholarships_aids" */
  update_scholarships_aids_by_pk?: Maybe<Scholarships_Aids>;
  /** update data of the table: "share_course" */
  update_share_course?: Maybe<Share_Course_Mutation_Response>;
  /** update single row of the table: "share_course" */
  update_share_course_by_pk?: Maybe<Share_Course>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "weekly" */
  update_weekly?: Maybe<Weekly_Mutation_Response>;
  /** update single row of the table: "weekly" */
  update_weekly_by_pk?: Maybe<Weekly>;
};


/** mutation root */
export type Mutation_RootDelete_Aid_ApplicationArgs = {
  where: Aid_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Aid_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ContestArgs = {
  where: Contest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_CodeArgs = {
  where: Contest_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Code_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_InfoArgs = {
  where: Contest_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Info_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_ManagerArgs = {
  where: Contest_Manager_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Manager_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_RoomArgs = {
  where: Contest_Room_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Room_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_Room_TeamArgs = {
  where: Contest_Room_Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Room_Team_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_TeamArgs = {
  where: Contest_Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_MemberArgs = {
  where: Contest_Team_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_Member_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Honor_ApplicationArgs = {
  where: Honor_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Honor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Honor_TimeArgs = {
  where: Honor_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Honor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Honor_TypeArgs = {
  where: Honor_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Honor_Type_By_PkArgs = {
  type_name: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Info_NoticeArgs = {
  where: Info_Notice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Info_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Mentor_ApplicationArgs = {
  where: Mentor_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Mentor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Mentor_AvailableArgs = {
  where: Mentor_Available_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Mentor_Available_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Mentor_InfoArgs = {
  where: Mentor_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Mentor_Info_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Mentor_MessageArgs = {
  where: Mentor_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Mentor_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Mentor_TimeArgs = {
  where: Mentor_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Mentor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_ApplicationArgs = {
  where: Postgraduate_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Application_By_PkArgs = {
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Application_HistoryArgs = {
  where: Postgraduate_Application_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Application_History_By_PkArgs = {
  created_at: Scalars['timestamptz']['input'];
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Mentor_InfoArgs = {
  where: Postgraduate_Mentor_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Mentor_Info_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Mentor_Info_PendingArgs = {
  where: Postgraduate_Mentor_Info_Pending_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Postgraduate_Mentor_Info_Pending_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Scholarship_ApplicationArgs = {
  where: Scholarship_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scholarship_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Scholarships_AidsArgs = {
  where: Scholarships_Aids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scholarships_Aids_By_PkArgs = {
  code: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Share_CourseArgs = {
  where: Share_Course_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Share_Course_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  _id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WeeklyArgs = {
  where: Weekly_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Weekly_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Aid_ApplicationArgs = {
  objects: Array<Aid_Application_Insert_Input>;
  on_conflict?: InputMaybe<Aid_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Aid_Application_OneArgs = {
  object: Aid_Application_Insert_Input;
  on_conflict?: InputMaybe<Aid_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContestArgs = {
  objects: Array<Contest_Insert_Input>;
  on_conflict?: InputMaybe<Contest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_CodeArgs = {
  objects: Array<Contest_Code_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Code_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Code_OneArgs = {
  object: Contest_Code_Insert_Input;
  on_conflict?: InputMaybe<Contest_Code_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_InfoArgs = {
  objects: Array<Contest_Info_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Info_OneArgs = {
  object: Contest_Info_Insert_Input;
  on_conflict?: InputMaybe<Contest_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_ManagerArgs = {
  objects: Array<Contest_Manager_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Manager_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Manager_OneArgs = {
  object: Contest_Manager_Insert_Input;
  on_conflict?: InputMaybe<Contest_Manager_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_OneArgs = {
  object: Contest_Insert_Input;
  on_conflict?: InputMaybe<Contest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_RoomArgs = {
  objects: Array<Contest_Room_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Room_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Room_OneArgs = {
  object: Contest_Room_Insert_Input;
  on_conflict?: InputMaybe<Contest_Room_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Room_TeamArgs = {
  objects: Array<Contest_Room_Team_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Room_Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Room_Team_OneArgs = {
  object: Contest_Room_Team_Insert_Input;
  on_conflict?: InputMaybe<Contest_Room_Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_TeamArgs = {
  objects: Array<Contest_Team_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_MemberArgs = {
  objects: Array<Contest_Team_Member_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Team_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_Member_OneArgs = {
  object: Contest_Team_Member_Insert_Input;
  on_conflict?: InputMaybe<Contest_Team_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_OneArgs = {
  object: Contest_Team_Insert_Input;
  on_conflict?: InputMaybe<Contest_Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_ApplicationArgs = {
  objects: Array<Honor_Application_Insert_Input>;
  on_conflict?: InputMaybe<Honor_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_Application_OneArgs = {
  object: Honor_Application_Insert_Input;
  on_conflict?: InputMaybe<Honor_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_TimeArgs = {
  objects: Array<Honor_Time_Insert_Input>;
  on_conflict?: InputMaybe<Honor_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_Time_OneArgs = {
  object: Honor_Time_Insert_Input;
  on_conflict?: InputMaybe<Honor_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_TypeArgs = {
  objects: Array<Honor_Type_Insert_Input>;
  on_conflict?: InputMaybe<Honor_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Honor_Type_OneArgs = {
  object: Honor_Type_Insert_Input;
  on_conflict?: InputMaybe<Honor_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Info_NoticeArgs = {
  objects: Array<Info_Notice_Insert_Input>;
  on_conflict?: InputMaybe<Info_Notice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Info_Notice_OneArgs = {
  object: Info_Notice_Insert_Input;
  on_conflict?: InputMaybe<Info_Notice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_ApplicationArgs = {
  objects: Array<Mentor_Application_Insert_Input>;
  on_conflict?: InputMaybe<Mentor_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_Application_OneArgs = {
  object: Mentor_Application_Insert_Input;
  on_conflict?: InputMaybe<Mentor_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_AvailableArgs = {
  objects: Array<Mentor_Available_Insert_Input>;
  on_conflict?: InputMaybe<Mentor_Available_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_Available_OneArgs = {
  object: Mentor_Available_Insert_Input;
  on_conflict?: InputMaybe<Mentor_Available_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_InfoArgs = {
  objects: Array<Mentor_Info_Insert_Input>;
  on_conflict?: InputMaybe<Mentor_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_Info_OneArgs = {
  object: Mentor_Info_Insert_Input;
  on_conflict?: InputMaybe<Mentor_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_MessageArgs = {
  objects: Array<Mentor_Message_Insert_Input>;
  on_conflict?: InputMaybe<Mentor_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_Message_OneArgs = {
  object: Mentor_Message_Insert_Input;
  on_conflict?: InputMaybe<Mentor_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_TimeArgs = {
  objects: Array<Mentor_Time_Insert_Input>;
  on_conflict?: InputMaybe<Mentor_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Mentor_Time_OneArgs = {
  object: Mentor_Time_Insert_Input;
  on_conflict?: InputMaybe<Mentor_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_ApplicationArgs = {
  objects: Array<Postgraduate_Application_Insert_Input>;
  on_conflict?: InputMaybe<Postgraduate_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Application_HistoryArgs = {
  objects: Array<Postgraduate_Application_History_Insert_Input>;
  on_conflict?: InputMaybe<Postgraduate_Application_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Application_History_OneArgs = {
  object: Postgraduate_Application_History_Insert_Input;
  on_conflict?: InputMaybe<Postgraduate_Application_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Application_OneArgs = {
  object: Postgraduate_Application_Insert_Input;
  on_conflict?: InputMaybe<Postgraduate_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Mentor_InfoArgs = {
  objects: Array<Postgraduate_Mentor_Info_Insert_Input>;
  on_conflict?: InputMaybe<Postgraduate_Mentor_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Mentor_Info_OneArgs = {
  object: Postgraduate_Mentor_Info_Insert_Input;
  on_conflict?: InputMaybe<Postgraduate_Mentor_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Mentor_Info_PendingArgs = {
  objects: Array<Postgraduate_Mentor_Info_Pending_Insert_Input>;
  on_conflict?: InputMaybe<Postgraduate_Mentor_Info_Pending_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgraduate_Mentor_Info_Pending_OneArgs = {
  object: Postgraduate_Mentor_Info_Pending_Insert_Input;
  on_conflict?: InputMaybe<Postgraduate_Mentor_Info_Pending_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scholarship_ApplicationArgs = {
  objects: Array<Scholarship_Application_Insert_Input>;
  on_conflict?: InputMaybe<Scholarship_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scholarship_Application_OneArgs = {
  object: Scholarship_Application_Insert_Input;
  on_conflict?: InputMaybe<Scholarship_Application_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scholarships_AidsArgs = {
  objects: Array<Scholarships_Aids_Insert_Input>;
  on_conflict?: InputMaybe<Scholarships_Aids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scholarships_Aids_OneArgs = {
  object: Scholarships_Aids_Insert_Input;
  on_conflict?: InputMaybe<Scholarships_Aids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Share_CourseArgs = {
  objects: Array<Share_Course_Insert_Input>;
  on_conflict?: InputMaybe<Share_Course_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Share_Course_OneArgs = {
  object: Share_Course_Insert_Input;
  on_conflict?: InputMaybe<Share_Course_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WeeklyArgs = {
  objects: Array<Weekly_Insert_Input>;
  on_conflict?: InputMaybe<Weekly_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Weekly_OneArgs = {
  object: Weekly_Insert_Input;
  on_conflict?: InputMaybe<Weekly_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Aid_ApplicationArgs = {
  _inc?: InputMaybe<Aid_Application_Inc_Input>;
  _set?: InputMaybe<Aid_Application_Set_Input>;
  where: Aid_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Aid_Application_By_PkArgs = {
  _inc?: InputMaybe<Aid_Application_Inc_Input>;
  _set?: InputMaybe<Aid_Application_Set_Input>;
  pk_columns: Aid_Application_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ContestArgs = {
  _set?: InputMaybe<Contest_Set_Input>;
  where: Contest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_By_PkArgs = {
  _set?: InputMaybe<Contest_Set_Input>;
  pk_columns: Contest_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_CodeArgs = {
  _set?: InputMaybe<Contest_Code_Set_Input>;
  where: Contest_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Code_By_PkArgs = {
  _set?: InputMaybe<Contest_Code_Set_Input>;
  pk_columns: Contest_Code_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_InfoArgs = {
  _set?: InputMaybe<Contest_Info_Set_Input>;
  where: Contest_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Info_By_PkArgs = {
  _set?: InputMaybe<Contest_Info_Set_Input>;
  pk_columns: Contest_Info_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_ManagerArgs = {
  _set?: InputMaybe<Contest_Manager_Set_Input>;
  where: Contest_Manager_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Manager_By_PkArgs = {
  _set?: InputMaybe<Contest_Manager_Set_Input>;
  pk_columns: Contest_Manager_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_RoomArgs = {
  _inc?: InputMaybe<Contest_Room_Inc_Input>;
  _set?: InputMaybe<Contest_Room_Set_Input>;
  where: Contest_Room_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Room_By_PkArgs = {
  _inc?: InputMaybe<Contest_Room_Inc_Input>;
  _set?: InputMaybe<Contest_Room_Set_Input>;
  pk_columns: Contest_Room_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Room_TeamArgs = {
  _set?: InputMaybe<Contest_Room_Team_Set_Input>;
  where: Contest_Room_Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Room_Team_By_PkArgs = {
  _set?: InputMaybe<Contest_Room_Team_Set_Input>;
  pk_columns: Contest_Room_Team_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_TeamArgs = {
  _inc?: InputMaybe<Contest_Team_Inc_Input>;
  _set?: InputMaybe<Contest_Team_Set_Input>;
  where: Contest_Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Team_By_PkArgs = {
  _inc?: InputMaybe<Contest_Team_Inc_Input>;
  _set?: InputMaybe<Contest_Team_Set_Input>;
  pk_columns: Contest_Team_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Team_MemberArgs = {
  _set?: InputMaybe<Contest_Team_Member_Set_Input>;
  where: Contest_Team_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Team_Member_By_PkArgs = {
  _set?: InputMaybe<Contest_Team_Member_Set_Input>;
  pk_columns: Contest_Team_Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_ApplicationArgs = {
  _set?: InputMaybe<Honor_Application_Set_Input>;
  where: Honor_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_Application_By_PkArgs = {
  _set?: InputMaybe<Honor_Application_Set_Input>;
  pk_columns: Honor_Application_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_TimeArgs = {
  _inc?: InputMaybe<Honor_Time_Inc_Input>;
  _set?: InputMaybe<Honor_Time_Set_Input>;
  where: Honor_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_Time_By_PkArgs = {
  _inc?: InputMaybe<Honor_Time_Inc_Input>;
  _set?: InputMaybe<Honor_Time_Set_Input>;
  pk_columns: Honor_Time_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_TypeArgs = {
  _set?: InputMaybe<Honor_Type_Set_Input>;
  where: Honor_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Honor_Type_By_PkArgs = {
  _set?: InputMaybe<Honor_Type_Set_Input>;
  pk_columns: Honor_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Info_NoticeArgs = {
  _set?: InputMaybe<Info_Notice_Set_Input>;
  where: Info_Notice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Info_Notice_By_PkArgs = {
  _set?: InputMaybe<Info_Notice_Set_Input>;
  pk_columns: Info_Notice_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_ApplicationArgs = {
  _set?: InputMaybe<Mentor_Application_Set_Input>;
  where: Mentor_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_Application_By_PkArgs = {
  _set?: InputMaybe<Mentor_Application_Set_Input>;
  pk_columns: Mentor_Application_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_AvailableArgs = {
  _set?: InputMaybe<Mentor_Available_Set_Input>;
  where: Mentor_Available_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_Available_By_PkArgs = {
  _set?: InputMaybe<Mentor_Available_Set_Input>;
  pk_columns: Mentor_Available_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_InfoArgs = {
  _set?: InputMaybe<Mentor_Info_Set_Input>;
  where: Mentor_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_Info_By_PkArgs = {
  _set?: InputMaybe<Mentor_Info_Set_Input>;
  pk_columns: Mentor_Info_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_MessageArgs = {
  _set?: InputMaybe<Mentor_Message_Set_Input>;
  where: Mentor_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_Message_By_PkArgs = {
  _set?: InputMaybe<Mentor_Message_Set_Input>;
  pk_columns: Mentor_Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_TimeArgs = {
  _inc?: InputMaybe<Mentor_Time_Inc_Input>;
  _set?: InputMaybe<Mentor_Time_Set_Input>;
  where: Mentor_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Mentor_Time_By_PkArgs = {
  _inc?: InputMaybe<Mentor_Time_Inc_Input>;
  _set?: InputMaybe<Mentor_Time_Set_Input>;
  pk_columns: Mentor_Time_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_ApplicationArgs = {
  _inc?: InputMaybe<Postgraduate_Application_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Application_Set_Input>;
  where: Postgraduate_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Application_By_PkArgs = {
  _inc?: InputMaybe<Postgraduate_Application_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Application_Set_Input>;
  pk_columns: Postgraduate_Application_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Application_HistoryArgs = {
  _inc?: InputMaybe<Postgraduate_Application_History_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Application_History_Set_Input>;
  where: Postgraduate_Application_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Application_History_By_PkArgs = {
  _inc?: InputMaybe<Postgraduate_Application_History_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Application_History_Set_Input>;
  pk_columns: Postgraduate_Application_History_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Mentor_InfoArgs = {
  _inc?: InputMaybe<Postgraduate_Mentor_Info_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Mentor_Info_Set_Input>;
  where: Postgraduate_Mentor_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Mentor_Info_By_PkArgs = {
  _inc?: InputMaybe<Postgraduate_Mentor_Info_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Mentor_Info_Set_Input>;
  pk_columns: Postgraduate_Mentor_Info_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Mentor_Info_PendingArgs = {
  _inc?: InputMaybe<Postgraduate_Mentor_Info_Pending_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Mentor_Info_Pending_Set_Input>;
  where: Postgraduate_Mentor_Info_Pending_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Postgraduate_Mentor_Info_Pending_By_PkArgs = {
  _inc?: InputMaybe<Postgraduate_Mentor_Info_Pending_Inc_Input>;
  _set?: InputMaybe<Postgraduate_Mentor_Info_Pending_Set_Input>;
  pk_columns: Postgraduate_Mentor_Info_Pending_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scholarship_ApplicationArgs = {
  _inc?: InputMaybe<Scholarship_Application_Inc_Input>;
  _set?: InputMaybe<Scholarship_Application_Set_Input>;
  where: Scholarship_Application_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scholarship_Application_By_PkArgs = {
  _inc?: InputMaybe<Scholarship_Application_Inc_Input>;
  _set?: InputMaybe<Scholarship_Application_Set_Input>;
  pk_columns: Scholarship_Application_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scholarships_AidsArgs = {
  _inc?: InputMaybe<Scholarships_Aids_Inc_Input>;
  _set?: InputMaybe<Scholarships_Aids_Set_Input>;
  where: Scholarships_Aids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scholarships_Aids_By_PkArgs = {
  _inc?: InputMaybe<Scholarships_Aids_Inc_Input>;
  _set?: InputMaybe<Scholarships_Aids_Set_Input>;
  pk_columns: Scholarships_Aids_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Share_CourseArgs = {
  _inc?: InputMaybe<Share_Course_Inc_Input>;
  _set?: InputMaybe<Share_Course_Set_Input>;
  where: Share_Course_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Share_Course_By_PkArgs = {
  _inc?: InputMaybe<Share_Course_Inc_Input>;
  _set?: InputMaybe<Share_Course_Set_Input>;
  pk_columns: Share_Course_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: InputMaybe<User_Inc_Input>;
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WeeklyArgs = {
  _inc?: InputMaybe<Weekly_Inc_Input>;
  _set?: InputMaybe<Weekly_Set_Input>;
  where: Weekly_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Weekly_By_PkArgs = {
  _inc?: InputMaybe<Weekly_Inc_Input>;
  _set?: InputMaybe<Weekly_Set_Input>;
  pk_columns: Weekly_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** 学生填报保研申请信息（有意向、联络中、已确认） */
export type Postgraduate_Application = {
  __typename?: 'postgraduate_application';
  created_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  history: Array<Postgraduate_Application_History>;
  /** An aggregate relationship */
  history_aggregate: Postgraduate_Application_History_Aggregate;
  /** An object relationship */
  mentor: Postgraduate_Mentor_Info;
  mentor_info_id: Scalars['Int']['output'];
  /** intend, in_contact, confirmed */
  status: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};


/** 学生填报保研申请信息（有意向、联络中、已确认） */
export type Postgraduate_ApplicationHistoryArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};


/** 学生填报保研申请信息（有意向、联络中、已确认） */
export type Postgraduate_ApplicationHistory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};

/** aggregated selection of "postgraduate_application" */
export type Postgraduate_Application_Aggregate = {
  __typename?: 'postgraduate_application_aggregate';
  aggregate?: Maybe<Postgraduate_Application_Aggregate_Fields>;
  nodes: Array<Postgraduate_Application>;
};

/** aggregate fields of "postgraduate_application" */
export type Postgraduate_Application_Aggregate_Fields = {
  __typename?: 'postgraduate_application_aggregate_fields';
  avg?: Maybe<Postgraduate_Application_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Postgraduate_Application_Max_Fields>;
  min?: Maybe<Postgraduate_Application_Min_Fields>;
  stddev?: Maybe<Postgraduate_Application_Stddev_Fields>;
  stddev_pop?: Maybe<Postgraduate_Application_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Postgraduate_Application_Stddev_Samp_Fields>;
  sum?: Maybe<Postgraduate_Application_Sum_Fields>;
  var_pop?: Maybe<Postgraduate_Application_Var_Pop_Fields>;
  var_samp?: Maybe<Postgraduate_Application_Var_Samp_Fields>;
  variance?: Maybe<Postgraduate_Application_Variance_Fields>;
};


/** aggregate fields of "postgraduate_application" */
export type Postgraduate_Application_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "postgraduate_application" */
export type Postgraduate_Application_Aggregate_Order_By = {
  avg?: InputMaybe<Postgraduate_Application_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Postgraduate_Application_Max_Order_By>;
  min?: InputMaybe<Postgraduate_Application_Min_Order_By>;
  stddev?: InputMaybe<Postgraduate_Application_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Postgraduate_Application_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Postgraduate_Application_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Postgraduate_Application_Sum_Order_By>;
  var_pop?: InputMaybe<Postgraduate_Application_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Postgraduate_Application_Var_Samp_Order_By>;
  variance?: InputMaybe<Postgraduate_Application_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "postgraduate_application" */
export type Postgraduate_Application_Arr_Rel_Insert_Input = {
  data: Array<Postgraduate_Application_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Postgraduate_Application_On_Conflict>;
};

/** aggregate avg on columns */
export type Postgraduate_Application_Avg_Fields = {
  __typename?: 'postgraduate_application_avg_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Avg_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "postgraduate_application". All fields are combined with a logical 'AND'. */
export type Postgraduate_Application_Bool_Exp = {
  _and?: InputMaybe<Array<Postgraduate_Application_Bool_Exp>>;
  _not?: InputMaybe<Postgraduate_Application_Bool_Exp>;
  _or?: InputMaybe<Array<Postgraduate_Application_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  history?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
  mentor_info_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  verified?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "postgraduate_application" */
export enum Postgraduate_Application_Constraint {
  /** unique or primary key constraint on columns "user_id", "mentor_info_id" */
  PostgraduateApplicationPkey = 'postgraduate_application_pkey'
}

/** 学生申请历史记录 */
export type Postgraduate_Application_History = {
  __typename?: 'postgraduate_application_history';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  mentor: Postgraduate_Mentor_Info;
  mentor_info_id: Scalars['Int']['output'];
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "postgraduate_application_history" */
export type Postgraduate_Application_History_Aggregate = {
  __typename?: 'postgraduate_application_history_aggregate';
  aggregate?: Maybe<Postgraduate_Application_History_Aggregate_Fields>;
  nodes: Array<Postgraduate_Application_History>;
};

/** aggregate fields of "postgraduate_application_history" */
export type Postgraduate_Application_History_Aggregate_Fields = {
  __typename?: 'postgraduate_application_history_aggregate_fields';
  avg?: Maybe<Postgraduate_Application_History_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Postgraduate_Application_History_Max_Fields>;
  min?: Maybe<Postgraduate_Application_History_Min_Fields>;
  stddev?: Maybe<Postgraduate_Application_History_Stddev_Fields>;
  stddev_pop?: Maybe<Postgraduate_Application_History_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Postgraduate_Application_History_Stddev_Samp_Fields>;
  sum?: Maybe<Postgraduate_Application_History_Sum_Fields>;
  var_pop?: Maybe<Postgraduate_Application_History_Var_Pop_Fields>;
  var_samp?: Maybe<Postgraduate_Application_History_Var_Samp_Fields>;
  variance?: Maybe<Postgraduate_Application_History_Variance_Fields>;
};


/** aggregate fields of "postgraduate_application_history" */
export type Postgraduate_Application_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Aggregate_Order_By = {
  avg?: InputMaybe<Postgraduate_Application_History_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Postgraduate_Application_History_Max_Order_By>;
  min?: InputMaybe<Postgraduate_Application_History_Min_Order_By>;
  stddev?: InputMaybe<Postgraduate_Application_History_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Postgraduate_Application_History_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Postgraduate_Application_History_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Postgraduate_Application_History_Sum_Order_By>;
  var_pop?: InputMaybe<Postgraduate_Application_History_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Postgraduate_Application_History_Var_Samp_Order_By>;
  variance?: InputMaybe<Postgraduate_Application_History_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "postgraduate_application_history" */
export type Postgraduate_Application_History_Arr_Rel_Insert_Input = {
  data: Array<Postgraduate_Application_History_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Postgraduate_Application_History_On_Conflict>;
};

/** aggregate avg on columns */
export type Postgraduate_Application_History_Avg_Fields = {
  __typename?: 'postgraduate_application_history_avg_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Avg_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "postgraduate_application_history". All fields are combined with a logical 'AND'. */
export type Postgraduate_Application_History_Bool_Exp = {
  _and?: InputMaybe<Array<Postgraduate_Application_History_Bool_Exp>>;
  _not?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
  _or?: InputMaybe<Array<Postgraduate_Application_History_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
  mentor_info_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "postgraduate_application_history" */
export enum Postgraduate_Application_History_Constraint {
  /** unique or primary key constraint on columns "user_id", "mentor_info_id", "created_at" */
  PostgraduateApplicationHistoryPkey = 'postgraduate_application_history_pkey'
}

/** input type for incrementing numeric columns in table "postgraduate_application_history" */
export type Postgraduate_Application_History_Inc_Input = {
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "postgraduate_application_history" */
export type Postgraduate_Application_History_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Obj_Rel_Insert_Input>;
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Postgraduate_Application_History_Max_Fields = {
  __typename?: 'postgraduate_application_history_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Postgraduate_Application_History_Min_Fields = {
  __typename?: 'postgraduate_application_history_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "postgraduate_application_history" */
export type Postgraduate_Application_History_Mutation_Response = {
  __typename?: 'postgraduate_application_history_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Postgraduate_Application_History>;
};

/** on_conflict condition type for table "postgraduate_application_history" */
export type Postgraduate_Application_History_On_Conflict = {
  constraint: Postgraduate_Application_History_Constraint;
  update_columns?: Array<Postgraduate_Application_History_Update_Column>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};

/** Ordering options when selecting data from "postgraduate_application_history". */
export type Postgraduate_Application_History_Order_By = {
  created_at?: InputMaybe<Order_By>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: postgraduate_application_history */
export type Postgraduate_Application_History_Pk_Columns_Input = {
  created_at: Scalars['timestamptz']['input'];
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};

/** select columns of table "postgraduate_application_history" */
export enum Postgraduate_Application_History_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorInfoId = 'mentor_info_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "postgraduate_application_history" */
export type Postgraduate_Application_History_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
  /** intend, in_contact, confirmed_unverified, confirmed_verified, delete */
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Postgraduate_Application_History_Stddev_Fields = {
  __typename?: 'postgraduate_application_history_stddev_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Stddev_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Postgraduate_Application_History_Stddev_Pop_Fields = {
  __typename?: 'postgraduate_application_history_stddev_pop_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Stddev_Pop_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Postgraduate_Application_History_Stddev_Samp_Fields = {
  __typename?: 'postgraduate_application_history_stddev_samp_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Stddev_Samp_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Postgraduate_Application_History_Sum_Fields = {
  __typename?: 'postgraduate_application_history_sum_fields';
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Sum_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** update columns of table "postgraduate_application_history" */
export enum Postgraduate_Application_History_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorInfoId = 'mentor_info_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Postgraduate_Application_History_Var_Pop_Fields = {
  __typename?: 'postgraduate_application_history_var_pop_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Var_Pop_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Postgraduate_Application_History_Var_Samp_Fields = {
  __typename?: 'postgraduate_application_history_var_samp_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Var_Samp_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Postgraduate_Application_History_Variance_Fields = {
  __typename?: 'postgraduate_application_history_variance_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "postgraduate_application_history" */
export type Postgraduate_Application_History_Variance_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "postgraduate_application" */
export type Postgraduate_Application_Inc_Input = {
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "postgraduate_application" */
export type Postgraduate_Application_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  history?: InputMaybe<Postgraduate_Application_History_Arr_Rel_Insert_Input>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Obj_Rel_Insert_Input>;
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
  /** intend, in_contact, confirmed */
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Postgraduate_Application_Max_Fields = {
  __typename?: 'postgraduate_application_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
  /** intend, in_contact, confirmed */
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  /** intend, in_contact, confirmed */
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Postgraduate_Application_Min_Fields = {
  __typename?: 'postgraduate_application_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
  /** intend, in_contact, confirmed */
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  /** intend, in_contact, confirmed */
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "postgraduate_application" */
export type Postgraduate_Application_Mutation_Response = {
  __typename?: 'postgraduate_application_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Postgraduate_Application>;
};

/** on_conflict condition type for table "postgraduate_application" */
export type Postgraduate_Application_On_Conflict = {
  constraint: Postgraduate_Application_Constraint;
  update_columns?: Array<Postgraduate_Application_Update_Column>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};

/** Ordering options when selecting data from "postgraduate_application". */
export type Postgraduate_Application_Order_By = {
  created_at?: InputMaybe<Order_By>;
  history_aggregate?: InputMaybe<Postgraduate_Application_History_Aggregate_Order_By>;
  mentor?: InputMaybe<Postgraduate_Mentor_Info_Order_By>;
  mentor_info_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  verified?: InputMaybe<Order_By>;
};

/** primary key columns input for table: postgraduate_application */
export type Postgraduate_Application_Pk_Columns_Input = {
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};

/** select columns of table "postgraduate_application" */
export enum Postgraduate_Application_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorInfoId = 'mentor_info_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

/** input type for updating data in table "postgraduate_application" */
export type Postgraduate_Application_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  mentor_info_id?: InputMaybe<Scalars['Int']['input']>;
  /** intend, in_contact, confirmed */
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Postgraduate_Application_Stddev_Fields = {
  __typename?: 'postgraduate_application_stddev_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Stddev_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Postgraduate_Application_Stddev_Pop_Fields = {
  __typename?: 'postgraduate_application_stddev_pop_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Stddev_Pop_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Postgraduate_Application_Stddev_Samp_Fields = {
  __typename?: 'postgraduate_application_stddev_samp_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Stddev_Samp_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Postgraduate_Application_Sum_Fields = {
  __typename?: 'postgraduate_application_sum_fields';
  mentor_info_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Sum_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** update columns of table "postgraduate_application" */
export enum Postgraduate_Application_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MentorInfoId = 'mentor_info_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

/** aggregate var_pop on columns */
export type Postgraduate_Application_Var_Pop_Fields = {
  __typename?: 'postgraduate_application_var_pop_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Var_Pop_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Postgraduate_Application_Var_Samp_Fields = {
  __typename?: 'postgraduate_application_var_samp_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Var_Samp_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Postgraduate_Application_Variance_Fields = {
  __typename?: 'postgraduate_application_variance_fields';
  mentor_info_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "postgraduate_application" */
export type Postgraduate_Application_Variance_Order_By = {
  mentor_info_id?: InputMaybe<Order_By>;
};

/** 保研导师信息 */
export type Postgraduate_Mentor_Info = {
  __typename?: 'postgraduate_mentor_info';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  applications: Array<Postgraduate_Application>;
  /** An aggregate relationship */
  applications_aggregate: Postgraduate_Application_Aggregate;
  contact: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  detail_info?: Maybe<Scalars['String']['output']>;
  /** 修改者id */
  editor: Scalars['String']['output'];
  field: Scalars['String']['output'];
  home_page?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mentor: Scalars['String']['output'];
  /** 固定名额 */
  phd_quota: Scalars['numeric']['output'];
  /** 非固定名额 */
  phd_quota_unfixed: Scalars['numeric']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  /** An object relationship */
  userEditor: User;
  /** 创建此信息用户id，有权更改 */
  user_id: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};


/** 保研导师信息 */
export type Postgraduate_Mentor_InfoApplicationsArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};


/** 保研导师信息 */
export type Postgraduate_Mentor_InfoApplications_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};

/** aggregated selection of "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Aggregate = {
  __typename?: 'postgraduate_mentor_info_aggregate';
  aggregate?: Maybe<Postgraduate_Mentor_Info_Aggregate_Fields>;
  nodes: Array<Postgraduate_Mentor_Info>;
};

/** aggregate fields of "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Aggregate_Fields = {
  __typename?: 'postgraduate_mentor_info_aggregate_fields';
  avg?: Maybe<Postgraduate_Mentor_Info_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Postgraduate_Mentor_Info_Max_Fields>;
  min?: Maybe<Postgraduate_Mentor_Info_Min_Fields>;
  stddev?: Maybe<Postgraduate_Mentor_Info_Stddev_Fields>;
  stddev_pop?: Maybe<Postgraduate_Mentor_Info_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Postgraduate_Mentor_Info_Stddev_Samp_Fields>;
  sum?: Maybe<Postgraduate_Mentor_Info_Sum_Fields>;
  var_pop?: Maybe<Postgraduate_Mentor_Info_Var_Pop_Fields>;
  var_samp?: Maybe<Postgraduate_Mentor_Info_Var_Samp_Fields>;
  variance?: Maybe<Postgraduate_Mentor_Info_Variance_Fields>;
};


/** aggregate fields of "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Postgraduate_Mentor_Info_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Postgraduate_Mentor_Info_Avg_Fields = {
  __typename?: 'postgraduate_mentor_info_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "postgraduate_mentor_info". All fields are combined with a logical 'AND'. */
export type Postgraduate_Mentor_Info_Bool_Exp = {
  _and?: InputMaybe<Array<Postgraduate_Mentor_Info_Bool_Exp>>;
  _not?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
  _or?: InputMaybe<Array<Postgraduate_Mentor_Info_Bool_Exp>>;
  alternate_contact?: InputMaybe<String_Comparison_Exp>;
  applications?: InputMaybe<Postgraduate_Application_Bool_Exp>;
  contact?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  detail_info?: InputMaybe<String_Comparison_Exp>;
  editor?: InputMaybe<String_Comparison_Exp>;
  field?: InputMaybe<String_Comparison_Exp>;
  home_page?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  mentor?: InputMaybe<String_Comparison_Exp>;
  phd_quota?: InputMaybe<Numeric_Comparison_Exp>;
  phd_quota_unfixed?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userEditor?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  verified?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "postgraduate_mentor_info" */
export enum Postgraduate_Mentor_Info_Constraint {
  /** unique or primary key constraint on columns "id" */
  PostgraduateMentorInfoPkey = 'postgraduate_mentor_info_pkey'
}

/** input type for incrementing numeric columns in table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  /** 固定名额 */
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  /** 非固定名额 */
  phd_quota_unfixed?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Insert_Input = {
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  applications?: InputMaybe<Postgraduate_Application_Arr_Rel_Insert_Input>;
  contact?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  /** 修改者id */
  editor?: InputMaybe<Scalars['String']['input']>;
  field?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mentor?: InputMaybe<Scalars['String']['input']>;
  /** 固定名额 */
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  /** 非固定名额 */
  phd_quota_unfixed?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  userEditor?: InputMaybe<User_Obj_Rel_Insert_Input>;
  /** 创建此信息用户id，有权更改 */
  user_id?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Postgraduate_Mentor_Info_Max_Fields = {
  __typename?: 'postgraduate_mentor_info_max_fields';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  detail_info?: Maybe<Scalars['String']['output']>;
  /** 修改者id */
  editor?: Maybe<Scalars['String']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  home_page?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  mentor?: Maybe<Scalars['String']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['numeric']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 创建此信息用户id，有权更改 */
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Postgraduate_Mentor_Info_Min_Fields = {
  __typename?: 'postgraduate_mentor_info_min_fields';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  detail_info?: Maybe<Scalars['String']['output']>;
  /** 修改者id */
  editor?: Maybe<Scalars['String']['output']>;
  field?: Maybe<Scalars['String']['output']>;
  home_page?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  mentor?: Maybe<Scalars['String']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['numeric']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** 创建此信息用户id，有权更改 */
  user_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Mutation_Response = {
  __typename?: 'postgraduate_mentor_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Postgraduate_Mentor_Info>;
};

/** input type for inserting object relation for remote table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Obj_Rel_Insert_Input = {
  data: Postgraduate_Mentor_Info_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Postgraduate_Mentor_Info_On_Conflict>;
};

/** on_conflict condition type for table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_On_Conflict = {
  constraint: Postgraduate_Mentor_Info_Constraint;
  update_columns?: Array<Postgraduate_Mentor_Info_Update_Column>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "postgraduate_mentor_info". */
export type Postgraduate_Mentor_Info_Order_By = {
  alternate_contact?: InputMaybe<Order_By>;
  applications_aggregate?: InputMaybe<Postgraduate_Application_Aggregate_Order_By>;
  contact?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  detail_info?: InputMaybe<Order_By>;
  editor?: InputMaybe<Order_By>;
  field?: InputMaybe<Order_By>;
  home_page?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor?: InputMaybe<Order_By>;
  phd_quota?: InputMaybe<Order_By>;
  phd_quota_unfixed?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userEditor?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  verified?: InputMaybe<Order_By>;
};

/** columns and relationships of "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending = {
  __typename?: 'postgraduate_mentor_info_pending';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  contact: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  detail_info?: Maybe<Scalars['String']['output']>;
  home_page?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** 展示的信息的id */
  info_id: Scalars['Int']['output'];
  lab: Scalars['String']['output'];
  mentor: Scalars['String']['output'];
  phd_quota: Scalars['numeric']['output'];
  updated_at: Scalars['timestamptz']['output'];
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Aggregate = {
  __typename?: 'postgraduate_mentor_info_pending_aggregate';
  aggregate?: Maybe<Postgraduate_Mentor_Info_Pending_Aggregate_Fields>;
  nodes: Array<Postgraduate_Mentor_Info_Pending>;
};

/** aggregate fields of "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Aggregate_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_aggregate_fields';
  avg?: Maybe<Postgraduate_Mentor_Info_Pending_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Postgraduate_Mentor_Info_Pending_Max_Fields>;
  min?: Maybe<Postgraduate_Mentor_Info_Pending_Min_Fields>;
  stddev?: Maybe<Postgraduate_Mentor_Info_Pending_Stddev_Fields>;
  stddev_pop?: Maybe<Postgraduate_Mentor_Info_Pending_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Postgraduate_Mentor_Info_Pending_Stddev_Samp_Fields>;
  sum?: Maybe<Postgraduate_Mentor_Info_Pending_Sum_Fields>;
  var_pop?: Maybe<Postgraduate_Mentor_Info_Pending_Var_Pop_Fields>;
  var_samp?: Maybe<Postgraduate_Mentor_Info_Pending_Var_Samp_Fields>;
  variance?: Maybe<Postgraduate_Mentor_Info_Pending_Variance_Fields>;
};


/** aggregate fields of "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Postgraduate_Mentor_Info_Pending_Avg_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "postgraduate_mentor_info_pending". All fields are combined with a logical 'AND'. */
export type Postgraduate_Mentor_Info_Pending_Bool_Exp = {
  _and?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Bool_Exp>>;
  _not?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
  _or?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Bool_Exp>>;
  alternate_contact?: InputMaybe<String_Comparison_Exp>;
  contact?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  detail_info?: InputMaybe<String_Comparison_Exp>;
  home_page?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  info_id?: InputMaybe<Int_Comparison_Exp>;
  lab?: InputMaybe<String_Comparison_Exp>;
  mentor?: InputMaybe<String_Comparison_Exp>;
  phd_quota?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "postgraduate_mentor_info_pending" */
export enum Postgraduate_Mentor_Info_Pending_Constraint {
  /** unique or primary key constraint on columns "id" */
  PostgraduateMentorInfoPendingPkey = 'postgraduate_mentor_info_pending_pkey'
}

/** input type for incrementing numeric columns in table "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  /** 展示的信息的id */
  info_id?: InputMaybe<Scalars['Int']['input']>;
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Insert_Input = {
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  /** 展示的信息的id */
  info_id?: InputMaybe<Scalars['Int']['input']>;
  lab?: InputMaybe<Scalars['String']['input']>;
  mentor?: InputMaybe<Scalars['String']['input']>;
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Postgraduate_Mentor_Info_Pending_Max_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_max_fields';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  detail_info?: Maybe<Scalars['String']['output']>;
  home_page?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Int']['output']>;
  lab?: Maybe<Scalars['String']['output']>;
  mentor?: Maybe<Scalars['String']['output']>;
  phd_quota?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Postgraduate_Mentor_Info_Pending_Min_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_min_fields';
  alternate_contact?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  detail_info?: Maybe<Scalars['String']['output']>;
  home_page?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Int']['output']>;
  lab?: Maybe<Scalars['String']['output']>;
  mentor?: Maybe<Scalars['String']['output']>;
  phd_quota?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Mutation_Response = {
  __typename?: 'postgraduate_mentor_info_pending_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Postgraduate_Mentor_Info_Pending>;
};

/** on_conflict condition type for table "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_On_Conflict = {
  constraint: Postgraduate_Mentor_Info_Pending_Constraint;
  update_columns?: Array<Postgraduate_Mentor_Info_Pending_Update_Column>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
};

/** Ordering options when selecting data from "postgraduate_mentor_info_pending". */
export type Postgraduate_Mentor_Info_Pending_Order_By = {
  alternate_contact?: InputMaybe<Order_By>;
  contact?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  detail_info?: InputMaybe<Order_By>;
  home_page?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  info_id?: InputMaybe<Order_By>;
  lab?: InputMaybe<Order_By>;
  mentor?: InputMaybe<Order_By>;
  phd_quota?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: postgraduate_mentor_info_pending */
export type Postgraduate_Mentor_Info_Pending_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "postgraduate_mentor_info_pending" */
export enum Postgraduate_Mentor_Info_Pending_Select_Column {
  /** column name */
  AlternateContact = 'alternate_contact',
  /** column name */
  Contact = 'contact',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DetailInfo = 'detail_info',
  /** column name */
  HomePage = 'home_page',
  /** column name */
  Id = 'id',
  /** column name */
  InfoId = 'info_id',
  /** column name */
  Lab = 'lab',
  /** column name */
  Mentor = 'mentor',
  /** column name */
  PhdQuota = 'phd_quota',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "postgraduate_mentor_info_pending" */
export type Postgraduate_Mentor_Info_Pending_Set_Input = {
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  /** 展示的信息的id */
  info_id?: InputMaybe<Scalars['Int']['input']>;
  lab?: InputMaybe<Scalars['String']['input']>;
  mentor?: InputMaybe<Scalars['String']['input']>;
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Postgraduate_Mentor_Info_Pending_Stddev_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Postgraduate_Mentor_Info_Pending_Stddev_Pop_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Postgraduate_Mentor_Info_Pending_Stddev_Samp_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Postgraduate_Mentor_Info_Pending_Sum_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Int']['output']>;
  phd_quota?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "postgraduate_mentor_info_pending" */
export enum Postgraduate_Mentor_Info_Pending_Update_Column {
  /** column name */
  AlternateContact = 'alternate_contact',
  /** column name */
  Contact = 'contact',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DetailInfo = 'detail_info',
  /** column name */
  HomePage = 'home_page',
  /** column name */
  Id = 'id',
  /** column name */
  InfoId = 'info_id',
  /** column name */
  Lab = 'lab',
  /** column name */
  Mentor = 'mentor',
  /** column name */
  PhdQuota = 'phd_quota',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Postgraduate_Mentor_Info_Pending_Var_Pop_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Postgraduate_Mentor_Info_Pending_Var_Samp_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Postgraduate_Mentor_Info_Pending_Variance_Fields = {
  __typename?: 'postgraduate_mentor_info_pending_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 展示的信息的id */
  info_id?: Maybe<Scalars['Float']['output']>;
  phd_quota?: Maybe<Scalars['Float']['output']>;
};

/** primary key columns input for table: postgraduate_mentor_info */
export type Postgraduate_Mentor_Info_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "postgraduate_mentor_info" */
export enum Postgraduate_Mentor_Info_Select_Column {
  /** column name */
  AlternateContact = 'alternate_contact',
  /** column name */
  Contact = 'contact',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DetailInfo = 'detail_info',
  /** column name */
  Editor = 'editor',
  /** column name */
  Field = 'field',
  /** column name */
  HomePage = 'home_page',
  /** column name */
  Id = 'id',
  /** column name */
  Mentor = 'mentor',
  /** column name */
  PhdQuota = 'phd_quota',
  /** column name */
  PhdQuotaUnfixed = 'phd_quota_unfixed',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

/** input type for updating data in table "postgraduate_mentor_info" */
export type Postgraduate_Mentor_Info_Set_Input = {
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  /** 修改者id */
  editor?: InputMaybe<Scalars['String']['input']>;
  field?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mentor?: InputMaybe<Scalars['String']['input']>;
  /** 固定名额 */
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  /** 非固定名额 */
  phd_quota_unfixed?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 创建此信息用户id，有权更改 */
  user_id?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Postgraduate_Mentor_Info_Stddev_Fields = {
  __typename?: 'postgraduate_mentor_info_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Postgraduate_Mentor_Info_Stddev_Pop_Fields = {
  __typename?: 'postgraduate_mentor_info_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Postgraduate_Mentor_Info_Stddev_Samp_Fields = {
  __typename?: 'postgraduate_mentor_info_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Postgraduate_Mentor_Info_Sum_Fields = {
  __typename?: 'postgraduate_mentor_info_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['numeric']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "postgraduate_mentor_info" */
export enum Postgraduate_Mentor_Info_Update_Column {
  /** column name */
  AlternateContact = 'alternate_contact',
  /** column name */
  Contact = 'contact',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DetailInfo = 'detail_info',
  /** column name */
  Editor = 'editor',
  /** column name */
  Field = 'field',
  /** column name */
  HomePage = 'home_page',
  /** column name */
  Id = 'id',
  /** column name */
  Mentor = 'mentor',
  /** column name */
  PhdQuota = 'phd_quota',
  /** column name */
  PhdQuotaUnfixed = 'phd_quota_unfixed',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

/** aggregate var_pop on columns */
export type Postgraduate_Mentor_Info_Var_Pop_Fields = {
  __typename?: 'postgraduate_mentor_info_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Postgraduate_Mentor_Info_Var_Samp_Fields = {
  __typename?: 'postgraduate_mentor_info_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Postgraduate_Mentor_Info_Variance_Fields = {
  __typename?: 'postgraduate_mentor_info_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  /** 固定名额 */
  phd_quota?: Maybe<Scalars['Float']['output']>;
  /** 非固定名额 */
  phd_quota_unfixed?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "aid_application" */
  aid_application: Array<Aid_Application>;
  /** fetch aggregated fields from the table: "aid_application" */
  aid_application_aggregate: Aid_Application_Aggregate;
  /** fetch data from the table: "aid_application" using primary key columns */
  aid_application_by_pk?: Maybe<Aid_Application>;
  /** fetch data from the table: "contest" */
  contest: Array<Contest>;
  /** fetch aggregated fields from the table: "contest" */
  contest_aggregate: Contest_Aggregate;
  /** fetch data from the table: "contest" using primary key columns */
  contest_by_pk?: Maybe<Contest>;
  /** fetch data from the table: "contest_code" */
  contest_code: Array<Contest_Code>;
  /** fetch aggregated fields from the table: "contest_code" */
  contest_code_aggregate: Contest_Code_Aggregate;
  /** fetch data from the table: "contest_code" using primary key columns */
  contest_code_by_pk?: Maybe<Contest_Code>;
  /** fetch data from the table: "contest_info" */
  contest_info: Array<Contest_Info>;
  /** fetch aggregated fields from the table: "contest_info" */
  contest_info_aggregate: Contest_Info_Aggregate;
  /** fetch data from the table: "contest_info" using primary key columns */
  contest_info_by_pk?: Maybe<Contest_Info>;
  /** fetch data from the table: "contest_manager" */
  contest_manager: Array<Contest_Manager>;
  /** fetch aggregated fields from the table: "contest_manager" */
  contest_manager_aggregate: Contest_Manager_Aggregate;
  /** fetch data from the table: "contest_manager" using primary key columns */
  contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** fetch data from the table: "contest_room" */
  contest_room: Array<Contest_Room>;
  /** fetch aggregated fields from the table: "contest_room" */
  contest_room_aggregate: Contest_Room_Aggregate;
  /** fetch data from the table: "contest_room" using primary key columns */
  contest_room_by_pk?: Maybe<Contest_Room>;
  /** fetch data from the table: "contest_room_team" */
  contest_room_team: Array<Contest_Room_Team>;
  /** fetch aggregated fields from the table: "contest_room_team" */
  contest_room_team_aggregate: Contest_Room_Team_Aggregate;
  /** fetch data from the table: "contest_room_team" using primary key columns */
  contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** fetch data from the table: "contest_team" */
  contest_team: Array<Contest_Team>;
  /** fetch aggregated fields from the table: "contest_team" */
  contest_team_aggregate: Contest_Team_Aggregate;
  /** fetch data from the table: "contest_team" using primary key columns */
  contest_team_by_pk?: Maybe<Contest_Team>;
  /** fetch data from the table: "contest_team_member" */
  contest_team_member: Array<Contest_Team_Member>;
  /** fetch aggregated fields from the table: "contest_team_member" */
  contest_team_member_aggregate: Contest_Team_Member_Aggregate;
  /** fetch data from the table: "contest_team_member" using primary key columns */
  contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** fetch data from the table: "honor_application" */
  honor_application: Array<Honor_Application>;
  /** fetch aggregated fields from the table: "honor_application" */
  honor_application_aggregate: Honor_Application_Aggregate;
  /** fetch data from the table: "honor_application" using primary key columns */
  honor_application_by_pk?: Maybe<Honor_Application>;
  /** fetch data from the table: "honor_time" */
  honor_time: Array<Honor_Time>;
  /** fetch aggregated fields from the table: "honor_time" */
  honor_time_aggregate: Honor_Time_Aggregate;
  /** fetch data from the table: "honor_time" using primary key columns */
  honor_time_by_pk?: Maybe<Honor_Time>;
  /** fetch data from the table: "honor_type" */
  honor_type: Array<Honor_Type>;
  /** fetch aggregated fields from the table: "honor_type" */
  honor_type_aggregate: Honor_Type_Aggregate;
  /** fetch data from the table: "honor_type" using primary key columns */
  honor_type_by_pk?: Maybe<Honor_Type>;
  /** fetch data from the table: "info_notice" */
  info_notice: Array<Info_Notice>;
  /** fetch aggregated fields from the table: "info_notice" */
  info_notice_aggregate: Info_Notice_Aggregate;
  /** fetch data from the table: "info_notice" using primary key columns */
  info_notice_by_pk?: Maybe<Info_Notice>;
  /** fetch data from the table: "mentor_application" */
  mentor_application: Array<Mentor_Application>;
  /** fetch aggregated fields from the table: "mentor_application" */
  mentor_application_aggregate: Mentor_Application_Aggregate;
  /** fetch data from the table: "mentor_application" using primary key columns */
  mentor_application_by_pk?: Maybe<Mentor_Application>;
  /** fetch data from the table: "mentor_available" */
  mentor_available: Array<Mentor_Available>;
  /** fetch aggregated fields from the table: "mentor_available" */
  mentor_available_aggregate: Mentor_Available_Aggregate;
  /** fetch data from the table: "mentor_available" using primary key columns */
  mentor_available_by_pk?: Maybe<Mentor_Available>;
  /** An array relationship */
  mentor_info: Array<Mentor_Info>;
  /** An aggregate relationship */
  mentor_info_aggregate: Mentor_Info_Aggregate;
  /** fetch data from the table: "mentor_info" using primary key columns */
  mentor_info_by_pk?: Maybe<Mentor_Info>;
  /** fetch data from the table: "mentor_message" */
  mentor_message: Array<Mentor_Message>;
  /** fetch aggregated fields from the table: "mentor_message" */
  mentor_message_aggregate: Mentor_Message_Aggregate;
  /** fetch data from the table: "mentor_message" using primary key columns */
  mentor_message_by_pk?: Maybe<Mentor_Message>;
  /** fetch data from the table: "mentor_time" */
  mentor_time: Array<Mentor_Time>;
  /** fetch aggregated fields from the table: "mentor_time" */
  mentor_time_aggregate: Mentor_Time_Aggregate;
  /** fetch data from the table: "mentor_time" using primary key columns */
  mentor_time_by_pk?: Maybe<Mentor_Time>;
  /** fetch data from the table: "postgraduate_application" */
  postgraduate_application: Array<Postgraduate_Application>;
  /** fetch aggregated fields from the table: "postgraduate_application" */
  postgraduate_application_aggregate: Postgraduate_Application_Aggregate;
  /** fetch data from the table: "postgraduate_application" using primary key columns */
  postgraduate_application_by_pk?: Maybe<Postgraduate_Application>;
  /** fetch data from the table: "postgraduate_application_history" */
  postgraduate_application_history: Array<Postgraduate_Application_History>;
  /** fetch aggregated fields from the table: "postgraduate_application_history" */
  postgraduate_application_history_aggregate: Postgraduate_Application_History_Aggregate;
  /** fetch data from the table: "postgraduate_application_history" using primary key columns */
  postgraduate_application_history_by_pk?: Maybe<Postgraduate_Application_History>;
  /** fetch data from the table: "postgraduate_mentor_info" */
  postgraduate_mentor_info: Array<Postgraduate_Mentor_Info>;
  /** fetch aggregated fields from the table: "postgraduate_mentor_info" */
  postgraduate_mentor_info_aggregate: Postgraduate_Mentor_Info_Aggregate;
  /** fetch data from the table: "postgraduate_mentor_info" using primary key columns */
  postgraduate_mentor_info_by_pk?: Maybe<Postgraduate_Mentor_Info>;
  /** fetch data from the table: "postgraduate_mentor_info_pending" */
  postgraduate_mentor_info_pending: Array<Postgraduate_Mentor_Info_Pending>;
  /** fetch aggregated fields from the table: "postgraduate_mentor_info_pending" */
  postgraduate_mentor_info_pending_aggregate: Postgraduate_Mentor_Info_Pending_Aggregate;
  /** fetch data from the table: "postgraduate_mentor_info_pending" using primary key columns */
  postgraduate_mentor_info_pending_by_pk?: Maybe<Postgraduate_Mentor_Info_Pending>;
  /** fetch data from the table: "scholarship_application" */
  scholarship_application: Array<Scholarship_Application>;
  /** fetch aggregated fields from the table: "scholarship_application" */
  scholarship_application_aggregate: Scholarship_Application_Aggregate;
  /** fetch data from the table: "scholarship_application" using primary key columns */
  scholarship_application_by_pk?: Maybe<Scholarship_Application>;
  /** fetch data from the table: "scholarships_aids" */
  scholarships_aids: Array<Scholarships_Aids>;
  /** fetch aggregated fields from the table: "scholarships_aids" */
  scholarships_aids_aggregate: Scholarships_Aids_Aggregate;
  /** fetch data from the table: "scholarships_aids" using primary key columns */
  scholarships_aids_by_pk?: Maybe<Scholarships_Aids>;
  /** fetch data from the table: "share_course" */
  share_course: Array<Share_Course>;
  /** fetch aggregated fields from the table: "share_course" */
  share_course_aggregate: Share_Course_Aggregate;
  /** fetch data from the table: "share_course" using primary key columns */
  share_course_by_pk?: Maybe<Share_Course>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  user_by_role: Array<User_By_Role_User>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "weekly" */
  weekly: Array<Weekly>;
  /** fetch aggregated fields from the table: "weekly" */
  weekly_aggregate: Weekly_Aggregate;
  /** fetch data from the table: "weekly" using primary key columns */
  weekly_by_pk?: Maybe<Weekly>;
};


export type Query_RootAid_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Aid_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Aid_Application_Order_By>>;
  where?: InputMaybe<Aid_Application_Bool_Exp>;
};


export type Query_RootAid_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Aid_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Aid_Application_Order_By>>;
  where?: InputMaybe<Aid_Application_Bool_Exp>;
};


export type Query_RootAid_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Order_By>>;
  where?: InputMaybe<Contest_Bool_Exp>;
};


export type Query_RootContest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Order_By>>;
  where?: InputMaybe<Contest_Bool_Exp>;
};


export type Query_RootContest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContest_CodeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Code_Order_By>>;
  where?: InputMaybe<Contest_Code_Bool_Exp>;
};


export type Query_RootContest_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Code_Order_By>>;
  where?: InputMaybe<Contest_Code_Bool_Exp>;
};


export type Query_RootContest_Code_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


export type Query_RootContest_InfoArgs = {
  distinct_on?: InputMaybe<Array<Contest_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Info_Order_By>>;
  where?: InputMaybe<Contest_Info_Bool_Exp>;
};


export type Query_RootContest_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Info_Order_By>>;
  where?: InputMaybe<Contest_Info_Bool_Exp>;
};


export type Query_RootContest_Info_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContest_ManagerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


export type Query_RootContest_Manager_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


export type Query_RootContest_Manager_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};


export type Query_RootContest_RoomArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


export type Query_RootContest_Room_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


export type Query_RootContest_Room_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
};


export type Query_RootContest_Room_TeamArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


export type Query_RootContest_Room_Team_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


export type Query_RootContest_Room_Team_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Query_RootContest_TeamArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


export type Query_RootContest_Team_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


export type Query_RootContest_Team_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


export type Query_RootContest_Team_MemberArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


export type Query_RootContest_Team_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


export type Query_RootContest_Team_Member_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['String']['input'];
};


export type Query_RootHonor_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Honor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Application_Order_By>>;
  where?: InputMaybe<Honor_Application_Bool_Exp>;
};


export type Query_RootHonor_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Application_Order_By>>;
  where?: InputMaybe<Honor_Application_Bool_Exp>;
};


export type Query_RootHonor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootHonor_TimeArgs = {
  distinct_on?: InputMaybe<Array<Honor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Time_Order_By>>;
  where?: InputMaybe<Honor_Time_Bool_Exp>;
};


export type Query_RootHonor_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Time_Order_By>>;
  where?: InputMaybe<Honor_Time_Bool_Exp>;
};


export type Query_RootHonor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


export type Query_RootHonor_TypeArgs = {
  distinct_on?: InputMaybe<Array<Honor_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Type_Order_By>>;
  where?: InputMaybe<Honor_Type_Bool_Exp>;
};


export type Query_RootHonor_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Type_Order_By>>;
  where?: InputMaybe<Honor_Type_Bool_Exp>;
};


export type Query_RootHonor_Type_By_PkArgs = {
  type_name: Scalars['String']['input'];
};


export type Query_RootInfo_NoticeArgs = {
  distinct_on?: InputMaybe<Array<Info_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Info_Notice_Order_By>>;
  where?: InputMaybe<Info_Notice_Bool_Exp>;
};


export type Query_RootInfo_Notice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Info_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Info_Notice_Order_By>>;
  where?: InputMaybe<Info_Notice_Bool_Exp>;
};


export type Query_RootInfo_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMentor_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


export type Query_RootMentor_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


export type Query_RootMentor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMentor_AvailableArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Available_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Available_Order_By>>;
  where?: InputMaybe<Mentor_Available_Bool_Exp>;
};


export type Query_RootMentor_Available_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Available_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Available_Order_By>>;
  where?: InputMaybe<Mentor_Available_Bool_Exp>;
};


export type Query_RootMentor_Available_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


export type Query_RootMentor_InfoArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};


export type Query_RootMentor_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};


export type Query_RootMentor_Info_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


export type Query_RootMentor_MessageArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Message_Order_By>>;
  where?: InputMaybe<Mentor_Message_Bool_Exp>;
};


export type Query_RootMentor_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Message_Order_By>>;
  where?: InputMaybe<Mentor_Message_Bool_Exp>;
};


export type Query_RootMentor_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootMentor_TimeArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Time_Order_By>>;
  where?: InputMaybe<Mentor_Time_Bool_Exp>;
};


export type Query_RootMentor_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Time_Order_By>>;
  where?: InputMaybe<Mentor_Time_Bool_Exp>;
};


export type Query_RootMentor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


export type Query_RootPostgraduate_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};


export type Query_RootPostgraduate_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};


export type Query_RootPostgraduate_Application_By_PkArgs = {
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


export type Query_RootPostgraduate_Application_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};


export type Query_RootPostgraduate_Application_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};


export type Query_RootPostgraduate_Application_History_By_PkArgs = {
  created_at: Scalars['timestamptz']['input'];
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


export type Query_RootPostgraduate_Mentor_InfoArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
};


export type Query_RootPostgraduate_Mentor_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
};


export type Query_RootPostgraduate_Mentor_Info_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPostgraduate_Mentor_Info_PendingArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
};


export type Query_RootPostgraduate_Mentor_Info_Pending_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
};


export type Query_RootPostgraduate_Mentor_Info_Pending_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootScholarship_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Scholarship_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarship_Application_Order_By>>;
  where?: InputMaybe<Scholarship_Application_Bool_Exp>;
};


export type Query_RootScholarship_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scholarship_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarship_Application_Order_By>>;
  where?: InputMaybe<Scholarship_Application_Bool_Exp>;
};


export type Query_RootScholarship_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootScholarships_AidsArgs = {
  distinct_on?: InputMaybe<Array<Scholarships_Aids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarships_Aids_Order_By>>;
  where?: InputMaybe<Scholarships_Aids_Bool_Exp>;
};


export type Query_RootScholarships_Aids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scholarships_Aids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarships_Aids_Order_By>>;
  where?: InputMaybe<Scholarships_Aids_Bool_Exp>;
};


export type Query_RootScholarships_Aids_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Query_RootShare_CourseArgs = {
  distinct_on?: InputMaybe<Array<Share_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Share_Course_Order_By>>;
  where?: InputMaybe<Share_Course_Bool_Exp>;
};


export type Query_RootShare_Course_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Share_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Share_Course_Order_By>>;
  where?: InputMaybe<Share_Course_Bool_Exp>;
};


export type Query_RootShare_Course_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  _id: Scalars['String']['input'];
};


export type Query_RootUser_By_RoleArgs = {
  role: Scalars['String']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


export type Query_RootWeeklyArgs = {
  distinct_on?: InputMaybe<Array<Weekly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weekly_Order_By>>;
  where?: InputMaybe<Weekly_Bool_Exp>;
};


export type Query_RootWeekly_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weekly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weekly_Order_By>>;
  where?: InputMaybe<Weekly_Bool_Exp>;
};


export type Query_RootWeekly_By_PkArgs = {
  id: Scalars['Int']['input'];
};

/** columns and relationships of "scholarship_application" */
export type Scholarship_Application = {
  __typename?: 'scholarship_application';
  amount: Scalars['Int']['output'];
  code: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  form_url?: Maybe<Scalars['String']['output']>;
  honor: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  scholarship: Scalars['String']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  student: User;
  /** An object relationship */
  student_byuuid?: Maybe<Users>;
  student_id: Scalars['String']['output'];
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "scholarship_application" */
export type Scholarship_Application_Aggregate = {
  __typename?: 'scholarship_application_aggregate';
  aggregate?: Maybe<Scholarship_Application_Aggregate_Fields>;
  nodes: Array<Scholarship_Application>;
};

/** aggregate fields of "scholarship_application" */
export type Scholarship_Application_Aggregate_Fields = {
  __typename?: 'scholarship_application_aggregate_fields';
  avg?: Maybe<Scholarship_Application_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Scholarship_Application_Max_Fields>;
  min?: Maybe<Scholarship_Application_Min_Fields>;
  stddev?: Maybe<Scholarship_Application_Stddev_Fields>;
  stddev_pop?: Maybe<Scholarship_Application_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Scholarship_Application_Stddev_Samp_Fields>;
  sum?: Maybe<Scholarship_Application_Sum_Fields>;
  var_pop?: Maybe<Scholarship_Application_Var_Pop_Fields>;
  var_samp?: Maybe<Scholarship_Application_Var_Samp_Fields>;
  variance?: Maybe<Scholarship_Application_Variance_Fields>;
};


/** aggregate fields of "scholarship_application" */
export type Scholarship_Application_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scholarship_Application_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Scholarship_Application_Avg_Fields = {
  __typename?: 'scholarship_application_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "scholarship_application". All fields are combined with a logical 'AND'. */
export type Scholarship_Application_Bool_Exp = {
  _and?: InputMaybe<Array<Scholarship_Application_Bool_Exp>>;
  _not?: InputMaybe<Scholarship_Application_Bool_Exp>;
  _or?: InputMaybe<Array<Scholarship_Application_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form_url?: InputMaybe<String_Comparison_Exp>;
  honor?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  scholarship?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<User_Bool_Exp>;
  student_byuuid?: InputMaybe<Users_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  thank_letter?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "scholarship_application" */
export enum Scholarship_Application_Constraint {
  /** unique or primary key constraint on columns "id" */
  ScholarshipApplicationPkey1 = 'scholarship_application_pkey1'
}

/** input type for incrementing numeric columns in table "scholarship_application" */
export type Scholarship_Application_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "scholarship_application" */
export type Scholarship_Application_Insert_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
  honor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  scholarship?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<User_Obj_Rel_Insert_Input>;
  student_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Scholarship_Application_Max_Fields = {
  __typename?: 'scholarship_application_max_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_url?: Maybe<Scalars['String']['output']>;
  honor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  scholarship?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Scholarship_Application_Min_Fields = {
  __typename?: 'scholarship_application_min_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_url?: Maybe<Scalars['String']['output']>;
  honor?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  scholarship?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  thank_letter?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "scholarship_application" */
export type Scholarship_Application_Mutation_Response = {
  __typename?: 'scholarship_application_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Scholarship_Application>;
};

/** on_conflict condition type for table "scholarship_application" */
export type Scholarship_Application_On_Conflict = {
  constraint: Scholarship_Application_Constraint;
  update_columns?: Array<Scholarship_Application_Update_Column>;
  where?: InputMaybe<Scholarship_Application_Bool_Exp>;
};

/** Ordering options when selecting data from "scholarship_application". */
export type Scholarship_Application_Order_By = {
  amount?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_url?: InputMaybe<Order_By>;
  honor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scholarship?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student?: InputMaybe<User_Order_By>;
  student_byuuid?: InputMaybe<Users_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  thank_letter?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scholarship_application */
export type Scholarship_Application_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "scholarship_application" */
export enum Scholarship_Application_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormUrl = 'form_url',
  /** column name */
  Honor = 'honor',
  /** column name */
  Id = 'id',
  /** column name */
  Scholarship = 'scholarship',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  ThankLetter = 'thank_letter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "scholarship_application" */
export type Scholarship_Application_Set_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
  honor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  scholarship?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Scholarship_Application_Stddev_Fields = {
  __typename?: 'scholarship_application_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Scholarship_Application_Stddev_Pop_Fields = {
  __typename?: 'scholarship_application_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Scholarship_Application_Stddev_Samp_Fields = {
  __typename?: 'scholarship_application_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Scholarship_Application_Sum_Fields = {
  __typename?: 'scholarship_application_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "scholarship_application" */
export enum Scholarship_Application_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormUrl = 'form_url',
  /** column name */
  Honor = 'honor',
  /** column name */
  Id = 'id',
  /** column name */
  Scholarship = 'scholarship',
  /** column name */
  Status = 'status',
  /** column name */
  StudentId = 'student_id',
  /** column name */
  StudentUuid = 'student_uuid',
  /** column name */
  ThankLetter = 'thank_letter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Scholarship_Application_Var_Pop_Fields = {
  __typename?: 'scholarship_application_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Scholarship_Application_Var_Samp_Fields = {
  __typename?: 'scholarship_application_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Scholarship_Application_Variance_Fields = {
  __typename?: 'scholarship_application_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "scholarships_aids" */
export type Scholarships_Aids = {
  __typename?: 'scholarships_aids';
  IsAids: Scalars['Boolean']['output'];
  amount: Scalars['Int']['output'];
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  salutation?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** aggregated selection of "scholarships_aids" */
export type Scholarships_Aids_Aggregate = {
  __typename?: 'scholarships_aids_aggregate';
  aggregate?: Maybe<Scholarships_Aids_Aggregate_Fields>;
  nodes: Array<Scholarships_Aids>;
};

/** aggregate fields of "scholarships_aids" */
export type Scholarships_Aids_Aggregate_Fields = {
  __typename?: 'scholarships_aids_aggregate_fields';
  avg?: Maybe<Scholarships_Aids_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Scholarships_Aids_Max_Fields>;
  min?: Maybe<Scholarships_Aids_Min_Fields>;
  stddev?: Maybe<Scholarships_Aids_Stddev_Fields>;
  stddev_pop?: Maybe<Scholarships_Aids_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Scholarships_Aids_Stddev_Samp_Fields>;
  sum?: Maybe<Scholarships_Aids_Sum_Fields>;
  var_pop?: Maybe<Scholarships_Aids_Var_Pop_Fields>;
  var_samp?: Maybe<Scholarships_Aids_Var_Samp_Fields>;
  variance?: Maybe<Scholarships_Aids_Variance_Fields>;
};


/** aggregate fields of "scholarships_aids" */
export type Scholarships_Aids_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scholarships_Aids_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Scholarships_Aids_Avg_Fields = {
  __typename?: 'scholarships_aids_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "scholarships_aids". All fields are combined with a logical 'AND'. */
export type Scholarships_Aids_Bool_Exp = {
  IsAids?: InputMaybe<Boolean_Comparison_Exp>;
  _and?: InputMaybe<Array<Scholarships_Aids_Bool_Exp>>;
  _not?: InputMaybe<Scholarships_Aids_Bool_Exp>;
  _or?: InputMaybe<Array<Scholarships_Aids_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  salutation?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "scholarships_aids" */
export enum Scholarships_Aids_Constraint {
  /** unique or primary key constraint on columns "code" */
  ScholarshipsPkey = 'scholarships_pkey'
}

/** input type for incrementing numeric columns in table "scholarships_aids" */
export type Scholarships_Aids_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "scholarships_aids" */
export type Scholarships_Aids_Insert_Input = {
  IsAids?: InputMaybe<Scalars['Boolean']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  salutation?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Scholarships_Aids_Max_Fields = {
  __typename?: 'scholarships_aids_max_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  salutation?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Scholarships_Aids_Min_Fields = {
  __typename?: 'scholarships_aids_min_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  salutation?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "scholarships_aids" */
export type Scholarships_Aids_Mutation_Response = {
  __typename?: 'scholarships_aids_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Scholarships_Aids>;
};

/** on_conflict condition type for table "scholarships_aids" */
export type Scholarships_Aids_On_Conflict = {
  constraint: Scholarships_Aids_Constraint;
  update_columns?: Array<Scholarships_Aids_Update_Column>;
  where?: InputMaybe<Scholarships_Aids_Bool_Exp>;
};

/** Ordering options when selecting data from "scholarships_aids". */
export type Scholarships_Aids_Order_By = {
  IsAids?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  salutation?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scholarships_aids */
export type Scholarships_Aids_Pk_Columns_Input = {
  code: Scalars['String']['input'];
};

/** select columns of table "scholarships_aids" */
export enum Scholarships_Aids_Select_Column {
  /** column name */
  IsAids = 'IsAids',
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  Name = 'name',
  /** column name */
  Salutation = 'salutation',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "scholarships_aids" */
export type Scholarships_Aids_Set_Input = {
  IsAids?: InputMaybe<Scalars['Boolean']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  salutation?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Scholarships_Aids_Stddev_Fields = {
  __typename?: 'scholarships_aids_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Scholarships_Aids_Stddev_Pop_Fields = {
  __typename?: 'scholarships_aids_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Scholarships_Aids_Stddev_Samp_Fields = {
  __typename?: 'scholarships_aids_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Scholarships_Aids_Sum_Fields = {
  __typename?: 'scholarships_aids_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "scholarships_aids" */
export enum Scholarships_Aids_Update_Column {
  /** column name */
  IsAids = 'IsAids',
  /** column name */
  Amount = 'amount',
  /** column name */
  Code = 'code',
  /** column name */
  Name = 'name',
  /** column name */
  Salutation = 'salutation',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type Scholarships_Aids_Var_Pop_Fields = {
  __typename?: 'scholarships_aids_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Scholarships_Aids_Var_Samp_Fields = {
  __typename?: 'scholarships_aids_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Scholarships_Aids_Variance_Fields = {
  __typename?: 'scholarships_aids_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** 所有电子系的课程，用于课程评测 */
export type Share_Course = {
  __typename?: 'share_course';
  code: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  professor: Scalars['String']['output'];
  semester: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uuid: Scalars['uuid']['output'];
  year: Scalars['Int']['output'];
};

/** aggregated selection of "share_course" */
export type Share_Course_Aggregate = {
  __typename?: 'share_course_aggregate';
  aggregate?: Maybe<Share_Course_Aggregate_Fields>;
  nodes: Array<Share_Course>;
};

/** aggregate fields of "share_course" */
export type Share_Course_Aggregate_Fields = {
  __typename?: 'share_course_aggregate_fields';
  avg?: Maybe<Share_Course_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Share_Course_Max_Fields>;
  min?: Maybe<Share_Course_Min_Fields>;
  stddev?: Maybe<Share_Course_Stddev_Fields>;
  stddev_pop?: Maybe<Share_Course_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Share_Course_Stddev_Samp_Fields>;
  sum?: Maybe<Share_Course_Sum_Fields>;
  var_pop?: Maybe<Share_Course_Var_Pop_Fields>;
  var_samp?: Maybe<Share_Course_Var_Samp_Fields>;
  variance?: Maybe<Share_Course_Variance_Fields>;
};


/** aggregate fields of "share_course" */
export type Share_Course_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Share_Course_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Share_Course_Avg_Fields = {
  __typename?: 'share_course_avg_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "share_course". All fields are combined with a logical 'AND'. */
export type Share_Course_Bool_Exp = {
  _and?: InputMaybe<Array<Share_Course_Bool_Exp>>;
  _not?: InputMaybe<Share_Course_Bool_Exp>;
  _or?: InputMaybe<Array<Share_Course_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  fullname?: InputMaybe<String_Comparison_Exp>;
  language?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  professor?: InputMaybe<String_Comparison_Exp>;
  semester?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "share_course" */
export enum Share_Course_Constraint {
  /** unique or primary key constraint on columns "uuid" */
  ShareCoursePkey = 'share_course_pkey'
}

/** input type for incrementing numeric columns in table "share_course" */
export type Share_Course_Inc_Input = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "share_course" */
export type Share_Course_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  professor?: InputMaybe<Scalars['String']['input']>;
  semester?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['uuid']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Share_Course_Max_Fields = {
  __typename?: 'share_course_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  professor?: Maybe<Scalars['String']['output']>;
  semester?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['uuid']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Share_Course_Min_Fields = {
  __typename?: 'share_course_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  professor?: Maybe<Scalars['String']['output']>;
  semester?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['uuid']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "share_course" */
export type Share_Course_Mutation_Response = {
  __typename?: 'share_course_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Share_Course>;
};

/** on_conflict condition type for table "share_course" */
export type Share_Course_On_Conflict = {
  constraint: Share_Course_Constraint;
  update_columns?: Array<Share_Course_Update_Column>;
  where?: InputMaybe<Share_Course_Bool_Exp>;
};

/** Ordering options when selecting data from "share_course". */
export type Share_Course_Order_By = {
  code?: InputMaybe<Order_By>;
  fullname?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  professor?: InputMaybe<Order_By>;
  semester?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: share_course */
export type Share_Course_Pk_Columns_Input = {
  uuid: Scalars['uuid']['input'];
};

/** select columns of table "share_course" */
export enum Share_Course_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Fullname = 'fullname',
  /** column name */
  Language = 'language',
  /** column name */
  Name = 'name',
  /** column name */
  Professor = 'professor',
  /** column name */
  Semester = 'semester',
  /** column name */
  Type = 'type',
  /** column name */
  Uuid = 'uuid',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "share_course" */
export type Share_Course_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  professor?: InputMaybe<Scalars['String']['input']>;
  semester?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['uuid']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Share_Course_Stddev_Fields = {
  __typename?: 'share_course_stddev_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Share_Course_Stddev_Pop_Fields = {
  __typename?: 'share_course_stddev_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Share_Course_Stddev_Samp_Fields = {
  __typename?: 'share_course_stddev_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Share_Course_Sum_Fields = {
  __typename?: 'share_course_sum_fields';
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "share_course" */
export enum Share_Course_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Fullname = 'fullname',
  /** column name */
  Language = 'language',
  /** column name */
  Name = 'name',
  /** column name */
  Professor = 'professor',
  /** column name */
  Semester = 'semester',
  /** column name */
  Type = 'type',
  /** column name */
  Uuid = 'uuid',
  /** column name */
  Year = 'year'
}

/** aggregate var_pop on columns */
export type Share_Course_Var_Pop_Fields = {
  __typename?: 'share_course_var_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Share_Course_Var_Samp_Fields = {
  __typename?: 'share_course_var_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Share_Course_Variance_Fields = {
  __typename?: 'share_course_variance_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "aid_application" */
  aid_application: Array<Aid_Application>;
  /** fetch aggregated fields from the table: "aid_application" */
  aid_application_aggregate: Aid_Application_Aggregate;
  /** fetch data from the table: "aid_application" using primary key columns */
  aid_application_by_pk?: Maybe<Aid_Application>;
  /** fetch data from the table: "contest" */
  contest: Array<Contest>;
  /** fetch aggregated fields from the table: "contest" */
  contest_aggregate: Contest_Aggregate;
  /** fetch data from the table: "contest" using primary key columns */
  contest_by_pk?: Maybe<Contest>;
  /** fetch data from the table: "contest_code" */
  contest_code: Array<Contest_Code>;
  /** fetch aggregated fields from the table: "contest_code" */
  contest_code_aggregate: Contest_Code_Aggregate;
  /** fetch data from the table: "contest_code" using primary key columns */
  contest_code_by_pk?: Maybe<Contest_Code>;
  /** fetch data from the table: "contest_info" */
  contest_info: Array<Contest_Info>;
  /** fetch aggregated fields from the table: "contest_info" */
  contest_info_aggregate: Contest_Info_Aggregate;
  /** fetch data from the table: "contest_info" using primary key columns */
  contest_info_by_pk?: Maybe<Contest_Info>;
  /** fetch data from the table: "contest_manager" */
  contest_manager: Array<Contest_Manager>;
  /** fetch aggregated fields from the table: "contest_manager" */
  contest_manager_aggregate: Contest_Manager_Aggregate;
  /** fetch data from the table: "contest_manager" using primary key columns */
  contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** fetch data from the table: "contest_room" */
  contest_room: Array<Contest_Room>;
  /** fetch aggregated fields from the table: "contest_room" */
  contest_room_aggregate: Contest_Room_Aggregate;
  /** fetch data from the table: "contest_room" using primary key columns */
  contest_room_by_pk?: Maybe<Contest_Room>;
  /** fetch data from the table: "contest_room_team" */
  contest_room_team: Array<Contest_Room_Team>;
  /** fetch aggregated fields from the table: "contest_room_team" */
  contest_room_team_aggregate: Contest_Room_Team_Aggregate;
  /** fetch data from the table: "contest_room_team" using primary key columns */
  contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** fetch data from the table: "contest_team" */
  contest_team: Array<Contest_Team>;
  /** fetch aggregated fields from the table: "contest_team" */
  contest_team_aggregate: Contest_Team_Aggregate;
  /** fetch data from the table: "contest_team" using primary key columns */
  contest_team_by_pk?: Maybe<Contest_Team>;
  /** fetch data from the table: "contest_team_member" */
  contest_team_member: Array<Contest_Team_Member>;
  /** fetch aggregated fields from the table: "contest_team_member" */
  contest_team_member_aggregate: Contest_Team_Member_Aggregate;
  /** fetch data from the table: "contest_team_member" using primary key columns */
  contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** fetch data from the table: "honor_application" */
  honor_application: Array<Honor_Application>;
  /** fetch aggregated fields from the table: "honor_application" */
  honor_application_aggregate: Honor_Application_Aggregate;
  /** fetch data from the table: "honor_application" using primary key columns */
  honor_application_by_pk?: Maybe<Honor_Application>;
  /** fetch data from the table: "honor_time" */
  honor_time: Array<Honor_Time>;
  /** fetch aggregated fields from the table: "honor_time" */
  honor_time_aggregate: Honor_Time_Aggregate;
  /** fetch data from the table: "honor_time" using primary key columns */
  honor_time_by_pk?: Maybe<Honor_Time>;
  /** fetch data from the table: "honor_type" */
  honor_type: Array<Honor_Type>;
  /** fetch aggregated fields from the table: "honor_type" */
  honor_type_aggregate: Honor_Type_Aggregate;
  /** fetch data from the table: "honor_type" using primary key columns */
  honor_type_by_pk?: Maybe<Honor_Type>;
  /** fetch data from the table: "info_notice" */
  info_notice: Array<Info_Notice>;
  /** fetch aggregated fields from the table: "info_notice" */
  info_notice_aggregate: Info_Notice_Aggregate;
  /** fetch data from the table: "info_notice" using primary key columns */
  info_notice_by_pk?: Maybe<Info_Notice>;
  /** fetch data from the table: "mentor_application" */
  mentor_application: Array<Mentor_Application>;
  /** fetch aggregated fields from the table: "mentor_application" */
  mentor_application_aggregate: Mentor_Application_Aggregate;
  /** fetch data from the table: "mentor_application" using primary key columns */
  mentor_application_by_pk?: Maybe<Mentor_Application>;
  /** fetch data from the table: "mentor_available" */
  mentor_available: Array<Mentor_Available>;
  /** fetch aggregated fields from the table: "mentor_available" */
  mentor_available_aggregate: Mentor_Available_Aggregate;
  /** fetch data from the table: "mentor_available" using primary key columns */
  mentor_available_by_pk?: Maybe<Mentor_Available>;
  /** An array relationship */
  mentor_info: Array<Mentor_Info>;
  /** An aggregate relationship */
  mentor_info_aggregate: Mentor_Info_Aggregate;
  /** fetch data from the table: "mentor_info" using primary key columns */
  mentor_info_by_pk?: Maybe<Mentor_Info>;
  /** fetch data from the table: "mentor_message" */
  mentor_message: Array<Mentor_Message>;
  /** fetch aggregated fields from the table: "mentor_message" */
  mentor_message_aggregate: Mentor_Message_Aggregate;
  /** fetch data from the table: "mentor_message" using primary key columns */
  mentor_message_by_pk?: Maybe<Mentor_Message>;
  /** fetch data from the table: "mentor_time" */
  mentor_time: Array<Mentor_Time>;
  /** fetch aggregated fields from the table: "mentor_time" */
  mentor_time_aggregate: Mentor_Time_Aggregate;
  /** fetch data from the table: "mentor_time" using primary key columns */
  mentor_time_by_pk?: Maybe<Mentor_Time>;
  /** fetch data from the table: "postgraduate_application" */
  postgraduate_application: Array<Postgraduate_Application>;
  /** fetch aggregated fields from the table: "postgraduate_application" */
  postgraduate_application_aggregate: Postgraduate_Application_Aggregate;
  /** fetch data from the table: "postgraduate_application" using primary key columns */
  postgraduate_application_by_pk?: Maybe<Postgraduate_Application>;
  /** fetch data from the table: "postgraduate_application_history" */
  postgraduate_application_history: Array<Postgraduate_Application_History>;
  /** fetch aggregated fields from the table: "postgraduate_application_history" */
  postgraduate_application_history_aggregate: Postgraduate_Application_History_Aggregate;
  /** fetch data from the table: "postgraduate_application_history" using primary key columns */
  postgraduate_application_history_by_pk?: Maybe<Postgraduate_Application_History>;
  /** fetch data from the table: "postgraduate_mentor_info" */
  postgraduate_mentor_info: Array<Postgraduate_Mentor_Info>;
  /** fetch aggregated fields from the table: "postgraduate_mentor_info" */
  postgraduate_mentor_info_aggregate: Postgraduate_Mentor_Info_Aggregate;
  /** fetch data from the table: "postgraduate_mentor_info" using primary key columns */
  postgraduate_mentor_info_by_pk?: Maybe<Postgraduate_Mentor_Info>;
  /** fetch data from the table: "postgraduate_mentor_info_pending" */
  postgraduate_mentor_info_pending: Array<Postgraduate_Mentor_Info_Pending>;
  /** fetch aggregated fields from the table: "postgraduate_mentor_info_pending" */
  postgraduate_mentor_info_pending_aggregate: Postgraduate_Mentor_Info_Pending_Aggregate;
  /** fetch data from the table: "postgraduate_mentor_info_pending" using primary key columns */
  postgraduate_mentor_info_pending_by_pk?: Maybe<Postgraduate_Mentor_Info_Pending>;
  /** fetch data from the table: "scholarship_application" */
  scholarship_application: Array<Scholarship_Application>;
  /** fetch aggregated fields from the table: "scholarship_application" */
  scholarship_application_aggregate: Scholarship_Application_Aggregate;
  /** fetch data from the table: "scholarship_application" using primary key columns */
  scholarship_application_by_pk?: Maybe<Scholarship_Application>;
  /** fetch data from the table: "scholarships_aids" */
  scholarships_aids: Array<Scholarships_Aids>;
  /** fetch aggregated fields from the table: "scholarships_aids" */
  scholarships_aids_aggregate: Scholarships_Aids_Aggregate;
  /** fetch data from the table: "scholarships_aids" using primary key columns */
  scholarships_aids_by_pk?: Maybe<Scholarships_Aids>;
  /** fetch data from the table: "share_course" */
  share_course: Array<Share_Course>;
  /** fetch aggregated fields from the table: "share_course" */
  share_course_aggregate: Share_Course_Aggregate;
  /** fetch data from the table: "share_course" using primary key columns */
  share_course_by_pk?: Maybe<Share_Course>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "weekly" */
  weekly: Array<Weekly>;
  /** fetch aggregated fields from the table: "weekly" */
  weekly_aggregate: Weekly_Aggregate;
  /** fetch data from the table: "weekly" using primary key columns */
  weekly_by_pk?: Maybe<Weekly>;
};


export type Subscription_RootAid_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Aid_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Aid_Application_Order_By>>;
  where?: InputMaybe<Aid_Application_Bool_Exp>;
};


export type Subscription_RootAid_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Aid_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Aid_Application_Order_By>>;
  where?: InputMaybe<Aid_Application_Bool_Exp>;
};


export type Subscription_RootAid_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContestArgs = {
  distinct_on?: InputMaybe<Array<Contest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Order_By>>;
  where?: InputMaybe<Contest_Bool_Exp>;
};


export type Subscription_RootContest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Order_By>>;
  where?: InputMaybe<Contest_Bool_Exp>;
};


export type Subscription_RootContest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_CodeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Code_Order_By>>;
  where?: InputMaybe<Contest_Code_Bool_Exp>;
};


export type Subscription_RootContest_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Code_Order_By>>;
  where?: InputMaybe<Contest_Code_Bool_Exp>;
};


export type Subscription_RootContest_Code_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_InfoArgs = {
  distinct_on?: InputMaybe<Array<Contest_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Info_Order_By>>;
  where?: InputMaybe<Contest_Info_Bool_Exp>;
};


export type Subscription_RootContest_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Info_Order_By>>;
  where?: InputMaybe<Contest_Info_Bool_Exp>;
};


export type Subscription_RootContest_Info_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_ManagerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


export type Subscription_RootContest_Manager_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


export type Subscription_RootContest_Manager_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};


export type Subscription_RootContest_RoomArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


export type Subscription_RootContest_Room_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


export type Subscription_RootContest_Room_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_Room_TeamArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


export type Subscription_RootContest_Room_Team_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


export type Subscription_RootContest_Room_Team_By_PkArgs = {
  room_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_TeamArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


export type Subscription_RootContest_Team_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


export type Subscription_RootContest_Team_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_Team_MemberArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


export type Subscription_RootContest_Team_Member_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


export type Subscription_RootContest_Team_Member_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['String']['input'];
};


export type Subscription_RootHonor_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Honor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Application_Order_By>>;
  where?: InputMaybe<Honor_Application_Bool_Exp>;
};


export type Subscription_RootHonor_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Application_Order_By>>;
  where?: InputMaybe<Honor_Application_Bool_Exp>;
};


export type Subscription_RootHonor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHonor_TimeArgs = {
  distinct_on?: InputMaybe<Array<Honor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Time_Order_By>>;
  where?: InputMaybe<Honor_Time_Bool_Exp>;
};


export type Subscription_RootHonor_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Time_Order_By>>;
  where?: InputMaybe<Honor_Time_Bool_Exp>;
};


export type Subscription_RootHonor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


export type Subscription_RootHonor_TypeArgs = {
  distinct_on?: InputMaybe<Array<Honor_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Type_Order_By>>;
  where?: InputMaybe<Honor_Type_Bool_Exp>;
};


export type Subscription_RootHonor_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Honor_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Honor_Type_Order_By>>;
  where?: InputMaybe<Honor_Type_Bool_Exp>;
};


export type Subscription_RootHonor_Type_By_PkArgs = {
  type_name: Scalars['String']['input'];
};


export type Subscription_RootInfo_NoticeArgs = {
  distinct_on?: InputMaybe<Array<Info_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Info_Notice_Order_By>>;
  where?: InputMaybe<Info_Notice_Bool_Exp>;
};


export type Subscription_RootInfo_Notice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Info_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Info_Notice_Order_By>>;
  where?: InputMaybe<Info_Notice_Bool_Exp>;
};


export type Subscription_RootInfo_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootMentor_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


export type Subscription_RootMentor_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


export type Subscription_RootMentor_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootMentor_AvailableArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Available_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Available_Order_By>>;
  where?: InputMaybe<Mentor_Available_Bool_Exp>;
};


export type Subscription_RootMentor_Available_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Available_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Available_Order_By>>;
  where?: InputMaybe<Mentor_Available_Bool_Exp>;
};


export type Subscription_RootMentor_Available_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


export type Subscription_RootMentor_InfoArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};


export type Subscription_RootMentor_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};


export type Subscription_RootMentor_Info_By_PkArgs = {
  mentor_uuid: Scalars['uuid']['input'];
};


export type Subscription_RootMentor_MessageArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Message_Order_By>>;
  where?: InputMaybe<Mentor_Message_Bool_Exp>;
};


export type Subscription_RootMentor_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Message_Order_By>>;
  where?: InputMaybe<Mentor_Message_Bool_Exp>;
};


export type Subscription_RootMentor_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootMentor_TimeArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Time_Order_By>>;
  where?: InputMaybe<Mentor_Time_Bool_Exp>;
};


export type Subscription_RootMentor_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Time_Order_By>>;
  where?: InputMaybe<Mentor_Time_Bool_Exp>;
};


export type Subscription_RootMentor_Time_By_PkArgs = {
  activateIn: Scalars['Int']['input'];
};


export type Subscription_RootPostgraduate_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Application_By_PkArgs = {
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


export type Subscription_RootPostgraduate_Application_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Application_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Application_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Application_History_Order_By>>;
  where?: InputMaybe<Postgraduate_Application_History_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Application_History_By_PkArgs = {
  created_at: Scalars['timestamptz']['input'];
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
};


export type Subscription_RootPostgraduate_Mentor_InfoArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Mentor_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Mentor_Info_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPostgraduate_Mentor_Info_PendingArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Mentor_Info_Pending_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Postgraduate_Mentor_Info_Pending_Order_By>>;
  where?: InputMaybe<Postgraduate_Mentor_Info_Pending_Bool_Exp>;
};


export type Subscription_RootPostgraduate_Mentor_Info_Pending_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootScholarship_ApplicationArgs = {
  distinct_on?: InputMaybe<Array<Scholarship_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarship_Application_Order_By>>;
  where?: InputMaybe<Scholarship_Application_Bool_Exp>;
};


export type Subscription_RootScholarship_Application_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scholarship_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarship_Application_Order_By>>;
  where?: InputMaybe<Scholarship_Application_Bool_Exp>;
};


export type Subscription_RootScholarship_Application_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootScholarships_AidsArgs = {
  distinct_on?: InputMaybe<Array<Scholarships_Aids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarships_Aids_Order_By>>;
  where?: InputMaybe<Scholarships_Aids_Bool_Exp>;
};


export type Subscription_RootScholarships_Aids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scholarships_Aids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scholarships_Aids_Order_By>>;
  where?: InputMaybe<Scholarships_Aids_Bool_Exp>;
};


export type Subscription_RootScholarships_Aids_By_PkArgs = {
  code: Scalars['String']['input'];
};


export type Subscription_RootShare_CourseArgs = {
  distinct_on?: InputMaybe<Array<Share_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Share_Course_Order_By>>;
  where?: InputMaybe<Share_Course_Bool_Exp>;
};


export type Subscription_RootShare_Course_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Share_Course_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Share_Course_Order_By>>;
  where?: InputMaybe<Share_Course_Bool_Exp>;
};


export type Subscription_RootShare_Course_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  _id: Scalars['String']['input'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  uuid: Scalars['uuid']['input'];
};


export type Subscription_RootWeeklyArgs = {
  distinct_on?: InputMaybe<Array<Weekly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weekly_Order_By>>;
  where?: InputMaybe<Weekly_Bool_Exp>;
};


export type Subscription_RootWeekly_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weekly_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weekly_Order_By>>;
  where?: InputMaybe<Weekly_Bool_Exp>;
};


export type Subscription_RootWeekly_By_PkArgs = {
  id: Scalars['Int']['input'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  _id: Scalars['String']['output'];
  class?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  contest_team_members: Array<Contest_Team_Member>;
  /** An aggregate relationship */
  contest_team_members_aggregate: Contest_Team_Member_Aggregate;
  /** An array relationship */
  contest_teams: Array<Contest_Team>;
  /** An aggregate relationship */
  contest_teams_aggregate: Contest_Team_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** An array relationship */
  mentor_applications_mentor: Array<Mentor_Application>;
  /** An aggregate relationship */
  mentor_applications_mentor_aggregate: Mentor_Application_Aggregate;
  /** An array relationship */
  mentor_applications_student: Array<Mentor_Application>;
  /** An aggregate relationship */
  mentor_applications_student_aggregate: Mentor_Application_Aggregate;
  /** An object relationship */
  mentor_available?: Maybe<Mentor_Available>;
  /** An array relationship */
  mentor_info: Array<Mentor_Info>;
  /** An aggregate relationship */
  mentor_info_aggregate: Mentor_Info_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  username?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "user" */
export type UserContest_Team_MembersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserContest_Team_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserContest_TeamsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserContest_Teams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_Applications_MentorArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_Applications_Mentor_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_Applications_StudentArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_Applications_Student_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_InfoArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMentor_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Info_Order_By>>;
  where?: InputMaybe<Mentor_Info_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _id?: InputMaybe<String_Comparison_Exp>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  class?: InputMaybe<String_Comparison_Exp>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Bool_Exp>;
  contest_teams?: InputMaybe<Contest_Team_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  department?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  mentor_applications_mentor?: InputMaybe<Mentor_Application_Bool_Exp>;
  mentor_applications_student?: InputMaybe<Mentor_Application_Bool_Exp>;
  mentor_available?: InputMaybe<Mentor_Available_Bool_Exp>;
  mentor_info?: InputMaybe<Mentor_Info_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

export type User_By_Role_User = {
  __typename?: 'user_by_role_user';
  _id: Scalars['String']['output'];
  department: Scalars['String']['output'];
  name: Scalars['String']['output'];
  user?: Maybe<User>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "_id" */
  UserIdKey = 'user_id_key',
  /** unique or primary key constraint on columns "_id" */
  UserPkey = 'user_pkey',
  /** unique or primary key constraint on columns "id" */
  UserStudentIdKey = 'user_student_id_key',
  /** unique or primary key constraint on columns "username" */
  UserUsernameKey = 'user_username_key'
}

/** input type for incrementing numeric columns in table "user" */
export type User_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  _id?: InputMaybe<Scalars['String']['input']>;
  class?: InputMaybe<Scalars['String']['input']>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Arr_Rel_Insert_Input>;
  contest_teams?: InputMaybe<Contest_Team_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  mentor_applications_mentor?: InputMaybe<Mentor_Application_Arr_Rel_Insert_Input>;
  mentor_applications_student?: InputMaybe<Mentor_Application_Arr_Rel_Insert_Input>;
  mentor_available?: InputMaybe<Mentor_Available_Obj_Rel_Insert_Input>;
  mentor_info?: InputMaybe<Mentor_Info_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  _id?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  _id?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  _id?: InputMaybe<Order_By>;
  class?: InputMaybe<Order_By>;
  contest_team_members_aggregate?: InputMaybe<Contest_Team_Member_Aggregate_Order_By>;
  contest_teams_aggregate?: InputMaybe<Contest_Team_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  department?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor_applications_mentor_aggregate?: InputMaybe<Mentor_Application_Aggregate_Order_By>;
  mentor_applications_student_aggregate?: InputMaybe<Mentor_Application_Aggregate_Order_By>;
  mentor_available?: InputMaybe<Mentor_Available_Order_By>;
  mentor_info_aggregate?: InputMaybe<Mentor_Info_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  _id: Scalars['String']['input'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  _Id = '_id',
  /** column name */
  Class = 'class',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  _id?: InputMaybe<Scalars['String']['input']>;
  class?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  _Id = '_id',
  /** column name */
  Class = 'class',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  class?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  contest_team_members: Array<Contest_Team_Member>;
  /** An aggregate relationship */
  contest_team_members_aggregate: Contest_Team_Member_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  github_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  mentor_application_as_mentor: Array<Mentor_Application>;
  /** An aggregate relationship */
  mentor_application_as_mentor_aggregate: Mentor_Application_Aggregate;
  /** An array relationship */
  mentor_application_as_student: Array<Mentor_Application>;
  /** An aggregate relationship */
  mentor_application_as_student_aggregate: Mentor_Application_Aggregate;
  /** An object relationship */
  mentor_available?: Maybe<Mentor_Available>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  realname?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  student_no?: Maybe<Scalars['String']['output']>;
  tsinghua_email?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  username?: Maybe<Scalars['String']['output']>;
  uuid: Scalars['uuid']['output'];
};


/** columns and relationships of "users" */
export type UsersContest_Team_MembersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersContest_Team_Members_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Member_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Member_Order_By>>;
  where?: InputMaybe<Contest_Team_Member_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersMentor_Application_As_MentorArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersMentor_Application_As_Mentor_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersMentor_Application_As_StudentArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersMentor_Application_As_Student_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Mentor_Application_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mentor_Application_Order_By>>;
  where?: InputMaybe<Mentor_Application_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  class?: InputMaybe<String_Comparison_Exp>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  department?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  github_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  mentor_application_as_mentor?: InputMaybe<Mentor_Application_Bool_Exp>;
  mentor_application_as_student?: InputMaybe<Mentor_Application_Bool_Exp>;
  mentor_available?: InputMaybe<Mentor_Available_Bool_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  realname?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  student_no?: InputMaybe<String_Comparison_Exp>;
  tsinghua_email?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "github_id" */
  UsersGithubIdKey = 'users_github_id_key',
  /** unique or primary key constraint on columns "id" */
  UsersIdKey = 'users_id_key',
  /** unique or primary key constraint on columns "phone" */
  UsersPhoneKey = 'users_phone_key',
  /** unique or primary key constraint on columns "uuid" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "student_no" */
  UsersStudentNoKey = 'users_student_no_key',
  /** unique or primary key constraint on columns "tsinghua_email" */
  UsersTsinghuaEmailKey = 'users_tsinghua_email_key',
  /** unique or primary key constraint on columns "username" */
  UsersUsernameKey = 'users_username_key',
  /** unique or primary key constraint on columns "uuid" */
  UsersUuidKey = 'users_uuid_key'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  class?: InputMaybe<Scalars['String']['input']>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  github_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mentor_application_as_mentor?: InputMaybe<Mentor_Application_Arr_Rel_Insert_Input>;
  mentor_application_as_student?: InputMaybe<Mentor_Application_Arr_Rel_Insert_Input>;
  mentor_available?: InputMaybe<Mentor_Available_Obj_Rel_Insert_Input>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  realname?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  student_no?: InputMaybe<Scalars['String']['input']>;
  tsinghua_email?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  class?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  github_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  realname?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  student_no?: Maybe<Scalars['String']['output']>;
  tsinghua_email?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  class?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  github_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  realname?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  student_no?: Maybe<Scalars['String']['output']>;
  tsinghua_email?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  class?: InputMaybe<Order_By>;
  contest_team_members_aggregate?: InputMaybe<Contest_Team_Member_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  department?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  github_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mentor_application_as_mentor_aggregate?: InputMaybe<Mentor_Application_Aggregate_Order_By>;
  mentor_application_as_student_aggregate?: InputMaybe<Mentor_Application_Aggregate_Order_By>;
  mentor_available?: InputMaybe<Mentor_Available_Order_By>;
  password?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  realname?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  student_no?: InputMaybe<Order_By>;
  tsinghua_email?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  uuid: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Class = 'class',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  Email = 'email',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Phone = 'phone',
  /** column name */
  Realname = 'realname',
  /** column name */
  Role = 'role',
  /** column name */
  StudentNo = 'student_no',
  /** column name */
  TsinghuaEmail = 'tsinghua_email',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username',
  /** column name */
  Uuid = 'uuid'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  class?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  github_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  realname?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  student_no?: InputMaybe<Scalars['String']['input']>;
  tsinghua_email?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Class = 'class',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  Email = 'email',
  /** column name */
  GithubId = 'github_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Phone = 'phone',
  /** column name */
  Realname = 'realname',
  /** column name */
  Role = 'role',
  /** column name */
  StudentNo = 'student_no',
  /** column name */
  TsinghuaEmail = 'tsinghua_email',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username',
  /** column name */
  Uuid = 'uuid'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "weekly" */
export type Weekly = {
  __typename?: 'weekly';
  id: Scalars['Int']['output'];
  tags?: Maybe<Scalars['json']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};


/** columns and relationships of "weekly" */
export type WeeklyTagsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "weekly" */
export type Weekly_Aggregate = {
  __typename?: 'weekly_aggregate';
  aggregate?: Maybe<Weekly_Aggregate_Fields>;
  nodes: Array<Weekly>;
};

/** aggregate fields of "weekly" */
export type Weekly_Aggregate_Fields = {
  __typename?: 'weekly_aggregate_fields';
  avg?: Maybe<Weekly_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Weekly_Max_Fields>;
  min?: Maybe<Weekly_Min_Fields>;
  stddev?: Maybe<Weekly_Stddev_Fields>;
  stddev_pop?: Maybe<Weekly_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Weekly_Stddev_Samp_Fields>;
  sum?: Maybe<Weekly_Sum_Fields>;
  var_pop?: Maybe<Weekly_Var_Pop_Fields>;
  var_samp?: Maybe<Weekly_Var_Samp_Fields>;
  variance?: Maybe<Weekly_Variance_Fields>;
};


/** aggregate fields of "weekly" */
export type Weekly_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Weekly_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Weekly_Avg_Fields = {
  __typename?: 'weekly_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "weekly". All fields are combined with a logical 'AND'. */
export type Weekly_Bool_Exp = {
  _and?: InputMaybe<Array<Weekly_Bool_Exp>>;
  _not?: InputMaybe<Weekly_Bool_Exp>;
  _or?: InputMaybe<Array<Weekly_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  tags?: InputMaybe<Json_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "weekly" */
export enum Weekly_Constraint {
  /** unique or primary key constraint on columns "id" */
  WeeklyPkey = 'weekly_pkey'
}

/** input type for incrementing numeric columns in table "weekly" */
export type Weekly_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "weekly" */
export type Weekly_Insert_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Scalars['json']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Weekly_Max_Fields = {
  __typename?: 'weekly_max_fields';
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Weekly_Min_Fields = {
  __typename?: 'weekly_min_fields';
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "weekly" */
export type Weekly_Mutation_Response = {
  __typename?: 'weekly_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Weekly>;
};

/** on_conflict condition type for table "weekly" */
export type Weekly_On_Conflict = {
  constraint: Weekly_Constraint;
  update_columns?: Array<Weekly_Update_Column>;
  where?: InputMaybe<Weekly_Bool_Exp>;
};

/** Ordering options when selecting data from "weekly". */
export type Weekly_Order_By = {
  id?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: weekly */
export type Weekly_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "weekly" */
export enum Weekly_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Tags = 'tags',
  /** column name */
  Title = 'title',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "weekly" */
export type Weekly_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Scalars['json']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Weekly_Stddev_Fields = {
  __typename?: 'weekly_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Weekly_Stddev_Pop_Fields = {
  __typename?: 'weekly_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Weekly_Stddev_Samp_Fields = {
  __typename?: 'weekly_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Weekly_Sum_Fields = {
  __typename?: 'weekly_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "weekly" */
export enum Weekly_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Tags = 'tags',
  /** column name */
  Title = 'title',
  /** column name */
  Url = 'url'
}

/** aggregate var_pop on columns */
export type Weekly_Var_Pop_Fields = {
  __typename?: 'weekly_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Weekly_Var_Samp_Fields = {
  __typename?: 'weekly_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Weekly_Variance_Fields = {
  __typename?: 'weekly_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type QueryContestManagerQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type QueryContestManagerQuery = { __typename?: 'query_root', contest_manager: Array<{ __typename?: 'contest_manager', user_uuid: any }> };

export type InsertTeamMutationVariables = Exact<{
  team_name: Scalars['String']['input'];
  team_intro?: InputMaybe<Scalars['String']['input']>;
  team_leader: Scalars['String']['input'];
  invited_code: Scalars['String']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type InsertTeamMutation = { __typename?: 'mutation_root', insert_contest_team?: { __typename?: 'contest_team_mutation_response', affected_rows: number } | null };

export type IsTeamLeaderQueryVariables = Exact<{
  _id: Scalars['String']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type IsTeamLeaderQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_id: any }> };

export type IsTeamMemberQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
  contest_uuid: Scalars['uuid']['input'];
}>;


export type IsTeamMemberQuery = { __typename?: 'query_root', contest_team_member: Array<{ __typename?: 'contest_team_member', team_id: any }> };

export type GetCodeUpdateTimeSubscriptionVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetCodeUpdateTimeSubscription = { __typename?: 'subscription_root', contest_code: Array<{ __typename?: 'contest_code', code1_update_time?: any | null, code2_update_time?: any | null, code3_update_time?: any | null, code4_update_time?: any | null, code5_update_time?: any | null, code6_update_time?: any | null }> };

export type GetAllTeamInfoSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfoSubscription = { __typename?: 'subscription_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, created_at: any, invited_code?: string | null, member_num: number, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any, submitted_code_num: number, team_intro?: string | null, team_contest_id: { __typename?: 'contest', contest_name: string }, team_leader_id?: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } | null, contest_team_members: Array<{ __typename?: 'contest_team_member', user_as_contest_team_member: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } }> }> };

export type GetAllTeamInfo_ScoreQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfo_ScoreQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, created_at: any, invited_code?: string | null, member_num: number, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any, submitted_code_num: number, team_intro?: string | null, team_contest_id: { __typename?: 'contest', contest_name: string }, team_leader_id?: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } | null, contest_team_members: Array<{ __typename?: 'contest_team_member', user_as_contest_team_member: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } }> }> };

export type GetAllTeamInfo_CompileQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfo_CompileQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any }> };

export type GetTeamInfoQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
}>;


export type GetTeamInfoQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, created_at: any, invited_code?: string | null, member_num: number, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any, submitted_code_num: number, team_intro?: string | null, team_contest_id: { __typename?: 'contest', contest_name: string }, team_leader_id?: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } | null, contest_team_members: Array<{ __typename?: 'contest_team_member', user_as_contest_team_member: { __typename?: 'user', _id: string, class?: string | null, email?: string | null, name?: string | null, phone?: string | null } }> }> };

export type GetCompileStatusSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
}>;


export type GetCompileStatusSubscription = { __typename?: 'subscription_root', contest_team: Array<{ __typename?: 'contest_team', status?: string | null }> };

export type InsertTeamMemberMutationVariables = Exact<{
  team_uuid: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
}>;


export type InsertTeamMemberMutation = { __typename?: 'mutation_root', insert_contest_team_member?: { __typename?: 'contest_team_member_mutation_response', affected_rows: number } | null };

export type UpdateTeamMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  team_intro: Scalars['String']['input'];
  team_name: Scalars['String']['input'];
}>;


export type UpdateTeamMutation = { __typename?: 'mutation_root', update_contest_team?: { __typename?: 'contest_team_mutation_response', affected_rows: number } | null };

export type GetMemberInfoQueryVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetMemberInfoQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_leader_id?: { __typename?: 'user', name?: string | null, id?: any | null, _id: string } | null }>, contest_team_member: Array<{ __typename?: 'contest_team_member', user_as_contest_team_member: { __typename?: 'user', id?: any | null, _id: string, name?: string | null } }> };

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'mutation_root', delete_contest_team?: { __typename?: 'contest_team_mutation_response', affected_rows: number } | null };

export type DeleteAllTeamMemberMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type DeleteAllTeamMemberMutation = { __typename?: 'mutation_root', delete_contest_team_member?: { __typename?: 'contest_team_member_mutation_response', affected_rows: number } | null };

export type DeleteTeamMemberMutationVariables = Exact<{
  user_uuid: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
}>;


export type DeleteTeamMemberMutation = { __typename?: 'mutation_root', delete_contest_team_member?: { __typename?: 'contest_team_member_mutation_response', affected_rows: number } | null };

export type GetAllContestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllContestQuery = { __typename?: 'query_root', contest: Array<{ __typename?: 'contest', id: any, contest_name: string, description?: string | null, start_date: any, end_date: any }> };

export type GetContestInfoQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestInfoQuery = { __typename?: 'query_root', contest: Array<{ __typename?: 'contest', contest_name: string, contest_type: string, description?: string | null, start_date: any, end_date: any, status: string }> };

export type GetRoomInfoSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetRoomInfoSubscription = { __typename?: 'subscription_root', contest_room: Array<{ __typename?: 'contest_room', created_at: any, result?: string | null, room_id: any, status: boolean, port?: number | null, contest_room_teams: Array<{ __typename?: 'contest_room_team', contest_team: { __typename?: 'contest_team', team_name: string, team_id: any } }> }> };

export type GetRoomInfo_StatusQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetRoomInfo_StatusQuery = { __typename?: 'query_root', contest_room: Array<{ __typename?: 'contest_room', room_id: any, status: boolean, created_at: any }> };

export type InsertRoomMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team1_id: Scalars['uuid']['input'];
  team2_id: Scalars['uuid']['input'];
  created_at: Scalars['timestamptz']['input'];
}>;


export type InsertRoomMutation = { __typename?: 'mutation_root', insert_contest_room_one?: { __typename?: 'contest_room', room_id: any } | null };

export type DeleteRoomMutationVariables = Exact<{
  room_id: Scalars['uuid']['input'];
}>;


export type DeleteRoomMutation = { __typename?: 'mutation_root', delete_contest_room_team?: { __typename?: 'contest_room_team_mutation_response', affected_rows: number } | null, delete_contest_room?: { __typename?: 'contest_room_mutation_response', affected_rows: number } | null };

export type UpsertCode1MutationVariables = Exact<{
  code: Scalars['String']['input'];
  update_time: Scalars['timestamptz']['input'];
  team_id: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
  code_type: Scalars['String']['input'];
}>;


export type UpsertCode1Mutation = { __typename?: 'mutation_root', insert_contest_code_one?: { __typename?: 'contest_code', code1_update_time?: any | null } | null };

export type UpsertCode2MutationVariables = Exact<{
  code: Scalars['String']['input'];
  update_time: Scalars['timestamptz']['input'];
  team_id: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
  code_type: Scalars['String']['input'];
}>;


export type UpsertCode2Mutation = { __typename?: 'mutation_root', insert_contest_code_one?: { __typename?: 'contest_code', code2_update_time?: any | null } | null };

export type UpsertCode3MutationVariables = Exact<{
  code: Scalars['String']['input'];
  update_time: Scalars['timestamptz']['input'];
  team_id: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
  code_type: Scalars['String']['input'];
}>;


export type UpsertCode3Mutation = { __typename?: 'mutation_root', insert_contest_code_one?: { __typename?: 'contest_code', code3_update_time?: any | null } | null };

export type UpsertCode4MutationVariables = Exact<{
  code: Scalars['String']['input'];
  update_time: Scalars['timestamptz']['input'];
  team_id: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
  code_type: Scalars['String']['input'];
}>;


export type UpsertCode4Mutation = { __typename?: 'mutation_root', insert_contest_code_one?: { __typename?: 'contest_code', code4_update_time?: any | null } | null };

export type UpsertCode5MutationVariables = Exact<{
  code: Scalars['String']['input'];
  update_time: Scalars['timestamptz']['input'];
  team_id: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
  code_type: Scalars['String']['input'];
}>;


export type UpsertCode5Mutation = { __typename?: 'mutation_root', insert_contest_code_one?: { __typename?: 'contest_code', code5_update_time?: any | null } | null };

export type QueryTeamIdQueryVariables = Exact<{
  team_name: Scalars['String']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type QueryTeamIdQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_id: any, status?: string | null }> };

export type UpdateContestStatusMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateContestStatusMutation = { __typename?: 'mutation_root', update_contest?: { __typename?: 'contest_mutation_response', returning: Array<{ __typename?: 'contest', status: string }> } | null };

export type GetContestNoticesQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestNoticesQuery = { __typename?: 'query_root', contest_info: Array<{ __typename?: 'contest_info', content: string, created_at: any, updated_at: any, files?: string | null, id: any, title: string }> };

export type UpdateContestNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  contest_id: Scalars['uuid']['input'];
}>;


export type UpdateContestNoticeMutation = { __typename?: 'mutation_root', update_contest_info?: { __typename?: 'contest_info_mutation_response', returning: Array<{ __typename?: 'contest_info', id: any }> } | null };

export type AddContestNoticeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  contest_id: Scalars['uuid']['input'];
}>;


export type AddContestNoticeMutation = { __typename?: 'mutation_root', insert_contest_info?: { __typename?: 'contest_info_mutation_response', returning: Array<{ __typename?: 'contest_info', id: any }> } | null };

export type DeleteContestNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteContestNoticeMutation = { __typename?: 'mutation_root', delete_contest_info?: { __typename?: 'contest_info_mutation_response', returning: Array<{ __typename?: 'contest_info', id: any }> } | null };

export type GetContestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContestsQuery = { __typename?: 'query_root', contest: Array<{ __typename?: 'contest', contest_name: string, description?: string | null, end_date: any, id: any, start_date: any, contest_type: string }> };

export type AddContestMutationVariables = Exact<{
  start_date: Scalars['timestamptz']['input'];
  end_date: Scalars['timestamptz']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  contest_name: Scalars['String']['input'];
  contest_type: Scalars['String']['input'];
}>;


export type AddContestMutation = { __typename?: 'mutation_root', insert_contest?: { __typename?: 'contest_mutation_response', returning: Array<{ __typename?: 'contest', id: any }> } | null };

export type UpdateContestMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  contest_name: Scalars['String']['input'];
  end_date: Scalars['timestamptz']['input'];
  start_date: Scalars['timestamptz']['input'];
  contest_type: Scalars['String']['input'];
}>;


export type UpdateContestMutation = { __typename?: 'mutation_root', update_contest?: { __typename?: 'contest_mutation_response', returning: Array<{ __typename?: 'contest', id: any }> } | null };

export type DeleteContestMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteContestMutation = { __typename?: 'mutation_root', delete_contest?: { __typename?: 'contest_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'contest', id: any }> } | null };

export type GetContestManagerQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestManagerQuery = { __typename?: 'query_root', contest_manager: Array<{ __typename?: 'contest_manager', userByUserUuid: { __typename?: 'users', uuid: any, realname?: string | null, email: string } }> };

export type DeleteContestAllManagerMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type DeleteContestAllManagerMutation = { __typename?: 'mutation_root', delete_contest_manager?: { __typename?: 'contest_manager_mutation_response', affected_rows: number } | null };

export type AddContestManagerMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
}>;


export type AddContestManagerMutation = { __typename?: 'mutation_root', insert_contest_manager?: { __typename?: 'contest_manager_mutation_response', affected_rows: number } | null };

export type GetUser_IdQueryVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type GetUser_IdQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any }> };

export type DeleteContestAllTeamsMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type DeleteContestAllTeamsMutation = { __typename?: 'mutation_root', delete_contest_team?: { __typename?: 'contest_team_mutation_response', affected_rows: number } | null };

export type DeleteContestAllInfoMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type DeleteContestAllInfoMutation = { __typename?: 'mutation_root', delete_contest_info?: { __typename?: 'contest_info_mutation_response', affected_rows: number } | null };

export type DeleteContestAllRoomsMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type DeleteContestAllRoomsMutation = { __typename?: 'mutation_root', delete_contest_room?: { __typename?: 'contest_room_mutation_response', affected_rows: number } | null };

export type GetAidListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAidListQuery = { __typename?: 'query_root', scholarships_aids: Array<{ __typename?: 'scholarships_aids', amount: number, code: string, name: string, salutation?: string | null, type: string }> };

export type GetAidApplicationsQueryVariables = Exact<{
  _id: Scalars['String']['input'];
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetAidApplicationsQuery = { __typename?: 'query_root', aid_application: Array<{ __typename?: 'aid_application', id: any, aid: string, amount: number, code: string, thank_letter?: string | null, form_url?: string | null, status: string, created_at: any, updated_at: any, student: { __typename?: 'user', id?: any | null, name?: string | null, department?: string | null, class?: string | null } }> };

export type GetAidApplicationsForCounselorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAidApplicationsForCounselorsQuery = { __typename?: 'query_root', aid_application: Array<{ __typename?: 'aid_application', id: any, aid: string, amount: number, code: string, thank_letter?: string | null, form_url?: string | null, status: string, created_at: any, updated_at: any, student: { __typename?: 'user', id?: any | null, name?: string | null, department?: string | null, class?: string | null } }> };

export type AddAidApplicationMutationVariables = Exact<{
  student_id: Scalars['String']['input'];
  aid: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  code: Scalars['String']['input'];
}>;


export type AddAidApplicationMutation = { __typename?: 'mutation_root', insert_aid_application?: { __typename?: 'aid_application_mutation_response', returning: Array<{ __typename?: 'aid_application', id: any }> } | null };

export type UpdateAidApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAidApplicationMutation = { __typename?: 'mutation_root', update_aid_application?: { __typename?: 'aid_application_mutation_response', returning: Array<{ __typename?: 'aid_application', id: any }> } | null };

export type DeleteAidApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteAidApplicationMutation = { __typename?: 'mutation_root', delete_aid_application?: { __typename?: 'aid_application_mutation_response', returning: Array<{ __typename?: 'aid_application', id: any }> } | null };

export type GetIdByStudentNoQueryVariables = Exact<{
  student_no: Scalars['String']['input'];
}>;


export type GetIdByStudentNoQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id?: string | null }> };

export type GetApprovedMentorApplicationsQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetApprovedMentorApplicationsQuery = { __typename?: 'query_root', mentor_application: Array<{ __typename?: 'mentor_application', id: any, statement: string, status: string, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', uuid: any, realname?: string | null } | null, mentor_byuuid?: { __typename?: 'users', uuid: any, realname?: string | null } | null }> };

export type SubscribeToMessagesSubscriptionVariables = Exact<{
  from_uuid: Scalars['uuid']['input'];
  to_uuid: Scalars['uuid']['input'];
}>;


export type SubscribeToMessagesSubscription = { __typename?: 'subscription_root', mentor_message: Array<{ __typename?: 'mentor_message', created_at: any, from_uuid?: any | null, id: any, payload: string, to_uuid?: any | null }> };

export type AddMessageMutationVariables = Exact<{
  from_uuid: Scalars['uuid']['input'];
  to_uuid: Scalars['uuid']['input'];
  payload: Scalars['String']['input'];
}>;


export type AddMessageMutation = { __typename?: 'mutation_root', insert_mentor_message?: { __typename?: 'mentor_message_mutation_response', returning: Array<{ __typename?: 'mentor_message', id: any }> } | null };

export type GetHonorApplicationsQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetHonorApplicationsQuery = { __typename?: 'query_root', honor_application: Array<{ __typename?: 'honor_application', id: any, honor: string, statement: string, attachment_url?: string | null, status: string, created_at: any, updated_at: any }> };

export type GetHonorApplicationsForCounselorsQueryVariables = Exact<{
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetHonorApplicationsForCounselorsQuery = { __typename?: 'query_root', honor_application: Array<{ __typename?: 'honor_application', id: any, honor: string, statement: string, attachment_url?: string | null, status: string, created_at: any, updated_at: any, student_byuuid: { __typename?: 'user', uuid?: any | null, realname?: string | null, class?: string | null } }> };

export type AddHonorApplicationMutationVariables = Exact<{
  student_uuid: Scalars['String']['input'];
  honor: Scalars['String']['input'];
  statement: Scalars['String']['input'];
  attachment_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddHonorApplicationMutation = { __typename?: 'mutation_root', insert_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type UpdateHonorApplicationMutationVariables = Exact<{
  uuid: Scalars['uuid']['input'];
  honor: Scalars['String']['input'];
  statement: Scalars['String']['input'];
  attachment_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateHonorApplicationMutation = { __typename?: 'mutation_root', update_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type DeleteHonorApplicationMutationVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type DeleteHonorApplicationMutation = { __typename?: 'mutation_root', delete_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type UpdateHonorApplicationStatusMutationVariables = Exact<{
  uuid: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateHonorApplicationStatusMutation = { __typename?: 'mutation_root', update_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any, status: string }> } | null };

export type GetMentorApplicationsQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetMentorApplicationsQuery = { __typename?: 'query_root', mentor_application: Array<{ __typename?: 'mentor_application', id: any, statement: string, status: string, chat_status: boolean, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, email: string, phone?: string | null } | null, mentor_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, mentor_available?: { __typename?: 'mentor_available', available: boolean } | null } | null }> };

export type GetMentorApplicationsForCounselorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMentorApplicationsForCounselorsQuery = { __typename?: 'query_root', mentor_application: Array<{ __typename?: 'mentor_application', id: any, statement: string, status: string, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', uuid: any, realname?: string | null, class?: string | null, department?: string | null, email: string, phone?: string | null } | null, mentor_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, mentor_available?: { __typename?: 'mentor_available', available: boolean } | null } | null }> };

export type GetMentorAvailableQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetMentorAvailableQuery = { __typename?: 'query_root', mentor_available: Array<{ __typename?: 'mentor_available', available: boolean }> };

export type ChangeMentorAvailableMutationVariables = Exact<{
  uuid: Scalars['uuid']['input'];
  available: Scalars['Boolean']['input'];
}>;


export type ChangeMentorAvailableMutation = { __typename?: 'mutation_root', insert_mentor_available_one?: { __typename?: 'mentor_available', mentor_uuid: any, available: boolean } | null };

export type UpdateMentorApplicationStatusMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateMentorApplicationStatusMutation = { __typename?: 'mutation_root', update_mentor_application?: { __typename?: 'mentor_application_mutation_response', returning: Array<{ __typename?: 'mentor_application', id: any }> } | null };

export type UpdateMentorApplicationChatStatusMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  chat_status: Scalars['Boolean']['input'];
}>;


export type UpdateMentorApplicationChatStatusMutation = { __typename?: 'mutation_root', update_mentor_application?: { __typename?: 'mentor_application_mutation_response', returning: Array<{ __typename?: 'mentor_application', id: any }> } | null };

export type AddMentorApplicationMutationVariables = Exact<{
  student_uuid: Scalars['uuid']['input'];
  mentor_uuid: Scalars['uuid']['input'];
  statement: Scalars['String']['input'];
}>;


export type AddMentorApplicationMutation = { __typename?: 'mutation_root', insert_mentor_application?: { __typename?: 'mentor_application_mutation_response', returning: Array<{ __typename?: 'mentor_application', id: any }> } | null };

export type UpdateMentorApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  statement: Scalars['String']['input'];
}>;


export type UpdateMentorApplicationMutation = { __typename?: 'mutation_root', update_mentor_application?: { __typename?: 'mentor_application_mutation_response', returning: Array<{ __typename?: 'mentor_application', id: any }> } | null };

export type DeleteMentorApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteMentorApplicationMutation = { __typename?: 'mutation_root', delete_mentor_application_by_pk?: { __typename?: 'mentor_application', id: any } | null };

export type GetMentorListQueryVariables = Exact<{
  grade_time: Scalars['timestamptz']['input'];
}>;


export type GetMentorListQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any, realname?: string | null, department?: string | null, matched: { __typename?: 'mentor_application_aggregate', aggregate?: { __typename?: 'mentor_application_aggregate_fields', count: number } | null }, total: { __typename?: 'mentor_application_aggregate', aggregate?: { __typename?: 'mentor_application_aggregate_fields', count: number } | null }, total_for_grade: { __typename?: 'mentor_application_aggregate', aggregate?: { __typename?: 'mentor_application_aggregate_fields', count: number } | null }, mentor_available?: { __typename?: 'mentor_available', available: boolean } | null }> };

export type UpsertMentorInfoMutationVariables = Exact<{
  achievement?: InputMaybe<Scalars['String']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  field?: InputMaybe<Scalars['String']['input']>;
  intro?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid: Scalars['uuid']['input'];
}>;


export type UpsertMentorInfoMutation = { __typename?: 'mutation_root', insert_mentor_info_one?: { __typename?: 'mentor_info', mentor_uuid: any } | null };

export type GetMentorInfoQueryVariables = Exact<{
  mentor_uuid: Scalars['uuid']['input'];
}>;


export type GetMentorInfoQuery = { __typename?: 'query_root', mentor_info_by_pk?: { __typename?: 'mentor_info', achievement?: string | null, background?: string | null, field?: string | null, intro?: string | null, mentor_uuid: any, userByMentorUuid: { __typename?: 'users', realname?: string | null, email: string } } | null };

export type GetFreshmanListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFreshmanListQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any, student_no?: string | null, mentor_application_as_student: Array<{ __typename?: 'mentor_application', student_uuid?: any | null, mentor_uuid?: any | null, statement: string }> }> };

export type GetIdByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetIdByNameQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any }> };

export type GetNoticesQueryVariables = Exact<{
  notice_type?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetNoticesQuery = { __typename?: 'query_root', info_notice: Array<{ __typename?: 'info_notice', id: any, title: string, content: string, created_at: any, updated_at: any, files?: string | null, notice_type: string }> };

export type UpdateNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  notice_type: Scalars['String']['input'];
}>;


export type UpdateNoticeMutation = { __typename?: 'mutation_root', update_info_notice?: { __typename?: 'info_notice_mutation_response', returning: Array<{ __typename?: 'info_notice', id: any }> } | null };

export type AddNoticeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  notice_type: Scalars['String']['input'];
}>;


export type AddNoticeMutation = { __typename?: 'mutation_root', insert_info_notice?: { __typename?: 'info_notice_mutation_response', returning: Array<{ __typename?: 'info_notice', id: any }> } | null };

export type DeleteNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteNoticeMutation = { __typename?: 'mutation_root', delete_info_notice?: { __typename?: 'info_notice_mutation_response', returning: Array<{ __typename?: 'info_notice', id: any }> } | null };

export type GetScholarshipListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetScholarshipListQuery = { __typename?: 'query_root', scholarships_aids: Array<{ __typename?: 'scholarships_aids', amount: number, code: string, name: string, salutation?: string | null, type: string }> };

export type GetScholarshipApplicationsQueryVariables = Exact<{
  _id: Scalars['String']['input'];
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetScholarshipApplicationsQuery = { __typename?: 'query_root', scholarship_application: Array<{ __typename?: 'scholarship_application', id: any, scholarship: string, honor: string, amount: number, code: string, thank_letter?: string | null, form_url?: string | null, status: string, created_at: any, updated_at: any, student: { __typename?: 'user', id?: any | null, name?: string | null, department?: string | null, class?: string | null } }> };

export type GetScholarshipApplicationsForCounselorsQueryVariables = Exact<{
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetScholarshipApplicationsForCounselorsQuery = { __typename?: 'query_root', scholarship_application: Array<{ __typename?: 'scholarship_application', id: any, scholarship: string, honor: string, amount: number, code: string, thank_letter?: string | null, form_url?: string | null, status: string, created_at: any, updated_at: any, student: { __typename?: 'user', id?: any | null, name?: string | null, department?: string | null, class?: string | null } }> };

export type AddScholarshipApplicationMutationVariables = Exact<{
  student_id: Scalars['String']['input'];
  scholarship: Scalars['String']['input'];
  honor: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  code: Scalars['String']['input'];
}>;


export type AddScholarshipApplicationMutation = { __typename?: 'mutation_root', insert_scholarship_application?: { __typename?: 'scholarship_application_mutation_response', returning: Array<{ __typename?: 'scholarship_application', id: any }> } | null };

export type UpdateScholarshipApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  thank_letter?: InputMaybe<Scalars['String']['input']>;
  form_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateScholarshipApplicationMutation = { __typename?: 'mutation_root', update_scholarship_application?: { __typename?: 'scholarship_application_mutation_response', returning: Array<{ __typename?: 'scholarship_application', id: any }> } | null };

export type DeleteScholarshipApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteScholarshipApplicationMutation = { __typename?: 'mutation_root', delete_scholarship_application?: { __typename?: 'scholarship_application_mutation_response', returning: Array<{ __typename?: 'scholarship_application', id: any }> } | null };

export type GetPostgraduateFeedsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostgraduateFeedsQuery = { __typename?: 'query_root', postgraduate_mentor_info: Array<{ __typename?: 'postgraduate_mentor_info', id: number, created_at: any, updated_at: any, mentor: string, field: string, phd_quota: any, phd_quota_unfixed: any, contact: string, alternate_contact?: string | null, home_page?: string | null, detail_info?: string | null, user_id: string, intend: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null }, in_contact: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null }, confirmed: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null } }>, postgraduate_mentor_info_aggregate: { __typename?: 'postgraduate_mentor_info_aggregate', aggregate?: { __typename?: 'postgraduate_mentor_info_aggregate_fields', count: number } | null } };

export type GetUnverifiedMentorInfoQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUnverifiedMentorInfoQuery = { __typename?: 'query_root', postgraduate_mentor_info: Array<{ __typename?: 'postgraduate_mentor_info', id: number, created_at: any, updated_at: any, mentor: string, field: string, phd_quota: any, phd_quota_unfixed: any, contact: string, alternate_contact?: string | null, home_page?: string | null, detail_info?: string | null, user_id: string, userEditor: { __typename?: 'user', name?: string | null }, intend: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null }, in_contact: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null }, confirmed: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number, max?: { __typename?: 'postgraduate_application_max_fields', updated_at?: any | null } | null } | null } }>, postgraduate_mentor_info_aggregate: { __typename?: 'postgraduate_mentor_info_aggregate', aggregate?: { __typename?: 'postgraduate_mentor_info_aggregate_fields', count: number } | null } };

export type InsertPostgraduateInfoMutationVariables = Exact<{
  mentor: Scalars['String']['input'];
  field: Scalars['String']['input'];
  contact: Scalars['String']['input'];
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  phd_quota_unfixed?: InputMaybe<Scalars['numeric']['input']>;
  user_id: Scalars['String']['input'];
}>;


export type InsertPostgraduateInfoMutation = { __typename?: 'mutation_root', insert_postgraduate_mentor_info_one?: { __typename?: 'postgraduate_mentor_info', id: number } | null };

export type UpdatePostgraduateInfoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  mentor: Scalars['String']['input'];
  field: Scalars['String']['input'];
  contact: Scalars['String']['input'];
  alternate_contact?: InputMaybe<Scalars['String']['input']>;
  detail_info?: InputMaybe<Scalars['String']['input']>;
  home_page?: InputMaybe<Scalars['String']['input']>;
  phd_quota?: InputMaybe<Scalars['numeric']['input']>;
  phd_quota_unfixed?: InputMaybe<Scalars['numeric']['input']>;
}>;


export type UpdatePostgraduateInfoMutation = { __typename?: 'mutation_root', update_postgraduate_mentor_info_by_pk?: { __typename?: 'postgraduate_mentor_info', id: number } | null };

export type DeletePostgraduateInfoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePostgraduateInfoMutation = { __typename?: 'mutation_root', delete_postgraduate_mentor_info?: { __typename?: 'postgraduate_mentor_info_mutation_response', returning: Array<{ __typename?: 'postgraduate_mentor_info', id: number }> } | null };

export type InsertApplicationMutationVariables = Exact<{
  mentor_info_id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
}>;


export type InsertApplicationMutation = { __typename?: 'mutation_root', insert_postgraduate_application_one?: { __typename?: 'postgraduate_application', status: string } | null };

export type VerifyMentorInfoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type VerifyMentorInfoMutation = { __typename?: 'mutation_root', update_postgraduate_mentor_info_by_pk?: { __typename?: 'postgraduate_mentor_info', id: number } | null };

export type GetPostgraduateApplicationFeedsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostgraduateApplicationFeedsQuery = { __typename?: 'query_root', postgraduate_application_aggregate: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number } | null }, postgraduate_application: Array<{ __typename?: 'postgraduate_application', created_at: any, mentor_info_id: number, status: string, updated_at: any, user_id: string, mentor: { __typename?: 'postgraduate_mentor_info', mentor: string }, user: { __typename?: 'user', name?: string | null, class?: string | null } }> };

export type GetSelfPostgraduateApplicationsQueryVariables = Exact<{
  user_id: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetSelfPostgraduateApplicationsQuery = { __typename?: 'query_root', postgraduate_application: Array<{ __typename?: 'postgraduate_application', created_at: any, mentor_info_id: number, status: string, updated_at: any, user_id: string, verified: boolean, mentor: { __typename?: 'postgraduate_mentor_info', mentor: string }, history: Array<{ __typename?: 'postgraduate_application_history', status: string }> }>, postgraduate_application_aggregate: { __typename?: 'postgraduate_application_aggregate', aggregate?: { __typename?: 'postgraduate_application_aggregate_fields', count: number } | null } };

export type GetSelfConfirmedApplicationQueryVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type GetSelfConfirmedApplicationQuery = { __typename?: 'query_root', postgraduate_application: Array<{ __typename?: 'postgraduate_application', mentor_info_id: number }> };

export type VerifyPostgraduateApplicationMutationVariables = Exact<{
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
}>;


export type VerifyPostgraduateApplicationMutation = { __typename?: 'mutation_root', update_postgraduate_application_by_pk?: { __typename?: 'postgraduate_application', verified: boolean } | null };

export type DeletePostgraduateApplicationMutationVariables = Exact<{
  mentor_info_id: Scalars['Int']['input'];
  user_id: Scalars['String']['input'];
}>;


export type DeletePostgraduateApplicationMutation = { __typename?: 'mutation_root', delete_postgraduate_application_by_pk?: { __typename?: 'postgraduate_application', mentor_info_id: number, user_id: string } | null };

export type SetPostAppHistoryMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  mentor_info_id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
}>;


export type SetPostAppHistoryMutation = { __typename?: 'mutation_root', insert_postgraduate_application_history_one?: { __typename?: 'postgraduate_application_history', created_at: any } | null };

export type GetPostAppHistoryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostAppHistoryQuery = { __typename?: 'query_root', postgraduate_application_history: Array<{ __typename?: 'postgraduate_application_history', created_at: any, mentor_info_id: number, status: string, user_id: string, updated_at: any, mentor: { __typename?: 'postgraduate_mentor_info', mentor: string }, user: { __typename?: 'user', name?: string | null, class?: string | null } }>, postgraduate_application_history_aggregate: { __typename?: 'postgraduate_application_history_aggregate', aggregate?: { __typename?: 'postgraduate_application_history_aggregate_fields', count: number } | null } };

export type GetCourseQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCourseQuery = { __typename?: 'query_root', share_course: Array<{ __typename?: 'share_course', code: string, fullname: string, language: string, name: string, professor: string, semester: string, type: string, uuid: any, year: number }> };

export type GetWeeklyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeeklyQuery = { __typename?: 'query_root', weekly: Array<{ __typename?: 'weekly', id: number, title: string, url: string }> };

export type GetProfileQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetProfileQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', username?: string | null, realname?: string | null, email: string, phone?: string | null, student_no?: string | null, department?: string | null, class?: string | null, created_at: any, updated_at: any, tsinghua_email?: string | null, github_id?: string | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  uuid: Scalars['uuid']['input'];
  class?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  realname?: InputMaybe<Scalars['String']['input']>;
  student_no?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', updated_at: any } | null };


export const QueryContestManagerDocument = gql`
    query QueryContestManager($contest_id: uuid!, $user_uuid: uuid = "") {
  contest_manager(
    where: {contest_id: {_eq: $contest_id}, user_uuid: {_eq: $user_uuid}}
  ) {
    user_uuid
  }
}
    `;

/**
 * __useQueryContestManagerQuery__
 *
 * To run a query within a React component, call `useQueryContestManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryContestManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryContestManagerQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      user_uuid: // value for 'user_uuid'
 *   },
 * });
 */
export function useQueryContestManagerQuery(baseOptions: Apollo.QueryHookOptions<QueryContestManagerQuery, QueryContestManagerQueryVariables> & ({ variables: QueryContestManagerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryContestManagerQuery, QueryContestManagerQueryVariables>(QueryContestManagerDocument, options);
      }
export function useQueryContestManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryContestManagerQuery, QueryContestManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryContestManagerQuery, QueryContestManagerQueryVariables>(QueryContestManagerDocument, options);
        }
export function useQueryContestManagerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QueryContestManagerQuery, QueryContestManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryContestManagerQuery, QueryContestManagerQueryVariables>(QueryContestManagerDocument, options);
        }
export type QueryContestManagerQueryHookResult = ReturnType<typeof useQueryContestManagerQuery>;
export type QueryContestManagerLazyQueryHookResult = ReturnType<typeof useQueryContestManagerLazyQuery>;
export type QueryContestManagerSuspenseQueryHookResult = ReturnType<typeof useQueryContestManagerSuspenseQuery>;
export type QueryContestManagerQueryResult = Apollo.QueryResult<QueryContestManagerQuery, QueryContestManagerQueryVariables>;
export const InsertTeamDocument = gql`
    mutation InsertTeam($team_name: String!, $team_intro: String = "", $team_leader: String!, $invited_code: String!, $contest_id: uuid!) {
  insert_contest_team(
    objects: {team_name: $team_name, team_intro: $team_intro, team_leader: $team_leader, invited_code: $invited_code, contest_id: $contest_id}
  ) {
    affected_rows
  }
}
    `;
export type InsertTeamMutationFn = Apollo.MutationFunction<InsertTeamMutation, InsertTeamMutationVariables>;

/**
 * __useInsertTeamMutation__
 *
 * To run a mutation, you first call `useInsertTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTeamMutation, { data, loading, error }] = useInsertTeamMutation({
 *   variables: {
 *      team_name: // value for 'team_name'
 *      team_intro: // value for 'team_intro'
 *      team_leader: // value for 'team_leader'
 *      invited_code: // value for 'invited_code'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useInsertTeamMutation(baseOptions?: Apollo.MutationHookOptions<InsertTeamMutation, InsertTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertTeamMutation, InsertTeamMutationVariables>(InsertTeamDocument, options);
      }
export type InsertTeamMutationHookResult = ReturnType<typeof useInsertTeamMutation>;
export type InsertTeamMutationResult = Apollo.MutationResult<InsertTeamMutation>;
export type InsertTeamMutationOptions = Apollo.BaseMutationOptions<InsertTeamMutation, InsertTeamMutationVariables>;
export const IsTeamLeaderDocument = gql`
    query IsTeamLeader($_id: String!, $contest_id: uuid!) {
  contest_team(
    where: {team_leader_id: {_id: {_eq: $_id}}, _and: {contest_id: {_eq: $contest_id}}}
  ) {
    team_id
  }
}
    `;

/**
 * __useIsTeamLeaderQuery__
 *
 * To run a query within a React component, call `useIsTeamLeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsTeamLeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsTeamLeaderQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useIsTeamLeaderQuery(baseOptions: Apollo.QueryHookOptions<IsTeamLeaderQuery, IsTeamLeaderQueryVariables> & ({ variables: IsTeamLeaderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>(IsTeamLeaderDocument, options);
      }
export function useIsTeamLeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>(IsTeamLeaderDocument, options);
        }
export function useIsTeamLeaderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>(IsTeamLeaderDocument, options);
        }
export type IsTeamLeaderQueryHookResult = ReturnType<typeof useIsTeamLeaderQuery>;
export type IsTeamLeaderLazyQueryHookResult = ReturnType<typeof useIsTeamLeaderLazyQuery>;
export type IsTeamLeaderSuspenseQueryHookResult = ReturnType<typeof useIsTeamLeaderSuspenseQuery>;
export type IsTeamLeaderQueryResult = Apollo.QueryResult<IsTeamLeaderQuery, IsTeamLeaderQueryVariables>;
export const IsTeamMemberDocument = gql`
    query IsTeamMember($uuid: uuid!, $contest_uuid: uuid!) {
  contest_team_member(
    where: {user_uuid: {_eq: $uuid}, _and: {team_as_contest_team_member: {contest_id: {_eq: $contest_uuid}}}}
  ) {
    team_id
  }
}
    `;

/**
 * __useIsTeamMemberQuery__
 *
 * To run a query within a React component, call `useIsTeamMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsTeamMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsTeamMemberQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      contest_uuid: // value for 'contest_uuid'
 *   },
 * });
 */
export function useIsTeamMemberQuery(baseOptions: Apollo.QueryHookOptions<IsTeamMemberQuery, IsTeamMemberQueryVariables> & ({ variables: IsTeamMemberQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsTeamMemberQuery, IsTeamMemberQueryVariables>(IsTeamMemberDocument, options);
      }
export function useIsTeamMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsTeamMemberQuery, IsTeamMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsTeamMemberQuery, IsTeamMemberQueryVariables>(IsTeamMemberDocument, options);
        }
export function useIsTeamMemberSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsTeamMemberQuery, IsTeamMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsTeamMemberQuery, IsTeamMemberQueryVariables>(IsTeamMemberDocument, options);
        }
export type IsTeamMemberQueryHookResult = ReturnType<typeof useIsTeamMemberQuery>;
export type IsTeamMemberLazyQueryHookResult = ReturnType<typeof useIsTeamMemberLazyQuery>;
export type IsTeamMemberSuspenseQueryHookResult = ReturnType<typeof useIsTeamMemberSuspenseQuery>;
export type IsTeamMemberQueryResult = Apollo.QueryResult<IsTeamMemberQuery, IsTeamMemberQueryVariables>;
export const GetCodeUpdateTimeDocument = gql`
    subscription GetCodeUpdateTime($team_id: uuid!) {
  contest_code(where: {team_id: {_eq: $team_id}}) {
    code1_update_time
    code2_update_time
    code3_update_time
    code4_update_time
    code5_update_time
    code6_update_time
  }
}
    `;

/**
 * __useGetCodeUpdateTimeSubscription__
 *
 * To run a query within a React component, call `useGetCodeUpdateTimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCodeUpdateTimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCodeUpdateTimeSubscription({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetCodeUpdateTimeSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetCodeUpdateTimeSubscription, GetCodeUpdateTimeSubscriptionVariables> & ({ variables: GetCodeUpdateTimeSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetCodeUpdateTimeSubscription, GetCodeUpdateTimeSubscriptionVariables>(GetCodeUpdateTimeDocument, options);
      }
export type GetCodeUpdateTimeSubscriptionHookResult = ReturnType<typeof useGetCodeUpdateTimeSubscription>;
export type GetCodeUpdateTimeSubscriptionResult = Apollo.SubscriptionResult<GetCodeUpdateTimeSubscription>;
export const GetAllTeamInfoDocument = gql`
    subscription GetAllTeamInfo($contest_id: uuid!) {
  contest_team(where: {contest_id: {_eq: $contest_id}}) {
    team_name
    created_at
    invited_code
    member_num
    score
    status
    status2
    contest_score
    team_id
    submitted_code_num
    team_contest_id {
      contest_name
    }
    team_intro
    team_leader_id {
      _id
      class
      email
      name
      phone
    }
    contest_team_members {
      user_as_contest_team_member {
        _id
        class
        email
        name
        phone
      }
    }
  }
}
    `;

/**
 * __useGetAllTeamInfoSubscription__
 *
 * To run a query within a React component, call `useGetAllTeamInfoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamInfoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamInfoSubscription({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetAllTeamInfoSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetAllTeamInfoSubscription, GetAllTeamInfoSubscriptionVariables> & ({ variables: GetAllTeamInfoSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllTeamInfoSubscription, GetAllTeamInfoSubscriptionVariables>(GetAllTeamInfoDocument, options);
      }
export type GetAllTeamInfoSubscriptionHookResult = ReturnType<typeof useGetAllTeamInfoSubscription>;
export type GetAllTeamInfoSubscriptionResult = Apollo.SubscriptionResult<GetAllTeamInfoSubscription>;
export const GetAllTeamInfo_ScoreDocument = gql`
    query GetAllTeamInfo_score($contest_id: uuid!) {
  contest_team(
    where: {_and: {contest_id: {_eq: $contest_id}, score: {_is_null: false}}}
  ) {
    team_name
    created_at
    invited_code
    member_num
    score
    status
    status2
    contest_score
    team_id
    submitted_code_num
    team_contest_id {
      contest_name
    }
    team_intro
    team_leader_id {
      _id
      class
      email
      name
      phone
    }
    contest_team_members {
      user_as_contest_team_member {
        _id
        class
        email
        name
        phone
      }
    }
  }
}
    `;

/**
 * __useGetAllTeamInfo_ScoreQuery__
 *
 * To run a query within a React component, call `useGetAllTeamInfo_ScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamInfo_ScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamInfo_ScoreQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetAllTeamInfo_ScoreQuery(baseOptions: Apollo.QueryHookOptions<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables> & ({ variables: GetAllTeamInfo_ScoreQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>(GetAllTeamInfo_ScoreDocument, options);
      }
export function useGetAllTeamInfo_ScoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>(GetAllTeamInfo_ScoreDocument, options);
        }
export function useGetAllTeamInfo_ScoreSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>(GetAllTeamInfo_ScoreDocument, options);
        }
export type GetAllTeamInfo_ScoreQueryHookResult = ReturnType<typeof useGetAllTeamInfo_ScoreQuery>;
export type GetAllTeamInfo_ScoreLazyQueryHookResult = ReturnType<typeof useGetAllTeamInfo_ScoreLazyQuery>;
export type GetAllTeamInfo_ScoreSuspenseQueryHookResult = ReturnType<typeof useGetAllTeamInfo_ScoreSuspenseQuery>;
export type GetAllTeamInfo_ScoreQueryResult = Apollo.QueryResult<GetAllTeamInfo_ScoreQuery, GetAllTeamInfo_ScoreQueryVariables>;
export const GetAllTeamInfo_CompileDocument = gql`
    query GetAllTeamInfo_compile($contest_id: uuid!) {
  contest_team(
    where: {_and: {contest_id: {_eq: $contest_id}, status: {_eq: "compiled"}}}
  ) {
    team_name
    score
    status
    status2
    contest_score
    team_id
  }
}
    `;

/**
 * __useGetAllTeamInfo_CompileQuery__
 *
 * To run a query within a React component, call `useGetAllTeamInfo_CompileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamInfo_CompileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamInfo_CompileQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetAllTeamInfo_CompileQuery(baseOptions: Apollo.QueryHookOptions<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables> & ({ variables: GetAllTeamInfo_CompileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>(GetAllTeamInfo_CompileDocument, options);
      }
export function useGetAllTeamInfo_CompileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>(GetAllTeamInfo_CompileDocument, options);
        }
export function useGetAllTeamInfo_CompileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>(GetAllTeamInfo_CompileDocument, options);
        }
export type GetAllTeamInfo_CompileQueryHookResult = ReturnType<typeof useGetAllTeamInfo_CompileQuery>;
export type GetAllTeamInfo_CompileLazyQueryHookResult = ReturnType<typeof useGetAllTeamInfo_CompileLazyQuery>;
export type GetAllTeamInfo_CompileSuspenseQueryHookResult = ReturnType<typeof useGetAllTeamInfo_CompileSuspenseQuery>;
export type GetAllTeamInfo_CompileQueryResult = Apollo.QueryResult<GetAllTeamInfo_CompileQuery, GetAllTeamInfo_CompileQueryVariables>;
export const GetTeamInfoDocument = gql`
    query GetTeamInfo($contest_id: uuid!, $team_id: uuid!) {
  contest_team(where: {contest_id: {_eq: $contest_id}, team_id: {_eq: $team_id}}) {
    team_name
    created_at
    invited_code
    member_num
    score
    status
    status2
    contest_score
    team_id
    submitted_code_num
    team_contest_id {
      contest_name
    }
    team_intro
    team_leader_id {
      _id
      class
      email
      name
      phone
    }
    contest_team_members {
      user_as_contest_team_member {
        _id
        class
        email
        name
        phone
      }
    }
  }
}
    `;

/**
 * __useGetTeamInfoQuery__
 *
 * To run a query within a React component, call `useGetTeamInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamInfoQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetTeamInfoQuery(baseOptions: Apollo.QueryHookOptions<GetTeamInfoQuery, GetTeamInfoQueryVariables> & ({ variables: GetTeamInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamInfoQuery, GetTeamInfoQueryVariables>(GetTeamInfoDocument, options);
      }
export function useGetTeamInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamInfoQuery, GetTeamInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamInfoQuery, GetTeamInfoQueryVariables>(GetTeamInfoDocument, options);
        }
export function useGetTeamInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamInfoQuery, GetTeamInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamInfoQuery, GetTeamInfoQueryVariables>(GetTeamInfoDocument, options);
        }
export type GetTeamInfoQueryHookResult = ReturnType<typeof useGetTeamInfoQuery>;
export type GetTeamInfoLazyQueryHookResult = ReturnType<typeof useGetTeamInfoLazyQuery>;
export type GetTeamInfoSuspenseQueryHookResult = ReturnType<typeof useGetTeamInfoSuspenseQuery>;
export type GetTeamInfoQueryResult = Apollo.QueryResult<GetTeamInfoQuery, GetTeamInfoQueryVariables>;
export const GetCompileStatusDocument = gql`
    subscription GetCompileStatus($contest_id: uuid!, $team_id: uuid!) {
  contest_team(where: {contest_id: {_eq: $contest_id}, team_id: {_eq: $team_id}}) {
    status
  }
}
    `;

/**
 * __useGetCompileStatusSubscription__
 *
 * To run a query within a React component, call `useGetCompileStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCompileStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompileStatusSubscription({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetCompileStatusSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetCompileStatusSubscription, GetCompileStatusSubscriptionVariables> & ({ variables: GetCompileStatusSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetCompileStatusSubscription, GetCompileStatusSubscriptionVariables>(GetCompileStatusDocument, options);
      }
export type GetCompileStatusSubscriptionHookResult = ReturnType<typeof useGetCompileStatusSubscription>;
export type GetCompileStatusSubscriptionResult = Apollo.SubscriptionResult<GetCompileStatusSubscription>;
export const InsertTeamMemberDocument = gql`
    mutation InsertTeamMember($team_uuid: uuid!, $user_uuid: uuid!) {
  insert_contest_team_member(
    objects: {team_id: $team_uuid, user_uuid: $user_uuid}
  ) {
    affected_rows
  }
}
    `;
export type InsertTeamMemberMutationFn = Apollo.MutationFunction<InsertTeamMemberMutation, InsertTeamMemberMutationVariables>;

/**
 * __useInsertTeamMemberMutation__
 *
 * To run a mutation, you first call `useInsertTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTeamMemberMutation, { data, loading, error }] = useInsertTeamMemberMutation({
 *   variables: {
 *      team_uuid: // value for 'team_uuid'
 *      user_uuid: // value for 'user_uuid'
 *   },
 * });
 */
export function useInsertTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<InsertTeamMemberMutation, InsertTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertTeamMemberMutation, InsertTeamMemberMutationVariables>(InsertTeamMemberDocument, options);
      }
export type InsertTeamMemberMutationHookResult = ReturnType<typeof useInsertTeamMemberMutation>;
export type InsertTeamMemberMutationResult = Apollo.MutationResult<InsertTeamMemberMutation>;
export type InsertTeamMemberMutationOptions = Apollo.BaseMutationOptions<InsertTeamMemberMutation, InsertTeamMemberMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($team_id: uuid!, $team_intro: String!, $team_name: String!) {
  update_contest_team(
    where: {team_id: {_eq: $team_id}}
    _set: {team_intro: $team_intro, team_name: $team_name}
  ) {
    affected_rows
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *      team_intro: // value for 'team_intro'
 *      team_name: // value for 'team_name'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const GetMemberInfoDocument = gql`
    query GetMemberInfo($team_id: uuid!) {
  contest_team(where: {team_id: {_eq: $team_id}}) {
    team_leader_id {
      name
      id
      _id
    }
  }
  contest_team_member(where: {team_id: {_eq: $team_id}}) {
    user_as_contest_team_member {
      id
      _id
      name
    }
  }
}
    `;

/**
 * __useGetMemberInfoQuery__
 *
 * To run a query within a React component, call `useGetMemberInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberInfoQuery({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetMemberInfoQuery(baseOptions: Apollo.QueryHookOptions<GetMemberInfoQuery, GetMemberInfoQueryVariables> & ({ variables: GetMemberInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberInfoQuery, GetMemberInfoQueryVariables>(GetMemberInfoDocument, options);
      }
export function useGetMemberInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberInfoQuery, GetMemberInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberInfoQuery, GetMemberInfoQueryVariables>(GetMemberInfoDocument, options);
        }
export function useGetMemberInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberInfoQuery, GetMemberInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberInfoQuery, GetMemberInfoQueryVariables>(GetMemberInfoDocument, options);
        }
export type GetMemberInfoQueryHookResult = ReturnType<typeof useGetMemberInfoQuery>;
export type GetMemberInfoLazyQueryHookResult = ReturnType<typeof useGetMemberInfoLazyQuery>;
export type GetMemberInfoSuspenseQueryHookResult = ReturnType<typeof useGetMemberInfoSuspenseQuery>;
export type GetMemberInfoQueryResult = Apollo.QueryResult<GetMemberInfoQuery, GetMemberInfoQueryVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($team_id: uuid!) {
  delete_contest_team(where: {team_id: {_eq: $team_id}}) {
    affected_rows
  }
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const DeleteAllTeamMemberDocument = gql`
    mutation DeleteAllTeamMember($team_id: uuid!) {
  delete_contest_team_member(where: {team_id: {_eq: $team_id}}) {
    affected_rows
  }
}
    `;
export type DeleteAllTeamMemberMutationFn = Apollo.MutationFunction<DeleteAllTeamMemberMutation, DeleteAllTeamMemberMutationVariables>;

/**
 * __useDeleteAllTeamMemberMutation__
 *
 * To run a mutation, you first call `useDeleteAllTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllTeamMemberMutation, { data, loading, error }] = useDeleteAllTeamMemberMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteAllTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllTeamMemberMutation, DeleteAllTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllTeamMemberMutation, DeleteAllTeamMemberMutationVariables>(DeleteAllTeamMemberDocument, options);
      }
export type DeleteAllTeamMemberMutationHookResult = ReturnType<typeof useDeleteAllTeamMemberMutation>;
export type DeleteAllTeamMemberMutationResult = Apollo.MutationResult<DeleteAllTeamMemberMutation>;
export type DeleteAllTeamMemberMutationOptions = Apollo.BaseMutationOptions<DeleteAllTeamMemberMutation, DeleteAllTeamMemberMutationVariables>;
export const DeleteTeamMemberDocument = gql`
    mutation DeleteTeamMember($user_uuid: uuid!, $team_id: uuid!) {
  delete_contest_team_member(
    where: {user_uuid: {_eq: $user_uuid}, team_id: {_eq: $team_id}}
  ) {
    affected_rows
  }
}
    `;
export type DeleteTeamMemberMutationFn = Apollo.MutationFunction<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;

/**
 * __useDeleteTeamMemberMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMemberMutation, { data, loading, error }] = useDeleteTeamMemberMutation({
 *   variables: {
 *      user_uuid: // value for 'user_uuid'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>(DeleteTeamMemberDocument, options);
      }
export type DeleteTeamMemberMutationHookResult = ReturnType<typeof useDeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationResult = Apollo.MutationResult<DeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;
export const GetAllContestDocument = gql`
    query GetAllContest {
  contest {
    id
    contest_name
    description
    start_date
    end_date
  }
}
    `;

/**
 * __useGetAllContestQuery__
 *
 * To run a query within a React component, call `useGetAllContestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllContestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllContestQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllContestQuery(baseOptions?: Apollo.QueryHookOptions<GetAllContestQuery, GetAllContestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllContestQuery, GetAllContestQueryVariables>(GetAllContestDocument, options);
      }
export function useGetAllContestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllContestQuery, GetAllContestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllContestQuery, GetAllContestQueryVariables>(GetAllContestDocument, options);
        }
export function useGetAllContestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllContestQuery, GetAllContestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllContestQuery, GetAllContestQueryVariables>(GetAllContestDocument, options);
        }
export type GetAllContestQueryHookResult = ReturnType<typeof useGetAllContestQuery>;
export type GetAllContestLazyQueryHookResult = ReturnType<typeof useGetAllContestLazyQuery>;
export type GetAllContestSuspenseQueryHookResult = ReturnType<typeof useGetAllContestSuspenseQuery>;
export type GetAllContestQueryResult = Apollo.QueryResult<GetAllContestQuery, GetAllContestQueryVariables>;
export const GetContestInfoDocument = gql`
    query GetContestInfo($contest_id: uuid!) {
  contest(where: {id: {_eq: $contest_id}}) {
    contest_name
    contest_type
    description
    start_date
    end_date
    status
  }
}
    `;

/**
 * __useGetContestInfoQuery__
 *
 * To run a query within a React component, call `useGetContestInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestInfoQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestInfoQuery(baseOptions: Apollo.QueryHookOptions<GetContestInfoQuery, GetContestInfoQueryVariables> & ({ variables: GetContestInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestInfoQuery, GetContestInfoQueryVariables>(GetContestInfoDocument, options);
      }
export function useGetContestInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestInfoQuery, GetContestInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestInfoQuery, GetContestInfoQueryVariables>(GetContestInfoDocument, options);
        }
export function useGetContestInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestInfoQuery, GetContestInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestInfoQuery, GetContestInfoQueryVariables>(GetContestInfoDocument, options);
        }
export type GetContestInfoQueryHookResult = ReturnType<typeof useGetContestInfoQuery>;
export type GetContestInfoLazyQueryHookResult = ReturnType<typeof useGetContestInfoLazyQuery>;
export type GetContestInfoSuspenseQueryHookResult = ReturnType<typeof useGetContestInfoSuspenseQuery>;
export type GetContestInfoQueryResult = Apollo.QueryResult<GetContestInfoQuery, GetContestInfoQueryVariables>;
export const GetRoomInfoDocument = gql`
    subscription GetRoomInfo($contest_id: uuid!) {
  contest_room(
    where: {contest_id: {_eq: $contest_id}}
    order_by: {created_at: desc}
  ) {
    created_at
    result
    room_id
    status
    port
    contest_room_teams {
      contest_team {
        team_name
        team_id
      }
    }
  }
}
    `;

/**
 * __useGetRoomInfoSubscription__
 *
 * To run a query within a React component, call `useGetRoomInfoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomInfoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomInfoSubscription({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetRoomInfoSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetRoomInfoSubscription, GetRoomInfoSubscriptionVariables> & ({ variables: GetRoomInfoSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetRoomInfoSubscription, GetRoomInfoSubscriptionVariables>(GetRoomInfoDocument, options);
      }
export type GetRoomInfoSubscriptionHookResult = ReturnType<typeof useGetRoomInfoSubscription>;
export type GetRoomInfoSubscriptionResult = Apollo.SubscriptionResult<GetRoomInfoSubscription>;
export const GetRoomInfo_StatusDocument = gql`
    query GetRoomInfo_status($contest_id: uuid!) {
  contest_room(
    where: {_and: {contest_id: {_eq: $contest_id}, status: {_eq: false}, port: {_is_null: false}}}
  ) {
    room_id
    status
    created_at
  }
}
    `;

/**
 * __useGetRoomInfo_StatusQuery__
 *
 * To run a query within a React component, call `useGetRoomInfo_StatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomInfo_StatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomInfo_StatusQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetRoomInfo_StatusQuery(baseOptions: Apollo.QueryHookOptions<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables> & ({ variables: GetRoomInfo_StatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>(GetRoomInfo_StatusDocument, options);
      }
export function useGetRoomInfo_StatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>(GetRoomInfo_StatusDocument, options);
        }
export function useGetRoomInfo_StatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>(GetRoomInfo_StatusDocument, options);
        }
export type GetRoomInfo_StatusQueryHookResult = ReturnType<typeof useGetRoomInfo_StatusQuery>;
export type GetRoomInfo_StatusLazyQueryHookResult = ReturnType<typeof useGetRoomInfo_StatusLazyQuery>;
export type GetRoomInfo_StatusSuspenseQueryHookResult = ReturnType<typeof useGetRoomInfo_StatusSuspenseQuery>;
export type GetRoomInfo_StatusQueryResult = Apollo.QueryResult<GetRoomInfo_StatusQuery, GetRoomInfo_StatusQueryVariables>;
export const InsertRoomDocument = gql`
    mutation InsertRoom($contest_id: uuid!, $team1_id: uuid!, $team2_id: uuid!, $created_at: timestamptz!) {
  insert_contest_room_one(
    object: {contest_id: $contest_id, contest_room_teams: {data: [{team_id: $team1_id}, {team_id: $team2_id}]}, created_at: $created_at}
  ) {
    room_id
  }
}
    `;
export type InsertRoomMutationFn = Apollo.MutationFunction<InsertRoomMutation, InsertRoomMutationVariables>;

/**
 * __useInsertRoomMutation__
 *
 * To run a mutation, you first call `useInsertRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertRoomMutation, { data, loading, error }] = useInsertRoomMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team1_id: // value for 'team1_id'
 *      team2_id: // value for 'team2_id'
 *      created_at: // value for 'created_at'
 *   },
 * });
 */
export function useInsertRoomMutation(baseOptions?: Apollo.MutationHookOptions<InsertRoomMutation, InsertRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertRoomMutation, InsertRoomMutationVariables>(InsertRoomDocument, options);
      }
export type InsertRoomMutationHookResult = ReturnType<typeof useInsertRoomMutation>;
export type InsertRoomMutationResult = Apollo.MutationResult<InsertRoomMutation>;
export type InsertRoomMutationOptions = Apollo.BaseMutationOptions<InsertRoomMutation, InsertRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($room_id: uuid!) {
  delete_contest_room_team(where: {room_id: {_eq: $room_id}}) {
    affected_rows
  }
  delete_contest_room(where: {room_id: {_eq: $room_id}}) {
    affected_rows
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      room_id: // value for 'room_id'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const UpsertCode1Document = gql`
    mutation UpsertCode1($code: String!, $update_time: timestamptz!, $team_id: uuid!, $contest_id: uuid!, $code_type: String!) {
  insert_contest_code_one(
    object: {code1: $code, code1_update_time: $update_time, team_id: $team_id, contest_id: $contest_id, code_type1: $code_type}
    on_conflict: {constraint: contest_code_pkey, update_columns: [code1, code1_update_time, code_type1]}
  ) {
    code1_update_time
  }
}
    `;
export type UpsertCode1MutationFn = Apollo.MutationFunction<UpsertCode1Mutation, UpsertCode1MutationVariables>;

/**
 * __useUpsertCode1Mutation__
 *
 * To run a mutation, you first call `useUpsertCode1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCode1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCode1Mutation, { data, loading, error }] = useUpsertCode1Mutation({
 *   variables: {
 *      code: // value for 'code'
 *      update_time: // value for 'update_time'
 *      team_id: // value for 'team_id'
 *      contest_id: // value for 'contest_id'
 *      code_type: // value for 'code_type'
 *   },
 * });
 */
export function useUpsertCode1Mutation(baseOptions?: Apollo.MutationHookOptions<UpsertCode1Mutation, UpsertCode1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCode1Mutation, UpsertCode1MutationVariables>(UpsertCode1Document, options);
      }
export type UpsertCode1MutationHookResult = ReturnType<typeof useUpsertCode1Mutation>;
export type UpsertCode1MutationResult = Apollo.MutationResult<UpsertCode1Mutation>;
export type UpsertCode1MutationOptions = Apollo.BaseMutationOptions<UpsertCode1Mutation, UpsertCode1MutationVariables>;
export const UpsertCode2Document = gql`
    mutation UpsertCode2($code: String!, $update_time: timestamptz!, $team_id: uuid!, $contest_id: uuid!, $code_type: String!) {
  insert_contest_code_one(
    object: {code2: $code, code2_update_time: $update_time, team_id: $team_id, contest_id: $contest_id, code_type2: $code_type}
    on_conflict: {constraint: contest_code_pkey, update_columns: [code2, code2_update_time, code_type2]}
  ) {
    code2_update_time
  }
}
    `;
export type UpsertCode2MutationFn = Apollo.MutationFunction<UpsertCode2Mutation, UpsertCode2MutationVariables>;

/**
 * __useUpsertCode2Mutation__
 *
 * To run a mutation, you first call `useUpsertCode2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCode2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCode2Mutation, { data, loading, error }] = useUpsertCode2Mutation({
 *   variables: {
 *      code: // value for 'code'
 *      update_time: // value for 'update_time'
 *      team_id: // value for 'team_id'
 *      contest_id: // value for 'contest_id'
 *      code_type: // value for 'code_type'
 *   },
 * });
 */
export function useUpsertCode2Mutation(baseOptions?: Apollo.MutationHookOptions<UpsertCode2Mutation, UpsertCode2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCode2Mutation, UpsertCode2MutationVariables>(UpsertCode2Document, options);
      }
export type UpsertCode2MutationHookResult = ReturnType<typeof useUpsertCode2Mutation>;
export type UpsertCode2MutationResult = Apollo.MutationResult<UpsertCode2Mutation>;
export type UpsertCode2MutationOptions = Apollo.BaseMutationOptions<UpsertCode2Mutation, UpsertCode2MutationVariables>;
export const UpsertCode3Document = gql`
    mutation UpsertCode3($code: String!, $update_time: timestamptz!, $team_id: uuid!, $contest_id: uuid!, $code_type: String!) {
  insert_contest_code_one(
    object: {code3: $code, code3_update_time: $update_time, team_id: $team_id, contest_id: $contest_id, code_type3: $code_type}
    on_conflict: {constraint: contest_code_pkey, update_columns: [code3, code3_update_time, code_type3]}
  ) {
    code3_update_time
  }
}
    `;
export type UpsertCode3MutationFn = Apollo.MutationFunction<UpsertCode3Mutation, UpsertCode3MutationVariables>;

/**
 * __useUpsertCode3Mutation__
 *
 * To run a mutation, you first call `useUpsertCode3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCode3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCode3Mutation, { data, loading, error }] = useUpsertCode3Mutation({
 *   variables: {
 *      code: // value for 'code'
 *      update_time: // value for 'update_time'
 *      team_id: // value for 'team_id'
 *      contest_id: // value for 'contest_id'
 *      code_type: // value for 'code_type'
 *   },
 * });
 */
export function useUpsertCode3Mutation(baseOptions?: Apollo.MutationHookOptions<UpsertCode3Mutation, UpsertCode3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCode3Mutation, UpsertCode3MutationVariables>(UpsertCode3Document, options);
      }
export type UpsertCode3MutationHookResult = ReturnType<typeof useUpsertCode3Mutation>;
export type UpsertCode3MutationResult = Apollo.MutationResult<UpsertCode3Mutation>;
export type UpsertCode3MutationOptions = Apollo.BaseMutationOptions<UpsertCode3Mutation, UpsertCode3MutationVariables>;
export const UpsertCode4Document = gql`
    mutation UpsertCode4($code: String!, $update_time: timestamptz!, $team_id: uuid!, $contest_id: uuid!, $code_type: String!) {
  insert_contest_code_one(
    object: {code4: $code, code4_update_time: $update_time, team_id: $team_id, contest_id: $contest_id, code_type4: $code_type}
    on_conflict: {constraint: contest_code_pkey, update_columns: [code4, code4_update_time, code_type4]}
  ) {
    code4_update_time
  }
}
    `;
export type UpsertCode4MutationFn = Apollo.MutationFunction<UpsertCode4Mutation, UpsertCode4MutationVariables>;

/**
 * __useUpsertCode4Mutation__
 *
 * To run a mutation, you first call `useUpsertCode4Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCode4Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCode4Mutation, { data, loading, error }] = useUpsertCode4Mutation({
 *   variables: {
 *      code: // value for 'code'
 *      update_time: // value for 'update_time'
 *      team_id: // value for 'team_id'
 *      contest_id: // value for 'contest_id'
 *      code_type: // value for 'code_type'
 *   },
 * });
 */
export function useUpsertCode4Mutation(baseOptions?: Apollo.MutationHookOptions<UpsertCode4Mutation, UpsertCode4MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCode4Mutation, UpsertCode4MutationVariables>(UpsertCode4Document, options);
      }
export type UpsertCode4MutationHookResult = ReturnType<typeof useUpsertCode4Mutation>;
export type UpsertCode4MutationResult = Apollo.MutationResult<UpsertCode4Mutation>;
export type UpsertCode4MutationOptions = Apollo.BaseMutationOptions<UpsertCode4Mutation, UpsertCode4MutationVariables>;
export const UpsertCode5Document = gql`
    mutation UpsertCode5($code: String!, $update_time: timestamptz!, $team_id: uuid!, $contest_id: uuid!, $code_type: String!) {
  insert_contest_code_one(
    object: {code5: $code, code5_update_time: $update_time, team_id: $team_id, contest_id: $contest_id, code_type5: $code_type}
    on_conflict: {constraint: contest_code_pkey, update_columns: [code5, code5_update_time, code_type5]}
  ) {
    code5_update_time
  }
}
    `;
export type UpsertCode5MutationFn = Apollo.MutationFunction<UpsertCode5Mutation, UpsertCode5MutationVariables>;

/**
 * __useUpsertCode5Mutation__
 *
 * To run a mutation, you first call `useUpsertCode5Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertCode5Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertCode5Mutation, { data, loading, error }] = useUpsertCode5Mutation({
 *   variables: {
 *      code: // value for 'code'
 *      update_time: // value for 'update_time'
 *      team_id: // value for 'team_id'
 *      contest_id: // value for 'contest_id'
 *      code_type: // value for 'code_type'
 *   },
 * });
 */
export function useUpsertCode5Mutation(baseOptions?: Apollo.MutationHookOptions<UpsertCode5Mutation, UpsertCode5MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertCode5Mutation, UpsertCode5MutationVariables>(UpsertCode5Document, options);
      }
export type UpsertCode5MutationHookResult = ReturnType<typeof useUpsertCode5Mutation>;
export type UpsertCode5MutationResult = Apollo.MutationResult<UpsertCode5Mutation>;
export type UpsertCode5MutationOptions = Apollo.BaseMutationOptions<UpsertCode5Mutation, UpsertCode5MutationVariables>;
export const QueryTeamIdDocument = gql`
    query QueryTeamID($team_name: String!, $contest_id: uuid!) {
  contest_team(
    where: {team_name: {_eq: $team_name}, contest_id: {_eq: $contest_id}}
  ) {
    team_id
    status
  }
}
    `;

/**
 * __useQueryTeamIdQuery__
 *
 * To run a query within a React component, call `useQueryTeamIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTeamIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTeamIdQuery({
 *   variables: {
 *      team_name: // value for 'team_name'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useQueryTeamIdQuery(baseOptions: Apollo.QueryHookOptions<QueryTeamIdQuery, QueryTeamIdQueryVariables> & ({ variables: QueryTeamIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryTeamIdQuery, QueryTeamIdQueryVariables>(QueryTeamIdDocument, options);
      }
export function useQueryTeamIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTeamIdQuery, QueryTeamIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryTeamIdQuery, QueryTeamIdQueryVariables>(QueryTeamIdDocument, options);
        }
export function useQueryTeamIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QueryTeamIdQuery, QueryTeamIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryTeamIdQuery, QueryTeamIdQueryVariables>(QueryTeamIdDocument, options);
        }
export type QueryTeamIdQueryHookResult = ReturnType<typeof useQueryTeamIdQuery>;
export type QueryTeamIdLazyQueryHookResult = ReturnType<typeof useQueryTeamIdLazyQuery>;
export type QueryTeamIdSuspenseQueryHookResult = ReturnType<typeof useQueryTeamIdSuspenseQuery>;
export type QueryTeamIdQueryResult = Apollo.QueryResult<QueryTeamIdQuery, QueryTeamIdQueryVariables>;
export const UpdateContestStatusDocument = gql`
    mutation UpdateContestStatus($contest_id: uuid!, $status: String!) {
  update_contest(where: {id: {_eq: $contest_id}}, _set: {status: $status}) {
    returning {
      status
    }
  }
}
    `;
export type UpdateContestStatusMutationFn = Apollo.MutationFunction<UpdateContestStatusMutation, UpdateContestStatusMutationVariables>;

/**
 * __useUpdateContestStatusMutation__
 *
 * To run a mutation, you first call `useUpdateContestStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestStatusMutation, { data, loading, error }] = useUpdateContestStatusMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateContestStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestStatusMutation, UpdateContestStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestStatusMutation, UpdateContestStatusMutationVariables>(UpdateContestStatusDocument, options);
      }
export type UpdateContestStatusMutationHookResult = ReturnType<typeof useUpdateContestStatusMutation>;
export type UpdateContestStatusMutationResult = Apollo.MutationResult<UpdateContestStatusMutation>;
export type UpdateContestStatusMutationOptions = Apollo.BaseMutationOptions<UpdateContestStatusMutation, UpdateContestStatusMutationVariables>;
export const GetContestNoticesDocument = gql`
    query GetContestNotices($contest_id: uuid!) {
  contest_info(
    where: {contest_id: {_eq: $contest_id}}
    order_by: {updated_at: desc}
  ) {
    content
    created_at
    updated_at
    files
    id
    title
  }
}
    `;

/**
 * __useGetContestNoticesQuery__
 *
 * To run a query within a React component, call `useGetContestNoticesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestNoticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestNoticesQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestNoticesQuery(baseOptions: Apollo.QueryHookOptions<GetContestNoticesQuery, GetContestNoticesQueryVariables> & ({ variables: GetContestNoticesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestNoticesQuery, GetContestNoticesQueryVariables>(GetContestNoticesDocument, options);
      }
export function useGetContestNoticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestNoticesQuery, GetContestNoticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestNoticesQuery, GetContestNoticesQueryVariables>(GetContestNoticesDocument, options);
        }
export function useGetContestNoticesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestNoticesQuery, GetContestNoticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestNoticesQuery, GetContestNoticesQueryVariables>(GetContestNoticesDocument, options);
        }
export type GetContestNoticesQueryHookResult = ReturnType<typeof useGetContestNoticesQuery>;
export type GetContestNoticesLazyQueryHookResult = ReturnType<typeof useGetContestNoticesLazyQuery>;
export type GetContestNoticesSuspenseQueryHookResult = ReturnType<typeof useGetContestNoticesSuspenseQuery>;
export type GetContestNoticesQueryResult = Apollo.QueryResult<GetContestNoticesQuery, GetContestNoticesQueryVariables>;
export const UpdateContestNoticeDocument = gql`
    mutation UpdateContestNotice($id: uuid!, $title: String!, $content: String!, $files: String, $contest_id: uuid!) {
  update_contest_info(
    where: {id: {_eq: $id}}
    _set: {title: $title, content: $content, files: $files, contest_id: $contest_id}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateContestNoticeMutationFn = Apollo.MutationFunction<UpdateContestNoticeMutation, UpdateContestNoticeMutationVariables>;

/**
 * __useUpdateContestNoticeMutation__
 *
 * To run a mutation, you first call `useUpdateContestNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestNoticeMutation, { data, loading, error }] = useUpdateContestNoticeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      files: // value for 'files'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useUpdateContestNoticeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestNoticeMutation, UpdateContestNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestNoticeMutation, UpdateContestNoticeMutationVariables>(UpdateContestNoticeDocument, options);
      }
export type UpdateContestNoticeMutationHookResult = ReturnType<typeof useUpdateContestNoticeMutation>;
export type UpdateContestNoticeMutationResult = Apollo.MutationResult<UpdateContestNoticeMutation>;
export type UpdateContestNoticeMutationOptions = Apollo.BaseMutationOptions<UpdateContestNoticeMutation, UpdateContestNoticeMutationVariables>;
export const AddContestNoticeDocument = gql`
    mutation AddContestNotice($title: String!, $content: String!, $files: String, $contest_id: uuid!) {
  insert_contest_info(
    objects: {title: $title, content: $content, files: $files, contest_id: $contest_id}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddContestNoticeMutationFn = Apollo.MutationFunction<AddContestNoticeMutation, AddContestNoticeMutationVariables>;

/**
 * __useAddContestNoticeMutation__
 *
 * To run a mutation, you first call `useAddContestNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestNoticeMutation, { data, loading, error }] = useAddContestNoticeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      files: // value for 'files'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useAddContestNoticeMutation(baseOptions?: Apollo.MutationHookOptions<AddContestNoticeMutation, AddContestNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestNoticeMutation, AddContestNoticeMutationVariables>(AddContestNoticeDocument, options);
      }
export type AddContestNoticeMutationHookResult = ReturnType<typeof useAddContestNoticeMutation>;
export type AddContestNoticeMutationResult = Apollo.MutationResult<AddContestNoticeMutation>;
export type AddContestNoticeMutationOptions = Apollo.BaseMutationOptions<AddContestNoticeMutation, AddContestNoticeMutationVariables>;
export const DeleteContestNoticeDocument = gql`
    mutation DeleteContestNotice($id: uuid!) {
  delete_contest_info(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteContestNoticeMutationFn = Apollo.MutationFunction<DeleteContestNoticeMutation, DeleteContestNoticeMutationVariables>;

/**
 * __useDeleteContestNoticeMutation__
 *
 * To run a mutation, you first call `useDeleteContestNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestNoticeMutation, { data, loading, error }] = useDeleteContestNoticeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContestNoticeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestNoticeMutation, DeleteContestNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestNoticeMutation, DeleteContestNoticeMutationVariables>(DeleteContestNoticeDocument, options);
      }
export type DeleteContestNoticeMutationHookResult = ReturnType<typeof useDeleteContestNoticeMutation>;
export type DeleteContestNoticeMutationResult = Apollo.MutationResult<DeleteContestNoticeMutation>;
export type DeleteContestNoticeMutationOptions = Apollo.BaseMutationOptions<DeleteContestNoticeMutation, DeleteContestNoticeMutationVariables>;
export const GetContestsDocument = gql`
    query GetContests {
  contest(order_by: {start_date: desc}) {
    contest_name
    description
    end_date
    id
    start_date
    contest_type
  }
}
    `;

/**
 * __useGetContestsQuery__
 *
 * To run a query within a React component, call `useGetContestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContestsQuery(baseOptions?: Apollo.QueryHookOptions<GetContestsQuery, GetContestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestsQuery, GetContestsQueryVariables>(GetContestsDocument, options);
      }
export function useGetContestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestsQuery, GetContestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestsQuery, GetContestsQueryVariables>(GetContestsDocument, options);
        }
export function useGetContestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestsQuery, GetContestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestsQuery, GetContestsQueryVariables>(GetContestsDocument, options);
        }
export type GetContestsQueryHookResult = ReturnType<typeof useGetContestsQuery>;
export type GetContestsLazyQueryHookResult = ReturnType<typeof useGetContestsLazyQuery>;
export type GetContestsSuspenseQueryHookResult = ReturnType<typeof useGetContestsSuspenseQuery>;
export type GetContestsQueryResult = Apollo.QueryResult<GetContestsQuery, GetContestsQueryVariables>;
export const AddContestDocument = gql`
    mutation AddContest($start_date: timestamptz!, $end_date: timestamptz!, $description: String = "", $contest_name: String!, $contest_type: String!) {
  insert_contest(
    objects: {contest_name: $contest_name, description: $description, end_date: $end_date, start_date: $start_date, contest_type: $contest_type}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddContestMutationFn = Apollo.MutationFunction<AddContestMutation, AddContestMutationVariables>;

/**
 * __useAddContestMutation__
 *
 * To run a mutation, you first call `useAddContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestMutation, { data, loading, error }] = useAddContestMutation({
 *   variables: {
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *      description: // value for 'description'
 *      contest_name: // value for 'contest_name'
 *      contest_type: // value for 'contest_type'
 *   },
 * });
 */
export function useAddContestMutation(baseOptions?: Apollo.MutationHookOptions<AddContestMutation, AddContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestMutation, AddContestMutationVariables>(AddContestDocument, options);
      }
export type AddContestMutationHookResult = ReturnType<typeof useAddContestMutation>;
export type AddContestMutationResult = Apollo.MutationResult<AddContestMutation>;
export type AddContestMutationOptions = Apollo.BaseMutationOptions<AddContestMutation, AddContestMutationVariables>;
export const UpdateContestDocument = gql`
    mutation UpdateContest($id: uuid!, $description: String = "", $contest_name: String!, $end_date: timestamptz!, $start_date: timestamptz!, $contest_type: String!) {
  update_contest(
    where: {id: {_eq: $id}}
    _set: {contest_name: $contest_name, description: $description, end_date: $end_date, start_date: $start_date, contest_type: $contest_type}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateContestMutationFn = Apollo.MutationFunction<UpdateContestMutation, UpdateContestMutationVariables>;

/**
 * __useUpdateContestMutation__
 *
 * To run a mutation, you first call `useUpdateContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestMutation, { data, loading, error }] = useUpdateContestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *      contest_name: // value for 'contest_name'
 *      end_date: // value for 'end_date'
 *      start_date: // value for 'start_date'
 *      contest_type: // value for 'contest_type'
 *   },
 * });
 */
export function useUpdateContestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestMutation, UpdateContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestMutation, UpdateContestMutationVariables>(UpdateContestDocument, options);
      }
export type UpdateContestMutationHookResult = ReturnType<typeof useUpdateContestMutation>;
export type UpdateContestMutationResult = Apollo.MutationResult<UpdateContestMutation>;
export type UpdateContestMutationOptions = Apollo.BaseMutationOptions<UpdateContestMutation, UpdateContestMutationVariables>;
export const DeleteContestDocument = gql`
    mutation DeleteContest($id: uuid!) {
  delete_contest(where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export type DeleteContestMutationFn = Apollo.MutationFunction<DeleteContestMutation, DeleteContestMutationVariables>;

/**
 * __useDeleteContestMutation__
 *
 * To run a mutation, you first call `useDeleteContestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestMutation, { data, loading, error }] = useDeleteContestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestMutation, DeleteContestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestMutation, DeleteContestMutationVariables>(DeleteContestDocument, options);
      }
export type DeleteContestMutationHookResult = ReturnType<typeof useDeleteContestMutation>;
export type DeleteContestMutationResult = Apollo.MutationResult<DeleteContestMutation>;
export type DeleteContestMutationOptions = Apollo.BaseMutationOptions<DeleteContestMutation, DeleteContestMutationVariables>;
export const GetContestManagerDocument = gql`
    query GetContestManager($contest_id: uuid!) {
  contest_manager(where: {contest_id: {_eq: $contest_id}}) {
    userByUserUuid {
      uuid
      realname
      email
    }
  }
}
    `;

/**
 * __useGetContestManagerQuery__
 *
 * To run a query within a React component, call `useGetContestManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestManagerQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestManagerQuery(baseOptions: Apollo.QueryHookOptions<GetContestManagerQuery, GetContestManagerQueryVariables> & ({ variables: GetContestManagerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestManagerQuery, GetContestManagerQueryVariables>(GetContestManagerDocument, options);
      }
export function useGetContestManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestManagerQuery, GetContestManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestManagerQuery, GetContestManagerQueryVariables>(GetContestManagerDocument, options);
        }
export function useGetContestManagerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestManagerQuery, GetContestManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestManagerQuery, GetContestManagerQueryVariables>(GetContestManagerDocument, options);
        }
export type GetContestManagerQueryHookResult = ReturnType<typeof useGetContestManagerQuery>;
export type GetContestManagerLazyQueryHookResult = ReturnType<typeof useGetContestManagerLazyQuery>;
export type GetContestManagerSuspenseQueryHookResult = ReturnType<typeof useGetContestManagerSuspenseQuery>;
export type GetContestManagerQueryResult = Apollo.QueryResult<GetContestManagerQuery, GetContestManagerQueryVariables>;
export const DeleteContestAllManagerDocument = gql`
    mutation DeleteContestAllManager($contest_id: uuid!) {
  delete_contest_manager(where: {contest_id: {_eq: $contest_id}}) {
    affected_rows
  }
}
    `;
export type DeleteContestAllManagerMutationFn = Apollo.MutationFunction<DeleteContestAllManagerMutation, DeleteContestAllManagerMutationVariables>;

/**
 * __useDeleteContestAllManagerMutation__
 *
 * To run a mutation, you first call `useDeleteContestAllManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestAllManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestAllManagerMutation, { data, loading, error }] = useDeleteContestAllManagerMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useDeleteContestAllManagerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestAllManagerMutation, DeleteContestAllManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestAllManagerMutation, DeleteContestAllManagerMutationVariables>(DeleteContestAllManagerDocument, options);
      }
export type DeleteContestAllManagerMutationHookResult = ReturnType<typeof useDeleteContestAllManagerMutation>;
export type DeleteContestAllManagerMutationResult = Apollo.MutationResult<DeleteContestAllManagerMutation>;
export type DeleteContestAllManagerMutationOptions = Apollo.BaseMutationOptions<DeleteContestAllManagerMutation, DeleteContestAllManagerMutationVariables>;
export const AddContestManagerDocument = gql`
    mutation AddContestManager($contest_id: uuid!, $user_uuid: uuid!) {
  insert_contest_manager(
    objects: {contest_id: $contest_id, user_uuid: $user_uuid}
  ) {
    affected_rows
  }
}
    `;
export type AddContestManagerMutationFn = Apollo.MutationFunction<AddContestManagerMutation, AddContestManagerMutationVariables>;

/**
 * __useAddContestManagerMutation__
 *
 * To run a mutation, you first call `useAddContestManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestManagerMutation, { data, loading, error }] = useAddContestManagerMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      user_uuid: // value for 'user_uuid'
 *   },
 * });
 */
export function useAddContestManagerMutation(baseOptions?: Apollo.MutationHookOptions<AddContestManagerMutation, AddContestManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestManagerMutation, AddContestManagerMutationVariables>(AddContestManagerDocument, options);
      }
export type AddContestManagerMutationHookResult = ReturnType<typeof useAddContestManagerMutation>;
export type AddContestManagerMutationResult = Apollo.MutationResult<AddContestManagerMutation>;
export type AddContestManagerMutationOptions = Apollo.BaseMutationOptions<AddContestManagerMutation, AddContestManagerMutationVariables>;
export const GetUser_IdDocument = gql`
    query GetUser_Id($email: String!, $name: String!) {
  users(where: {email: {_eq: $email}, realname: {_eq: $name}}) {
    uuid
  }
}
    `;

/**
 * __useGetUser_IdQuery__
 *
 * To run a query within a React component, call `useGetUser_IdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUser_IdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUser_IdQuery({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUser_IdQuery(baseOptions: Apollo.QueryHookOptions<GetUser_IdQuery, GetUser_IdQueryVariables> & ({ variables: GetUser_IdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUser_IdQuery, GetUser_IdQueryVariables>(GetUser_IdDocument, options);
      }
export function useGetUser_IdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUser_IdQuery, GetUser_IdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUser_IdQuery, GetUser_IdQueryVariables>(GetUser_IdDocument, options);
        }
export function useGetUser_IdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUser_IdQuery, GetUser_IdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUser_IdQuery, GetUser_IdQueryVariables>(GetUser_IdDocument, options);
        }
export type GetUser_IdQueryHookResult = ReturnType<typeof useGetUser_IdQuery>;
export type GetUser_IdLazyQueryHookResult = ReturnType<typeof useGetUser_IdLazyQuery>;
export type GetUser_IdSuspenseQueryHookResult = ReturnType<typeof useGetUser_IdSuspenseQuery>;
export type GetUser_IdQueryResult = Apollo.QueryResult<GetUser_IdQuery, GetUser_IdQueryVariables>;
export const DeleteContestAllTeamsDocument = gql`
    mutation DeleteContestAllTeams($contest_id: uuid!) {
  delete_contest_team(where: {contest_id: {_eq: $contest_id}}) {
    affected_rows
  }
}
    `;
export type DeleteContestAllTeamsMutationFn = Apollo.MutationFunction<DeleteContestAllTeamsMutation, DeleteContestAllTeamsMutationVariables>;

/**
 * __useDeleteContestAllTeamsMutation__
 *
 * To run a mutation, you first call `useDeleteContestAllTeamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestAllTeamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestAllTeamsMutation, { data, loading, error }] = useDeleteContestAllTeamsMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useDeleteContestAllTeamsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestAllTeamsMutation, DeleteContestAllTeamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestAllTeamsMutation, DeleteContestAllTeamsMutationVariables>(DeleteContestAllTeamsDocument, options);
      }
export type DeleteContestAllTeamsMutationHookResult = ReturnType<typeof useDeleteContestAllTeamsMutation>;
export type DeleteContestAllTeamsMutationResult = Apollo.MutationResult<DeleteContestAllTeamsMutation>;
export type DeleteContestAllTeamsMutationOptions = Apollo.BaseMutationOptions<DeleteContestAllTeamsMutation, DeleteContestAllTeamsMutationVariables>;
export const DeleteContestAllInfoDocument = gql`
    mutation DeleteContestAllInfo($contest_id: uuid!) {
  delete_contest_info(where: {contest_id: {_eq: $contest_id}}) {
    affected_rows
  }
}
    `;
export type DeleteContestAllInfoMutationFn = Apollo.MutationFunction<DeleteContestAllInfoMutation, DeleteContestAllInfoMutationVariables>;

/**
 * __useDeleteContestAllInfoMutation__
 *
 * To run a mutation, you first call `useDeleteContestAllInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestAllInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestAllInfoMutation, { data, loading, error }] = useDeleteContestAllInfoMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useDeleteContestAllInfoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestAllInfoMutation, DeleteContestAllInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestAllInfoMutation, DeleteContestAllInfoMutationVariables>(DeleteContestAllInfoDocument, options);
      }
export type DeleteContestAllInfoMutationHookResult = ReturnType<typeof useDeleteContestAllInfoMutation>;
export type DeleteContestAllInfoMutationResult = Apollo.MutationResult<DeleteContestAllInfoMutation>;
export type DeleteContestAllInfoMutationOptions = Apollo.BaseMutationOptions<DeleteContestAllInfoMutation, DeleteContestAllInfoMutationVariables>;
export const DeleteContestAllRoomsDocument = gql`
    mutation DeleteContestAllRooms($contest_id: uuid!) {
  delete_contest_room(where: {contest_id: {_eq: $contest_id}}) {
    affected_rows
  }
}
    `;
export type DeleteContestAllRoomsMutationFn = Apollo.MutationFunction<DeleteContestAllRoomsMutation, DeleteContestAllRoomsMutationVariables>;

/**
 * __useDeleteContestAllRoomsMutation__
 *
 * To run a mutation, you first call `useDeleteContestAllRoomsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestAllRoomsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestAllRoomsMutation, { data, loading, error }] = useDeleteContestAllRoomsMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useDeleteContestAllRoomsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestAllRoomsMutation, DeleteContestAllRoomsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestAllRoomsMutation, DeleteContestAllRoomsMutationVariables>(DeleteContestAllRoomsDocument, options);
      }
export type DeleteContestAllRoomsMutationHookResult = ReturnType<typeof useDeleteContestAllRoomsMutation>;
export type DeleteContestAllRoomsMutationResult = Apollo.MutationResult<DeleteContestAllRoomsMutation>;
export type DeleteContestAllRoomsMutationOptions = Apollo.BaseMutationOptions<DeleteContestAllRoomsMutation, DeleteContestAllRoomsMutationVariables>;
export const GetAidListDocument = gql`
    query GetAidList {
  scholarships_aids(where: {IsAids: {_eq: true}}) {
    amount
    code
    name
    salutation
    type
  }
}
    `;

/**
 * __useGetAidListQuery__
 *
 * To run a query within a React component, call `useGetAidListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAidListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAidListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAidListQuery(baseOptions?: Apollo.QueryHookOptions<GetAidListQuery, GetAidListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAidListQuery, GetAidListQueryVariables>(GetAidListDocument, options);
      }
export function useGetAidListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAidListQuery, GetAidListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAidListQuery, GetAidListQueryVariables>(GetAidListDocument, options);
        }
export function useGetAidListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAidListQuery, GetAidListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAidListQuery, GetAidListQueryVariables>(GetAidListDocument, options);
        }
export type GetAidListQueryHookResult = ReturnType<typeof useGetAidListQuery>;
export type GetAidListLazyQueryHookResult = ReturnType<typeof useGetAidListLazyQuery>;
export type GetAidListSuspenseQueryHookResult = ReturnType<typeof useGetAidListSuspenseQuery>;
export type GetAidListQueryResult = Apollo.QueryResult<GetAidListQuery, GetAidListQueryVariables>;
export const GetAidApplicationsDocument = gql`
    query GetAidApplications($_id: String!, $_gte: timestamptz!) {
  aid_application(
    where: {student_id: {_eq: $_id}, updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
    order_by: {created_at: asc}
  ) {
    id
    student {
      id
      name
      department
      class
    }
    aid
    amount
    code
    thank_letter
    form_url
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetAidApplicationsQuery__
 *
 * To run a query within a React component, call `useGetAidApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAidApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAidApplicationsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      _gte: // value for '_gte'
 *   },
 * });
 */
export function useGetAidApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetAidApplicationsQuery, GetAidApplicationsQueryVariables> & ({ variables: GetAidApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>(GetAidApplicationsDocument, options);
      }
export function useGetAidApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>(GetAidApplicationsDocument, options);
        }
export function useGetAidApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>(GetAidApplicationsDocument, options);
        }
export type GetAidApplicationsQueryHookResult = ReturnType<typeof useGetAidApplicationsQuery>;
export type GetAidApplicationsLazyQueryHookResult = ReturnType<typeof useGetAidApplicationsLazyQuery>;
export type GetAidApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetAidApplicationsSuspenseQuery>;
export type GetAidApplicationsQueryResult = Apollo.QueryResult<GetAidApplicationsQuery, GetAidApplicationsQueryVariables>;
export const GetAidApplicationsForCounselorsDocument = gql`
    query GetAidApplicationsForCounselors {
  aid_application(order_by: {created_at: asc}) {
    id
    student {
      id
      name
      department
      class
    }
    aid
    amount
    code
    thank_letter
    form_url
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetAidApplicationsForCounselorsQuery__
 *
 * To run a query within a React component, call `useGetAidApplicationsForCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAidApplicationsForCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAidApplicationsForCounselorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAidApplicationsForCounselorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>(GetAidApplicationsForCounselorsDocument, options);
      }
export function useGetAidApplicationsForCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>(GetAidApplicationsForCounselorsDocument, options);
        }
export function useGetAidApplicationsForCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>(GetAidApplicationsForCounselorsDocument, options);
        }
export type GetAidApplicationsForCounselorsQueryHookResult = ReturnType<typeof useGetAidApplicationsForCounselorsQuery>;
export type GetAidApplicationsForCounselorsLazyQueryHookResult = ReturnType<typeof useGetAidApplicationsForCounselorsLazyQuery>;
export type GetAidApplicationsForCounselorsSuspenseQueryHookResult = ReturnType<typeof useGetAidApplicationsForCounselorsSuspenseQuery>;
export type GetAidApplicationsForCounselorsQueryResult = Apollo.QueryResult<GetAidApplicationsForCounselorsQuery, GetAidApplicationsForCounselorsQueryVariables>;
export const AddAidApplicationDocument = gql`
    mutation AddAidApplication($student_id: String!, $aid: String!, $amount: Int!, $code: String!) {
  insert_aid_application(
    objects: {student_id: $student_id, aid: $aid, amount: $amount, code: $code}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddAidApplicationMutationFn = Apollo.MutationFunction<AddAidApplicationMutation, AddAidApplicationMutationVariables>;

/**
 * __useAddAidApplicationMutation__
 *
 * To run a mutation, you first call `useAddAidApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAidApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAidApplicationMutation, { data, loading, error }] = useAddAidApplicationMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      aid: // value for 'aid'
 *      amount: // value for 'amount'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAddAidApplicationMutation(baseOptions?: Apollo.MutationHookOptions<AddAidApplicationMutation, AddAidApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAidApplicationMutation, AddAidApplicationMutationVariables>(AddAidApplicationDocument, options);
      }
export type AddAidApplicationMutationHookResult = ReturnType<typeof useAddAidApplicationMutation>;
export type AddAidApplicationMutationResult = Apollo.MutationResult<AddAidApplicationMutation>;
export type AddAidApplicationMutationOptions = Apollo.BaseMutationOptions<AddAidApplicationMutation, AddAidApplicationMutationVariables>;
export const UpdateAidApplicationDocument = gql`
    mutation UpdateAidApplication($id: uuid!, $thank_letter: String, $form_url: String) {
  update_aid_application(
    where: {id: {_eq: $id}}
    _set: {thank_letter: $thank_letter, form_url: $form_url}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateAidApplicationMutationFn = Apollo.MutationFunction<UpdateAidApplicationMutation, UpdateAidApplicationMutationVariables>;

/**
 * __useUpdateAidApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateAidApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAidApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAidApplicationMutation, { data, loading, error }] = useUpdateAidApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      thank_letter: // value for 'thank_letter'
 *      form_url: // value for 'form_url'
 *   },
 * });
 */
export function useUpdateAidApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAidApplicationMutation, UpdateAidApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAidApplicationMutation, UpdateAidApplicationMutationVariables>(UpdateAidApplicationDocument, options);
      }
export type UpdateAidApplicationMutationHookResult = ReturnType<typeof useUpdateAidApplicationMutation>;
export type UpdateAidApplicationMutationResult = Apollo.MutationResult<UpdateAidApplicationMutation>;
export type UpdateAidApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateAidApplicationMutation, UpdateAidApplicationMutationVariables>;
export const DeleteAidApplicationDocument = gql`
    mutation DeleteAidApplication($id: uuid!) {
  delete_aid_application(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteAidApplicationMutationFn = Apollo.MutationFunction<DeleteAidApplicationMutation, DeleteAidApplicationMutationVariables>;

/**
 * __useDeleteAidApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteAidApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAidApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAidApplicationMutation, { data, loading, error }] = useDeleteAidApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAidApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAidApplicationMutation, DeleteAidApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAidApplicationMutation, DeleteAidApplicationMutationVariables>(DeleteAidApplicationDocument, options);
      }
export type DeleteAidApplicationMutationHookResult = ReturnType<typeof useDeleteAidApplicationMutation>;
export type DeleteAidApplicationMutationResult = Apollo.MutationResult<DeleteAidApplicationMutation>;
export type DeleteAidApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteAidApplicationMutation, DeleteAidApplicationMutationVariables>;
export const GetIdByStudentNoDocument = gql`
    query GetIdByStudentNo($student_no: String!) {
  users(where: {student_no: {_eq: $student_no}}) {
    id
  }
}
    `;

/**
 * __useGetIdByStudentNoQuery__
 *
 * To run a query within a React component, call `useGetIdByStudentNoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdByStudentNoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdByStudentNoQuery({
 *   variables: {
 *      student_no: // value for 'student_no'
 *   },
 * });
 */
export function useGetIdByStudentNoQuery(baseOptions: Apollo.QueryHookOptions<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables> & ({ variables: GetIdByStudentNoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>(GetIdByStudentNoDocument, options);
      }
export function useGetIdByStudentNoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>(GetIdByStudentNoDocument, options);
        }
export function useGetIdByStudentNoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>(GetIdByStudentNoDocument, options);
        }
export type GetIdByStudentNoQueryHookResult = ReturnType<typeof useGetIdByStudentNoQuery>;
export type GetIdByStudentNoLazyQueryHookResult = ReturnType<typeof useGetIdByStudentNoLazyQuery>;
export type GetIdByStudentNoSuspenseQueryHookResult = ReturnType<typeof useGetIdByStudentNoSuspenseQuery>;
export type GetIdByStudentNoQueryResult = Apollo.QueryResult<GetIdByStudentNoQuery, GetIdByStudentNoQueryVariables>;
export const GetApprovedMentorApplicationsDocument = gql`
    query GetApprovedMentorApplications($uuid: uuid!) {
  mentor_application(
    where: {_and: [{_or: [{student_uuid: {_eq: $uuid}}, {mentor_uuid: {_eq: $uuid}}]}, {status: {_eq: "approved"}}]}
    order_by: {created_at: asc}
  ) {
    id
    student_byuuid {
      uuid
      realname
    }
    mentor_byuuid {
      uuid
      realname
    }
    statement
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetApprovedMentorApplicationsQuery__
 *
 * To run a query within a React component, call `useGetApprovedMentorApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovedMentorApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovedMentorApplicationsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetApprovedMentorApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables> & ({ variables: GetApprovedMentorApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>(GetApprovedMentorApplicationsDocument, options);
      }
export function useGetApprovedMentorApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>(GetApprovedMentorApplicationsDocument, options);
        }
export function useGetApprovedMentorApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>(GetApprovedMentorApplicationsDocument, options);
        }
export type GetApprovedMentorApplicationsQueryHookResult = ReturnType<typeof useGetApprovedMentorApplicationsQuery>;
export type GetApprovedMentorApplicationsLazyQueryHookResult = ReturnType<typeof useGetApprovedMentorApplicationsLazyQuery>;
export type GetApprovedMentorApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetApprovedMentorApplicationsSuspenseQuery>;
export type GetApprovedMentorApplicationsQueryResult = Apollo.QueryResult<GetApprovedMentorApplicationsQuery, GetApprovedMentorApplicationsQueryVariables>;
export const SubscribeToMessagesDocument = gql`
    subscription SubscribeToMessages($from_uuid: uuid!, $to_uuid: uuid!) {
  mentor_message(
    order_by: {created_at: asc}
    where: {_or: [{_and: {from_uuid: {_eq: $from_uuid}, to_uuid: {_eq: $to_uuid}}}, {_and: {from_uuid: {_eq: $to_uuid}, to_uuid: {_eq: $from_uuid}}}]}
  ) {
    created_at
    from_uuid
    id
    payload
    to_uuid
  }
}
    `;

/**
 * __useSubscribeToMessagesSubscription__
 *
 * To run a query within a React component, call `useSubscribeToMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToMessagesSubscription({
 *   variables: {
 *      from_uuid: // value for 'from_uuid'
 *      to_uuid: // value for 'to_uuid'
 *   },
 * });
 */
export function useSubscribeToMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeToMessagesSubscription, SubscribeToMessagesSubscriptionVariables> & ({ variables: SubscribeToMessagesSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToMessagesSubscription, SubscribeToMessagesSubscriptionVariables>(SubscribeToMessagesDocument, options);
      }
export type SubscribeToMessagesSubscriptionHookResult = ReturnType<typeof useSubscribeToMessagesSubscription>;
export type SubscribeToMessagesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToMessagesSubscription>;
export const AddMessageDocument = gql`
    mutation AddMessage($from_uuid: uuid!, $to_uuid: uuid!, $payload: String!) {
  insert_mentor_message(
    objects: {from_uuid: $from_uuid, to_uuid: $to_uuid, payload: $payload}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      from_uuid: // value for 'from_uuid'
 *      to_uuid: // value for 'to_uuid'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, options);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const GetHonorApplicationsDocument = gql`
    query GetHonorApplications($_id: String!, $_gte: timestamptz!) {
  honor_application(
    where: {student_id: {_eq: $_id}, updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
    order_by: {created_at: asc}
  ) {
    id
    honor
    statement
    attachment_url
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetHonorApplicationsQuery__
 *
 * To run a query within a React component, call `useGetHonorApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHonorApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHonorApplicationsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      _gte: // value for '_gte'
 *   },
 * });
 */
export function useGetHonorApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables> & ({ variables: GetHonorApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>(GetHonorApplicationsDocument, options);
      }
export function useGetHonorApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>(GetHonorApplicationsDocument, options);
        }
export function useGetHonorApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>(GetHonorApplicationsDocument, options);
        }
export type GetHonorApplicationsQueryHookResult = ReturnType<typeof useGetHonorApplicationsQuery>;
export type GetHonorApplicationsLazyQueryHookResult = ReturnType<typeof useGetHonorApplicationsLazyQuery>;
export type GetHonorApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetHonorApplicationsSuspenseQuery>;
export type GetHonorApplicationsQueryResult = Apollo.QueryResult<GetHonorApplicationsQuery, GetHonorApplicationsQueryVariables>;
export const GetHonorApplicationsForCounselorsDocument = gql`
    query GetHonorApplicationsForCounselors($_gte: timestamptz!) {
  honor_application(
    order_by: {created_at: asc}
    where: {updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
  ) {
    id
    honor
    statement
    attachment_url
    status
    student {
      id
      name
      class
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetHonorApplicationsForCounselorsQuery__
 *
 * To run a query within a React component, call `useGetHonorApplicationsForCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHonorApplicationsForCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHonorApplicationsForCounselorsQuery({
 *   variables: {
 *      _gte: // value for '_gte'
 *   },
 * });
 */
export function useGetHonorApplicationsForCounselorsQuery(baseOptions: Apollo.QueryHookOptions<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables> & ({ variables: GetHonorApplicationsForCounselorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>(GetHonorApplicationsForCounselorsDocument, options);
      }
export function useGetHonorApplicationsForCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>(GetHonorApplicationsForCounselorsDocument, options);
        }
export function useGetHonorApplicationsForCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>(GetHonorApplicationsForCounselorsDocument, options);
        }
export type GetHonorApplicationsForCounselorsQueryHookResult = ReturnType<typeof useGetHonorApplicationsForCounselorsQuery>;
export type GetHonorApplicationsForCounselorsLazyQueryHookResult = ReturnType<typeof useGetHonorApplicationsForCounselorsLazyQuery>;
export type GetHonorApplicationsForCounselorsSuspenseQueryHookResult = ReturnType<typeof useGetHonorApplicationsForCounselorsSuspenseQuery>;
export type GetHonorApplicationsForCounselorsQueryResult = Apollo.QueryResult<GetHonorApplicationsForCounselorsQuery, GetHonorApplicationsForCounselorsQueryVariables>;
export const AddHonorApplicationDocument = gql`
    mutation AddHonorApplication($student_id: String!, $honor: String!, $statement: String!, $attachment_url: String) {
  insert_honor_application(
    objects: {student_id: $student_id, honor: $honor, statement: $statement, attachment_url: $attachment_url}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddHonorApplicationMutationFn = Apollo.MutationFunction<AddHonorApplicationMutation, AddHonorApplicationMutationVariables>;

/**
 * __useAddHonorApplicationMutation__
 *
 * To run a mutation, you first call `useAddHonorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHonorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHonorApplicationMutation, { data, loading, error }] = useAddHonorApplicationMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      honor: // value for 'honor'
 *      statement: // value for 'statement'
 *      attachment_url: // value for 'attachment_url'
 *   },
 * });
 */
export function useAddHonorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<AddHonorApplicationMutation, AddHonorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHonorApplicationMutation, AddHonorApplicationMutationVariables>(AddHonorApplicationDocument, options);
      }
export type AddHonorApplicationMutationHookResult = ReturnType<typeof useAddHonorApplicationMutation>;
export type AddHonorApplicationMutationResult = Apollo.MutationResult<AddHonorApplicationMutation>;
export type AddHonorApplicationMutationOptions = Apollo.BaseMutationOptions<AddHonorApplicationMutation, AddHonorApplicationMutationVariables>;
export const UpdateHonorApplicationDocument = gql`
    mutation UpdateHonorApplication($id: uuid!, $honor: String!, $statement: String!, $attachment_url: String) {
  update_honor_application(
    where: {id: {_eq: $id}}
    _set: {honor: $honor, statement: $statement, attachment_url: $attachment_url}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateHonorApplicationMutationFn = Apollo.MutationFunction<UpdateHonorApplicationMutation, UpdateHonorApplicationMutationVariables>;

/**
 * __useUpdateHonorApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateHonorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHonorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHonorApplicationMutation, { data, loading, error }] = useUpdateHonorApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      honor: // value for 'honor'
 *      statement: // value for 'statement'
 *      attachment_url: // value for 'attachment_url'
 *   },
 * });
 */
export function useUpdateHonorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHonorApplicationMutation, UpdateHonorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHonorApplicationMutation, UpdateHonorApplicationMutationVariables>(UpdateHonorApplicationDocument, options);
      }
export type UpdateHonorApplicationMutationHookResult = ReturnType<typeof useUpdateHonorApplicationMutation>;
export type UpdateHonorApplicationMutationResult = Apollo.MutationResult<UpdateHonorApplicationMutation>;
export type UpdateHonorApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateHonorApplicationMutation, UpdateHonorApplicationMutationVariables>;
export const DeleteHonorApplicationDocument = gql`
    mutation DeleteHonorApplication($id: uuid!) {
  delete_honor_application(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteHonorApplicationMutationFn = Apollo.MutationFunction<DeleteHonorApplicationMutation, DeleteHonorApplicationMutationVariables>;

/**
 * __useDeleteHonorApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteHonorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHonorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHonorApplicationMutation, { data, loading, error }] = useDeleteHonorApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHonorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHonorApplicationMutation, DeleteHonorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHonorApplicationMutation, DeleteHonorApplicationMutationVariables>(DeleteHonorApplicationDocument, options);
      }
export type DeleteHonorApplicationMutationHookResult = ReturnType<typeof useDeleteHonorApplicationMutation>;
export type DeleteHonorApplicationMutationResult = Apollo.MutationResult<DeleteHonorApplicationMutation>;
export type DeleteHonorApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteHonorApplicationMutation, DeleteHonorApplicationMutationVariables>;
export const UpdateHonorApplicationStatusDocument = gql`
    mutation UpdateHonorApplicationStatus($id: uuid!, $status: String!) {
  update_honor_application(where: {id: {_eq: $id}}, _set: {status: $status}) {
    returning {
      id
      status
    }
  }
}
    `;
export type UpdateHonorApplicationStatusMutationFn = Apollo.MutationFunction<UpdateHonorApplicationStatusMutation, UpdateHonorApplicationStatusMutationVariables>;

/**
 * __useUpdateHonorApplicationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateHonorApplicationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHonorApplicationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHonorApplicationStatusMutation, { data, loading, error }] = useUpdateHonorApplicationStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateHonorApplicationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHonorApplicationStatusMutation, UpdateHonorApplicationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHonorApplicationStatusMutation, UpdateHonorApplicationStatusMutationVariables>(UpdateHonorApplicationStatusDocument, options);
      }
export type UpdateHonorApplicationStatusMutationHookResult = ReturnType<typeof useUpdateHonorApplicationStatusMutation>;
export type UpdateHonorApplicationStatusMutationResult = Apollo.MutationResult<UpdateHonorApplicationStatusMutation>;
export type UpdateHonorApplicationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateHonorApplicationStatusMutation, UpdateHonorApplicationStatusMutationVariables>;
export const GetMentorApplicationsDocument = gql`
    query GetMentorApplications($uuid: uuid!) {
  mentor_application(
    where: {_or: [{student_uuid: {_eq: $uuid}}, {mentor_uuid: {_eq: $uuid}}]}
    order_by: {created_at: asc}
  ) {
    id
    student_byuuid {
      realname
      department
      email
      phone
    }
    mentor_byuuid {
      realname
      department
      mentor_available {
        available
      }
    }
    statement
    status
    chat_status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetMentorApplicationsQuery__
 *
 * To run a query within a React component, call `useGetMentorApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorApplicationsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetMentorApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables> & ({ variables: GetMentorApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>(GetMentorApplicationsDocument, options);
      }
export function useGetMentorApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>(GetMentorApplicationsDocument, options);
        }
export function useGetMentorApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>(GetMentorApplicationsDocument, options);
        }
export type GetMentorApplicationsQueryHookResult = ReturnType<typeof useGetMentorApplicationsQuery>;
export type GetMentorApplicationsLazyQueryHookResult = ReturnType<typeof useGetMentorApplicationsLazyQuery>;
export type GetMentorApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetMentorApplicationsSuspenseQuery>;
export type GetMentorApplicationsQueryResult = Apollo.QueryResult<GetMentorApplicationsQuery, GetMentorApplicationsQueryVariables>;
export const GetMentorApplicationsForCounselorsDocument = gql`
    query GetMentorApplicationsForCounselors {
  mentor_application(order_by: {created_at: asc}) {
    id
    student_byuuid {
      uuid
      realname
      class
      department
      email
      phone
    }
    mentor_byuuid {
      realname
      department
      mentor_available {
        available
      }
    }
    statement
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetMentorApplicationsForCounselorsQuery__
 *
 * To run a query within a React component, call `useGetMentorApplicationsForCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorApplicationsForCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorApplicationsForCounselorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMentorApplicationsForCounselorsQuery(baseOptions?: Apollo.QueryHookOptions<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>(GetMentorApplicationsForCounselorsDocument, options);
      }
export function useGetMentorApplicationsForCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>(GetMentorApplicationsForCounselorsDocument, options);
        }
export function useGetMentorApplicationsForCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>(GetMentorApplicationsForCounselorsDocument, options);
        }
export type GetMentorApplicationsForCounselorsQueryHookResult = ReturnType<typeof useGetMentorApplicationsForCounselorsQuery>;
export type GetMentorApplicationsForCounselorsLazyQueryHookResult = ReturnType<typeof useGetMentorApplicationsForCounselorsLazyQuery>;
export type GetMentorApplicationsForCounselorsSuspenseQueryHookResult = ReturnType<typeof useGetMentorApplicationsForCounselorsSuspenseQuery>;
export type GetMentorApplicationsForCounselorsQueryResult = Apollo.QueryResult<GetMentorApplicationsForCounselorsQuery, GetMentorApplicationsForCounselorsQueryVariables>;
export const GetMentorAvailableDocument = gql`
    query GetMentorAvailable($uuid: uuid!) {
  mentor_available(where: {mentor_uuid: {_eq: $uuid}}) {
    available
  }
}
    `;

/**
 * __useGetMentorAvailableQuery__
 *
 * To run a query within a React component, call `useGetMentorAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorAvailableQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetMentorAvailableQuery(baseOptions: Apollo.QueryHookOptions<GetMentorAvailableQuery, GetMentorAvailableQueryVariables> & ({ variables: GetMentorAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>(GetMentorAvailableDocument, options);
      }
export function useGetMentorAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>(GetMentorAvailableDocument, options);
        }
export function useGetMentorAvailableSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>(GetMentorAvailableDocument, options);
        }
export type GetMentorAvailableQueryHookResult = ReturnType<typeof useGetMentorAvailableQuery>;
export type GetMentorAvailableLazyQueryHookResult = ReturnType<typeof useGetMentorAvailableLazyQuery>;
export type GetMentorAvailableSuspenseQueryHookResult = ReturnType<typeof useGetMentorAvailableSuspenseQuery>;
export type GetMentorAvailableQueryResult = Apollo.QueryResult<GetMentorAvailableQuery, GetMentorAvailableQueryVariables>;
export const ChangeMentorAvailableDocument = gql`
    mutation ChangeMentorAvailable($uuid: uuid!, $available: Boolean!) {
  insert_mentor_available_one(
    object: {mentor_uuid: $uuid, available: $available}
    on_conflict: {constraint: mentor_available_mentor_uuid_key, update_columns: available}
  ) {
    mentor_uuid
    available
  }
}
    `;
export type ChangeMentorAvailableMutationFn = Apollo.MutationFunction<ChangeMentorAvailableMutation, ChangeMentorAvailableMutationVariables>;

/**
 * __useChangeMentorAvailableMutation__
 *
 * To run a mutation, you first call `useChangeMentorAvailableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMentorAvailableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMentorAvailableMutation, { data, loading, error }] = useChangeMentorAvailableMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      available: // value for 'available'
 *   },
 * });
 */
export function useChangeMentorAvailableMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMentorAvailableMutation, ChangeMentorAvailableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeMentorAvailableMutation, ChangeMentorAvailableMutationVariables>(ChangeMentorAvailableDocument, options);
      }
export type ChangeMentorAvailableMutationHookResult = ReturnType<typeof useChangeMentorAvailableMutation>;
export type ChangeMentorAvailableMutationResult = Apollo.MutationResult<ChangeMentorAvailableMutation>;
export type ChangeMentorAvailableMutationOptions = Apollo.BaseMutationOptions<ChangeMentorAvailableMutation, ChangeMentorAvailableMutationVariables>;
export const UpdateMentorApplicationStatusDocument = gql`
    mutation UpdateMentorApplicationStatus($id: uuid!, $status: String!) {
  update_mentor_application(where: {id: {_eq: $id}}, _set: {status: $status}) {
    returning {
      id
    }
  }
}
    `;
export type UpdateMentorApplicationStatusMutationFn = Apollo.MutationFunction<UpdateMentorApplicationStatusMutation, UpdateMentorApplicationStatusMutationVariables>;

/**
 * __useUpdateMentorApplicationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateMentorApplicationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMentorApplicationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMentorApplicationStatusMutation, { data, loading, error }] = useUpdateMentorApplicationStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateMentorApplicationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMentorApplicationStatusMutation, UpdateMentorApplicationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMentorApplicationStatusMutation, UpdateMentorApplicationStatusMutationVariables>(UpdateMentorApplicationStatusDocument, options);
      }
export type UpdateMentorApplicationStatusMutationHookResult = ReturnType<typeof useUpdateMentorApplicationStatusMutation>;
export type UpdateMentorApplicationStatusMutationResult = Apollo.MutationResult<UpdateMentorApplicationStatusMutation>;
export type UpdateMentorApplicationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateMentorApplicationStatusMutation, UpdateMentorApplicationStatusMutationVariables>;
export const UpdateMentorApplicationChatStatusDocument = gql`
    mutation UpdateMentorApplicationChatStatus($id: uuid!, $chat_status: Boolean!) {
  update_mentor_application(
    where: {id: {_eq: $id}}
    _set: {chat_status: $chat_status}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateMentorApplicationChatStatusMutationFn = Apollo.MutationFunction<UpdateMentorApplicationChatStatusMutation, UpdateMentorApplicationChatStatusMutationVariables>;

/**
 * __useUpdateMentorApplicationChatStatusMutation__
 *
 * To run a mutation, you first call `useUpdateMentorApplicationChatStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMentorApplicationChatStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMentorApplicationChatStatusMutation, { data, loading, error }] = useUpdateMentorApplicationChatStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      chat_status: // value for 'chat_status'
 *   },
 * });
 */
export function useUpdateMentorApplicationChatStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMentorApplicationChatStatusMutation, UpdateMentorApplicationChatStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMentorApplicationChatStatusMutation, UpdateMentorApplicationChatStatusMutationVariables>(UpdateMentorApplicationChatStatusDocument, options);
      }
export type UpdateMentorApplicationChatStatusMutationHookResult = ReturnType<typeof useUpdateMentorApplicationChatStatusMutation>;
export type UpdateMentorApplicationChatStatusMutationResult = Apollo.MutationResult<UpdateMentorApplicationChatStatusMutation>;
export type UpdateMentorApplicationChatStatusMutationOptions = Apollo.BaseMutationOptions<UpdateMentorApplicationChatStatusMutation, UpdateMentorApplicationChatStatusMutationVariables>;
export const AddMentorApplicationDocument = gql`
    mutation AddMentorApplication($student_uuid: uuid!, $mentor_uuid: uuid!, $statement: String!) {
  insert_mentor_application(
    objects: {student_uuid: $student_uuid, mentor_uuid: $mentor_uuid, statement: $statement}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddMentorApplicationMutationFn = Apollo.MutationFunction<AddMentorApplicationMutation, AddMentorApplicationMutationVariables>;

/**
 * __useAddMentorApplicationMutation__
 *
 * To run a mutation, you first call `useAddMentorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMentorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMentorApplicationMutation, { data, loading, error }] = useAddMentorApplicationMutation({
 *   variables: {
 *      student_uuid: // value for 'student_uuid'
 *      mentor_uuid: // value for 'mentor_uuid'
 *      statement: // value for 'statement'
 *   },
 * });
 */
export function useAddMentorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<AddMentorApplicationMutation, AddMentorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMentorApplicationMutation, AddMentorApplicationMutationVariables>(AddMentorApplicationDocument, options);
      }
export type AddMentorApplicationMutationHookResult = ReturnType<typeof useAddMentorApplicationMutation>;
export type AddMentorApplicationMutationResult = Apollo.MutationResult<AddMentorApplicationMutation>;
export type AddMentorApplicationMutationOptions = Apollo.BaseMutationOptions<AddMentorApplicationMutation, AddMentorApplicationMutationVariables>;
export const UpdateMentorApplicationDocument = gql`
    mutation UpdateMentorApplication($id: uuid!, $statement: String!) {
  update_mentor_application(
    where: {id: {_eq: $id}}
    _set: {statement: $statement}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateMentorApplicationMutationFn = Apollo.MutationFunction<UpdateMentorApplicationMutation, UpdateMentorApplicationMutationVariables>;

/**
 * __useUpdateMentorApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateMentorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMentorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMentorApplicationMutation, { data, loading, error }] = useUpdateMentorApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      statement: // value for 'statement'
 *   },
 * });
 */
export function useUpdateMentorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMentorApplicationMutation, UpdateMentorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMentorApplicationMutation, UpdateMentorApplicationMutationVariables>(UpdateMentorApplicationDocument, options);
      }
export type UpdateMentorApplicationMutationHookResult = ReturnType<typeof useUpdateMentorApplicationMutation>;
export type UpdateMentorApplicationMutationResult = Apollo.MutationResult<UpdateMentorApplicationMutation>;
export type UpdateMentorApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateMentorApplicationMutation, UpdateMentorApplicationMutationVariables>;
export const DeleteMentorApplicationDocument = gql`
    mutation DeleteMentorApplication($id: uuid!) {
  delete_mentor_application_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteMentorApplicationMutationFn = Apollo.MutationFunction<DeleteMentorApplicationMutation, DeleteMentorApplicationMutationVariables>;

/**
 * __useDeleteMentorApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteMentorApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMentorApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMentorApplicationMutation, { data, loading, error }] = useDeleteMentorApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMentorApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMentorApplicationMutation, DeleteMentorApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMentorApplicationMutation, DeleteMentorApplicationMutationVariables>(DeleteMentorApplicationDocument, options);
      }
export type DeleteMentorApplicationMutationHookResult = ReturnType<typeof useDeleteMentorApplicationMutation>;
export type DeleteMentorApplicationMutationResult = Apollo.MutationResult<DeleteMentorApplicationMutation>;
export type DeleteMentorApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteMentorApplicationMutation, DeleteMentorApplicationMutationVariables>;
export const GetMentorListDocument = gql`
    query GetMentorList($grade_time: timestamptz!) {
  users(where: {role: {_eq: "teacher"}}) {
    uuid
    realname
    department
    matched: mentor_application_as_mentor_aggregate(
      where: {status: {_eq: "approved"}}
    ) {
      aggregate {
        count
      }
    }
    total: mentor_application_as_mentor_aggregate {
      aggregate {
        count
      }
    }
    total_for_grade: mentor_application_as_mentor_aggregate(
      where: {created_at: {_gte: $grade_time}}
    ) {
      aggregate {
        count
      }
    }
    mentor_available {
      available
    }
  }
}
    `;

/**
 * __useGetMentorListQuery__
 *
 * To run a query within a React component, call `useGetMentorListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorListQuery({
 *   variables: {
 *      grade_time: // value for 'grade_time'
 *   },
 * });
 */
export function useGetMentorListQuery(baseOptions: Apollo.QueryHookOptions<GetMentorListQuery, GetMentorListQueryVariables> & ({ variables: GetMentorListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentorListQuery, GetMentorListQueryVariables>(GetMentorListDocument, options);
      }
export function useGetMentorListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorListQuery, GetMentorListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentorListQuery, GetMentorListQueryVariables>(GetMentorListDocument, options);
        }
export function useGetMentorListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorListQuery, GetMentorListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMentorListQuery, GetMentorListQueryVariables>(GetMentorListDocument, options);
        }
export type GetMentorListQueryHookResult = ReturnType<typeof useGetMentorListQuery>;
export type GetMentorListLazyQueryHookResult = ReturnType<typeof useGetMentorListLazyQuery>;
export type GetMentorListSuspenseQueryHookResult = ReturnType<typeof useGetMentorListSuspenseQuery>;
export type GetMentorListQueryResult = Apollo.QueryResult<GetMentorListQuery, GetMentorListQueryVariables>;
export const UpsertMentorInfoDocument = gql`
    mutation UpsertMentorInfo($achievement: String = "", $background: String = "", $field: String = "", $intro: String = "", $mentor_uuid: uuid!) {
  insert_mentor_info_one(
    object: {achievement: $achievement, background: $background, field: $field, intro: $intro, mentor_uuid: $mentor_uuid}
    on_conflict: {constraint: mentor_info_pkey, update_columns: [achievement, background, field, intro]}
  ) {
    mentor_uuid
  }
}
    `;
export type UpsertMentorInfoMutationFn = Apollo.MutationFunction<UpsertMentorInfoMutation, UpsertMentorInfoMutationVariables>;

/**
 * __useUpsertMentorInfoMutation__
 *
 * To run a mutation, you first call `useUpsertMentorInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertMentorInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertMentorInfoMutation, { data, loading, error }] = useUpsertMentorInfoMutation({
 *   variables: {
 *      achievement: // value for 'achievement'
 *      background: // value for 'background'
 *      field: // value for 'field'
 *      intro: // value for 'intro'
 *      mentor_uuid: // value for 'mentor_uuid'
 *   },
 * });
 */
export function useUpsertMentorInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpsertMentorInfoMutation, UpsertMentorInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertMentorInfoMutation, UpsertMentorInfoMutationVariables>(UpsertMentorInfoDocument, options);
      }
export type UpsertMentorInfoMutationHookResult = ReturnType<typeof useUpsertMentorInfoMutation>;
export type UpsertMentorInfoMutationResult = Apollo.MutationResult<UpsertMentorInfoMutation>;
export type UpsertMentorInfoMutationOptions = Apollo.BaseMutationOptions<UpsertMentorInfoMutation, UpsertMentorInfoMutationVariables>;
export const GetMentorInfoDocument = gql`
    query GetMentorInfo($mentor_uuid: uuid!) {
  mentor_info_by_pk(mentor_uuid: $mentor_uuid) {
    achievement
    background
    field
    intro
    mentor_uuid
    userByMentorUuid {
      realname
      email
    }
  }
}
    `;

/**
 * __useGetMentorInfoQuery__
 *
 * To run a query within a React component, call `useGetMentorInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMentorInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMentorInfoQuery({
 *   variables: {
 *      mentor_uuid: // value for 'mentor_uuid'
 *   },
 * });
 */
export function useGetMentorInfoQuery(baseOptions: Apollo.QueryHookOptions<GetMentorInfoQuery, GetMentorInfoQueryVariables> & ({ variables: GetMentorInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMentorInfoQuery, GetMentorInfoQueryVariables>(GetMentorInfoDocument, options);
      }
export function useGetMentorInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMentorInfoQuery, GetMentorInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMentorInfoQuery, GetMentorInfoQueryVariables>(GetMentorInfoDocument, options);
        }
export function useGetMentorInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMentorInfoQuery, GetMentorInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMentorInfoQuery, GetMentorInfoQueryVariables>(GetMentorInfoDocument, options);
        }
export type GetMentorInfoQueryHookResult = ReturnType<typeof useGetMentorInfoQuery>;
export type GetMentorInfoLazyQueryHookResult = ReturnType<typeof useGetMentorInfoLazyQuery>;
export type GetMentorInfoSuspenseQueryHookResult = ReturnType<typeof useGetMentorInfoSuspenseQuery>;
export type GetMentorInfoQueryResult = Apollo.QueryResult<GetMentorInfoQuery, GetMentorInfoQueryVariables>;
export const GetFreshmanListDocument = gql`
    query GetFreshmanList {
  users(where: {student_no: {_gt: "2022999999", _lte: "2023999999"}}) {
    uuid
    student_no
    mentor_application_as_student(where: {status: {_eq: "approved"}}) {
      student_uuid
      mentor_uuid
      statement
    }
  }
}
    `;

/**
 * __useGetFreshmanListQuery__
 *
 * To run a query within a React component, call `useGetFreshmanListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreshmanListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreshmanListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFreshmanListQuery(baseOptions?: Apollo.QueryHookOptions<GetFreshmanListQuery, GetFreshmanListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFreshmanListQuery, GetFreshmanListQueryVariables>(GetFreshmanListDocument, options);
      }
export function useGetFreshmanListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFreshmanListQuery, GetFreshmanListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFreshmanListQuery, GetFreshmanListQueryVariables>(GetFreshmanListDocument, options);
        }
export function useGetFreshmanListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFreshmanListQuery, GetFreshmanListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFreshmanListQuery, GetFreshmanListQueryVariables>(GetFreshmanListDocument, options);
        }
export type GetFreshmanListQueryHookResult = ReturnType<typeof useGetFreshmanListQuery>;
export type GetFreshmanListLazyQueryHookResult = ReturnType<typeof useGetFreshmanListLazyQuery>;
export type GetFreshmanListSuspenseQueryHookResult = ReturnType<typeof useGetFreshmanListSuspenseQuery>;
export type GetFreshmanListQueryResult = Apollo.QueryResult<GetFreshmanListQuery, GetFreshmanListQueryVariables>;
export const GetIdByNameDocument = gql`
    query GetIdByName($name: String!) {
  users(where: {realname: {_eq: $name}}) {
    uuid
  }
}
    `;

/**
 * __useGetIdByNameQuery__
 *
 * To run a query within a React component, call `useGetIdByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetIdByNameQuery(baseOptions: Apollo.QueryHookOptions<GetIdByNameQuery, GetIdByNameQueryVariables> & ({ variables: GetIdByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIdByNameQuery, GetIdByNameQueryVariables>(GetIdByNameDocument, options);
      }
export function useGetIdByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIdByNameQuery, GetIdByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIdByNameQuery, GetIdByNameQueryVariables>(GetIdByNameDocument, options);
        }
export function useGetIdByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIdByNameQuery, GetIdByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIdByNameQuery, GetIdByNameQueryVariables>(GetIdByNameDocument, options);
        }
export type GetIdByNameQueryHookResult = ReturnType<typeof useGetIdByNameQuery>;
export type GetIdByNameLazyQueryHookResult = ReturnType<typeof useGetIdByNameLazyQuery>;
export type GetIdByNameSuspenseQueryHookResult = ReturnType<typeof useGetIdByNameSuspenseQuery>;
export type GetIdByNameQueryResult = Apollo.QueryResult<GetIdByNameQuery, GetIdByNameQueryVariables>;
export const GetNoticesDocument = gql`
    query GetNotices($notice_type: [String!]) {
  info_notice(
    where: {notice_type: {_in: $notice_type}}
    order_by: {updated_at: desc}
  ) {
    id
    title
    content
    created_at
    updated_at
    files
    notice_type
  }
}
    `;

/**
 * __useGetNoticesQuery__
 *
 * To run a query within a React component, call `useGetNoticesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoticesQuery({
 *   variables: {
 *      notice_type: // value for 'notice_type'
 *   },
 * });
 */
export function useGetNoticesQuery(baseOptions?: Apollo.QueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
      }
export function useGetNoticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
        }
export function useGetNoticesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
        }
export type GetNoticesQueryHookResult = ReturnType<typeof useGetNoticesQuery>;
export type GetNoticesLazyQueryHookResult = ReturnType<typeof useGetNoticesLazyQuery>;
export type GetNoticesSuspenseQueryHookResult = ReturnType<typeof useGetNoticesSuspenseQuery>;
export type GetNoticesQueryResult = Apollo.QueryResult<GetNoticesQuery, GetNoticesQueryVariables>;
export const UpdateNoticeDocument = gql`
    mutation UpdateNotice($id: uuid!, $title: String!, $content: String!, $files: String, $notice_type: String!) {
  update_info_notice(
    where: {id: {_eq: $id}}
    _set: {title: $title, content: $content, files: $files, notice_type: $notice_type}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateNoticeMutationFn = Apollo.MutationFunction<UpdateNoticeMutation, UpdateNoticeMutationVariables>;

/**
 * __useUpdateNoticeMutation__
 *
 * To run a mutation, you first call `useUpdateNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoticeMutation, { data, loading, error }] = useUpdateNoticeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      files: // value for 'files'
 *      notice_type: // value for 'notice_type'
 *   },
 * });
 */
export function useUpdateNoticeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoticeMutation, UpdateNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoticeMutation, UpdateNoticeMutationVariables>(UpdateNoticeDocument, options);
      }
export type UpdateNoticeMutationHookResult = ReturnType<typeof useUpdateNoticeMutation>;
export type UpdateNoticeMutationResult = Apollo.MutationResult<UpdateNoticeMutation>;
export type UpdateNoticeMutationOptions = Apollo.BaseMutationOptions<UpdateNoticeMutation, UpdateNoticeMutationVariables>;
export const AddNoticeDocument = gql`
    mutation AddNotice($title: String!, $content: String!, $files: String, $notice_type: String!) {
  insert_info_notice(
    objects: {title: $title, content: $content, files: $files, notice_type: $notice_type}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddNoticeMutationFn = Apollo.MutationFunction<AddNoticeMutation, AddNoticeMutationVariables>;

/**
 * __useAddNoticeMutation__
 *
 * To run a mutation, you first call `useAddNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNoticeMutation, { data, loading, error }] = useAddNoticeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      files: // value for 'files'
 *      notice_type: // value for 'notice_type'
 *   },
 * });
 */
export function useAddNoticeMutation(baseOptions?: Apollo.MutationHookOptions<AddNoticeMutation, AddNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNoticeMutation, AddNoticeMutationVariables>(AddNoticeDocument, options);
      }
export type AddNoticeMutationHookResult = ReturnType<typeof useAddNoticeMutation>;
export type AddNoticeMutationResult = Apollo.MutationResult<AddNoticeMutation>;
export type AddNoticeMutationOptions = Apollo.BaseMutationOptions<AddNoticeMutation, AddNoticeMutationVariables>;
export const DeleteNoticeDocument = gql`
    mutation DeleteNotice($id: uuid!) {
  delete_info_notice(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteNoticeMutationFn = Apollo.MutationFunction<DeleteNoticeMutation, DeleteNoticeMutationVariables>;

/**
 * __useDeleteNoticeMutation__
 *
 * To run a mutation, you first call `useDeleteNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoticeMutation, { data, loading, error }] = useDeleteNoticeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoticeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoticeMutation, DeleteNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoticeMutation, DeleteNoticeMutationVariables>(DeleteNoticeDocument, options);
      }
export type DeleteNoticeMutationHookResult = ReturnType<typeof useDeleteNoticeMutation>;
export type DeleteNoticeMutationResult = Apollo.MutationResult<DeleteNoticeMutation>;
export type DeleteNoticeMutationOptions = Apollo.BaseMutationOptions<DeleteNoticeMutation, DeleteNoticeMutationVariables>;
export const GetScholarshipListDocument = gql`
    query GetScholarshipList {
  scholarships_aids(where: {IsAids: {_eq: false}}) {
    amount
    code
    name
    salutation
    type
  }
}
    `;

/**
 * __useGetScholarshipListQuery__
 *
 * To run a query within a React component, call `useGetScholarshipListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScholarshipListQuery(baseOptions?: Apollo.QueryHookOptions<GetScholarshipListQuery, GetScholarshipListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScholarshipListQuery, GetScholarshipListQueryVariables>(GetScholarshipListDocument, options);
      }
export function useGetScholarshipListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipListQuery, GetScholarshipListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScholarshipListQuery, GetScholarshipListQueryVariables>(GetScholarshipListDocument, options);
        }
export function useGetScholarshipListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipListQuery, GetScholarshipListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScholarshipListQuery, GetScholarshipListQueryVariables>(GetScholarshipListDocument, options);
        }
export type GetScholarshipListQueryHookResult = ReturnType<typeof useGetScholarshipListQuery>;
export type GetScholarshipListLazyQueryHookResult = ReturnType<typeof useGetScholarshipListLazyQuery>;
export type GetScholarshipListSuspenseQueryHookResult = ReturnType<typeof useGetScholarshipListSuspenseQuery>;
export type GetScholarshipListQueryResult = Apollo.QueryResult<GetScholarshipListQuery, GetScholarshipListQueryVariables>;
export const GetScholarshipApplicationsDocument = gql`
    query GetScholarshipApplications($_id: String!, $_gte: timestamptz!) {
  scholarship_application(
    where: {student_id: {_eq: $_id}, updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
    order_by: {created_at: asc}
  ) {
    id
    student {
      id
      name
      department
      class
    }
    scholarship
    honor
    amount
    code
    thank_letter
    form_url
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetScholarshipApplicationsQuery__
 *
 * To run a query within a React component, call `useGetScholarshipApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipApplicationsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      _gte: // value for '_gte'
 *   },
 * });
 */
export function useGetScholarshipApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables> & ({ variables: GetScholarshipApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(GetScholarshipApplicationsDocument, options);
      }
export function useGetScholarshipApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(GetScholarshipApplicationsDocument, options);
        }
export function useGetScholarshipApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>(GetScholarshipApplicationsDocument, options);
        }
export type GetScholarshipApplicationsQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsQuery>;
export type GetScholarshipApplicationsLazyQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsLazyQuery>;
export type GetScholarshipApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsSuspenseQuery>;
export type GetScholarshipApplicationsQueryResult = Apollo.QueryResult<GetScholarshipApplicationsQuery, GetScholarshipApplicationsQueryVariables>;
export const GetScholarshipApplicationsForCounselorsDocument = gql`
    query GetScholarshipApplicationsForCounselors($_gte: timestamptz!) {
  scholarship_application(
    order_by: {created_at: asc}
    where: {updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
  ) {
    id
    student {
      id
      name
      department
      class
    }
    scholarship
    honor
    amount
    code
    thank_letter
    form_url
    status
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetScholarshipApplicationsForCounselorsQuery__
 *
 * To run a query within a React component, call `useGetScholarshipApplicationsForCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScholarshipApplicationsForCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScholarshipApplicationsForCounselorsQuery({
 *   variables: {
 *      _gte: // value for '_gte'
 *   },
 * });
 */
export function useGetScholarshipApplicationsForCounselorsQuery(baseOptions: Apollo.QueryHookOptions<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables> & ({ variables: GetScholarshipApplicationsForCounselorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>(GetScholarshipApplicationsForCounselorsDocument, options);
      }
export function useGetScholarshipApplicationsForCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>(GetScholarshipApplicationsForCounselorsDocument, options);
        }
export function useGetScholarshipApplicationsForCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>(GetScholarshipApplicationsForCounselorsDocument, options);
        }
export type GetScholarshipApplicationsForCounselorsQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsForCounselorsQuery>;
export type GetScholarshipApplicationsForCounselorsLazyQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsForCounselorsLazyQuery>;
export type GetScholarshipApplicationsForCounselorsSuspenseQueryHookResult = ReturnType<typeof useGetScholarshipApplicationsForCounselorsSuspenseQuery>;
export type GetScholarshipApplicationsForCounselorsQueryResult = Apollo.QueryResult<GetScholarshipApplicationsForCounselorsQuery, GetScholarshipApplicationsForCounselorsQueryVariables>;
export const AddScholarshipApplicationDocument = gql`
    mutation AddScholarshipApplication($student_id: String!, $scholarship: String!, $honor: String!, $amount: Int!, $code: String!) {
  insert_scholarship_application(
    objects: {student_id: $student_id, scholarship: $scholarship, honor: $honor, amount: $amount, code: $code}
  ) {
    returning {
      id
    }
  }
}
    `;
export type AddScholarshipApplicationMutationFn = Apollo.MutationFunction<AddScholarshipApplicationMutation, AddScholarshipApplicationMutationVariables>;

/**
 * __useAddScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useAddScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addScholarshipApplicationMutation, { data, loading, error }] = useAddScholarshipApplicationMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      scholarship: // value for 'scholarship'
 *      honor: // value for 'honor'
 *      amount: // value for 'amount'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAddScholarshipApplicationMutation(baseOptions?: Apollo.MutationHookOptions<AddScholarshipApplicationMutation, AddScholarshipApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddScholarshipApplicationMutation, AddScholarshipApplicationMutationVariables>(AddScholarshipApplicationDocument, options);
      }
export type AddScholarshipApplicationMutationHookResult = ReturnType<typeof useAddScholarshipApplicationMutation>;
export type AddScholarshipApplicationMutationResult = Apollo.MutationResult<AddScholarshipApplicationMutation>;
export type AddScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<AddScholarshipApplicationMutation, AddScholarshipApplicationMutationVariables>;
export const UpdateScholarshipApplicationDocument = gql`
    mutation UpdateScholarshipApplication($id: uuid!, $thank_letter: String, $form_url: String) {
  update_scholarship_application(
    where: {id: {_eq: $id}}
    _set: {thank_letter: $thank_letter, form_url: $form_url}
  ) {
    returning {
      id
    }
  }
}
    `;
export type UpdateScholarshipApplicationMutationFn = Apollo.MutationFunction<UpdateScholarshipApplicationMutation, UpdateScholarshipApplicationMutationVariables>;

/**
 * __useUpdateScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScholarshipApplicationMutation, { data, loading, error }] = useUpdateScholarshipApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      thank_letter: // value for 'thank_letter'
 *      form_url: // value for 'form_url'
 *   },
 * });
 */
export function useUpdateScholarshipApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateScholarshipApplicationMutation, UpdateScholarshipApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateScholarshipApplicationMutation, UpdateScholarshipApplicationMutationVariables>(UpdateScholarshipApplicationDocument, options);
      }
export type UpdateScholarshipApplicationMutationHookResult = ReturnType<typeof useUpdateScholarshipApplicationMutation>;
export type UpdateScholarshipApplicationMutationResult = Apollo.MutationResult<UpdateScholarshipApplicationMutation>;
export type UpdateScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateScholarshipApplicationMutation, UpdateScholarshipApplicationMutationVariables>;
export const DeleteScholarshipApplicationDocument = gql`
    mutation DeleteScholarshipApplication($id: uuid!) {
  delete_scholarship_application(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteScholarshipApplicationMutationFn = Apollo.MutationFunction<DeleteScholarshipApplicationMutation, DeleteScholarshipApplicationMutationVariables>;

/**
 * __useDeleteScholarshipApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteScholarshipApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScholarshipApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScholarshipApplicationMutation, { data, loading, error }] = useDeleteScholarshipApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteScholarshipApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteScholarshipApplicationMutation, DeleteScholarshipApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteScholarshipApplicationMutation, DeleteScholarshipApplicationMutationVariables>(DeleteScholarshipApplicationDocument, options);
      }
export type DeleteScholarshipApplicationMutationHookResult = ReturnType<typeof useDeleteScholarshipApplicationMutation>;
export type DeleteScholarshipApplicationMutationResult = Apollo.MutationResult<DeleteScholarshipApplicationMutation>;
export type DeleteScholarshipApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteScholarshipApplicationMutation, DeleteScholarshipApplicationMutationVariables>;
export const GetPostgraduateFeedsDocument = gql`
    query GetPostgraduateFeeds($limit: Int = 10, $offset: Int = 0) {
  postgraduate_mentor_info(
    where: {verified: {_eq: true}}
    limit: $limit
    order_by: {id: asc}
    offset: $offset
  ) {
    id
    created_at
    updated_at
    mentor
    field
    phd_quota
    phd_quota_unfixed
    contact
    alternate_contact
    home_page
    detail_info
    user_id
    intend: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "intend"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
    in_contact: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "in_contact"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
    confirmed: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "confirmed"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
  }
  postgraduate_mentor_info_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetPostgraduateFeedsQuery__
 *
 * To run a query within a React component, call `useGetPostgraduateFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostgraduateFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostgraduateFeedsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetPostgraduateFeedsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>(GetPostgraduateFeedsDocument, options);
      }
export function useGetPostgraduateFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>(GetPostgraduateFeedsDocument, options);
        }
export function useGetPostgraduateFeedsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>(GetPostgraduateFeedsDocument, options);
        }
export type GetPostgraduateFeedsQueryHookResult = ReturnType<typeof useGetPostgraduateFeedsQuery>;
export type GetPostgraduateFeedsLazyQueryHookResult = ReturnType<typeof useGetPostgraduateFeedsLazyQuery>;
export type GetPostgraduateFeedsSuspenseQueryHookResult = ReturnType<typeof useGetPostgraduateFeedsSuspenseQuery>;
export type GetPostgraduateFeedsQueryResult = Apollo.QueryResult<GetPostgraduateFeedsQuery, GetPostgraduateFeedsQueryVariables>;
export const GetUnverifiedMentorInfoDocument = gql`
    query GetUnverifiedMentorInfo($limit: Int = 10, $offset: Int = 0) {
  postgraduate_mentor_info(
    limit: $limit
    order_by: {id: asc}
    offset: $offset
    where: {verified: {_eq: false}}
  ) {
    id
    created_at
    updated_at
    mentor
    field
    phd_quota
    phd_quota_unfixed
    contact
    alternate_contact
    home_page
    detail_info
    user_id
    userEditor {
      name
    }
    intend: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "intend"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
    in_contact: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "in_contact"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
    confirmed: applications_aggregate(
      where: {_and: [{verified: {_eq: true}}, {status: {_eq: "confirmed"}}]}
    ) {
      aggregate {
        count
        max {
          updated_at
        }
      }
    }
  }
  postgraduate_mentor_info_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetUnverifiedMentorInfoQuery__
 *
 * To run a query within a React component, call `useGetUnverifiedMentorInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnverifiedMentorInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnverifiedMentorInfoQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUnverifiedMentorInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>(GetUnverifiedMentorInfoDocument, options);
      }
export function useGetUnverifiedMentorInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>(GetUnverifiedMentorInfoDocument, options);
        }
export function useGetUnverifiedMentorInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>(GetUnverifiedMentorInfoDocument, options);
        }
export type GetUnverifiedMentorInfoQueryHookResult = ReturnType<typeof useGetUnverifiedMentorInfoQuery>;
export type GetUnverifiedMentorInfoLazyQueryHookResult = ReturnType<typeof useGetUnverifiedMentorInfoLazyQuery>;
export type GetUnverifiedMentorInfoSuspenseQueryHookResult = ReturnType<typeof useGetUnverifiedMentorInfoSuspenseQuery>;
export type GetUnverifiedMentorInfoQueryResult = Apollo.QueryResult<GetUnverifiedMentorInfoQuery, GetUnverifiedMentorInfoQueryVariables>;
export const InsertPostgraduateInfoDocument = gql`
    mutation InsertPostgraduateInfo($mentor: String!, $field: String!, $contact: String!, $alternate_contact: String = "", $detail_info: String = "", $home_page: String = "", $phd_quota: numeric = 0, $phd_quota_unfixed: numeric = 0, $user_id: String!) {
  insert_postgraduate_mentor_info_one(
    object: {mentor: $mentor, field: $field, contact: $contact, alternate_contact: $alternate_contact, detail_info: $detail_info, home_page: $home_page, phd_quota: $phd_quota, phd_quota_unfixed: $phd_quota_unfixed, user_id: $user_id, verified: true}
  ) {
    id
  }
}
    `;
export type InsertPostgraduateInfoMutationFn = Apollo.MutationFunction<InsertPostgraduateInfoMutation, InsertPostgraduateInfoMutationVariables>;

/**
 * __useInsertPostgraduateInfoMutation__
 *
 * To run a mutation, you first call `useInsertPostgraduateInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPostgraduateInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPostgraduateInfoMutation, { data, loading, error }] = useInsertPostgraduateInfoMutation({
 *   variables: {
 *      mentor: // value for 'mentor'
 *      field: // value for 'field'
 *      contact: // value for 'contact'
 *      alternate_contact: // value for 'alternate_contact'
 *      detail_info: // value for 'detail_info'
 *      home_page: // value for 'home_page'
 *      phd_quota: // value for 'phd_quota'
 *      phd_quota_unfixed: // value for 'phd_quota_unfixed'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInsertPostgraduateInfoMutation(baseOptions?: Apollo.MutationHookOptions<InsertPostgraduateInfoMutation, InsertPostgraduateInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPostgraduateInfoMutation, InsertPostgraduateInfoMutationVariables>(InsertPostgraduateInfoDocument, options);
      }
export type InsertPostgraduateInfoMutationHookResult = ReturnType<typeof useInsertPostgraduateInfoMutation>;
export type InsertPostgraduateInfoMutationResult = Apollo.MutationResult<InsertPostgraduateInfoMutation>;
export type InsertPostgraduateInfoMutationOptions = Apollo.BaseMutationOptions<InsertPostgraduateInfoMutation, InsertPostgraduateInfoMutationVariables>;
export const UpdatePostgraduateInfoDocument = gql`
    mutation UpdatePostgraduateInfo($id: Int!, $mentor: String!, $field: String!, $contact: String!, $alternate_contact: String = "", $detail_info: String = "", $home_page: String = "", $phd_quota: numeric = 0, $phd_quota_unfixed: numeric = 0) {
  update_postgraduate_mentor_info_by_pk(
    pk_columns: {id: $id}
    _set: {mentor: $mentor, field: $field, contact: $contact, alternate_contact: $alternate_contact, detail_info: $detail_info, home_page: $home_page, phd_quota: $phd_quota, phd_quota_unfixed: $phd_quota_unfixed, verified: true}
  ) {
    id
  }
}
    `;
export type UpdatePostgraduateInfoMutationFn = Apollo.MutationFunction<UpdatePostgraduateInfoMutation, UpdatePostgraduateInfoMutationVariables>;

/**
 * __useUpdatePostgraduateInfoMutation__
 *
 * To run a mutation, you first call `useUpdatePostgraduateInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostgraduateInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostgraduateInfoMutation, { data, loading, error }] = useUpdatePostgraduateInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      mentor: // value for 'mentor'
 *      field: // value for 'field'
 *      contact: // value for 'contact'
 *      alternate_contact: // value for 'alternate_contact'
 *      detail_info: // value for 'detail_info'
 *      home_page: // value for 'home_page'
 *      phd_quota: // value for 'phd_quota'
 *      phd_quota_unfixed: // value for 'phd_quota_unfixed'
 *   },
 * });
 */
export function useUpdatePostgraduateInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostgraduateInfoMutation, UpdatePostgraduateInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostgraduateInfoMutation, UpdatePostgraduateInfoMutationVariables>(UpdatePostgraduateInfoDocument, options);
      }
export type UpdatePostgraduateInfoMutationHookResult = ReturnType<typeof useUpdatePostgraduateInfoMutation>;
export type UpdatePostgraduateInfoMutationResult = Apollo.MutationResult<UpdatePostgraduateInfoMutation>;
export type UpdatePostgraduateInfoMutationOptions = Apollo.BaseMutationOptions<UpdatePostgraduateInfoMutation, UpdatePostgraduateInfoMutationVariables>;
export const DeletePostgraduateInfoDocument = gql`
    mutation DeletePostgraduateInfo($id: Int!) {
  delete_postgraduate_mentor_info(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
    `;
export type DeletePostgraduateInfoMutationFn = Apollo.MutationFunction<DeletePostgraduateInfoMutation, DeletePostgraduateInfoMutationVariables>;

/**
 * __useDeletePostgraduateInfoMutation__
 *
 * To run a mutation, you first call `useDeletePostgraduateInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostgraduateInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostgraduateInfoMutation, { data, loading, error }] = useDeletePostgraduateInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostgraduateInfoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostgraduateInfoMutation, DeletePostgraduateInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostgraduateInfoMutation, DeletePostgraduateInfoMutationVariables>(DeletePostgraduateInfoDocument, options);
      }
export type DeletePostgraduateInfoMutationHookResult = ReturnType<typeof useDeletePostgraduateInfoMutation>;
export type DeletePostgraduateInfoMutationResult = Apollo.MutationResult<DeletePostgraduateInfoMutation>;
export type DeletePostgraduateInfoMutationOptions = Apollo.BaseMutationOptions<DeletePostgraduateInfoMutation, DeletePostgraduateInfoMutationVariables>;
export const InsertApplicationDocument = gql`
    mutation InsertApplication($mentor_info_id: Int!, $status: String!, $user_id: String!, $verified: Boolean!) {
  insert_postgraduate_application_one(
    object: {mentor_info_id: $mentor_info_id, status: $status, user_id: $user_id, verified: $verified}
    on_conflict: {constraint: postgraduate_application_pkey, update_columns: [status, updated_at, verified]}
  ) {
    status
  }
}
    `;
export type InsertApplicationMutationFn = Apollo.MutationFunction<InsertApplicationMutation, InsertApplicationMutationVariables>;

/**
 * __useInsertApplicationMutation__
 *
 * To run a mutation, you first call `useInsertApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertApplicationMutation, { data, loading, error }] = useInsertApplicationMutation({
 *   variables: {
 *      mentor_info_id: // value for 'mentor_info_id'
 *      status: // value for 'status'
 *      user_id: // value for 'user_id'
 *      verified: // value for 'verified'
 *   },
 * });
 */
export function useInsertApplicationMutation(baseOptions?: Apollo.MutationHookOptions<InsertApplicationMutation, InsertApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertApplicationMutation, InsertApplicationMutationVariables>(InsertApplicationDocument, options);
      }
export type InsertApplicationMutationHookResult = ReturnType<typeof useInsertApplicationMutation>;
export type InsertApplicationMutationResult = Apollo.MutationResult<InsertApplicationMutation>;
export type InsertApplicationMutationOptions = Apollo.BaseMutationOptions<InsertApplicationMutation, InsertApplicationMutationVariables>;
export const VerifyMentorInfoDocument = gql`
    mutation VerifyMentorInfo($id: Int!) {
  update_postgraduate_mentor_info_by_pk(
    pk_columns: {id: $id}
    _set: {verified: true}
  ) {
    id
  }
}
    `;
export type VerifyMentorInfoMutationFn = Apollo.MutationFunction<VerifyMentorInfoMutation, VerifyMentorInfoMutationVariables>;

/**
 * __useVerifyMentorInfoMutation__
 *
 * To run a mutation, you first call `useVerifyMentorInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyMentorInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyMentorInfoMutation, { data, loading, error }] = useVerifyMentorInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVerifyMentorInfoMutation(baseOptions?: Apollo.MutationHookOptions<VerifyMentorInfoMutation, VerifyMentorInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyMentorInfoMutation, VerifyMentorInfoMutationVariables>(VerifyMentorInfoDocument, options);
      }
export type VerifyMentorInfoMutationHookResult = ReturnType<typeof useVerifyMentorInfoMutation>;
export type VerifyMentorInfoMutationResult = Apollo.MutationResult<VerifyMentorInfoMutation>;
export type VerifyMentorInfoMutationOptions = Apollo.BaseMutationOptions<VerifyMentorInfoMutation, VerifyMentorInfoMutationVariables>;
export const GetPostgraduateApplicationFeedsDocument = gql`
    query GetPostgraduateApplicationFeeds($offset: Int = 0, $limit: Int = 10) {
  postgraduate_application_aggregate(where: {verified: {_eq: false}}) {
    aggregate {
      count
    }
  }
  postgraduate_application(
    where: {verified: {_eq: false}}
    order_by: {created_at: desc}
    offset: $offset
    limit: $limit
  ) {
    created_at
    mentor_info_id
    status
    updated_at
    user_id
    mentor {
      mentor
    }
    user {
      name
      class
    }
  }
}
    `;

/**
 * __useGetPostgraduateApplicationFeedsQuery__
 *
 * To run a query within a React component, call `useGetPostgraduateApplicationFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostgraduateApplicationFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostgraduateApplicationFeedsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostgraduateApplicationFeedsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>(GetPostgraduateApplicationFeedsDocument, options);
      }
export function useGetPostgraduateApplicationFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>(GetPostgraduateApplicationFeedsDocument, options);
        }
export function useGetPostgraduateApplicationFeedsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>(GetPostgraduateApplicationFeedsDocument, options);
        }
export type GetPostgraduateApplicationFeedsQueryHookResult = ReturnType<typeof useGetPostgraduateApplicationFeedsQuery>;
export type GetPostgraduateApplicationFeedsLazyQueryHookResult = ReturnType<typeof useGetPostgraduateApplicationFeedsLazyQuery>;
export type GetPostgraduateApplicationFeedsSuspenseQueryHookResult = ReturnType<typeof useGetPostgraduateApplicationFeedsSuspenseQuery>;
export type GetPostgraduateApplicationFeedsQueryResult = Apollo.QueryResult<GetPostgraduateApplicationFeedsQuery, GetPostgraduateApplicationFeedsQueryVariables>;
export const GetSelfPostgraduateApplicationsDocument = gql`
    query GetSelfPostgraduateApplications($user_id: String!, $offset: Int = 0, $limit: Int = 10) {
  postgraduate_application(
    where: {user_id: {_eq: $user_id}}
    offset: $offset
    limit: $limit
  ) {
    created_at
    mentor_info_id
    mentor {
      mentor
    }
    status
    updated_at
    user_id
    verified
    history(order_by: {created_at: desc}) {
      status
    }
  }
  postgraduate_application_aggregate(where: {user_id: {_eq: $user_id}}) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetSelfPostgraduateApplicationsQuery__
 *
 * To run a query within a React component, call `useGetSelfPostgraduateApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelfPostgraduateApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelfPostgraduateApplicationsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetSelfPostgraduateApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables> & ({ variables: GetSelfPostgraduateApplicationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>(GetSelfPostgraduateApplicationsDocument, options);
      }
export function useGetSelfPostgraduateApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>(GetSelfPostgraduateApplicationsDocument, options);
        }
export function useGetSelfPostgraduateApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>(GetSelfPostgraduateApplicationsDocument, options);
        }
export type GetSelfPostgraduateApplicationsQueryHookResult = ReturnType<typeof useGetSelfPostgraduateApplicationsQuery>;
export type GetSelfPostgraduateApplicationsLazyQueryHookResult = ReturnType<typeof useGetSelfPostgraduateApplicationsLazyQuery>;
export type GetSelfPostgraduateApplicationsSuspenseQueryHookResult = ReturnType<typeof useGetSelfPostgraduateApplicationsSuspenseQuery>;
export type GetSelfPostgraduateApplicationsQueryResult = Apollo.QueryResult<GetSelfPostgraduateApplicationsQuery, GetSelfPostgraduateApplicationsQueryVariables>;
export const GetSelfConfirmedApplicationDocument = gql`
    query GetSelfConfirmedApplication($user_id: String!) {
  postgraduate_application(
    where: {_and: [{user_id: {_eq: $user_id}}, {verified: {_eq: true}}, {status: {_eq: "confirmed"}}]}
  ) {
    mentor_info_id
  }
}
    `;

/**
 * __useGetSelfConfirmedApplicationQuery__
 *
 * To run a query within a React component, call `useGetSelfConfirmedApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelfConfirmedApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelfConfirmedApplicationQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetSelfConfirmedApplicationQuery(baseOptions: Apollo.QueryHookOptions<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables> & ({ variables: GetSelfConfirmedApplicationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>(GetSelfConfirmedApplicationDocument, options);
      }
export function useGetSelfConfirmedApplicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>(GetSelfConfirmedApplicationDocument, options);
        }
export function useGetSelfConfirmedApplicationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>(GetSelfConfirmedApplicationDocument, options);
        }
export type GetSelfConfirmedApplicationQueryHookResult = ReturnType<typeof useGetSelfConfirmedApplicationQuery>;
export type GetSelfConfirmedApplicationLazyQueryHookResult = ReturnType<typeof useGetSelfConfirmedApplicationLazyQuery>;
export type GetSelfConfirmedApplicationSuspenseQueryHookResult = ReturnType<typeof useGetSelfConfirmedApplicationSuspenseQuery>;
export type GetSelfConfirmedApplicationQueryResult = Apollo.QueryResult<GetSelfConfirmedApplicationQuery, GetSelfConfirmedApplicationQueryVariables>;
export const VerifyPostgraduateApplicationDocument = gql`
    mutation VerifyPostgraduateApplication($mentor_info_id: Int!, $user_id: String!) {
  update_postgraduate_application_by_pk(
    pk_columns: {mentor_info_id: $mentor_info_id, user_id: $user_id}
    _set: {verified: true}
  ) {
    verified
  }
}
    `;
export type VerifyPostgraduateApplicationMutationFn = Apollo.MutationFunction<VerifyPostgraduateApplicationMutation, VerifyPostgraduateApplicationMutationVariables>;

/**
 * __useVerifyPostgraduateApplicationMutation__
 *
 * To run a mutation, you first call `useVerifyPostgraduateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPostgraduateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPostgraduateApplicationMutation, { data, loading, error }] = useVerifyPostgraduateApplicationMutation({
 *   variables: {
 *      mentor_info_id: // value for 'mentor_info_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useVerifyPostgraduateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPostgraduateApplicationMutation, VerifyPostgraduateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPostgraduateApplicationMutation, VerifyPostgraduateApplicationMutationVariables>(VerifyPostgraduateApplicationDocument, options);
      }
export type VerifyPostgraduateApplicationMutationHookResult = ReturnType<typeof useVerifyPostgraduateApplicationMutation>;
export type VerifyPostgraduateApplicationMutationResult = Apollo.MutationResult<VerifyPostgraduateApplicationMutation>;
export type VerifyPostgraduateApplicationMutationOptions = Apollo.BaseMutationOptions<VerifyPostgraduateApplicationMutation, VerifyPostgraduateApplicationMutationVariables>;
export const DeletePostgraduateApplicationDocument = gql`
    mutation DeletePostgraduateApplication($mentor_info_id: Int!, $user_id: String!) {
  delete_postgraduate_application_by_pk(
    mentor_info_id: $mentor_info_id
    user_id: $user_id
  ) {
    mentor_info_id
    user_id
  }
}
    `;
export type DeletePostgraduateApplicationMutationFn = Apollo.MutationFunction<DeletePostgraduateApplicationMutation, DeletePostgraduateApplicationMutationVariables>;

/**
 * __useDeletePostgraduateApplicationMutation__
 *
 * To run a mutation, you first call `useDeletePostgraduateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostgraduateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostgraduateApplicationMutation, { data, loading, error }] = useDeletePostgraduateApplicationMutation({
 *   variables: {
 *      mentor_info_id: // value for 'mentor_info_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useDeletePostgraduateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostgraduateApplicationMutation, DeletePostgraduateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostgraduateApplicationMutation, DeletePostgraduateApplicationMutationVariables>(DeletePostgraduateApplicationDocument, options);
      }
export type DeletePostgraduateApplicationMutationHookResult = ReturnType<typeof useDeletePostgraduateApplicationMutation>;
export type DeletePostgraduateApplicationMutationResult = Apollo.MutationResult<DeletePostgraduateApplicationMutation>;
export type DeletePostgraduateApplicationMutationOptions = Apollo.BaseMutationOptions<DeletePostgraduateApplicationMutation, DeletePostgraduateApplicationMutationVariables>;
export const SetPostAppHistoryDocument = gql`
    mutation SetPostAppHistory($user_id: String!, $mentor_info_id: Int!, $status: String!) {
  insert_postgraduate_application_history_one(
    object: {user_id: $user_id, mentor_info_id: $mentor_info_id, status: $status}
    on_conflict: {constraint: postgraduate_application_history_pkey, update_columns: created_at}
  ) {
    created_at
  }
}
    `;
export type SetPostAppHistoryMutationFn = Apollo.MutationFunction<SetPostAppHistoryMutation, SetPostAppHistoryMutationVariables>;

/**
 * __useSetPostAppHistoryMutation__
 *
 * To run a mutation, you first call `useSetPostAppHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPostAppHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPostAppHistoryMutation, { data, loading, error }] = useSetPostAppHistoryMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      mentor_info_id: // value for 'mentor_info_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetPostAppHistoryMutation(baseOptions?: Apollo.MutationHookOptions<SetPostAppHistoryMutation, SetPostAppHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPostAppHistoryMutation, SetPostAppHistoryMutationVariables>(SetPostAppHistoryDocument, options);
      }
export type SetPostAppHistoryMutationHookResult = ReturnType<typeof useSetPostAppHistoryMutation>;
export type SetPostAppHistoryMutationResult = Apollo.MutationResult<SetPostAppHistoryMutation>;
export type SetPostAppHistoryMutationOptions = Apollo.BaseMutationOptions<SetPostAppHistoryMutation, SetPostAppHistoryMutationVariables>;
export const GetPostAppHistoryDocument = gql`
    query GetPostAppHistory($offset: Int = 0, $limit: Int = 10) {
  postgraduate_application_history(
    offset: $offset
    limit: $limit
    order_by: {created_at: desc}
    where: {_and: [{status: {_neq: "intend"}}, {status: {_neq: "in_contact"}}, {status: {_neq: "delete"}}]}
  ) {
    created_at
    mentor_info_id
    status
    user_id
    updated_at
    mentor {
      mentor
    }
    user {
      name
      class
    }
  }
  postgraduate_application_history_aggregate(
    offset: $offset
    limit: $limit
    where: {_and: [{status: {_neq: "intend"}}, {status: {_neq: "in_contact"}}, {status: {_neq: "delete"}}]}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetPostAppHistoryQuery__
 *
 * To run a query within a React component, call `useGetPostAppHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostAppHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostAppHistoryQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostAppHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>(GetPostAppHistoryDocument, options);
      }
export function useGetPostAppHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>(GetPostAppHistoryDocument, options);
        }
export function useGetPostAppHistorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>(GetPostAppHistoryDocument, options);
        }
export type GetPostAppHistoryQueryHookResult = ReturnType<typeof useGetPostAppHistoryQuery>;
export type GetPostAppHistoryLazyQueryHookResult = ReturnType<typeof useGetPostAppHistoryLazyQuery>;
export type GetPostAppHistorySuspenseQueryHookResult = ReturnType<typeof useGetPostAppHistorySuspenseQuery>;
export type GetPostAppHistoryQueryResult = Apollo.QueryResult<GetPostAppHistoryQuery, GetPostAppHistoryQueryVariables>;
export const GetCourseDocument = gql`
    query GetCourse {
  share_course(order_by: {year: desc}) {
    code
    fullname
    language
    name
    professor
    semester
    type
    uuid
    year
  }
}
    `;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCourseQuery(baseOptions?: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export function useGetCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseSuspenseQueryHookResult = ReturnType<typeof useGetCourseSuspenseQuery>;
export type GetCourseQueryResult = Apollo.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export const GetWeeklyDocument = gql`
    query GetWeekly {
  weekly {
    id
    title
    url
  }
}
    `;

/**
 * __useGetWeeklyQuery__
 *
 * To run a query within a React component, call `useGetWeeklyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeeklyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeeklyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWeeklyQuery(baseOptions?: Apollo.QueryHookOptions<GetWeeklyQuery, GetWeeklyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeeklyQuery, GetWeeklyQueryVariables>(GetWeeklyDocument, options);
      }
export function useGetWeeklyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeeklyQuery, GetWeeklyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeeklyQuery, GetWeeklyQueryVariables>(GetWeeklyDocument, options);
        }
export function useGetWeeklySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWeeklyQuery, GetWeeklyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWeeklyQuery, GetWeeklyQueryVariables>(GetWeeklyDocument, options);
        }
export type GetWeeklyQueryHookResult = ReturnType<typeof useGetWeeklyQuery>;
export type GetWeeklyLazyQueryHookResult = ReturnType<typeof useGetWeeklyLazyQuery>;
export type GetWeeklySuspenseQueryHookResult = ReturnType<typeof useGetWeeklySuspenseQuery>;
export type GetWeeklyQueryResult = Apollo.QueryResult<GetWeeklyQuery, GetWeeklyQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($uuid: uuid!) {
  users_by_pk(uuid: $uuid) {
    username
    realname
    email
    phone
    student_no
    department
    class
    created_at
    updated_at
    tsinghua_email
    github_id
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables> & ({ variables: GetProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export function useGetProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($uuid: uuid!, $class: String, $department: String, $phone: String, $realname: String, $student_no: String, $username: String) {
  update_users_by_pk(
    pk_columns: {uuid: $uuid}
    _set: {class: $class, department: $department, username: $username, student_no: $student_no, realname: $realname, phone: $phone}
  ) {
    updated_at
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      class: // value for 'class'
 *      department: // value for 'department'
 *      phone: // value for 'phone'
 *      realname: // value for 'realname'
 *      student_no: // value for 'student_no'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
