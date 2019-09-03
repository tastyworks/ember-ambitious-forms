import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export function autoLoad (appInstance) {
  return (typeof RESTless != 'undefined') && (RESTless instanceof Ember.Namespace)
}

export const Plugin = Ember.Mixin.create({
  model: Ember.computed.alias('scope'),

  _modelMeta: Ember.computed('model', function () {
    return this.get('model.constructor')
  }),

  scopeName: Ember.computed('_modelMeta.resourceName', function () {
    return this.get('_modelMeta.resourceName') || this._super()
  }),

  fieldType: computedIndirect('_fieldTypeKey'),
  _fieldTypeKey: Ember.computed('_modelMeta.fields', 'fieldKey', function () {
    if (this.get('_modelMeta.fields')) {
      return `_modelMeta.fields.${this.get('fieldKey')}.type`
    } else {
      return '_fieldType'
    }
  }),

  _didUpdate: Ember.observer('value', function () {
    let model = this.get('model')
    if (model && model.trigger) {
      model.trigger('didUpdate')
    }
  })
})

export default { autoLoad, Plugin }
