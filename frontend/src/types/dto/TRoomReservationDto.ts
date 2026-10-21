import { TReservation } from "@/types/TReservation";

export type TRoomReservationDto = TReservation & {
    user: {
        firstName: string;
        lastName: string;
    };
};
