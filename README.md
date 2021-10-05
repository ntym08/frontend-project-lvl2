[![Actions Status](https://github.com/ntym08/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ntym08/frontend-project-lvl2/actions) [![Node CI](https://github.com/ntym08/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/ntym08/frontend-project-lvl2/actions/workflows/nodejs.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/1ff9d40df3a1afb11061/maintainability)](https://codeclimate.com/github/ntym08/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1ff9d40df3a1afb11061/test_coverage)](https://codeclimate.com/github/ntym08/frontend-project-lvl2/test_coverage)

## Diff Generator

### This is a console application for determining the difference between two data structures.

#### Utility Features:

- Support for different input formats: yaml/yml, json
- Generating a report in the form of plain text, stylish and json

### Installation and launch

```
$ git clone https://github.com/ntym08/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ make install
$ npm link
$ gendiff -h
```

[![asciicast](https://asciinema.org/a/440086.svg)](https://asciinema.org/a/440086)

### Comparison demos:

#### stylish format

```
$gendiff file1.json file2.json
$gendiff file1.yaml file2.yaml
```

[![asciicast](https://asciinema.org/a/440091.svg)](https://asciinema.org/a/440091)

#### plain format

```
$gendiff -f plain file1.json file2.json
$gendiff --format plain file1.yaml file2.yaml
```

[![asciicast](https://asciinema.org/a/440093.svg)](https://asciinema.org/a/440093)

#### json fotmat

```
$gendiff -f json file1.json file2.json
$gendiff --format json file1.yaml file2.yaml
```

[![asciicast](https://asciinema.org/a/440094.svg)](https://asciinema.org/a/440094)
