import { createApp, ref } from 'vue'
import {Tabs, Tab} from 'vue3-tabs-component';

createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .mount('#app')