import Ember from 'ember'
import config from '../config/environment'

export function autoDetectFieldPlugins (appInstance) {
  let potentialPlugins = {
    i18n: appInstance.hasRegistration('service:i18n'),
    validations: appInstance.hasRegistration('service:validations'),
    restless: (typeof RESTless != 'undefined') && (RESTless instanceof Ember.Namespace)
  }

  return Object.keys(potentialPlugins).filter((key) => potentialPlugins[key])
}

export function initialize (appInstance) {
  let emberAmbitiousForms = appInstance.lookup('service:ember-ambitious-forms')
  if (config['ember-ambitious-forms']) {
    emberAmbitiousForms.configure(config['ember-ambitious-forms'])
  }

  if (!Ember.get(config, 'ember-ambitious-forms.fieldPlugins')) {
    emberAmbitiousForms.configure({
      fieldPlugins: autoDetectFieldPlugins(appInstance)
    })
  }
}

export default {
  name: 'ember-ambitious-forms',
  initialize: initialize
}
