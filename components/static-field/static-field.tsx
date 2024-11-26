import { Box, MantineSize } from '@mantine/core';
import { ReactNode, forwardRef } from 'react';

import classes from './static-field.module.css';

export interface StaticFieldProps {
  label: string;
  size?: MantineSize;
  value?: ReactNode;
  separator?: string;
}

const StaticField = forwardRef<HTMLDivElement, StaticFieldProps>(
  ({ label, value, separator = ' ', size = 'sm' }, ref) => (
    <Box ref={ref} mod={{ size }} className={classes.root}>
      <span className={classes.label}>{label}</span>
      <span className={classes.separator}>{separator}</span>
      <span className={classes.value}>{value || '——'}</span>
    </Box>
  )
);

StaticField.displayName = 'StaticField';

export default StaticField;
