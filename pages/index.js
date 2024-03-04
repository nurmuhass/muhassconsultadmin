import Users from "../components/Users";
import Chart from "../components/chart/Chart";
import { fetchUsers,fetchSingUpDoctors } from "../lib/fetchData";
import Table from "../components/table/Table";

export default function Home({ users, SingUpDoctors }) {
  return (
    <div className="min-h-screen">
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Products </div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Active Orders </div>
            <div className="stat-value">{SingUpDoctors.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Active Orders </div>
            <div className="stat-value">{SingUpDoctors.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>

 <div>
      <Chart/>
</div>
<div className="mt-20">
          <div className="font-semibold text-gray-500 mb-15">Latest Transactions</div>
          <Table/>
 </div>
      <Users users={users} />
    </div>
  );
}

export async function getServerSideProps() {
  const users = await fetchUsers();
  const SingUpDoctors = await fetchSingUpDoctors();

  return {
    props: {
      users,
      SingUpDoctors,
    },
  };
}
