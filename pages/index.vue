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
</template>

<script>
import PSectionHeader from "@/components/parts/SectionHeader";
import SPagetop from "@/components/sections/Pagetop";
import STeam from "@/components/sections/Team";

export default {
  components: {
    PSectionHeader,
    SPagetop,
    STeam,
  },
  async asyncData({ app }) {
    const memberRes = await app.$ctfClient.getEntries({
      content_type: "member",
      order: "fields.position",
    });
    const memberList = memberRes.items;
    return {
      memberList,
    };
  },
};
</script>