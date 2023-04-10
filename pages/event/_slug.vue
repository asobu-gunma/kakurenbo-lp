<template lang="pug">
#wrapper
  parts-page-header
  section.section
    parts-section-header(
      logo="svg-entry",
      :title="title",
      :subtitle="subtitle",
      :description="description",
      :isMainSection="true"
    )
    sections-event(:event="event" :noDisplayButton="true")
    sections-entry-form(
      v-if="event"
      :eventName="event.fields.title"
      :isStopEntry="event.fields.isStopEntry"
    )
    .container(v-else)
      .preparing 準備中です。しばしお待ち下さい。
  parts-global-footer
</template>

<script>
export default {
  async asyncData({ route, app, env }) {
    const eventRes = await app.$ctfClient.getEntries({
      content_type: "event",
      "fields.slug": route.params.slug
    });
    const event = eventRes.items[0];
    return {
      event
    };
  },
  computed: {
    title() {
      return this.event.fields.isStopEntry
        ? "キャンセル待ち受付"
        : "イベント参加申込";
    },
    subtitle() {
      return this.event.fields.isStopEntry ? "Wait Cancel Form" : "Entry Form";
    },
    description() {
      return this.event.fields.isStopEntry
        ? "空き状況を随時お届けまします"
        : "参加する人この指とまれ";
    }
  }
};
</script>

<style lang="sass" scoped>
#wrapper
  .preparing
    text-align: center
    font-size: 20px
    font-weight: bold
</style>
