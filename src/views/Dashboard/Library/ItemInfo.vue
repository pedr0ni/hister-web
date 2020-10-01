<template>
    <Item v-if="item || isLoading" :item="item" :isLoading="isLoading" />
    <EmptyState 
        image="login-placeholder.png" 
        title="Ops..." 
        content="Esse livro não pode ser encontrado no banco de dados." 
        v-else />
</template>

<script>
import BookService from '../../../services/BookService'
import Item from './Item'

export default {
    name: 'ItemInfo',
    data() {
        return {
            item: null,
            isLoading: true
        }
    },
    components: {
        Item
    },
    methods: {
        async loadData() {
            this.isLoading = true
            const { id } = this.$route.params
            
            const response = await BookService.listById(id)

            if (response) {
                this.item = response.data
            }

            this.isLoading = false
        }
    },
    beforeMount() {
        this.loadData()
    }

}
</script>