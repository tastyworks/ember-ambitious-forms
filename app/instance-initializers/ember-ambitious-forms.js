export function initialize (appInstance) {
  let emberAmbitiousForms = appInstance.lookup('service:ember-ambitious-forms')
  emberAmbitiousForms.configure((config) => {
    if (appInstance.hasRegistration('service:i18n')) {
      config.fieldPlugins.push('i18n')
    }
    if (appInstance.hasRegistration('service:validations')) {
      config.fieldPlugins.push('validations')
    }
    if ((typeof RESTless != 'undefined') && (RESTless instanceof Ember.Namespace)) {
      config.fieldPlugins.push('restless')
    }
  })
}

export default {
  name: 'ember-ambitious-forms',
  initialize: initialize
}
