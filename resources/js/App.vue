<template>
    <div>
        <template v-if="showLayout">
            <MenuLayout>
                <router-view></router-view>
            </MenuLayout>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
    import MenuLayout from './layouts/MenuLayout.vue'
    import axios from 'axios'
    // axios.defaults.withCredentials = true
    export default {
        name: "App",
        components: {
            MenuLayout
        },
        computed: {
            showLayout() {
                return this.$route.meta.Layout
            }
        },
        methods: {
            test() {
                const itemStr = localStorage.getItem('clinic-management-token')
                const item = JSON.parse(itemStr)
                axios.get('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${item?.value}`
                    }
                })
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    localStorage.removeItem('clinic-management-token')
                })
            }
        },
        mounted() {
            // this.test()
        }
    }
</script>