<template lang="pug">
#wrapper
  section.section
    sections-pagetop
  section.section
    parts-section-header#about(
      logo="svg-rules",
      title="かくれんぼ公式ルール",
      subtitle="How to Kakurenbo?",
      description="かくれんぼを本気で楽しむために",
      :isMainSection="true"
    )
    sections-rules
  section.section.section-dark
    parts-section-header#contact(
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
  head() {
    const domain = process.env.domain;
    const imageUrl = `https://${domain}/ogp.jpg`;
    const pageUrl = `https://${domain}/rules`;
    return {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:title", content: process.env.pageTitle },
        { name: "twitter:description", content: process.env.description },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: process.env.projectName,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: process.env.pageTitle,
        },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "og:image", property: "og:image", content: imageUrl },
        { hid: "og:description", property: "og:description", content: process.env.description },
        { hid: "og:url", property: "og:url", content: pageUrl },
      ],
    };
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "scroll" || mutation.type === "resize") {
        const pageTop = document.querySelector("#pageTop");
        if (!pageTop) return;

        const isFixed =
          state.scrollTop > pageTop.clientHeight + 50 ||
          state.clientWidth < 991.98;
        this.$store.commit("fix", isFixed);
      }
    });
    this.changeScrollTop();
    this.changeClientWidth();
    document.onscroll = () => {
      this.changeScrollTop();
    };
    window.onresize = () => {
      this.changeClientWidth();
    };
  },
  methods: {
    changeScrollTop() {
      const el =
        document.scrollingElement || document.documentElement || document.body;
      const scrollTop = el.scrollTop;
      this.$store.commit("scroll", scrollTop);
    },
    changeClientWidth() {
      const clientWidth = document.body.clientWidth;
      this.$store.commit("resize", clientWidth);
    },
  },
};
</script>
