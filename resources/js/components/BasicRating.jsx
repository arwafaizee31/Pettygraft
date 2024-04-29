import * as React from 'react';

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(values) {
  const [value, setValue] = React.useState(5);

  return (
   <div>
  
    <Rating name="read-only" value={value} readOnly />
    </div>
    
  );
}
