<?php

function formatDate($date)
{
    return date('d-m-Y', strtotime($date));
}

function getBreedDisplayName($breedId)
{
    $petBreed = PetBreeds::find($breedId);
    if ($petBreed) {
        return $petBreed->breed_display_name;
    }
    return null;
}
function calculateAge($dob)
{
    $dateOfBirth = new DateTime($dob);
    $today = new DateTime('today');
    $age = $dateOfBirth->diff($today)->y;
    return $age;
}
