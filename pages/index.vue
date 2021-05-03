<template lang="pug">
#wrapper
  event-button(:event="event")
  section.section
    s-pagetop
  section.section
    p-section-header#about(
      :logo="aboutLogo",
      title="かくれんぼ in ぐんま",
      subtitle="What Kakurenbo in Gunma?",
      description="私達の成り立ちと想い",
      :isMainSection="true"
    )
    s-about
  section.section
    p-section-header#concept(
      :logo="conceptLogo",
      title="コンセプト",
      subtitle="Our Concept",
      description="かくれんぼの設計にあたり"
    )
    s-concept
  section.section
    p-section-header#gallery(
      :logo="galleryLogo",
      title="ギャラリー",
      subtitle="Photo Gallery",
      description="百聞は一見にしかず"
    )
    s-gallery(:gallery="gallery")
    s-gallery-sp(:gallery="gallery")
    p-link-button(path="/gallery", pageName="Gallery")
  section.section
    p-section-header#team(
      :logo="teamLogo",
      title="運営チーム",
      subtitle="Team Member",
      description="ともに歩む仲間たち"
    )
    s-team(:memberList="memberList")
  section.section
    p-section-header#blog(
      :logo="blogLogo",
      title="最新情報",
      subtitle="Recent Blog Posts",
      description="最新のチャレンジや動向をコンテンツとしてお届け"
    )
    s-blog(:blogPosts="blogPosts")
    p-link-button(path="/blog", pageName="Blog")
  section.section
    p-section-header#event(
      :logo="eventLogo",
      title="次回開催予定",
      subtitle="Event Schedule",
      description="参加する人この指とまれ"
    )
    s-event(:event="event")
  section.section.section-dark
    p-section-header#contact(
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
import PEventButton from "@/components/parts/EventButton";
import PSectionHeader from "@/components/parts/SectionHeader";
import PLinkButton from "@/components/parts/LinkButton";
import SPagetop from "@/components/sections/Pagetop";
import SAbout from "@/components/sections/About";
import SConcept from "@/components/sections/Concept";
import SGallery from "@/components/sections/Gallery";
import SGallerySp from "@/components/sections/GallerySp";
import STeam from "@/components/sections/Team";
import SBlog from "@/components/sections/Blog";
import SEvent from "@/components/sections/Event";
import SContact from "@/components/sections/Contact";

import aboutLogo from "@/assets/images/about.svg";
import conceptLogo from "@/assets/images/concept.svg";
import galleryLogo from "@/assets/images/gallery.svg";
import teamLogo from "@/assets/images/team.svg";
import blogLogo from "@/assets/images/blog.svg";
import eventLogo from "@/assets/images/event.svg";
import contactLogo from "@/assets/images/contact.svg";

export default {
  components: {
    GFooter,
    PEventButton,
    PSectionHeader,
    PLinkButton,
    SPagetop,
    SAbout,
    SConcept,
    SGallery,
    SGallerySp,
    STeam,
    SBlog,
    SEvent,
    SContact,
  },
  data() {
    return {
      aboutLogo,
      conceptLogo,
      galleryLogo,
      teamLogo,
      blogLogo,
      eventLogo,
      contactLogo,
    };
  },
  async asyncData({ app }) {
    const galleryRes = await app.$ctfClient.getEntries({
      content_type: "gallery",
    });
    const gallery = galleryRes.items[0].fields.photos.slice(0, 6);

    const memberRes = await app.$ctfClient.getEntries({
      content_type: "member",
      order: "fields.position",
    });
    const memberList = memberRes.items;

    const blogRes = await app.$ctfClient.getEntries({
      content_type: "blog",
      order: "-sys.createdAt",
      limit: 3,
    });
    const blogPosts = blogRes.items;

    const eventRes = await app.$ctfClient.getEntries({
      content_type: "event",
      order: "-sys.createdAt",
      limit: 1,
    });
    const event = eventRes.items[0];

    return {
      gallery,
      memberList,
      blogPosts,
      event,
    };
  },
  head() {
    const { domain } = process.env;
    const imageUrl = `https://${domain}/ogp.jpg`;
    const pageUrl = `https://${domain}`;
    return {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:title", content: process.env.pageTitle },
        { name: "twitter:description", content: process.env.description },
        { property: "og:title", content: process.env.pageTitle },
        { property: "og:type", content: "article" },
        { property: "og:image", content: imageUrl },
        { property: "og:description", content: process.env.description },
        { property: "og:url", content: pageUrl },
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
