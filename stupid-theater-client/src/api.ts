import axios, { Axios, AxiosResponse } from 'axios';
import { PlayscriptCharacterEvent, PlayscriptEvent, PlayscriptNarratorEvent } from './playscript/Playscript';

const client = axios.create({ baseURL: 'http://localhost:3001/' });

export interface Playscript {
  id: string;
  name: string;
  characters: PlayscriptCharacter[];
}

export interface PlayscriptCharacter {
  id: string;
  order: number;
  name: string;
  description: string;
}

interface ListPlayscriptsResponse {
  playscripts: Playscript[];
}

export async function listPlayscripts() {
  const response = await client.get<ListPlayscriptsResponse>('playscripts');
  const playscripts = response.data.playscripts;
  return playscripts;
}

interface FindPlayscriptResponse {
  playscript: Playscript;
}

export async function findPlayscript(id: string) {
  const response = await client.get<FindPlayscriptResponse>(`playscripts/${id}`);
  const playscript = response.data.playscript;
  return playscript;
}

interface CreatePlayscriptRequest {
  name: string;
}

interface CreatePlayscriptResponse {
  playscript: Playscript;
}

export async function createPlayscript(data: CreatePlayscriptRequest) {
  const response = await client.post<CreatePlayscriptRequest, AxiosResponse<CreatePlayscriptResponse>>(
    'playscripts/create',
    data
  );
  const playscript = response.data.playscript;
  return playscript;
}

interface UpdatePlayscriptRequest {
  id: string;
  name: string;
}

interface UpdatePlayscriptResponse {
  playscript: Playscript;
}

export async function updatePlayscript(data: UpdatePlayscriptRequest) {
  const response = await client.post<UpdatePlayscriptRequest, AxiosResponse<UpdatePlayscriptResponse>>(
    'playscripts/update',
    data
  );
  const playscript = response.data.playscript;
  return playscript;
}

interface UdpateCharacterRequest {
  id: string;
  name?: string;
  description?: string;
}

interface UpdateCharacterResponse {
  character: PlayscriptCharacter;
}

export async function updateCharacter(data: UdpateCharacterRequest) {
  const response = await client.post<UdpateCharacterRequest, AxiosResponse<UpdateCharacterResponse>>(
    'characters/update',
    data
  );
  const character = response.data.character;
  return character;
}

interface PlayscriptNarratorEventDto {
  id: string;
  index: number;
  line: string;
}

interface PlayscriptCharacterEventDto {
  id: string;
  index: number;
  lines: {
    id: string;
    characterId: string;
    line: string;
  }[];
}

interface GetEventsResponse {
  narratorEvents: PlayscriptNarratorEventDto[];
  characterEvents: PlayscriptCharacterEventDto[];
}

export async function getEvents(playscriptId: String) {
  const response = await client.get<GetEventsResponse>(`/playscript/events?playscriptId=${playscriptId}`);
  const data = response.data;

  const narratorEvents: PlayscriptNarratorEvent[] = data.narratorEvents.map(
    (event) => ({ id: event.id, type: 'narrator', index: event.index, line: event.line } as PlayscriptNarratorEvent)
  );
  const characterEvents: PlayscriptCharacterEvent[] = data.characterEvents.map(
    (event) =>
      ({
        id: event.id,
        type: 'character',
        index: event.index,
        lines: event.lines.map((l) => ({ characterId: l.characterId, line: l.line })),
      } as PlayscriptCharacterEvent)
  );

  const events: PlayscriptEvent[] = [...narratorEvents, ...characterEvents];
  return events;
}

interface CreateNarratorEventRequest {
  playscriptId: string;
  index: number;
  line: string;
}

interface CreateNarratorEventResponse {
  event: PlayscriptNarratorEventDto;
}

export async function createNarratorEvent(data: CreateNarratorEventRequest) {
  const response = await client.post<CreateNarratorEventRequest, AxiosResponse<CreateNarratorEventResponse>>(
    '/playscript/events/createNarratorEvent',
    data
  );

  const dto = response.data.event;
  const event: PlayscriptNarratorEvent = { id: dto.id, type: 'narrator', index: dto.index, line: dto.line };
  return event;
}

interface UpdateNarratorEventRequest {
  id: string;
  line?: string;
}

interface UpdateNarratorEventResponse {
  event: PlayscriptNarratorEventDto;
}

export async function updateNarratorEvent(data: UpdateNarratorEventRequest) {
  const response = await client.post<UpdateNarratorEventRequest, AxiosResponse<UpdateNarratorEventResponse>>(
    '/playscript/events/updateNarratorEvent',
    data
  );

  const dto = response.data.event;
  const event: PlayscriptNarratorEvent = { id: dto.id, type: 'narrator', index: dto.index, line: dto.line };
  return event;
}

interface CreateCharacterEventRequest {
  playscriptId: string;
  index: number;
  lines: {
    charactedId: string;
    line: string;
  }[];
}

interface CreateCharacterEventResponse {
  event: PlayscriptCharacterEventDto;
}

export async function createCharacterEvent(data: CreateCharacterEventRequest) {
  const response = await client.post<CreateCharacterEventRequest, AxiosResponse<CreateCharacterEventResponse>>(
    '/playscript/events/createCharacterEvent',
    data
  );

  const dto = response.data.event;
  const event: PlayscriptCharacterEvent = {
    id: dto.id,
    type: 'character',
    index: dto.index,
    lines: dto.lines.map((lineDto) => ({ characterId: lineDto.characterId, line: lineDto.line })),
  };

  return event;
}

interface UpdateCharacterEventRequest {
  id: string;
  lines: {
    charactedId: string;
    line: string;
  }[];
}

interface UpdateCharacterEventResponse {
  event: PlayscriptCharacterEventDto;
}

export async function updateCharacterEvent(data: UpdateCharacterEventRequest) {
  const response = await client.post<UpdateCharacterEventRequest, AxiosResponse<UpdateCharacterEventResponse>>(
    '/playscript/events/updateCharacterEvent',
    data
  );

  const dto = response.data.event;
  const event: PlayscriptCharacterEvent = {
    id: dto.id,
    type: 'character',
    index: dto.index,
    lines: dto.lines.map((lineDto) => ({ characterId: lineDto.characterId, line: lineDto.line })),
  };

  return event;
}
