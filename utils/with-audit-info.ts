import { db } from '@/lib/db';

export async function withAuditInfo<T extends { id: number }>(
  entities: T[],
  entityType: string
): Promise<(T & { createdByUser?: any; updatedByUser?: any })[]> {
  const audits = await db.audit.findMany({
    where: {
      entityType,
      entityId: { in: entities.map((e) => e.id) },
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  return entities.map((entity) => {
    const entityAudits = audits.filter((audit) => audit.entityId === entity.id);
    const createAudit = entityAudits.find((audit) => audit.action === 'CREATE');
    const updateAudit = entityAudits.filter((audit) => audit.action === 'UPDATE').pop();

    return {
      ...entity,
      createdByUser: createAudit?.user || null,
      updatedByUser: updateAudit?.user || null,
    };
  });
}
