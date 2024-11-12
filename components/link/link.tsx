import NextLink from 'next/link';
import { forwardRef } from 'react';
import { nprogress } from '@mantine/nprogress';

import { shouldTriggerStartEvent } from './should-trigger-start-event';

const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  ({ href, onClick, children, ...rest }, ref) => {
    const useLink = href && href.startsWith('/');

    if (!useLink) {
      return (
        <a href={href} onClick={onClick} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) nprogress.start();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
