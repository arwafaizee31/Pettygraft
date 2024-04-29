import PrimaryButton from "@/components/PrimaryButton";
import BasicRating  from "@/components/BasicRating";
import {  getCountryName} from '@/utils/utils';
export default function VendorProfileCard({vendor}) {
    return (
        <>
        <div className="wrap">
        <div className="vendor-card">
        <div class="frontCard" style={{minHeight:'450px' , maxWidth:'450px'}}>
 
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow  mt-8 mx-auto">
                <img
                    class="rounded-full m-auto mt-9 mb-0 border border-gray-200"
                    src="https://i.pinimg.com/736x/f4/6c/0e/f46c0e467f87008bdbbdc8d266980616.jpg" // Use placeholderImage or any default image if no image is selected
                    alt=""
                    style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100px",
                        maxHeight: "100px",
                    }}
                />

                <div class="p-5">
                  <div class="flex justify-center align-center gap-1">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {vendor.fname + " " + vendor.lname}
                        </h5>
                        <svg
                                                                        class="w-6 h-6 text-gray-800 mt-1"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="#f88080"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path
                                                                           fill="#f88080"
                                                                            d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                                                        />
                                                                        <path
                                                        fill="#f88080"
                                                        d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                                    />
                                                    <path
                                                        fill="#fff"
                                                        d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                                                    />
                                                </svg>
    </div>
<div class="text-center">
<p class="mb-3 text-gray-200 dark:text-gray-400 font-bold">
   {vendor.city + " " + getCountryName(vendor.country)}
</p>
</div>
<div class="text-center">
<p class="mb-3 text-gray-200 dark:text-gray-400 font-bold">
   <BasicRating values={5}/>
</p>
</div>
<p class="mb-3 font-normal">
{vendor.profile_description}
</p>



</div>
</div>
</div>
<div class="backCard">
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow  mt-8 mx-auto" style={{minHeight:'400px' , maxWidth:'400px'}}>

<PrimaryButton className="mx-auto">
View More
</PrimaryButton>

</div>
</div>
</div>
</div>
</>
    );
}
