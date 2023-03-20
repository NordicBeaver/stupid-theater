import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';
import { Page } from '../../ui/Page';

export const PlayRoomPage: Component = () => {
  const params = useParams<{ id: string }>();

  return <Page>Play Room ${params.id}</Page>;
};
