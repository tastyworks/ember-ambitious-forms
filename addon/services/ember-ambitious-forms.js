import Ember from 'ember'

import { DEFAULT_CONFIG as FIELD_DEFAULT_CONFIG } from '../components/af-field'

import i18n from '../mixins/i18n'
import loc from '../mixins/loc'
import restless from '../mixins/restless'
import validations from '../mixins/validations'

const AF_FIELD_MIXINS = { i18n, loc, restless, validations }

export default Ember.Service.extend({
  config: Object.assign({}, FIELD_DEFAULT_CONFIG, {
    prompt: 'Select',
    fieldPlugins: []
  }),
  configure (arg) {
    if (typeof arg === 'function') {
      arg(this.config)
    } else {
      Ember.$.extend(true, this.config, arg)
    }

    let afFieldClass = Ember.getOwner(this).resolveRegistration('component:af-field')
    this.config.fieldPlugins.forEach((plugin) => {
      if (plugin instanceof Ember.Mixin) {
        afFieldClass.reopen(plugin)
      } else if (AF_FIELD_MIXINS[plugin]) {
        afFieldClass.reopen(AF_FIELD_MIXINS[plugin])
      } else {
        Ember.warn(`Not a valid plugin: ${plugin}`)
      }
    })

    return this
  }
})
