<script setup lang="ts">
interface Props {
    facebook?: string;
    twitter?: string;
    instagram?: string;
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block bz-block-social">
        <div class="bz-social">
            <ul>
                <li v-if="facebook"><a :href="facebook"><i class="icon20-facebook-o-white"></i></a></li>
                <li v-if="twitter"><a :href="twitter"><i class="icon20-twitter-x-o-white"></i></a></li>
                <li v-if="instagram"><a :href="instagram"><i class="icon20-instagram-o-white"></i></a></li>
            </ul>
        </div>
        <!--end bz-social-->
    </div>
</template>
