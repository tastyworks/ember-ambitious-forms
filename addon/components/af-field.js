import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export default Ember.Component.extend({
  service: Ember.inject.service('ambitious-forms'),

  tagName: 'label',
  classNames: ['af-field'],

  // TODO: figure out a better way to do this
  _onWillInsertElement: Ember.on('willInsertElement', function () {
    let afForm = this.get('afForm')
    afForm && afForm.addField(this)
  }),

  // TODO: figure out a better way to do this
  _onWillDestroyElement: Ember.on('willDestroyElement', function () {
    let afForm = this.get('afForm')
    afForm && afForm.removeField(this)
  }),

  type: Ember.computed('options.length', 'fieldType', 'fieldKey', function () {
    if (this.get('options.length') > 0) {
      return 'select'
    }

    if (this.get('fieldType') === 'number') {
      return 'number'
    }

    let lcaseFieldKey = (this.get('fieldKey') || '').toLowerCase()

    if (lcaseFieldKey.includes('password')) {
      return 'password'
    } else if (lcaseFieldKey.includes('email')) {
      return 'email'
    } else if (lcaseFieldKey.includes('phone')) {
      return 'tel'
    } else if (lcaseFieldKey.includes('url')) {
      return 'url'
    }

    return 'text'
  }),

  _isComponent (name) {
    // Magic sauce: https://github.com/emberjs/ember.js/blob/v2.3.0/packages/ember-htmlbars/lib/keywords/closure-component.js#L69
    let container = Ember.getOwner(this)
    let componentLookup = container.lookup('component-lookup:main')
    return Boolean(componentLookup.lookupFactory(name, container))
  },

  // The 'component' helper only takes names and component-helper output, not component classes
  // #EmberFails
  _asComponent (name) {
    return this._isComponent(name) ? name : null
  },

  inputComponent: Ember.computed('type', 'constructor.customTypeComponents', function () {
    let type = this.get('type')
    let customTypeComponents = this.get('constructor.customTypeComponents')

    return customTypeComponents[type] ||
      this._asComponent(type) ||
      this._asComponent(`af-${type}`)
  }),

  hasError: Ember.computed.notEmpty('errors'),
  errors: null,
  value: null,

  // show errors only after form was pinged to hide initial errors
  hideError: true,

  focusOut: Ember.observer('value', function () {
    this.set('hideError', false)
  }),

  showError: Ember.computed('hasError', 'hideError', function () {
    return this.get('hasError') && !this.get('hideError')
  }),

  required: false,
  label: null,

  labelClass: Ember.computed('required', function () {
    let required = this.get('required')
    if (required === true) {
      return 'af-required'
    } else if (required) {
      return `af-required-${required}`
    }
  }),

  hintClass: null,
  hint: null,

  prompt: Ember.computed.oneWay('service.defaultPrompt'),
  options: Ember.computed.alias('optionValues'),

  optionValues: Ember.computed('fieldType', function () {
    if (this.get('fieldType') === 'boolean') {
      return [true, false]
    }
  })
}).reopenClass({
  positionalParams: ['fieldKey'],
  customTypeComponents: {}
})
