'use client';

import { useState, useTransition } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import * as z from 'zod';

import classes from './login-card.module.css';
import { LoginSchema } from '@/schemas';
import { login } from '@/actions/login';

export interface LoginCardProps {}

type FormValues = z.infer<typeof LoginSchema>;

export default function LoginCard() {
  const form = useForm<FormValues>({ validate: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<{ message: string; status: number } | null>(null);

  function handleSubmit(values: FormValues) {
    setResponse(null);

    startTransition(async () => {
      setResponse(await login(values));
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
          <Text c="dimmed">היכנס לחשבונך</Text>
        </Stack>

        <Stack w="100%">
          <TextInput
            label='שם משתמש או דוא"ל'
            w="100%"
            size="md"
            required
            disabled={isPending}
            {...form.getInputProps('usernameOrEmail')}
          />
          <PasswordInput
            label="סיסמה"
            w="100%"
            size="md"
            required
            disabled={isPending}
            {...form.getInputProps('password')}
          />
        </Stack>

        {response?.status === 422 && (
          <Alert variant="light" color="red" w="100%" icon={<IconInfoCircle />}>
            {response.message}
          </Alert>
        )}

        <Button size="md" w="100%" type="submit" loading={isPending}>
          התחברות
        </Button>
      </Stack>
    </Card>
  );
}
