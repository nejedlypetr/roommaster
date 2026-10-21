package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.FaultLogDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateFaultRequestDto;
import cvut.pm2.backend.dto.request.ResolveFaultRequestDto;
import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.FaultMapper;
import cvut.pm2.backend.model.FaultLog;
import cvut.pm2.backend.model.Room;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FaultService {
    private final FaultLogDao faultDao;
    private final RoomDao roomDao;

    public FaultService(FaultLogDao faultDao, RoomDao roomDao) {
        this.faultDao = faultDao;
        this.roomDao = roomDao;
    }

    @Transactional
    public FaultResponseDto addFault(Long roomId, CreateFaultRequestDto faultRequest) throws NotFoundException {
        Room room = roomDao.find(roomId).orElseThrow(() -> new NotFoundException("Room with ID " + roomId + " not found"));

        FaultLog newFault = FaultLog.builder()
            .cause(faultRequest.getCause())
            .description(faultRequest.getDescription())
            .room(room)
            .created(LocalDateTime.now())
            .resolved(false)
            .build();

        faultDao.persist(newFault);
        return FaultMapper.toDto(newFault);
    }


    @Transactional
    public FaultResponseDto resolve(Long faultId, ResolveFaultRequestDto resolveFaultRequestDto) throws NotFoundException {
        return FaultMapper.toDto(faultDao.resolveFault(faultId, resolveFaultRequestDto.isResolved()));
    }

    @Transactional
    public List<FaultResponseDto> findAll() {
        return faultDao.findAll().stream()
                .map(FaultMapper::toDto)
                .toList();
    }
}
