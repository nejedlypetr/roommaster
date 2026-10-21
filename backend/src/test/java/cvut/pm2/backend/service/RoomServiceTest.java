package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.EquipmentDao;
import cvut.pm2.backend.dao.FaultLogDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.response.DetailRoomResponseDto;
import cvut.pm2.backend.dto.response.RoomResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.model.Equipment;
import cvut.pm2.backend.model.FaultLog;
import cvut.pm2.backend.model.Room;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class RoomServiceTest {
    @Mock
    private RoomDao roomDao;

    @Mock
    private EquipmentDao equipmentDao;
    @Mock
    private FaultLogDao faultLogDao;

    @InjectMocks
    private RoomService roomService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        Room room1 = new Room();
        Room room2 = new Room();

        when(roomDao.findAll()).thenReturn(List.of(room1,room2));

        List<RoomResponseDto> result = roomService.findAll();

        assertEquals(2, result.size());
        verify(roomDao, times(1)).findAll();
    }

    @Test
    void testFindWithEquipmentAndFaults() {
        Long roomId = 2L;
        Room room = new Room();
        Equipment equipment = new Equipment();
        FaultLog faultLog = new FaultLog();
        equipment.setRoom(room);
        faultLog.setRoom(room);
        faultLog.setResolved(true);

        // Mock DAOs to return equipment and fault log lists for the specified room
        when(faultLogDao.findByRoom(room)).thenReturn(List.of(faultLog));
        when(equipmentDao.findByRoom(room)).thenReturn(List.of(equipment));
        when(roomDao.find(roomId)).thenReturn(Optional.of(room));

        // Call the find method on roomService and capture the result
        DetailRoomResponseDto dto = roomService.find(roomId);

        // Verify the returned dto contains the expected equipment and fault log counts
        assertEquals(1, dto.getEquipment().size());
        assertEquals(1, dto.getFaultLogs().size());

        // Verify equipmentDao and faultLogDao were called once for the room
        verify(equipmentDao, times(1)).findByRoom(room);
        verify(faultLogDao, times(1)).findByRoom(room);
    }

    @Test
    void findWithWrongIdThrowsNotFoundException() {
        Long roomId = 1L;
        when(roomDao.find(roomId)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> roomService.find(roomId));
        verify(roomDao,times(1)).find(roomId);
    }
}
