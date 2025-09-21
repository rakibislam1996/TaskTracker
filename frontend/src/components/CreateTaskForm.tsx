import React, { useState } from 'react';
import { useMutation } from 'react-relay';
import { CreateTaskMutation } from '../graphql/CreateTaskMutation';
import { Button, Form, TextField, View } from '@adobe/react-spectrum';
import type { CreateTaskMutation as CreateTaskMutationType } from '../__generated__/CreateTaskMutation.graphql';

interface Props {
  onCreated?: () => void;
}

export const CreateTaskForm: React.FC<Props> = ({ onCreated }) => {
  const [commit, inFlight] = useMutation<CreateTaskMutationType>(CreateTaskMutation);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    commit({
      variables: { title: title.trim(), description: description.trim() || null },
      onCompleted: () => {
        setTitle('');
        setDescription('');
        onCreated?.();
      }
    });
  };

  return (
    <View borderWidth="thin" borderColor="dark" padding="size-200" marginBottom="size-200">
      <Form onSubmit={submit} aria-label="Create Task">
        <TextField label="Title" value={title} onChange={setTitle} isRequired width="100%" />
        <TextField label="Description" value={description} onChange={setDescription} width="100%" />
        <Button type="submit" variant="cta" isDisabled={inFlight}>Add Task</Button>
      </Form>
    </View>
  );
};
