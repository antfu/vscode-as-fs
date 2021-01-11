import { ExtensionContext, workspace } from 'vscode'
import { Config } from './config'
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

  configUpdated()
  workspace.onDidChangeConfiguration(configUpdated)
}

export function configUpdated() {
  const enabled = Config.enabledModules
  if (Config.enabled) {
    modules.map(m =>
      enabled?.includes(m.name)
        ? m.activate()
        : m.deactivate(),
    )
  }
  else {
    deactivate()
  }
}

export async function deactivate() {
  modules.map(m => m.deactivate())
  await fs.clear()
}
