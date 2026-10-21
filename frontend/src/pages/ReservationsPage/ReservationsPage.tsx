import { DataTable } from "@/components/DataTable";
import { PageTitle } from "@/components/PageTitle";
import { useReservationsQuery } from "@/hooks/useReservationsQuery";
import { useReservationsColumnDefitions } from "./useReservationsColumnDefitions";
import tw from "twin.macro";
import { useStore } from "@/store";
import { Toaster } from "@/components/ui/toaster";

const Container = tw.div`p-4`;

export function ReservationsPage() {
	const { currentUser } = useStore();
	const { data: reservations, isLoading, isError } = useReservationsQuery({ userId: currentUser?.id });
	const columns = useReservationsColumnDefitions();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading reservations</div>;
	if (!reservations) return null; 

	return (
		<>
			<Container>
				<PageTitle primaryText="All of Your Reservations!" secondaryText="RESERVATIONS" />
				<DataTable columns={columns} data={reservations} />
			</Container>
			<Toaster />
		</>
	);
}
