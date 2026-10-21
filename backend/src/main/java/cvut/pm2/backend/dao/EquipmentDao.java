package cvut.pm2.backend.dao;

import cvut.pm2.backend.model.Equipment;
import cvut.pm2.backend.model.Room;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EquipmentDao extends BaseDao<Equipment> {
    public EquipmentDao() {
        super(Equipment.class);
    }

    public List<Equipment> findByRoom(Room room) {
        return em.createNamedQuery("Equipment.findByRoom", Equipment.class).setParameter("roomId",room.getId()).getResultList();
    }
}
