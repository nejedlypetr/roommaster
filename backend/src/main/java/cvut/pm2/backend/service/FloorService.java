package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.BuildingDao;
import cvut.pm2.backend.dao.FloorDao;
import cvut.pm2.backend.dto.request.CreateFloorRequestDto;
import cvut.pm2.backend.dto.response.FloorResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.FloorMapper;
import cvut.pm2.backend.model.Floor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FloorService {
    private final FloorDao floorDao;
    private final BuildingDao buildingDao;

    public FloorService(FloorDao floorDao, BuildingDao buildingDao) {
        this.floorDao = floorDao;
        this.buildingDao = buildingDao;
    }

    @Transactional
    public List<FloorResponseDto> findAll() {
        return floorDao.findAll().stream()
                .map(FloorMapper::toDto)
                .toList();
    }

    @Transactional
    public FloorResponseDto create(CreateFloorRequestDto requestDto) {
        Floor floor = Floor.builder()
                .floorNumber(requestDto.getFloorNumber())
                .building(buildingDao.find(requestDto.getBuildingId()).orElseThrow(() -> new NotFoundException("Build with ID " + requestDto.getBuildingId() + " not found")))
                .build();

        floorDao.persist(floor);
        return FloorMapper.toDto(floor);
    }

    @Transactional
    public void delete(Long floorId) {
        floorDao.remove(floorDao.find(floorId).orElseThrow(() -> new NotFoundException("Floor with ID " + floorId + " not found")));
    }
}
