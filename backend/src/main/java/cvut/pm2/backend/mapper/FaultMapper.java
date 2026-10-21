package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.model.FaultLog;

public class FaultMapper {
    public static FaultResponseDto toDto(FaultLog faultLog) {
        if (faultLog == null) {
            return null;
        }

        FaultResponseDto dto = new FaultResponseDto();
        dto.setId(faultLog.getId());
        dto.setRoomId(faultLog.getRoom().getId());
        dto.setCause(faultLog.getCause());
        dto.setDescription(faultLog.getDescription());
        dto.setCreated(faultLog.getCreated());
        dto.setResolved(faultLog.getResolved());
        return dto;
    }
}
