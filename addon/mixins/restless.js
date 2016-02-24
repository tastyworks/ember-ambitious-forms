import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export default Ember.Mixin.create({
  _modelMeta: Ember.computed.readOnly('model.constructor'),
  modelName: Ember.computed.readOnly('_modelMeta.resourceName'),

  _fieldTypeKey: Ember.computed('fieldKey', function () {
    return `_modelMeta.fields.${this.get('fieldKey')}.type`
  }),
  fieldType: computedIndirect('_fieldTypeKey'),

  _valueKey: Ember.computed('fieldKey', function () {
    return `model.${this.get('fieldKey')}`
  }),
  value: computedIndirect('_valueKey'),

  _didUpdate: Ember.observer('value', function () {
    let model = this.get('model')
    if (model.trigger) {
      model.trigger('didUpdate')
    }
  })
})
