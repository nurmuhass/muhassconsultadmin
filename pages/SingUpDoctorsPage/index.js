import React from "react";
import { fetchSingUpDoctors } from "../../lib/fetchData";


export default function SingUpDoctorsPage({ SingUpDoctors }) {
  return (
    <div className="min-h-screen">
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
    </div>
  );
}

export async function getServerSideProps() {
  const SingUpDoctors = await fetchSingUpDoctors();

  return {
    props: {
      SingUpDoctors,
    },
  };
}
