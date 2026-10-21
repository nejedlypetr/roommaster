package cvut.pm2.backend.dao;

import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.exception.ReservationAlreadyCancelledException;
import cvut.pm2.backend.model.Reservation;
import cvut.pm2.backend.model.ReservationStatus;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class ReservationDao extends BaseDao<Reservation> {
    public ReservationDao() {
        super(Reservation.class);
    }

    public List<Reservation> findAllByUser(Long userId) {
        return em.createNamedQuery("Reservation.findByUser", Reservation.class).setParameter("userId", userId)
                .getResultList();
    }

    public List<Reservation> findAllByDateAndRoom(LocalDate date, Long roomId) {
        return em.createNamedQuery("Reservation.findByDateAndRoom", Reservation.class)
                .setParameter("reservationDate", date).setParameter("roomId", roomId).getResultList();
    }

    public void cancelReservation(Long reservationId) throws NotFoundException, ReservationAlreadyCancelledException {
        Reservation reservation = find(reservationId).orElseThrow(() -> new NotFoundException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new ReservationAlreadyCancelledException("Reservation is already cancelled");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        update(reservation);
    }
}
