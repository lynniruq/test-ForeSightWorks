import React, { useState } from 'react';
import { consumers } from "stream";
import "../style/form.css";
import Select from './Multi-Select';


const Form: React.FC = () => {
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ];

      const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        options:[]
      });   
    const [error, setError] = useState<string>('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const handleChange = (event: any) => {
        
        if( event.target instanceof HTMLInputElement){
            const { name, value } = event.target;
            setFormData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
            if(name === 'email' && !emailRegex.test(value)){
                    setError('Invalid email syntax');
                  } else {
                    setError('');
                  }
        } else {
            setFormData(prevState => ({
                ...prevState, 
                options: event, 
              }));
        
      };
    };

      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Submitted:', formData);
      }

    return (
        <form onSubmit={onSubmit}>
            <h1>Create Account</h1>
            <label>Name</label>
            <input type='text' name="name" value={formData.name} onChange={handleChange}/>
            <label>Email</label>
            <input type='text' name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email'/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Phone</label>
            <input type='text' name="phone" value={formData.phone} onChange={handleChange}/>
            <label>Choose</label>
            <Select 
                options={options} 
                multiple={true} 
                placeholder="Select an option" 
                onChange={handleChange}
             />
             
            <button type="submit">Submit</button>
        </form>
    );
};
export default Form;