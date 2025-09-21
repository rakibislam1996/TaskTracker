import React, { useCallback } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { GetAllTasksQuery } from '../graphql/GetAllTasksQuery';
import { UpdateTaskStatusMutation } from '../graphql/UpdateTaskStatusMutation';
import type { GetAllTasksQuery as GetAllTasksQueryType } from '../__generated__/GetAllTasksQuery.graphql';
import type { UpdateTaskStatusMutation as UpdateTaskStatusMutationType } from '../__generated__/UpdateTaskStatusMutation.graphql';
import { TableView, TableHeader, Column, TableBody, Row, Cell, Button, Flex } from '@adobe/react-spectrum';

interface Props {
  refreshKey: number;
}

export const TaskList: React.FC<Props> = ({ refreshKey }) => {
  const data = useLazyLoadQuery<GetAllTasksQueryType>(GetAllTasksQuery, {}, { fetchKey: refreshKey });
  const [commit] = useMutation<UpdateTaskStatusMutationType>(UpdateTaskStatusMutation);

  const toggle = useCallback((id: string, status: string) => {
    const next = status === 'Pending' ? 'Completed' : 'Pending';
    commit({ variables: { id, status: next as any } });
  }, [commit]);

  return (
    <TableView aria-label="Tasks" selectionMode="none" height="size-6000">
      <TableHeader>
        <Column>Title</Column>
        <Column>Description</Column>
        <Column>Status</Column>
        <Column>Action</Column>
      </TableHeader>
      <TableBody>
        {data.getAllTasks.map(t => (
          <Row key={t.id}>
            <Cell>{t.title}</Cell>
            <Cell>{t.description}</Cell>
            <Cell>{t.status}</Cell>
            <Cell>
              <Flex>
                <Button variant="primary" onPress={() => toggle(t.id, t.status)}>{t.status === 'Pending' ? 'Complete' : 'Reopen'}</Button>
              </Flex>
            </Cell>
          </Row>
        ))}
      </TableBody>
    </TableView>
  );
};
