import { ExtensionContext } from 'vscode'
import FS from './fs'
import Module from './modules/base'
import CurrentSelectionsModule from './modules/currentSelections'
import CurrentTabModule from './modules/currentTab'

const modules: Module[] = []
let fs: FS

export function activate(ctx: ExtensionContext) {
  fs = new FS(ctx)

  modules.push(
    ...[
      CurrentTabModule,
      CurrentSelectionsModule,
    ].map(C => new C(ctx, fs)),
  )

  // TODO: read from config
  modules.map(m => m.activate())
}

export async function deactivate() {
  modules.map(m => m.deactivate())
  await fs.clear()
}
