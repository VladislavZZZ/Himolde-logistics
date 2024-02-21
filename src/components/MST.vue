<template>
  <div class="bodyContent">
    <div class="text-center mt-4">
      <div class="text-center page-header">
        <h2>Minimal Spanning Tree</h2>
       
    </div>

    </div>
    <div class="container-md mt-4">
      <div class="row mt-5">
        <div class="mx-auto">
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <h6 class="fw-bold col px-md-4"> Select input file</h6>
              </div>
              <div class="row">
                <div class="col" style="padding-right: 1%; padding-bottom: 1%">
                  <input
                    type="text"
                    id="file_search"
                    class="form-control"
                    v-model="filename"
                    readonly
                  />
                </div>
                <div class="col-auto" style="padding-left: 0%">
                  <!-- <input class="btn" type="file" ref="file" @change="readFile()" /> -->
                  <label class="file-select btn btn-primary">
                    <div class="select-button">
                      <!-- Display the filename if a file has been selected. -->
                      <span v-if="value">Selected File: {{ value.name }}</span>
                      <span v-else>Choose...</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" ref="doc" @change="handleFileChange" />
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="col px-md-3">
                  <img
                    src="@/assets/help.svg"
                    alt=""
                    style="margin-left: 5px"
                  />
                  <span style="font-size: 14px">
                    Supported data formats: <b>.csv, </b><b>.xlsx, </b
                    ><b>.txt</b></span
                  >
                  <!-- <div v-tooltip="'Введите ед.измерения и нажмите Enter'">
                        <img src="@/assets/help.svg" alt="" style="margin-left: 5px" />
                      </div>  -->
                </div>
              </div>
              <div class="row mt-3">
                <h6 class="fw-bold col px-md-4"> OR</h6>
              </div>
              <div class="row mt-3">
                <h6 class="fw-bold col px-md-4"> Write node count</h6>
              </div>
              <div class="row" >
                <input 
                    type="text"
                    id="vcount_input"
                    class="form-control"
                    v-model="vcount"
                    :maxlength="10"
                    placeholder="not more than 8"
                  />
              </div>
              <div class="row mt-3">
                <h6 class="fw-bold col px-md-4"> Write the edge weights </h6>
              </div>
              <div class="row">
                <textarea
                  class="form-control w-100"
                  rows="8"
                  v-model="inputcontent"
                  placeholder="w11 w12 ... w1n, wn1 wn2 ... wnn"
                ></textarea>
              </div>
              <!-- <div class="row mt-3">
                <div class="col px-md-3">
                  <h6 class="fw-bold column-margin" style="padding-bottom: 1%">
                    Идентификатор проекта
                  </h6>
                  <input
                    type="text"
                    id="name_input"
                    class="form-control"
                    v-model="projName"
                    @input="onProjectChange"
                    :maxlength="30"
                  />
                </div>
              </div> -->
              <div class="row ">
                <!-- <div class="row">
                  <h6 class="fw-bold column-margin" style="width: 32rem">
                    Additional options:
                  </h6>
                </div> -->
                <!-- <div class="checkboxes column-margin" style="width: 35rem">
                  <div class="row">
                    <div class="col-auto">
                      <input
                        type="checkbox"
                        id="word_rep_box"
                        value="rem-twins"
                        v-model="setupActions"
                      />
                    </div>
                    <div class="col-auto">
                      <label for="word_rep_box"
                        >option 1</label
                      >
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-auto">
                      <input
                        type="checkbox"
                        id="empty_box"
                        value="rem-blanks"
                        v-model="setupActions"
                      />
                    </div>
                    <div class="col-auto">
                      <label for="empty_box"
                        >option <b>2</b></label
                      >
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-auto">
                      <input
                        type="checkbox"
                        id="punctuation_box"
                        value="rem-brackets-punkts"
                        v-model="setupActions"
                      />
                    </div>
                    <div class="col-auto">
                      <label for="punctuation_box"
                        >option<b> 3</b></label
                      >
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-auto">
                      <input
                        type="checkbox"
                        id="single_box"
                        value="rem-singles"
                        v-model="setupActions"
                      />
                    </div>
                    <div class="col-auto">
                      <label for="single_box"
                        >option
                        <b>4</b></label
                      >
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col-auto">
                      <input
                        type="checkbox"
                        id="typos_box"
                        value="fix-mistakes"
                        v-model="setupActions"
                      />
                    </div>
                    <div class="col-auto">
                      <label for="typos_box"
                        >option
                        <b>5</b></label
                      >
                    </div>
                  </div> -->

                  
                <!-- </div> -->
                <div class="row mt-4">
                    <button
                    width ="200px"
                      type="button"
                      class="btn btn-primary"
                      @click="proccessRequests"
                      style="width: auto; margin-left: 5rem"
                    >
                      Run
                    </button>
                  </div>
                <!-- <div class="">
                  <label class="fw-bold" style="font-size: 17px;">Предпросмотр содержимого файла:</label>
                </div>
                <div class="row" style="margin: 0%;">
                  <textarea class="form-control w-100" rows="10" v-model="content" readonly></textarea>
                </div> -->
              </div>
            </div>
            <div class="col-md-7">
              <div class="row">
                <label class="fw-bold" style="font-size: 17px"
                  >Result area:</label
                >
              </div>
              <div class="row" style="margin: 0%">
                <textarea
                  class="form-control w-100"
                  rows="20"
                  v-model="content"
                  readonly
                ></textarea>
              </div>
              <!-- <div v-if="loadingSt" class="row justify-content-center align-items-center">
                <Loader :label=loaderLabel class="mx-auto"></Loader>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <Footer :nextPage="onNextButtonPress" :prevPage="onBackButtonPress" /> -->
</template>

