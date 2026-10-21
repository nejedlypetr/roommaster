package cvut.pm2.backend.dao;

import cvut.pm2.backend.model.Building;
import org.springframework.stereotype.Repository;

@Repository
public class BuildingDao extends BaseDao<Building> {
    public BuildingDao() {
        super(Building.class);
    }
}
