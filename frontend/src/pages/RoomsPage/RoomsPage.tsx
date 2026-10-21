import { useRoomsQuery } from "@/hooks/useRoomsQuery";
import tw from "twin.macro";
import { DataTable } from "../../components/DataTable";
import { useColumnsDefinitions } from "./useRoomsColumnsDefinitions";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "@/components/PageTitle";
import {QuickReserveForm} from "@/pages/RoomsPage/QuickReserveForm.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useQuickReservationMutation} from "@/hooks/useQuickReservationMutation.ts";

const Container = tw.div`p-4`;

export function RoomsPage() {
	const navigate = useNavigate();
	const { data: rooms, isLoading, isError } = useRoomsQuery();

	const columnsDefinitions = useColumnsDefinitions({ onDetailsClick: (roomId: number) => navigate(`/rooms/${roomId}`) });

	const { mutate: createQuickReservation } = useQuickReservationMutation();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading rooms</div>;
	if (!rooms) return null;

	return (
		<>
			<Container>
				<PageTitle primaryText="Available Rooms for you to make a reservation in!" secondaryText="ROOMS"/>
					<div className="flex justify-center">
						<QuickReserveForm
							onSubmit={createQuickReservation}
							rooms={rooms}
						/>
					</div>
					<DataTable columns={columnsDefinitions} data={rooms}/>
			</Container>
			{/* Toaster to display toast messages from useMutation hooks */}
			<Toaster/>
		</>
	);
}
