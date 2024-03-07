import Users from "../components/Users";
import Chart from "../components/chart/Chart";
import { fetchUsers,fetchSingUpDoctors,fetchDoctors, fetchAppoinments } from "../lib/fetchData";
import Table from "../components/table/Table";

export default function Home({ users, SingUpDoctors,Doctors ,Appointments}) {
  return (
    <div className="min-h-screen">
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-4 gap-5 mb-16">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Users </div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Doctors </div>
            <div className="stat-value">{Doctors.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total SignedUpDoctors </div>
            <div className="stat-value">{SingUpDoctors.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Num of Appointment </div>
            <div className="stat-value">{Appointments.length}</div>
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
  const Doctors =await fetchDoctors();
  const Appointments = await fetchAppoinments();

  return {
    props: {
      users,
      SingUpDoctors,
      Doctors,
      Appointments,
    },
  };
}
