import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

import ConvertedOptions from '../mixins/converted-options'
import ErrorState from '../utils/error-state'

export default Ember.Component.extend(ConvertedOptions, {
  layoutName: 'ember-ambitious-forms@components/amb-form-field',
  service: Ember.inject.service('ember-ambitious-forms'),

  tagName: 'label',
  classNames: ['amb-form-field'],
  readOnly: false,
  // By default, do not show errors until user has interacted with the field
  alwaysShowErrors: false,
  _wasInteracted: false,

  _onInsert: Ember.on('didInsertElement', function () {
    this.sendAction('onInsert', this)
  }),

  _onRemove: Ember.on('willDestroyElement', function () {
    this.sendAction('onRemove', this)
  }),

  _fieldTypeConfig (configName) {
    let fieldType = this.get('fieldType')
    if (fieldType) {
      return this.get(`service.config.fieldTypeMappings.${fieldType}.${configName}`)
    }
  },

  scopeName: Ember.computed('scope.scopeName', 'scope.constructor._toString', function () {
    let scopeName = this.get('scope.scopeName')
    if (scopeName) {
      return scopeName
    }

    // See if scope has injection _toString
    let matcher = /^.*:([-/a-z0-9]+):$/
    let injectedClassName = this.get('scope.constructor._toString')
    if (matcher.test(injectedClassName)) {
      return injectedClassName.replace(matcher, '$1')
    }
  }),

  type: Ember.computed('options.length', 'fieldType', 'fieldKey', function () {
    let fieldTypeComponent = this._fieldTypeConfig('type')
    if (fieldTypeComponent) {
      return fieldTypeComponent
    }

    if (this.get('options.length') > 0) {
      return 'select'
    }

    switch (this.getWithDefault('fieldType', '').toLowerCase()) {
      case 'number':  return 'number'
      case 'boolean': return 'checkbox'
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
    // Magic sauce: https://github.com/emberjs/ember.js/blob/a841b2e498557cff62c5cb56b01342a0af7abecd/packages/ember-htmlbars/lib/utils/is-component.js#L13
    let owner = Ember.getOwner(this)
    return owner.hasRegistration('component:' + name) ||
           owner.hasRegistration('template:components/' + name)
  },

  // The 'component' helper only takes names and component-helper output, not component classes
  _asComponent (name) {
    return this._isComponent(name) ? name : null
  },

  inputComponent: Ember.computed('readOnly', 'type', function () {
    if (this.get('readOnly')) {
      return 'amb-form-read-only'
    }

    let type = this.get('type')

    return this._asComponent(type) ||
      this._asComponent(`amb-form-${type}`) ||
      'amb-form-input'
  }),

  value: computedIndirect('_valueKey'),
  _valueKey: Ember.computed('scope', 'fieldKey', function () {
    if (this.get('scope')) {
      return `scope.${this.get('fieldKey')}`
    } else {
      // Scope does not exist. Stick it on current component instance instead
      return '_value'
    }
  }),

  formattedValue: Ember.computed('value', function () {
    let formatter = this.get('formatter')
    return formatter.call(this, this.get('value'))
  }),

  formatter (value) {
    if (this.get('type') === 'password') {
      return
    }

    let selectedOption = Ember.A(this.get('convertedOptions') || []).findBy('value', value)
    if (selectedOption) {
      return selectedOption.get('text')
    }

    return value
  },

  errors: null,
  hasErrors: Ember.computed('readOnly', 'errors.length', function () {
    return !this.get('readOnly') && Boolean(this.get('errors.length'))
  }),
  showErrors: Ember.computed.or('_wasInteracted', 'alwaysShowErrors'),

  errorState: Ember.computed(function () {
    return ErrorState.create({ content: [this] })
  }),

  // If the field has 2 inputs, it might trigger focusOut => focusIn immediately
  // Delay this fire to prevent double triggering from executing.
  focusOut () {
    this._doFocusOutTimer = Ember.run.debounce(this, this._doFocusOut, 50)
  },

  _doFocusOut () {
    if (!this.isDestroyed) {
      this.set('_wasInteracted', true)
    }
  },

  focusIn () {
    if (this._doFocusOutTimer) {
      Ember.run.cancel(this._doFocusOutTimer)
      this._doFocusOutTimer = null
    }
  },

  required: false,
  label: null,

  labelClass: Ember.computed('required', function () {
    let required = this.get('required')
    if (required === true) {
      return 'amb-form-required'
    } else if (required) {
      return `amb-form-required-${required}`
    }
  }),

  hint: null,
  hintClass: null,

  description: null,
  descriptionClass: null,

  prompt: Ember.computed.oneWay('service.config.prompt'),
  options: Ember.computed.oneWay('optionValues'),

  optionValues: Ember.computed('fieldType', function () {
    return this._fieldTypeConfig('options')
  }),

  actions: {
    valueChanged (newValue) {
      this.set('value', newValue)
      this.sendAction('onChange', newValue, this.get('formattedValue'))
    }
  }
}).reopenClass({
  positionalParams: ['fieldKey']
})
