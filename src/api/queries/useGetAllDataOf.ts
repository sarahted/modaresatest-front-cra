import axios from "axios";
import { QueryKey, useQuery } from "react-query";

export const useGetAllDataOf = ( entity: String ) => {
  return useQuery(
    entity as QueryKey,
    () =>
      axios
        .get(`/${entity}/get-all`)
        .then((res) => res.data),
    { staleTime: 600000 }
  )
};


