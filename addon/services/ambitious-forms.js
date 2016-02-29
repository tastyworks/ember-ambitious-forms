import Ember from 'ember'

import AFField from '../components/af-field'

import i18n from '../mixins/i18n'
import loc from '../mixins/loc'
import restless from '../mixins/restless'
import validations from '../mixins/validations'

const AF_FIELD_MIXINS = { i18n, loc, restless, validations }

export default Ember.Service.extend({
  defaultPrompt: 'Select'
}).reopenClass({
  useFieldPlugins (...plugins) {
    // TODO: localize plugins instead of tossing them onto the base class
    for (let plugin of plugins) {
      if (plugin instanceof Ember.Mixin) {
        AFField.reopen(plugin)
      } else if (AF_FIELD_MIXINS[plugin]) {
        AFField.reopen(AF_FIELD_MIXINS[plugin])
      } else {
        Ember.warn(`Not a valid plugin: ${plugin}`)
      }
    }
  }
})
