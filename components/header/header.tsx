import { forwardRef } from 'react';

import classes from './header.module.css';
import { HeaderAvatar } from './header-avatar';
import { HeaderStart } from './header-start';
import { auth } from '@/auth';
import { generateUserSubtitle, generateUserTitle } from '@/utils/get-user-title';
import { getUserInitials } from '@/utils/get-user-initials';

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>(async (props, ref) => {
  const session = await auth();

  const title = generateUserTitle({
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
  });

  const subtitle = generateUserSubtitle({
    username: session?.user?.username,
    email: session?.user?.email,
  });

  const initials = getUserInitials(title || subtitle);

  return (
    <div ref={ref} className={classes.root}>
      <div className={classes.header}>
        <HeaderStart session={session} />
        <HeaderAvatar initials={initials} title={title} subtitle={subtitle} />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
