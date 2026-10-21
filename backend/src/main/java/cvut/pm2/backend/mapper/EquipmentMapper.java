package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.EquipmentResponseDto;
import cvut.pm2.backend.model.Equipment;

public class EquipmentMapper {
    public static EquipmentResponseDto toDto(Equipment equipment) {
        if (equipment == null) {
            return null;
        }

        EquipmentResponseDto dto = new EquipmentResponseDto();
        dto.setId(equipment.getId());
        dto.setRoomId(equipment.getRoom().getId());
        dto.setEquipmentType(equipment.getEquipmentType());
        dto.setQuantity(equipment.getQuantity());
        return dto;
    }
}
