import { resolve, relative, join } from 'path'
import { ExtensionContext, FileSystemWatcher, FileType, Uri, workspace } from 'vscode'
import { Config } from './config'
import Module from './modules/base'

export default class FS {
  mtimeMap: Record<string, number> = {}
  watcher: FileSystemWatcher
  modules: Module[] = []

  constructor(public ctx: ExtensionContext) {
    this.watcher = workspace.createFileSystemWatcher(join(Config.path, '**/*'), true, false, true)

    this.watcher.onDidChange(async(uri) => {
      const fullPath = uri.fsPath
      const path = relative(Config.path, fullPath)

      const activeModules = this.modules.filter(m => m.active && m.files.includes(path))

      if (!activeModules.length)
        return

      try {
        const { mtime, type } = await workspace.fs.stat(uri)
        if (type === FileType.Directory || mtime <= this.mtimeMap[fullPath])
          return
        this.mtimeMap[fullPath] = mtime
      }
      catch {
        return
      }

      const content = (await workspace.fs.readFile(uri)).toString()
      activeModules.forEach(m => m.onChanged(uri, content))
    })
  }

  registerModule(m: Module) {
    this.modules.push(m)
  }

  unregisterModule(m: Module) {
    const idx = this.modules.indexOf(m)
    if (idx >= 0)
      this.modules.splice(idx, 1)
  }

  async updateFile(path: string, content: string | any) {
    if (typeof content !== 'string')
      content = JSON.stringify(content || null, null, 2)

    const filepath = resolve(Config.path, path)
    const uri = Uri.file(filepath)
    this.mtimeMap[filepath] = +new Date()
    await workspace.fs.writeFile(uri, Buffer.from(content, 'utf-8'))
    const { mtime } = await workspace.fs.stat(uri)
    this.mtimeMap[filepath] = mtime
  }

  async clear() {
    try {
      await workspace.fs.delete(Uri.file(Config.path), { recursive: true, useTrash: false })
    }
    catch (e) {

    }
  }
}
