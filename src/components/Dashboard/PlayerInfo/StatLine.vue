<template>
  <b-row>
    <b-col :cols="left">
      <span>
        {{field}}
      </span>
    </b-col>
    <b-col :cols="right">
      <span>
        <slot v-if="!value" name="stat"></slot>
        <template v-if="value">
          {{value}}
        </template>
      </span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Stat',
  props: {
    field: {
      type: String
    },
    value: {
      type: String
    },
    left: {
      type: [String, Number],
      default: '6'
    },
    right: {
      type: [String, Number],
      default: '6'
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
