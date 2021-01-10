import { window } from 'vscode'
import Module from './base'

export default class CurrentSelectionsModule extends Module {
  name = 'current-selections'

  onActivated() {
    const update = this.update.bind(this)
    this.disposables.push(
      window.onDidChangeActiveTextEditor(update),
      window.onDidChangeTextEditorSelection(update),
    )
    update()
  }

  onDeactivated() {

  }

  update() {
    this.fs.updateFile('current-tab/selections.json', window.activeTextEditor?.selections)
  }
}
