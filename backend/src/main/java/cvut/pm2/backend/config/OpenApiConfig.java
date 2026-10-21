package cvut.pm2.backend.config;

import cvut.pm2.backend.dto.request.*;
import cvut.pm2.backend.dto.response.*;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

        @Bean
        public OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("Room Master API - OpenAPI 3.0")
                                                .version("1.0.0")
                                                .description(
                                                                "This is the API specification for the Room Master application, a room reservation system. It allows users to view available rooms, make reservations, manage their bookings, and more.")
                                                .contact(new Contact()
                                                                .name("Room Master team")
                                                                .email("support@roommaster.com")))
                                .components(new Components()
                                                .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                                                .type(SecurityScheme.Type.HTTP)
                                                                .scheme("bearer")
                                                                .bearerFormat("JWT"))
                                                .addSchemas("CreateReservationRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateReservationRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("ReservationResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<ReservationResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("RoomResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<RoomResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("DetailRoomResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<DetailRoomResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("EquipmentResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<EquipmentResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("UserResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<UserResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("FaultResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<FaultResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("CreateFaultRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateFaultRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("LoginUserResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<LoginUserResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("LoginRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<LoginRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("CreateUserRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateUserRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("CreateRoomRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateRoomRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("FloorResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<FloorResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("CreateFloorRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateFloorRequestDto>()
                                                                                .type("object"))
                                                .addSchemas("BuildingResponseDto",
                                                                new io.swagger.v3.oas.models.media.Schema<BuildingResponseDto>()
                                                                                .type("object"))
                                                .addSchemas("CreateBuildingRequestDto",
                                                                new io.swagger.v3.oas.models.media.Schema<CreateBuildingRequestDto>()
                                                                                .type("object")))
                                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
        }

        public GroupedOpenApi publicApi() {
                return GroupedOpenApi.builder()
                                .group("public")
                                .pathsToMatch("/v1/**")
                                .build();
        }
}
