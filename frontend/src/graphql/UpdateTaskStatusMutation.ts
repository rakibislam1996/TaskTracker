import { graphql } from 'react-relay';

export const UpdateTaskStatusMutation = graphql`
  mutation UpdateTaskStatusMutation($id: UUID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;
