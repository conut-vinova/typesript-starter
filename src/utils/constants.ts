export enum STATUS_CODE {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}

export enum PERMISSION {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

export enum SORT_DIRECTION {
  ASC = 1,
  DESC = -1,
}

export enum SORT_FIELD {
  CREATED_AT = 'created_at',
  ID = 'id',
  USER_NAME = 'user_name',
  EMAIL = 'email',
  USER_ROLE = 'user_role',
  STATUS = 'status',
  COUNTRY = 'country',
  BRAND = 'brand_id',
  SIGN_UP_DATE = 'sign_up_date',
  BRAND_CODE = 'code',
  BRAND_NAME = 'name',
  COUNTRY_NAME = 'name',
}
