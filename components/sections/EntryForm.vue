<template lang="pug">
validation-observer(v-slot="{ handleSubmit, invalid }")
  form.entry-form(@submit.prevent="handleSubmit(sendMail)")
    .container
      .row
        .offset-lg-2.col-lg-8
          .user-list(v-for="(user, index) in entryForm.userList", :key="index")
            .form-group
              validation-provider(
                v-slot="{ errors }",
                rules="required",
                name="お名前"
              )
                label.legend(:for="`user_${index}_name`") {{ index > 0 ? 'お名前' : 'お名前（代表者）' }}
                input.form-control.form-control-lg(
                  type="text",
                  placeholder="かくれんぼ 太郎",
                  :name="`user_${index}_name`",
                  :id="`user_${index}_name`",
                  :class="{ 'is-invalid': errors[0] }",
                  v-model="user.name"
                )
                .text-danger.mt-2(v-show="errors[0]") {{ errors[0] }}
            .form-group
              validation-provider(
                v-slot="{ errors }",
                rules="required",
                name="性別"
              )
                label.legend 性別
                .d-flex
                  .form-check.mr-3
                    input.form-check-input(
                      type="radio",
                      :name="`user_${index}_gender`",
                      :id="`user_${index}_gender_male`",
                      :class="{ 'is-invalid': errors[0] }",
                      value="男性",
                      required,
                      v-model="user.gender"
                    )
                    label.form-check-label(:for="`user_${index}_gender_male`") 男性
                  .form-check
                    input.form-check-input(
                      type="radio",
                      :name="`user_${index}_gender`",
                      :id="`user_${index}_gender_female`",
                      :class="{ 'is-invalid': errors[0] }",
                      value="女性",
                      required,
                      v-model="user.gender"
                    )
                    label.form-check-label(
                      :for="`user_${index}_gender_female`"
                    ) 女性
                .text-danger.mt-2(v-show="errors[0]") {{ errors[0] }}
            .form-group
              validation-provider(
                v-slot="{ errors }",
                rules="required",
                name="年代"
              )
                label.legend(:for="`user_${index}_age`") 年代
                select.form-control.form-control-lg(
                  :name="`user_${index}_age`",
                  :id="`user_${index}_age`",
                  :class="{ 'is-invalid': errors[0] }",
                  v-model="user.age"
                )
                  option(value="") 年代を選択してください
                  option(value="10歳未満") 10歳未満
                  option(value="10代") 10代
                  option(value="20代") 20代
                  option(value="30代") 30代
                  option(value="40代") 40代
                  option(value="50代") 50代
                  option(value="60代以上") 60代以上
                .text-danger.mt-2(v-show="errors[0]") {{ errors[0] }}
            .form-group(v-show="user.age === '10代'")
              .form-check
                input.form-check-input(
                  type="checkbox",
                  :name="`user_${index}_is_kids`",
                  :id="`user_${index}_is_kids`",
                  v-model="user.isKids"
                )
                label.form-check-label(:for="`user_${index}_is_kids`") 中学生以下ですか？
            .remove-user-button(v-if="index > 0")
              fa.text-danger(:icon="faTimes", @click="removeUser(index)")
          .form-group.text-right
            button.btn.btn-lg.btn-success(@click="addUser") 参加者を追加する
          .form-group
            validation-provider(
              v-slot="{ errors }",
              rules="required|email",
              name="代表メールアドレス"
            )
              label.legend(:for="`user_email`") 代表者メールアドレス
              input.form-control.form-control-lg(
                type="email",
                placeholder="taro@kakurenbo.club",
                :name="`user_email`",
                :id="`user_email`",
                :class="{ 'is-invalid': errors[0] }",
                required,
                v-model="entryForm.email"
              )
              .text-danger.mt-2(v-show="errors[0]") {{ errors[0] }}
          .form-group
            validation-provider(
              v-slot="{ errors }",
              rules="required",
              name="参加のキッカケ"
            )
              label.legend 参加のキッカケ
              .cognition-list(
                v-for="(cognition, index) in cognitionList",
                :key="index"
              )
                .form-check.mb-2
                  input.form-check-input(
                    type="checkbox",
                    :name="`user_cognition`",
                    :id="`user_cognition_${index}`",
                    :value="cognition",
                    :class="{ 'is-invalid': errors[0] }",
                    v-model="entryForm.cognition"
                  )
                  label.form-check-label(:for="`user_cognition_${index}`") {{ cognition }}
              .text-danger.mt-2(v-show="errors[0]") {{ errors[0] }}
          .form-group
            label.legend(:for="`user_note`") 質問・要望
            textarea.form-control.form-control-lg(
              :name="`user_note`",
              :id="`user_note`",
              rows="5",
              v-model="entryForm.note"
            )
          input.btn.btn-lg.btn-kakurenbo(
            type="submit",
            :value="submitText",
            :disabled="invalid"
          )
