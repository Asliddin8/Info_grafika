<template>
    <div>
        <form @submit.prevent>
            <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input v-model="message" type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>

            <button class="btn btn-primary">Send</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{
                message:null,
            }
        }
    },
    methods:{
        Send(){
            this.axios.post()
        }
    }
}
</script>