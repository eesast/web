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
  date: { input: any; output: any; }
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

/** columns and relationships of "contest" */
export type Contest = {
  __typename?: 'contest';
  arena_switch: Scalars['Boolean']['output'];
  code_upload_switch: Scalars['Boolean']['output'];
  /** An array relationship */
  contest_managers: Array<Contest_Manager>;
  /** An aggregate relationship */
  contest_managers_aggregate: Contest_Manager_Aggregate;
  /** An array relationship */
  contest_maps: Array<Contest_Map>;
  /** An aggregate relationship */
  contest_maps_aggregate: Contest_Map_Aggregate;
  /** An array relationship */
  contest_notices: Array<Contest_Notice>;
  /** An aggregate relationship */
  contest_notices_aggregate: Contest_Notice_Aggregate;
  /** An array relationship */
  contest_players: Array<Contest_Player>;
  /** An aggregate relationship */
  contest_players_aggregate: Contest_Player_Aggregate;
  /** An array relationship */
  contest_rooms: Array<Contest_Room>;
  /** An aggregate relationship */
  contest_rooms_aggregate: Contest_Room_Aggregate;
  /** An array relationship */
  contest_rounds: Array<Contest_Round>;
  /** An aggregate relationship */
  contest_rounds_aggregate: Contest_Round_Aggregate;
  /** An array relationship */
  contest_teams: Array<Contest_Team>;
  /** An aggregate relationship */
  contest_teams_aggregate: Contest_Team_Aggregate;
  /** An array relationship */
  contest_times: Array<Contest_Time>;
  /** An aggregate relationship */
  contest_times_aggregate: Contest_Time_Aggregate;
  contest_type: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_date: Scalars['timestamptz']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  playback_switch: Scalars['Boolean']['output'];
  playground_switch: Scalars['Boolean']['output'];
  start_date: Scalars['timestamptz']['output'];
  status: Scalars['String']['output'];
  stream_switch: Scalars['Boolean']['output'];
  team_switch: Scalars['Boolean']['output'];
};


/** columns and relationships of "contest" */
export type ContestContest_ManagersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Managers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Manager_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Manager_Order_By>>;
  where?: InputMaybe<Contest_Manager_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_MapsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Maps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_NoticesArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Notices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_RoundsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Rounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_TeamsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Teams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Order_By>>;
  where?: InputMaybe<Contest_Team_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_TimesArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};


/** columns and relationships of "contest" */
export type ContestContest_Times_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
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
  arena_switch?: InputMaybe<Boolean_Comparison_Exp>;
  code_upload_switch?: InputMaybe<Boolean_Comparison_Exp>;
  contest_managers?: InputMaybe<Contest_Manager_Bool_Exp>;
  contest_maps?: InputMaybe<Contest_Map_Bool_Exp>;
  contest_notices?: InputMaybe<Contest_Notice_Bool_Exp>;
  contest_players?: InputMaybe<Contest_Player_Bool_Exp>;
  contest_rooms?: InputMaybe<Contest_Room_Bool_Exp>;
  contest_rounds?: InputMaybe<Contest_Round_Bool_Exp>;
  contest_teams?: InputMaybe<Contest_Team_Bool_Exp>;
  contest_times?: InputMaybe<Contest_Time_Bool_Exp>;
  contest_type?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  fullname?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  playback_switch?: InputMaybe<Boolean_Comparison_Exp>;
  playground_switch?: InputMaybe<Boolean_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  stream_switch?: InputMaybe<Boolean_Comparison_Exp>;
  team_switch?: InputMaybe<Boolean_Comparison_Exp>;
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

/** input type for inserting data into table "contest" */
export type Contest_Insert_Input = {
  arena_switch?: InputMaybe<Scalars['Boolean']['input']>;
  code_upload_switch?: InputMaybe<Scalars['Boolean']['input']>;
  contest_managers?: InputMaybe<Contest_Manager_Arr_Rel_Insert_Input>;
  contest_maps?: InputMaybe<Contest_Map_Arr_Rel_Insert_Input>;
  contest_notices?: InputMaybe<Contest_Notice_Arr_Rel_Insert_Input>;
  contest_players?: InputMaybe<Contest_Player_Arr_Rel_Insert_Input>;
  contest_rooms?: InputMaybe<Contest_Room_Arr_Rel_Insert_Input>;
  contest_rounds?: InputMaybe<Contest_Round_Arr_Rel_Insert_Input>;
  contest_teams?: InputMaybe<Contest_Team_Arr_Rel_Insert_Input>;
  contest_times?: InputMaybe<Contest_Time_Arr_Rel_Insert_Input>;
  contest_type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  playback_switch?: InputMaybe<Scalars['Boolean']['input']>;
  playground_switch?: InputMaybe<Scalars['Boolean']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stream_switch?: InputMaybe<Scalars['Boolean']['input']>;
  team_switch?: InputMaybe<Scalars['Boolean']['input']>;
};

