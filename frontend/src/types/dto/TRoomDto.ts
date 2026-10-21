import { EDepartment, ERoomType } from "../enums";
import { TBuilding } from "../TBuilding";
import { TFloor } from "../TFloor";
import { TRoom } from "../TRoom";

export type TRoomDto = {
  // Room properties
  roomId: TRoom['id'];
  roomType: ERoomType;
  roomNumber: TRoom['roomNumber'];
  openingTime: TRoom['openingTime'];
  closingTime: TRoom['closingTime'];
  capacity: TRoom['capacity'];
  roomDescription: TRoom['description'];
  department: EDepartment;

  // Floor properties
  floorId: TFloor['id'];
  floorNumber: TFloor['floorNumber'];

  // Building properties
  buildingId: TBuilding['id'];
  buildingName: TBuilding['name'];
  buildingStreet: TBuilding['street'];
  buildingCity: TBuilding['city'];
  buildingPostalCode: TBuilding['postalCode'];
};
