import { forwardRef } from 'react';
import NextLink from 'next/link';
import { nprogress } from '@mantine/nprogress';

import { shouldTriggerStartEvent } from './should-trigger-start-event';

const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  ({ href, onClick, ...rest }, ref) => {
    const useLink = href && href.startsWith('/');
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) nprogress.start();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

Link.displayName = 'Link';

export default Link;
