package cvut.pm2.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room", schema = "room_master")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private RoomType roomType;

    @Column(name = "room_number", nullable = false)
    private Integer roomNumber;

    @Column(name = "opening_time", nullable = false)
    private Integer openingTime;

    @Column(name = "closing_time", nullable = false)
    private Integer closingTime;

    @Column(nullable = false)
    private Integer capacity;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department;
}
