export type AppointmentDataType = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  client: {
    id: number;
    name: string;
  };

  staffMember: {
    id: number;
    lastName: string;
    firstName: string;
  };
};
