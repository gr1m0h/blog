<template>
    <div>
        <div v-for="article in articles">
            <h2><a v-bind:href="article.path">{{article.frontmatter.title}}</a></h2>
            <p>{{article.frontmatter.description}}</p>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
		articles() {
            return this.$site.pages
                .filter(article => article.path.startsWith('/articles/'))
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
        }
    }
}
</script>
