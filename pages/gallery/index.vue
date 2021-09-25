<template lang="pug">
#wrapper
  parts-page-header
  section.section
    parts-section-header(
      logo="svg-gallery",
      title="ギャラリー",
      subtitle="Photo Gallery",
      description="百聞は一見にしかず",
      :isMainSection="true"
    )
    sections-gallery-tile(:gallery="gallery")
  section.section.section-dark
    parts-section-header(
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
  async asyncData({ route, app, env }) {
    const galleryRes = await app.$ctfClient.getEntries({
      content_type: "gallery",
    });
    const gallery = galleryRes.items[0].fields.photos;

    return { gallery };
  },
};
</script>
