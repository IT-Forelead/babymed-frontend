<script setup>
import { ref, computed } from 'vue'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { item } = props;

const emit = defineEmits(["child-checked"]);

const showChildren = ref(false)

const toggleChildren = () => {
    showChildren.value = !showChildren.value;
}

const handleCheckboxChange = () => {
    item.checked = !item.checked;
    if (item.children) {
        item.children.forEach((child) => {
            checkAllChildren(child, item.checked);
        });
    }
    emit("child-checked", item);
}

const checkAllChildren = (item, checked) => {
    item.checked = checked;
    if (item.children) {
        item.children.forEach((child) => checkAllChildren(child, checked));
    }
}

const handleChildChecked = (child) => {
    if (item.children.every((c) => c.checked)) {
        item.checked = true
    } else if (item.children.some((c) => c.checked)) {
        item.checked = "indeterminate"
    } else {
        item.checked = false
    }

    emit("child-checked", child)
}
</script>

<template>
    <div class="flex items-center space-x-2">
        <div v-if="item?.children" class="cursor-pointer" @click="toggleChildren">
            <ChevronRightIcon :class="[
            'w-5 h-5 text-gray-900 transform transition-transform duration-300',
            showChildren ? 'rotate-90' : '',
        ]" />
        </div>
        <div v-else class="w-5 h-5"></div>
        <div class="custom-checkbox"
            :class="[item.checked === true ? 'checked' : '', item.checked === 'indeterminate' ? 'indeterminate' : '']"
            @click="handleCheckboxChange">
            <div class="checkmark"></div>
            <div class="minus"></div>
        </div>
        <label @click="handleCheckboxChange">
            {{ item?.parent?.name ?? item?.name }}
        </label>
    </div>
    <div v-if="item.children && showChildren" :class="[item.children ? 'pl-6' : '']">
        <tree-item v-for="child in item.children" :item="child" :key="child.id" @child-checked="handleChildChecked" />
    </div>
</template>

<style scoped>
.custom-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
}

.custom-checkbox.checked {
    border-color: #2196F3;
}

.checkmark {
    position: absolute;
    width: 5px;
    height: 10px;
    border: solid #2196F3;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    top: 2px;
    left: 6px;
    opacity: 0;
    transition: opacity 0.2s;
}

.custom-checkbox.checked .checkmark {
    opacity: 1;
}

.custom-checkbox.indeterminate .checkmark {
    opacity: 0;
}

.minus {
    position: absolute;
    width: 10px;
    height: 3px;
    background-color: #2196F3;
    top: 8px;
    left: 4px;
    opacity: 0;
    transition: opacity 0.2s;
}

.custom-checkbox.indeterminate .minus {
    opacity: 1;
}
</style>
