import { useParams, useRouteData } from '@solidjs/router';
import { Component, createResource } from 'solid-js';
import { findPlayscript } from '../api';
import { Page } from '../ui/Page';

export const PlayscriptPage: Component = () => {
  const params = useParams<{ id: string }>();

  const [playscript] = createResource(() => findPlayscript(params.id));

  return (
    <Page>
      <h1>{playscript()?.name}</h1>
    </Page>
  );
};
