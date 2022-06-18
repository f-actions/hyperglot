const core = require("@actions/core");
const exec = require("@actions/exec");
const glob = require("@actions/glob");

async function run() {
  const fontPath = core.getInput("path");
  const hyperglotVersion = core.getInput("version");
  const useCombiningMarks = core.getInput("marks");
  const useDecomposed = core.getInput("decomposed");
  const writeAutonyms = core.getInput("autonyms");
  const writeUserCounts = core.getInput("users");
  const useAllOrthographies = core.getInput("all-orthographies");
  const includeHistorical = core.getInput("include-historical");
  const includeConstructed = core.getInput("include-constructed");
  const writeStrictIso = core.getInput("strict-iso");
  const writeVerbose = core.getInput("verbose");
  const hyperglotArgs = core.getInput("args");

  // ==========================
  // Display files to be tested
  // ==========================
  try {
    const globber = await glob.create(`${fontPath}`);
    console.log("");
    console.log("Beginning hyperglot test run on the following fonts:");
    for await (const file of globber.globGenerator()) {
      console.log(file);
    }
    console.log("");
  } catch (error) {
    core.setFailed(
      `f-actions/hyperglot Action failed during attempt to display font files with error: ${error.message}`
    );
  }

  // ==========================
  // Compose hyperglot command
  // Execute hyperglot
  // ==========================

  try {
    // install hyperglot package
    console.log(`[*] Installing hyperglot package @ ${hyperglotVersion}...`);
    if (hyperglotVersion === "latest") {
      await exec.exec("python -m pip install --upgrade hyperglot");
    } else if (hyperglotVersion === "master") {
      await exec.exec(
        "python -m pip install --upgrade git+https://github.com/rosettatype/hyperglot.git"
      );
    } else if (hyperglotVersion === "main") {
      await exec.exec(
        "python -m pip install --upgrade git+https://github.com/rosettatype/hyperglot.git"
      );
    } else {
      await exec.exec(
        `python -m pip install --upgrade hyperglot==${hyperglotVersion}`
      );
    }

    // compose hyperglot command for execution
    let hyperglotCmd = "hyperglot";

    if (useCombiningMarks === "true") {
      hyperglotCmd += " -m";
    }
    if (useDecomposed === "true") {
      hyperglotCmd += " -d";
    }
    if (writeAutonyms === "true") {
      hyperglotCmd += " -a";
    }
    if (writeUserCounts === "true") {
      hyperglotCmd += " -u";
    }
    if (useAllOrthographies === "true") {
      hyperglotCmd += " --include-all-orthographies";
    }
    if (includeHistorical === "true") {
      hyperglotCmd += " --include-historical";
    }
    if (includeConstructed === "true") {
      hyperglotCmd += " --include-constructed";
    }
    if (writeStrictIso === "true") {
      hyperglotCmd += " --strict-iso";
    }
    if (writeVerbose === "true") {
      hyperglotCmd += " -v";
    }
    if (hyperglotArgs !== "none") {
      hyperglotCmd += ` ${hyperglotArgs}`;
    }

    // concatenate test font path argument(s)
    const globber = await glob.create(`${fontPath}`);
    const files = await globber.glob();
    hyperglotCmd += ` ${files.join(" ")}`;

    // execute hyperglot
    await exec.exec(`${hyperglotCmd}`);
  } catch (error) {
    core.setFailed(
      `f-actions/hyperglot Action failed during attempt to run hyperglot with error: ${error.message}`
    );
  }
}

run();
