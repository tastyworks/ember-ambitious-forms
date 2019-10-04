# ember-ambitious-forms

Ambitious, flexible, (mostly) *un*opinionated form helpers.

## Usage

Command-line:

```bash
$ ember install @tastyworks/ember-ambitious-forms
```

Template:

```handlebars
{{#amb-form scope=object submit='actionName' as |f|}}
  {{f.field 'propName' label='Property Name'}}
  {{f.field 'propBool' label='Check it' type='checkbox'}}

  <button>Submit</button>
{{/amb-form}}
```

## Developing

To request changes, please fork this project and create a PR from that.

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Releasing

Github Actions will automatically package the module whenever the package.json version is bumped and version tag is created in the `postversion` script.

**After merging your PR to master:**

```bash
git checkout master
git pull && git push # to ensure local and remote match
npm version <major|minor|patch>
```
