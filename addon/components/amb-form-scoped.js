import Ember from 'ember'

import AmbFormGroup from './amb-form-group'

export default AmbFormGroup.extend({
  tagName: ''
}).reopenClass({
  positionalParams: ['scope']
})
