import React from 'react';

export default function OwnerMyPetsCard({ pet }) {
  return (
    <div className="col-my-pets-owner" onTouchStart="this.classList.toggle('hover');">
      <div className="container-my-pets-owner-card">
        <div className="front" style={{ backgroundImage: `url(${pet.avatar})` }}>
          <div className="inner">
            <p className="ownersPetName">{pet.pet_name}</p>
            <span className="ownersPetBreedName">{pet.breed}</span>
            <br />
            <span className="ownersPetLastVaccineDate">{pet.last_vaccine_date}</span>
            <br />
            <span className="noOfVacDOne">{pet.vaccines_done}</span>
          </div>
        </div>
        <div className="back">
          <div className="inner">
            <p className="isPrivateStatus">{pet.is_private}</p>
            <a href="https://www.cult.fit/" target="_blank">
              <button type="button" className="btn btn-outline-dark rounded-0 petProfileLink">
                {pet.permanent_vendor_id}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
