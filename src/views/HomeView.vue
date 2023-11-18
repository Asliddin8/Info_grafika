<template>
  <div class="container">
    <h1>Admin panel</h1>
    <div class="row justify-comtent-center">
      <div class="col-12">
        <form @submit.prevent>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Title</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Coordinate Title"
              v-model="data.title"
            />
          </div>
          <div class="mb-3">
            <!-- Color  -->
            <div class="mb-4 flex flex-wrap">
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
          </div>
          <button class="btn btn-success" @click="addCordinata">
            Submit
          </button>
        </form>
      </div>
    </div>

    <div class="row g-1">
      <div class="col-md-3 border" v-for="item of datas" :key="item">
        <h2>{{ item.title }}</h2>
        <button
          @click="deleteZapros(item._id)"
          class="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title: null,
        cordinata: [],
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
    };
  },
  created() {
    this.axios
      .get('https://sirdaryoturizm.uz/api/cordinata/all')
      .then((res) => {
        console.log(res.data);
        this.datas = res.data;
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
      let cordinata = [
        [68.77686918547192, 40.49822290229315],
        [68.77691659502261, 40.49823011258496],
        [68.77694073079243, 40.49815604318874],
        [68.77733466105687, 40.49822552421736],
        [68.77731655922958, 40.49829762709601],
        [68.77735276288576, 40.498302870938545],
        [68.77729156146773, 40.49851562785727],
        [68.77725363382754, 40.49850776211767],
        [68.77722691207865, 40.49858904137869],
        [68.77683039583962, 40.49852283811751],
        [68.77685453161092, 40.498440247818536],
        [68.77681057002684, 40.49843303754923],
        [68.77686832348144, 40.498222628449355],
      ];

      for (let i = 0; i < cordinata.length; i++) {
        let temp = cordinata[i][0];
        cordinata[i][0] = cordinata[i][1];
        cordinata[i][1] = temp;
      }
      let data = {
        title: this.data.title,
        color: this.color,
        cordinata: cordinata,
      };
      console.log(data);
      this.axios
        .post('https://sirdaryoturizm.uz/api/cordinata/create', data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteZapros(id) {
      this.axios
        .delete('https://sirdaryoturizm.uz/api/cordinata/' + id)
        .then((res) => {
          console.log(res);
          window.location.reload();
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
