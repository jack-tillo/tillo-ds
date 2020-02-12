<template>
    <div></div>
</template>

<script>
// import tilloTh from './components/heading'
// import config from './components/config'

export default {
    props: {
        /**
         * Unique id for the table.<br />
         * Used to help save the column prefs for the user<br />
         * Id's should be unique enough to the partner,<br />
         * page and table usage(possibly the user).<br /><br />
         * 
         * e.g: <strong>partner-dashboard-shapshot-table</strong>
         * 
         */
        id: {
            type: String,
            required: true
        },

        /**
         * Can the table columns be hidden.<br />
         * Used inconjuction with the table id. 
         * 
         */
        configurable: {
            type: Boolean,
            required: false  
        },

        /**
         * Can the table be scrolled.<br />
         * If activated, this enables scrolling both horizontally and vertically 
         * 
         */
        scrollable: {
            type: Boolean,
            required: false
        },

        /**
         * An array of objects used to define the heading row.<br />
         * Also acts as a way to store the visibility of a column<br />
         * This is required as it helps us build the outer colspan for the surrounding column.<br /><br />
         * <strong>
         * ...<br />
         *    {label: 'Currency', id: 'currency'},<br />
         *    {label: 'Amount', id: 'amount'}<br />
         * ...<br />
         * </strong>
         */
        headings: {
            type: Array,
            required: true
        },

        /**
         * An array of objects representing the data.<br /><br />
         * Ideally, each entry should contain AT LEAST the same amount<br />
         * of key value pairs used to represent the headings. When in auto mode<br />
         * the table relies on an equal amount of 'columns' in both the headings array<br />
         * and each entry.<br />
         * 
         * <strong>Note<strong>: In auto mode the table needs to know where to find<br />
         * the string to display. For this reason each 'column' specifies a 'content'<br />
         * attribute, so it can always find the correct data to display:<br /><br />
         * 
         * <strong>
         * ...<br />
         *    {currency: {content:'GBP(£)', amount:'20,000.57'}},<br />
         *    {currency: {content:'EUR(€)', amount:'5,000.90'}}<br />
         * ...<br />
         * </strong>
         * 
        */
        entries: {
            type: Array,
            required: false,
            default: () => {
            return []
            }
        }
    },

    beforeCreate () {
        // this.storage = new StorageManager(window.localStorage)
        this.sorting = {}
    },

    data () {
        return {
            configuration: [],
            configurationAsObject: {},
            currentSort: {by:'', dir:'DESC', combine: ''}
        }
    },

    components: {
        // tilloTh,
        // config
    },

    watch: {
        headings: {
            immediate: true,
            handler (headings) {
                // Build default columns and wait 
                // for promise
                this.configuration = headings.map(heading => {
                    return {heading, visible: true}
                })
                headings.forEach(element => {
                    this.configurationAsObject[element.id] = {visible: true}
                });
                // Do check here for anything saved in storage
                // and overwrite the above if found
                if(!this.storage) return
                this.storage.getItem(this.id).then(item => {
                    if(item !== null) {
                        const config = JSON.parse(item)
                        this.configuration = config.asIndex
                        this.configurationAsObject = config.asObject
                    } 
                })
            }
        }
    },

    computed: {
        columns () {
            return {
                asObject: this.configurationAsObject,
                asArray: this.configuration
            }
        },

        colspan () {
            return this.configurable
            ? this.headings.length + 1
            : this.headings.length
        },

        canApplyHeadShadowStyle () {
            return this.scrollable
            ? this.$style.headShadow
            : ''
        },

        compensateForScrollStyle () {
            return this.scrollable
            ? this.$style.adjustmentForScroll
            : ''  
        },

        scrollStyle () {
            return this.scrollable
            ? this.$style.withScroll
            : ''
        }
    },

    methods: {
        onConfigureColumns (event) {
            const index = event.index
            // Clone configurations, so we dont accidentally
            // change the ones inplace
            const updateConfiguration = this.configuration.map(column => {
            return column
            })
            const updateConfigAsObject = Object.assign(this.configurationAsObject, {})

            // Set new states on the cloned configurations
            const column = this.configuration[index]
            const currentVisibility = column.visible
            updateConfiguration[index].visible = !currentVisibility
            updateConfigAsObject[column.heading.id].visible = !currentVisibility

            // Update storage if available
            if (this.storage) {
                const data = {
                    asIndex: updateConfiguration,
                    asObject: updateConfigAsObject
                }
                this.storage.setItem(this.id, JSON.stringify(data))
            }

            // And update the configurations
            this.configuration = updateConfiguration
            this.configurationAsObject = updateConfigAsObject
        },

        onHeadClick (heading) {
            const sort = (heading.sort)
            ? heading.sort
            : this.buildSort(heading)
            this.currentSort = sort
            this.$emit('sort', {heading, sort})
        },

        buildSort ({id}) {
            const sort = this.getSort(id)
            const by = sort.by
            const dir = this.getSortString(sort.dir)
            return {by, dir, combine: `${by}|${dir}`}
        },

        getSort (id) {
            const sort = (this.sorting[id])
            ? this.sorting[id]
            : {by: id}

            sort.dir = (sort.dir === undefined) ? true : !sort.dir
            this.sorting[id] = sort
            return sort
        },

        getSortString (isASC) {
            return isASC ? 'ASC' : 'DESC'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>