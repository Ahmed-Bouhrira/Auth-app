<template>
  <div>
    <!-- <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="deep-purple accent-1"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          Edit your profile
        </v-btn>
      </template>
      <v-card>
        <span class="headline"></span>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="validate"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-container class="ma-4">
      <v-divider></v-divider>
      <v-row align-content="stretch" justify="center">
        <v-col lg="4" sm="6" xs="12">
          <v-card
            id="profile"
            style="height: 100%"
            max-width="500px"
            class="pa-8"
          >
            <v-row justify="center">
              <v-avatar class="my-2 ml-8" size="100">
                <v-img :src="`/api/images/${user.image}`"></v-img>
              </v-avatar>
              <span class="image-upload">
                <label for="file-input">
                  <v-icon>mdi-camera</v-icon>
                </label>

                <input id="file-input" type="file" @change="onFileSelected" />
              </span>
            </v-row>
            <v-card-title class="my-0" style="justify-content: center">{{
              user.username
            }}</v-card-title>
            <v-card-subtitle class="my-0" style="text-align: center">{{
              user.email
            }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div class="h1 text-center  font-italic mt-0">
        WELCOME {{ user.username }}
      </div>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    // dialog: false,
    // dialogDelete: false,
    // selectedFile: null,
    // valid: true,
    // editedIndex: -1
  }),
  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   },
  //   dialogDelete(val) {
  //     val || this.closeDelete();
  //   }
  // },
  mounted() {
    this.initialize();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["changeUser"]),
    async initialize() {},

    async onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const fb = new FormData();
      fb.append("image", this.selectedFile, this.selectedFile.name);
      await axios.put("/api/users/image", fb, {
        onUploadProgress: uploadEvent => {
          console.log(
            "upload Progress" +
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
              "%"
          );
        }
      });
      const user = await this.$axios.$get("/api/user");
      if (user.username) {
        this.changeUser(user);
      } else {
        this.changeUser({ username: false });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.image-upload > input {
  display: none;
}
</style>
