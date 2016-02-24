import FmOptionable from './fm/optionable'

export default FmOptionable.extend({
  tagName: 'span',
  classNames: 'fm-select',

  prompt: 'Select',
  actions: {
    selectChange () {
      let formValue = this.$('.fm-select-input').val()
      // formValue is always a string so we have to compare the string value
      let option = this.get('optionsConverted').find((o) => formValue === o.value.toString())
      let value = option ? option.value : null
      this.set('value', value)
      this.sendAction('action', value)
    }
  }
})
