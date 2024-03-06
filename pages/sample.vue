<template>
  <div>
    <div class="py-4">
      <UMeter
        :value="25"
        label=""
        indicator
      />
    </div>
    <UInput
      :id='uInput'
      :loading="loading"
      color="primary"
      placeholder="入力してね"
      :icon="inputIcon"
      v-model="value"
    />
    <UButton
      :id='uButton'
      size="md"
      @click="setLoad"
    >ロード</UButton>
    <UButton
      :id='uButton'
      size="md"
      @click="changePreset"
      ref="button"
    >particle</UButton>
    <UButton
      :id='uButton'
      size="md"
      @click="pause"
      ref="button"
    >pause</UButton>

    <UButton
      :id='uButton'
      size="md"
      icon="i-heroicons-light-bulb"
    >アイコン</UButton>
    <p>NO: {{ store.getCount }}</p>
    <UButton size="md" @click="store.increment">
      +1
    </UButton>
    <UButton size="md" @click="store.decrement">
      -1
    </UButton>
  </div>
  <div>
    <NuxtParticles
      v-if="no === 1"
      id="tsparticles"
      :options="options1"
    />
    <NuxtParticles
      v-if="no === 2"
      id="tsparticles2"
      :options="options2"
    />
    <NuxtParticles
      v-if="no === 3 && show"
      id="tsparticles3"
      :options="options3"
    />
    <NuxtParticles
      v-if="no === 4"
      id="tsparticles4"
      :options="options4"
    />
    <NuxtParticles
      v-if="no === 5"
      id="tsparticles4"
      :options="options5"
    />
    <NuxtParticles
      v-if="no === 6"
      id="tsparticles4"
      :options="options6"
    />
  </div>
</template>

<script setup lang="ts">
// import { ref, useRuntimeConfig,  } from '#imports'
import { loadFull } from 'tsparticles'
import { tsParticles, type IOptions } from 'tsparticles-engine'
// TODO: @ありを読むようにしてheartを使えるようにする
// import { tsParticles } from "@tsparticles/engine"
// import { loadHeartShape } from "@tsparticles/shape-heart"
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles"
import { loadConfettiPreset } from "tsparticles-preset-confetti"

const value = ref('')
/**
 * nuxt/ui
 * https://ui.nuxt.com/components
 */
// for using nuxt/ui, required to use useId
const uInput = useId()
const uButton = useId()

const loading = ref(false)
const inputIcon = ref('')
const setLoad = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
/**
 * nuxt particle's sample(best example)
 * https://stackblitz.com/github/Joepocalyptic/nuxt-particles?file=playground%2Fapp.vue
 *
 * vue3 sample
 * https://github.com/tsparticles/vue3?tab=readme-ov-file
 *
 * modify presets sample at react
 * https://codesandbox.io/p/sandbox/react-tsparticles-preset-k46br?file=%2Fsrc%2FApp.js%3A16%2C28
 *
 * how to use presets
 * if you want to use other presets, required below
 *   - install preset library
 *   - use load function (ex. loadConfettiPreset)
 *   - set options.preset name to preset name
 *
 * you can also full custmize nuxt particles by using options.
 * https://nuxt-particles.joeypereira.dev/getting-started/configuration#custom-mode
 *
 * API DOCS
 * https://particles.js.org
 *
 * list of presets
 * https://www.npmjs.com/search?q=tsparticles-preset
 *
 * options reference
 * https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html
 *
 * confetti customize sample(*need to be configuration for nuxt-particles)
 * https://confetti.js.org/more.html#realistic
 *
 */

// not split store, or not can't keep store reactivity
const store = useStore()
const no = computed(() => store.getCount)

const show = ref(true)
const changePreset = () => {
  if (options3.value.preset === 'confetti') {
    options3.value.preset = 'big-circles'
  } else {
    options3.value.preset = 'confetti'
  }
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 100)

  tsParticles.refresh()
  tsParticles.addPreset('big-circles', { })
}
const pause = () => {
  const particles = tsParticles.domItem(0)
  particles?.stop()
  setTimeout(() => {
    particles?.start()
  }, 1000)
  // tsParticles.refresh()
  // tsParticles.addPreset('big-circles', { })
}

if(process.client) {
  await loadFull(tsParticles)
  await loadConfettiPreset(tsParticles)
  await loadBigCirclesPreset(tsParticles)
  // await loadHeartShape(tsParticles)
}

// flowing connected particle's pattern
// IOptions typing is not working, so not set type
const options1 = ref({
  fullScreen: {
    enable: true,
    zIndex: -1 // if not set -1, particle component will be rendered over other UI
  },
  // if not set preset, default will be "basic"
  particles: {
    color: {
      // color variation
      value: ['#000', '#ff7575',]
    },
    links: {
      color: ['#000',],
      enable: true
    },
    move: {
      enable: true
    },
    // 数
    number: {
      value: 100
    },
    // 形
    shape: {
      type: "circle", // starting from v2, this require the square shape script
    },
  }
})


const options2 = ref({
  background: {
    color: "#fff"
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    color: {
      value: "#000"
    },
    links: {
      color: "#000",
      enable: true
    },
    move: {
      enable: true
    },
    number: {
      value: 100
    }
  }
})

const options3 = ref({
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  preset: 'confetti',
  particles: {
      shapes: ['heart'],
      color: {
        value: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      },
      // shape: {
      //   type: 'square', // starting from v2, this require the square shape script
      // },
  },
  // generate particle life time
  emitters: {
    life: {
      // duration: 5,
      count: 0, // 0 means infinity
    },
    position: {
      // uncomment only one of these lines,
      // to have explosions on the x or y axis
      // centered on the other one
      // if everything is kept commented,
      // random positions will be used everytime the cannon fires
      x: 50,
      y: 50
    },
  },
})

const options4 = ref({
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  preset: 'heart',
  // if you want to use multiple particle, set array
  emitters: [
    {
      life: {
        duration: 5,
        count: 1,
      },
      position: {
        x: 40,
        y: 30,
      },
      particles: {
        move: {
          direction: "top-right",
        },
      },
    },
    {
        life: {
          duration: 20000,
          count: 3, // iteration
        },
        position: {
          x: 80,
          y: 30,
        },
        particles: {
          move: {
            direction: "top-left",
          },
        },
      },
  ],
})

const options5 = ref({
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  preset: "big-circles",
})

const options6 = ref({
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  background: {
      color: {
          value: '#0d47a1'
      }
  },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: 'push'
          },
          onHover: {
              enable: true,
              mode: 'repulse'
          },
      },
      modes: {
          bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
          },
          push: {
              quantity: 4
          },
          repulse: {
              distance: 200,
              duration: 0.4
          }
      }
  },
  particles: {
      color: {
          value: '#ffffff'
      },
      links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
      },
      move: {
          direction: 'none',
          enable: true,
          outModes: 'bounce',
          random: false,
          speed: 6,
          straight: false
      },
      number: {
          density: {
              enable: true,
          },
          value: 80
      },
      opacity: {
          value: 0.5
      },
      shape: {
          type: 'circle'
      },
      size: {
          value: { min: 1, max: 5 }
      }
  },
  detectRetina: true
})


</script>
