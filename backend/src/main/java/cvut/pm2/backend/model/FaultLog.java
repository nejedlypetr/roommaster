package cvut.pm2.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedQueries({
        @NamedQuery(name = "FaultLog.findByRoom",query = "SELECT f from FaultLog f WHERE room.id = :roomId")
})
@Table(name = "fault_log", schema = "room_master")
public class FaultLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String cause;

    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private Boolean resolved;
}
