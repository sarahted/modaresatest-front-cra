import axios from "axios";
import { MutationKey, useMutation } from "react-query";
import { AppointmentDataCreateType } from "../../types/AppointmentDataCreate.type";
import { ClientDataType } from "../../types/ClientData.type";
import { StaffMemberDataType } from "../../types/StaffMemberData.type";

export const useCreateDataOf = (entity: String) => {
  return useMutation(
    entity as MutationKey,
    (
      body:
        | AppointmentDataCreateType
        | Omit<ClientDataType, "id">
        | Omit<StaffMemberDataType, "id">
    ) => {
      return axios.post(`/${entity}/create`, body);
    }
  );
};
