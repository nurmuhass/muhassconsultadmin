import React from "react";

export default function Users({ users }) {
  return (
    <>
      <div className="overflow-x-auto max-h-6xl">
        <table className="table table-xs table-pin-rows table-pin-cols ">
          <thead>
            <tr>
              <th>{""}</th>
              <td>Image</td>
              <td>Full Name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>state</td>

              <th>{""}</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id}>
                <th>{index}</th>

                <td>
                  <img
                    src={user.image}
                    alt="user image"
                    className="w-[50px] h-[50px]"
                  />
                </td>

                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.state}</td>

                <th>{index}</th>
              </tr>
            ))}
          </tbody>
         
        </table>
      </div>
    </>
  );
}
