<template lang="pug">
#wrapper
  parts-page-header
  section.section
    parts-blog-title
    sections-blog(:blogPosts="blogPosts")
    modules-paging(
      :total="blogRes.total",
      :limit="blogRes.limit",
      :skip="blogRes.skip"
    )
  section.section.section-dark
    parts-section-header(
      :logo="contactLogo",
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
import contactLogo from "@/assets/images/contact.svg";

export default {
  data() {
    return {
      contactLogo,
    };
  },
  async asyncData({ route, app, env }) {
    let pageNum = 1;
    if (typeof route.params.page !== "undefined") {
      pageNum = parseInt(route.params.page);
    }
    const limit = env.pageLimit;
    const skip = limit * pageNum - limit;
    let params = {
      content_type: "blog",
      order: "-sys.createdAt",
      limit,
      skip,
    };

    const blogRes = await app.$ctfClient.getEntries(params);
    const blogPosts = blogRes.items;

    return {
      blogRes,
      blogPosts,
    };
  },
  head() {
    return {
      title: `${process.env.projectName} | 公式ブログ`,
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "群馬県でかくれんぼの楽しさを広めるために活動している団体の公式ブログ。老若男女誰でも楽しめる、そんなかくれんぼのイベント情報を発信しています。",
        },
      ],
    };
  },
};
</script>