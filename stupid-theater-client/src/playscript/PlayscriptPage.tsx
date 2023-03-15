import { useParams } from '@solidjs/router';
import { Component, createResource } from 'solid-js';
import { findPlayscript } from '../api';
import { LinkButton } from '../ui/LinkButton';
import { Page } from '../ui/Page';

export const PlayscriptPage: Component = () => {
  const params = useParams<{ id: string }>();

  const [playscript] = createResource(() => findPlayscript(params.id));

  return (
    <Page>
      <div class="w-full h-full flex flex-col gap-8 items-center justify-center">
        <h1 class="text-4xl">{playscript()?.name}</h1>
        <div>
          <LinkButton href={`/playscript/${params.id}/edit`} label="Edit"></LinkButton>
        </div>
      </div>
    </Page>
  );
};
