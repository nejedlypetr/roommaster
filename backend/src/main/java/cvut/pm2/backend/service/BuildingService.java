package cvut.pm2.backend.service;

import cvut.pm2.backend.dto.request.CreateBuildingRequestDto;
import cvut.pm2.backend.dto.response.BuildingResponseDto;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.BuildingMapper;
import cvut.pm2.backend.model.Building;
import org.springframework.stereotype.Service;

import cvut.pm2.backend.dao.BuildingDao;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BuildingService {

    private final BuildingDao buildingDao;

    public BuildingService(BuildingDao buildingDao) {
        this.buildingDao = buildingDao;
    }

    @Transactional
    public List<BuildingResponseDto> findAll() {
        return buildingDao.findAll().stream()
                .map(BuildingMapper::toDto)
                .toList();
    }

    @Transactional
    public BuildingResponseDto create(CreateBuildingRequestDto requestDto) {
        Building building = Building.builder()
                .name(requestDto.getName())
                .street(requestDto.getStreet())
                .city(requestDto.getCity())
                .postalCode(requestDto.getPostalCode())
                .build();

        buildingDao.persist(building);
        return BuildingMapper.toDto(building);
    }


    @Transactional
    public void delete(Long buildingId) {
        buildingDao.remove(buildingDao.find(buildingId).orElseThrow(() -> new NotFoundException("Building with ID " + buildingId + " not found")));
    }
}
