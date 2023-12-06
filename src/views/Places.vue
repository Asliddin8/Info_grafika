<template>
  <div class="container">
    <!-- Modal -->
    <div class="modal" tabindex="-1" :class="{ 'd-block': modal }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="form">
              <div class="mb-2">
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
                  >Title uzbekcha {{ data.title_languz }}</label
                >
                <input
                  v-model="data.title_languz"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title uzbekcha"
                  :class="!title_languzIsValid ? 'border-danger' : ''"
                />
              </div>
              <div class="mb-2">
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
                  >Title Ruscha</label
                >
                <input
                  v-model="data.title_langru"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title Ruscha"
                  :class="!title_langruIsValid ? 'border-danger' : ''"
                />
              </div>
              <div class="mb-2">
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
                  >Title Inglizcha</label
                >
                <input
                  v-model="data.title_langen"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title Inglizcha"
                  :class="!title_langenIsValid ? 'border-danger' : ''"
                />
              </div>
              <div class="mb-2">
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
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
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
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
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
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
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="UpdateTitleAdress"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
    <h1 class="text-center">Kirgizilgan joylar</h1>
    <button @click="exportToExcel" class="btn btn-primary me-4">
      Export
    </button>
    <button @click="UpdateAllColor" class="btn btn-primary">
      Update
    </button>

    <div class="table_wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">ID</th>
            <th scope="col">Color</th>
            <th scope="col">Tahrilash</th>
            <th scope="col">O'chirish</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of datas" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item._id }}</td>
            <td>{{ item.color }}</td>
            <td>
              <button
                @click="UpdateTitleAdressAcctive(item._id)"
                class="btn btn-warning"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                @click="deleteZapros(item._id)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: null,
      data: {
        title_languz: null,
        title_langru: null,
        title_langen: null,
        addressuz: null,
        addressru: null,
        addressen: null,
      },
      putid: null,
      modal: false,
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

    formIsValid() {
      return (
        this.title_languzIsValid &&
        this.title_langruIsValid &&
        this.title_languzIsValid &&
        this.addressuzIsValid &&
        this.addressruIsValid &&
        this.addressenIsValid
      );
    },
  },
  methods: {
    exportToExcel() {
      const ExcelJS = require('exceljs');
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Add headers
      worksheet.columns = [
        { header: 'Ism', key: 'title', width: 150 },
      ];

      // Add data rows
      this.datas.forEach((data) => {
        worksheet.addRow(data);
      });

      // Generate Excel file
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'sirdaryo.xlsx';
        link.click();
      });
    },
    UpdateAllColor() {
      let data = {
        color: '#09FF01',
      };
      for (let item of this.datas) {
        this.axios
          .put(
            'https://sirdaryoturizm.uz/api/cordinata/color/' +
              item._id,
            data
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    UpdateTitleAdressAcctive(id) {
      this.modal = true;
      this.putid = id;
    },
    UpdateTitleAdress() {
      if (this.formIsValid) {
        this.axios
          .put(
            'https://sirdaryoturizm.uz/api/cordinata/title_adress/' +
              this.putid,
            this.data
          )
          .then((res) => {
            console.log(res.data.success);
            if (res.data.success) {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
.modal-dialog {
  max-width: 650px;
}
.form {
  height: 400px;
  overflow-y: auto;
}
</style>
