import tw from "twin.macro";
import { DataTable } from "../../components/DataTable";
import { useRoomsColumnsDefinitions } from "./useRoomsColumnsDefinitions.tsx";
import { PageTitle } from "@/components/PageTitle";
import {useRoomsQuery} from "@/hooks/useRoomsQuery.ts";
import {useNavigate} from "react-router-dom";
import {AddRoomForm} from "@/pages/MaintainerPage/AddRoomForm.tsx";
import {AddBuildingForm} from "@/pages/MaintainerPage/AddBuildingForm.tsx";
import {useCreateRoomMutation} from "@/hooks/useCreateRoomMutation.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useBuildingColumnsDefinitions} from "@/pages/MaintainerPage/useBuildingColumnsDefinitions.tsx";
import {useBuildingsQuery} from "@/hooks/useBuildingsQuery.ts";
import {useCreateBuildingMutation} from "@/hooks/useCreateBuildingMutation.ts";
import {useFaultLogsQuery} from "@/hooks/useFaultLogsQuery.ts";
import {useFloorsQuery} from "@/hooks/useFloorsQuery.ts";
import {useFaultLogsColumnsDefinitions} from "@/pages/MaintainerPage/useFaultLogsColumnsDefinitions.tsx";
import {TFaultLog} from "@/types/TFaultLog.ts";
import {TFloor} from "@/types/TFloor.ts";
import {TRoom} from "@/types/TRoom.ts";
import {TBuilding} from "@/types/TBuilding.ts";
import {AddFloorForm} from "@/pages/MaintainerPage/AddFloorForm.tsx";
import {useFloorColumnsDefinitions} from "@/pages/MaintainerPage/useFloorColumnsDefinitions.tsx";
import {useCreateFloorMutation} from "@/hooks/useCreateFloorMutation.ts";
import {AddEquipmentForm} from "@/pages/MaintainerPage/AddEquipmentForm.tsx";
import {useEquipmentColumnsDefinitions} from "@/pages/MaintainerPage/useEquipmentColumnsDefinitions.tsx";
import {useEquipmentQuery} from "@/hooks/useEquipentQuery.ts";
import {TEquipment} from "@/types/TEquipment.ts";
import {useCreateEquipmentMutation} from "@/hooks/useCreateEquipmentMutation.ts";

const Container = tw.div`p-4`;

export function MaintainerPage() {
    const navigate = useNavigate();
    const { data: rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRoomsQuery();
    const { data: floors, isLoading: isFloorsLoading, isError: isFloorsError } = useFloorsQuery();
    const { data: buildings, isLoading: isBuildingsLoading, isError: isBuildingsError } = useBuildingsQuery();
    const { data: faultLogs, isLoading: isFaultLogsLoading, isError: isFaultLogsError } = useFaultLogsQuery();
    const { data: equipment, isLoading: isEquipmentLoading, isError: isEquipmentError } = useEquipmentQuery();

    const columnsBuildingDefinitions = useBuildingColumnsDefinitions();
    const columnsFloorDefinitions = useFloorColumnsDefinitions();
    const columnsRoomsEditDefinitions = useRoomsColumnsDefinitions({ onDetailsClick: (roomId: number) => navigate(`/rooms/${roomId}`) });
    const columnsFaultLogDefinitions = useFaultLogsColumnsDefinitions({onDetailsClick: (roomId: number) => navigate(`/rooms/${roomId}`) });
    const columnsEquipmentDefinitions = useEquipmentColumnsDefinitions({onDetailsClick: (roomId: number) => navigate(`/rooms/${roomId}`) });

    const MyTitle = tw.h2`text-black font-bold text-xl`;

    const { mutate: addBuilding } = useCreateBuildingMutation();
    const { mutate: addFloor } = useCreateFloorMutation();
    const { mutate: addRoom } = useCreateRoomMutation();
    const { mutate: addEquipment } = useCreateEquipmentMutation();

    // Check if either rooms or buildings are loading or have errors
    // TODO: in the future separate so we can display a message for each
    if (isRoomsLoading || isFloorsLoading || isBuildingsLoading || isFaultLogsLoading || isEquipmentLoading) return <div>Loading...</div>;
    if (isRoomsError || isFloorsError || isBuildingsError || isFaultLogsError || isEquipmentError) return <div>Error loading maintainer page</div>;

    return (
      <>
          <Container>
              <PageTitle primaryText="Maintainer Dashboard" secondaryText="DASHBOARD"/>


              {/* Buildings */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <MyTitle>Buildings management: </MyTitle>
                  <AddBuildingForm onSubmit={addBuilding}/>
              </div>
              <DataTable columns={columnsBuildingDefinitions} data={buildings} className={"pb-20"}/>


              {/* Floors */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <MyTitle>Floors management: </MyTitle>
                  <AddFloorForm onSubmit={addFloor} buildings={buildings}/>
              </div>
              <DataTable
                  columns={columnsFloorDefinitions}
                  data={floors.map((floor: TFloor) => {
                      const building = buildings.find((building: TBuilding) => building.id === floor.buildingId);
                      return {...floor, buildingName: building ? building.name : "Unknown Building",};
                  })}
                  className={"pb-20"}
              />


              {/* Rooms */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <MyTitle>Room management: </MyTitle>
                  <AddRoomForm onSubmit={addRoom} floors={floors} buildings={buildings}/>
              </div>
              <DataTable columns={columnsRoomsEditDefinitions} data={rooms} className={"pb-20"}/>


              {/* Fault log */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <MyTitle>Fault log management: </MyTitle>
              </div>
              <DataTable
                  columns={columnsFaultLogDefinitions}
                  data={faultLogs.map((faultLog: TFaultLog) => {
                      const room = rooms.find((room: TRoom) => room.id === faultLog.roomId);
                      const floor = room ? floors.find((floor: TFloor) => floor.id === room.floor.id) : null;
                      const building = floor ? buildings.find((building: TBuilding) => building.id === floor.buildingId) : null;
                      return {...faultLog, room, floor, building,};
                  })}
                  className={"pb-20"}
              />


              {/* Equipment */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <MyTitle>Room equipment management: </MyTitle>
                  <AddEquipmentForm onSubmit={addEquipment} rooms={rooms}/>
              </div>
              <DataTable
                  columns={columnsEquipmentDefinitions}
                  data={equipment.map((equipment: TEquipment) => {
                      const room = rooms.find((room: TRoom) => room.id === equipment.roomId);
                      const floor = room ? floors.find((floor: TFloor) => floor.id === room.floor.id) : null;
                      const building = floor ? buildings.find((building: TBuilding) => building.id === floor.buildingId) : null;
                      return {...equipment, room, floor, building,};
                  })}
                  className={"pb-20"}
              />

          </Container>
          <Toaster/>
      </>
  );
}
