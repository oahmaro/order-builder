import { forwardRef } from 'react';

import classes from './header.module.css';
import { HeaderAvatar } from './header-avatar';
import { HeaderStart } from './header-start';
import { auth } from '@/auth';
import { generateUserTitle } from '@/utils/get-user-title';
import { getUserInitials } from '@/utils/get-user-initials';

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>(async (props, ref) => {
  const session = await auth();

  const title = generateUserTitle({
    email: session?.user?.email,
    username: session?.user?.username,
    firstName: session?.user?.firstName,
    lastName: session?.user?.lastName,
  });

  const initials = getUserInitials(title);

  return (
    <div ref={ref} className={classes.root}>
      <HeaderStart session={session} />
      <HeaderAvatar initials={initials} />
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
