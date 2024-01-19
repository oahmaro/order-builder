'use client';

import { useState, useTransition } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import * as z from 'zod';
import { useForm, zodResolver } from '@mantine/form';

import classes from './register-card.module.css';
import { RegisterSchema } from '@/schemas';
import { registerAdmin } from '@/actions/register-admin';

type FormValues = z.infer<typeof RegisterSchema>;

export default function RegisterCard() {
  const form = useForm<FormValues>({ validate: zodResolver(RegisterSchema) });

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<{ message: string; status: number } | null>(null);

  function handleSubmit(values: FormValues) {
    setResponse(null);

    startTransition(async () => {
      setResponse(await registerAdmin(values));
    });
  }

  return (
    <Card
      component="form"
      className={classes.root}
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      noValidate
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Stack align="center" gap={24}>
        <Box className={classes.logo} />

        <Stack gap={0} ta="center">
          <Title order={1}>ברוך הבא לאמנות!</Title>
          <Text c="dimmed">ליצור חשבון חדש</Text>
        </Stack>

        <Stack w="100%">
          <Group w="100%" align="flex-start">
            <TextInput
              label="שם פרטי"
              flex={1}
              required
              disabled={isPending}
              {...form.getInputProps('firstName')}
            />

            <TextInput
              label="שם משפחה"
              flex={1}
              disabled={isPending}
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            label="אימייל"
            w="100%"
            size="md"
            required
            disabled={isPending}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="סיסמה"
            w="100%"
            size="md"
            required
            disabled={isPending}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label="סיסמת אישור"
            w="100%"
            size="md"
            required
            disabled={isPending}
            {...form.getInputProps('confirmPassword')}
          />
        </Stack>

        {response?.status === 422 && (
          <Alert variant="light" color="red" title="Alert title" w="100%">
            {response.message}
          </Alert>
        )}

        <Button size="md" w="100%" type="submit">
          בואו נתחיל
        </Button>
      </Stack>
    </Card>
  );
}
