import Ember from 'ember'

import i18n from '../mixins/i18n'
import loc from '../mixins/loc'
import restless from '../mixins/restless'
import validations from '../mixins/validations'

const AF_FIELD_MIXINS = { i18n, loc, restless, validations }

export default Ember.Service.extend({
  config: Ember.computed('_defaultConfig', '_envConfig', function () {
    let configs = [
      this.get('_defaultConfig'),
      this.get('_envConfig')
    ]
    return Ember.Object.create(...configs)
  }),

  _defaultConfig: Ember.computed(function () {
    return {
      prompt: 'Select',
      fieldPlugins: this._autoDetectFieldPlugins()
    }
  }),

  _envConfig: Ember.computed(function () {
    let config = Ember.getOwner(this).resolveRegistration('config:environment')
    return config && config['ember-ambitious-forms']
  }),

  _loadFieldPlugins: Ember.on('init', function () {
    // TODO: observe 'config.fieldPlugins' and load/unload changes
    let afFieldClass = Ember.getOwner(this).resolveRegistration('component:af-field')
    this.get('config.fieldPlugins').forEach((plugin) => {
      if (plugin instanceof Ember.Mixin) {
        afFieldClass.reopen(plugin)
      } else if (AF_FIELD_MIXINS[plugin]) {
        afFieldClass.reopen(AF_FIELD_MIXINS[plugin])
      } else {
        Ember.warn(`Not a valid plugin: ${plugin}`)
      }
    })
  }),

  _autoDetectFieldPlugins () {
    let owner = Ember.getOwner(this)
    let potentialPlugins = {
      i18n: owner.hasRegistration('service:i18n'),
      validations: owner.hasRegistration('service:validations'),
      restless: (typeof RESTless != 'undefined') && (RESTless instanceof Ember.Namespace)
    }

    return Object.keys(potentialPlugins).filter((key) => potentialPlugins[key])
  }
})
