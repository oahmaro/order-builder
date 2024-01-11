import { forwardRef } from 'react';
import classes from './header.module.css';
import { HeaderAvatar } from './header-avatar';
import { HeaderNav } from './header-nav';
import { HeaderStart } from './header-start';

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    <HeaderStart />
    <HeaderNav />
    <HeaderAvatar />
  </div>
));

Header.displayName = 'Header';

export default Header;
