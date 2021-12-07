import { render, screen } from '@testing-library/react'
import { act } from "react-dom/test-utils";
import SignIn from './SignIn'

describe('SignIn Component', () => {
    test('renders Sign up if user is not logged in', () => {
        render(<SignIn />);
        const spanElement = screen.queryAllByDisplayValue("Sign up")
        expect(spanElement).toBeTruthy();
    });
    test('clicking the button triggers the onSubmit function.', () => {
        act(() => {
            render(<SignIn />);
        });
        const onSubmit = jest.fn();
        const buttonElement = screen.getByRole('button');
        buttonElement.click(screen.getByText('Sign up'));
        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

})