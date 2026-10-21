package cvut.pm2.backend.dao;

import cvut.pm2.backend.model.Floor;
import org.springframework.stereotype.Repository;

@Repository
public class FloorDao extends BaseDao<Floor> {
    public FloorDao() {
        super(Floor.class);
    }
}
