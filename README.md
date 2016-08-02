# ember-ambitious-forms

Ambitious, flexible, (mostly) *un*opinionated form helpers.

## Usage

Command-line:

```bash
$ ember install git://github.com/dough-com/ember-ambitious-forms
```

Template:

```handlebars
{{#amb-form scope=object submit='actionName' as |f|}}
  {{f.field 'propName' label='Property Name'}}
  {{f.field 'propBool' label='Check it' type='checkbox'}}

  <button>Submit</button>
{{/amb-form}}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
