import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

describe('Email Validation', () =>{
    test('display error for invalid email syntax',()=>{
        render(<Form/>);
        const input = screen.getByPlaceholderText(/Enter your email/i);
    const errorMessage = screen.queryByText(/Invalid email syntax/i);


    expect(errorMessage).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'invalid' } });
    expect(screen.getByText(/Invalid email syntax/i)).toBeInTheDocument();
  });

  test('no error message for valid email syntax', () => {
    render(<Form />);

    const input = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(input, { target: { value: 'validemail@example.com' } });
    const errorMessage = screen.queryByText(/Invalid email syntax/i);
    expect(errorMessage).not.toBeInTheDocument();
    })
})