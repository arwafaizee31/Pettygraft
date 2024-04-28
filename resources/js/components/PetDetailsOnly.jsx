import React from "react";

export default function PetDetailsOnly({ pet }) {
    return (
        <div className="pet-details">
            <div>
                <div class="container">
                <div class="modal_pet_name_edited text-4xl px-4">{pet.pet_name}</div>
         
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                  <strong>      <div class="col">Type:</div>
</strong>                        <div class="col">{pet.pet_type_display_name}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                    <strong>    <div class="col">Breed: </div></strong>
                        <div class="col">{pet.breed_display_name}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Date of Birth: </div></strong>

                        <div class="col"> {pet.d_o_b}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Pet Gender:</div></strong>
                        <div class="col">{pet.gender}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Vaccines Done:</div></strong>
                        <div class="col">{pet.vaccines_done}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Last Vaccine Date:</div></strong>
                        <div class="col">{pet.last_vaccine_date}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Is Private:</div></strong>
                        <div class="col">{pet.is_private ? "Yes" : "No"}</div>
                    </div>
                    {pet.permanent_vendor_id > 0 && (
                        <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                            <strong><div class="col">Permanent Vendor ID: </div></strong>
                            <div class="col"> {pet.permanent_vendor_id}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
