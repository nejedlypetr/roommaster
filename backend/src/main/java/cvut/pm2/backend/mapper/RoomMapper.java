package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.RoomResponseDto;
import cvut.pm2.backend.model.Room;

public class RoomMapper {
    public static RoomResponseDto toDto(Room room) {
        if (room == null) {
            return null;
        }

        RoomResponseDto dto = new RoomResponseDto();
        dto.setRoomId(room.getId());
        dto.setRoomType(room.getRoomType());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setOpeningTime(room.getOpeningTime());
        dto.setClosingTime(room.getClosingTime());
        dto.setCapacity(room.getCapacity());
        dto.setRoomDescription(room.getDescription());
        dto.setDepartment(room.getDepartment());

        if (room.getFloor() != null) {
            dto.setFloorId(room.getFloor().getId());
            dto.setFloorNumber(room.getFloor().getFloorNumber());

            if (room.getFloor().getBuilding() != null) {
                dto.setBuildingId(room.getFloor().getBuilding().getId());
                dto.setBuildingName(room.getFloor().getBuilding().getName());
                dto.setBuildingStreet(room.getFloor().getBuilding().getStreet());
                dto.setBuildingCity(room.getFloor().getBuilding().getCity());
                dto.setBuildingPostalCode(room.getFloor().getBuilding().getPostalCode());
            }
        }

        return dto;
    }
}
