import React from "react";
import { NGnaira } from "../lib/help";

export default function SingUpDoctorsComponent({ SingUpDoctors }) {
  return (
    <>
      <div className="overflow-x-auto max-h-6xl">
       
          <div>
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
          {SingUpDoctors?.map((SingUpDoctor, index) => (
              <tr key={SingUpDoctor.id}>
                <th>{index}</th>

                <td>
                  <img
                    src={SingUpDoctor.image}
                    alt="user image"
                    className="w-[50px] h-[50px]"
                  />
                </td>

                <td>{SingUpDoctor.fullname}</td>
                <td>{SingUpDoctor.email}</td>
                <td>{SingUpDoctor.gender}</td>
                <td>{SingUpDoctor.state}</td>

                <th>{index}</th>
              </tr>
            ))}
          </tbody>
         
        </table>
            
          </div>
 
      </div>
    </>
  );
}
