<template>
  <!-- <q-file
    v-model="filesImages"
    class="text-capitalize"
    bg-color="blue-4"
    rounded
    clearable 
    outlined
    dense
    style="max-width: 120px; margin-bottom: 10px"
    label="写真を変更"
    accept=".jpg, image/*"
    @update:model-value="updateFiles"
    @rejected="onRejected"  
  /> -->
  <div>
    <q-file
      v-model="imgFile"
      class="text-capitalize"
      rounded
      clearable 
      outlined
      dense
      style="max-width: 200px"
      label="写真を変更"
      accept="image/jpeg, image/jpg, image/png, image/svg"
      @update:model-value="setImage"
      @rejected="onRejected"
    />
    <!-- <input
      type="file"
      accept="image/jpeg, image/jpg, image/png, image/svg"
      style="font-size: 1.2em; padding: 10px 0;"
      @change="setImage"
    > -->
    <br>
    <q-dialog v-model="cropperDialog">
       <q-card>
        <q-card-section align="center" class="bg-primary text-white">
          <div class="text-h6">アバターに設定する写真の切り取り</div>
        </q-card-section>
        <!-- <q-card-actions style="padding: 5px 0;" align="center">
          <q-btn @click="cropImage" v-if="imgSrc != ''" flat align="center" label="切り取り" color="primary"/>
          <q-btn @click="updateFiles" v-if="imgSrc != ''" flat align="right" label="決定" color="primary"/>
        </q-card-actions> -->
        <q-card-section class="row items-center">
          <div class="col-6">
            <vue-cropper
              ref="cropper"
              :guides="true"
              :view-mode="2"
              drag-mode="crop"
              :auto-crop-area="0.5"
              width="200px"
              height="200px"
              style="margin: 5px"
              :background="true"
              :rotatable="false"
              :src="imgSrc"
              :img-style="{ 'width': '200px', 'height': '200px' }"
              :aspect-ratio="1"
            ></vue-cropper>
          </div>
          <div class="col-6">
            <q-img
              rounded
              :src="cropImg"
              width="200px"
              height="200px"
              style="margin: 5px"
              :img-style="{ 'width': '200px', 'height': '200px' }"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="cropImage" v-if="imgSrc != ''" flat label="切り取り" color="primary"/>
          <q-btn
            @click="updateFiles"
            v-if="imgSrc != ''"
            flat
            label="閉じる"
            color="accent"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>   
  </div>
</template>

<script>
import { ref } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { useRouter } from 'vue-router'
import { useStore } from "vuex";

