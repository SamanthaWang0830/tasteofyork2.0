import { describe, expect, it } from 'vitest';
import { render, screen , fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux'; 
import store from '../../store/store';
import RegisterPage from './RegisterPage';
import { BrowserRouter } from 'react-router-dom'


describe("Register",()=>{
    it('it shows two text inputs and one password input', async()=>{
       // Render the component
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <RegisterPage/>
                </Provider>
            </BrowserRouter>
        )
       // Manipulate the component or find an element in it
        const textInputs= screen.getAllByRole('textbox')
        const passwordInput = screen.getByPlaceholderText('Password');

       // Assertion- make sure the component is doing what we expect it to do
       expect(textInputs).toHaveLength(2)
       expect(passwordInput).toBeInTheDocument();
    }),

    it('shows error message when email is empty', async()=>{
        // Render the component
        const {getByRole, getByText } = render(
             <BrowserRouter>
                 <Provider store={store}>
                     <RegisterPage/>
                 </Provider>
             </BrowserRouter>
        )
        // Manipulate the component or find an element in it
        const loginButton = getByRole('button', { name: 'Register' });
        fireEvent.click(loginButton);
        const errorMessage = getByText('Please enter a valid email');
        // Assertion- make sure the component is doing what we expect it to do
        expect(errorMessage).toBeInTheDocument();

    }),

    it('shows error message when password is invalid', async()=>{
        const {getByRole, getByText,getByPlaceholderText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <RegisterPage/>
                </Provider>
            </BrowserRouter>
        )

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const registerButton = getByRole('button', { name: 'Register' });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'sdsas1234' } });
        fireEvent.click(registerButton);

        const errorMessage = getByText('Password should contains minimum 1 character for both uppercase and lowercase letter')
        expect(errorMessage).toBeInTheDocument()
    })
})