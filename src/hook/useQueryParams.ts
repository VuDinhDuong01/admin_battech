import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation()
  return queryString.parse(location.search);
}

