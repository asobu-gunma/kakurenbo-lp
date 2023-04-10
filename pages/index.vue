<template lang="pug">
#wrapper
  parts-event-button(:event="eventList[0]")
  section.section
    sections-pagetop
  section.section
    parts-section-header#about(
      logo="svg-about",
      title="かくれんぼ in ぐんま",
      subtitle="What Kakurenbo in Gunma?",
      description="私達の成り立ちと想い",
      :isMainSection="true"
    )
    sections-about
  section.section
    parts-section-header#concept(
      logo="svg-concept",
      title="コンセプト",
      subtitle="Our Concept",
      description="かくれんぼの設計にあたり"
    )
    sections-concept
  section.section
    parts-section-header#video(
      logo="svg-video",
      title="プロモーション映像",
      subtitle="Promotion Video",
      description="百聞は一見にしかず"
    )
    sections-gallery-movie(:youtubeIds="youtubeIds")
  section.section
    parts-section-header#team(
      logo="svg-team",
      title="運営チーム",
      subtitle="Team Member",
      description="ともに歩む仲間たち"
    )
    sections-team(:memberList="memberList")
  section.section
    parts-section-header#event(
      logo="svg-event",
      title="次回開催予定",
      subtitle="Event Schedule",
      description="参加する人この指とまれ"
    )
    sections-event-list(:eventList="eventList")
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
  async asyncData({ app }) {
    const galleryRes = await app.$ctfClient.getEntries({
      content_type: "gallery"
    });
    let { photos, youtubeIds } = galleryRes.items[0].fields;
    photos = photos.slice(0, 6); // 先頭から6枚のみ表示

    const memberRes = await app.$ctfClient.getEntries({
      content_type: "member",
      order: "fields.position"
    });
    const memberList = memberRes.items;

    const blogRes = await app.$ctfClient.getEntries({
      content_type: "blog",
      order: "-sys.createdAt",
      limit: 3
    });
    const blogPosts = blogRes.items;

    const eventRes = await app.$ctfClient.getEntries({
      content_type: "event",
      order: "sys.createdAt"
    });
    const eventList = eventRes.items;

    return {
      photos,
      youtubeIds,
      memberList,
      blogPosts,
      eventList
    };
  },
  head() {
    const domain = process.env.domain;
    const imageUrl = `https://${domain}/ogp.jpg`;
    const pageUrl = `https://${domain}`;
    return {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:title", content: process.env.pageTitle },
        { name: "twitter:description", content: process.env.description },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: process.env.projectName
        },
        {
          hid: "og:title",
          property: "og:title",
          content: process.env.pageTitle
        },
        { hid: "og:type", property: "og:type", content: "article" },
        { hid: "og:image", property: "og:image", content: imageUrl },
        {
          hid: "og:description",
          property: "og:description",
          content: process.env.description
        },
        { hid: "og:url", property: "og:url", content: pageUrl }
      ]
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
    }
  }
};
</script>
