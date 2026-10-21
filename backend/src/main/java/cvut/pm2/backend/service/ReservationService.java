package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.ReservationDao;
import cvut.pm2.backend.dao.RoomDao;
import cvut.pm2.backend.dto.request.CreateReservationRequestDto;
import cvut.pm2.backend.dto.response.ReservationResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.exception.ReservationAlreadyCancelledException;
import cvut.pm2.backend.exception.RoomNotAvailableException;
import cvut.pm2.backend.mapper.ReservationMapper;
import cvut.pm2.backend.model.Reservation;
import cvut.pm2.backend.model.ReservationStatus;
import cvut.pm2.backend.model.Room;
import cvut.pm2.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationDao reservationDao;
    private final RoomDao roomDao;

    public ReservationService(ReservationDao reservationDao, RoomDao roomDao) {
        this.reservationDao = reservationDao;
        this.roomDao = roomDao;
    }

    @Transactional
    public List<ReservationResponseDto> findAllByUser(Long userId) {
        return reservationDao.findAllByUser(userId).stream()
                .map(ReservationMapper::toDto)
                .toList();
    }

    @Transactional
    public void cancelReservation(Long reservationId) throws NotFoundException, ReservationAlreadyCancelledException {
        reservationDao.cancelReservation(reservationId);
    }

    @Transactional
    public ReservationResponseDto createReservation(CreateReservationRequestDto request, User user)
            throws NotFoundException, RoomNotAvailableException {
        validateCreateReservation(request);
        Room room = roomDao.find(request.getRoomId())
                .orElseThrow(() -> new NotFoundException("Room with ID " + request.getRoomId() + " not found"));

        Reservation newReservation = Reservation.builder()
                .room(room)
                .user(user)
                .purpose(request.getPurpose())
                .startTimeSlot(request.getStartTimeSlot())
                .endTimeSlot(request.getEndTimeSlot())
                .description(request.getDescription())
                .status(ReservationStatus.ACTIVE)
                .reservationDate(request.getReservationDate())
                .created(LocalDateTime.now())
                .build();

        reservationDao.persist(newReservation);
        return ReservationMapper.toDto(newReservation);
    }

    public List<ReservationResponseDto> findAllByDateAndRoom(LocalDate date, Long roomId) {
        return reservationDao.findAllByDateAndRoom(date,roomId).stream()
                .map(ReservationMapper::toDto)
                .toList();
    }

    private void validateCreateReservation(CreateReservationRequestDto request) throws RoomNotAvailableException {
        List<Reservation> reservations = reservationDao.findAllByDateAndRoom(request.getReservationDate(),
                request.getRoomId());
        int wantedStart = request.getStartTimeSlot();
        int wantedEnd = request.getEndTimeSlot();

        for (Reservation reservation : reservations) {
            int start = reservation.getStartTimeSlot();
            int end = reservation.getEndTimeSlot();

            if ((end > wantedStart && start < wantedEnd)) { // reservations are overlapping, thus new reservation
                                                              // cannot be created
                throw new RoomNotAvailableException("Room is not available in these timeslots.");
            }
        }
    }
}
