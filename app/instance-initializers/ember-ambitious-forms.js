import Ember from 'ember'
import config from '../config/environment'

export function initialize (appInstance) {
  let emberAmbitiousForms = appInstance.lookup('service:ember-ambitious-forms')
  if (config['ember-ambitious-forms']) {
    emberAmbitiousForms.configure(config['ember-ambitious-forms'])
  }

  if (!Ember.get(config, 'ember-ambitious-forms.fieldPlugins')) {
    // Detect plugins if they are not defined
    emberAmbitiousForms.configure((eaf) => {
      if (appInstance.hasRegistration('service:i18n')) {
        eaf.fieldPlugins.push('i18n')
      }
      if (appInstance.hasRegistration('service:validations')) {
        eaf.fieldPlugins.push('validations')
      }
      if ((typeof RESTless != 'undefined') && (RESTless instanceof Ember.Namespace)) {
        eaf.fieldPlugins.push('restless')
      }
    })
  }
}

export default {
  name: 'ember-ambitious-forms',
  initialize: initialize
}
