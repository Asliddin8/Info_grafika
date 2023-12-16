<template>
  <div class="container">
    <h1 class="text-center my-3 fs-3 fw-bolder">
      Kirgizilgan joylar
    </h1>

    <!-- <button @click="UpdateAllColor" class="btn btn-primary">
      Update
    </button> -->

    <div class="table_wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Joy nomi</th>
            <th scope="col">Adress</th>
            <!-- <th scope="col">Kordinata</th> -->
            <th scope="col">Rang</th>
            <th scope="col">Tahrilash</th>
            <th scope="col">O'chirish</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of datas" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td v-if="item.title_lang">
              <p><b>Uz: </b>{{ item.title_lang.uz }}</p>
              <p><b>Ru: </b>{{ item.title_lang.ru }}</p>
              <p><b>En: </b>{{ item.title_lang.en }}</p>
            </td>
            <td v-if="item.address">
              <p><b>Uz: </b>{{ item.address.uz }}</p>
              <p><b>Ru: </b>{{ item.address.ru }}</p>
              <p><b>En: </b>{{ item.address.en }}</p>
            </td>
            <td>
              <div
                class="color_card rounded-[5px] m-1"
                :style="`background: ${item.color};`"
              ></div>
            </td>
            <!-- <td class="white_space">
              {{ item.cordinata[0][0] }}, {{ item.cordinata[0][1] }}
            </td> -->

            <td>
              <router-link
                :to="`placesedit/${item._id}`"
                class="btn btn-warning"
              >
                Tahrirlash
              </router-link>
            </td>
            <td>
              <button
                @click="UpdateStatus(item._id)"
                class="btn btn-danger"
              >
                O'chirish
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
      .get('https://sirdaryoturizm.uz/api/cordinata/filter', {
        params: { status: 'active' },
      })
      .then((res) => {
        console.log(res);
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
    UpdateStatus(id) {
      let data = {
        status: 'archive',
      };
      this.axios
        .put(
          'https://sirdaryoturizm.uz/api/cordinata/status/' + id,
          data
        )
        .then((res) => {
          if (res.data.success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UpdateTitleAdressAcctive(id) {
      this.modal = true;
      this.putid = id;
      let joy = this.datas.find((item) => item._id == id);
      console.log(joy);
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
.white_space {
  white-space: nowrap;
}
.color_card{
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
</style>
