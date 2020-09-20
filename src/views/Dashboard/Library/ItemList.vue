<template>
    <div>

        <div class="action-holder">
            <div class="input-holder icon-input">
                <Icon name="search" />
                <input type="text" placeholder="Buscar por titulos de livros...">
            </div>
            <router-link to="/dashboard/library/create">
                <button class="button primary-button ripple">
                    <Icon name="add" />
                    CADASTRAR
                </button>
            </router-link>
        </div>

        <div class="spinner-holder" v-if="isLoading">
            <Spinner :hasColor="true" size="large" v-if="isLoading" />
        </div>
        <EmptyState 
        image="login-placeholder.png" 
        title="Nenhum livro encontrado..." 
        content="Sua biblioteca de livros aparece aqui, clique no botão CADASTRAR para adicionar um livro" 
        v-else-if="books.length == 0" />
        <div v-else>
            <table class="table-responsive">
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Autor</td>
                        <td>Categoria</td>
                        <td>Status</td>
                        <td>Data de Criação</td>
                        <td>Ação</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="book in books" :key="book._id">
                        <td style="width: 20%">{{ book.title }}</td>
                        <td>{{ book.authors }}</td>
                        <td>{{ book.category.name }}</td>
                        <td>
                            <span class="status status-success">DISPONÍVEL</span>
                        </td>
                        <td>{{ book.createdAt }}</td>
                        <td>
                            <Icon type="action-icon" name="more_vert">
                                <router-link :to="`/dashboard/library/${book._id}`"><Icon name="create" /> Editar</router-link>
                                <a @click="copyItemLink(book)"><Icon name="link" /> Compartilhar link</a>
                                <a @click="deleteItem(book)" class="danger-link"><Icon name="delete" /> Deletar</a>
                            </Icon>
                        </td>
                    </tr>
                </tbody>

            </table>
            <div class="table-pagination">
                <div class="back ripple" @click="prevPage()">
                    <i class="material-icons">chevron_left</i>
                </div>
                <p class="body-one">Página {{ (pagination.page + 1) }} de {{ (pagination.pages + 1) }}</p>
                <div class="forward ripple" @click="nextPage()">
                    <i class="material-icons">chevron_right</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '../../../services/BookService'
import Snackbar from '@/components/Snackbar'
import ProgressIndicator from '../../../components/ProgressIndicator'

export default {
    data() {
        return {
            books: [],
            pagination: null,
            isLoading: false
        }
    },
    methods: {
        loadData() {
            this.loadBooks()
        },

        deleteItem(book) {
            Snackbar.show(`Você realmente deseja deletar o item ${book.title}?`, 'DELETAR', 6000, () => {
                ProgressIndicator.show()
                BookService.delete(book._id).then(response => {
                    this.books = this.books.filter(b => b._id != book._id)
                    Snackbar.show(response.data.message)       
                }).catch(err => {
                    console.error(err)
                }).then(() => {
                    ProgressIndicator.hide()
                })

            })
        },

        copyItemLink(item) {
            console.log(item)
        },

        loadBooks(page = 0) {
            ProgressIndicator.show()
            BookService.listAll(page).then(response => {
                this.books = response.data.books
                this.pagination = response.data.pagination
            }).catch(error => {
                console.error(error)
            }).then(() => {
                ProgressIndicator.hide()
            })
        },

        nextPage() {
            if (this.pagination.page + 1 > this.pagination.pages)
                return
            this.loadBooks(this.pagination.page + 1)
        },

        prevPage() {
            if (this.pagination.page - 1 <= 0)
                return
            this.loadBooks(this.pagination.page - 1)
        }
    },
    beforeMount() {
        this.loadData()
    }
}
</script>