import { forwardRef } from 'react';
import classes from './order-item-card.module.css';

export interface OrderItemCardProps {}

const OrderItemCard = forwardRef<HTMLDivElement, OrderItemCardProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    OrderItemCard component
  </div>
));

OrderItemCard.displayName = 'OrderItemCard';

export default OrderItemCard;
