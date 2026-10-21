import tw from 'twin.macro';
import { formatTime } from '@/utils/stringUtils';
import { TEquipment } from '@/types/TEquipment';
import { TRoom } from '@/types/TRoom';

const InfoContainer = tw.div`mt-8 space-y-4`;
const InfoRow = tw.div`flex flex-col`;
const InfoLabel = tw.span`text-gray-500 text-sm`;
const InfoValue = tw.span`text-gray-900 font-medium`;

type TRoomInfoProps = {
  room: TRoom;
};

export const RoomInfo = ({ room }: TRoomInfoProps) => {
  return (
    <section className="flex gap-8">
      <InfoContainer style={{marginTop: 0}}>
        <InfoRow>
          <InfoLabel>Room Type</InfoLabel>
          <InfoValue>{room.roomType}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Capacity</InfoLabel>
          <InfoValue>{room.capacity} people</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Location</InfoLabel>
          <InfoValue>{`${room.building.name}, floor ${room.floor.floorNumber}`}</InfoValue>
        </InfoRow>
      </InfoContainer>
      <InfoContainer style={{marginTop: 0}}>
        <InfoRow>
          <InfoLabel>Description</InfoLabel>
          <InfoValue>{room.description}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Opening Hours</InfoLabel>
          <InfoValue>{`${formatTime(room.openingTime)} - ${formatTime(room.closingTime)}`}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Equipment</InfoLabel>
          <InfoValue>{getEquipmentString(room.equipment)}</InfoValue>
        </InfoRow>
      </InfoContainer>
    </section>
  );
};

const getEquipmentString = (equipment: TEquipment[]) => {
  if (equipment.length === 0) {
    return '--';
  }
  return equipment.map((equipment: TEquipment) => `${equipment.equipmentType} (${equipment.quantity})`).join(', ');
};