</template>

<script>
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    isStopEntry: { type: Boolean, default: false },
  },
  data() {
    return {
      faTimes,
      entryForm: {
        userList: [
          {
            name: "",
            gender: "",
            age: "",
            isKids: false,
          },
        ],
        email: "",
        cognition: [],
        note: "",
      },
      cognitionList: [
        "運営者と知り合い",
        "参加者からの紹介",
        "公式サイト",
        "公式ブログ",
        "公式パンフレット・チラシ",
        "Facebook",
        "YouTube",
        "新聞・メディア",
        "ラジオ",
        "その他",
      ],
    };
  },
  methods: {
    addUser() {
      this.entryForm.userList.push({
        name: "",
        gender: "",
        age: "",
        isKids: false,
      });
    },
    removeUser(index) {
      this.entryForm.userList.splice(index, 1);
    },
    async sendMail() {
      const { userList, email, cognition, note } = this.entryForm;
      const users = userList.map((user, index) => {
        return `# 参加者${index + 1}
名前: ${user.name}
性別: ${user.gender}
年代: ${user.age}${user.isKids ? "（中学生以下）" : ""}`;
      });
      this.$nuxt.$loading.start();
      const mailOption = {
        from: `${process.env.projectName} エントリーフォーム <entry@${process.env.host}>`,
        to: [email],
        bcc: [process.env.mailTo],
        subject: `【${process.env.projectName}】${this.announceText}を受け付けました`,
        text: `
以下の内容でイベントへの${this.announceText}を受け付けました。
${this.subAnnounceText}

---
${users.join("\n\n")}

# 代表メールアドレス
${email}

# 参加のキッカケ
${cognition.join(", ")}

# 質問・要望
${note}
---

引き続き${process.env.projectName}をよろしくおねがいします！

※ コチラのメールへの返信は受け付けておりません。
不明な点はホームページのお問合せフォームよりご連絡ください。

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
          `${this.announceText}を受け付けました。ありがとうございました。`,
          { duration: 5000 }
        );
        this.$router.push("/");
      } catch (err) {
        this.$toast.error(
          `${this.announceText}に失敗しました。時間をおいて再度お試しください。`,
          { duration: 5000 }
        );
        console.log(err);
        throw err;
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
  },
  computed: {
    submitText() {
      return this.isStopEntry ? "キャンセル待ちをする" : "参加を申し込む";
    },
    announceText() {
      return this.isStopEntry ? "キャンセル待ち" : "参加申し込み";
    },
    subAnnounceText() {
      return this.isStopEntry
        ? "キャンセルが入り次第ご連絡いたします！"
        : "追って当日の詳細をご連絡いたします！";
    },
  },
};
</script>

<style lang="sass" scoped>
.user-list
  padding: 30px 30px 15px
  border: 1px solid $muted-color
  border-radius: 10px
  margin-bottom: 20px
  position: relative
  .remove-user-button
    position: absolute
    top: 20px
    right: 20px
    cursor: pointer
.btn-kakurenbo
  color: $primary-grey
  background-color: $accent-color
  font-weight: bold
.form-group
  font-size: 16px
  margin-bottom: 20px
  .legend
    font-weight: bold
</style>