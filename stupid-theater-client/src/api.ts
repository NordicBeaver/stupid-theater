import axios, { Axios } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:3001/' });

interface Playscript {
  id: string;
  name: string;
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
