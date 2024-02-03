import { forwardRef } from 'react';
import { User } from 'next-auth';

import classes from './header.module.css';
import { HeaderAvatar } from './header-avatar';
import { HeaderStart } from './header-start';
import { generateUserSubtitle, generateUserTitle } from '@/utils/get-user-title';
import { getUserInitials } from '@/utils/get-user-initials';

export interface HeaderProps {
  user?: User;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ user }, ref) => {
  const title = generateUserTitle({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const subtitle = generateUserSubtitle({
    username: user?.username,
    email: user?.email,
  });

  const initials = getUserInitials(title || subtitle);

  return (
    <div ref={ref} className={classes.root}>
      <div className={classes.header}>
        <HeaderStart user={user} />
        <HeaderAvatar initials={initials} title={title} subtitle={subtitle} />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
