<script setup lang="ts">
import "animate.css";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useCookie } from "#app";

useHead({
  title: "cliMe - Погода",
  meta: [
    {
      name: "description",
      content: "cliMe - Погода",
    },
  ],
  link: {
    rel: "icon",
    href: "/logo.png",
  },
});

const auth = getAuth();
const user = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser || null;
});

const weatherData = ref<any>(null);
const forecastData = ref<any[]>([]);
const apiKey = "e104ae098f0f093ed9b4c57bb1bf107e";

const cityCookie = useCookie("user_city", { maxAge: 60 * 60 * 24 * 7 });

const city = ref(decodeURIComponent(cityCookie.value || "Київ"));


function setCity(cityName: string) {
  city.value = cityName;
  cityCookie.value  = cityName;
}


const fetchWeather = async (cityName: string) => {
  if (!cityName.trim()) {
    console.error("Місто не може бути порожнім");
    return;
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: { q: cityName, units: "metric", lang: "ua", appid: apiKey },
      }
    );
    weatherData.value = weatherResponse.data;
  } catch (error) {
    console.error("Помилка при отриманні погоди:", error);
    weatherData.value = null;
  }
};

const fetchForecast = async (cityName: string) => {
  if (!cityName.trim()) return;

  try {
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: { q: cityName, units: "metric", lang: "ua", appid: apiKey },
      }
    );
    forecastData.value = forecastResponse.data.list.slice(0, 9);
  } catch (error) {
    console.error("Помилка при отриманні прогнозу:", error);
    forecastData.value = [];
  }
};

const weatherIconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : "";
});

onMounted(() => {
  fetchWeather(city.value);
  fetchForecast(city.value);
});

watch(city, (newCity: any) => {
    cityCookie.value = encodeURIComponent(newCity);
});


</script>

<template>
  <div class="p-6 mt-4">
    <NuxtLink to="/profile"
      ><UButton
        class="fixed right-4 top-14"
        icon="i-heroicons-cog-6-tooth"
        color="gray"
      ></UButton
    ></NuxtLink>

    <UFormGroup>
      <UInput
        @change="
          fetchWeather(city);
          fetchForecast(city);
        "
        v-model="city"
        class="absolute border-none outline-none left-4 top-4 focus:w-1/2 transition-width duration-300 linear"
        icon="material-symbols:search-rounded"
        color="blue"
        placeholder="Введіть назву міста"
      ></UInput>
    </UFormGroup>

    <div v-if="weatherData" class="mb-6 animate__animated animate__fadeIn animate__slow">
      <div class="p-2">
        <!-- Назва міста -->
        <p class="relative font-bold text-3xl">{{ city }}</p>

        <div class="flex items-center gap-2 ml-4">
          <NuxtImg :src="weatherIconUrl" width="60" />

          <p class="text-xl font-normal capitalize">
            {{ weatherData.weather[0].description }}
          </p>
        </div>

        <p class="text-xl">
          <strong
            >Відчувається як
            {{ Math.round(weatherData.main.feels_like) }}°C</strong
          >
        </p>

        <div class="flex flex-col space-y-4 mt-4">
          <div class="flex items-center bg-blue-400 rounded-lg shadow-md p-4">
            <NuxtImg src="/temperature.png" class="w-10 h-10 mr-3" />
            <div>
              <p class="text-xl font-semibold">Температура</p>
              <strong class="text-xl"
                >{{ Math.round(weatherData.main.temp) }}°C</strong
              >
            </div>
          </div>

          <!-- Вологість -->
          <div class="flex items-center bg-blue-400 rounded-lg shadow-md p-4">
            <NuxtImg src="/humidity.png" class="w-10 h-10 mr-3" />
            <div>
              <p class="text-xl font-semibold">Вологість</p>
              <strong class="text-xl"
                >{{ Math.round(weatherData.main.humidity) }}%</strong
              >
            </div>
          </div>

          <!-- Швидкість вітру -->
          <div class="flex items-center bg-blue-400 rounded-lg shadow-md p-4">
            <NuxtImg src="/wind-speed.png" class="w-10 h-10 mr-3" />
            <div>
              <p class="text-xl font-semibold">Швидкість вітру</p>
              <strong class="text-xl"
                >{{ Math.round(weatherData.wind.speed) }} м/с</strong
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <UCarousel
      v-if="forecastData && forecastData.length"
      :items="forecastData"
      :ui="{
        item: 'w-[calc(100%/3] flex-shrink-0 p-1',
        container: 'gap-2',
      }"
      class="w-full animate__animated animate__fadeIn animate__slow"
    >
      <template #default="{ item }">
        <div class="p-4 rounded-lg bg-blue-400 flex flex-col justify-center">
          <!-- Дата -->
          <p class="text-lg font-semibold text-center">
            {{
              new Date(item.dt_txt).toLocaleString("uk-UA", {
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>

          <!-- Температура -->
          <p>
            <strong class="text-2xl">{{ Math.round(item.main.temp) }}°C</strong>
          </p>

          <!-- Опис погоди -->
          <p class="capitalize text-xl">
            {{ item.weather[0].description }}
          </p>
        </div>
      </template>
    </UCarousel>
  </div>
</template>
