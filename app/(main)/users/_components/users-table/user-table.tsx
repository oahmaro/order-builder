'use client';

import { Badge } from '@mantine/core';
import { User } from '@prisma/client';

import { CustomTable } from '@/components';

type UserData = Partial<Omit<User, 'password'>>;

export interface UsersTableProps {
  users: UserData[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <CustomTable<UserData>
      columns={[
        { header: 'זהות המשתמש', sortable: true, render: (data) => data.id },
        { header: 'שם פרטי', sortable: true, render: (data) => data.firstName },
        { header: 'שם משפחה', sortable: true, render: (data) => data.lastName },
        { header: 'אימייל', sortable: true, render: (data) => data.email },
        { header: 'תפקיד משתמש', sortable: true, render: (data) => data.role },
        { header: 'שם משתמש', sortable: true, render: (data) => data.username },
        {
          header: 'סטטוס',
          sortable: true,
          render: (data) => (
            <Badge color={data.active ? 'green' : 'red'} variant="dot">
              {data.active ? 'Active' : 'InActive'}
            </Badge>
          ),
        },
        { header: 'נוצר ב', sortable: true, render: (data) => data.createdAt?.toDateString() },
        { header: 'מעודכן', sortable: true, render: (data) => data.updatedAt?.toDateString() },
      ]}
      data={users}
    />
  );
}
