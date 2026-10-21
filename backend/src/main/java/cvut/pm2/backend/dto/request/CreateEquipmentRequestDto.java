package cvut.pm2.backend.dto.request;

import cvut.pm2.backend.model.EquipmentType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateEquipmentRequestDto {
    @NotNull
    private EquipmentType equipmentType;

    @NotNull
    @Min(1)
    private Integer quantity;
}