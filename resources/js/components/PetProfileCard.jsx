import React from "react";
import { useState,useEffect } from "react";

const PetProfileCard = ({petName , petType ,petGender,petBreed,parentName,contact,email,petAge}) => {
    const [image,setImage] = useState([]);
    useEffect(() => {
        if(petType==1){
            setImage("/dogProfile.png");
        }
        else{
            setImage("/catProfile.png");
           
        }
       
    }, []);
    
    return (
        <>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
                <a href="#">
                    
                    <img class="rounded-t-lg" src={image} alt="" />
                </a>
                <div class="p-5">
                    <h1 class="modal_pet_name text-4xl">{petName}</h1>

                    <div class="grid grid-cols-3 gap-4">
                        <div className="card-small">
                            <h5 className="card-title">{petAge}</h5>
                            <p class="card-text text-muted font-semibold">Age</p>
                        </div>
                        <div className="card-small">
                            <h5 className="card-title">{petGender}</h5>
                            <p class="font-semibold card-text text-muted">Sex</p>
                        </div>

                        <div class="card-small">
                            <h5 className="card-title">{petBreed}</h5>
                            <p class="font-semibold card-text text-muted">Breed</p>
                        </div>
                    </div>
                    <div class="card-profile px-7 pb-7 pt-3">
                 
                    <h4 class="text-center font-semibold text-xl">Parent Profile</h4>
                    <div class="profileCardhr mt-3"></div>
                    <p class="mt-3">
                        <div class="mt-3">
                      <p id="join" class="me-1 font-semibold">Name:</p>
                      <h5 id="join">{parentName}</h5>
                      </div>
                    
                      <div class="mt-3">
                      <p id="join" class="me-1 font-semibold">Contact Number:</p>
                      <h5 id="join" >{contact}</h5>
                      </div>
                     
                      <div class="mt-3">
                      <p id="join" class="me-1 font-semibold">Email:</p>
                      <h5 id="join" >{email}</h5>
                      </div>
                    </p>
                  
                </div>
                </div>
                </div>
                
                
         
            
        </>
    );
};

export default PetProfileCard;
