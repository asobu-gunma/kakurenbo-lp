<template lang="pug">
#wrapper
  p-page-header
  section.section
    p-section-header(
      :logo="galleryLogo",
      title="ギャラリー",
      subtitle="Photo Gallery",
      description="百聞は一見にしかず",
      :isMainSection="true"
    )
    s-gallery-tile(:gallery="gallery")
  section.section.section-dark
    p-section-header(
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
import PPageHeader from "@/components/parts/PageHeader";
import PSectionHeader from "@/components/parts/SectionHeader";
import SGalleryTile from "@/components/sections/GalleryTile";
import SContact from "@/components/sections/Contact";

import galleryLogo from "@/assets/images/gallery.svg";
import contactLogo from "@/assets/images/contact.svg";

export default {
  components: {
    GFooter,
    PPageHeader,
    PSectionHeader,
    SGalleryTile,
    SContact,
  },
  data() {
    return {
      galleryLogo,
      contactLogo,
    };
  },
  async asyncData({ route, app, env }) {
    const galleryRes = await app.$ctfClient.getEntries({
      content_type: "gallery",
    });
    const gallery = galleryRes.items[0].fields.photos;

    return { gallery };
  },
};
</script>
