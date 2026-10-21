package cvut.pm2.backend.dao;

import cvut.pm2.backend.BackendApplication;
import cvut.pm2.backend.config.JacksonConfig;
import cvut.pm2.backend.exception.PersistenceException;
import cvut.pm2.backend.model.Building;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@ComponentScan(basePackageClasses = BackendApplication.class)
@ContextConfiguration(classes = {JacksonConfig.class})
public class BuildingDaoTest {
    @Autowired
    private TestEntityManager em;

    @Autowired
    private BuildingDao dao;

    private Building building1;
    private Building building2;

    @BeforeEach
    public void setUp() {
        building1 = new Building();
        building2 = new Building();

        building1.setName("Test building 1");
        building1.setStreet("Test street 1");
        building1.setCity("Test city 1");
        building1.setPostalCode("123 1");

        building2.setName("Test building 2");
        building2.setStreet("Test street 2");
        building2.setCity("Test city 2");
        building2.setPostalCode("123 2");
    }

    @Test
    public void persistSavesSpecifiedInstance() {
        dao.persist(building1);
        assertNotNull(building1.getId());

        final Building result = em.find(Building.class, building1.getId());
        assertNotNull(result);
        assertEquals(building1.getId(), result.getId());
        assertEquals(building1.getName(), result.getName());
    }

    @Test
    public void findRetrievesInstanceByIdentifier() {
        em.persistAndFlush(building1);
        assertNotNull(building1.getId());

        final Building result = dao.find(building1.getId()).orElse(null);
        assertNotNull(result);
        assertEquals(building1.getId(), result.getId());
        assertEquals(building1.getName(), result.getName());
    }

    @Test
    public void findAllRetrievesAllInstancesOfType() {
        em.persistAndFlush(building1);
        em.persistAndFlush(building2);

        final List<Building> result = dao.findAll();
        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(c -> c.getId().equals(building1.getId())));
        assertTrue(result.stream().anyMatch(c -> c.getId().equals(building2.getId())));
    }

    @Test
    public void updateUpdatesExistingInstance() {
        em.persistAndFlush(building1);

        final Building update = new Building();
        update.setId(building1.getId());
        final String newName = "New building1 name";
        update.setName(newName);
        dao.update(update);

        final Building result = dao.find(building1.getId()).orElse(null);
        assertNotNull(result);
        assertEquals(newName, result.getName());
    }

    @Test
    public void removeRemovesSpecifiedInstance() {
        em.persistAndFlush(building1);
        assertNotNull(em.find(Building.class, building1.getId()));
        em.detach(building1);

        dao.remove(building1);
        assertNull(em.find(Building.class, building1.getId()));
    }

    @Test
    public void removeDoesNothingWhenInstanceDoesNotExist() {
        building1.setId((long) 123);
        assertNull(em.find(Building.class, building1.getId()));

        dao.remove(building1);
        assertNull(em.find(Building.class, building1.getId()));
    }

    @Test
    public void exceptionOnPersistInWrappedInPersistenceException() {
        em.persistAndFlush(building1);
        em.remove(building1);
        assertThrows(PersistenceException.class, () -> dao.update(building1));
    }

    @Test
    public void existsReturnsTrueForExistingIdentifier() {
        em.persistAndFlush(building1);
        assertTrue(dao.exists(building1.getId()));
        assertFalse(dao.exists((long) -1));
    }
}