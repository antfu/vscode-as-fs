import { window } from 'vscode'
import Module from './base'

export default class CurrentTabModule extends Module {
  name = 'current-tab'

  onActivated() {
    const update = this.update.bind(this)
    this.disposables.push(
      window.onDidChangeActiveTextEditor(update),
      window.onDidChangeVisibleTextEditors(update),
    )
    update()
  }

  onDeactivated() {

  }

  update() {
    const editor = window.activeTextEditor
    const doc = editor?.document
    this.fs.updateFile('current-tab/path', doc?.uri.fsPath || '')
  }
  // TODO: watch on file change
}
