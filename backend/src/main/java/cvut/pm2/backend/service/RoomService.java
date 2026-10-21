package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.EquipmentDao;
import cvut.pm2.backend.dao.FaultLogDao;
import cvut.pm2.backend.dao.FloorDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateRoomRequestDto;
import cvut.pm2.backend.dto.response.DetailRoomResponseDto;
import cvut.pm2.backend.dto.response.EquipmentResponseDto;
import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.dto.response.RoomResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.DetailRoomMapper;
import cvut.pm2.backend.mapper.EquipmentMapper;
import cvut.pm2.backend.mapper.FaultMapper;
import cvut.pm2.backend.mapper.RoomMapper;
import cvut.pm2.backend.model.Room;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomService {
    private final RoomDao roomDao;
    private final EquipmentDao equipmentDao;
    private final FaultLogDao faultLogDao;
    private final FloorDao floorDao;

    public RoomService(RoomDao roomDao, EquipmentDao equipmentDao, FaultLogDao faultLogDao, FloorDao floorDao) {
        this.roomDao = roomDao;
        this.equipmentDao = equipmentDao;
        this.faultLogDao = faultLogDao;
        this.floorDao = floorDao;
    }

    @Transactional(readOnly = true)
    public List<RoomResponseDto> findAll() {
        return roomDao.findAll().stream()
                .map(RoomMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public DetailRoomResponseDto find(Long roomId) throws NotFoundException {
        Room room = roomDao.find(roomId).orElseThrow(() -> new NotFoundException("Room not found"));
        List<EquipmentResponseDto> roomEquipment = equipmentDao.findByRoom(room).stream()
                .map(EquipmentMapper::toDto)
                .toList();
        List<FaultResponseDto> roomFaults = faultLogDao.findByRoom(room).stream()
                .map(FaultMapper::toDto)
                .toList();

        return DetailRoomMapper.toDto(room,roomEquipment,roomFaults);
    }

    @Transactional
    public RoomResponseDto create(CreateRoomRequestDto requestDto) {
        Room room = Room.builder()
                .floor(floorDao.find(requestDto.getFloorId()).orElseThrow(() -> new NotFoundException("Floor with ID " + requestDto.getFloorId() + " not found")))
                .roomType(requestDto.getRoomType())
                .roomNumber(requestDto.getRoomNumber())
                .openingTime(requestDto.getOpeningTime())
                .closingTime(requestDto.getClosingTime())
                .capacity(requestDto.getCapacity())
                .description(requestDto.getDescription())
                .department(requestDto.getDepartment())
                .build();
        roomDao.persist(room);
        return RoomMapper.toDto(room);
    }

    @Transactional
    public void delete(Long roomId) {
        roomDao.remove(roomDao.find(roomId).orElseThrow(() -> new NotFoundException("Room with ID " + roomId + " not found")));
    }
}
