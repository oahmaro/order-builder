import { render, screen } from '@/test-utils';

import PageHeader from './page-header';

describe('PageHeader component', () => {
  it('renders text with the correct content', () => {
    render(<PageHeader title="example title" />);

    expect(screen.getByText('PageHeader component')).toBeInTheDocument();
  });
});
