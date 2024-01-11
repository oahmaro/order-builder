import { render, screen } from '@/test-utils';

import TableFooter from './table-footer';

describe('TableFooter component', () => {
  it('renders text with the correct content', () => {
    render(<TableFooter />);

    expect(screen.getByText('TableFooter component')).toBeInTheDocument();
  });
});
