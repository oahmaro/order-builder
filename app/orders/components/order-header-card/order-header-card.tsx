import { forwardRef } from 'react';
import classes from './order-header-card.module.css';

export interface OrderHeaderCardProps {}

const OrderHeaderCard = forwardRef<HTMLDivElement, OrderHeaderCardProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    OrderHeaderCard component
  </div>
));

OrderHeaderCard.displayName = 'OrderHeaderCard';

export default OrderHeaderCard;
