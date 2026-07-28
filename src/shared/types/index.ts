export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type ApiListResponse<T> = {
  data: T[];
  meta: Pagination;
};

export type ApiItemResponse<T> = {
  data: T;
};
