import { TBuilding } from "../TBuilding";

// TODO. delete, probably obsolete
export type TBuildingDto = {
  // Building properties
  id: TBuilding['id'];
  name: TBuilding['name'];
  street: TBuilding['street'];
  city: TBuilding['city'];
  postalCode: TBuilding['postalCode'];
};
