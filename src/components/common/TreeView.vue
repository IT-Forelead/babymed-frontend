<script setup>
import TreeItem from './TreeItem.vue'

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const { items } = props;

const handleCheckboxChange = (updatedItem) => {
    if (updatedItem && updatedItem.children) {
        updatedItem.checked = updatedItem.children.every((child) => child.checked)
    }
    if (items) {
        items.forEach((item) => {
            if (item.children) {
                item.checked = item.children.every((child) => child.checked);
            }
        })
    }
}
</script>

<template>
    <div v-for="(item, index) in items" :key="index" class="px-4 py-2 border rounded-md hover:bg-gray-100 my-1">
        <TreeItem :item="item" @child-checked="handleCheckboxChange($event)" />
    </div>
</template>