<template>
  <q-card
    clickable 
    class="my-card flex flex-center" 
    v-ripple 
    tag="a"
    :href="link" 
  >
    <div class="flex column" >
      
      <q-icon :name="icon" />
      <q-item-section class="flex column q-pa-none flex-center">
        <h5>{{ amount }}</h5>
        <p>{{ name }}</p>
      </q-item-section>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '#'
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  height: auto;
  min-width: 170px;
  max-width: 200px;
  margin: 0.5rem 0.5rem;
  align-content: center;
  opacity: 54%;
  text-decoration: none;
  color: #000;
  i {
    margin-top: 1rem;
    font-size: 6rem;
  }
  h5 {
    margin: 1rem;
    font-size: 2.5rem;
  }
  @media screen and (max-width:480px) {
    margin: 0.2rem 0.25rem;
  }
}
</style>
