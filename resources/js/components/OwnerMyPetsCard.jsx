import React from 'react';

export default function OwnerMyPetsCard({ pets }) {
  return (
    <div>
      {pets.map((pet) => (
        <div className="col-my-pets-owner" key={pet.id}>
          <div className="container-my-pets-owner-card">
            <div className="front" style={{ backgroundImage: `url(${pet.avatar})` }}>
              <div className="inner">
                <p className='ownersPetName'>{pet.pet_name}</p>
                <span className='ownersPetBreedName'>{pet.breed}</span>
                <br></br>
                <span className='ownersPetLastVaccineDate'>{pet.last_vaccine_date}</span>
                <br></br>
                <span className='noOfVacDOne'>{pet.vaccines_done}</span>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p className='isPrivateStatus'>{pet.is_private === 1 ? 'Private' : 'Public'}</p>
                <a href={`/petProfilePage/${pet.id}`} target="_blank">
                  <button type="button" className="btn btn-outline-dark rounded-0 petProfileLink">View Profile</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// export default function(){
//     return(
// <div>     <div className="col-my-pets-owner" 
// // ontouchstart="this.classList.toggle('hover');"
// ontouchstart="this.classList.toggle('hover');"
// >
//           <div className="container-my-pets-owner-card">
//             <div className="front" 
//             // style="background-image: url(cureLogo.png)"
//             >
//               <div className="inner">
//                 <p className='ownersPetName'>cure.fit</p>
//                 <span className='ownersPetBreedName'>Be better every day</span>
//                 <br></br>
//                 <span className='ownersPetLastVaccineDate'></span>
//                 <br></br>
//                 <span className='noOfVacDOne'></span>
//               </div>
//             </div>
//             <div className="back">
//               <div className="inner">
//                 <p className='isPrivateStatus'></p>
//                 <a href="https://www.cult.fit/" target="_blank"><button type="button"
//                     className="btn btn-outline-dark rounded-0 petProfileLink">cult.fit</button></a>
//               </div>
//             </div>
//           </div>
//         </div>
//         </div>
//     );
// }
