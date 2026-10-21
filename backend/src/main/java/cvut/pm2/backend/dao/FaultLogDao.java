package cvut.pm2.backend.dao;

import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.model.FaultLog;
import cvut.pm2.backend.model.Room;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FaultLogDao extends BaseDao<FaultLog> {
    public FaultLogDao() {
        super(FaultLog.class);
    }

    public FaultLog resolveFault(Long faultId, boolean resolved) throws NotFoundException {
        FaultLog faultLog = find(faultId).orElseThrow(() -> new NotFoundException("Fault log not found"));
        faultLog.setResolved(resolved);
        return update(faultLog);
    }

    public List<FaultLog> findByRoom(Room room) {
        return em.createNamedQuery("FaultLog.findByRoom", FaultLog.class).setParameter("roomId",room.getId()).getResultList();
    }
}
