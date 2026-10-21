package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.FaultLogDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateFaultRequestDto;
import cvut.pm2.backend.dto.request.CreateReservationRequestDto;
import cvut.pm2.backend.dto.request.ResolveFaultRequestDto;
import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.model.FaultLog;
import cvut.pm2.backend.model.Reservation;
import cvut.pm2.backend.model.Room;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class FaultServiceTest {
    @InjectMocks
    private FaultService faultService;

    @Mock
    private FaultLogDao faultLogDao;

    @Mock
    private RoomDao roomDao;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addFaultSuccess() {
        Long roomId = 1L;
        Room room = new Room();
        CreateFaultRequestDto faultRequest = new CreateFaultRequestDto();
        faultRequest.setCause("Leaking pipe");
        faultRequest.setDescription("The pipe under the sink is leaking");

        // Mock roomDao to return a room when find is called with roomId
        when(roomDao.find(roomId)).thenReturn(Optional.of(room));
        doNothing().when(faultLogDao).persist(any(FaultLog.class));

        // Call addFault and capture the response
        FaultResponseDto responseDto = faultService.addFault(roomId, faultRequest);

        // Assert that the response contains the expected cause and description
        assertNotNull(responseDto);
        assertEquals("Leaking pipe", responseDto.getCause());
        assertEquals("The pipe under the sink is leaking", responseDto.getDescription());

        // Verify roomDao’s find method was called once, and faultLogDao’s persist method was called once
        verify(roomDao, times(1)).find(roomId);
        verify(faultLogDao, times(1)).persist(any(FaultLog.class));
    }

    @Test
    void addFaultWithWrongRoomIdThrowsNotFoundException() {
        Long roomId = 1L;
        CreateFaultRequestDto faultRequest = new CreateFaultRequestDto();

        when(roomDao.find(roomId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> faultService.addFault(roomId, faultRequest));

        verify(roomDao, times(1)).find(roomId);
        verify(faultLogDao, never()).persist(any(FaultLog.class));
    }
}
