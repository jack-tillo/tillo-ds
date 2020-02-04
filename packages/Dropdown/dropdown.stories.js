import {storiesOf} from '@storybook/vue';
import Dropdown from './src/Dropdown.vue';
const value = [{ label: `hello1`, value: `hello1` }]
const options = [
    { label: `hello1`, value: `hello1` },
    { label: `hello2`, value: `hello2` },
    { label: `hello3`, value: `hello3` },
    { label: `hello4`, value: `hello4` },
    { label: `hello5`, value: `hello5` },
    { label: `hello6`, value: `hello6` },
    { label: `hello7`, value: `hello7` }
]

storiesOf('Dropdown', module)
    .addParameters({component: Dropdown})
    .add('Default', () => ({
        components: {
            Dropdown
        },
        data() {
            return {
                options,
                value
            }
        },
        template:
            `<dropdown
                label="My epic dropdown"
                placeholder="Select an option"
                :options="options"
                :value="value"
            />`
    }))
    .add('Multiselect', () => ({
        components: {
            Dropdown
        },
        data() {
            return {
                options,
                value
            }
        },
        template:
            `<dropdown
                multiselect
                placeholder="Select an option"
                :options="options"
                :value="value"
            />`
    }))
    .add('Custom trigger', () => ({
        components: {
            Dropdown
        },
        data() {
            return {
                options,
                value
            }
        },
        template:
            `<dropdown
                multiselect
                placeholder="Select an option"
                :options="options"
                :value="value"
                :use-arrow="false"
            >
                <template #trigger="{selected, toggleOpen, deselect}">
                    <div>
                        <button @mousedown.stop="toggleOpen">
                            Open
                        </button>
                        <button v-for="(option, index) in selected"
                            :key="index"
                            @click="deselect(option)"
                        >
                            deselect {{option.label}}
                        </button>
                    </div>
                </template>
            </dropdown>`
    }))