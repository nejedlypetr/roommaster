package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.ReservationDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateReservationRequestDto;
import cvut.pm2.backend.dto.response.ReservationResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.exception.RoomNotAvailableException;
import cvut.pm2.backend.model.*;
import cvut.pm2.backend.security.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReservationServiceTest {
    @Mock
    private ReservationDao reservationDao;

    @Mock
    private RoomDao roomDao;

    @InjectMocks
    private ReservationService reservationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllByUser() {
        // Set up test data: a user ID and a reservation associated with a room
        Long userId = 1L;
        Reservation reservation = new Reservation();
        Room room = new Room();
        Building building = new Building();
        Floor floor = new Floor();
        floor.setFloorNumber(2);
        floor.setBuilding(building);
        building.setName("Test building");
        room.setFloor(floor);
        room.setId(2L);
        reservation.setId(1L);
        reservation.setRoom(room);
        reservation.setUser(new User());

        // Mock the reservationDao to return the reservation when findAllByUser is called
        when(reservationDao.findAllByUser(userId)).thenReturn(List.of(reservation));

        // Call the method to test and verify the returned data
        List<ReservationResponseDto> result = reservationService.findAllByUser(userId);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getId());

        // Verify that findAllByUser was called exactly once
        verify(reservationDao, times(1)).findAllByUser(userId);
    }

    @Test
    void cancelReservationSuccess() throws NotFoundException {
        Long reservationId = 1L;

        doNothing().when(reservationDao).cancelReservation(reservationId);

        assertDoesNotThrow(() -> reservationService.cancelReservation(reservationId));

        verify(reservationDao, times(1)).cancelReservation(reservationId);
    }

    @Test
    void cancelReservationWithWrongIdThrowsNotFoundException() {
        Long reservationId = 1L;

        doThrow(new NotFoundException("Reservation not found")).when(reservationDao).cancelReservation(reservationId);

        assertThrows(NotFoundException.class, () -> reservationService.cancelReservation(reservationId));

        verify(reservationDao, times(1)).cancelReservation(reservationId);
    }

    @Test
    void createReservationSuccess() {
        CreateReservationRequestDto dto = new CreateReservationRequestDto();
        Room room = Mockito.mock(Room.class);
        Building building = new Building();
        Floor floor = new Floor();
        User user = new User();

        floor.setFloorNumber(2);
        floor.setBuilding(building);
        building.setName("Test building");
        user.setId(1L);
        dto.setRoomId(1L);
        dto.setStartTimeSlot(2);
        dto.setEndTimeSlot(4);

        // Mock roomDao to return an optional room when find is called with the roomId
        when(roomDao.find(dto.getRoomId())).thenReturn(Optional.of(room));
        when(room.getFloor()).thenReturn(floor);

        // Call createReservation and capture the response
        ReservationResponseDto responseDto = reservationService.createReservation(dto,user);

        // Assert that the response has the expected start and end time slots
        assertEquals(2, responseDto.getStartTimeSlot());
        assertEquals(4, responseDto.getEndTimeSlot());

        // Verify roomDao's find method and reservationDao's persist method are called once
        verify(roomDao, times(1)).find(dto.getRoomId());
        verify(reservationDao, times(1)).persist(any(Reservation.class));
    }

    @Test
    void createReservationWithWrongRoomIdThrowsRoomNotFoundException() {
        CreateReservationRequestDto dto = new CreateReservationRequestDto();
        User user = new User();
        user.setId(1L);
        dto.setRoomId(1L);
        dto.setStartTimeSlot(2);
        dto.setEndTimeSlot(4);

        // Mock roomDao to return an empty Optional when find is called with the roomId
        when(roomDao.find(dto.getRoomId())).thenReturn(Optional.empty());

        // Assert that a NotFoundException is thrown when createReservation is called
        assertThrows(NotFoundException.class, () -> reservationService.createReservation(dto, user));

        // Verify roomDao's find method was called once and reservationDao's persist method was never called
        verify(roomDao, times(1)).find(dto.getRoomId());
        verify(reservationDao, never()).persist(any(Reservation.class));
    }

    @Test
    void createReservationInReservedRoomThrowsRoomNotAvailableException() {
        // Setup
        CreateReservationRequestDto dto = new CreateReservationRequestDto();
        Room room = Mockito.mock(Room.class);
        User user = new User();
        user.setId(1L);
        Long roomId = 1L;
        LocalDate date = LocalDate.now();
        Reservation reservation = new Reservation();
        reservation.setStartTimeSlot(1);
        reservation.setEndTimeSlot(5);

        dto.setRoomId(roomId);
        // Make sure that the time slots (1-5 and 4-8) are overlapping ( = there is a collision)
        dto.setStartTimeSlot(4);
        dto.setEndTimeSlot(8);
        dto.setReservationDate(date);

        // Mock roomDao to return a room and reservationDao to return an overlapping reservation
        when(roomDao.find(dto.getRoomId())).thenReturn(Optional.of(room));
        when(reservationDao.findAllByDateAndRoom(date, roomId)).thenReturn(List.of(reservation));

        // Assert that a RoomNotAvailableException is thrown due to overlapping reservation
        assertThrows(RoomNotAvailableException.class, () -> reservationService.createReservation(dto,user));

        // Verify reservationDao's findAllByDateAndRoom method was called once and no reservation was persisted
        verify(reservationDao,times(1)).findAllByDateAndRoom(date,roomId);
        verify(roomDao, never()).find(dto.getRoomId());
        verify(reservationDao, never()).persist(any(Reservation.class));
    }
}
