package cvut.pm2.backend.dao;

import cvut.pm2.backend.model.Room;
import org.springframework.stereotype.Repository;

@Repository
public class RoomDao extends BaseDao<Room> {
    public RoomDao() {
        super(Room.class);
    }
}
