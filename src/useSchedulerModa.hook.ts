import {
  EventActions,
  ProcessedEvent,
} from "@aldabil/react-scheduler/dist/types";
import { parseISO } from "date-fns";
import { useCreateDataOf } from "./api/mutations/useCreateDataOf";
import { useGetAllDataOf } from "./api/queries/useGetAllDataOf";
import { AppointmentDataType } from "./types/AppointmentData.type";
import { ClientDataType } from "./types/ClientData.type";
import { StaffMemberDataType } from "./types/StaffMemberData.type";

export function useSchedulerModaHook() {
  // Queries
  const appointmentsQuery = useGetAllDataOf("appointment");
  const clientsQuery = useGetAllDataOf("client");
  const staffsQuery = useGetAllDataOf("staff-member");

  const formattedAppointmentsData =
    appointmentsQuery.data &&
    appointmentsQuery.data.map((appointment: AppointmentDataType) => {
      return {
        event_id: appointment.id,
        title: `${appointment.name} between ${appointment.client.name} and ${appointment.staffMember.lastName} ${appointment.staffMember.firstName}`,
        start: new Date(parseISO(appointment.startDate)),
        end: new Date(parseISO(appointment.endDate)),
      };
    });

  const formattedClientsData =
    clientsQuery.data &&
    clientsQuery.data.map((client: ClientDataType) => {
      return {
        id: client.id,
        text: client.name,
        value: client.id,
      };
    });
  const formattedStaffsData =
    staffsQuery.data &&
    staffsQuery.data.map((member: StaffMemberDataType) => {
      return {
        id: member.id,
        text: `${member.firstName} ${member.lastName}`,
        value: member.id,
      };
    });
  const appointmentMutation = useCreateDataOf("appointment");
  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    let eventId = event.event_id;
    if (action === "create") {
      const { data } = await appointmentMutation.mutateAsync({
        startDate: event.start,
        endDate: event.end,
        name: event.title,
        clientId: event.clientId,
        staffMemberId: event.staffMemberId,
      });
      eventId = data;
    }
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: eventId,
        });
      }, 0);
    });
  };
  return {
    formattedAppointmentsData,
    formattedClientsData,
    formattedStaffsData,
    isLoading:
      appointmentsQuery.isLoading &&
      staffsQuery.isLoading &&
      clientsQuery.isLoading,
    handleConfirm,
  };
}
