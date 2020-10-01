<template>
    <Item :item="{isCreating: true}" />
</template>

<script>
import Item from './Item'

export default {
    components: {
        Item 
    }
}
</script>