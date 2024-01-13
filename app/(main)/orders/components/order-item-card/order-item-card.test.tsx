import { render, screen } from '@/test-utils';

import OrderItemCard from './order-item-card';

describe('OrderItemCard component', () => {
  it('renders text with the correct content', () => {
    render(<OrderItemCard />);

    expect(screen.getByText('OrderItemCard component')).toBeInTheDocument();
  });
});
