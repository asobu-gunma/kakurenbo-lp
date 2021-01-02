
<template lang="pug">
#wrapper
  p-blog-header
  section.section
    p-blog-title
    s-entry-form
  g-footer
</template>

<script>
import GFooter from "@/components/global/Footer";
import PBlogHeader from "@/components/parts/BlogHeader";
import PBlogTitle from "@/components/parts/BlogTitle";
import SEntryForm from "@/components/sections/EntryForm";

export default {
  components: {
    GFooter,
    PBlogHeader,
    PBlogTitle,
    SEntryForm,
  },
  data() {
    return {};
  },
  async asyncData({ route, app, env }) {},
  head() {
    return {
      title: `${process.env.projectName} Official Blog`,
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

<style lang="sass">
#wrapper
  .section
    padding-bottom: 100px
</style>
