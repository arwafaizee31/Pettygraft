// Heading.jsx

import React from 'react';

const Heading = ({ title }) => {
  return (
    <div className="py-6">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">{title}</h1>
    </div>
  );
};

export default Heading;
  