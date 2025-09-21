import { graphql } from 'react-relay';

export const CreateTaskMutation = graphql`
  mutation CreateTaskMutation($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