/** 比赛管理员映射表 */
export type Contest_Manager = {
  __typename?: 'contest_manager';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
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

/** order by aggregate values of table "contest_manager" */
export type Contest_Manager_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Manager_Max_Order_By>;
  min?: InputMaybe<Contest_Manager_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_manager" */
export type Contest_Manager_Arr_Rel_Insert_Input = {
  data: Array<Contest_Manager_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Manager_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_manager". All fields are combined with a logical 'AND'. */
export type Contest_Manager_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Manager_Bool_Exp>>;
  _not?: InputMaybe<Contest_Manager_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Manager_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
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
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Manager_Max_Fields = {
  __typename?: 'contest_manager_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_manager" */
export type Contest_Manager_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Manager_Min_Fields = {
  __typename?: 'contest_manager_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_manager" */
export type Contest_Manager_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
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
  user?: InputMaybe<Users_Order_By>;
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
  UserUuid = 'user_uuid'
}

/** input type for updating data in table "contest_manager" */
export type Contest_Manager_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_manager" */
export enum Contest_Manager_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** 比赛用到的地图（文件） */
export type Contest_Map = {
  __typename?: 'contest_map';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  /** An array relationship */
  contest_map_rooms: Array<Contest_Room>;
  /** An aggregate relationship */
  contest_map_rooms_aggregate: Contest_Room_Aggregate;
  /** An array relationship */
  contest_rounds: Array<Contest_Round>;
  /** An aggregate relationship */
  contest_rounds_aggregate: Contest_Round_Aggregate;
  filename: Scalars['String']['output'];
  map_id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  team_labels: Scalars['String']['output'];
};


/** 比赛用到的地图（文件） */
export type Contest_MapContest_Map_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


/** 比赛用到的地图（文件） */
export type Contest_MapContest_Map_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


/** 比赛用到的地图（文件） */
export type Contest_MapContest_RoundsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


/** 比赛用到的地图（文件） */
export type Contest_MapContest_Rounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};

/** aggregated selection of "contest_map" */
export type Contest_Map_Aggregate = {
  __typename?: 'contest_map_aggregate';
  aggregate?: Maybe<Contest_Map_Aggregate_Fields>;
  nodes: Array<Contest_Map>;
};

/** aggregate fields of "contest_map" */
export type Contest_Map_Aggregate_Fields = {
  __typename?: 'contest_map_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Map_Max_Fields>;
  min?: Maybe<Contest_Map_Min_Fields>;
};


/** aggregate fields of "contest_map" */
export type Contest_Map_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Map_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_map" */
export type Contest_Map_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Map_Max_Order_By>;
  min?: InputMaybe<Contest_Map_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_map" */
export type Contest_Map_Arr_Rel_Insert_Input = {
  data: Array<Contest_Map_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Map_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_map". All fields are combined with a logical 'AND'. */
export type Contest_Map_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Map_Bool_Exp>>;
  _not?: InputMaybe<Contest_Map_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Map_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_map_rooms?: InputMaybe<Contest_Room_Bool_Exp>;
  contest_rounds?: InputMaybe<Contest_Round_Bool_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  map_id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  team_labels?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_map" */
export enum Contest_Map_Constraint {
  /** unique or primary key constraint on columns "map_id" */
  ContestMapPkey = 'contest_map_pkey'
}

/** input type for inserting data into table "contest_map" */
export type Contest_Map_Insert_Input = {
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_map_rooms?: InputMaybe<Contest_Room_Arr_Rel_Insert_Input>;
  contest_rounds?: InputMaybe<Contest_Round_Arr_Rel_Insert_Input>;
  filename?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  team_labels?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Contest_Map_Max_Fields = {
  __typename?: 'contest_map_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  team_labels?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "contest_map" */
export type Contest_Map_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_labels?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Map_Min_Fields = {
  __typename?: 'contest_map_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  team_labels?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "contest_map" */
export type Contest_Map_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_labels?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_map" */
export type Contest_Map_Mutation_Response = {
  __typename?: 'contest_map_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Map>;
};

/** input type for inserting object relation for remote table "contest_map" */
export type Contest_Map_Obj_Rel_Insert_Input = {
  data: Contest_Map_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Map_On_Conflict>;
};

/** on_conflict condition type for table "contest_map" */
export type Contest_Map_On_Conflict = {
  constraint: Contest_Map_Constraint;
  update_columns?: Array<Contest_Map_Update_Column>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_map". */
export type Contest_Map_Order_By = {
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  contest_map_rooms_aggregate?: InputMaybe<Contest_Room_Aggregate_Order_By>;
  contest_rounds_aggregate?: InputMaybe<Contest_Round_Aggregate_Order_By>;
  filename?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  team_labels?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_map */
export type Contest_Map_Pk_Columns_Input = {
  map_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_map" */
export enum Contest_Map_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  Filename = 'filename',
  /** column name */
  MapId = 'map_id',
  /** column name */
  Name = 'name',
  /** column name */
  TeamLabels = 'team_labels'
}

/** input type for updating data in table "contest_map" */
export type Contest_Map_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  team_labels?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "contest_map" */
export enum Contest_Map_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  Filename = 'filename',
  /** column name */
  MapId = 'map_id',
  /** column name */
  Name = 'name',
  /** column name */
  TeamLabels = 'team_labels'
}

/** aggregate max on columns */
export type Contest_Max_Fields = {
  __typename?: 'contest_max_fields';
  contest_type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Contest_Min_Fields = {
  __typename?: 'contest_min_fields';
  contest_type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
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

/** 比赛公告 */
export type Contest_Notice = {
  __typename?: 'contest_notice';
  content: Scalars['String']['output'];
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  files?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "contest_notice" */
export type Contest_Notice_Aggregate = {
  __typename?: 'contest_notice_aggregate';
  aggregate?: Maybe<Contest_Notice_Aggregate_Fields>;
  nodes: Array<Contest_Notice>;
};

/** aggregate fields of "contest_notice" */
export type Contest_Notice_Aggregate_Fields = {
  __typename?: 'contest_notice_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Notice_Max_Fields>;
  min?: Maybe<Contest_Notice_Min_Fields>;
};


/** aggregate fields of "contest_notice" */
export type Contest_Notice_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_notice" */
export type Contest_Notice_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Notice_Max_Order_By>;
  min?: InputMaybe<Contest_Notice_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_notice" */
export type Contest_Notice_Arr_Rel_Insert_Input = {
  data: Array<Contest_Notice_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Notice_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_notice". All fields are combined with a logical 'AND'. */
export type Contest_Notice_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Notice_Bool_Exp>>;
  _not?: InputMaybe<Contest_Notice_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Notice_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  files?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_notice" */
export enum Contest_Notice_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContestInfoPkey = 'contest_info_pkey'
}

/** input type for inserting data into table "contest_notice" */
export type Contest_Notice_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Notice_Max_Fields = {
  __typename?: 'contest_notice_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "contest_notice" */
export type Contest_Notice_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  files?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Notice_Min_Fields = {
  __typename?: 'contest_notice_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  files?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "contest_notice" */
export type Contest_Notice_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  files?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_notice" */
export type Contest_Notice_Mutation_Response = {
  __typename?: 'contest_notice_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Notice>;
};

/** on_conflict condition type for table "contest_notice" */
export type Contest_Notice_On_Conflict = {
  constraint: Contest_Notice_Constraint;
  update_columns?: Array<Contest_Notice_Update_Column>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_notice". */
export type Contest_Notice_Order_By = {
  content?: InputMaybe<Order_By>;
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  files?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_notice */
export type Contest_Notice_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contest_notice" */
export enum Contest_Notice_Select_Column {
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

/** input type for updating data in table "contest_notice" */
export type Contest_Notice_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "contest_notice" */
export enum Contest_Notice_Update_Column {
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
  arena_switch?: InputMaybe<Order_By>;
  code_upload_switch?: InputMaybe<Order_By>;
  contest_managers_aggregate?: InputMaybe<Contest_Manager_Aggregate_Order_By>;
  contest_maps_aggregate?: InputMaybe<Contest_Map_Aggregate_Order_By>;
  contest_notices_aggregate?: InputMaybe<Contest_Notice_Aggregate_Order_By>;
  contest_players_aggregate?: InputMaybe<Contest_Player_Aggregate_Order_By>;
  contest_rooms_aggregate?: InputMaybe<Contest_Room_Aggregate_Order_By>;
  contest_rounds_aggregate?: InputMaybe<Contest_Round_Aggregate_Order_By>;
  contest_teams_aggregate?: InputMaybe<Contest_Team_Aggregate_Order_By>;
  contest_times_aggregate?: InputMaybe<Contest_Time_Aggregate_Order_By>;
  contest_type?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  fullname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  playback_switch?: InputMaybe<Order_By>;
  playground_switch?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  stream_switch?: InputMaybe<Order_By>;
  team_switch?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest */
export type Contest_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** 记录每个比赛可以允许几队、每队有几个玩家、每个玩家可以选择哪些角色 */
export type Contest_Player = {
  __typename?: 'contest_player';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  player_label: Scalars['String']['output'];
  roles_available: Scalars['String']['output'];
  team_label: Scalars['String']['output'];
};

/** aggregated selection of "contest_player" */
export type Contest_Player_Aggregate = {
  __typename?: 'contest_player_aggregate';
  aggregate?: Maybe<Contest_Player_Aggregate_Fields>;
  nodes: Array<Contest_Player>;
};

/** aggregate fields of "contest_player" */
export type Contest_Player_Aggregate_Fields = {
  __typename?: 'contest_player_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Player_Max_Fields>;
  min?: Maybe<Contest_Player_Min_Fields>;
};


/** aggregate fields of "contest_player" */
export type Contest_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_player" */
export type Contest_Player_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Player_Max_Order_By>;
  min?: InputMaybe<Contest_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_player" */
export type Contest_Player_Arr_Rel_Insert_Input = {
  data: Array<Contest_Player_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_player". All fields are combined with a logical 'AND'. */
export type Contest_Player_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Player_Bool_Exp>>;
  _not?: InputMaybe<Contest_Player_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Player_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  player_label?: InputMaybe<String_Comparison_Exp>;
  roles_available?: InputMaybe<String_Comparison_Exp>;
  team_label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_player" */
export enum Contest_Player_Constraint {
  /** unique or primary key constraint on columns "team_label", "player_label", "contest_id" */
  ContestPlayerPkey = 'contest_player_pkey'
}

/** input type for inserting data into table "contest_player" */
export type Contest_Player_Insert_Input = {
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  player_label?: InputMaybe<Scalars['String']['input']>;
  roles_available?: InputMaybe<Scalars['String']['input']>;
  team_label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Contest_Player_Max_Fields = {
  __typename?: 'contest_player_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  player_label?: Maybe<Scalars['String']['output']>;
  roles_available?: Maybe<Scalars['String']['output']>;
  team_label?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "contest_player" */
export type Contest_Player_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  player_label?: InputMaybe<Order_By>;
  roles_available?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Player_Min_Fields = {
  __typename?: 'contest_player_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  player_label?: Maybe<Scalars['String']['output']>;
  roles_available?: Maybe<Scalars['String']['output']>;
  team_label?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "contest_player" */
export type Contest_Player_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  player_label?: InputMaybe<Order_By>;
  roles_available?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_player" */
export type Contest_Player_Mutation_Response = {
  __typename?: 'contest_player_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Player>;
};

/** on_conflict condition type for table "contest_player" */
export type Contest_Player_On_Conflict = {
  constraint: Contest_Player_Constraint;
  update_columns?: Array<Contest_Player_Update_Column>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_player". */
export type Contest_Player_Order_By = {
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  player_label?: InputMaybe<Order_By>;
  roles_available?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_player */
export type Contest_Player_Pk_Columns_Input = {
  contest_id: Scalars['uuid']['input'];
  player_label: Scalars['String']['input'];
  team_label: Scalars['String']['input'];
};

/** select columns of table "contest_player" */
export enum Contest_Player_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  PlayerLabel = 'player_label',
  /** column name */
  RolesAvailable = 'roles_available',
  /** column name */
  TeamLabel = 'team_label'
}

/** input type for updating data in table "contest_player" */
export type Contest_Player_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  player_label?: InputMaybe<Scalars['String']['input']>;
  roles_available?: InputMaybe<Scalars['String']['input']>;
  team_label?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "contest_player" */
export enum Contest_Player_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  PlayerLabel = 'player_label',
  /** column name */
  RolesAvailable = 'roles_available',
  /** column name */
  TeamLabel = 'team_label'
}

/** columns and relationships of "contest_room" */
export type Contest_Room = {
  __typename?: 'contest_room';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  /** An object relationship */
  contest_map?: Maybe<Contest_Map>;
  /** An array relationship */
  contest_room_teams: Array<Contest_Room_Team>;
  /** An aggregate relationship */
  contest_room_teams_aggregate: Contest_Room_Team_Aggregate;
  /** An object relationship */
  contest_round?: Maybe<Contest_Round>;
  created_at: Scalars['timestamptz']['output'];
  map_id?: Maybe<Scalars['uuid']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id: Scalars['uuid']['output'];
  round_id?: Maybe<Scalars['uuid']['output']>;
  status: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
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

/** order by aggregate values of table "contest_room" */
export type Contest_Room_Aggregate_Order_By = {
  avg?: InputMaybe<Contest_Room_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Room_Max_Order_By>;
  min?: InputMaybe<Contest_Room_Min_Order_By>;
  stddev?: InputMaybe<Contest_Room_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contest_Room_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contest_Room_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contest_Room_Sum_Order_By>;
  var_pop?: InputMaybe<Contest_Room_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contest_Room_Var_Samp_Order_By>;
  variance?: InputMaybe<Contest_Room_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contest_room" */
export type Contest_Room_Arr_Rel_Insert_Input = {
  data: Array<Contest_Room_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Room_On_Conflict>;
};

/** aggregate avg on columns */
export type Contest_Room_Avg_Fields = {
  __typename?: 'contest_room_avg_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contest_room" */
export type Contest_Room_Avg_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contest_room". All fields are combined with a logical 'AND'. */
export type Contest_Room_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Room_Bool_Exp>>;
  _not?: InputMaybe<Contest_Room_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Room_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_map?: InputMaybe<Contest_Map_Bool_Exp>;
  contest_room_teams?: InputMaybe<Contest_Room_Team_Bool_Exp>;
  contest_round?: InputMaybe<Contest_Round_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  map_id?: InputMaybe<Uuid_Comparison_Exp>;
  port?: InputMaybe<Int_Comparison_Exp>;
  result?: InputMaybe<String_Comparison_Exp>;
  room_id?: InputMaybe<Uuid_Comparison_Exp>;
  round_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_map?: InputMaybe<Contest_Map_Obj_Rel_Insert_Input>;
  contest_room_teams?: InputMaybe<Contest_Room_Team_Arr_Rel_Insert_Input>;
  contest_round?: InputMaybe<Contest_Round_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  round_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Room_Max_Fields = {
  __typename?: 'contest_room_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
  round_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "contest_room" */
export type Contest_Room_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Room_Min_Fields = {
  __typename?: 'contest_room_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
  round_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "contest_room" */
export type Contest_Room_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  contest_map?: InputMaybe<Contest_Map_Order_By>;
  contest_room_teams_aggregate?: InputMaybe<Contest_Room_Team_Aggregate_Order_By>;
  contest_round?: InputMaybe<Contest_Round_Order_By>;
  created_at?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  port?: InputMaybe<Order_By>;
  result?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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
  MapId = 'map_id',
  /** column name */
  Port = 'port',
  /** column name */
  Result = 'result',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "contest_room" */
export type Contest_Room_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  port?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  round_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Contest_Room_Stddev_Fields = {
  __typename?: 'contest_room_stddev_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contest_room" */
export type Contest_Room_Stddev_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contest_Room_Stddev_Pop_Fields = {
  __typename?: 'contest_room_stddev_pop_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contest_room" */
export type Contest_Room_Stddev_Pop_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contest_Room_Stddev_Samp_Fields = {
  __typename?: 'contest_room_stddev_samp_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contest_room" */
export type Contest_Room_Stddev_Samp_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Contest_Room_Sum_Fields = {
  __typename?: 'contest_room_sum_fields';
  port?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "contest_room" */
export type Contest_Room_Sum_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** columns and relationships of "contest_room_team" */
export type Contest_Room_Team = {
  __typename?: 'contest_room_team';
  /** An object relationship */
  contest_room: Contest_Room;
  /** An object relationship */
  contest_team: Contest_Team;
  player_codes?: Maybe<Scalars['String']['output']>;
  player_roles?: Maybe<Scalars['String']['output']>;
  room_id: Scalars['uuid']['output'];
  score?: Maybe<Scalars['Int']['output']>;
  team_id: Scalars['uuid']['output'];
  team_label?: Maybe<Scalars['String']['output']>;
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
  avg?: Maybe<Contest_Room_Team_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Room_Team_Max_Fields>;
  min?: Maybe<Contest_Room_Team_Min_Fields>;
  stddev?: Maybe<Contest_Room_Team_Stddev_Fields>;
  stddev_pop?: Maybe<Contest_Room_Team_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contest_Room_Team_Stddev_Samp_Fields>;
  sum?: Maybe<Contest_Room_Team_Sum_Fields>;
  var_pop?: Maybe<Contest_Room_Team_Var_Pop_Fields>;
  var_samp?: Maybe<Contest_Room_Team_Var_Samp_Fields>;
  variance?: Maybe<Contest_Room_Team_Variance_Fields>;
};


/** aggregate fields of "contest_room_team" */
export type Contest_Room_Team_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_room_team" */
export type Contest_Room_Team_Aggregate_Order_By = {
  avg?: InputMaybe<Contest_Room_Team_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Room_Team_Max_Order_By>;
  min?: InputMaybe<Contest_Room_Team_Min_Order_By>;
  stddev?: InputMaybe<Contest_Room_Team_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contest_Room_Team_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contest_Room_Team_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contest_Room_Team_Sum_Order_By>;
  var_pop?: InputMaybe<Contest_Room_Team_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contest_Room_Team_Var_Samp_Order_By>;
  variance?: InputMaybe<Contest_Room_Team_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contest_room_team" */
export type Contest_Room_Team_Arr_Rel_Insert_Input = {
  data: Array<Contest_Room_Team_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Room_Team_On_Conflict>;
};

/** aggregate avg on columns */
export type Contest_Room_Team_Avg_Fields = {
  __typename?: 'contest_room_team_avg_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contest_room_team" */
export type Contest_Room_Team_Avg_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contest_room_team". All fields are combined with a logical 'AND'. */
export type Contest_Room_Team_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Room_Team_Bool_Exp>>;
  _not?: InputMaybe<Contest_Room_Team_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Room_Team_Bool_Exp>>;
  contest_room?: InputMaybe<Contest_Room_Bool_Exp>;
  contest_team?: InputMaybe<Contest_Team_Bool_Exp>;
  player_codes?: InputMaybe<String_Comparison_Exp>;
  player_roles?: InputMaybe<String_Comparison_Exp>;
  room_id?: InputMaybe<Uuid_Comparison_Exp>;
  score?: InputMaybe<Int_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  team_label?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_room_team" */
export enum Contest_Room_Team_Constraint {
  /** unique or primary key constraint on columns "room_id", "team_id" */
  ContestRoomTeamPkey = 'contest_room_team_pkey'
}

/** input type for incrementing numeric columns in table "contest_room_team" */
export type Contest_Room_Team_Inc_Input = {
  score?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "contest_room_team" */
export type Contest_Room_Team_Insert_Input = {
  contest_room?: InputMaybe<Contest_Room_Obj_Rel_Insert_Input>;
  contest_team?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  player_codes?: InputMaybe<Scalars['String']['input']>;
  player_roles?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  team_label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Contest_Room_Team_Max_Fields = {
  __typename?: 'contest_room_team_max_fields';
  player_codes?: Maybe<Scalars['String']['output']>;
  player_roles?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  team_label?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "contest_room_team" */
export type Contest_Room_Team_Max_Order_By = {
  player_codes?: InputMaybe<Order_By>;
  player_roles?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Room_Team_Min_Fields = {
  __typename?: 'contest_room_team_min_fields';
  player_codes?: Maybe<Scalars['String']['output']>;
  player_roles?: Maybe<Scalars['String']['output']>;
  room_id?: Maybe<Scalars['uuid']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  team_label?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "contest_room_team" */
export type Contest_Room_Team_Min_Order_By = {
  player_codes?: InputMaybe<Order_By>;
  player_roles?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
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
  player_codes?: InputMaybe<Order_By>;
  player_roles?: InputMaybe<Order_By>;
  room_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_label?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_room_team */
export type Contest_Room_Team_Pk_Columns_Input = {
  room_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_room_team" */
export enum Contest_Room_Team_Select_Column {
  /** column name */
  PlayerCodes = 'player_codes',
  /** column name */
  PlayerRoles = 'player_roles',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  Score = 'score',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  TeamLabel = 'team_label'
}

/** input type for updating data in table "contest_room_team" */
export type Contest_Room_Team_Set_Input = {
  player_codes?: InputMaybe<Scalars['String']['input']>;
  player_roles?: InputMaybe<Scalars['String']['input']>;
  room_id?: InputMaybe<Scalars['uuid']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  team_label?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Contest_Room_Team_Stddev_Fields = {
  __typename?: 'contest_room_team_stddev_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contest_room_team" */
export type Contest_Room_Team_Stddev_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contest_Room_Team_Stddev_Pop_Fields = {
  __typename?: 'contest_room_team_stddev_pop_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contest_room_team" */
export type Contest_Room_Team_Stddev_Pop_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contest_Room_Team_Stddev_Samp_Fields = {
  __typename?: 'contest_room_team_stddev_samp_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contest_room_team" */
export type Contest_Room_Team_Stddev_Samp_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Contest_Room_Team_Sum_Fields = {
  __typename?: 'contest_room_team_sum_fields';
  score?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "contest_room_team" */
export type Contest_Room_Team_Sum_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** update columns of table "contest_room_team" */
export enum Contest_Room_Team_Update_Column {
  /** column name */
  PlayerCodes = 'player_codes',
  /** column name */
  PlayerRoles = 'player_roles',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  Score = 'score',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  TeamLabel = 'team_label'
}

/** aggregate var_pop on columns */
export type Contest_Room_Team_Var_Pop_Fields = {
  __typename?: 'contest_room_team_var_pop_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contest_room_team" */
export type Contest_Room_Team_Var_Pop_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contest_Room_Team_Var_Samp_Fields = {
  __typename?: 'contest_room_team_var_samp_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contest_room_team" */
export type Contest_Room_Team_Var_Samp_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contest_Room_Team_Variance_Fields = {
  __typename?: 'contest_room_team_variance_fields';
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contest_room_team" */
export type Contest_Room_Team_Variance_Order_By = {
  score?: InputMaybe<Order_By>;
};

/** update columns of table "contest_room" */
export enum Contest_Room_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  MapId = 'map_id',
  /** column name */
  Port = 'port',
  /** column name */
  Result = 'result',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Contest_Room_Var_Pop_Fields = {
  __typename?: 'contest_room_var_pop_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contest_room" */
export type Contest_Room_Var_Pop_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contest_Room_Var_Samp_Fields = {
  __typename?: 'contest_room_var_samp_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contest_room" */
export type Contest_Room_Var_Samp_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contest_Room_Variance_Fields = {
  __typename?: 'contest_room_variance_fields';
  port?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contest_room" */
export type Contest_Room_Variance_Order_By = {
  port?: InputMaybe<Order_By>;
};

/** 正式比赛的每轮（初赛、决赛）信息 */
export type Contest_Round = {
  __typename?: 'contest_round';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  /** An object relationship */
  contest_map?: Maybe<Contest_Map>;
  /** An array relationship */
  contest_round_rooms: Array<Contest_Room>;
  /** An aggregate relationship */
  contest_round_rooms_aggregate: Contest_Room_Aggregate;
  map_id?: Maybe<Scalars['uuid']['output']>;
  name: Scalars['String']['output'];
  round_id: Scalars['uuid']['output'];
};


/** 正式比赛的每轮（初赛、决赛）信息 */
export type Contest_RoundContest_Round_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};


/** 正式比赛的每轮（初赛、决赛）信息 */
export type Contest_RoundContest_Round_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Order_By>>;
  where?: InputMaybe<Contest_Room_Bool_Exp>;
};

/** aggregated selection of "contest_round" */
export type Contest_Round_Aggregate = {
  __typename?: 'contest_round_aggregate';
  aggregate?: Maybe<Contest_Round_Aggregate_Fields>;
  nodes: Array<Contest_Round>;
};

/** aggregate fields of "contest_round" */
export type Contest_Round_Aggregate_Fields = {
  __typename?: 'contest_round_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Round_Max_Fields>;
  min?: Maybe<Contest_Round_Min_Fields>;
};


/** aggregate fields of "contest_round" */
export type Contest_Round_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Round_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_round" */
export type Contest_Round_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Round_Max_Order_By>;
  min?: InputMaybe<Contest_Round_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_round" */
export type Contest_Round_Arr_Rel_Insert_Input = {
  data: Array<Contest_Round_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Round_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_round". All fields are combined with a logical 'AND'. */
export type Contest_Round_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Round_Bool_Exp>>;
  _not?: InputMaybe<Contest_Round_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Round_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_map?: InputMaybe<Contest_Map_Bool_Exp>;
  contest_round_rooms?: InputMaybe<Contest_Room_Bool_Exp>;
  map_id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  round_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_round" */
export enum Contest_Round_Constraint {
  /** unique or primary key constraint on columns "round_id" */
  ContestRoundPkey = 'contest_round_pkey'
}

/** input type for inserting data into table "contest_round" */
export type Contest_Round_Insert_Input = {
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_map?: InputMaybe<Contest_Map_Obj_Rel_Insert_Input>;
  contest_round_rooms?: InputMaybe<Contest_Room_Arr_Rel_Insert_Input>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  round_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Round_Max_Fields = {
  __typename?: 'contest_round_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  round_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_round" */
export type Contest_Round_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Round_Min_Fields = {
  __typename?: 'contest_round_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  map_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  round_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_round" */
export type Contest_Round_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_round" */
export type Contest_Round_Mutation_Response = {
  __typename?: 'contest_round_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Round>;
};

/** input type for inserting object relation for remote table "contest_round" */
export type Contest_Round_Obj_Rel_Insert_Input = {
  data: Contest_Round_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Round_On_Conflict>;
};

/** on_conflict condition type for table "contest_round" */
export type Contest_Round_On_Conflict = {
  constraint: Contest_Round_Constraint;
  update_columns?: Array<Contest_Round_Update_Column>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_round". */
export type Contest_Round_Order_By = {
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  contest_map?: InputMaybe<Contest_Map_Order_By>;
  contest_round_rooms_aggregate?: InputMaybe<Contest_Room_Aggregate_Order_By>;
  map_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_round */
export type Contest_Round_Pk_Columns_Input = {
  round_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_round" */
export enum Contest_Round_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  MapId = 'map_id',
  /** column name */
  Name = 'name',
  /** column name */
  RoundId = 'round_id'
}

/** input type for updating data in table "contest_round" */
export type Contest_Round_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  map_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  round_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_round" */
export enum Contest_Round_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  MapId = 'map_id',
  /** column name */
  Name = 'name',
  /** column name */
  RoundId = 'round_id'
}

/** select columns of table "contest" */
export enum Contest_Select_Column {
  /** column name */
  ArenaSwitch = 'arena_switch',
  /** column name */
  CodeUploadSwitch = 'code_upload_switch',
  /** column name */
  ContestType = 'contest_type',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Fullname = 'fullname',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PlaybackSwitch = 'playback_switch',
  /** column name */
  PlaygroundSwitch = 'playground_switch',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  StreamSwitch = 'stream_switch',
  /** column name */
  TeamSwitch = 'team_switch'
}

/** input type for updating data in table "contest" */
export type Contest_Set_Input = {
  arena_switch?: InputMaybe<Scalars['Boolean']['input']>;
  code_upload_switch?: InputMaybe<Scalars['Boolean']['input']>;
  contest_type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  playback_switch?: InputMaybe<Scalars['Boolean']['input']>;
  playground_switch?: InputMaybe<Scalars['Boolean']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stream_switch?: InputMaybe<Scalars['Boolean']['input']>;
  team_switch?: InputMaybe<Scalars['Boolean']['input']>;
};

/** 比赛队伍 */
export type Contest_Team = {
  __typename?: 'contest_team';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  contest_score?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  contest_team_codes: Array<Contest_Team_Code>;
  /** An aggregate relationship */
  contest_team_codes_aggregate: Contest_Team_Code_Aggregate;
  /** An array relationship */
  contest_team_members: Array<Contest_Team_Member>;
  /** An aggregate relationship */
  contest_team_members_aggregate: Contest_Team_Member_Aggregate;
  /** An array relationship */
  contest_team_players: Array<Contest_Team_Player>;
  /** An aggregate relationship */
  contest_team_players_aggregate: Contest_Team_Player_Aggregate;
  /** An array relationship */
  contest_team_rooms: Array<Contest_Room_Team>;
  /** An aggregate relationship */
  contest_team_rooms_aggregate: Contest_Room_Team_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  invited_code: Scalars['String']['output'];
  /** 已有人员数量 */
  member_num: Scalars['Int']['output'];
  score?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  status2?: Maybe<Scalars['String']['output']>;
  submitted_code_num: Scalars['Int']['output'];
  team_id: Scalars['uuid']['output'];
  team_intro?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  team_leader: Users;
  team_leader_uuid: Scalars['uuid']['output'];
  team_name: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_CodesArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_Codes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
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


/** 比赛队伍 */
export type Contest_TeamContest_Team_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_RoomsArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
};


/** 比赛队伍 */
export type Contest_TeamContest_Team_Rooms_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Room_Team_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Room_Team_Order_By>>;
  where?: InputMaybe<Contest_Room_Team_Bool_Exp>;
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
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_score?: InputMaybe<String_Comparison_Exp>;
  contest_team_codes?: InputMaybe<Contest_Team_Code_Bool_Exp>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Bool_Exp>;
  contest_team_players?: InputMaybe<Contest_Team_Player_Bool_Exp>;
  contest_team_rooms?: InputMaybe<Contest_Room_Team_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  invited_code?: InputMaybe<String_Comparison_Exp>;
  member_num?: InputMaybe<Int_Comparison_Exp>;
  score?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  status2?: InputMaybe<String_Comparison_Exp>;
  submitted_code_num?: InputMaybe<Int_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  team_intro?: InputMaybe<String_Comparison_Exp>;
  team_leader?: InputMaybe<Users_Bool_Exp>;
  team_leader_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  team_name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** 记录每个team上传的所有code，角色应从上传的code中选择一份。 */
export type Contest_Team_Code = {
  __typename?: 'contest_team_code';
  code_id: Scalars['uuid']['output'];
  code_name: Scalars['String']['output'];
  compile_status: Scalars['String']['output'];
  /** An object relationship */
  contest_team: Contest_Team;
  created_at: Scalars['timestamptz']['output'];
  language: Scalars['String']['output'];
  team_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contest_team_code" */
export type Contest_Team_Code_Aggregate = {
  __typename?: 'contest_team_code_aggregate';
  aggregate?: Maybe<Contest_Team_Code_Aggregate_Fields>;
  nodes: Array<Contest_Team_Code>;
};

/** aggregate fields of "contest_team_code" */
export type Contest_Team_Code_Aggregate_Fields = {
  __typename?: 'contest_team_code_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Team_Code_Max_Fields>;
  min?: Maybe<Contest_Team_Code_Min_Fields>;
};


/** aggregate fields of "contest_team_code" */
export type Contest_Team_Code_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_team_code" */
export type Contest_Team_Code_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Team_Code_Max_Order_By>;
  min?: InputMaybe<Contest_Team_Code_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_team_code" */
export type Contest_Team_Code_Arr_Rel_Insert_Input = {
  data: Array<Contest_Team_Code_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_Code_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_team_code". All fields are combined with a logical 'AND'. */
export type Contest_Team_Code_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Team_Code_Bool_Exp>>;
  _not?: InputMaybe<Contest_Team_Code_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Team_Code_Bool_Exp>>;
  code_id?: InputMaybe<Uuid_Comparison_Exp>;
  code_name?: InputMaybe<String_Comparison_Exp>;
  compile_status?: InputMaybe<String_Comparison_Exp>;
  contest_team?: InputMaybe<Contest_Team_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  language?: InputMaybe<String_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_team_code" */
export enum Contest_Team_Code_Constraint {
  /** unique or primary key constraint on columns "code_id" */
  ContestTeamCodePkey = 'contest_team_code_pkey'
}

/** input type for inserting data into table "contest_team_code" */
export type Contest_Team_Code_Insert_Input = {
  code_id?: InputMaybe<Scalars['uuid']['input']>;
  code_name?: InputMaybe<Scalars['String']['input']>;
  compile_status?: InputMaybe<Scalars['String']['input']>;
  contest_team?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Team_Code_Max_Fields = {
  __typename?: 'contest_team_code_max_fields';
  code_id?: Maybe<Scalars['uuid']['output']>;
  code_name?: Maybe<Scalars['String']['output']>;
  compile_status?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_team_code" */
export type Contest_Team_Code_Max_Order_By = {
  code_id?: InputMaybe<Order_By>;
  code_name?: InputMaybe<Order_By>;
  compile_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Team_Code_Min_Fields = {
  __typename?: 'contest_team_code_min_fields';
  code_id?: Maybe<Scalars['uuid']['output']>;
  code_name?: Maybe<Scalars['String']['output']>;
  compile_status?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_team_code" */
export type Contest_Team_Code_Min_Order_By = {
  code_id?: InputMaybe<Order_By>;
  code_name?: InputMaybe<Order_By>;
  compile_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_team_code" */
export type Contest_Team_Code_Mutation_Response = {
  __typename?: 'contest_team_code_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Team_Code>;
};

/** input type for inserting object relation for remote table "contest_team_code" */
export type Contest_Team_Code_Obj_Rel_Insert_Input = {
  data: Contest_Team_Code_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_Code_On_Conflict>;
};

/** on_conflict condition type for table "contest_team_code" */
export type Contest_Team_Code_On_Conflict = {
  constraint: Contest_Team_Code_Constraint;
  update_columns?: Array<Contest_Team_Code_Update_Column>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_team_code". */
export type Contest_Team_Code_Order_By = {
  code_id?: InputMaybe<Order_By>;
  code_name?: InputMaybe<Order_By>;
  compile_status?: InputMaybe<Order_By>;
  contest_team?: InputMaybe<Contest_Team_Order_By>;
  created_at?: InputMaybe<Order_By>;
  language?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team_code */
export type Contest_Team_Code_Pk_Columns_Input = {
  code_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_team_code" */
export enum Contest_Team_Code_Select_Column {
  /** column name */
  CodeId = 'code_id',
  /** column name */
  CodeName = 'code_name',
  /** column name */
  CompileStatus = 'compile_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Language = 'language',
  /** column name */
  TeamId = 'team_id'
}

/** input type for updating data in table "contest_team_code" */
export type Contest_Team_Code_Set_Input = {
  code_id?: InputMaybe<Scalars['uuid']['input']>;
  code_name?: InputMaybe<Scalars['String']['input']>;
  compile_status?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_team_code" */
export enum Contest_Team_Code_Update_Column {
  /** column name */
  CodeId = 'code_id',
  /** column name */
  CodeName = 'code_name',
  /** column name */
  CompileStatus = 'compile_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Language = 'language',
  /** column name */
  TeamId = 'team_id'
}

/** unique or primary key constraints on table "contest_team" */
export enum Contest_Team_Constraint {
  /** unique or primary key constraint on columns "invited_code" */
  ContestTeamInvitedCodeKey = 'contest_team_invited_code_key',
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
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_score?: InputMaybe<Scalars['String']['input']>;
  contest_team_codes?: InputMaybe<Contest_Team_Code_Arr_Rel_Insert_Input>;
  contest_team_members?: InputMaybe<Contest_Team_Member_Arr_Rel_Insert_Input>;
  contest_team_players?: InputMaybe<Contest_Team_Player_Arr_Rel_Insert_Input>;
  contest_team_rooms?: InputMaybe<Contest_Room_Team_Arr_Rel_Insert_Input>;
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
  team_leader?: InputMaybe<Users_Obj_Rel_Insert_Input>;
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
  team_leader_uuid?: InputMaybe<Order_By>;
  team_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** 队伍、成员映射表 */
export type Contest_Team_Member = {
  __typename?: 'contest_team_member';
  /** An object relationship */
  contest_team: Contest_Team;
  team_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_uuid: Scalars['uuid']['output'];
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
  contest_team?: InputMaybe<Contest_Team_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_uuid?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_team_member" */
export enum Contest_Team_Member_Constraint {
  /** unique or primary key constraint on columns "user_uuid", "team_id" */
  ContestTeamMemberPkey = 'contest_team_member_pkey'
}

/** input type for inserting data into table "contest_team_member" */
export type Contest_Team_Member_Insert_Input = {
  contest_team?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Team_Member_Max_Fields = {
  __typename?: 'contest_team_member_max_fields';
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_team_member" */
export type Contest_Team_Member_Max_Order_By = {
  team_id?: InputMaybe<Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Team_Member_Min_Fields = {
  __typename?: 'contest_team_member_min_fields';
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_uuid?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_team_member" */
export type Contest_Team_Member_Min_Order_By = {
  team_id?: InputMaybe<Order_By>;
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
  contest_team?: InputMaybe<Contest_Team_Order_By>;
  team_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_uuid?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team_member */
export type Contest_Team_Member_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};

/** select columns of table "contest_team_member" */
export enum Contest_Team_Member_Select_Column {
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UserUuid = 'user_uuid'
}

/** input type for updating data in table "contest_team_member" */
export type Contest_Team_Member_Set_Input = {
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user_uuid?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_team_member" */
export enum Contest_Team_Member_Update_Column {
  /** column name */
  TeamId = 'team_id',
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
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  contest_score?: InputMaybe<Order_By>;
  contest_team_codes_aggregate?: InputMaybe<Contest_Team_Code_Aggregate_Order_By>;
  contest_team_members_aggregate?: InputMaybe<Contest_Team_Member_Aggregate_Order_By>;
  contest_team_players_aggregate?: InputMaybe<Contest_Team_Player_Aggregate_Order_By>;
  contest_team_rooms_aggregate?: InputMaybe<Contest_Room_Team_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  invited_code?: InputMaybe<Order_By>;
  member_num?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  status2?: InputMaybe<Order_By>;
  submitted_code_num?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  team_intro?: InputMaybe<Order_By>;
  team_leader?: InputMaybe<Users_Order_By>;
  team_leader_uuid?: InputMaybe<Order_By>;
  team_name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team */
export type Contest_Team_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
};

/** 记录每个team的每个player选择了哪份code */
export type Contest_Team_Player = {
  __typename?: 'contest_team_player';
  code_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  contest_team: Contest_Team;
  player: Scalars['String']['output'];
  /** An object relationship */
  player_code?: Maybe<Contest_Team_Code>;
  role?: Maybe<Scalars['String']['output']>;
  team_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contest_team_player" */
export type Contest_Team_Player_Aggregate = {
  __typename?: 'contest_team_player_aggregate';
  aggregate?: Maybe<Contest_Team_Player_Aggregate_Fields>;
  nodes: Array<Contest_Team_Player>;
};

/** aggregate fields of "contest_team_player" */
export type Contest_Team_Player_Aggregate_Fields = {
  __typename?: 'contest_team_player_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Team_Player_Max_Fields>;
  min?: Maybe<Contest_Team_Player_Min_Fields>;
};


/** aggregate fields of "contest_team_player" */
export type Contest_Team_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_team_player" */
export type Contest_Team_Player_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Team_Player_Max_Order_By>;
  min?: InputMaybe<Contest_Team_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_team_player" */
export type Contest_Team_Player_Arr_Rel_Insert_Input = {
  data: Array<Contest_Team_Player_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Team_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_team_player". All fields are combined with a logical 'AND'. */
export type Contest_Team_Player_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Team_Player_Bool_Exp>>;
  _not?: InputMaybe<Contest_Team_Player_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Team_Player_Bool_Exp>>;
  code_id?: InputMaybe<Uuid_Comparison_Exp>;
  contest_team?: InputMaybe<Contest_Team_Bool_Exp>;
  player?: InputMaybe<String_Comparison_Exp>;
  player_code?: InputMaybe<Contest_Team_Code_Bool_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_team_player" */
export enum Contest_Team_Player_Constraint {
  /** unique or primary key constraint on columns "player", "team_id" */
  ContestTeamPlayerPkey = 'contest_team_player_pkey'
}

/** input type for inserting data into table "contest_team_player" */
export type Contest_Team_Player_Insert_Input = {
  code_id?: InputMaybe<Scalars['uuid']['input']>;
  contest_team?: InputMaybe<Contest_Team_Obj_Rel_Insert_Input>;
  player?: InputMaybe<Scalars['String']['input']>;
  player_code?: InputMaybe<Contest_Team_Code_Obj_Rel_Insert_Input>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contest_Team_Player_Max_Fields = {
  __typename?: 'contest_team_player_max_fields';
  code_id?: Maybe<Scalars['uuid']['output']>;
  player?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contest_team_player" */
export type Contest_Team_Player_Max_Order_By = {
  code_id?: InputMaybe<Order_By>;
  player?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Team_Player_Min_Fields = {
  __typename?: 'contest_team_player_min_fields';
  code_id?: Maybe<Scalars['uuid']['output']>;
  player?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contest_team_player" */
export type Contest_Team_Player_Min_Order_By = {
  code_id?: InputMaybe<Order_By>;
  player?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_team_player" */
export type Contest_Team_Player_Mutation_Response = {
  __typename?: 'contest_team_player_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Team_Player>;
};

/** on_conflict condition type for table "contest_team_player" */
export type Contest_Team_Player_On_Conflict = {
  constraint: Contest_Team_Player_Constraint;
  update_columns?: Array<Contest_Team_Player_Update_Column>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_team_player". */
export type Contest_Team_Player_Order_By = {
  code_id?: InputMaybe<Order_By>;
  contest_team?: InputMaybe<Contest_Team_Order_By>;
  player?: InputMaybe<Order_By>;
  player_code?: InputMaybe<Contest_Team_Code_Order_By>;
  role?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_team_player */
export type Contest_Team_Player_Pk_Columns_Input = {
  player: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "contest_team_player" */
export enum Contest_Team_Player_Select_Column {
  /** column name */
  CodeId = 'code_id',
  /** column name */
  Player = 'player',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'team_id'
}

/** input type for updating data in table "contest_team_player" */
export type Contest_Team_Player_Set_Input = {
  code_id?: InputMaybe<Scalars['uuid']['input']>;
  player?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contest_team_player" */
export enum Contest_Team_Player_Update_Column {
  /** column name */
  CodeId = 'code_id',
  /** column name */
  Player = 'player',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'team_id'
}

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

/** 比赛的时间线，仅作展示用 */
export type Contest_Time = {
  __typename?: 'contest_time';
  /** An object relationship */
  contest: Contest;
  contest_id: Scalars['uuid']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end: Scalars['timestamptz']['output'];
  event: Scalars['String']['output'];
  start: Scalars['timestamptz']['output'];
};

/** aggregated selection of "contest_time" */
export type Contest_Time_Aggregate = {
  __typename?: 'contest_time_aggregate';
  aggregate?: Maybe<Contest_Time_Aggregate_Fields>;
  nodes: Array<Contest_Time>;
};

/** aggregate fields of "contest_time" */
export type Contest_Time_Aggregate_Fields = {
  __typename?: 'contest_time_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contest_Time_Max_Fields>;
  min?: Maybe<Contest_Time_Min_Fields>;
};


/** aggregate fields of "contest_time" */
export type Contest_Time_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contest_Time_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contest_time" */
export type Contest_Time_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contest_Time_Max_Order_By>;
  min?: InputMaybe<Contest_Time_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contest_time" */
export type Contest_Time_Arr_Rel_Insert_Input = {
  data: Array<Contest_Time_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contest_Time_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contest_time". All fields are combined with a logical 'AND'. */
export type Contest_Time_Bool_Exp = {
  _and?: InputMaybe<Array<Contest_Time_Bool_Exp>>;
  _not?: InputMaybe<Contest_Time_Bool_Exp>;
  _or?: InputMaybe<Array<Contest_Time_Bool_Exp>>;
  contest?: InputMaybe<Contest_Bool_Exp>;
  contest_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<String_Comparison_Exp>;
  start?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "contest_time" */
export enum Contest_Time_Constraint {
  /** unique or primary key constraint on columns "event", "contest_id" */
  ContestTimePkey = 'contest_time_pkey'
}

/** input type for inserting data into table "contest_time" */
export type Contest_Time_Insert_Input = {
  contest?: InputMaybe<Contest_Obj_Rel_Insert_Input>;
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['timestamptz']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Contest_Time_Max_Fields = {
  __typename?: 'contest_time_max_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['timestamptz']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "contest_time" */
export type Contest_Time_Max_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contest_Time_Min_Fields = {
  __typename?: 'contest_time_min_fields';
  contest_id?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['timestamptz']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "contest_time" */
export type Contest_Time_Min_Order_By = {
  contest_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contest_time" */
export type Contest_Time_Mutation_Response = {
  __typename?: 'contest_time_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contest_Time>;
};

/** on_conflict condition type for table "contest_time" */
export type Contest_Time_On_Conflict = {
  constraint: Contest_Time_Constraint;
  update_columns?: Array<Contest_Time_Update_Column>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};

/** Ordering options when selecting data from "contest_time". */
export type Contest_Time_Order_By = {
  contest?: InputMaybe<Contest_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contest_time */
export type Contest_Time_Pk_Columns_Input = {
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
};

/** select columns of table "contest_time" */
export enum Contest_Time_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  Description = 'description',
  /** column name */
  End = 'end',
  /** column name */
  Event = 'event',
  /** column name */
  Start = 'start'
}

/** input type for updating data in table "contest_time" */
export type Contest_Time_Set_Input = {
  contest_id?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['timestamptz']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "contest_time" */
export enum Contest_Time_Update_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  Description = 'description',
  /** column name */
  End = 'end',
  /** column name */
  Event = 'event',
  /** column name */
  Start = 'start'
}

/** update columns of table "contest" */
export enum Contest_Update_Column {
  /** column name */
  ArenaSwitch = 'arena_switch',
  /** column name */
  CodeUploadSwitch = 'code_upload_switch',
  /** column name */
  ContestType = 'contest_type',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Fullname = 'fullname',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PlaybackSwitch = 'playback_switch',
  /** column name */
  PlaygroundSwitch = 'playground_switch',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Status = 'status',
  /** column name */
  StreamSwitch = 'stream_switch',
  /** column name */
  TeamSwitch = 'team_switch'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** 院系类别，用于用户信息填写 */
export type Department = {
  __typename?: 'department';
  name: Scalars['String']['output'];
};

/** aggregated selection of "department" */
export type Department_Aggregate = {
  __typename?: 'department_aggregate';
  aggregate?: Maybe<Department_Aggregate_Fields>;
  nodes: Array<Department>;
};

/** aggregate fields of "department" */
export type Department_Aggregate_Fields = {
  __typename?: 'department_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Department_Max_Fields>;
  min?: Maybe<Department_Min_Fields>;
};


/** aggregate fields of "department" */
export type Department_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Department_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "department". All fields are combined with a logical 'AND'. */
export type Department_Bool_Exp = {
  _and?: InputMaybe<Array<Department_Bool_Exp>>;
  _not?: InputMaybe<Department_Bool_Exp>;
  _or?: InputMaybe<Array<Department_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "department" */
export enum Department_Constraint {
  /** unique or primary key constraint on columns "name" */
  DepartmentPkey = 'department_pkey'
}

/** input type for inserting data into table "department" */
export type Department_Insert_Input = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Department_Max_Fields = {
  __typename?: 'department_max_fields';
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Department_Min_Fields = {
  __typename?: 'department_min_fields';
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "department" */
export type Department_Mutation_Response = {
  __typename?: 'department_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Department>;
};

/** on_conflict condition type for table "department" */
export type Department_On_Conflict = {
  constraint: Department_Constraint;
  update_columns?: Array<Department_Update_Column>;
  where?: InputMaybe<Department_Bool_Exp>;
};

/** Ordering options when selecting data from "department". */
export type Department_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: department */
export type Department_Pk_Columns_Input = {
  name: Scalars['String']['input'];
};

/** select columns of table "department" */
export enum Department_Select_Column {
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "department" */
export type Department_Set_Input = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "department" */
export enum Department_Update_Column {
  /** column name */
  Name = 'name'
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
  student_byuuid?: Maybe<Users>;
  student_id?: Maybe<Scalars['String']['output']>;
  student_uuid?: Maybe<Scalars['uuid']['output']>;
  updated_at: Scalars['timestamptz']['output'];
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
  student_byuuid?: InputMaybe<Users_Bool_Exp>;
  student_id?: InputMaybe<String_Comparison_Exp>;
  student_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
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
  student_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['String']['input']>;
  student_uuid?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
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
  student_byuuid?: InputMaybe<Users_Order_By>;
  student_id?: InputMaybe<Order_By>;
  student_uuid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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
  mentor_byuuid?: Maybe<Users>;
  mentor_id?: Maybe<Scalars['String']['output']>;
  mentor_uuid?: Maybe<Scalars['uuid']['output']>;
  statement: Scalars['String']['output'];
  /** approved | submitted */
  status: Scalars['String']['output'];
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
  mentor_byuuid?: InputMaybe<Users_Bool_Exp>;
  mentor_id?: InputMaybe<String_Comparison_Exp>;
  mentor_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  statement?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
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
  mentor_byuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  mentor_id?: InputMaybe<Scalars['String']['input']>;
  mentor_uuid?: InputMaybe<Scalars['uuid']['input']>;
  statement?: InputMaybe<Scalars['String']['input']>;
  /** approved | submitted */
  status?: InputMaybe<Scalars['String']['input']>;
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
  mentor_byuuid?: InputMaybe<Users_Order_By>;
  mentor_id?: InputMaybe<Order_By>;
  mentor_uuid?: InputMaybe<Order_By>;
  statement?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
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
  from_userbyuuid?: Maybe<Users>;
  from_uuid?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  payload: Scalars['String']['output'];
  to_id?: Maybe<Scalars['String']['output']>;
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
  from_userbyuuid?: InputMaybe<Users_Bool_Exp>;
  from_uuid?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<String_Comparison_Exp>;
  to_id?: InputMaybe<String_Comparison_Exp>;
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
  from_userbyuuid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  from_uuid?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  payload?: InputMaybe<Scalars['String']['input']>;
  to_id?: InputMaybe<Scalars['String']['input']>;
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
  from_userbyuuid?: InputMaybe<Users_Order_By>;
  from_uuid?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
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
  /** delete data from the table: "contest_manager" */
  delete_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** delete single row from the table: "contest_manager" */
  delete_contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** delete data from the table: "contest_map" */
  delete_contest_map?: Maybe<Contest_Map_Mutation_Response>;
  /** delete single row from the table: "contest_map" */
  delete_contest_map_by_pk?: Maybe<Contest_Map>;
  /** delete data from the table: "contest_notice" */
  delete_contest_notice?: Maybe<Contest_Notice_Mutation_Response>;
  /** delete single row from the table: "contest_notice" */
  delete_contest_notice_by_pk?: Maybe<Contest_Notice>;
  /** delete data from the table: "contest_player" */
  delete_contest_player?: Maybe<Contest_Player_Mutation_Response>;
  /** delete single row from the table: "contest_player" */
  delete_contest_player_by_pk?: Maybe<Contest_Player>;
  /** delete data from the table: "contest_room" */
  delete_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** delete single row from the table: "contest_room" */
  delete_contest_room_by_pk?: Maybe<Contest_Room>;
  /** delete data from the table: "contest_room_team" */
  delete_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** delete single row from the table: "contest_room_team" */
  delete_contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** delete data from the table: "contest_round" */
  delete_contest_round?: Maybe<Contest_Round_Mutation_Response>;
  /** delete single row from the table: "contest_round" */
  delete_contest_round_by_pk?: Maybe<Contest_Round>;
  /** delete data from the table: "contest_team" */
  delete_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** delete single row from the table: "contest_team" */
  delete_contest_team_by_pk?: Maybe<Contest_Team>;
  /** delete data from the table: "contest_team_code" */
  delete_contest_team_code?: Maybe<Contest_Team_Code_Mutation_Response>;
  /** delete single row from the table: "contest_team_code" */
  delete_contest_team_code_by_pk?: Maybe<Contest_Team_Code>;
  /** delete data from the table: "contest_team_member" */
  delete_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** delete single row from the table: "contest_team_member" */
  delete_contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** delete data from the table: "contest_team_player" */
  delete_contest_team_player?: Maybe<Contest_Team_Player_Mutation_Response>;
  /** delete single row from the table: "contest_team_player" */
  delete_contest_team_player_by_pk?: Maybe<Contest_Team_Player>;
  /** delete data from the table: "contest_time" */
  delete_contest_time?: Maybe<Contest_Time_Mutation_Response>;
  /** delete single row from the table: "contest_time" */
  delete_contest_time_by_pk?: Maybe<Contest_Time>;
  /** delete data from the table: "department" */
  delete_department?: Maybe<Department_Mutation_Response>;
  /** delete single row from the table: "department" */
  delete_department_by_pk?: Maybe<Department>;
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
  /** insert data into the table: "contest_manager" */
  insert_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** insert a single row into the table: "contest_manager" */
  insert_contest_manager_one?: Maybe<Contest_Manager>;
  /** insert data into the table: "contest_map" */
  insert_contest_map?: Maybe<Contest_Map_Mutation_Response>;
  /** insert a single row into the table: "contest_map" */
  insert_contest_map_one?: Maybe<Contest_Map>;
  /** insert data into the table: "contest_notice" */
  insert_contest_notice?: Maybe<Contest_Notice_Mutation_Response>;
  /** insert a single row into the table: "contest_notice" */
  insert_contest_notice_one?: Maybe<Contest_Notice>;
  /** insert a single row into the table: "contest" */
  insert_contest_one?: Maybe<Contest>;
  /** insert data into the table: "contest_player" */
  insert_contest_player?: Maybe<Contest_Player_Mutation_Response>;
  /** insert a single row into the table: "contest_player" */
  insert_contest_player_one?: Maybe<Contest_Player>;
  /** insert data into the table: "contest_room" */
  insert_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** insert a single row into the table: "contest_room" */
  insert_contest_room_one?: Maybe<Contest_Room>;
  /** insert data into the table: "contest_room_team" */
  insert_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** insert a single row into the table: "contest_room_team" */
  insert_contest_room_team_one?: Maybe<Contest_Room_Team>;
  /** insert data into the table: "contest_round" */
  insert_contest_round?: Maybe<Contest_Round_Mutation_Response>;
  /** insert a single row into the table: "contest_round" */
  insert_contest_round_one?: Maybe<Contest_Round>;
  /** insert data into the table: "contest_team" */
  insert_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** insert data into the table: "contest_team_code" */
  insert_contest_team_code?: Maybe<Contest_Team_Code_Mutation_Response>;
  /** insert a single row into the table: "contest_team_code" */
  insert_contest_team_code_one?: Maybe<Contest_Team_Code>;
  /** insert data into the table: "contest_team_member" */
  insert_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** insert a single row into the table: "contest_team_member" */
  insert_contest_team_member_one?: Maybe<Contest_Team_Member>;
  /** insert a single row into the table: "contest_team" */
  insert_contest_team_one?: Maybe<Contest_Team>;
  /** insert data into the table: "contest_team_player" */
  insert_contest_team_player?: Maybe<Contest_Team_Player_Mutation_Response>;
  /** insert a single row into the table: "contest_team_player" */
  insert_contest_team_player_one?: Maybe<Contest_Team_Player>;
  /** insert data into the table: "contest_time" */
  insert_contest_time?: Maybe<Contest_Time_Mutation_Response>;
  /** insert a single row into the table: "contest_time" */
  insert_contest_time_one?: Maybe<Contest_Time>;
  /** insert data into the table: "department" */
  insert_department?: Maybe<Department_Mutation_Response>;
  /** insert a single row into the table: "department" */
  insert_department_one?: Maybe<Department>;
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
  /** update data of the table: "contest_manager" */
  update_contest_manager?: Maybe<Contest_Manager_Mutation_Response>;
  /** update single row of the table: "contest_manager" */
  update_contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** update data of the table: "contest_map" */
  update_contest_map?: Maybe<Contest_Map_Mutation_Response>;
  /** update single row of the table: "contest_map" */
  update_contest_map_by_pk?: Maybe<Contest_Map>;
  /** update data of the table: "contest_notice" */
  update_contest_notice?: Maybe<Contest_Notice_Mutation_Response>;
  /** update single row of the table: "contest_notice" */
  update_contest_notice_by_pk?: Maybe<Contest_Notice>;
  /** update data of the table: "contest_player" */
  update_contest_player?: Maybe<Contest_Player_Mutation_Response>;
  /** update single row of the table: "contest_player" */
  update_contest_player_by_pk?: Maybe<Contest_Player>;
  /** update data of the table: "contest_room" */
  update_contest_room?: Maybe<Contest_Room_Mutation_Response>;
  /** update single row of the table: "contest_room" */
  update_contest_room_by_pk?: Maybe<Contest_Room>;
  /** update data of the table: "contest_room_team" */
  update_contest_room_team?: Maybe<Contest_Room_Team_Mutation_Response>;
  /** update single row of the table: "contest_room_team" */
  update_contest_room_team_by_pk?: Maybe<Contest_Room_Team>;
  /** update data of the table: "contest_round" */
  update_contest_round?: Maybe<Contest_Round_Mutation_Response>;
  /** update single row of the table: "contest_round" */
  update_contest_round_by_pk?: Maybe<Contest_Round>;
  /** update data of the table: "contest_team" */
  update_contest_team?: Maybe<Contest_Team_Mutation_Response>;
  /** update single row of the table: "contest_team" */
  update_contest_team_by_pk?: Maybe<Contest_Team>;
  /** update data of the table: "contest_team_code" */
  update_contest_team_code?: Maybe<Contest_Team_Code_Mutation_Response>;
  /** update single row of the table: "contest_team_code" */
  update_contest_team_code_by_pk?: Maybe<Contest_Team_Code>;
  /** update data of the table: "contest_team_member" */
  update_contest_team_member?: Maybe<Contest_Team_Member_Mutation_Response>;
  /** update single row of the table: "contest_team_member" */
  update_contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** update data of the table: "contest_team_player" */
  update_contest_team_player?: Maybe<Contest_Team_Player_Mutation_Response>;
  /** update single row of the table: "contest_team_player" */
  update_contest_team_player_by_pk?: Maybe<Contest_Team_Player>;
  /** update data of the table: "contest_time" */
  update_contest_time?: Maybe<Contest_Time_Mutation_Response>;
  /** update single row of the table: "contest_time" */
  update_contest_time_by_pk?: Maybe<Contest_Time>;
  /** update data of the table: "department" */
  update_department?: Maybe<Department_Mutation_Response>;
  /** update single row of the table: "department" */
  update_department_by_pk?: Maybe<Department>;
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
export type Mutation_RootDelete_Contest_ManagerArgs = {
  where: Contest_Manager_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Manager_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_MapArgs = {
  where: Contest_Map_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Map_By_PkArgs = {
  map_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_NoticeArgs = {
  where: Contest_Notice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_PlayerArgs = {
  where: Contest_Player_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Player_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  player_label: Scalars['String']['input'];
  team_label: Scalars['String']['input'];
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
export type Mutation_RootDelete_Contest_RoundArgs = {
  where: Contest_Round_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Round_By_PkArgs = {
  round_id: Scalars['uuid']['input'];
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
export type Mutation_RootDelete_Contest_Team_CodeArgs = {
  where: Contest_Team_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_Code_By_PkArgs = {
  code_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_MemberArgs = {
  where: Contest_Team_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_Member_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_PlayerArgs = {
  where: Contest_Team_Player_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Team_Player_By_PkArgs = {
  player: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contest_TimeArgs = {
  where: Contest_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contest_Time_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_DepartmentArgs = {
  where: Department_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Department_By_PkArgs = {
  name: Scalars['String']['input'];
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
export type Mutation_RootInsert_Contest_MapArgs = {
  objects: Array<Contest_Map_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Map_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Map_OneArgs = {
  object: Contest_Map_Insert_Input;
  on_conflict?: InputMaybe<Contest_Map_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_NoticeArgs = {
  objects: Array<Contest_Notice_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Notice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Notice_OneArgs = {
  object: Contest_Notice_Insert_Input;
  on_conflict?: InputMaybe<Contest_Notice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_OneArgs = {
  object: Contest_Insert_Input;
  on_conflict?: InputMaybe<Contest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_PlayerArgs = {
  objects: Array<Contest_Player_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Player_OneArgs = {
  object: Contest_Player_Insert_Input;
  on_conflict?: InputMaybe<Contest_Player_On_Conflict>;
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
export type Mutation_RootInsert_Contest_RoundArgs = {
  objects: Array<Contest_Round_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Round_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Round_OneArgs = {
  object: Contest_Round_Insert_Input;
  on_conflict?: InputMaybe<Contest_Round_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_TeamArgs = {
  objects: Array<Contest_Team_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Team_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_CodeArgs = {
  objects: Array<Contest_Team_Code_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Team_Code_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_Code_OneArgs = {
  object: Contest_Team_Code_Insert_Input;
  on_conflict?: InputMaybe<Contest_Team_Code_On_Conflict>;
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
export type Mutation_RootInsert_Contest_Team_PlayerArgs = {
  objects: Array<Contest_Team_Player_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Team_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Team_Player_OneArgs = {
  object: Contest_Team_Player_Insert_Input;
  on_conflict?: InputMaybe<Contest_Team_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_TimeArgs = {
  objects: Array<Contest_Time_Insert_Input>;
  on_conflict?: InputMaybe<Contest_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contest_Time_OneArgs = {
  object: Contest_Time_Insert_Input;
  on_conflict?: InputMaybe<Contest_Time_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DepartmentArgs = {
  objects: Array<Department_Insert_Input>;
  on_conflict?: InputMaybe<Department_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Department_OneArgs = {
  object: Department_Insert_Input;
  on_conflict?: InputMaybe<Department_On_Conflict>;
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
export type Mutation_RootUpdate_Contest_MapArgs = {
  _set?: InputMaybe<Contest_Map_Set_Input>;
  where: Contest_Map_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Map_By_PkArgs = {
  _set?: InputMaybe<Contest_Map_Set_Input>;
  pk_columns: Contest_Map_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_NoticeArgs = {
  _set?: InputMaybe<Contest_Notice_Set_Input>;
  where: Contest_Notice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Notice_By_PkArgs = {
  _set?: InputMaybe<Contest_Notice_Set_Input>;
  pk_columns: Contest_Notice_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_PlayerArgs = {
  _set?: InputMaybe<Contest_Player_Set_Input>;
  where: Contest_Player_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Player_By_PkArgs = {
  _set?: InputMaybe<Contest_Player_Set_Input>;
  pk_columns: Contest_Player_Pk_Columns_Input;
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
  _inc?: InputMaybe<Contest_Room_Team_Inc_Input>;
  _set?: InputMaybe<Contest_Room_Team_Set_Input>;
  where: Contest_Room_Team_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Room_Team_By_PkArgs = {
  _inc?: InputMaybe<Contest_Room_Team_Inc_Input>;
  _set?: InputMaybe<Contest_Room_Team_Set_Input>;
  pk_columns: Contest_Room_Team_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_RoundArgs = {
  _set?: InputMaybe<Contest_Round_Set_Input>;
  where: Contest_Round_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Round_By_PkArgs = {
  _set?: InputMaybe<Contest_Round_Set_Input>;
  pk_columns: Contest_Round_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Contest_Team_CodeArgs = {
  _set?: InputMaybe<Contest_Team_Code_Set_Input>;
  where: Contest_Team_Code_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Team_Code_By_PkArgs = {
  _set?: InputMaybe<Contest_Team_Code_Set_Input>;
  pk_columns: Contest_Team_Code_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Contest_Team_PlayerArgs = {
  _set?: InputMaybe<Contest_Team_Player_Set_Input>;
  where: Contest_Team_Player_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Team_Player_By_PkArgs = {
  _set?: InputMaybe<Contest_Team_Player_Set_Input>;
  pk_columns: Contest_Team_Player_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_TimeArgs = {
  _set?: InputMaybe<Contest_Time_Set_Input>;
  where: Contest_Time_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contest_Time_By_PkArgs = {
  _set?: InputMaybe<Contest_Time_Set_Input>;
  pk_columns: Contest_Time_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DepartmentArgs = {
  _set?: InputMaybe<Department_Set_Input>;
  where: Department_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Department_By_PkArgs = {
  _set?: InputMaybe<Department_Set_Input>;
  pk_columns: Department_Pk_Columns_Input;
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
  /** fetch data from the table: "contest_manager" */
  contest_manager: Array<Contest_Manager>;
  /** fetch aggregated fields from the table: "contest_manager" */
  contest_manager_aggregate: Contest_Manager_Aggregate;
  /** fetch data from the table: "contest_manager" using primary key columns */
  contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** fetch data from the table: "contest_map" */
  contest_map: Array<Contest_Map>;
  /** fetch aggregated fields from the table: "contest_map" */
  contest_map_aggregate: Contest_Map_Aggregate;
  /** fetch data from the table: "contest_map" using primary key columns */
  contest_map_by_pk?: Maybe<Contest_Map>;
  /** fetch data from the table: "contest_notice" */
  contest_notice: Array<Contest_Notice>;
  /** fetch aggregated fields from the table: "contest_notice" */
  contest_notice_aggregate: Contest_Notice_Aggregate;
  /** fetch data from the table: "contest_notice" using primary key columns */
  contest_notice_by_pk?: Maybe<Contest_Notice>;
  /** fetch data from the table: "contest_player" */
  contest_player: Array<Contest_Player>;
  /** fetch aggregated fields from the table: "contest_player" */
  contest_player_aggregate: Contest_Player_Aggregate;
  /** fetch data from the table: "contest_player" using primary key columns */
  contest_player_by_pk?: Maybe<Contest_Player>;
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
  /** fetch data from the table: "contest_round" */
  contest_round: Array<Contest_Round>;
  /** fetch aggregated fields from the table: "contest_round" */
  contest_round_aggregate: Contest_Round_Aggregate;
  /** fetch data from the table: "contest_round" using primary key columns */
  contest_round_by_pk?: Maybe<Contest_Round>;
  /** fetch data from the table: "contest_team" */
  contest_team: Array<Contest_Team>;
  /** fetch aggregated fields from the table: "contest_team" */
  contest_team_aggregate: Contest_Team_Aggregate;
  /** fetch data from the table: "contest_team" using primary key columns */
  contest_team_by_pk?: Maybe<Contest_Team>;
  /** fetch data from the table: "contest_team_code" */
  contest_team_code: Array<Contest_Team_Code>;
  /** fetch aggregated fields from the table: "contest_team_code" */
  contest_team_code_aggregate: Contest_Team_Code_Aggregate;
  /** fetch data from the table: "contest_team_code" using primary key columns */
  contest_team_code_by_pk?: Maybe<Contest_Team_Code>;
  /** fetch data from the table: "contest_team_member" */
  contest_team_member: Array<Contest_Team_Member>;
  /** fetch aggregated fields from the table: "contest_team_member" */
  contest_team_member_aggregate: Contest_Team_Member_Aggregate;
  /** fetch data from the table: "contest_team_member" using primary key columns */
  contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** fetch data from the table: "contest_team_player" */
  contest_team_player: Array<Contest_Team_Player>;
  /** fetch aggregated fields from the table: "contest_team_player" */
  contest_team_player_aggregate: Contest_Team_Player_Aggregate;
  /** fetch data from the table: "contest_team_player" using primary key columns */
  contest_team_player_by_pk?: Maybe<Contest_Team_Player>;
  /** fetch data from the table: "contest_time" */
  contest_time: Array<Contest_Time>;
  /** fetch aggregated fields from the table: "contest_time" */
  contest_time_aggregate: Contest_Time_Aggregate;
  /** fetch data from the table: "contest_time" using primary key columns */
  contest_time_by_pk?: Maybe<Contest_Time>;
  /** fetch data from the table: "department" */
  department: Array<Department>;
  /** fetch aggregated fields from the table: "department" */
  department_aggregate: Department_Aggregate;
  /** fetch data from the table: "department" using primary key columns */
  department_by_pk?: Maybe<Department>;
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
  /** fetch data from the table: "mentor_info" */
  mentor_info: Array<Mentor_Info>;
  /** fetch aggregated fields from the table: "mentor_info" */
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


export type Query_RootContest_MapArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


export type Query_RootContest_Map_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


export type Query_RootContest_Map_By_PkArgs = {
  map_id: Scalars['uuid']['input'];
};


export type Query_RootContest_NoticeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


export type Query_RootContest_Notice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


export type Query_RootContest_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContest_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


export type Query_RootContest_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


export type Query_RootContest_Player_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  player_label: Scalars['String']['input'];
  team_label: Scalars['String']['input'];
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


export type Query_RootContest_RoundArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


export type Query_RootContest_Round_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


export type Query_RootContest_Round_By_PkArgs = {
  round_id: Scalars['uuid']['input'];
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


export type Query_RootContest_Team_CodeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};


export type Query_RootContest_Team_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};


export type Query_RootContest_Team_Code_By_PkArgs = {
  code_id: Scalars['uuid']['input'];
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
  user_uuid: Scalars['uuid']['input'];
};


export type Query_RootContest_Team_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


export type Query_RootContest_Team_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


export type Query_RootContest_Team_Player_By_PkArgs = {
  player: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Query_RootContest_TimeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};


export type Query_RootContest_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};


export type Query_RootContest_Time_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
};


export type Query_RootDepartmentArgs = {
  distinct_on?: InputMaybe<Array<Department_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Department_Order_By>>;
  where?: InputMaybe<Department_Bool_Exp>;
};


export type Query_RootDepartment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Department_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Department_Order_By>>;
  where?: InputMaybe<Department_Bool_Exp>;
};


export type Query_RootDepartment_By_PkArgs = {
  name: Scalars['String']['input'];
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
  /** fetch data from the table: "contest_manager" */
  contest_manager: Array<Contest_Manager>;
  /** fetch aggregated fields from the table: "contest_manager" */
  contest_manager_aggregate: Contest_Manager_Aggregate;
  /** fetch data from the table: "contest_manager" using primary key columns */
  contest_manager_by_pk?: Maybe<Contest_Manager>;
  /** fetch data from the table: "contest_map" */
  contest_map: Array<Contest_Map>;
  /** fetch aggregated fields from the table: "contest_map" */
  contest_map_aggregate: Contest_Map_Aggregate;
  /** fetch data from the table: "contest_map" using primary key columns */
  contest_map_by_pk?: Maybe<Contest_Map>;
  /** fetch data from the table: "contest_notice" */
  contest_notice: Array<Contest_Notice>;
  /** fetch aggregated fields from the table: "contest_notice" */
  contest_notice_aggregate: Contest_Notice_Aggregate;
  /** fetch data from the table: "contest_notice" using primary key columns */
  contest_notice_by_pk?: Maybe<Contest_Notice>;
  /** fetch data from the table: "contest_player" */
  contest_player: Array<Contest_Player>;
  /** fetch aggregated fields from the table: "contest_player" */
  contest_player_aggregate: Contest_Player_Aggregate;
  /** fetch data from the table: "contest_player" using primary key columns */
  contest_player_by_pk?: Maybe<Contest_Player>;
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
  /** fetch data from the table: "contest_round" */
  contest_round: Array<Contest_Round>;
  /** fetch aggregated fields from the table: "contest_round" */
  contest_round_aggregate: Contest_Round_Aggregate;
  /** fetch data from the table: "contest_round" using primary key columns */
  contest_round_by_pk?: Maybe<Contest_Round>;
  /** fetch data from the table: "contest_team" */
  contest_team: Array<Contest_Team>;
  /** fetch aggregated fields from the table: "contest_team" */
  contest_team_aggregate: Contest_Team_Aggregate;
  /** fetch data from the table: "contest_team" using primary key columns */
  contest_team_by_pk?: Maybe<Contest_Team>;
  /** fetch data from the table: "contest_team_code" */
  contest_team_code: Array<Contest_Team_Code>;
  /** fetch aggregated fields from the table: "contest_team_code" */
  contest_team_code_aggregate: Contest_Team_Code_Aggregate;
  /** fetch data from the table: "contest_team_code" using primary key columns */
  contest_team_code_by_pk?: Maybe<Contest_Team_Code>;
  /** fetch data from the table: "contest_team_member" */
  contest_team_member: Array<Contest_Team_Member>;
  /** fetch aggregated fields from the table: "contest_team_member" */
  contest_team_member_aggregate: Contest_Team_Member_Aggregate;
  /** fetch data from the table: "contest_team_member" using primary key columns */
  contest_team_member_by_pk?: Maybe<Contest_Team_Member>;
  /** fetch data from the table: "contest_team_player" */
  contest_team_player: Array<Contest_Team_Player>;
  /** fetch aggregated fields from the table: "contest_team_player" */
  contest_team_player_aggregate: Contest_Team_Player_Aggregate;
  /** fetch data from the table: "contest_team_player" using primary key columns */
  contest_team_player_by_pk?: Maybe<Contest_Team_Player>;
  /** fetch data from the table: "contest_time" */
  contest_time: Array<Contest_Time>;
  /** fetch aggregated fields from the table: "contest_time" */
  contest_time_aggregate: Contest_Time_Aggregate;
  /** fetch data from the table: "contest_time" using primary key columns */
  contest_time_by_pk?: Maybe<Contest_Time>;
  /** fetch data from the table: "department" */
  department: Array<Department>;
  /** fetch aggregated fields from the table: "department" */
  department_aggregate: Department_Aggregate;
  /** fetch data from the table: "department" using primary key columns */
  department_by_pk?: Maybe<Department>;
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
  /** fetch data from the table: "mentor_info" */
  mentor_info: Array<Mentor_Info>;
  /** fetch aggregated fields from the table: "mentor_info" */
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


export type Subscription_RootContest_MapArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


export type Subscription_RootContest_Map_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Map_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Map_Order_By>>;
  where?: InputMaybe<Contest_Map_Bool_Exp>;
};


export type Subscription_RootContest_Map_By_PkArgs = {
  map_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_NoticeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


export type Subscription_RootContest_Notice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Notice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Notice_Order_By>>;
  where?: InputMaybe<Contest_Notice_Bool_Exp>;
};


export type Subscription_RootContest_Notice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


export type Subscription_RootContest_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Player_Order_By>>;
  where?: InputMaybe<Contest_Player_Bool_Exp>;
};


export type Subscription_RootContest_Player_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  player_label: Scalars['String']['input'];
  team_label: Scalars['String']['input'];
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


export type Subscription_RootContest_RoundArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


export type Subscription_RootContest_Round_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Round_Order_By>>;
  where?: InputMaybe<Contest_Round_Bool_Exp>;
};


export type Subscription_RootContest_Round_By_PkArgs = {
  round_id: Scalars['uuid']['input'];
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


export type Subscription_RootContest_Team_CodeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};


export type Subscription_RootContest_Team_Code_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Code_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Code_Order_By>>;
  where?: InputMaybe<Contest_Team_Code_Bool_Exp>;
};


export type Subscription_RootContest_Team_Code_By_PkArgs = {
  code_id: Scalars['uuid']['input'];
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
  user_uuid: Scalars['uuid']['input'];
};


export type Subscription_RootContest_Team_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


export type Subscription_RootContest_Team_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Team_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Team_Player_Order_By>>;
  where?: InputMaybe<Contest_Team_Player_Bool_Exp>;
};


export type Subscription_RootContest_Team_Player_By_PkArgs = {
  player: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootContest_TimeArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};


export type Subscription_RootContest_Time_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contest_Time_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contest_Time_Order_By>>;
  where?: InputMaybe<Contest_Time_Bool_Exp>;
};


export type Subscription_RootContest_Time_By_PkArgs = {
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
};


export type Subscription_RootDepartmentArgs = {
  distinct_on?: InputMaybe<Array<Department_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Department_Order_By>>;
  where?: InputMaybe<Department_Bool_Exp>;
};


export type Subscription_RootDepartment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Department_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Department_Order_By>>;
  where?: InputMaybe<Department_Bool_Exp>;
};


export type Subscription_RootDepartment_By_PkArgs = {
  name: Scalars['String']['input'];
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
  email?: Maybe<Scalars['String']['output']>;
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
  date?: Maybe<Scalars['date']['output']>;
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
  date?: InputMaybe<Date_Comparison_Exp>;
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
  date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Scalars['json']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Weekly_Max_Fields = {
  __typename?: 'weekly_max_fields';
  date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Weekly_Min_Fields = {
  __typename?: 'weekly_min_fields';
  date?: Maybe<Scalars['date']['output']>;
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
  date?: InputMaybe<Order_By>;
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
  Date = 'date',
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
  date?: InputMaybe<Scalars['date']['input']>;
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
  Date = 'date',
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

export type GetCodeUpdateTimeSubscriptionVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetCodeUpdateTimeSubscription = { __typename?: 'subscription_root', contest_code: Array<{ __typename?: 'contest_code', code1_update_time?: any | null, code2_update_time?: any | null, code3_update_time?: any | null, code4_update_time?: any | null, code5_update_time?: any | null, code6_update_time?: any | null }> };

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

export type DeleteContestMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type DeleteContestMutation = { __typename?: 'mutation_root', delete_contest_by_pk?: { __typename?: 'contest', id: any } | null };

export type UpdateContestInfoMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  fullname: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['timestamptz']['input'];
  end_date: Scalars['timestamptz']['input'];
}>;


export type UpdateContestInfoMutation = { __typename?: 'mutation_root', update_contest_by_pk?: { __typename?: 'contest', id: any } | null };

export type UpdateContestSwitchMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_switch: Scalars['Boolean']['input'];
  code_upload_switch: Scalars['Boolean']['input'];
  arena_switch: Scalars['Boolean']['input'];
  playground_switch: Scalars['Boolean']['input'];
  stream_switch: Scalars['Boolean']['input'];
  playback_switch: Scalars['Boolean']['input'];
}>;


export type UpdateContestSwitchMutation = { __typename?: 'mutation_root', update_contest_by_pk?: { __typename?: 'contest', id: any } | null };

export type GetContestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContestsQuery = { __typename?: 'query_root', contest: Array<{ __typename?: 'contest', fullname: string, description?: string | null, end_date: any, id: any, start_date: any, contest_type: string }> };

export type GetContestInfoQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestInfoQuery = { __typename?: 'query_root', contest_by_pk?: { __typename?: 'contest', fullname: string, name: string, description?: string | null, start_date: any, end_date: any, status: string } | null };

export type GetContestNameQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestNameQuery = { __typename?: 'query_root', contest_by_pk?: { __typename?: 'contest', name: string } | null };

export type GetContestSwitchQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestSwitchQuery = { __typename?: 'query_root', contest_by_pk?: { __typename?: 'contest', code_upload_switch: boolean, team_switch: boolean, arena_switch: boolean, playground_switch: boolean, stream_switch: boolean, playback_switch: boolean } | null };

export type GetContestManagersQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestManagersQuery = { __typename?: 'query_root', contest_by_pk?: { __typename?: 'contest', contest_managers: Array<{ __typename?: 'contest_manager', user_uuid: any }> } | null };

export type AddContestMapMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  team_labels: Scalars['String']['input'];
}>;


export type AddContestMapMutation = { __typename?: 'mutation_root', insert_contest_map_one?: { __typename?: 'contest_map', map_id: any } | null };

export type DeleteContestMapMutationVariables = Exact<{
  map_id: Scalars['uuid']['input'];
}>;


export type DeleteContestMapMutation = { __typename?: 'mutation_root', delete_contest_map_by_pk?: { __typename?: 'contest_map', map_id: any } | null };

export type UpdateContestMapMutationVariables = Exact<{
  map_id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  team_labels: Scalars['String']['input'];
}>;


export type UpdateContestMapMutation = { __typename?: 'mutation_root', update_contest_map_by_pk?: { __typename?: 'contest_map', map_id: any } | null };

export type GetContestMapsQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestMapsQuery = { __typename?: 'query_root', contest_map: Array<{ __typename?: 'contest_map', map_id: any, name: string, filename: string, team_labels: string }> };

export type AddContestNoticeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
  contest_id: Scalars['uuid']['input'];
}>;


export type AddContestNoticeMutation = { __typename?: 'mutation_root', insert_contest_notice_one?: { __typename?: 'contest_notice', id: any } | null };

export type DeleteContestNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteContestNoticeMutation = { __typename?: 'mutation_root', delete_contest_notice_by_pk?: { __typename?: 'contest_notice', id: any } | null };

export type UpdateContestNoticeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  files?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContestNoticeMutation = { __typename?: 'mutation_root', update_contest_notice_by_pk?: { __typename?: 'contest_notice', id: any } | null };

export type GetContestNoticesQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestNoticesQuery = { __typename?: 'query_root', contest_notice: Array<{ __typename?: 'contest_notice', content: string, created_at: any, updated_at: any, files?: string | null, id: any, title: string }> };

export type AddContestPlayerMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_label: Scalars['String']['input'];
  player_label: Scalars['String']['input'];
  roles_available: Scalars['String']['input'];
}>;


export type AddContestPlayerMutation = { __typename?: 'mutation_root', insert_contest_player_one?: { __typename?: 'contest_player', team_label: string } | null };

export type DeleteContestPlayerMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_label: Scalars['String']['input'];
  player_label: Scalars['String']['input'];
}>;


export type DeleteContestPlayerMutation = { __typename?: 'mutation_root', delete_contest_player_by_pk?: { __typename?: 'contest_player', team_label: string } | null };

export type UpdateContestPlayerMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team_label: Scalars['String']['input'];
  player_label: Scalars['String']['input'];
  roles_available: Scalars['String']['input'];
}>;


export type UpdateContestPlayerMutation = { __typename?: 'mutation_root', update_contest_player_by_pk?: { __typename?: 'contest_player', team_label: string } | null };

export type GetContestPlayersQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestPlayersQuery = { __typename?: 'query_root', contest_player: Array<{ __typename?: 'contest_player', team_label: string, player_label: string, roles_available: string }> };

export type GetArenaRoomsSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetArenaRoomsSubscription = { __typename?: 'subscription_root', contest_room: Array<{ __typename?: 'contest_room', room_id: any, status: string, port?: number | null, created_at: any, contest_room_teams: Array<{ __typename?: 'contest_room_team', score?: number | null, team_label?: string | null, player_roles?: string | null, contest_team: { __typename?: 'contest_team', team_name: string, team_leader: { __typename?: 'users', realname?: string | null } } }> }> };

export type GetRunningArenaRoomsQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetRunningArenaRoomsQuery = { __typename?: 'query_root', contest_room: Array<{ __typename?: 'contest_room', status: string, created_at: any, contest_room_teams: Array<{ __typename?: 'contest_room_team', contest_team: { __typename?: 'contest_team', team_id: any } }> }> };

export type GetCompetitionRoomsSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  round_id: Scalars['uuid']['input'];
}>;


export type GetCompetitionRoomsSubscription = { __typename?: 'subscription_root', contest_room: Array<{ __typename?: 'contest_room', room_id: any, status: string, port?: number | null, created_at: any, contest_room_teams: Array<{ __typename?: 'contest_room_team', score?: number | null, team_label?: string | null, player_roles?: string | null, contest_team: { __typename?: 'contest_team', team_name: string, team_leader: { __typename?: 'users', realname?: string | null } } }> }> };

export type GetRoomInfoSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetRoomInfoSubscription = { __typename?: 'subscription_root', contest_room: Array<{ __typename?: 'contest_room', created_at: any, result?: string | null, room_id: any, status: string, port?: number | null, contest_room_teams: Array<{ __typename?: 'contest_room_team', contest_team: { __typename?: 'contest_team', team_name: string, team_id: any, score?: string | null } }> }> };

export type GetRoomInfo_StatusQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetRoomInfo_StatusQuery = { __typename?: 'query_root', contest_room: Array<{ __typename?: 'contest_room', room_id: any, status: string, created_at: any }> };

export type InsertRoomMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  team1_id: Scalars['uuid']['input'];
  team2_id: Scalars['uuid']['input'];
  created_at: Scalars['timestamptz']['input'];
}>;


export type InsertRoomMutation = { __typename?: 'mutation_root', insert_contest_room_one?: { __typename?: 'contest_room', room_id: any } | null };

export type AddContestRoundMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
  map_id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type AddContestRoundMutation = { __typename?: 'mutation_root', insert_contest_round_one?: { __typename?: 'contest_round', round_id: any } | null };

export type DeleteContestRoundMutationVariables = Exact<{
  round_id: Scalars['uuid']['input'];
}>;


export type DeleteContestRoundMutation = { __typename?: 'mutation_root', delete_contest_round_by_pk?: { __typename?: 'contest_round', round_id: any } | null };

export type UpdateContestRoundNameMutationVariables = Exact<{
  round_id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateContestRoundNameMutation = { __typename?: 'mutation_root', update_contest_round_by_pk?: { __typename?: 'contest_round', round_id: any } | null };

export type GetContestRoundsQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestRoundsQuery = { __typename?: 'query_root', contest_round: Array<{ __typename?: 'contest_round', round_id: any, name: string, map_id?: any | null }> };

export type AddTeamMutationVariables = Exact<{
  team_name: Scalars['String']['input'];
  team_intro?: InputMaybe<Scalars['String']['input']>;
  team_leader_uuid: Scalars['uuid']['input'];
  invited_code: Scalars['String']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type AddTeamMutation = { __typename?: 'mutation_root', insert_contest_team_one?: { __typename?: 'contest_team', team_id: any } | null };

export type AddTeamMemberMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  user_uuid: Scalars['uuid']['input'];
}>;


export type AddTeamMemberMutation = { __typename?: 'mutation_root', insert_contest_team_member_one?: { __typename?: 'contest_team_member', team_id: any } | null };

export type DeleteTeamMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'mutation_root', delete_contest_team_by_pk?: { __typename?: 'contest_team', team_id: any } | null };

export type DeleteTeamMemberMutationVariables = Exact<{
  user_uuid: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
}>;


export type DeleteTeamMemberMutation = { __typename?: 'mutation_root', delete_contest_team_member_by_pk?: { __typename?: 'contest_team_member', team_id: any } | null };

export type UpdateTeamMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  team_name: Scalars['String']['input'];
  team_intro: Scalars['String']['input'];
}>;


export type UpdateTeamMutation = { __typename?: 'mutation_root', update_contest_team_by_pk?: { __typename?: 'contest_team', team_id: any } | null };

export type GetTeamQueryVariables = Exact<{
  user_uuid: Scalars['uuid']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type GetTeamQuery = { __typename?: 'query_root', contest_team_member: Array<{ __typename?: 'contest_team_member', contest_team: { __typename?: 'contest_team', team_id: any } }> };

export type GetTeamInfoQueryVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetTeamInfoQuery = { __typename?: 'query_root', contest_team_by_pk?: { __typename?: 'contest_team', team_name: string, team_intro?: string | null, invited_code: string, team_leader: { __typename?: 'users', uuid: any, realname?: string | null }, contest_team_members: Array<{ __typename?: 'contest_team_member', user: { __typename?: 'users', uuid: any, realname?: string | null, student_no?: string | null } }> } | null };

export type GetTeamInfoByInvitedCodeQueryVariables = Exact<{
  invited_code: Scalars['String']['input'];
  contest_id: Scalars['uuid']['input'];
}>;


export type GetTeamInfoByInvitedCodeQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_id: any, team_name: string, team_intro?: string | null, team_leader: { __typename?: 'users', realname?: string | null } }> };

export type GetTeamStatQueryVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetTeamStatQuery = { __typename?: 'query_root', contest_team_by_pk?: { __typename?: 'contest_team', contest_team_codes_aggregate: { __typename?: 'contest_team_code_aggregate', aggregate?: { __typename?: 'contest_team_code_aggregate_fields', count: number } | null }, contest_team_rooms_aggregate: { __typename?: 'contest_room_team_aggregate', aggregate?: { __typename?: 'contest_room_team_aggregate_fields', count: number, sum?: { __typename?: 'contest_room_team_sum_fields', score?: number | null } | null } | null } } | null };

export type GetTotalTeamNumQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetTotalTeamNumQuery = { __typename?: 'query_root', contest_team_aggregate: { __typename?: 'contest_team_aggregate', aggregate?: { __typename?: 'contest_team_aggregate_fields', count: number } | null } };

export type GetTotalMemberNumQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetTotalMemberNumQuery = { __typename?: 'query_root', contest_team_member_aggregate: { __typename?: 'contest_team_member_aggregate', aggregate?: { __typename?: 'contest_team_member_aggregate_fields', count: number } | null } };

export type GetTeamsQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetTeamsQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_id: any, team_name: string, team_intro?: string | null, team_leader: { __typename?: 'users', realname?: string | null, student_no?: string | null, class?: string | null }, contest_team_members: Array<{ __typename?: 'contest_team_member', user: { __typename?: 'users', realname?: string | null, student_no?: string | null, class?: string | null } }>, contest_team_codes_aggregate: { __typename?: 'contest_team_code_aggregate', aggregate?: { __typename?: 'contest_team_code_aggregate_fields', count: number } | null }, contest_team_rooms_aggregate: { __typename?: 'contest_room_team_aggregate', aggregate?: { __typename?: 'contest_room_team_aggregate_fields', count: number, sum?: { __typename?: 'contest_room_team_sum_fields', score?: number | null } | null } | null } }> };

export type GetAllTeamInfoSubscriptionVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfoSubscription = { __typename?: 'subscription_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, created_at: any, invited_code: string, member_num: number, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any, submitted_code_num: number, team_intro?: string | null, contest: { __typename?: 'contest', name: string }, team_leader: { __typename?: 'users', uuid: any, class?: string | null, email?: string | null, realname?: string | null, phone?: string | null }, contest_team_members: Array<{ __typename?: 'contest_team_member', user: { __typename?: 'users', id?: string | null, class?: string | null, email?: string | null, realname?: string | null, phone?: string | null } }> }> };

export type GetAllTeamInfo_ScoreQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfo_ScoreQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, created_at: any, invited_code: string, member_num: number, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any, submitted_code_num: number, team_intro?: string | null, contest: { __typename?: 'contest', name: string }, team_leader: { __typename?: 'users', uuid: any, class?: string | null, email?: string | null, realname?: string | null, phone?: string | null }, contest_team_members: Array<{ __typename?: 'contest_team_member', user: { __typename?: 'users', id?: string | null, class?: string | null, email?: string | null, realname?: string | null, phone?: string | null } }> }> };

export type GetAllTeamInfo_CompileQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetAllTeamInfo_CompileQuery = { __typename?: 'query_root', contest_team: Array<{ __typename?: 'contest_team', team_name: string, score?: string | null, status?: string | null, status2?: string | null, contest_score?: string | null, team_id: any }> };

export type AddTeamCodeMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  code_name: Scalars['String']['input'];
  language: Scalars['String']['input'];
  compile_status?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddTeamCodeMutation = { __typename?: 'mutation_root', insert_contest_team_code_one?: { __typename?: 'contest_team_code', code_id: any } | null };

export type DeleteTeamCodeMutationVariables = Exact<{
  code_id: Scalars['uuid']['input'];
}>;


export type DeleteTeamCodeMutation = { __typename?: 'mutation_root', delete_contest_team_code_by_pk?: { __typename?: 'contest_team_code', code_id: any } | null };

export type UpdateTeamCodeNameMutationVariables = Exact<{
  code_id: Scalars['uuid']['input'];
  code_name: Scalars['String']['input'];
}>;


export type UpdateTeamCodeNameMutation = { __typename?: 'mutation_root', update_contest_team_code_by_pk?: { __typename?: 'contest_team_code', code_id: any } | null };

export type GetTeamCodesSubscriptionVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetTeamCodesSubscription = { __typename?: 'subscription_root', contest_team_code: Array<{ __typename?: 'contest_team_code', code_id: any, code_name: string, language: string, compile_status: string, created_at: any }> };

export type AddTeamPlayerMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  player: Scalars['String']['input'];
}>;


export type AddTeamPlayerMutation = { __typename?: 'mutation_root', insert_contest_team_player_one?: { __typename?: 'contest_team_player', player: string } | null };

export type UpdateTeamPlayerMutationVariables = Exact<{
  team_id: Scalars['uuid']['input'];
  player: Scalars['String']['input'];
  code_id: Scalars['uuid']['input'];
  role: Scalars['String']['input'];
}>;


export type UpdateTeamPlayerMutation = { __typename?: 'mutation_root', update_contest_team_player_by_pk?: { __typename?: 'contest_team_player', player: string } | null };

export type GetTeamPlayersSubscriptionVariables = Exact<{
  team_id: Scalars['uuid']['input'];
}>;


export type GetTeamPlayersSubscription = { __typename?: 'subscription_root', contest_team_player: Array<{ __typename?: 'contest_team_player', player: string, role?: string | null, player_code?: { __typename?: 'contest_team_code', code_id: any, code_name: string, language: string, created_at: any } | null }> };

export type AddContestTimeMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
  start: Scalars['timestamptz']['input'];
  end: Scalars['timestamptz']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddContestTimeMutation = { __typename?: 'mutation_root', insert_contest_time_one?: { __typename?: 'contest_time', event: string } | null };

export type DeleteContestTimeMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
}>;


export type DeleteContestTimeMutation = { __typename?: 'mutation_root', delete_contest_time_by_pk?: { __typename?: 'contest_time', event: string } | null };

export type UpdateContestTimeMutationVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
  event: Scalars['String']['input'];
  start: Scalars['timestamptz']['input'];
  end: Scalars['timestamptz']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContestTimeMutation = { __typename?: 'mutation_root', update_contest_time_by_pk?: { __typename?: 'contest_time', event: string } | null };

export type GetContestTimesQueryVariables = Exact<{
  contest_id: Scalars['uuid']['input'];
}>;


export type GetContestTimesQuery = { __typename?: 'query_root', contest_time: Array<{ __typename?: 'contest_time', event: string, start: any, end: any, description?: string | null }> };

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
  uuid: Scalars['uuid']['input'];
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetHonorApplicationsQuery = { __typename?: 'query_root', honor_application: Array<{ __typename?: 'honor_application', id: any, honor: string, statement: string, attachment_url?: string | null, status: string, created_at: any, updated_at: any }> };

export type GetHonorApplicationsForCounselorsQueryVariables = Exact<{
  _gte: Scalars['timestamptz']['input'];
}>;


export type GetHonorApplicationsForCounselorsQuery = { __typename?: 'query_root', honor_application: Array<{ __typename?: 'honor_application', id: any, honor: string, statement: string, attachment_url?: string | null, status: string, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', uuid: any, realname?: string | null, class?: string | null } | null }> };

export type AddHonorApplicationMutationVariables = Exact<{
  student_uuid: Scalars['uuid']['input'];
  honor: Scalars['String']['input'];
  statement: Scalars['String']['input'];
  attachment_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddHonorApplicationMutation = { __typename?: 'mutation_root', insert_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type UpdateHonorApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  honor: Scalars['String']['input'];
  statement: Scalars['String']['input'];
  attachment_url?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateHonorApplicationMutation = { __typename?: 'mutation_root', update_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type DeleteHonorApplicationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteHonorApplicationMutation = { __typename?: 'mutation_root', delete_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any }> } | null };

export type UpdateHonorApplicationStatusMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateHonorApplicationStatusMutation = { __typename?: 'mutation_root', update_honor_application?: { __typename?: 'honor_application_mutation_response', returning: Array<{ __typename?: 'honor_application', id: any, status: string }> } | null };

export type GetMentorApplicationsQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetMentorApplicationsQuery = { __typename?: 'query_root', mentor_application: Array<{ __typename?: 'mentor_application', id: any, statement: string, status: string, chat_status: boolean, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, email?: string | null, phone?: string | null } | null, mentor_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, mentor_available?: { __typename?: 'mentor_available', available: boolean } | null } | null }> };

export type GetMentorApplicationsForCounselorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMentorApplicationsForCounselorsQuery = { __typename?: 'query_root', mentor_application: Array<{ __typename?: 'mentor_application', id: any, statement: string, status: string, created_at: any, updated_at: any, student_byuuid?: { __typename?: 'users', uuid: any, realname?: string | null, class?: string | null, department?: string | null, email?: string | null, phone?: string | null } | null, mentor_byuuid?: { __typename?: 'users', realname?: string | null, department?: string | null, mentor_available?: { __typename?: 'mentor_available', available: boolean } | null } | null }> };

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


export type GetMentorInfoQuery = { __typename?: 'query_root', mentor_info_by_pk?: { __typename?: 'mentor_info', achievement?: string | null, background?: string | null, field?: string | null, intro?: string | null, mentor_uuid: any, userByMentorUuid: { __typename?: 'users', realname?: string | null, email?: string | null } } | null };

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

export type GetCourseQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCourseQuery = { __typename?: 'query_root', share_course: Array<{ __typename?: 'share_course', code: string, fullname: string, language: string, name: string, professor: string, semester: string, type: string, uuid: any, year: number }> };

export type GetWeeklyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeeklyQuery = { __typename?: 'query_root', weekly: Array<{ __typename?: 'weekly', id: number, title: string, url: string }> };

export type GetProfileQueryVariables = Exact<{
  uuid: Scalars['uuid']['input'];
}>;


export type GetProfileQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', username?: string | null, realname?: string | null, email?: string | null, phone?: string | null, student_no?: string | null, department?: string | null, class?: string | null, created_at: any, updated_at: any, tsinghua_email?: string | null, github_id?: string | null } | null };

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

export type GetDepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDepartmentsQuery = { __typename?: 'query_root', department: Array<{ __typename?: 'department', name: string }> };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any }> };

export type GetUserByPhoneQueryVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type GetUserByPhoneQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any }> };

export type GetUser_IdQueryVariables = Exact<{
  email: Scalars['String']['input'];
  realname: Scalars['String']['input'];
}>;


export type GetUser_IdQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', uuid: any }> };


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
export const DeleteContestDocument = gql`
    mutation DeleteContest($contest_id: uuid!) {
  delete_contest_by_pk(id: $contest_id) {
    id
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
 *      contest_id: // value for 'contest_id'
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
export const UpdateContestInfoDocument = gql`
    mutation UpdateContestInfo($contest_id: uuid!, $fullname: String!, $description: String, $start_date: timestamptz!, $end_date: timestamptz!) {
  update_contest_by_pk(
    pk_columns: {id: $contest_id}
    _set: {fullname: $fullname, description: $description, start_date: $start_date, end_date: $end_date}
  ) {
    id
  }
}
    `;
export type UpdateContestInfoMutationFn = Apollo.MutationFunction<UpdateContestInfoMutation, UpdateContestInfoMutationVariables>;

/**
 * __useUpdateContestInfoMutation__
 *
 * To run a mutation, you first call `useUpdateContestInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestInfoMutation, { data, loading, error }] = useUpdateContestInfoMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      fullname: // value for 'fullname'
 *      description: // value for 'description'
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *   },
 * });
 */
export function useUpdateContestInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestInfoMutation, UpdateContestInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestInfoMutation, UpdateContestInfoMutationVariables>(UpdateContestInfoDocument, options);
      }
export type UpdateContestInfoMutationHookResult = ReturnType<typeof useUpdateContestInfoMutation>;
export type UpdateContestInfoMutationResult = Apollo.MutationResult<UpdateContestInfoMutation>;
export type UpdateContestInfoMutationOptions = Apollo.BaseMutationOptions<UpdateContestInfoMutation, UpdateContestInfoMutationVariables>;
export const UpdateContestSwitchDocument = gql`
    mutation UpdateContestSwitch($contest_id: uuid!, $team_switch: Boolean!, $code_upload_switch: Boolean!, $arena_switch: Boolean!, $playground_switch: Boolean!, $stream_switch: Boolean!, $playback_switch: Boolean!) {
  update_contest_by_pk(
    pk_columns: {id: $contest_id}
    _set: {team_switch: $team_switch, code_upload_switch: $code_upload_switch, arena_switch: $arena_switch, playground_switch: $playground_switch, stream_switch: $stream_switch, playback_switch: $playback_switch}
  ) {
    id
  }
}
    `;
export type UpdateContestSwitchMutationFn = Apollo.MutationFunction<UpdateContestSwitchMutation, UpdateContestSwitchMutationVariables>;

/**
 * __useUpdateContestSwitchMutation__
 *
 * To run a mutation, you first call `useUpdateContestSwitchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestSwitchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestSwitchMutation, { data, loading, error }] = useUpdateContestSwitchMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_switch: // value for 'team_switch'
 *      code_upload_switch: // value for 'code_upload_switch'
 *      arena_switch: // value for 'arena_switch'
 *      playground_switch: // value for 'playground_switch'
 *      stream_switch: // value for 'stream_switch'
 *      playback_switch: // value for 'playback_switch'
 *   },
 * });
 */
export function useUpdateContestSwitchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestSwitchMutation, UpdateContestSwitchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestSwitchMutation, UpdateContestSwitchMutationVariables>(UpdateContestSwitchDocument, options);
      }
export type UpdateContestSwitchMutationHookResult = ReturnType<typeof useUpdateContestSwitchMutation>;
export type UpdateContestSwitchMutationResult = Apollo.MutationResult<UpdateContestSwitchMutation>;
export type UpdateContestSwitchMutationOptions = Apollo.BaseMutationOptions<UpdateContestSwitchMutation, UpdateContestSwitchMutationVariables>;
export const GetContestsDocument = gql`
    query GetContests {
  contest(order_by: {start_date: desc}) {
    fullname
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
export const GetContestInfoDocument = gql`
    query GetContestInfo($contest_id: uuid!) {
  contest_by_pk(id: $contest_id) {
    fullname
    name
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
export const GetContestNameDocument = gql`
    query GetContestName($contest_id: uuid!) {
  contest_by_pk(id: $contest_id) {
    name
  }
}
    `;

/**
 * __useGetContestNameQuery__
 *
 * To run a query within a React component, call `useGetContestNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestNameQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestNameQuery(baseOptions: Apollo.QueryHookOptions<GetContestNameQuery, GetContestNameQueryVariables> & ({ variables: GetContestNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestNameQuery, GetContestNameQueryVariables>(GetContestNameDocument, options);
      }
export function useGetContestNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestNameQuery, GetContestNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestNameQuery, GetContestNameQueryVariables>(GetContestNameDocument, options);
        }
export function useGetContestNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestNameQuery, GetContestNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestNameQuery, GetContestNameQueryVariables>(GetContestNameDocument, options);
        }
export type GetContestNameQueryHookResult = ReturnType<typeof useGetContestNameQuery>;
export type GetContestNameLazyQueryHookResult = ReturnType<typeof useGetContestNameLazyQuery>;
export type GetContestNameSuspenseQueryHookResult = ReturnType<typeof useGetContestNameSuspenseQuery>;
export type GetContestNameQueryResult = Apollo.QueryResult<GetContestNameQuery, GetContestNameQueryVariables>;
export const GetContestSwitchDocument = gql`
    query GetContestSwitch($contest_id: uuid!) {
  contest_by_pk(id: $contest_id) {
    code_upload_switch
    team_switch
    arena_switch
    playground_switch
    stream_switch
    playback_switch
  }
}
    `;

/**
 * __useGetContestSwitchQuery__
 *
 * To run a query within a React component, call `useGetContestSwitchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestSwitchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestSwitchQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestSwitchQuery(baseOptions: Apollo.QueryHookOptions<GetContestSwitchQuery, GetContestSwitchQueryVariables> & ({ variables: GetContestSwitchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestSwitchQuery, GetContestSwitchQueryVariables>(GetContestSwitchDocument, options);
      }
export function useGetContestSwitchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestSwitchQuery, GetContestSwitchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestSwitchQuery, GetContestSwitchQueryVariables>(GetContestSwitchDocument, options);
        }
export function useGetContestSwitchSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestSwitchQuery, GetContestSwitchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestSwitchQuery, GetContestSwitchQueryVariables>(GetContestSwitchDocument, options);
        }
export type GetContestSwitchQueryHookResult = ReturnType<typeof useGetContestSwitchQuery>;
export type GetContestSwitchLazyQueryHookResult = ReturnType<typeof useGetContestSwitchLazyQuery>;
export type GetContestSwitchSuspenseQueryHookResult = ReturnType<typeof useGetContestSwitchSuspenseQuery>;
export type GetContestSwitchQueryResult = Apollo.QueryResult<GetContestSwitchQuery, GetContestSwitchQueryVariables>;
export const GetContestManagersDocument = gql`
    query GetContestManagers($contest_id: uuid!) {
  contest_by_pk(id: $contest_id) {
    contest_managers {
      user_uuid
    }
  }
}
    `;

/**
 * __useGetContestManagersQuery__
 *
 * To run a query within a React component, call `useGetContestManagersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestManagersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestManagersQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestManagersQuery(baseOptions: Apollo.QueryHookOptions<GetContestManagersQuery, GetContestManagersQueryVariables> & ({ variables: GetContestManagersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestManagersQuery, GetContestManagersQueryVariables>(GetContestManagersDocument, options);
      }
export function useGetContestManagersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestManagersQuery, GetContestManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestManagersQuery, GetContestManagersQueryVariables>(GetContestManagersDocument, options);
        }
export function useGetContestManagersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestManagersQuery, GetContestManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestManagersQuery, GetContestManagersQueryVariables>(GetContestManagersDocument, options);
        }
export type GetContestManagersQueryHookResult = ReturnType<typeof useGetContestManagersQuery>;
export type GetContestManagersLazyQueryHookResult = ReturnType<typeof useGetContestManagersLazyQuery>;
export type GetContestManagersSuspenseQueryHookResult = ReturnType<typeof useGetContestManagersSuspenseQuery>;
export type GetContestManagersQueryResult = Apollo.QueryResult<GetContestManagersQuery, GetContestManagersQueryVariables>;
export const AddContestMapDocument = gql`
    mutation AddContestMap($contest_id: uuid!, $name: String!, $filename: String!, $team_labels: String!) {
  insert_contest_map_one(
    object: {contest_id: $contest_id, name: $name, filename: $filename, team_labels: $team_labels}
  ) {
    map_id
  }
}
    `;
export type AddContestMapMutationFn = Apollo.MutationFunction<AddContestMapMutation, AddContestMapMutationVariables>;

/**
 * __useAddContestMapMutation__
 *
 * To run a mutation, you first call `useAddContestMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestMapMutation, { data, loading, error }] = useAddContestMapMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      name: // value for 'name'
 *      filename: // value for 'filename'
 *      team_labels: // value for 'team_labels'
 *   },
 * });
 */
export function useAddContestMapMutation(baseOptions?: Apollo.MutationHookOptions<AddContestMapMutation, AddContestMapMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestMapMutation, AddContestMapMutationVariables>(AddContestMapDocument, options);
      }
export type AddContestMapMutationHookResult = ReturnType<typeof useAddContestMapMutation>;
export type AddContestMapMutationResult = Apollo.MutationResult<AddContestMapMutation>;
export type AddContestMapMutationOptions = Apollo.BaseMutationOptions<AddContestMapMutation, AddContestMapMutationVariables>;
export const DeleteContestMapDocument = gql`
    mutation DeleteContestMap($map_id: uuid!) {
  delete_contest_map_by_pk(map_id: $map_id) {
    map_id
  }
}
    `;
export type DeleteContestMapMutationFn = Apollo.MutationFunction<DeleteContestMapMutation, DeleteContestMapMutationVariables>;

/**
 * __useDeleteContestMapMutation__
 *
 * To run a mutation, you first call `useDeleteContestMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestMapMutation, { data, loading, error }] = useDeleteContestMapMutation({
 *   variables: {
 *      map_id: // value for 'map_id'
 *   },
 * });
 */
export function useDeleteContestMapMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestMapMutation, DeleteContestMapMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestMapMutation, DeleteContestMapMutationVariables>(DeleteContestMapDocument, options);
      }
export type DeleteContestMapMutationHookResult = ReturnType<typeof useDeleteContestMapMutation>;
export type DeleteContestMapMutationResult = Apollo.MutationResult<DeleteContestMapMutation>;
export type DeleteContestMapMutationOptions = Apollo.BaseMutationOptions<DeleteContestMapMutation, DeleteContestMapMutationVariables>;
export const UpdateContestMapDocument = gql`
    mutation UpdateContestMap($map_id: uuid!, $name: String!, $filename: String!, $team_labels: String!) {
  update_contest_map_by_pk(
    pk_columns: {map_id: $map_id}
    _set: {name: $name, filename: $filename, team_labels: $team_labels}
  ) {
    map_id
  }
}
    `;
export type UpdateContestMapMutationFn = Apollo.MutationFunction<UpdateContestMapMutation, UpdateContestMapMutationVariables>;

/**
 * __useUpdateContestMapMutation__
 *
 * To run a mutation, you first call `useUpdateContestMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestMapMutation, { data, loading, error }] = useUpdateContestMapMutation({
 *   variables: {
 *      map_id: // value for 'map_id'
 *      name: // value for 'name'
 *      filename: // value for 'filename'
 *      team_labels: // value for 'team_labels'
 *   },
 * });
 */
export function useUpdateContestMapMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestMapMutation, UpdateContestMapMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestMapMutation, UpdateContestMapMutationVariables>(UpdateContestMapDocument, options);
      }
export type UpdateContestMapMutationHookResult = ReturnType<typeof useUpdateContestMapMutation>;
export type UpdateContestMapMutationResult = Apollo.MutationResult<UpdateContestMapMutation>;
export type UpdateContestMapMutationOptions = Apollo.BaseMutationOptions<UpdateContestMapMutation, UpdateContestMapMutationVariables>;
export const GetContestMapsDocument = gql`
    query GetContestMaps($contest_id: uuid!) {
  contest_map(where: {contest_id: {_eq: $contest_id}}) {
    map_id
    name
    filename
    team_labels
  }
}
    `;

/**
 * __useGetContestMapsQuery__
 *
 * To run a query within a React component, call `useGetContestMapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestMapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestMapsQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestMapsQuery(baseOptions: Apollo.QueryHookOptions<GetContestMapsQuery, GetContestMapsQueryVariables> & ({ variables: GetContestMapsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestMapsQuery, GetContestMapsQueryVariables>(GetContestMapsDocument, options);
      }
export function useGetContestMapsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestMapsQuery, GetContestMapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestMapsQuery, GetContestMapsQueryVariables>(GetContestMapsDocument, options);
        }
export function useGetContestMapsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestMapsQuery, GetContestMapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestMapsQuery, GetContestMapsQueryVariables>(GetContestMapsDocument, options);
        }
export type GetContestMapsQueryHookResult = ReturnType<typeof useGetContestMapsQuery>;
export type GetContestMapsLazyQueryHookResult = ReturnType<typeof useGetContestMapsLazyQuery>;
export type GetContestMapsSuspenseQueryHookResult = ReturnType<typeof useGetContestMapsSuspenseQuery>;
export type GetContestMapsQueryResult = Apollo.QueryResult<GetContestMapsQuery, GetContestMapsQueryVariables>;
export const AddContestNoticeDocument = gql`
    mutation AddContestNotice($title: String!, $content: String!, $files: String, $contest_id: uuid!) {
  insert_contest_notice_one(
    object: {title: $title, content: $content, files: $files, contest_id: $contest_id}
  ) {
    id
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
  delete_contest_notice_by_pk(id: $id) {
    id
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
export const UpdateContestNoticeDocument = gql`
    mutation UpdateContestNotice($id: uuid!, $title: String!, $content: String!, $files: String) {
  update_contest_notice_by_pk(
    pk_columns: {id: $id}
    _set: {title: $title, content: $content, files: $files}
  ) {
    id
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
export const GetContestNoticesDocument = gql`
    query GetContestNotices($contest_id: uuid!) {
  contest_notice(
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
export const AddContestPlayerDocument = gql`
    mutation AddContestPlayer($contest_id: uuid!, $team_label: String!, $player_label: String!, $roles_available: String!) {
  insert_contest_player_one(
    object: {contest_id: $contest_id, team_label: $team_label, player_label: $player_label, roles_available: $roles_available}
  ) {
    team_label
  }
}
    `;
export type AddContestPlayerMutationFn = Apollo.MutationFunction<AddContestPlayerMutation, AddContestPlayerMutationVariables>;

/**
 * __useAddContestPlayerMutation__
 *
 * To run a mutation, you first call `useAddContestPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestPlayerMutation, { data, loading, error }] = useAddContestPlayerMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_label: // value for 'team_label'
 *      player_label: // value for 'player_label'
 *      roles_available: // value for 'roles_available'
 *   },
 * });
 */
export function useAddContestPlayerMutation(baseOptions?: Apollo.MutationHookOptions<AddContestPlayerMutation, AddContestPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestPlayerMutation, AddContestPlayerMutationVariables>(AddContestPlayerDocument, options);
      }
export type AddContestPlayerMutationHookResult = ReturnType<typeof useAddContestPlayerMutation>;
export type AddContestPlayerMutationResult = Apollo.MutationResult<AddContestPlayerMutation>;
export type AddContestPlayerMutationOptions = Apollo.BaseMutationOptions<AddContestPlayerMutation, AddContestPlayerMutationVariables>;
export const DeleteContestPlayerDocument = gql`
    mutation DeleteContestPlayer($contest_id: uuid!, $team_label: String!, $player_label: String!) {
  delete_contest_player_by_pk(
    contest_id: $contest_id
    team_label: $team_label
    player_label: $player_label
  ) {
    team_label
  }
}
    `;
export type DeleteContestPlayerMutationFn = Apollo.MutationFunction<DeleteContestPlayerMutation, DeleteContestPlayerMutationVariables>;

/**
 * __useDeleteContestPlayerMutation__
 *
 * To run a mutation, you first call `useDeleteContestPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestPlayerMutation, { data, loading, error }] = useDeleteContestPlayerMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_label: // value for 'team_label'
 *      player_label: // value for 'player_label'
 *   },
 * });
 */
export function useDeleteContestPlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestPlayerMutation, DeleteContestPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestPlayerMutation, DeleteContestPlayerMutationVariables>(DeleteContestPlayerDocument, options);
      }
export type DeleteContestPlayerMutationHookResult = ReturnType<typeof useDeleteContestPlayerMutation>;
export type DeleteContestPlayerMutationResult = Apollo.MutationResult<DeleteContestPlayerMutation>;
export type DeleteContestPlayerMutationOptions = Apollo.BaseMutationOptions<DeleteContestPlayerMutation, DeleteContestPlayerMutationVariables>;
export const UpdateContestPlayerDocument = gql`
    mutation UpdateContestPlayer($contest_id: uuid!, $team_label: String!, $player_label: String!, $roles_available: String!) {
  update_contest_player_by_pk(
    pk_columns: {contest_id: $contest_id, team_label: $team_label, player_label: $player_label}
    _set: {player_label: $player_label, roles_available: $roles_available}
  ) {
    team_label
  }
}
    `;
export type UpdateContestPlayerMutationFn = Apollo.MutationFunction<UpdateContestPlayerMutation, UpdateContestPlayerMutationVariables>;

/**
 * __useUpdateContestPlayerMutation__
 *
 * To run a mutation, you first call `useUpdateContestPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestPlayerMutation, { data, loading, error }] = useUpdateContestPlayerMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      team_label: // value for 'team_label'
 *      player_label: // value for 'player_label'
 *      roles_available: // value for 'roles_available'
 *   },
 * });
 */
export function useUpdateContestPlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestPlayerMutation, UpdateContestPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestPlayerMutation, UpdateContestPlayerMutationVariables>(UpdateContestPlayerDocument, options);
      }
export type UpdateContestPlayerMutationHookResult = ReturnType<typeof useUpdateContestPlayerMutation>;
export type UpdateContestPlayerMutationResult = Apollo.MutationResult<UpdateContestPlayerMutation>;
export type UpdateContestPlayerMutationOptions = Apollo.BaseMutationOptions<UpdateContestPlayerMutation, UpdateContestPlayerMutationVariables>;
export const GetContestPlayersDocument = gql`
    query GetContestPlayers($contest_id: uuid!) {
  contest_player(where: {contest_id: {_eq: $contest_id}}) {
    team_label
    player_label
    roles_available
  }
}
    `;

/**
 * __useGetContestPlayersQuery__
 *
 * To run a query within a React component, call `useGetContestPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestPlayersQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestPlayersQuery(baseOptions: Apollo.QueryHookOptions<GetContestPlayersQuery, GetContestPlayersQueryVariables> & ({ variables: GetContestPlayersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestPlayersQuery, GetContestPlayersQueryVariables>(GetContestPlayersDocument, options);
      }
export function useGetContestPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestPlayersQuery, GetContestPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestPlayersQuery, GetContestPlayersQueryVariables>(GetContestPlayersDocument, options);
        }
export function useGetContestPlayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestPlayersQuery, GetContestPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestPlayersQuery, GetContestPlayersQueryVariables>(GetContestPlayersDocument, options);
        }
export type GetContestPlayersQueryHookResult = ReturnType<typeof useGetContestPlayersQuery>;
export type GetContestPlayersLazyQueryHookResult = ReturnType<typeof useGetContestPlayersLazyQuery>;
export type GetContestPlayersSuspenseQueryHookResult = ReturnType<typeof useGetContestPlayersSuspenseQuery>;
export type GetContestPlayersQueryResult = Apollo.QueryResult<GetContestPlayersQuery, GetContestPlayersQueryVariables>;
export const GetArenaRoomsDocument = gql`
    subscription GetArenaRooms($contest_id: uuid!) {
  contest_room(
    where: {_and: {contest_id: {_eq: $contest_id}, round_id: {_is_null: true}}}
    order_by: {created_at: desc}
  ) {
    room_id
    status
    port
    created_at
    contest_room_teams {
      contest_team {
        team_name
        team_leader {
          realname
        }
      }
      score
      team_label
      player_roles
    }
  }
}
    `;

/**
 * __useGetArenaRoomsSubscription__
 *
 * To run a query within a React component, call `useGetArenaRoomsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetArenaRoomsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArenaRoomsSubscription({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetArenaRoomsSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetArenaRoomsSubscription, GetArenaRoomsSubscriptionVariables> & ({ variables: GetArenaRoomsSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetArenaRoomsSubscription, GetArenaRoomsSubscriptionVariables>(GetArenaRoomsDocument, options);
      }
export type GetArenaRoomsSubscriptionHookResult = ReturnType<typeof useGetArenaRoomsSubscription>;
export type GetArenaRoomsSubscriptionResult = Apollo.SubscriptionResult<GetArenaRoomsSubscription>;
export const GetRunningArenaRoomsDocument = gql`
    query GetRunningArenaRooms($contest_id: uuid!) {
  contest_room(
    where: {_and: {contest_id: {_eq: $contest_id}, round_id: {_is_null: true}, status: {_in: ["Waiting", "Running"]}}}
  ) {
    status
    created_at
    contest_room_teams {
      contest_team {
        team_id
      }
    }
  }
}
    `;

/**
 * __useGetRunningArenaRoomsQuery__
 *
 * To run a query within a React component, call `useGetRunningArenaRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRunningArenaRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRunningArenaRoomsQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetRunningArenaRoomsQuery(baseOptions: Apollo.QueryHookOptions<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables> & ({ variables: GetRunningArenaRoomsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>(GetRunningArenaRoomsDocument, options);
      }
export function useGetRunningArenaRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>(GetRunningArenaRoomsDocument, options);
        }
export function useGetRunningArenaRoomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>(GetRunningArenaRoomsDocument, options);
        }
export type GetRunningArenaRoomsQueryHookResult = ReturnType<typeof useGetRunningArenaRoomsQuery>;
export type GetRunningArenaRoomsLazyQueryHookResult = ReturnType<typeof useGetRunningArenaRoomsLazyQuery>;
export type GetRunningArenaRoomsSuspenseQueryHookResult = ReturnType<typeof useGetRunningArenaRoomsSuspenseQuery>;
export type GetRunningArenaRoomsQueryResult = Apollo.QueryResult<GetRunningArenaRoomsQuery, GetRunningArenaRoomsQueryVariables>;
export const GetCompetitionRoomsDocument = gql`
    subscription GetCompetitionRooms($contest_id: uuid!, $round_id: uuid!) {
  contest_room(
    where: {_and: {contest_id: {_eq: $contest_id}, round_id: {_eq: $round_id}}}
    order_by: {created_at: desc}
  ) {
    room_id
    status
    port
    created_at
    contest_room_teams {
      contest_team {
        team_name
        team_leader {
          realname
        }
      }
      score
      team_label
      player_roles
    }
  }
}
    `;

/**
 * __useGetCompetitionRoomsSubscription__
 *
 * To run a query within a React component, call `useGetCompetitionRoomsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionRoomsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionRoomsSubscription({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      round_id: // value for 'round_id'
 *   },
 * });
 */
export function useGetCompetitionRoomsSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetCompetitionRoomsSubscription, GetCompetitionRoomsSubscriptionVariables> & ({ variables: GetCompetitionRoomsSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetCompetitionRoomsSubscription, GetCompetitionRoomsSubscriptionVariables>(GetCompetitionRoomsDocument, options);
      }
export type GetCompetitionRoomsSubscriptionHookResult = ReturnType<typeof useGetCompetitionRoomsSubscription>;
export type GetCompetitionRoomsSubscriptionResult = Apollo.SubscriptionResult<GetCompetitionRoomsSubscription>;
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
        score
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
    where: {_and: {contest_id: {_eq: $contest_id}, status: {_eq: "false"}, port: {_is_null: false}}}
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
export const AddContestRoundDocument = gql`
    mutation AddContestRound($contest_id: uuid!, $name: String!, $map_id: uuid) {
  insert_contest_round_one(
    object: {contest_id: $contest_id, name: $name, map_id: $map_id}
  ) {
    round_id
  }
}
    `;
export type AddContestRoundMutationFn = Apollo.MutationFunction<AddContestRoundMutation, AddContestRoundMutationVariables>;

/**
 * __useAddContestRoundMutation__
 *
 * To run a mutation, you first call `useAddContestRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestRoundMutation, { data, loading, error }] = useAddContestRoundMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      name: // value for 'name'
 *      map_id: // value for 'map_id'
 *   },
 * });
 */
export function useAddContestRoundMutation(baseOptions?: Apollo.MutationHookOptions<AddContestRoundMutation, AddContestRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestRoundMutation, AddContestRoundMutationVariables>(AddContestRoundDocument, options);
      }
export type AddContestRoundMutationHookResult = ReturnType<typeof useAddContestRoundMutation>;
export type AddContestRoundMutationResult = Apollo.MutationResult<AddContestRoundMutation>;
export type AddContestRoundMutationOptions = Apollo.BaseMutationOptions<AddContestRoundMutation, AddContestRoundMutationVariables>;
export const DeleteContestRoundDocument = gql`
    mutation DeleteContestRound($round_id: uuid!) {
  delete_contest_round_by_pk(round_id: $round_id) {
    round_id
  }
}
    `;
export type DeleteContestRoundMutationFn = Apollo.MutationFunction<DeleteContestRoundMutation, DeleteContestRoundMutationVariables>;

/**
 * __useDeleteContestRoundMutation__
 *
 * To run a mutation, you first call `useDeleteContestRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestRoundMutation, { data, loading, error }] = useDeleteContestRoundMutation({
 *   variables: {
 *      round_id: // value for 'round_id'
 *   },
 * });
 */
export function useDeleteContestRoundMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestRoundMutation, DeleteContestRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestRoundMutation, DeleteContestRoundMutationVariables>(DeleteContestRoundDocument, options);
      }
export type DeleteContestRoundMutationHookResult = ReturnType<typeof useDeleteContestRoundMutation>;
export type DeleteContestRoundMutationResult = Apollo.MutationResult<DeleteContestRoundMutation>;
export type DeleteContestRoundMutationOptions = Apollo.BaseMutationOptions<DeleteContestRoundMutation, DeleteContestRoundMutationVariables>;
export const UpdateContestRoundNameDocument = gql`
    mutation UpdateContestRoundName($round_id: uuid!, $name: String!) {
  update_contest_round_by_pk(
    pk_columns: {round_id: $round_id}
    _set: {name: $name}
  ) {
    round_id
  }
}
    `;
export type UpdateContestRoundNameMutationFn = Apollo.MutationFunction<UpdateContestRoundNameMutation, UpdateContestRoundNameMutationVariables>;

/**
 * __useUpdateContestRoundNameMutation__
 *
 * To run a mutation, you first call `useUpdateContestRoundNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestRoundNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestRoundNameMutation, { data, loading, error }] = useUpdateContestRoundNameMutation({
 *   variables: {
 *      round_id: // value for 'round_id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateContestRoundNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestRoundNameMutation, UpdateContestRoundNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestRoundNameMutation, UpdateContestRoundNameMutationVariables>(UpdateContestRoundNameDocument, options);
      }
export type UpdateContestRoundNameMutationHookResult = ReturnType<typeof useUpdateContestRoundNameMutation>;
export type UpdateContestRoundNameMutationResult = Apollo.MutationResult<UpdateContestRoundNameMutation>;
export type UpdateContestRoundNameMutationOptions = Apollo.BaseMutationOptions<UpdateContestRoundNameMutation, UpdateContestRoundNameMutationVariables>;
export const GetContestRoundsDocument = gql`
    query GetContestRounds($contest_id: uuid!) {
  contest_round(where: {contest_id: {_eq: $contest_id}}) {
    round_id
    name
    map_id
  }
}
    `;

/**
 * __useGetContestRoundsQuery__
 *
 * To run a query within a React component, call `useGetContestRoundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestRoundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestRoundsQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestRoundsQuery(baseOptions: Apollo.QueryHookOptions<GetContestRoundsQuery, GetContestRoundsQueryVariables> & ({ variables: GetContestRoundsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestRoundsQuery, GetContestRoundsQueryVariables>(GetContestRoundsDocument, options);
      }
export function useGetContestRoundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestRoundsQuery, GetContestRoundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestRoundsQuery, GetContestRoundsQueryVariables>(GetContestRoundsDocument, options);
        }
export function useGetContestRoundsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestRoundsQuery, GetContestRoundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestRoundsQuery, GetContestRoundsQueryVariables>(GetContestRoundsDocument, options);
        }
export type GetContestRoundsQueryHookResult = ReturnType<typeof useGetContestRoundsQuery>;
export type GetContestRoundsLazyQueryHookResult = ReturnType<typeof useGetContestRoundsLazyQuery>;
export type GetContestRoundsSuspenseQueryHookResult = ReturnType<typeof useGetContestRoundsSuspenseQuery>;
export type GetContestRoundsQueryResult = Apollo.QueryResult<GetContestRoundsQuery, GetContestRoundsQueryVariables>;
export const AddTeamDocument = gql`
    mutation AddTeam($team_name: String!, $team_intro: String = "", $team_leader_uuid: uuid!, $invited_code: String!, $contest_id: uuid!) {
  insert_contest_team_one(
    object: {team_name: $team_name, team_intro: $team_intro, team_leader_uuid: $team_leader_uuid, invited_code: $invited_code, contest_id: $contest_id, contest_team_members: {data: {user_uuid: $team_leader_uuid}}}
  ) {
    team_id
  }
}
    `;
export type AddTeamMutationFn = Apollo.MutationFunction<AddTeamMutation, AddTeamMutationVariables>;

/**
 * __useAddTeamMutation__
 *
 * To run a mutation, you first call `useAddTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMutation, { data, loading, error }] = useAddTeamMutation({
 *   variables: {
 *      team_name: // value for 'team_name'
 *      team_intro: // value for 'team_intro'
 *      team_leader_uuid: // value for 'team_leader_uuid'
 *      invited_code: // value for 'invited_code'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useAddTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMutation, AddTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMutation, AddTeamMutationVariables>(AddTeamDocument, options);
      }
export type AddTeamMutationHookResult = ReturnType<typeof useAddTeamMutation>;
export type AddTeamMutationResult = Apollo.MutationResult<AddTeamMutation>;
export type AddTeamMutationOptions = Apollo.BaseMutationOptions<AddTeamMutation, AddTeamMutationVariables>;
export const AddTeamMemberDocument = gql`
    mutation AddTeamMember($team_id: uuid!, $user_uuid: uuid!) {
  insert_contest_team_member_one(
    object: {team_id: $team_id, user_uuid: $user_uuid}
  ) {
    team_id
  }
}
    `;
export type AddTeamMemberMutationFn = Apollo.MutationFunction<AddTeamMemberMutation, AddTeamMemberMutationVariables>;

/**
 * __useAddTeamMemberMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberMutation, { data, loading, error }] = useAddTeamMemberMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *      user_uuid: // value for 'user_uuid'
 *   },
 * });
 */
export function useAddTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMemberMutation, AddTeamMemberMutationVariables>(AddTeamMemberDocument, options);
      }
export type AddTeamMemberMutationHookResult = ReturnType<typeof useAddTeamMemberMutation>;
export type AddTeamMemberMutationResult = Apollo.MutationResult<AddTeamMemberMutation>;
export type AddTeamMemberMutationOptions = Apollo.BaseMutationOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($team_id: uuid!) {
  delete_contest_team_by_pk(team_id: $team_id) {
    team_id
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
export const DeleteTeamMemberDocument = gql`
    mutation DeleteTeamMember($user_uuid: uuid!, $team_id: uuid!) {
  delete_contest_team_member_by_pk(user_uuid: $user_uuid, team_id: $team_id) {
    team_id
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
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($team_id: uuid!, $team_name: String!, $team_intro: String!) {
  update_contest_team_by_pk(
    pk_columns: {team_id: $team_id}
    _set: {team_name: $team_name, team_intro: $team_intro}
  ) {
    team_id
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
 *      team_name: // value for 'team_name'
 *      team_intro: // value for 'team_intro'
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
export const GetTeamDocument = gql`
    query GetTeam($user_uuid: uuid!, $contest_id: uuid!) {
  contest_team_member(
    where: {user_uuid: {_eq: $user_uuid}, contest_team: {contest_id: {_eq: $contest_id}}}
  ) {
    contest_team {
      team_id
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      user_uuid: // value for 'user_uuid'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables> & ({ variables: GetTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export function useGetTeamSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamSuspenseQueryHookResult = ReturnType<typeof useGetTeamSuspenseQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamInfoDocument = gql`
    query GetTeamInfo($team_id: uuid!) {
  contest_team_by_pk(team_id: $team_id) {
    team_name
    team_intro
    invited_code
    team_leader {
      uuid
      realname
    }
    contest_team_members {
      user {
        uuid
        realname
        student_no
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
export const GetTeamInfoByInvitedCodeDocument = gql`
    query GetTeamInfoByInvitedCode($invited_code: String!, $contest_id: uuid!) {
  contest_team(
    where: {invited_code: {_eq: $invited_code}, contest_id: {_eq: $contest_id}}
  ) {
    team_id
    team_name
    team_intro
    team_leader {
      realname
    }
  }
}
    `;

/**
 * __useGetTeamInfoByInvitedCodeQuery__
 *
 * To run a query within a React component, call `useGetTeamInfoByInvitedCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamInfoByInvitedCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamInfoByInvitedCodeQuery({
 *   variables: {
 *      invited_code: // value for 'invited_code'
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetTeamInfoByInvitedCodeQuery(baseOptions: Apollo.QueryHookOptions<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables> & ({ variables: GetTeamInfoByInvitedCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>(GetTeamInfoByInvitedCodeDocument, options);
      }
export function useGetTeamInfoByInvitedCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>(GetTeamInfoByInvitedCodeDocument, options);
        }
export function useGetTeamInfoByInvitedCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>(GetTeamInfoByInvitedCodeDocument, options);
        }
export type GetTeamInfoByInvitedCodeQueryHookResult = ReturnType<typeof useGetTeamInfoByInvitedCodeQuery>;
export type GetTeamInfoByInvitedCodeLazyQueryHookResult = ReturnType<typeof useGetTeamInfoByInvitedCodeLazyQuery>;
export type GetTeamInfoByInvitedCodeSuspenseQueryHookResult = ReturnType<typeof useGetTeamInfoByInvitedCodeSuspenseQuery>;
export type GetTeamInfoByInvitedCodeQueryResult = Apollo.QueryResult<GetTeamInfoByInvitedCodeQuery, GetTeamInfoByInvitedCodeQueryVariables>;
export const GetTeamStatDocument = gql`
    query getTeamStat($team_id: uuid!) {
  contest_team_by_pk(team_id: $team_id) {
    contest_team_codes_aggregate {
      aggregate {
        count
      }
    }
    contest_team_rooms_aggregate {
      aggregate {
        count
        sum {
          score
        }
      }
    }
  }
}
    `;

/**
 * __useGetTeamStatQuery__
 *
 * To run a query within a React component, call `useGetTeamStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamStatQuery({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetTeamStatQuery(baseOptions: Apollo.QueryHookOptions<GetTeamStatQuery, GetTeamStatQueryVariables> & ({ variables: GetTeamStatQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamStatQuery, GetTeamStatQueryVariables>(GetTeamStatDocument, options);
      }
export function useGetTeamStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamStatQuery, GetTeamStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamStatQuery, GetTeamStatQueryVariables>(GetTeamStatDocument, options);
        }
export function useGetTeamStatSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamStatQuery, GetTeamStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamStatQuery, GetTeamStatQueryVariables>(GetTeamStatDocument, options);
        }
export type GetTeamStatQueryHookResult = ReturnType<typeof useGetTeamStatQuery>;
export type GetTeamStatLazyQueryHookResult = ReturnType<typeof useGetTeamStatLazyQuery>;
export type GetTeamStatSuspenseQueryHookResult = ReturnType<typeof useGetTeamStatSuspenseQuery>;
export type GetTeamStatQueryResult = Apollo.QueryResult<GetTeamStatQuery, GetTeamStatQueryVariables>;
export const GetTotalTeamNumDocument = gql`
    query getTotalTeamNum($contest_id: uuid!) {
  contest_team_aggregate(where: {contest: {id: {_eq: $contest_id}}}) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetTotalTeamNumQuery__
 *
 * To run a query within a React component, call `useGetTotalTeamNumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalTeamNumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalTeamNumQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetTotalTeamNumQuery(baseOptions: Apollo.QueryHookOptions<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables> & ({ variables: GetTotalTeamNumQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>(GetTotalTeamNumDocument, options);
      }
export function useGetTotalTeamNumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>(GetTotalTeamNumDocument, options);
        }
export function useGetTotalTeamNumSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>(GetTotalTeamNumDocument, options);
        }
export type GetTotalTeamNumQueryHookResult = ReturnType<typeof useGetTotalTeamNumQuery>;
export type GetTotalTeamNumLazyQueryHookResult = ReturnType<typeof useGetTotalTeamNumLazyQuery>;
export type GetTotalTeamNumSuspenseQueryHookResult = ReturnType<typeof useGetTotalTeamNumSuspenseQuery>;
export type GetTotalTeamNumQueryResult = Apollo.QueryResult<GetTotalTeamNumQuery, GetTotalTeamNumQueryVariables>;
export const GetTotalMemberNumDocument = gql`
    query getTotalMemberNum($contest_id: uuid!) {
  contest_team_member_aggregate(
    where: {contest_team: {contest: {id: {_eq: $contest_id}}}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetTotalMemberNumQuery__
 *
 * To run a query within a React component, call `useGetTotalMemberNumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalMemberNumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalMemberNumQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetTotalMemberNumQuery(baseOptions: Apollo.QueryHookOptions<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables> & ({ variables: GetTotalMemberNumQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>(GetTotalMemberNumDocument, options);
      }
export function useGetTotalMemberNumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>(GetTotalMemberNumDocument, options);
        }
export function useGetTotalMemberNumSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>(GetTotalMemberNumDocument, options);
        }
export type GetTotalMemberNumQueryHookResult = ReturnType<typeof useGetTotalMemberNumQuery>;
export type GetTotalMemberNumLazyQueryHookResult = ReturnType<typeof useGetTotalMemberNumLazyQuery>;
export type GetTotalMemberNumSuspenseQueryHookResult = ReturnType<typeof useGetTotalMemberNumSuspenseQuery>;
export type GetTotalMemberNumQueryResult = Apollo.QueryResult<GetTotalMemberNumQuery, GetTotalMemberNumQueryVariables>;
export const GetTeamsDocument = gql`
    query getTeams($contest_id: uuid!) {
  contest_team(where: {contest_id: {_eq: $contest_id}}) {
    team_id
    team_name
    team_intro
    team_leader {
      realname
      student_no
      class
    }
    contest_team_members {
      user {
        realname
        student_no
        class
      }
    }
    contest_team_codes_aggregate(where: {compile_status: {_eq: "Success"}}) {
      aggregate {
        count
      }
    }
    contest_team_rooms_aggregate {
      aggregate {
        count
        sum {
          score
        }
      }
    }
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables> & ({ variables: GetTeamsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export function useGetTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsSuspenseQueryHookResult = ReturnType<typeof useGetTeamsSuspenseQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
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
    contest {
      name
    }
    team_intro
    team_leader {
      uuid
      class
      email
      realname
      phone
    }
    contest_team_members {
      user {
        id
        class
        email
        realname
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
    contest {
      name
    }
    team_intro
    team_leader {
      uuid
      class
      email
      realname
      phone
    }
    contest_team_members {
      user {
        id
        class
        email
        realname
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
export const AddTeamCodeDocument = gql`
    mutation AddTeamCode($team_id: uuid!, $code_name: String!, $language: String!, $compile_status: String) {
  insert_contest_team_code_one(
    object: {team_id: $team_id, code_name: $code_name, language: $language, compile_status: $compile_status}
  ) {
    code_id
  }
}
    `;
export type AddTeamCodeMutationFn = Apollo.MutationFunction<AddTeamCodeMutation, AddTeamCodeMutationVariables>;

/**
 * __useAddTeamCodeMutation__
 *
 * To run a mutation, you first call `useAddTeamCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamCodeMutation, { data, loading, error }] = useAddTeamCodeMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *      code_name: // value for 'code_name'
 *      language: // value for 'language'
 *      compile_status: // value for 'compile_status'
 *   },
 * });
 */
export function useAddTeamCodeMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamCodeMutation, AddTeamCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamCodeMutation, AddTeamCodeMutationVariables>(AddTeamCodeDocument, options);
      }
export type AddTeamCodeMutationHookResult = ReturnType<typeof useAddTeamCodeMutation>;
export type AddTeamCodeMutationResult = Apollo.MutationResult<AddTeamCodeMutation>;
export type AddTeamCodeMutationOptions = Apollo.BaseMutationOptions<AddTeamCodeMutation, AddTeamCodeMutationVariables>;
export const DeleteTeamCodeDocument = gql`
    mutation DeleteTeamCode($code_id: uuid!) {
  delete_contest_team_code_by_pk(code_id: $code_id) {
    code_id
  }
}
    `;
export type DeleteTeamCodeMutationFn = Apollo.MutationFunction<DeleteTeamCodeMutation, DeleteTeamCodeMutationVariables>;

/**
 * __useDeleteTeamCodeMutation__
 *
 * To run a mutation, you first call `useDeleteTeamCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamCodeMutation, { data, loading, error }] = useDeleteTeamCodeMutation({
 *   variables: {
 *      code_id: // value for 'code_id'
 *   },
 * });
 */
export function useDeleteTeamCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamCodeMutation, DeleteTeamCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamCodeMutation, DeleteTeamCodeMutationVariables>(DeleteTeamCodeDocument, options);
      }
export type DeleteTeamCodeMutationHookResult = ReturnType<typeof useDeleteTeamCodeMutation>;
export type DeleteTeamCodeMutationResult = Apollo.MutationResult<DeleteTeamCodeMutation>;
export type DeleteTeamCodeMutationOptions = Apollo.BaseMutationOptions<DeleteTeamCodeMutation, DeleteTeamCodeMutationVariables>;
export const UpdateTeamCodeNameDocument = gql`
    mutation UpdateTeamCodeName($code_id: uuid!, $code_name: String!) {
  update_contest_team_code_by_pk(
    pk_columns: {code_id: $code_id}
    _set: {code_name: $code_name}
  ) {
    code_id
  }
}
    `;
export type UpdateTeamCodeNameMutationFn = Apollo.MutationFunction<UpdateTeamCodeNameMutation, UpdateTeamCodeNameMutationVariables>;

/**
 * __useUpdateTeamCodeNameMutation__
 *
 * To run a mutation, you first call `useUpdateTeamCodeNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamCodeNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamCodeNameMutation, { data, loading, error }] = useUpdateTeamCodeNameMutation({
 *   variables: {
 *      code_id: // value for 'code_id'
 *      code_name: // value for 'code_name'
 *   },
 * });
 */
export function useUpdateTeamCodeNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamCodeNameMutation, UpdateTeamCodeNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamCodeNameMutation, UpdateTeamCodeNameMutationVariables>(UpdateTeamCodeNameDocument, options);
      }
export type UpdateTeamCodeNameMutationHookResult = ReturnType<typeof useUpdateTeamCodeNameMutation>;
export type UpdateTeamCodeNameMutationResult = Apollo.MutationResult<UpdateTeamCodeNameMutation>;
export type UpdateTeamCodeNameMutationOptions = Apollo.BaseMutationOptions<UpdateTeamCodeNameMutation, UpdateTeamCodeNameMutationVariables>;
export const GetTeamCodesDocument = gql`
    subscription GetTeamCodes($team_id: uuid!) {
  contest_team_code(
    order_by: {created_at: desc}
    where: {team_id: {_eq: $team_id}}
  ) {
    code_id
    code_name
    language
    compile_status
    created_at
  }
}
    `;

/**
 * __useGetTeamCodesSubscription__
 *
 * To run a query within a React component, call `useGetTeamCodesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamCodesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamCodesSubscription({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetTeamCodesSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetTeamCodesSubscription, GetTeamCodesSubscriptionVariables> & ({ variables: GetTeamCodesSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetTeamCodesSubscription, GetTeamCodesSubscriptionVariables>(GetTeamCodesDocument, options);
      }
export type GetTeamCodesSubscriptionHookResult = ReturnType<typeof useGetTeamCodesSubscription>;
export type GetTeamCodesSubscriptionResult = Apollo.SubscriptionResult<GetTeamCodesSubscription>;
export const AddTeamPlayerDocument = gql`
    mutation AddTeamPlayer($team_id: uuid!, $player: String!) {
  insert_contest_team_player_one(object: {team_id: $team_id, player: $player}) {
    player
  }
}
    `;
export type AddTeamPlayerMutationFn = Apollo.MutationFunction<AddTeamPlayerMutation, AddTeamPlayerMutationVariables>;

/**
 * __useAddTeamPlayerMutation__
 *
 * To run a mutation, you first call `useAddTeamPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamPlayerMutation, { data, loading, error }] = useAddTeamPlayerMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *      player: // value for 'player'
 *   },
 * });
 */
export function useAddTeamPlayerMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamPlayerMutation, AddTeamPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamPlayerMutation, AddTeamPlayerMutationVariables>(AddTeamPlayerDocument, options);
      }
export type AddTeamPlayerMutationHookResult = ReturnType<typeof useAddTeamPlayerMutation>;
export type AddTeamPlayerMutationResult = Apollo.MutationResult<AddTeamPlayerMutation>;
export type AddTeamPlayerMutationOptions = Apollo.BaseMutationOptions<AddTeamPlayerMutation, AddTeamPlayerMutationVariables>;
export const UpdateTeamPlayerDocument = gql`
    mutation UpdateTeamPlayer($team_id: uuid!, $player: String!, $code_id: uuid!, $role: String!) {
  update_contest_team_player_by_pk(
    pk_columns: {team_id: $team_id, player: $player}
    _set: {code_id: $code_id, role: $role}
  ) {
    player
  }
}
    `;
export type UpdateTeamPlayerMutationFn = Apollo.MutationFunction<UpdateTeamPlayerMutation, UpdateTeamPlayerMutationVariables>;

/**
 * __useUpdateTeamPlayerMutation__
 *
 * To run a mutation, you first call `useUpdateTeamPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamPlayerMutation, { data, loading, error }] = useUpdateTeamPlayerMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *      player: // value for 'player'
 *      code_id: // value for 'code_id'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateTeamPlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamPlayerMutation, UpdateTeamPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamPlayerMutation, UpdateTeamPlayerMutationVariables>(UpdateTeamPlayerDocument, options);
      }
export type UpdateTeamPlayerMutationHookResult = ReturnType<typeof useUpdateTeamPlayerMutation>;
export type UpdateTeamPlayerMutationResult = Apollo.MutationResult<UpdateTeamPlayerMutation>;
export type UpdateTeamPlayerMutationOptions = Apollo.BaseMutationOptions<UpdateTeamPlayerMutation, UpdateTeamPlayerMutationVariables>;
export const GetTeamPlayersDocument = gql`
    subscription GetTeamPlayers($team_id: uuid!) {
  contest_team_player(where: {team_id: {_eq: $team_id}}) {
    player
    player_code {
      code_id
      code_name
      language
      created_at
    }
    role
  }
}
    `;

/**
 * __useGetTeamPlayersSubscription__
 *
 * To run a query within a React component, call `useGetTeamPlayersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamPlayersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamPlayersSubscription({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetTeamPlayersSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetTeamPlayersSubscription, GetTeamPlayersSubscriptionVariables> & ({ variables: GetTeamPlayersSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetTeamPlayersSubscription, GetTeamPlayersSubscriptionVariables>(GetTeamPlayersDocument, options);
      }
export type GetTeamPlayersSubscriptionHookResult = ReturnType<typeof useGetTeamPlayersSubscription>;
export type GetTeamPlayersSubscriptionResult = Apollo.SubscriptionResult<GetTeamPlayersSubscription>;
export const AddContestTimeDocument = gql`
    mutation AddContestTime($contest_id: uuid!, $event: String!, $start: timestamptz!, $end: timestamptz!, $description: String) {
  insert_contest_time_one(
    object: {contest_id: $contest_id, event: $event, start: $start, end: $end, description: $description}
  ) {
    event
  }
}
    `;
export type AddContestTimeMutationFn = Apollo.MutationFunction<AddContestTimeMutation, AddContestTimeMutationVariables>;

/**
 * __useAddContestTimeMutation__
 *
 * To run a mutation, you first call `useAddContestTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContestTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContestTimeMutation, { data, loading, error }] = useAddContestTimeMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      event: // value for 'event'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddContestTimeMutation(baseOptions?: Apollo.MutationHookOptions<AddContestTimeMutation, AddContestTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContestTimeMutation, AddContestTimeMutationVariables>(AddContestTimeDocument, options);
      }
export type AddContestTimeMutationHookResult = ReturnType<typeof useAddContestTimeMutation>;
export type AddContestTimeMutationResult = Apollo.MutationResult<AddContestTimeMutation>;
export type AddContestTimeMutationOptions = Apollo.BaseMutationOptions<AddContestTimeMutation, AddContestTimeMutationVariables>;
export const DeleteContestTimeDocument = gql`
    mutation DeleteContestTime($contest_id: uuid!, $event: String!) {
  delete_contest_time_by_pk(contest_id: $contest_id, event: $event) {
    event
  }
}
    `;
export type DeleteContestTimeMutationFn = Apollo.MutationFunction<DeleteContestTimeMutation, DeleteContestTimeMutationVariables>;

/**
 * __useDeleteContestTimeMutation__
 *
 * To run a mutation, you first call `useDeleteContestTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContestTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContestTimeMutation, { data, loading, error }] = useDeleteContestTimeMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useDeleteContestTimeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContestTimeMutation, DeleteContestTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContestTimeMutation, DeleteContestTimeMutationVariables>(DeleteContestTimeDocument, options);
      }
export type DeleteContestTimeMutationHookResult = ReturnType<typeof useDeleteContestTimeMutation>;
export type DeleteContestTimeMutationResult = Apollo.MutationResult<DeleteContestTimeMutation>;
export type DeleteContestTimeMutationOptions = Apollo.BaseMutationOptions<DeleteContestTimeMutation, DeleteContestTimeMutationVariables>;
export const UpdateContestTimeDocument = gql`
    mutation UpdateContestTime($contest_id: uuid!, $event: String!, $start: timestamptz!, $end: timestamptz!, $description: String) {
  update_contest_time_by_pk(
    pk_columns: {contest_id: $contest_id, event: $event}
    _set: {start: $start, end: $end, description: $description}
  ) {
    event
  }
}
    `;
export type UpdateContestTimeMutationFn = Apollo.MutationFunction<UpdateContestTimeMutation, UpdateContestTimeMutationVariables>;

/**
 * __useUpdateContestTimeMutation__
 *
 * To run a mutation, you first call `useUpdateContestTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContestTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContestTimeMutation, { data, loading, error }] = useUpdateContestTimeMutation({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *      event: // value for 'event'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateContestTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContestTimeMutation, UpdateContestTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContestTimeMutation, UpdateContestTimeMutationVariables>(UpdateContestTimeDocument, options);
      }
export type UpdateContestTimeMutationHookResult = ReturnType<typeof useUpdateContestTimeMutation>;
export type UpdateContestTimeMutationResult = Apollo.MutationResult<UpdateContestTimeMutation>;
export type UpdateContestTimeMutationOptions = Apollo.BaseMutationOptions<UpdateContestTimeMutation, UpdateContestTimeMutationVariables>;
export const GetContestTimesDocument = gql`
    query GetContestTimes($contest_id: uuid!) {
  contest_time(order_by: {start: asc}, where: {contest_id: {_eq: $contest_id}}) {
    event
    start
    end
    description
  }
}
    `;

/**
 * __useGetContestTimesQuery__
 *
 * To run a query within a React component, call `useGetContestTimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContestTimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContestTimesQuery({
 *   variables: {
 *      contest_id: // value for 'contest_id'
 *   },
 * });
 */
export function useGetContestTimesQuery(baseOptions: Apollo.QueryHookOptions<GetContestTimesQuery, GetContestTimesQueryVariables> & ({ variables: GetContestTimesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContestTimesQuery, GetContestTimesQueryVariables>(GetContestTimesDocument, options);
      }
export function useGetContestTimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContestTimesQuery, GetContestTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContestTimesQuery, GetContestTimesQueryVariables>(GetContestTimesDocument, options);
        }
export function useGetContestTimesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetContestTimesQuery, GetContestTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContestTimesQuery, GetContestTimesQueryVariables>(GetContestTimesDocument, options);
        }
export type GetContestTimesQueryHookResult = ReturnType<typeof useGetContestTimesQuery>;
export type GetContestTimesLazyQueryHookResult = ReturnType<typeof useGetContestTimesLazyQuery>;
export type GetContestTimesSuspenseQueryHookResult = ReturnType<typeof useGetContestTimesSuspenseQuery>;
export type GetContestTimesQueryResult = Apollo.QueryResult<GetContestTimesQuery, GetContestTimesQueryVariables>;
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
    query GetHonorApplications($uuid: uuid!, $_gte: timestamptz!) {
  honor_application(
    where: {student_uuid: {_eq: $uuid}, updated_at: {_gte: $_gte}, created_at: {_gte: $_gte}}
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
 *      uuid: // value for 'uuid'
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
    student_byuuid {
      uuid
      realname
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
    mutation AddHonorApplication($student_uuid: uuid!, $honor: String!, $statement: String!, $attachment_url: String) {
  insert_honor_application(
    objects: {student_uuid: $student_uuid, honor: $honor, statement: $statement, attachment_url: $attachment_url}
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
 *      student_uuid: // value for 'student_uuid'
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
export const GetDepartmentsDocument = gql`
    query GetDepartments {
  department {
    name
  }
}
    `;

/**
 * __useGetDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
      }
export function useGetDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
        }
export function useGetDepartmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(GetDepartmentsDocument, options);
        }
export type GetDepartmentsQueryHookResult = ReturnType<typeof useGetDepartmentsQuery>;
export type GetDepartmentsLazyQueryHookResult = ReturnType<typeof useGetDepartmentsLazyQuery>;
export type GetDepartmentsSuspenseQueryHookResult = ReturnType<typeof useGetDepartmentsSuspenseQuery>;
export type GetDepartmentsQueryResult = Apollo.QueryResult<GetDepartmentsQuery, GetDepartmentsQueryVariables>;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
  users(where: {email: {_eq: $email}}) {
    uuid
  }
}
    `;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables> & ({ variables: GetUserByEmailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export function useGetUserByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailSuspenseQueryHookResult = ReturnType<typeof useGetUserByEmailSuspenseQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetUserByPhoneDocument = gql`
    query GetUserByPhone($phone: String!) {
  users(where: {phone: {_eq: $phone}}) {
    uuid
  }
}
    `;

/**
 * __useGetUserByPhoneQuery__
 *
 * To run a query within a React component, call `useGetUserByPhoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByPhoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByPhoneQuery({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useGetUserByPhoneQuery(baseOptions: Apollo.QueryHookOptions<GetUserByPhoneQuery, GetUserByPhoneQueryVariables> & ({ variables: GetUserByPhoneQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>(GetUserByPhoneDocument, options);
      }
export function useGetUserByPhoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>(GetUserByPhoneDocument, options);
        }
export function useGetUserByPhoneSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>(GetUserByPhoneDocument, options);
        }
export type GetUserByPhoneQueryHookResult = ReturnType<typeof useGetUserByPhoneQuery>;
export type GetUserByPhoneLazyQueryHookResult = ReturnType<typeof useGetUserByPhoneLazyQuery>;
export type GetUserByPhoneSuspenseQueryHookResult = ReturnType<typeof useGetUserByPhoneSuspenseQuery>;
export type GetUserByPhoneQueryResult = Apollo.QueryResult<GetUserByPhoneQuery, GetUserByPhoneQueryVariables>;
export const GetUser_IdDocument = gql`
    query GetUser_Id($email: String!, $realname: String!) {
  users(where: {email: {_eq: $email}, realname: {_eq: $realname}}) {
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
 *      realname: // value for 'realname'
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