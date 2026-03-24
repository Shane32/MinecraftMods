# Minecraft Mods

A collection of Minecraft data packs and resource packs.

## Data Packs

| Name | Description | Supported Versions |
|------|-------------|-------------------|
| [Creepers Burn in Daylight](datapacks/creepers_burn_daylight/) | Makes creepers ignite when exposed to daylight, similar to zombies and skeletons. Runs once per second for lower server overhead. Works on vanilla or Fabric servers with no mods required. | 1.21 – 26.1 |

### Adding a Data Pack to This Repository

1. Create a new subfolder under `datapacks/` named after your pack (e.g. `datapacks/my_pack/`).
2. Add a `pack.mcmeta` file at the root of that folder with the appropriate `pack_format` and `supported_formats`.
3. Place all pack data inside a `data/` subfolder following standard Minecraft data pack structure.
4. Update this README to include the new pack in the table above.

The build script will automatically detect any subfolder containing a `pack.mcmeta` and include it when running `npm run pack`.

## Resource Packs

| Name | Description | Supported Versions |
|------|-------------|-------------------|
| _(none yet)_ | | |

### Adding a Resource Pack to This Repository

1. Create a new subfolder under `resourcepacks/` named after your pack (e.g. `resourcepacks/my_pack/`).
2. Add a `pack.mcmeta` file at the root of that folder with the appropriate `pack_format` and `supported_formats`.
3. Place all pack assets inside an `assets/` subfolder following standard Minecraft resource pack structure.
4. Update this README to include the new pack in the table above.

The build script will automatically detect any subfolder containing a `pack.mcmeta` and include it when running `npm run pack`.

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

This will create ZIP files for all data packs and resource packs in the repository, placed in the `dist/` directory.

### Requirements

- Node.js >= 22

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Credits

Glory to Jehovah, Lord of Lords and King of Kings, creator of Heaven and Earth, who through his Son Jesus Christ, has redeemed me to become a child of God. -[Shane32](https://github.com/Shane32)
