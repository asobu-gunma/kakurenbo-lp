<template lang="pug">
#wrapper
  section.section
    s-pagetop
  section.section
    p-section-header(
      title="かくれんぼ in ぐんま",
      subtitle="What Kakurenbo in Gunma?",
      description="私達の成り立ちと想い"
    )
    s-about
  section.section
    p-section-header(
      title="コンセプト",
      subtitle="Our Concept",
      description="かくれんぼの設計にあたり"
    )
    s-concept
  section.section
    p-section-header(
      title="ギャラリー",
      subtitle="Photo Gallery",
      description="百聞は一見にしかず"
    )
    s-gallery(:gallery="gallery")
    s-gallery-sp(:gallery="gallery")
  section.section
    p-section-header(
      title="運営チーム",
      subtitle="Team Member",
      description="ともに歩む仲間たち"
    )
    s-team(:memberList="memberList")
  section.section
    p-section-header(
      title="最新情報",
      subtitle="Recent Blog Posts",
      description="最新のチャレンジや動向をコンテンツとしてお届け"
    )
    s-blog(:blogPosts="blogPosts")
  section.section
    p-section-header(
      title="次回開催予定",
      subtitle="Event Schedule",
      description="戦士たちよ剣を握れ"
    )
    s-event(:event="event")
  section.section.section-dark
    p-section-header#contact(
      title="お問い合わせ",
      subtitle="Get In Touch",
      description="気兼ねなく お気軽に ご連絡ください",
      titleColor="#CC9933",
      subtitleColor="white"
    )
    s-contact
</template>

<script>
import PSectionHeader from "@/components/parts/SectionHeader";
import SPagetop from "@/components/sections/Pagetop";
import SAbout from "@/components/sections/About";
import SConcept from "@/components/sections/Concept";
import SGallery from "@/components/sections/Gallery";
import SGallerySp from "@/components/sections/GallerySp";
import STeam from "@/components/sections/Team";
import SBlog from "@/components/sections/Blog";
import SEvent from "@/components/sections/Event";
import SContact from "@/components/sections/Contact";

export default {
  components: {
    PSectionHeader,
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
  async asyncData({ app }) {
    const galleryRes = await app.$ctfClient.getEntries({
      content_type: "gallery",
    });
    const gallery = galleryRes.items[0].fields.photos;
    console.log(gallery);

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
};
</script>

<style lang="sass">
#wrapper
  .section
    padding-bottom: 100px
  .section-dark
    background-color: $primary-dark
</style>
