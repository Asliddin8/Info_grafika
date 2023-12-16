<template>
  <div class="container">
    <h1 class="text-center my-3 fs-3 fw-bolder">Tahrirlash</h1>
    <!-- Forma -->
    <div class="row my-5 justify-comtent-center">
      <div class="col-12">
        <form @submit.prevent>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Joyning nomi uzbekcha</label
            >
            <input
              v-model="data.title_languz"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Joyning nomi uzbekcha"
              :class="!title_languzIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Joyning nomi Ruscha</label
            >
            <input
              v-model="data.title_langru"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Joyning nomi Ruscha"
              :class="!title_langruIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Joyning nomi Inglizcha</label
            >
            <input
              v-model="data.title_langen"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Joyning nomi Inglizcha"
              :class="!title_langenIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Adress uzbekcha</label
            >
            <input
              v-model="data.addressuz"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Adress uzbekcha"
              :class="!addressuzIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Adress Ruscha</label
            >
            <input
              v-model="data.addressru"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Adress uzbekcha"
              :class="!addressruIsValid ? 'border-danger' : ''"
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label"
              >Adress Inglizcha</label
            >
            <input
              v-model="data.addressen"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Adress uzbekcha"
              :class="!addressenIsValid ? 'border-danger' : ''"
            />
          </div>
          <!-- Cordinta -->
          <div class="mb-3">
            <label
              for="exampleFormControlTextarea1"
              class="form-label"
              >Kordinata</label
            >
            <div>
              [ <br />
              <p class="ms-3">
                [ 68.76119488467327, 40.50118972057595 ],
              </p>
              <p class="ms-3">
                [ 68.76113112027076, 40.50143215000065 ],
              </p>
              <p class="ms-3">
                [ 68.7616642615279, 40.501510265961684 ],
              </p>
              <p class="ms-3">
                [ 68.76172979716497, 40.50126918365061 ],
              </p>
              <p class="ms-3">
                [ 68.76119665590642, 40.501191067408854 ]
              </p>
              ]
              <p class="my-2 text-warning">
                Shu kurinishda kirgizing kordinatani
              </p>
            </div>

            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="7"
              v-model="data.cordinata"
              :class="!cordinataIsValid ? 'border-danger' : ''"
            ></textarea>
          </div>
          <div class="mb-3">
            <!-- Color  -->
            <label for="exampleFormControlInput1" class="form-label"
              >Cordinatani rangini tanlang</label
            >
            <h1>Tanlangan rang</h1>
            <div
              class="color_card rounded-[5px] m-1 cursor-pointer flex justify-center items-center"
              :style="`background: ${color};`"
            ></div>
            <h1>Yangi rang tanlang</h1>
            <div class="flex flex-wrap">
              <div
                class="color_card rounded-[5px] m-1 cursor-pointer flex justify-center items-center"
                v-for="(item, index) of colors"
                :key="index"
                @click="selectElement(index, item)"
                :style="`background: ${item};`"
              >
                <span
                  class="icon-check hidden"
                  :class="{ blockActive: checkedActive === index }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.7em"
                    viewBox="0 0 448 512"
                    fill="#fff"
                  >
                    <path
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <p v-if="!colorIsValid" class="text-danger">
              Rang tanlanmagan
            </p>
          </div>
          <button
            class="btn btn-success"
            :disabled="!formIsValid"
            @click="addCordinata"
          >
            Yuklash
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
        title_languz: null,
        title_langru: null,
        title_langen: null,
        addressuz: null,
        addressru: null,
        addressen: null,
        cordinata: null,
      },

      datas: null,
      colors: [
        '#09FF01',
        '#01FCF8',
        '#29DFFF',
        '#01BBFF',
        '#0178FF',
        '#0066FE',
        '#FF017C',
        '#FF0109',
        '#FF7801',
        '#FFB301',
        '#F5FE95',
      ],
      checkedActive: null,
      color: null,
      subject: null,
      paramsID: this.$route.params.id,
    };
  },
  computed: {
    title_languzIsValid() {
      return !!this.data.title_languz;
    },
    title_langruIsValid() {
      return !!this.data.title_langru;
    },
    title_langenIsValid() {
      return !!this.data.title_langen;
    },
    addressuzIsValid() {
      return !!this.data.addressuz;
    },
    addressruIsValid() {
      return !!this.data.addressru;
    },
    addressenIsValid() {
      return !!this.data.addressen;
    },
    cordinataIsValid() {
      return !!this.data.cordinata;
    },
    colorIsValid() {
      return !!this.color;
    },

    formIsValid() {
      return (
        this.title_languzIsValid &&
        this.title_langruIsValid &&
        this.title_languzIsValid &&
        this.addressuzIsValid &&
        this.addressruIsValid &&
        this.addressenIsValid &&
        this.cordinataIsValid &&
        this.colorIsValid
      );
    },
  },
  created() {
    this.axios
      .get('https://sirdaryoturizm.uz/api/cordinata/all')
      .then((res) => {
        let selectedData = res.data.find(
          (item) => item._id == this.paramsID
        );
        this.data.title_languz = selectedData.title_lang.uz;
        this.data.title_langen = selectedData.title_lang.en;
        this.data.title_langru = selectedData.title_lang.ru;
        this.data.addressuz = selectedData.address.uz;
        this.data.addressen = selectedData.address.en;
        this.data.addressru = selectedData.address.ru;
        this.data.cordinata = selectedData.cordinata;
        this.color = selectedData.color;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    selectElement(index, id) {
      this.checkedActive = index;
      this.color = id;
    },
    addCordinata() {
      let array = [];
      // Remove unnecessary whitespace and newlines
      if (this.data.cordinata.indexOf(' ') == -1) {
        array = this.data.cordinata;
      } else {
        const cleanedInput = this.data.cordinata.replace(
          /,\s*]/g,
          ']'
        );

        array = JSON.parse(cleanedInput);

        for (let i = 0; i < array.length; i++) {
          let temp = array[i][0];
          array[i][0] = array[i][1];
          array[i][1] = temp;
        }
        console.log(array);
      }

      let data = {
        title: this.data.title_languz,
        title_languz: this.data.title_languz,
        title_langru: this.data.title_langru,
        title_langen: this.data.title_langen,
        addressuz: this.data.addressuz,
        addressru: this.data.addressru,
        addressen: this.data.addressen,
        color: this.color,
        cordinata: array,
      };
      console.log(data);
      this.axios
        .put(
          'https://sirdaryoturizm.uz/api/cordinata/' + this.paramsID,
          data
        )
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/places');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.blockActive {
  display: block !important;
}
.color_card {
  width: 40px;
  height: 40px;
}
</style>
