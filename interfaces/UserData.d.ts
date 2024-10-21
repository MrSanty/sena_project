export interface CreateFormUser {
  type_doc: string;
  num_doc: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface DataUserType {
  id: number;
  type_doc: string;
  num_doc: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export interface UpdateFormUser {
  type_doc: string;
  num_doc: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type CreateUserServer = CreateFormUser & {
  company_id: number;
  user_roles: number[];
  user_permissions: number[];
}

export type UpdateUserServer = UpdateFormUser & {
  id: number;
}