export default {
  // components: {
  //   VueCropper
  // },
  // setup() {
  //   const $store = useStore();
  //   const $router = useRouter();    
  //   const $refs = VueCropper;
  //   const filesImages = ref('');
  //   let url  = ref("");
  //   let imgSrc = ref("");
  //   let file  = ref("");
  //   let cropImg = ref("");
  //   let cropper = ref([]);
  //   let cropperDialog = (false);

  //   (async function setupBooks() {
  //     try{
  //     }catch (e) {
  //       console.log(e.response)
  //       if(e.response.status === 401) {
  //         $router.replace("/login");
  //         await $store.dispatch("authModule/logoutError");
  //         negativeMessage("Error", "再度ログインしてください");
  //         return;
  //       }
  //     }
  //   })();
    // const updateFiles = async (rejectedEntries) => {
    //   try{
    //     const file = e.target.files[0];
    //     if (!file.type.includes("image/")) {
    //       alert("Please select an image file");
    //       return;
    //     }
    //     if (typeof FileReader === "function") {
    //       const reader = new FileReader();
    //       reader.onload = event => {
    //         imgSrc.value = event.target.result;
    //         $refs.cropper.replace(event.target.result);
    //       };
    //       reader.readAsDataURL(file);
    //     } else {
    //       alert("Sorry, FileReader API not supported");
    //     }
    //     cropImg.value = $refs.cropper.getCroppedCanvas().toDataURL();
    //     $refs.cropper.rotate(90);
    //     console.log(rejectedEntries);
    //     url.value = URL.createObjectURL(rejectedEntries)
    //   }catch (e) {
    //     negativeMessage("Error", `ファイルの読み込みに失敗しました`);
    //   }    
    // };

  //   const onRejected = () => {
  //     negativeMessage("Error", `画像ファイルを読み込んでください`);
  //   };

  //   const setImage = (rejectedEntries) => {
  //     console.log($refs)
  //     file.value = rejectedEntries;
  //     console.log("file",file.value)
  //     if (!file.value.type.includes("image/")) {
  //       alert("Please select an image file");
  //       return;
  //     }
  //     if (typeof FileReader === "function") {
  //       const reader = new FileReader();
  //       reader.onload = event => {
  //         imgSrc.value = event.target.result;
  //         $refs.replace(event.target.result);
  //       };
  //       reader.readAsDataURL(file.value);
  //     } else {
  //       alert("Sorry, FileReader API not supported");
  //     }
  //     cropperDialog = true;
  //   };

  //   const cropImage = () => {
  //     cropImg.value = $refs.getCroppedCanvas().toDataURL();
  //     const blob = window.atob(cropImg.value.replace(/^.*,/, ''));
  //     let buffer = new Uint8Array(blob.length);
  //     for (let i = 0; i < blob.length; i++) {
  //         buffer[i] = blob.charCodeAt(i);
  //     }
  //     const imgFile = new File([buffer.buffer], file.value.name, {type: file.value.type});
  //     console.log(imgFile)
  //   };

  //   const rotate = () => {
  //     // guess what this does :)
  //     this.refs.value.cropper.rotate(90);
  //   };

  //   return {
  //     filesImages,
  //     url,
  //     imgSrc,
  //     file,
  //     cropper,
  //     cropImg,
  //     cropperDialog,
  //     // updateFiles,
  //     onRejected,
  //     setImage,
  //     cropImage,
  //     rotate,
  //   };
  // },
  components: {
    VueCropper
  },
  emits: ['uploadfile'],
  data() {
    return {
      imgSrc: "",
      cropImg: "",
      $store: useStore(),
      file: "",
      imgFile: [],
      cropperDialog: false,
    };
  },
  methods: {
    setImage(rejectedEntries) {
      this.file = rejectedEntries;
      // console.log("file",this.file)
      if (!this.file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
          // console.log(this.imgSrc)
          // console.log(this.$refs.cropper)
        };
        reader.readAsDataURL(this.file);
        console.log(reader)
      } else {
        alert("Sorry, FileReader API not supported");
      }
      this.cropperDialog = true;
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      // console.log("deforecropImg",this.$refs.cropper)
      // console.log("cropedImg",this.cropImg)
      // const blob = window.atob(this.cropImg.replace(/^.*,/, ''));
      // let buffer = new Uint8Array(blob.length);
      // for (let i = 0; i < blob.length; i++) {
      //     buffer[i] = blob.charCodeAt(i);
      // }
      // this.imgFile = new File([buffer.buffer], this.file.name, {type: this.file.type});
      // console.log(this.imgFile)
    },
    updateFiles () {
      this.cropperDialog = false;
      this.$emit('uploadfile',this.cropImg, this.file);
      this.cropImg = "";
      this.file = "";
      // try{
      //   const formdata = new FormData();
      //   formdata.append('avatar', this.imgFile)
      //   console.log(formdata)
      //   await this.$store.dispatch("imageModule/createImage", formdata );
      //   const uploadfile = this.$store.state.imageModule.images;
      //   console.log(uploadfile)
      //   this.cropperDialog = false;
      //   this.$emit('uploadfile',uploadfile);
      // }catch (e) {
      //   negativeMessage("Error", `ファイルの読み込みに失敗しました`);
      // }
    },
    onRejected () {
      negativeMessage("Error", `画像ファイルを読み込んでください`);
    },
    rotate() {
      this.$refs.cropper.rotate(90);
    }
  }
}
</script>

<style>

</style>