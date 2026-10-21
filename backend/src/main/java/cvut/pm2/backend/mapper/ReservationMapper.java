package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.ReservationResponseDto;
import cvut.pm2.backend.model.Reservation;

public class ReservationMapper {
    public static ReservationResponseDto toDto(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        ReservationResponseDto dto = new ReservationResponseDto();
        dto.setId(reservation.getId());
        dto.setRoomId(reservation.getRoom().getId());
        dto.setRoomNumber(reservation.getRoom().getRoomNumber());
        dto.setFloorNumber(reservation.getRoom().getFloor().getFloorNumber());
        dto.setBuildingName(reservation.getRoom().getFloor().getBuilding().getName());
        dto.setUserId(reservation.getUser().getId());
        dto.setFirstName(reservation.getUser().getFirstName());
        dto.setLastName(reservation.getUser().getLastName());
        dto.setPurpose(reservation.getPurpose());
        dto.setStartTimeSlot(reservation.getStartTimeSlot());
        dto.setEndTimeSlot(reservation.getEndTimeSlot());
        dto.setCreated(reservation.getCreated());
        dto.setDescription(reservation.getDescription());
        dto.setStatus(reservation.getStatus());
        dto.setReservationDate(reservation.getReservationDate());
        return dto;
    }
}
