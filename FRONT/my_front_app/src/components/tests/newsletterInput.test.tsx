import { render, screen, fireEvent } from '@testing-library/react';
import { NewsletterInput } from "@/components/newsletterInput";

describe('newsletterInput', () => {
    it('Display an error when email is invalid', () => {
        render(<NewsletterInput />);
        const input = screen.getByTestId('newsletter-email-input');
        const button = screen.getByTestId('submit-button');

        fireEvent.change(input, { target: { value: 'hello_test_invalide' } });
        fireEvent.click(button);

        expect(screen.getByTestId('error-message')).toHaveTextContent('Adresse email invalide');
    });

    it('Does not display error when email is valid', () => {
        render(<NewsletterInput />);
        const input = screen.getByTestId('newsletter-email-input');
        const button = screen.getByTestId('submit-button');

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        expect(screen.queryByTestId('error-message')).toBeNull();
    });
});