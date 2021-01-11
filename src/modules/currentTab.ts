import { Uri, window } from 'vscode'
import Module from './base'

export default class CurrentTabModule extends Module {
  name = 'current-tab'
  files = ['current-tab/path']

  onActivated() {
    const update = this.update.bind(this)
    this.disposables.push(
      window.onDidChangeActiveTextEditor(update),
      window.onDidChangeVisibleTextEditors(update),
    )
    update()
  }

  update() {
    const editor = window.activeTextEditor
    const doc = editor?.document
    this.fs.updateFile('current-tab/path', doc?.uri.fsPath || '')
  }

  onChanged(uri: Uri, content: string) {
    window.showTextDocument(Uri.file(content.trim()))
  }
}
