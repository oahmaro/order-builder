import { render, screen } from '@/test-utils';

import StaticField from './static-field';

describe('StaticField component', () => {
  it('renders text with the correct content', () => {
    render(<StaticField label="test label" />);

    expect(screen.getByText('test label')).toBeInTheDocument();
  });
});
