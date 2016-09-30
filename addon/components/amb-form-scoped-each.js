import Ember from 'ember'

import AmbFormGroup from './amb-form-group'

export default AmbFormGroup.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-scoped-each',
  tagName: ''
}).reopenClass({
  positionalParams: ['scopes']
})
