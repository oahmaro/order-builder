import { forwardRef } from 'react';
import classes from './header.module.css';
import { HeaderAvatar } from './header-avatar';
import { HeaderStart } from './header-start';

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    <HeaderStart />
    <HeaderAvatar />
  </div>
));

Header.displayName = 'Header';

export default Header;
