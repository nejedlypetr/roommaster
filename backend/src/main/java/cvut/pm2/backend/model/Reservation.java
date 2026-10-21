package cvut.pm2.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedQueries({
        @NamedQuery(name = "Reservation.findByUser",query = "SELECT r from Reservation r WHERE user.id = :userId"),
        @NamedQuery(name = "Reservation.findByDateAndRoom",query = "SELECT r from Reservation r WHERE reservationDate = :reservationDate AND room.id=:roomId")
})
@Table(name = "reservation", schema = "room_master")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationPurpose purpose;

    @Column(name = "start_time_slot", nullable = false)
    private Integer startTimeSlot;

    @Column(name = "end_time_slot", nullable = false)
    private Integer endTimeSlot;

    @Column(nullable = false)
    private LocalDateTime created;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;
}
