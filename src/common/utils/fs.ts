import { ensureDir, ensureFile, readJson, remove, writeJson } from 'fs-extra'

import { Json } from '../interfaces'

export function deleteDir(path: string): Promise<void> {
  return remove(path)
}

export function ensureDirExists(path: string): Promise<void> {
  return ensureDir(path)
}

export function ensureFileExists(path: string): Promise<void> {
  return ensureFile(path)
}

export function readJsonFile(path: string): Promise<Json> {
  return readJson(path)
}

export function writeJsonFile(path: string, data: Json): Promise<void> {
  return writeJson(path, data, {
    spaces: 4
  })
}
