import { join } from "https://deno.land/std@0.219.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.219.0/fs/exists.ts";

interface DenoInfo {
  modules: {
    dependencies?: {
      specifier: string;
      type?: {
        specifier: string;
        resolutionMode: string;
      };
      code?: {
        specifier: string;
      };
    }[];
  }[];
}

interface ImportMap {
  imports: Record<string, string>;
}

interface DenoConfig {
  workspace: string[];
  imports?: Record<string, string>;
}

async function readDenoConfig(): Promise<DenoConfig> {
  return JSON.parse(await Deno.readTextFile("deno.json"));
}

async function findEntryPoint(dir: string): Promise<string> {
  const isApp = dir.startsWith("./apps/");
  const possiblePaths = isApp
    ? [join(dir, "src/main.ts")]
    : [join(dir, "src/mod.ts"), join(dir, "lib/mod.ts")];

  for (const path of possiblePaths) {
    if (await exists(path)) {
      return path;
    }
  }
  return "";
}

async function cleanupTempFiles(): Promise<void> {
  try {
    await Deno.remove("deno_info.json");
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      console.error("Error removing deno_info.json:", error);
    }
  }
}

async function writeImportMap(importMap: ImportMap): Promise<void> {
  await Deno.writeTextFile(
    "import_map.json",
    JSON.stringify(importMap, null, 2) + "\n",
  );
}

async function executeDenoInfoCommand(targetPath: string): Promise<string> {
  const process = new Deno.Command("deno", {
    args: ["info", "--json", targetPath],
    stderr: "piped",
    stdout: "piped",
  });

  const { stdout, stderr } = await process.output();
  const output = new TextDecoder().decode(stdout);
  const stderrOutput = new TextDecoder().decode(stderr);

  if (!output.trim()) {
    console.log(`No output from deno info`);
    console.log(`stderr: ${stderrOutput}`);
    return "";
  }

  return output;
}

async function getDenoInfo(targetPath: string): Promise<DenoInfo | null> {
  const output = await executeDenoInfoCommand(targetPath);
  return output ? JSON.parse(output) : null;
}

interface SpecifierMapping {
  key: string;
  value: string;
}

function processSpecifier(
  specifier: string,
  resolvedSpecifier: string,
): SpecifierMapping | null {
  if (resolvedSpecifier.startsWith("jsr:")) {
    return processJsrSpecifier(specifier, resolvedSpecifier);
  }

  if (resolvedSpecifier.startsWith("npm:")) {
    return { key: specifier, value: resolvedSpecifier };
  }

  if (
    resolvedSpecifier.startsWith("file://") &&
    specifier.startsWith("@new-new-boplats/")
  ) {
    return processFileSpecifier(resolvedSpecifier, specifier);
  }

  return null;
}

function processJsrSpecifier(
  specifier: string,
  resolvedSpecifier: string,
): SpecifierMapping {
  if (!specifier.endsWith("/") && resolvedSpecifier.includes("@")) {
    return {
      key: `${specifier}/`,
      value: `${resolvedSpecifier}/`,
    };
  }
  return { key: specifier, value: resolvedSpecifier };
}

function processFileSpecifier(
  resolvedSpecifier: string,
  specifier: string,
): SpecifierMapping {
  const relativePath = resolvedSpecifier
    .replace(/file:\/\/\/.*?(?=\/(?:libs|apps))/, ".");
  return { key: specifier, value: relativePath };
}

async function generateImportMap(): Promise<void> {
  const importMap: ImportMap = { imports: {} };
  const denoConfig = await readDenoConfig();
  const workspaceDirs = denoConfig.workspace || [];

  await Promise.all(
    workspaceDirs.map(dir => processDirectory(dir, importMap))
  );

  if (denoConfig.imports) {
    importMap.imports = { ...importMap.imports, ...denoConfig.imports };
  }

  await writeImportMap(importMap);
  await cleanupTempFiles();
  console.log("Import map generated successfully!");
}

async function processDirectory(dir: string, importMap: ImportMap): Promise<void> {
  const targetPath = await findEntryPoint(dir);
  if (!targetPath) {
    console.log(`Skipping ${dir}: No entry point found`);
    return;
  }

  try {
    const denoInfo = await getDenoInfo(targetPath);
    if (!denoInfo) return;

    await Promise.all(
      denoInfo.modules.map(module => processModuleDependencies(module, importMap))
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error processing ${dir}: ${errorMessage}`);
  }
}

async function processModuleDependencies(
  module: DenoInfo["modules"][0],
  importMap: ImportMap
): Promise<void> {
  if (!module.dependencies) return;

  await Promise.all(
    module.dependencies.map(async dep => {
      const resolvedSpecifier = dep.type?.specifier || dep.code?.specifier;
      if (!resolvedSpecifier) return;

      const mapping = processSpecifier(dep.specifier, resolvedSpecifier);
      if (mapping) {
        const { key, value } = mapping;
        importMap.imports[key] = value;
      }
    })
  );
}

if (import.meta.main) {
  await generateImportMap();
}
