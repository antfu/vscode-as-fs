import { Disposable, ExtensionContext, Uri } from 'vscode'
import FS from '../fs'

export default abstract class Module {
  abstract name: string
  active = false
  disposables: Disposable[] = []
  files: string[] = []

  constructor(
    public readonly ctx: ExtensionContext,
    public readonly fs: FS,
  ) {
    this.fs.registerModule(this)
  }

  onActivated() {}
  onDeactivated() {}
  onChanged(uri: Uri, content: string) {}

  activate() {
    if (this.active)
      return
    this.onActivated()
    this.active = true
  }

  deactivate() {
    if (!this.active)
      return
    this.onDeactivated()
    this.disposables.map(i => i.dispose())
    this.disposables = []
    this.active = false
    this.fs.unregisterModule(this)
  }
}
