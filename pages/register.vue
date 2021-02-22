<template>
  <v-container pa-12 fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="text">Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                :counter="50"
                :rules="passwordRules"
                type="password"
                label="Password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="validate">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      v => !!v || "username is required",
      v => (v && v.length <= 12) || "username must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "password is required",
      v => (v && v.length > 6) || "password must be more than 6 characters"
    ]
  }),

  methods: {
    ...mapActions(["changeUser"]),
    async validate() {
      if (this.$refs.form.validate()) {
        let userObj = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        let rtn = await this.$axios.$post("/api/register", userObj);
        this.$router.push("/login");
        const user = await this.$axios.$get("/api/user");
        if (user.username) {
          this.changeUser(user);
        } else {
          this.changeUser({ username: false });
        }
        // this.$router.push("/profile");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped></style>
