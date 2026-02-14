const fs = require('fs');
const path = require('path');
const yazl = require('yazl');

// Read version-numbers.json
const versionNumbers = JSON.parse(fs.readFileSync('version-numbers.json', 'utf8'));

// Function to find version string for a given format number
function findVersionString(versionDict, formatNumber, isMin) {
  const formatStr = String(formatNumber);
  
  if (versionDict[formatStr]) {
    return isMin ? versionDict[formatStr].min : versionDict[formatStr].max;
  }
  
  return "unknown";
}

// Function to recursively add files to zip
function addDirectoryToZip(zipFile, dirPath, zipBasePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const zipPath = zipBasePath ? path.join(zipBasePath, entry.name) : entry.name;
    
    if (entry.isDirectory()) {
      addDirectoryToZip(zipFile, fullPath, zipPath);
    } else if (entry.isFile()) {
      zipFile.addFile(fullPath, zipPath);
    }
  }
}

// Function to create a zip file
function createZip(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const zipFile = new yazl.ZipFile();
    const output = fs.createWriteStream(outputPath);
    
    zipFile.outputStream.pipe(output);
    
    output.on('close', () => {
      const stats = fs.statSync(outputPath);
      console.log(`  Created ${path.basename(outputPath)} (${stats.size} bytes)`);
      resolve();
    });
    
    output.on('error', (err) => {
      reject(err);
    });
    
    // Add all files from the source directory to the root of the zip
    addDirectoryToZip(zipFile, sourceDir);
    
    zipFile.end();
  });
}

// Function to process packs in a directory
async function processPacks(rootDir, versionDict, packType, distDir) {
  if (!fs.existsSync(rootDir)) {
    console.log(`No ${rootDir} directory found, skipping`);
    return;
  }
  
  const subdirs = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`\nFound ${subdirs.length} ${packType}(s): ${subdirs.join(', ')}`);
  
  // Process each pack
  for (const subdir of subdirs) {
    const packPath = path.join(rootDir, subdir);
    const packMetaPath = path.join(packPath, 'pack.mcmeta');
    
    if (!fs.existsSync(packMetaPath)) {
      console.log(`Skipping ${subdir}: no pack.mcmeta found`);
      continue;
    }
    
    // Read and parse pack.mcmeta
    const packMeta = JSON.parse(fs.readFileSync(packMetaPath, 'utf8'));
    const pack = packMeta.pack;
    
    let minFormat, maxFormat;
    
    // Check for supported_formats first
    if (pack.supported_formats) {
      if (typeof pack.supported_formats === 'object' && !Array.isArray(pack.supported_formats)) {
        minFormat = pack.supported_formats.min_inclusive;
        maxFormat = pack.supported_formats.max_inclusive;
      } else if (Array.isArray(pack.supported_formats)) {
        // Handle array format [min, max]
        minFormat = pack.supported_formats[0];
        maxFormat = pack.supported_formats[1];
      }
    }
    
    // Fallback to pack_format (or pack_version)
    if (!minFormat || !maxFormat) {
      const formatVersion = pack.pack_format || pack.pack_version;
      if (!formatVersion) {
        console.log(`Skipping ${subdir}: no version information found`);
        continue;
      }
      minFormat = formatVersion;
      maxFormat = formatVersion;
    }
    
    console.log(`Processing ${subdir}: format ${minFormat}-${maxFormat}`);
    
    // Find version strings
    const minVersion = findVersionString(versionDict, minFormat, true);
    const maxVersion = findVersionString(versionDict, maxFormat, false);
    
    console.log(`  Version range: ${minVersion}-${maxVersion}`);
    
    // Create zip file
    const zipName = `${subdir} (${minVersion}-${maxVersion}).zip`;
    const zipPath = path.join(distDir, zipName);
    
    try {
      await createZip(packPath, zipPath);
    } catch (error) {
      console.error(`  Failed to create zip for ${subdir}:`, error.message);
    }
  }
}

// Main function
async function main() {
  const distDir = 'dist';
  
  // Delete and recreate dist directory
  if (fs.existsSync(distDir)) {
    console.log('Cleaning dist directory...');
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
  
  // Process datapacks
  await processPacks('datapacks', versionNumbers.data, 'datapack', distDir);
  
  // Process resourcepacks
  await processPacks('resourcepacks', versionNumbers.resource, 'resourcepack', distDir);
  
  console.log('\nPack packaging complete!');
  console.log(`Output directory: ${distDir}`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
