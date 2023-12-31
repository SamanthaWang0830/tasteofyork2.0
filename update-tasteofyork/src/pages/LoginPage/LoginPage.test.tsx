import { describe, expect, it } from 'vitest';
import { render, screen , fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux'; 
import store from '../../store/store';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom'


describe("Login",()=>{
    it('it shows two inputs and a button', async()=>{
       // Render the component
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginPage/>
                </Provider>
            </BrowserRouter>
        )
       // Manipulate the component or find an element in it
        const inputs= screen.getAllByRole('textbox')

       // Assertion- make sure the component is doing what we expect it to do
       expect(inputs).toHaveLength(1)
    }),

    it('shows error message when email is empty', async()=>{
        // Render the component
        const {getByRole, getByText } = render(
             <BrowserRouter>
                 <Provider store={store}>
                     <LoginPage/>
                 </Provider>
             </BrowserRouter>
        )
        // Manipulate the component or find an element in it
        const loginButton = getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);
        const errorMessage = getByText('Please enter a valid email');
        // Assertion- make sure the component is doing what we expect it to do
        expect(errorMessage).toBeInTheDocument();

    }),

    it('shows error message when password is wrong', async()=>{
        const {getByRole, getByText,getByPlaceholderText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginPage/>
                </Provider>
            </BrowserRouter>
        )

        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByRole('button', { name: 'Login' });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'sdsas1234' } });
        fireEvent.click(loginButton);

        const errorMessage = getByText('Password should contains minimum 1 character for both uppercase and lowercase letter')
        expect(errorMessage).toBeInTheDocument()
    })
})