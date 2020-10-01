<template>
    <div class="item-holder">
        <div class="item-details" >
            <div v-if="!isLoading">
                <div class="image-holder">
                    <label for="fileInput"></label>
                    <input id="fileInput" class="hidden-input" type="file">
                    <i class="material-icons">add_a_photo</i>
                    <p class="body-one">Adicionar foto de capa</p>
                </div>

                <div class="item-list-info">
                    <div class="item-info">
                        <h1>Publicado em</h1>
                        <h2>{{ itemData.publication_date ? itemData.publication_date : '-'  }}</h2>
                    </div>

                    <div class="item-info">
                        <h1>ISBN</h1>
                        <h2>{{ itemData.isbn ? itemData.isbn : '-' }}</h2>
                    </div>

                    <div class="item-info">
                        <h1>ISBN13</h1>
                        <h2>{{ itemData.isbn13 ? itemData.isbn13 : '-' }} </h2>
                    </div>

                    <div class="item-info">
                        <h1>Total Avaliações</h1>
                        <h2>{{ itemData.ratings_count ? itemData.ratings_count : '0' }}</h2>
                    </div>
                    
                    <div class="item-info">
                        <h1>Avaliação Geral</h1>
                        <h2>{{ itemData.average_rating ? itemData.average_rating : '0.0' }}/5.0</h2>
                    </div>
                </div>
            </div>
            <Skeleton v-else />
            
        </div>
        <div class="item-edit">
            <div v-if="!isLoading">
                <h3>Informações</h3>

                <div class="input-holder">
                    <label>Nome</label>
                    <input v-model="itemData.title" placeholder="O Pequeno Príncipe" type="text">
                </div>

                <div class="input-holder">
                    <label>Autores</label>
                    <input v-model="itemData.authors" placeholder="Antoine de Saint-Exupéry" type="text">
                </div>

                <div class="input-holder">
                    <label>Total de páginas</label>
                    <input v-model="itemData.num_pages" placeholder="200" type="number">
                </div>

                <div class="input-holder">
                    <label>Editora</label>
                    <input v-model="itemData.publisher" placeholder="Abril" type="text">
                </div>

                <div class="input-holder">
                    <label>Categoria</label>
                    <select v-model="itemData.category">
                        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                    </select>
                </div>

                <div v-if="item.isCreating">
                    <div class="input-holder">
                        <label>Publicado em</label>
                        <input v-model="itemData.publication_date" type="date">
                    </div>

                    <div class="input-holder">
                        <label>ISBN</label>
                        <input v-model="itemData.isbn" placeholder="00000000000" type="text">
                    </div>

                     <div class="input-holder">
                        <label>ISBN13</label>
                        <input v-model="itemData.isbn13" placeholder="00000000000" type="text">
                    </div>

                     <div class="input-holder">
                        <label>Total de Avaliações</label>
                        <input v-model="itemData.ratings_count" placeholder="0" type="number">
                    </div>

                    <div class="input-holder">
                        <label>Avaliação Geral</label>
                        <input v-model="itemData.average_rating" placeholder="2.5" type="text">
                    </div>
                </div>

                <div class="form-buttons">
                    <button @click="create" class="button success-button ripple" v-if="item.isCreating">
                        <i class="material-icons">add</i>
                        CRIAR
                    </button>

                    <button class="button success-button ripple" v-else>
                        <i class="material-icons">save</i>
                        SALVAR
                    </button>
                </div>
            </div>
            <Skeleton v-else />

        </div>
    </div>
</template>

<script>
import ProgressIndicator from '../../../components/ProgressIndicator'
import Skeleton from '../../../components/Skeleton'
import moment from 'moment'
import BookService from '../../../services/BookService'
import CategoryService from '../../../services/CategoryService'

export default {
    props: {
        item: Object,
        isLoading: Boolean
    },
    data() {
        return {
            itemData: this.item,
            categories: []
        }
    },
    methods:  {
        async create() {
            if (!this.itemData.isCreating) return

            ProgressIndicator.show()
            delete this.itemData.isCreating

            const response = await BookService.create(this.itemData)

            if (response) {
                this.$router.push({
                    path: `/dashboard/library/${response._id}`
                })
            }

            ProgressIndicator.hide()
        },
        async loadData() {
            ProgressIndicator.show()
            const response = await CategoryService.listAll()

            if (response) {
                this.categories = response.data
            }

            ProgressIndicator.hide()
        }
    },
    beforeMount() {
        this.loadData()
    },
    components: {
        Skeleton
    },
    watch: {
        item: function (val) {
            this.itemData = val

            console.log(val)
        }
    }
}
</script>