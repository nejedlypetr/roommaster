package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.DetailRoomResponseDto;
import cvut.pm2.backend.dto.response.EquipmentResponseDto;
import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.dto.response.RoomResponseDto;
import cvut.pm2.backend.model.Equipment;
import cvut.pm2.backend.model.FaultLog;
import cvut.pm2.backend.model.Room;

import java.util.List;

public class DetailRoomMapper {
    public static DetailRoomResponseDto toDto(Room room, List<EquipmentResponseDto> equipment, List<FaultResponseDto> faultLogs) {
        if (room == null) {
            return null;
        }
        DetailRoomResponseDto dto = new DetailRoomResponseDto();
        dto.setRoomData(RoomMapper.toDto(room));
        dto.setEquipment(equipment);
        dto.setFaultLogs(faultLogs);
        return dto;
    }
}
