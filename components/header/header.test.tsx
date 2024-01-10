import { render, screen } from '@/test-utils';

import Header from './header';

describe('Header component', () => {
  it('renders text with the correct content', () => {
    render(<Header />);

    expect(screen.getByText('Header component')).toBeInTheDocument();
  });
});
