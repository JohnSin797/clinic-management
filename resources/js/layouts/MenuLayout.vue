<template>
    <main>
        <SideNav :isOpen="this.menu"/>
        <TopNav @handleMenu="onChangeMenu" />
        <div class="absolute right-0 w-full md:w-5/6">
            <slot></slot>
        </div>
    </main>
</template>

<script>
import axios from "axios"
import Navigation from "../components/Navigation.vue"
import SideNav from "../components/SideNav.vue"
import TopNav from "../components/TopNav.vue"

export default {
    data() {
        return {
            menu: true,
            full_name: '',
        }
    },
    components: {
        Navigation, SideNav, TopNav
    },
    methods: {
        isActive(link) {
            return this.$route.path.startsWith(link)
        },
        logout() {
            localStorage.removeItem('clinic-management-token')
            this.$router.push('/')
        },
        onChangeMenu() {
            this.menu = !this.menu
        },
        
    },
    computed: {
        getFullName() {
            const itemStr = localStorage.getItem('clinic-management-token')
            const item = JSON.parse(itemStr)
            this.full_name = item?.user?.first_name + ' ' + item?.user?.last_name
        }
    },
    mounted() {
        this.getFullName
    },
}
</script>

<style>
.active-link {
    font-weight: bold;
    background-color: black;
}
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>