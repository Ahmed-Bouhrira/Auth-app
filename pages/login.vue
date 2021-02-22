<template>
  <v-container pa-12 fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="text">Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout column>
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
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="validate"
              >
                Login
              </v-btn>
            </v-flex>

            <div class="mt-4 text-center login-with-social">
              <v-btn
                href="/api/auth/google"
                type="button"
                class="btn btn-outline-danger btn-block"
              >
                <i class="mdi mdi-google-plus"></i> Login With Google
              </v-btn>
              <v-btn
                href="/api/auth/facebook"
                type="button"
                class="btn btn-outline-danger btn-block"
              >
                <i class="mdi mdi-facebook"></i> Login With Facebook
              </v-btn>
            </div>
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
          email: this.email,
          password: this.password
        };
        let rtn = await this.$axios.$post("/api/login", userObj);
        const user = await this.$axios.$get("/api/user");
        if (user.username) {
          this.changeUser(user);
        } else {
          this.changeUser({ username: false });
        }
        this.$router.push("/profile");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
.text {
  text-align: center;
}
</style>
