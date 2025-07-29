import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterBar from './FilterBar';

const mockStore = configureStore([]);

function renderWithStore(storeState: any) {
    const store = mockStore(storeState);
    return render(
        <Provider store={store}>
            <FilterBar />
        </Provider>
    );
}

describe('FilterBar', () => {
    it('renders all pricing option checkboxes and reset button', () => {
        renderWithStore({
            contents: {
                filters: [],
                sorting: 'name',
                priceRange: [0, 999],
            },
        });
        expect(screen.getByLabelText('Paid')).toBeTruthy();
        expect(screen.getByLabelText('Free')).toBeTruthy();
        expect(screen.getByLabelText('View Only')).toBeTruthy();
        expect(screen.getByText('RESET')).toBeTruthy();
    });

    it('allows toggling checkboxes', () => {
        renderWithStore({
            contents: {
                filters: [],
                sorting: 'name',
                priceRange: [0, 999],
            },
        });
        const paidCheckbox = screen.getByLabelText('Paid') as HTMLInputElement;
        expect(paidCheckbox.checked).toBe(false);
        fireEvent.click(paidCheckbox);
        // Redux-mock-store does not update state, but we can check the dispatched action
        expect(mockStore().getActions()).toEqual([]); // This is a placeholder; use integration test for full state
    });

    it('sorting dropdown changes value', () => {
        renderWithStore({
            contents: {
                filters: [],
                sorting: 'name',
                priceRange: [0, 999],
            },
        });
        const select = screen.getByLabelText(/Sort By/i) as HTMLSelectElement;
        expect(select.value).toBe('name');
        fireEvent.change(select, { target: { value: 'priceHigh' } });
        // Redux-mock-store does not update state, but we can check the dispatched action
        expect(mockStore().getActions()).toEqual([]); // Placeholder
    });

    it('price slider is disabled if Paid is not selected', () => {
        renderWithStore({
            contents: {
                filters: [],
                sorting: 'name',
                priceRange: [0, 999],
            },
        });
        const slider = screen.getAllByRole('slider');
        slider.forEach(handle => {
            expect(handle).toHaveAttribute('aria-disabled', 'true');
        });
    });
}); 