import React, { useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { Provider, View, Heading, Flex } from '@adobe/react-spectrum';
import { relayEnvironment } from './relay/environment';
import { CreateTaskForm } from './components/CreateTaskForm';
import { TaskList } from './components/TaskList';

export const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <Provider colorScheme="light">
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <View padding="size-250" maxWidth="1200px" marginX="auto">
          <Heading level={2}>Task Tracker</Heading>
          <CreateTaskForm onCreated={() => setRefreshKey(r => r + 1)} />
          <TaskList refreshKey={refreshKey} />
        </View>
      </RelayEnvironmentProvider>
    </Provider>
  );
};

export default App;
