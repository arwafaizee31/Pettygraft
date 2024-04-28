import React from "react";

export default function OwnerMyPetsCard({ pet }) {
    return (
        <div
            className="col-my-pets-owner"
            onTouchStart="this.classList.toggle('hover');"
        >
            <div className="container-my-pets-owner-card">
                <div
                    className="front"
                    style={{ backgroundImage: `url(${pet.avatar})` }}
                >
                    <div className="inner">
                        <p className="ownersPetName">{pet.pet_name}</p>
                        <span className="ownersPetBreedName">
                            {pet.breeds.breed_display_name}
                        </span>
                        <br />
                        <span className="noOfVacDOne">
                            <span>No. of Vaccines Done: </span>
                            {pet.last_vaccine_date}
                        </span>
                    </div>
                </div>
                <div className="back">
                    <div className="inner">
                        <span>Last Vaccine Date:</span>
                        <br></br>
                        <span className="ownersPetLastVaccineDate">
                            {pet.last_vaccine_date}
                        </span>
                        <br />
                        <p className="isPrivateStatus my-4">
                            <strong>
                                {pet.is_private === 0 ? "Private" : "Public"}
                            </strong>
                        </p>
                        <a
                            href={`/petowner/petProfilePage/${pet.id}`}
                            target="_blank"
                        >
                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-0 petProfileLink mt-4"
                            >
                                Open Profile
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
