import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import LoginScreen from './LoginScreen'

describe('LoginScreen Component', () => {
    test('renders the h1 as a text', () => {
        //Arrange, Act, Assert,
        render(< LoginScreen />)
        //Act
        //Assert
        const checkH1 = screen.getByText('Unlimited film, Tv programmes and more.')
        expect(checkH1).toBeInTheDocument();
    });
    test('renders the h2 as a text', () => {
        //Arrange, Act, Assert,
        render(< LoginScreen />)
        //Act
        //Assert
        const checkH2 = screen.getByText('Watch anywhere. Cancel any time', { exact: false })
        expect(checkH2).toBeInTheDocument();
    });
    test('renders the h3 as a text', () => {
        //Arrange
        render(< LoginScreen />)
        //Act
        //Assert
        const checkH3 = screen.getByText('Read to watch? Enter your email to create or restart your membership', { exact: false })
        expect(checkH3).toBeInTheDocument();
    })
    test('renders the "Sign in" button', () => {
        //Arrange
        render(< LoginScreen />)
        //Act
        //Assert
        const buttonElement = screen.findAllByText('Sign In');
        expect(buttonElement).toBeTruthy();
    })
    test('renders the "Sign in" button', () => {
        //Arrange
        render(< LoginScreen />)
        //Act
        //Assert
        const buttonElement = screen.findAllByText('Get started');
        expect(buttonElement).toBeTruthy();
    })
    test('renders the component SignIn', () => {

    })

})

