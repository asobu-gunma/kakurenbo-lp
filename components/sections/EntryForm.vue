<template lang="pug">
form.entry-form
  .container
    .row
      .offset-lg-2.col-lg-8
        .user-list(v-for="(user, index) in entryForm.userList", :key="index")
          .form-group
            label.legend(:for="`user_${index}_name`") お名前
            input.form-control.form-control-lg(
              type="text",
              placeholder="かくれんぼ 太郎",
              :name="`user_${index}_name`",
              :id="`user_${index}_name`",
              required,
              v-model="user.name"
            )
          .form-group
            label.legend 性別
            .d-flex
              .form-check.mr-3
                input.form-check-input(
                  type="radio",
                  :name="`user_${index}_gender`",
                  :id="`user_${index}_gender_male`",
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
                  value="女性",
                  required,
                  v-model="user.gender"
                )
                label.form-check-label(:for="`user_${index}_gender_female`") 女性
          .form-group
            label.legend(:for="`user_${index}_age`") 年代
            select.form-control.form-control-lg(
              :name="`user_${index}_age`",
              :id="`user_${index}_age`",
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
          label.legend(:for="`user_email`") 代表者メールアドレス
          input.form-control.form-control-lg(
            type="email",
            placeholder="taro@kakurenbo.club",
            :name="`user_email`",
            :id="`user_email`",
            required,
            v-model="entryForm.email"
          )
        .form-group
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
                v-model="entryForm.cognition"
              )
              label.form-check-label(:for="`user_cognition_${index}`") {{ cognition }}
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
          value="参加を申し込む",
          @click="sendMail"
        )
</template>

<script>
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default {
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
        "Facebookページ",
        "新聞・メディア",
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
    async sendMail(e) {
      e.preventDefault();
      const { userList, email, cognition, note } = this.entryForm;
      const users = userList.map((user, index) => {
        return `# 参加者${index + 1}
名前: ${user.name}
性別: ${user.gender}
年代: ${user.age}${user.isKids ? "（中学生以下）" : ""}`;
      });
      this.$nuxt.$loading.start();
      const mailOption = {
        from: `${process.env.projectName} エントリーフォーム <entry@${process.env.domain}>`,
        to: [process.env.mailTo],
        subject: `【${process.env.projectName}】参加申し込みがありました`,
        text: `
 以下の内容でイベントへの参加申し込みがありました。

---
${users.join("\n\n")}

# 代表メールアドレス
${email}

# 参加のキッカケ
${cognition.join(", ")}

# 質問・要望
${note}
---
`,
      };
      try {
        await this.$mgClient.messages.create(
          `mg.${process.env.domain}`,
          mailOption
        );
        this.$toast.success(
          "参加申し込みを受け付けました。ありがとうございました。",
          { duration: 5000 }
        );
        this.resetForm();
      } catch (err) {
        this.$toast.error(
          "参加申し込みに失敗しました。時間をおいて再度お試しください。",
          { duration: 5000 }
        );
        console.log(err);
        throw err;
      } finally {
        this.$nuxt.$loading.finish();
      }
    },
    resetForm() {
      this.entryForm = {
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
      };
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