<template lang="pug">
.contact
  .contact-wrapper.container
    .row
      .offset-lg-3.offset-md-2.col-lg-6.col-md-8
        form.contact-form(@submit="sendMail")
          .form-group
            label.sr-only(for="inputName") Name
            input#inputName.form-control(
              type="text",
              placeholder="Name",
              name="inputName",
              v-model="contactForm.name",
              required
            )
          .form-group
            label.sr-only(for="inputEmail") E-mail
            input#inputEmail.form-control(
              type="email",
              placeholder="E-mail",
              name="inputEmail",
              v-model="contactForm.email",
              required
            )
          .form-group
            label.sr-only(for="inputMessage") Message
            textarea#inputMessage.form-control(
              placeholder="Message",
              name="inputMessage",
              rows="5",
              v-model="contactForm.message"
            )
          .button-area
            button#submitButton.btn.btn-default.btn-submit(type="submit")
              fa.mr-2(:icon="faCheck")
              | SUBMIT
</template>

<script>
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      faCheck,
      contactForm: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    async sendMail(e) {
      e.preventDefault();
      const { name, email, message } = this.contactForm;
      this.$nuxt.$loading.start();
      const mailOption = {
        from: `${process.env.projectName} お問い合わせフォーム <info@${process.env.host}>`,
        to: [email],
        bcc: [process.env.mailTo],
        subject: `【${process.env.projectName}】お問い合わせを受け付けました`,
        text: `
以下の内容でホームページよりお問い合わせを受け付けました。
必要に応じて担当から折り返しますので今しばらくお待ち下さい。

---
# お名前
${name} 様

# 連絡先
${email}

# 内容
${message}
---

引き続き${process.env.projectName}をよろしくおねがいします！

※ コチラのメールへの返信は受け付けておりません。

====================================

# かくれんぼ in ぐんま 公式サイト
https://www.kakurenbo.club

# かくれんぼ in ぐんま Facebookグループ
https://www.facebook.com/groups/705675266823073

====================================
`,
      };
      try {
        await this.$mgClient.messages.create(
          `mg.${process.env.host}`,
          mailOption
        );
        this.$toast.success(
          "お問い合わせを受け付けました。ありがとうございました。",
          { duration: 5000 }
        );
        this.resetForm();
      } catch (err) {
        this.$toast.error(
          "お問い合わせに失敗しました。時間をおいて再度お試しください。",
          { duration: 5000 }
        );
        console.log(err);
        throw err;
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    resetForm() {
      this.contactForm = { name: "", email: "", message: "" };
    },
  },
};
</script>

<style lang="sass" scoped>
.contact
  .form-group
    margin-bottom: 5px
  input, textarea
    height: auto
    color: white !important
    background-color: $secondary-dark
    border-radius: 0
    border: none
    padding: 15px
    margin: 0
    box-shadow: none
    resize: none
    outline: none
    &:focus
      background-color: $secondary-dark
      box-shadow: none
      outline: none
  .btn-submit
    display: block
    background-color: #fa4f3e
    color: white
    font-family: $en-accent-family
    font-size: 15px
    letter-spacing: 3px
    border: none
    padding: 15px 25px
    margin-left: auto
</style>