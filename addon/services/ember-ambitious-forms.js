import Ember from 'ember'

import AFField, { DEFAULT_CONFIG as FIELD_DEFAULT_CONFIG } from '../components/af-field'

import i18n from '../mixins/i18n'
import loc from '../mixins/loc'
import restless from '../mixins/restless'
import validations from '../mixins/validations'

const AF_FIELD_MIXINS = { i18n, loc, restless, validations }

export default Ember.Service.extend({
  config: Object.assign({}, FIELD_DEFAULT_CONFIG, {
    prompt: 'Select'
  }),
  configure (arg) {
    if (typeof arg === 'function') {
      arg.call(this.config)
    } else {
      Ember.$.extend(true, this.config, arg)
    }

    if (this.config.fieldPlugins) {
      // TODO: localize plugin logic instead of tossing them onto the base class
      for (let plugin of this.config.fieldPlugins) {
        if (plugin instanceof Ember.Mixin) {
          AFField.reopen(plugin)
        } else if (AF_FIELD_MIXINS[plugin]) {
          AFField.reopen(AF_FIELD_MIXINS[plugin])
        } else {
          Ember.warn(`Not a valid plugin: ${plugin}`)
        }
      }
    }

    return this
  }
})
