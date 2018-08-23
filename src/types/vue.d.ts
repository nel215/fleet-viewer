import Vue from 'vue';

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue = Vue> {
    delete(object: object, key: number): void;
  }
}
