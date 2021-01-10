import { Disposable, ExtensionContext } from 'vscode'
import FS from '../fs'

export default abstract class Module {
  abstract name: string
  active = false
  disposables: Disposable[] = []

  constructor(
    public readonly ctx: ExtensionContext,
    public readonly fs: FS,
  ) {

  }

  abstract onActivated(): void
  abstract onDeactivated(): void

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
  }
}
