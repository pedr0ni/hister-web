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
                        <h2>{{ item.publication_date ? item.publication_date : '-'  }}</h2>
                    </div>

                    <div class="item-info">
                        <h1>ISBN</h1>
                        <h2>{{ item.isbn ? item.isbn : '-' }}</h2>
                    </div>

                    <div class="item-info">
                        <h1>ISBN13</h1>
                        <h2>{{ item.isbn13 ? item.isbn13 : '-' }} </h2>
                    </div>

                    <div class="item-info">
                        <h1>Total Avaliações</h1>
                        <h2>{{ item.ratings_count ? item.ratings_count : '0' }}</h2>
                    </div>
                    
                    <div class="item-info">
                        <h1>Avaliação Geral</h1>
                        <h2>{{ item.average_rating ? item.average_rating : '0.0' }}/5.0</h2>
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
                    <input :value="item.title ? item.title : ''" placeholder="O Pequeno Príncipe" type="text">
                </div>

                <div class="input-holder">
                    <label>Autor</label>
                    <input :value="item.authors ? item.authors : ''" placeholder="Antoine de Saint-Exupéry" type="text">
                </div>

                <div class="input-holder">
                    <label>Total de páginas</label>
                    <input :value="item.num_pages ? item.num_pages : ''" placeholder="200" type="number">
                </div>

                <div class="input-holder">
                    <label>Editora</label>
                    <input :value="item.publisher ? item.publisher : ''" placeholder="Abril" type="text">
                </div>

                <div class="form-buttons">
                    <button class="button success-button ripple" v-if="item.isCreating">
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
import Skeleton from '../../../components/Skeleton'
export default {
    props: {
        item: Object,
        isLoading: Boolean
    },
    components: {
        Skeleton
    }
}
</script>