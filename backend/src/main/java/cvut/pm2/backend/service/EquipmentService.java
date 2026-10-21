package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.EquipmentDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateEquipmentRequestDto;
import cvut.pm2.backend.dto.response.EquipmentResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.EquipmentMapper;
import cvut.pm2.backend.model.Equipment;
import cvut.pm2.backend.model.Room;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EquipmentService {
    private final EquipmentDao equipmentDao;
    private final RoomDao roomDao;

    public EquipmentService(EquipmentDao equipmentDao, RoomDao roomDao) {
        this.equipmentDao = equipmentDao;
        this.roomDao = roomDao;
    }

    @Transactional(readOnly = true)
    public List<EquipmentResponseDto> getAllEquipment() {
        return equipmentDao.findAll().stream()
                .map(EquipmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public EquipmentResponseDto createEquipment(Long roomId, CreateEquipmentRequestDto request)
            throws NotFoundException {
        Room room = roomDao.find(roomId)
                .orElseThrow(() -> new NotFoundException("Room with ID " + roomId + " not found"));

        Equipment equipment = Equipment.builder()
                .equipmentType(request.getEquipmentType())
                .room(room)
                .quantity(request.getQuantity())
                .build();

        equipmentDao.persist(equipment);
        return EquipmentMapper.toDto(equipment);
    }

    @Transactional
    public void deleteEquipment(Long equipmentId) throws NotFoundException {
        Equipment equipment = equipmentDao.find(equipmentId)
                .orElseThrow(() -> new NotFoundException("Equipment with ID " + equipmentId + " not found"));

        equipmentDao.remove(equipment);
    }
}
