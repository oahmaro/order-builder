import { ReactNode, forwardRef } from 'react';
import classes from './static-field.module.css';

export interface StaticFieldProps {
  label: string;
  value?: ReactNode;
  separator?: string;
}

const StaticField = forwardRef<HTMLDivElement, StaticFieldProps>(
  ({ label, value, separator = ' ' }, ref) => (
    <div ref={ref}>
      <span className={classes.label}>{label}</span>
      <span className={classes.separator}>{separator}</span>
      <span className={classes.value}>{value || '——'}</span>
    </div>
  )
);

StaticField.displayName = 'StaticField';

export default StaticField;
