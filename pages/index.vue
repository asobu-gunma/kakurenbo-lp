<template lang="pug">
#wrapper
  section.section
    s-pagetop
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
import STeam from "@/components/sections/Team";
import SBlog from "@/components/sections/Blog";
import SEvent from "@/components/sections/Event";
import SContact from "@/components/sections/Contact";

export default {
  components: {
    PSectionHeader,
    SPagetop,
    STeam,
    SBlog,
    SEvent,
    SContact,
  },
  async asyncData({ app }) {
    const blogRes = await app.$ctfClient.getEntries({
      content_type: "blog",
      order: "-sys.createdAt",
      limit: 3,
    });
    const blogPosts = blogRes.items;

    const memberRes = await app.$ctfClient.getEntries({
      content_type: "member",
      order: "fields.position",
    });
    const memberList = memberRes.items;

    const eventRes = await app.$ctfClient.getEntries({
      content_type: "event",
      order: "-sys.createdAt",
      limit: 1,
    });
    const event = eventRes.items[0];

    return {
      blogPosts,
      memberList,
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
