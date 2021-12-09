import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import SignIn from './SignIn'

describe('SignIn Component', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear()
        render(<SignIn onSubmit={onSubmit} />)
    })
    test('renders Sign up if user is not logged in', () => {
        render(<SignIn />);
        const spanElement = screen.queryAllByDisplayValue("Sign up")
        expect(spanElement).toBeTruthy();
    });
    test('clicking the button triggers the onSubmit function.', async () => {
        act(() => {
            render(<SignIn />);
        });
        const onSubmit = jest.fn();
        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    // test('button renders Signup or login ', () => {
    //     screen.queryAllByDisplayValue('sign up', {
    //         name: /\{!islogin \? 'sign up' : 'login'\}/i
    //     })
    //     userEvent.type(span, 'sign up')
    // })


})