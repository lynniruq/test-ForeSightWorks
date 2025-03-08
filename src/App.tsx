import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Multi-Select'; // Import your Dropdown component
import Form from './components/Form';

const App: React.FC = () => {
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const handleSelectionChange = (selectedItems: any) => {
    console.log('Selected Items:', selectedItems);
  };

  return (
    <div className="App">
      <Form></Form>
    </div>
  );
};

    export default App;
