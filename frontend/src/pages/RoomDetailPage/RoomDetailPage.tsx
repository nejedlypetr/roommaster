import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import tw from 'twin.macro';
import { PageTitle } from '@/components/PageTitle';
import { MoveLeft } from 'lucide-react';
import { useRoomDetailsQuery } from '@/hooks/useRoomDetailsQuery';
import { EBasicRoutes } from '@/enums/routes';
import { RoomReservationTable } from './RoomReservationTable';
import { RoomInfo } from './RoomInfo';
import { FaultLog } from './FaultLog';
import { ReserveRoom } from './ReserveRoom';
import { useReservationMutation } from '@/hooks/useReservationMutation';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const Container = tw.div`
  flex 
  flex-col 
  md:flex-row 
  w-full 
  max-w-[1440px] 
  mx-auto 
  px-4 
  md:px-8 
  py-6 
  gap-8 
  h-full
`;

const LeftSection = tw.div`
  w-full 
  md:w-[40%] 
  h-full
`;

const RightSection = tw.div`
  w-full 
  md:w-[60%] 
  flex 
  justify-end 
  h-full
`;

export const RoomDetailPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reserveFormOpen, setReserveFormOpen] = useState(false);
   
  const { data: room, isLoading, isError } = useRoomDetailsQuery(
    Number.parseInt(roomId)
  );

  const handleReserveSuccess = (date: Date) => {
    toast({
      title: "Success!",
      description: "Your room reservation has been created.",
      variant: "default",
    });

    queryClient.invalidateQueries({
      queryKey: ['roomBookings', roomId, format(date, 'yyyy-MM-dd')]
    });

    setReserveFormOpen(false);
  };
  
  const { mutate: createReservation, error: createReservationError } = useReservationMutation({
    roomId: Number.parseInt(roomId),
    onSuccess: handleReserveSuccess,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading room details</div>;
  if (!room) return null; 

  return (
    <>
      <Container>
        <LeftSection>
          <Button 
            onClick={() => navigate(`${EBasicRoutes.ROOMS}`)} 
            className="flex items-center gap-2 mb-4" 
            variant="outline"
          >
            <MoveLeft className="h-4 w-4" />
            <span className="text-primary-grey font-medium">Back to rooms</span>
          </Button>
          <PageTitle 
            primaryText={`Room ${room.roomNumber}`}
            primaryTextPlacement="left"
            secondaryText={`${room.building.name} > floor ${room.floor.floorNumber} > room ${room.roomNumber}`}
          />
          <RoomInfo room={room} />
          <FaultLog faultLogs={room.faultLogs} roomId={Number.parseInt(roomId)} />
        </LeftSection>

        <RightSection className="flex flex-col gap-4 items-center">
          <ReserveRoom 
            onSubmit={createReservation} 
            openingTimeSlot={room.openingTime}
            closingTimeSlot={room.closingTime}
            formError={createReservationError?.response?.data as string || ""}
            open={reserveFormOpen}
            setOpen={setReserveFormOpen}
          />
          <RoomReservationTable
            roomId={Number.parseInt(roomId)}
            openingTimeSlot={room.openingTime}
            closingTimeSlot={room.closingTime}
          />
        </RightSection>
      </Container>
      <Toaster />
    </>
  );
};
