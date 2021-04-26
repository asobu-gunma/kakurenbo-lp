<template lang="pug">
#wrapper
  p-blog-header
  section.section
    p-blog-title
    s-blog-post(:blogPost="blogPost")
    m-next-prev(:nextPost="nextPost", :prevPost="prevPost")
  section.section.section-dark
    p-section-header(
      :logo="contactLogo",
      title="お問い合わせ",
      subtitle="Get In Touch",
      description="気兼ねなく お気軽に ご連絡ください",
      titleColor="#FFC32A",
      subtitleColor="white"
    )
    s-contact
  g-footer
</template>

<script>
import GFooter from "@/components/global/Footer";
import PBlogHeader from "@/components/parts/BlogHeader";
import PBlogTitle from "@/components/parts/BlogTitle";
import PSectionHeader from "@/components/parts/SectionHeader";
import MNextPrev from "@/components/modules/NextPrev";
import SBlogPost from "@/components/sections/BlogPost";
import SContact from "@/components/sections/Contact";

import contactLogo from "@/assets/images/contact.svg";

export default {
  components: {
    GFooter,
    PBlogHeader,
    PBlogTitle,
    PSectionHeader,
    MNextPrev,
    SBlogPost,
    SContact,
  },
  data() {
    return {
      contactLogo,
    };
  },
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
        { property: "og:title", content: pageTitle },
        { property: "og:type", content: "article" },
        { property: "og:image", content: imageUrl },
        { property: "og:description", content: this.description },
        { property: "og:url", content: pageUrl },
      ],
    };
  },
};
</script>

<style lang="sass">
#wrapper
  .section
    padding-bottom: 100px
  .section-dark
    background-color: $primary-dark
</style>
