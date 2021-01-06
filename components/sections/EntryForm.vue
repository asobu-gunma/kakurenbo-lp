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
                required,
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
        input.btn.btn-lg.btn-kakurenbo(type="submit", value="参加を申し込む")
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
      });
    },
    removeUser(index) {
      this.entryForm.userList.splice(index, 1);
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