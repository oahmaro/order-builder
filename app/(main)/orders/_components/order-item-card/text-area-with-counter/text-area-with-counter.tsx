import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Textarea, TextareaProps } from '@mantine/core';

import classes from './text-area-with-counter.module.css';

interface TextAreaWithCounterProps extends TextareaProps {
  maxLength: number;
  warningThreshold?: number;
}

export function TextAreaWithCounter({
  maxLength,
  warningThreshold = 10,
  value = '',
  onChange,
  label,
  ...props
}: TextAreaWithCounterProps) {
  const [remainingChars, setRemainingChars] = useState(maxLength - String(value).length);

  useEffect(() => {
    setRemainingChars(maxLength - String(value).length);
  }, [value, maxLength]);

  const counterClass = clsx(classes.counter, {
    [classes.counterWarning]: remainingChars <= warningThreshold && remainingChars > 0,
    [classes.counterError]: remainingChars <= 0,
  });

  return (
    <Textarea
      {...props}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      rightSection={
        <div className={classes.counterContainer}>
          <span className={counterClass}>{remainingChars}</span>
        </div>
      }
      label={undefined}
    />
  );
}