<script>
  // import StepWizard from './fragments/StepWizard.vue';
  // import Footer from '../components/Footer.vue';
  // import Loader from '@/components/Loader.vue';
  // import { useVuelidate } from '@vuelidate/core';
  // import { required, helpers } from '@vuelidate/validators';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';



  export default {
    setup() {
      return {
        // v$: useVuelidate(),
      };
    },
    name: 'Setup',
    data() {
      return {
        contentLinesCount: 0,
        setupActions: this.$store.getters.setupActions,
        loaderLabel: 'Идет предобработка, подождите...',
        loadingSt: false,
        ports: {
          'rem-twins': "this.$config.PREPROC_SRV_REM_TWINS_PORT",
          'rem-blanks': "this.$config.PREPROC_SRV_REM_BLANCS_PORT",
          'rem-brackets-punkts': "this.$config.PREPROC_SRV_REM_BRACKETS_PUNCT_PORT",
          'rem-singles': "this.$config.PREPROC_SRV_REM_SINGLES_PORT",
          'fix-mistakes': "this.$config.PREPROC_SRV_FIX_MISTAKES_PORT",
        },
      };
    },
    // components: {
    //   StepWizard,
    //   Footer,
    //   Loader,
    // },
    methods: {
      async onNextButtonPress() {
        //check inputs validation
        // const isFormCorrect = await this.v$.$validate();
        // if (!isFormCorrect) return;

        if (this.projName == '') {
          return;
        }
        var projectInfo = this.$store.getters.projectInfo;
        projectInfo.filename = this.filename;
        projectInfo.InitRowNum = this.contentLinesCount;
        projectInfo.createDate = Date();
        projectInfo.setupList = this.setupActions;
        this.$store.dispatch('setProjectInfo', projectInfo);
        var characteristics = this.$store.getters.characteristics;
        characteristics.project_id = this.projName;
        this.$store.dispatch('setCharacteristics', characteristics);
        this.$router.push('/Abbreviations');
      },
      goToPreprocessingRegexps() {
        this.$router.push('/preprocessingRegexps');
      },

      async proccessRequests() {
        this.loadingSt = true;
        var vnumber = parseInt(this.vcount)
        var weights = this.inputcontent;
        const path = 'http://127.0.0.1:5000/MST';
        var payload = {
          "v":vnumber,
          "weights":weights
        }
        // var payload = {
        //   "v":4,
        //   "weights":"0 10 15 20, 10 0 35 25, 15 35 0 30, 20 25 30 0",
        //   "start":0
        // }
        axios.post(path, payload)
          .then((result) => {
            this.content = result.data.result;
            this.showMessage = true;
          })
          .catch((error) => {

            console.log(error);
            this.getBooks();
          });
       
        this.loadingSt = false;
      },

      
      handleFileChange(e) {
        this.file = this.$refs.doc.files[0];
        const reader = new FileReader();
        if (this.file.name.includes('.txt')) {
          this.$store.dispatch('clearStateValues');
          this.filename = this.file.name;
          this.$store.dispatch('setFilename', this.file.name);
          if (this.file.name.length > 30 + 4) {
            this.$store.dispatch(
              'setProjectName',
              this.file.name
                .substring(0, this.file.name.length - 4)
                .substring(0, 30),
            );
          } else {
            this.$store.dispatch(
              'setProjectName',
              this.file.name.substring(0, this.file.name.length - 4),
            );
          }

          reader.onload = (res) => {
            this.content = res.target.result;
            this.contentLinesCount = this.content.match(/\r?\n/g).length;
            this.$store.dispatch('setTextContentAndLatestResult', res.target.result);
          };
          reader.onerror = (err) => console.log(err);
          reader.readAsText(this.file);
          this.projName = this.$store.getters.projectName;
          this.$store.dispatch('setStatus', 'Выполняется предобработка');
        } else {
          this.content = 'check the console for file output';
          // reader.onload = (res) => {
          //   console.log(res.target.result);
          // };
          // reader.onerror = (err) => console.log(err);
          // reader.readAsText(this.file);
        }
        this.$emit('input', e.target.files[0]);
      },
      
    },
    computed: {
      content: {
        get() {
          return this.$store.getters.textContent;
        },
        set(value) {
          this.$store.dispatch('setTextContent', value);
        },
      },
      projName: {
        get() {
          return this.$store.getters.projectName;
        },
        set(value) {
          this.$store.dispatch('setProjectName', value);
        },
      },
      filename: {
        get() {
          return this.$store.getters.filename;
        },
        set(value) {
          this.$store.dispatch('setFilename', value);
        },
      },
      // content() {
      //   return this.$store.getters.textContent;
      // },
      // projName() {
      //   return this.$store.getters.projectName;
      // },
      // filename() {
      //   return this.$store.getters.filename;
      // },
      // setupActions: {
      //   get() {
      //     return this.$store.getters.setupActions;
      //   },
      //   set(value) {
      //     this.$store.dispatch('setSetupActions', value);
      //   }
      // }
    },
    mounted() {
      this.$store.dispatch('setStep', '1');
      this.$store.dispatch('setTittle', 'Загрузка и предобработка');
    },
    validations() {
      const projIdMask = helpers.regex(
        /^[а-яА-Яa-zA-Z]{1,9}[ ]*[0-9]{1,4}[-][0-9]{1,4}$/,
      );
      return {
        projName: {
          required: helpers.withMessage('Обязательное поле', required),
          projIdMask: helpers.withMessage(
            'Должен соответствовать виду: Перчатки 0001-2023',
            projIdMask,
          ),
        },
      };
    },
  };
</script>

<style scoped>
  /* Don't forget to hide the original file input! */
  .file-select > input[type='file'] {
    display: none;
  }
</style>
