<template>
    <div class="dropdown-container" ref="anchor">
        <slot
            name="trigger"
            :options="options"
            :selected="selectedOptions"
            :label="label"
            :deselect="deselect"
            :open="open"
            :close="close"
            :toggleOpen="toggleOpen"
        >
            <div :class="['trigger-container', disabled ? 'trigger-disabled' : '']">
                <label v-if="label" class="trigger-label">
                    {{label}}
                    <span v-if="required" class="trigger-asterix">*</span>
                </label>
                <button class="trigger-button" @mousedown.stop="toggleOpen">
                    <p
                        :class="['trigger-text', isUsingPlaceholder ? 'placeholder' : '']"
                    >{{placeholderOrSelected}}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" :class="['trigger-icon', isOpen ? 'rotated' : '']">
                        <path fill="currentColor" fill-rule="nonzero" d="M14.758 11.597l-8.755 8.22a1.645 1.645 0 0 0-.124 2.235c.55.654 1.499.712 2.118.131l10-9.39c.665-.624.672-1.72.013-2.353L8.01.83a1.445 1.445 0 0 0-2.12.104 1.646 1.646 0 0 0 .1 2.237l8.768 8.426z"/>
                    </svg>
                </button>
            </div>
        </slot>
        <div class="popper-container" ref="popper">
            <div v-if="useArrow" x-arrow class="arrow"></div>
            <slot
                v-if="isOpen"
                name="options"
                :options="options"
                :select="select"
                :deselect="deselect"
                :toggle="toggle"
                :isSelected="option => arrayContainsValue (selectedArray, option)"
            >
                <div class="option-container">
                    <button
                        v-for="option in options"
                        class="option-button"
                        :class="arrayContainsValue (selectedArray, option) ? 'selected' : ''"
                        :key="option.value"
                        @mousedown.stop="toggle(option)"
                    >
                        <p class="option-text">{{option.label}}</p>
                        <!-- <checkbox
                            v-if="multiselect"
                            :value="arrayContainsValue (selectedArray, option)"
                        /> -->
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import Popper from 'popper.js'
// TODO Add @tillo/checkbox here
export default {
    name: 'dropdown',
    props: {
        value: [Object, Array],
        options: Array,
        label: String,
        disabled: Boolean,
        multiselect: Boolean,
        required: Boolean,
        placeholder: String,
        useArrow: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data () {
        return {
            isOpen: false,
            selectedSingle: {},
            selectedArray: [],
            popper: null
        }
    },
    watch: {
        selectedOptions: {
            immediate: true,
            handler (val) {
                this.$emit('changed', val)
            }
        },
        value: {
            immediate: true,
            handler (val) {
                if (this.multiselect) {
                    this.selectedArray = val
                } else {
                    this.selectedSingle = val
                }
            }
        }
    },
    computed: {
        selectedOptions () {
            if (this.multiselect) {
                return this.selectedArray
            } else {
                return this.selectedSingle
            }
        },
        placeholderOrSelected () {
            if (this.multiselect) {
                return !this.isUsingPlaceholder
                    ? this.selectedArray.map(o => o.label).join(', ')
                    : this.placeholder
            } else {
                return !this.isUsingPlaceholder
                    ? this.selectedSingle && this.selectedSingle.label
                    : this.placeholder
            }
        },
        isUsingPlaceholder () {
            if (this.multiselect) {
                return this.selectedArray.length === 0
            } else {
                return this.selectedSingle && this.selectedSingle.label === undefined
            }
        }
    },
    methods: {
        toggleOpen () {
            if (this.disabled) {
                return
            }
            if (this.isOpen) {
                this.close()
            } else {
                this.open()
            }
        },
        open () {
            if (this.disabled) {
                return
            }
            this.isOpen = true
            this.$emit('opened', true)
            this.$nextTick().then(() => {
                this.popper = new Popper(this.$refs.anchor, this.$refs.popper, {
                    modifiers: {
                        placement: 'bottom',
                        offset: '20px',
                        arrow: {
                            enabled: true
                        }
                    }
                })
                document.body.addEventListener('mousedown', this.close)
            })
        },
        close () {
            if (this.disabled) {
                return
            }
            this.isOpen = false
            this.$emit('closed', true)
            document.body.removeEventListener('mousedown', this.close)
            this.popper.destroy()
        },
        deselect (option) {
            if (this.disabled) {
                return
            }
            if (this.multiselect) {
                if (this.arrayContainsValue(this.selectedArray, option)) {
                    this.selectedArray = this.selectedArray.filter(
                        o => o.value !== option.value
                    )
                }
                this.$emit('input', this.selectedArray)
            } else {
                this.selectedSingle = {}
                this.$emit('input', this.selectedSingle)
                this.close()
            }
        },
        select (option) {
            if (this.disabled) {
                return
            }
            if (this.multiselect) {
                if (!this.arrayContainsValue(this.selectedArray, option)) {
                    this.selectedArray.push(option)
                    this.$emit('input', this.selectedArray)
                }
            } else {
                this.selectedSingle = option
                this.$emit('input', this.selectedSingle)
                this.close()
            }
        },
        toggle (option) {
            if (this.disabled) {
                return
            }
            if (this.multiselect) {
                if (this.arrayContainsValue(this.selectedArray, option)) {
                    this.selectedArray = this.selectedArray.filter(
                        o => o.value !== option.value
                    )
                } else {
                    this.selectedArray.push(option)
                }
                this.$emit('input', this.selectedArray)
            } else {
                this.select(option)
                this.close()
            }
        },
        arrayContainsValue (array, option) {
            const val = option.value
            return array.filter(o => o.value === val).length > 0
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@tillo-ds/styles/colours.scss';
@import '~@tillo-ds/styles/triangle.scss';
.dropdown-container {
    position: relative;
}

.trigger-container {
    display: flex;
    flex-direction: column;
    .trigger-label {
        font-family: 'Roboto';
        margin-bottom: 4px;
        font-size: 18px;
        color: $dark-grey;
        .trigger-asterix {
            font-family: 'Roboto';
            color: $red;
            margin-left: 3px;
        }
    }
    .trigger-button {
        background: #fff;
        font-family: 'Roboto';
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        border: 1px solid $medium-grey;
        padding: 10px;
        .trigger-text {
            margin: 0;
            font-size: 16px;
            color: $dark-grey;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.placeholder {
                color: $placeholder-grey;
            }
        }
        .trigger-icon {
            width: 13px;
            height: 13px;
            color: $placeholder-grey;
            transition: all 0.2s ease;
            transform: rotate(90deg);
            &.rotated {
                transform: rotate(270deg);
            }
        }
        &:hover {
            cursor: pointer;
        }
    }
    &.trigger-disabled {
        cursor: not-allowed;
        .trigger-button {
            cursor: not-allowed;
            .trigger-text {
                color: $placeholder-grey;
            }
        }
    }
}

.arrow {
    position: absolute;
    z-index: 50;
}

.popper-container {
    z-index: 50;
    position: absolute;
    width: 100%;
    &[x-placement='bottom'],
    &[x-placement='bottom-start'],
    &[x-placement='bottom-end'] {
        padding-top: 5px;
        .arrow {
            @include withTriangle(bottom, 5px, $medium-grey);
            top: 0px;
        }
    }
    &[x-placement='top'],
    &[x-placement='top-start'],
    &[x-placement='top-end'] {
        padding-bottom: 5px;
        .arrow {
            @include withTriangle(top, 5px, $medium-grey);
            bottom: 0px;
        }
    }
}

.option-container {
    display: flex;
    flex-direction: column;
    border: 1px solid $medium-grey;
    .option-button {
        font-family: 'Roboto';
        &.selected {
            background: $cool-grey;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        height: 40px;
        padding: 10px;
        border: none;
        border-bottom: 1px solid $medium-grey;
        overflow-x: hidden;
        text-overflow: ellipsis;
        &:last-child {
            border-bottom: none;
        }
        &:hover {
            background: $cool-grey;
            cursor: pointer;
        }
        .option-text {
            margin: 0;
            text-align: left;
            font-size: 16px;
            color: $dark-grey;
        }
    }
}
</style>
