import Ember from 'ember'

import FieldGroup from '../mixins/field-group'

export default Ember.Component.extend(FieldGroup, {
  layoutName: 'ember-ambitious-forms@components/amb-form-scoped',
  tagName: ''
}).reopenClass({
  positionalParams: ['scope']
})
