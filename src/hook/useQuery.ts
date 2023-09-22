import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";

import { useQueryParams } from "./useQueryParams";
export interface QueryType {
  limit?: string,
  page?: string
}

export const useQueryString = () => {
  const query = useQueryParams()
  const queryString = omitBy({
    limit: query?.limit ?? '3',
    page: query?.page ?? '1',
    name: query?.name,
    sort_by: query?.sort_by,
    order: query?.order
  }, isUndefined)
  return queryString
}