# Minecraft Mods

A collection of Minecraft data packs and resource packs.

## Data Packs

### Creepers Burn in Daylight
**Supported Versions:** Minecraft 1.21 - 1.21.11

Makes creepers ignite when exposed to daylight, similar to zombies and skeletons.

- Runs once per second for lower server overhead
- Works on vanilla or Fabric servers
- No mods required

**Installation:**
1. Download the latest release from the [Releases](../../releases) page
2. Place the ZIP file into `<server>/<level-name>/datapacks/`
3. Run `/reload` or restart the server
4. Verify with `/datapack list`

**To Disable:**
```
/datapack disable "file/creepers_burn_daylight"
```
Then run `/reload`.

## Resource Packs

_No resource packs available yet._

## Version Information

This repository uses pack format numbers to target specific Minecraft versions. The [`version-numbers.json`](version-numbers.json) file maintains the mapping between pack format numbers and Minecraft versions.

For more information about pack formats and how they correspond to Minecraft versions, see the [Pack format documentation](https://minecraft.wiki/w/Pack_format) on the Minecraft Wiki.

**Note:** The version numbers in [`version-numbers.json`](version-numbers.json) will need to be updated as new Minecraft versions are released.

## Development

### Building Packs

To build all packs:

```bash
npm install
npm run pack
```

This will create ZIP files for all data packs and resource packs in the repository.

### Requirements

- Node.js >= 22

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Credits

Glory to Jehovah, Lord of Lords and King of Kings, creator of Heaven and Earth, who through his Son Jesus Christ, has redeemed me to become a child of God. -[Shane32](https://github.com/Shane32)
