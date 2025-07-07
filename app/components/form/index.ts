import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormTextarea from './FormTextarea.vue'
import FormCheckBox from './FormCheckBox.vue'
import FormRadioGroup from './FormRadioGroup.vue'
import FormDropdown from './FormDropdown.vue'
import FormSelectSearch from './FormSelectSearch.vue'
import FormRadioGroupBorder from './FormRadioGroupBorder.vue'

export default {
  install: (app: any) => {
    app.component('form-input', FormInput)
    app.component('form-select', FormSelect)
    app.component('form-textarea', FormTextarea)
    app.component('form-check-box', FormCheckBox)
    app.component('form-radio-group', FormRadioGroup)
    app.component('form-radio-group-border', FormRadioGroupBorder)
    app.component('form-dropdown', FormDropdown)
    app.component('form-select-search', FormSelectSearch)
  }
}
