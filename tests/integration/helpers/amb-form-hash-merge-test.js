
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('amb-form-hash-merge', 'helper:amb-form-hash-merge', {
  integration: true
})

test('it renders', function (assert) {
  this.set('hash', { key1: 'value3' })

  this.render(hbs`
    {{#with (amb-form-hash-merge hash key1='value1' key2='value2') as |h|}}
      {{h.key1}},{{h.key2}}
    {{/with}}
  `)

  assert.equal(this.$().text().trim(), 'value1,value2')
})

