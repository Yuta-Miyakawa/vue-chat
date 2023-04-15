<template>
<q-step
            :name="1"
            title="Shipping address"
            icon="shopping_cart"
            :done="step > 1"
            :header-nav="step > 1"
          >
            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.first_name" label="First Name *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.last_name" label="Last Name *"/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input dense autogrow outlined v-model="address_detail.address_line_1" class="full-width"
                           label="Address line 1 *"/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input dense autogrow outlined v-model="address_detail.address_line_2" class="full-width"
                           label="Address line 2 *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.city" label="City *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.state" label="State"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.zip_code" label="Zip Code"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input dense outlined class="full-width" v-model="address_detail.country" label="Country *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-checkbox dense outlined class="full-width" v-model="address_detail.checkbox"
                              label="Use this address for payment details"/>
                </q-item>
              </div>
            </div>

            <q-stepper-navigation>
              <q-btn rounded @click="() => { done1 = true; step = 2 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
            </q-stepper-navigation>
          </q-step>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Numbers',
  setup() {
    return {
      step: ref(1),
      address_detail: ref({}),
      card_detail: ref({})
    }
  }
})
</script>
