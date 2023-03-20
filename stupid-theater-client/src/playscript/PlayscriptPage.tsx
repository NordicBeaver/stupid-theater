import { useNavigate, useParams } from '@solidjs/router';
import { Component, createResource } from 'solid-js';
import { findPlayscript, startPlay } from '../api';
import { Button } from '../ui/Button';
import { LinkButton } from '../ui/LinkButton';
import { Page } from '../ui/Page';

export const PlayscriptPage: Component = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [playscript] = createResource(() => findPlayscript(params.id));

  const handleStartPlayButton = async () => {
    const { playroomId } = await startPlay({ playscriptId: params.id });
    navigate(`/playroom/${playroomId}`);
  };

  return (
    <Page>
      <div class="w-full h-full flex flex-col gap-8 items-center justify-center">
        <h1 class="text-4xl">{playscript()?.name}</h1>
        <LinkButton href={`/playscript/${params.id}/edit`} label="Edit"></LinkButton>
        <Button label="Start play" onClick={handleStartPlayButton}></Button>
      </div>
    </Page>
  );
};
