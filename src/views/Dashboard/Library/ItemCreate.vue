<template>
    <Item :isCreating="true" :item="{isCreating: true}" />
</template>

<script>
import Item from './Item'

export default {
    components: {
        Item 
    }
}
</script>