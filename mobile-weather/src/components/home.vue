<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import axios from "axios";

const currentStatus = ref("Rain");
const description = ref("Shower");
const country = ref("mateur");
const currentCountry = ref(country.value);
const date = ref(new Date());
const dgree = ref(4);
const data = ref([]);

const loading = ref(true);
const visiblePopup = ref(false);

const question = ref({
  title: "Can I go outside ?",
  answer: "Yes, you can go outside",
});

function getWeather() {
  loading.value = true;
  axios
    .get(`https://backend-6666.azurewebsites.net/weather/${country.value}`)
    .then((response) => {
      data.value = response.data;
      currentStatus.value = data.value.weather[0].main;

      if (currentStatus.value == "Mist")
        currentStatus.value = "Clouds";

      description.value = data.value.weather[0].description;

      date.value = new Date(data.value.dt * 1000);

      dgree.value = data.value.main.temp;
      currentCountry.value = data.value.name;

      loading.value = false;
    });
}

function canGoOutside() {
  visiblePopup.value = true;

  question.value.question = "Can I go outside ?";

  if (currentStatus.value === "Rain") {
    question.value.answer = "No, you can't go outside";
  } else if (currentStatus.value === "Clouds") {
    question.value.answer = "Yes, you can go outside but you should wear a jacket";
  } else if (currentStatus.value === "Clear") {
    question.value.answer = "Yes, you can go outside";
  } 
}

function canISwim() {
  visiblePopup.value = true;

  question.value.question = "Can I go swim ?";

  if (currentStatus.value === "Rain") {
    question.value.answer = "No, you can't go swim, it's raining";
  } else if (currentStatus.value === "Clouds") {
    question.value.answer = "No, you can't go swim, it's cloudy";
  } else if (currentStatus.value === "Clear") {
    question.value.answer = "Yes, you can go swim";
  } 
}

function canCamping() {
  visiblePopup.value = true;

  question.value.question = "Can I go to camping ?";

  if (currentStatus.value === "Rain") {
    question.value.answer = "No, you can't go to camping, it's raining";
  } else if (currentStatus.value === "Clouds") {
    question.value.answer = "Yes, you can go to camping, enjoy your day";
  } else if (currentStatus.value === "Clear") {
    question.value.answer = "Yes, you can go to camping";
  } 
}

function search() {
  getWeather();
}

onMounted(() => {
  getWeather();
});

const images = {
  Rain: "/src/assets/images/HeavyRain.png",
  Clouds: "/src/assets/images/HeavyCloud.png",
  Clear: "/src/assets/images/Clear.png",
};
</script>

<template>
  <div
    class="w-full bg-violet text-white h-full w-[100vw] flex flex-col items-center space-y-20"
  >
    <form class="w-full max-w-sm">
      <div class="flex items-center border-b border-blue-400 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Country"
          v-model="country"
        />
        <button
          class="flex-shrink-0 bg-blue-400 hover:bg-teal-700 border-blue-400 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          @click="search"
        >
          Search
        </button>
      </div>
    </form>
    <div role="status" v-if="loading">
      <svg
        aria-hidden="true"
        class="inline w-40 h-40 text-gray-200 animate-spin dark:text-gray-200 fill-blue-400"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    <img
      v-if="!loading"
      :src="images[currentStatus]"
      class="w-[150px] h-[150px] mt-10"
    />
    <div v-if="!loading" class="font-mono text-8xl">
      {{ dgree }}<span class="opacity-30 text-6xl">&deg;C</span>
    </div>
    <div v-if="!loading" class="opacity-40 text-center">
      <p class="text-3xl text-center">{{ description }}</p>
      <p class="mt-3">
        Today - {{ moment(date).format("MMM Do YYYY, h:mm A") }}
      </p>
      <p class="mt-3">
        <img
          class="inline"
          src="../assets/images/location_on-white-24dp.svg"
          alt=""
        />{{ currentCountry }}
      </p>
    </div>
    <div class="text-center pb-10" v-if="!loading">
      <button
        class="flex-shrink-0 bg-green-400 hover:bg-teal-700 border-green-400 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="canGoOutside"
      >
        Can I go Outside ?
      </button>
      <br>
      <button
        class="mt-2 flex-shrink-0 bg-blue-400 hover:bg-teal-700 border-blue-400 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="canISwim"
      >
        Can I swim ?
      </button>
      <br>
      <button
        class="mt-2 flex-shrink-0 bg-red-400 hover:bg-teal-700 border-red-400 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="canCamping"
      >
        Can I go to camping ?
      </button>
    </div>

    <div
      v-if="visiblePopup"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {{ question.title }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{question.answer}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                type="button"
                 @click="visiblePopup = false"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
