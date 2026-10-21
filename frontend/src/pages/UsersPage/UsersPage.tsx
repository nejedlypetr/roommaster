import { useUsersQuery } from "@/hooks/useUsersQuery";
import tw from "twin.macro";
import { DataTable } from "../../components/DataTable";
import { useColumnsDefinitions } from "./useUsersColumnsDefinitions";
import { PageTitle } from "@/components/PageTitle";

const Container = tw.div`p-4`;

export function UsersPage() {
  const { data: users, isLoading, isError } = useUsersQuery();
  const columnsDefinitions = useColumnsDefinitions();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  if (!users) return null;

  return (
      <Container>
        <PageTitle primaryText="All users" secondaryText="USERS" />
        <DataTable columns={columnsDefinitions} data={users} />
      </Container>
  );
}
