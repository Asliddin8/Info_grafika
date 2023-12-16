<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <div class="col-8">
        <h1 class="text-center fs-3 fw-bolder">
          Kirish Age Sirdaryo Turizm
        </h1>

        <form @submit.prevent>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Phone</label
            >
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Telefon"
              v-model="data.phone"
              :class="!phoneIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Parol</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Parol "
              v-model="data.password"
              :class="!passwordIsValid ? 'border-danger' : ''"
            />
          </div>
          <button
            class="btn btn-primary"
            :disabled="!formIsValid"
            @click="login"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        phone: null,
        password: null,
      },
      xato: null,
      users: [
        {
          phone: 970051636,
          password: '1636',
          role: 'admin', // admin , moderator , user
        },
        {
          phone: 901299881,
          password: '9881',
          role: 'admin', // admin , moderator , user
        },
      ],
    };
  },
  computed: {
    phoneIsValid() {
      return !!this.data.phone;
    },
    passwordIsValid() {
      return !!this.data.password;
    },

    formIsValid() {
      return this.phoneIsValid && this.passwordIsValid;
    },
  },
  methods: {
    login() {
      for (let item of this.users) {
        if (
          item.phone == this.data.phone &&
          item.password == this.data.password &&
          (item.role == 'admin' || item.role == 'moderator')
        ) {
          localStorage.setItem('token', 'bu_token_ekan');
          localStorage.setItem('role', item.role);

          this.$router.push({
            name: 'home',
          });
        } else if (item.role == 'user') {
          this.$router.push({
            name: 'login',
          });
          window.location.reload();
        } else {
          this.xato = 'Login yoki parol xato';
        }
      }
    },
  },
};
</script>

<style scoped></style>
