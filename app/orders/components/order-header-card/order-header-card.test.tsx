import { render, screen } from '@/test-utils';

import OrderHeaderCard from './order-header-card';

describe('OrderHeaderCard component', () => {
  it('renders text with the correct content', () => {
    render(<OrderHeaderCard />);

    expect(screen.getByText('OrderHeaderCard component')).toBeInTheDocument();
  });
});
