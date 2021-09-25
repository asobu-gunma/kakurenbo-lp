<template lang="pug">
#wrapper
  parts-page-header
  section.section
    parts-blog-title
    sections-blog-post(:blogPost="blogPost")
    modules-next-prev(:nextPost="nextPost", :prevPost="prevPost")
  section.section.section-dark
    parts-section-header(
      logo="svg-contact",
      title="お問い合わせ",
      subtitle="Get In Touch",
      description="気兼ねなく お気軽に ご連絡ください",
      titleColor="#FFC32A",
      subtitleColor="white"
    )
    sections-contact
  parts-global-footer
</template>

<script>
export default {
  async asyncData({ app, params, payload }) {
    let blogPost;
    if (payload) {
      blogPost = payload;
    } else {
      const blogRes = await app.$ctfClient.getEntries({
        content_type: "blog",
        "fields.slug": params.slug,
      });
      blogPost = blogRes.items[0];
    }

    const prevRes = await app.$ctfClient.getEntries({
      content_type: "blog",
      "sys.createdAt[lt]": blogPost.sys.createdAt,
      order: "-sys.createdAt",
      limit: 1,
    });
    const prevPost = prevRes.items[0];

    const nextRes = await app.$ctfClient.getEntries({
      content_type: "blog",
      "sys.createdAt[gt]": blogPost.sys.createdAt,
      order: "sys.createdAt",
      limit: 1,
    });
    const nextPost = nextRes.items[0];

    return {
      blogPost,
      prevPost,
      nextPost,
    };
  },
  computed: {
    description() {
      return `${this.blogPost.fields.body
        .substr(0, 170)
        .replace(/\n/g, "<br>")}...`;
    },
  },
  head() {
    const { title, eyecatch } = this.blogPost.fields;
    const pageTitle = `${title} | ${process.env.projectName} | 公式ブログ`;
    const imageUrl = `https:${eyecatch.fields.file.url}`;
    const pageUrl = `https://${process.env.domain}/${this.$route.path}`;
    return {
      title: pageTitle,
      meta: [
        { name: "description", hid: "description", content: this.description },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: this.description },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: process.env.projectName,
        },
        { hid: "og:title", property: "og:title", content: pageTitle },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "og:image", property: "og:image", content: imageUrl },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
        { hid: "og:url", property: "og:url", content: pageUrl },
      ],
    };
  },
};
</script>
