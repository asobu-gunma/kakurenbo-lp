<template lang="pug">
form.entry-form
  .container
    .row
      .offset-lg-3.offset-md-2.col-lg-6.col-md-8
        .user-list(v-for="(user, index) in entryForm.userList", :key="index")
          .form-group.row
            .col-sm-3.mt-2
              label(:for="`user_${index}_name`") お名前
            .col-sm-9
              input.form-control(
                type="text",
                placeholder="かくれんぼ 太郎",
                :name="`user_${index}_name`",
                :id="`user_${index}_name`",
                required,
                v-model="user.name"
              )
          .form-group.row
            .col-sm-3
              label 性別
            .col-sm-9
              .custom-control.custom-radio.custom-control-inline
                input.custom-control-input(
                  type="radio",
                  :name="`user_${index}_gender_male`",
                  :id="`user_${index}_gender_male`",
                  value="男性",
                  required,
                  v-model="user.gender"
                )
                label.custom-control-label(:for="`user_${index}_gender_male`") 男性
              .custom-control.custom-radio.custom-control-inline
                input.custom-control-input(
                  type="radio",
                  :name="`user_${index}_gender_female`",
                  :id="`user_${index}_gender_female`",
                  value="女性",
                  required,
                  v-model="user.gender"
                )
                label.custom-control-label(
                  :for="`user_${index}_gender_female`"
                ) 女性
          .form-group.row
            .col-sm-3.mt-2
              label(:for="`user_${index}_age`") 年代
            .col-sm-9
              select.custom-select(
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
        .form-group.row
          .col-sm-3
            label 参加のキッカケ
          .col-sm-9
            .cognition-list(
              v-for="(cognition, index) in cognitionList",
              :key="index"
            )
              .custom-control.custom-checkbox
                input.custom-control-input(
                  type="checkbox",
                  :name="`user_cognition_${index}`",
                  :id="`user_cognition_${index}`",
                  :value="cognition",
                  required,
                  v-model="entryForm.cognition"
                )
                label.custom-control-label(:for="`user_cognition_${index}`") {{ cognition }}
        .form-group.row
          .col-sm-3.mt-2
            label(:for="`user_note`") 質問・要望
          .col-sm-9
            textarea.form-control(
              :name="`user_note`",
              :id="`user_note`",
              v-model="entryForm.note"
            )
</template>

<script>
export default {
  data() {
    return {
      entryForm: {
        userList: [
          {
            name: "",
            gender: "男性",
            age: "",
          },
        ],
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
};
</script>

<style lang="sass" scoped>
</style>