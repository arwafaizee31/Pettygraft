import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
const DataTableActions = ({ options , viewlink}) => {
    return (
        <div className='flex gap-4'>
            {options.includes('view') && (
                <PrimaryButton link={viewlink}>View</PrimaryButton>
            )}
            {options.includes('edit') && (
               <PrimaryButton>Edit</PrimaryButton>
            )}
            {options.includes('add') && (
                <PrimaryButton>Add</PrimaryButton>
            )}
            {options.includes('delete') && (
               <PrimaryButton>Delete</PrimaryButton>
            )}
        </div>
    );
};

export default DataTableActions;
