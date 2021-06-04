
<template lang="pug">
#wrapper
  p-page-header
  section.section
    p-section-header(
      :logo="entryLogo",
      :title="title",
      :subtitle="subtitle",
      :description="description",
      :isMainSection="true"
    )
    s-entry-form(v-if="event", :isStopEntry="event.fields.isStopEntry")
    .container(v-else)
      .preparing 準備中です。しばしお待ち下さい。
  g-footer
</template>

<script>
import GFooter from "@/components/global/Footer";
import PPageHeader from "@/components/parts/PageHeader";
import PSectionHeader from "@/components/parts/SectionHeader";
import SEntryForm from "@/components/sections/EntryForm";

import entryLogo from "@/assets/images/entry.svg";

export default {
  components: {
    GFooter,
    PPageHeader,
    PSectionHeader,
    SEntryForm,
  },
  data() {
    return {
      entryLogo,
    };
  },
  async asyncData({ route, app, env }) {
    const eventRes = await app.$ctfClient.getEntries({
      content_type: "event",
      order: "-sys.createdAt",
      limit: 1,
    });
    const event = eventRes.items[0];
    return {
      event,
    };
  },
  computed: {
    title() {
      return this.event.fields.isStopEntry ? "キャンセル待ち受付" : "参加申込";
    },
    subtitle() {
      return this.event.fields.isStopEntry ? "Wait Cancel Form" : "Entry Form";
    },
    description() {
      return this.event.fields.isStopEntry
        ? "空き状況を随時お届けまします"
        : "参加する人この指とまれ";
    },
  },
};
</script>

<style lang="sass" scoped>
#wrapper
  .preparing
    text-align: center
    font-size: 20px
    font-weight: bold
</style>
