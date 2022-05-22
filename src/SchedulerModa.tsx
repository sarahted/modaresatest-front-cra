import { Scheduler } from "@aldabil/react-scheduler";
import { useSchedulerModaHook } from "./useSchedulerModa.hook";

export function SchedulerModa() {
  const {
    formattedAppointmentsData,
    formattedClientsData,
    formattedStaffsData,
    isLoading,
    handleConfirm,
  } = useSchedulerModaHook();
  return (
    <Scheduler
      loading={isLoading}
      view="week"
      events={formattedAppointmentsData}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      month={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
      }}
      day={{
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      fields={[
        {
          name: "clientId",
          type: "select",
          options: formattedClientsData,
          config: {
            label: "Client",
            required: true,
            errMsg: "Please select a client",
          },
        },
        {
          name: "staffMemberId",
          type: "select",
          options: formattedStaffsData,
          config: {
            label: "StaffMember",
            required: true,
            errMsg: "Please select a staff member",
          },
        },
      ]}
      onConfirm={handleConfirm}
    />
  );
}
