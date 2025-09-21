import { graphql } from 'react-relay';

export const GetAllTasksQuery = graphql`
  query GetAllTasksQuery {
    getAllTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;
