import { resolve } from 'path'
import { ExtensionContext, Uri, workspace } from 'vscode'
import { Config } from './config'

export default class FS {
  constructor(public ctx: ExtensionContext) {

  }

  async updateFile(path: string, content: string | any) {
    if (typeof content !== 'string')
      content = JSON.stringify(content || null, null, 2)

    const filepath = resolve(Config.path, path)
    await workspace.fs.writeFile(Uri.file(filepath), Buffer.from(content, 'utf-8'))
  }

  async clear() {
    await workspace.fs.delete(Uri.file(Config.path), { recursive: true, useTrash: false })
  }
}
