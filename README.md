<p align="center">
  <img src="https://raw.githubusercontent.com/antfu/vscode-as-fs/489206af84d1824d5ac98f64be502767f01a768d/res/icon.png" height="250" width="250">
</p>

<h2 align="center">
VS Code as FS
</h2>

> Heavily inspired by [TabFS](https://github.com/osnr/TabFS).

{WIP} Mounts VS Code states as files to be processed by other tools!

<p align="center">
  <img src="https://github.com/antfu/vscode-as-fs/blob/main/screenshots/fs.png?raw=true" width="200">
</p>

## Configration

This extension is disabled by default. To enable it on your project, add this item to your `.vscode/settings.json`

```json
{
  "as-fs.enabled": true
}
```

The files mapping to your editor states will be saved under `.vscode/.as-fs/` by default. You can change it by this config:

```json
{
  "as-fs.path": ".vscode/.as-fs"
}
```

> 💡 You may also want to add `.as-fs` to your `gitignore`

## Avaliable Modules

| ID | Enabled by default | Descriptions |
| --- | --- | --- |
| `current-tab` | Yes | Map current opened tab's filepath to `current-tab/path` |
| `current-selections` | No | Map current editor selections `current-tab/selections.json` |

> More to come, or open a feature request.

Modules can be controlled by

```json
{
  "as-fs.modules": [
    "current-tab",
    "current-selections"
  ]
}
```

## Applications

- [vite-plugin-editor-nav](https://github.com/antfu/vite-plugin-editor-nav) - Automatically change app route with your current open file in VS Code.

> TODO: Add yours!

## License

MIT
