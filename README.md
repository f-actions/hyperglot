# f-actions/hyperglot GitHub Action

![Version](https://img.shields.io/github/v/release/f-actions/hyperglot?sort=semver)
[![Linux CI](https://github.com/f-actions/hyperglot/workflows/Linux%20CI/badge.svg)](https://github.com/f-actions/hyperglot/actions?query=workflow%3A%22Linux+CI%22)

This GitHub Action installs the Python [hyperglot](https://github.com/rosettatype/hyperglot) package and executes **font language support testing** based on [Hyperglot database definitions](https://github.com/rosettatype/hyperglot/blob/master/README_database.md).  `hyperglot` executable installation and execution defaults can be configured with optional Action settings.

The project is tested against the latest GitHub Actions Linux runner environment cPython versions 3.7 - 3.10 interpreters on a nightly basis.  We recommend use in the ubuntu-latest GitHub Actions runner environment.

## Quick Start

### Default

Include the `f-actions/hyperglot` Action after you build fonts in your GitHub Actions workflow.  

Define the mandatory `path` input with the font or font paths that you want to test. The `path` input accepts one or more file paths and supports globbing syntax (e.g., `path/to/*.ttf`).

```yaml
name: Hyperglot

on: [push, pull_request]

jobs:
  hyperglot:
    runs-on: ubuntu-latest
    name: Hyperglot
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3
      - name: Set up Python environment
        uses: actions/setup-python@v4
        with:
          python-version: "3.10"
      - name: Build fonts
        run: [YOUR BUILD COMMAND]]
      - name: Hyperglot (default)
        uses: f-actions/hyperglot@v1
        with:
          path: "[path/to/a/font.ttf]"
      
```

### With Custom Input Configuration

The hyperglot testing behavior can be customized with GitHub Actions inputs:

```yaml
name: Hyperglot

on: [push, pull_request]

jobs:
  hyperglot:
    runs-on: ubuntu-latest
    name: Hyperglot
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3
      - name: Set up Python environment
        uses: actions/setup-python@v4
        with:
          python-version: "3.10"
      - name: Build fonts
        run: [YOUR BUILD COMMAND]]
      - name: Hyperglot (default)
        uses: f-actions/hyperglot@v1
        with:
          version: "0.3.7"
          path: "[path/to/a/font.ttf]"
          decomposed: "true"
          include-historical: "true"
          strict-iso: "true"
```

### With Custom Command Line Argument Configuration

The hyperglot testing behavior can be customized with any supported command line option that can be used in a local terminal:

```yaml
name: Hyperglot

on: [push, pull_request]

jobs:
  hyperglot:
    runs-on: ubuntu-latest
    name: Hyperglot
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3
      - name: Set up Python environment
        uses: actions/setup-python@v4
        with:
          python-version: "3.10"
      - name: Build fonts
        run: [YOUR BUILD COMMAND]]
      - name: Hyperglot (default)
        uses: f-actions/hyperglot@v1
        with:
          version: "0.3.7"
          path: "[path/to/a/font.ttf]"
          args: "-d --include-historical --strict-iso --validity verified"
```

You can use non-overlapping combinations of Action input fields and `args` input-defined command line options to construct the execution request.

See below for detailed documentation of the available Action input fields.

## Action Inputs

**Note**: All input definitions should be enclosed in double quotes.

### Mandatory

The following settings are mandatory as part of every `f-actions/hyperglot` Action configuration:

#### [`path`](#)

The paths to one or more font files relative to the root of the repository.  This input field supports file globbing to collect multiple file paths in a simple statement (e.g., `fonts/*.ttf`, `fonts/*.otf`).

### Optional

The following settings are optional in `f-actions/hyperglot` configurations:

#### [`all-orthographies`](#)

Check all language orthographies, not just the primary one.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `all-orthographies: "true"` to activate this feature.

#### [`args`](#)

A space-delimited list of hyperglot command line options.  This input can be used to fully specify a `hyperglot` run with supported command line options (including in place of those that are defined with other inputs or have no input configuration support).

Default: `"none"`
Options: Space separated list of command line arguments that modify `hyperglot` default behavior.  Enclose the definition in double quotes and do not include font path arguments.  Font paths should always be defined with the `paths` input field.
Example: `args: "-d -m --validity verified"` 

#### [`autonyms`](#)

Output the language names in native language and script.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `autonyms: "true"` to activate this feature.

#### [`decomposed`](#)

Language support is considered if font has all necessary base glyphs and marks, all encoded precomposed glyphs are not required.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `decomposed: "true"` to activate this feature.

#### [`include-historical`](#)

Include languages and orthographies marked as historical.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `include-historical: "true"` to activate this feature.

#### [`include-constructed`](#)

Include languages and orthographies marked as constructed.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `include-constructed: "true"` to activate this feature.

#### [`marks`](#)

Include combining marks use for a language.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `marks: "true"` to activate this feature.

#### [`strict-iso`](#)

Display language names and macrolanguage data strictly according to the ISO standard.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `strict-iso: "true"` to activate this feature.

#### [`users`](#)

Output total estimated language user counts.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `users: "true"` to activate this feature.

#### [`verbose`](#)

Display verbose output, including missing language support.

Default: `"false"`
Options: `["true", "false"]`
Description: Set the definition to `verbose: "true"` to activate this feature.

#### [`version`](#)

The `hyperglot` version for testing.

Default: `"latest"`
Options: `["latest", "main", "master", [VERSION NUMBER]]`
Description: `version: "latest"` is the latest PyPI release version, `version: "main"` and `version: "master"` both define the latest default source repository branch commit version, `version: [VERSION NUMBER]` represents the semantic version number of any PyPI release (e.g., `version: "0.3.7"`).

## Action Outputs

None

## Acknowledgments

This project is based on the fantastic `hyperglot` executable and Hyperglot database that is developed and maintained by the Rosetta Type Foundry and project contributors.  The `hyperglot` executable and database source are released under the GNU General Public License v3.0 and are available at https://github.com/rosettatype/hyperglot. Database documentation is available at https://github.com/rosettatype/hyperglot/blob/master/README_database.md.

## License

[Apache License v2.0](LICENSE)
