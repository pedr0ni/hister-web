<template>
    <Item :item="item" :isLoading="isLoading" />
    <!-- <EmptyState 
        image="login-placeholder.png" 
        title="Nenhum livro encontrado..." 
        content="Sua biblioteca de livros aparece aqui, clique no botão CADASTRAR para adicionar um livro" 
        v-else /> -->
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