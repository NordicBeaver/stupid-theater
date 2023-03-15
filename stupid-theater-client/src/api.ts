import axios, { Axios, AxiosResponse } from 'axios';

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
