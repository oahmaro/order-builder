import { render, screen } from '@/test-utils';

import OrdersTable from './orders-table';

describe('OrdersTable component', () => {
  it('renders text with the correct content', () => {
    render(<OrdersTable />);

    expect(screen.getByText('OrdersTable component')).toBeInTheDocument();
  });
});
