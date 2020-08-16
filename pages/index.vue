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
</template>

<script>
import PSectionHeader from "@/components/parts/SectionHeader";
import SPagetop from "@/components/sections/Pagetop";
import STeam from "@/components/sections/Team";
import SBlog from "@/components/sections/Blog";

export default {
  components: {
    PSectionHeader,
    SPagetop,
    STeam,
    SBlog,
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
    return {
      blogPosts,
      memberList,
    };
  },
};
</script>