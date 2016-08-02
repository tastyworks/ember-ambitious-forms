import Ember from 'ember'

export default Ember.Service.extend({
  config: Ember.computed('_defaultConfig', '_envConfig', function () {
    return Ember.Object.create(
      this.get('_defaultConfig'),
      this.get('_envConfig')
    )
  }),

  _defaultConfig: Ember.computed(function () {
    return {
      prompt: 'Select',
      plugins: this._detectAutoLoadPlugins()
    }
  }),

  _envConfig: Ember.computed(function () {
    let config = Ember.getOwner(this).resolveRegistration('config:environment')
    return config && config['ember-ambitious-forms']
  }),

  _loadFormPlugins: Ember.on('init', function () {
    // TODO: observe 'config.plugins' and load/unload changes
    let owner = Ember.getOwner(this)
    let afFieldClass = owner._lookupFactory('component:amb-form-field')
    this.get('config.plugins').forEach((name) => {
      let plugin = owner.resolveRegistration(`amb-form-plugin:${name}`)
      if (plugin instanceof Ember.Mixin) {
        afFieldClass.reopen(plugin)
      } else if (plugin && plugin.Plugin instanceof Ember.Mixin) {
        afFieldClass.reopen(plugin.Plugin)
      } else {
        Ember.warn(`Not a valid plugin: ${name}`)
      }
    })
  }),

  _detectAutoLoadPlugins () {
    let owner = Ember.getOwner(this)
    let debugAdapter = owner.lookup('container-debug-adapter:main')
    return debugAdapter.catalogEntriesByType('amb-form-plugin')
           .filter((name) => {
              let plugin = owner.resolveRegistration(`amb-form-plugin:${name}`)
              return plugin &&
                     (plugin instanceof Ember.Mixin) ||
                     (plugin.autoLoad && plugin.autoLoad(owner))
           })
  }
})
