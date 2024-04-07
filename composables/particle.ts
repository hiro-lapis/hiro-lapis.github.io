export const useParticle = () => {
    // const PARTICLE_CONFETTI = 'confetti'
    // const PARTICLE_BIG_CIRCLES = 'big-circles'
    enum ParticleTypes {
        PARTICLE_CONFETTI = 'confetti',
        PARTICLE_BIG_CIRCLES = 'big-circles',
    }

    const no = ref<ParticleTypes>(ParticleTypes.PARTICLE_CONFETTI)
    const options: Record<ParticleTypes, any> = {
        [ParticleTypes.PARTICLE_CONFETTI]: {
            particles: {
                number: {
                    value: 100,
                },
                size: {
                    value: 3,
                },
                color: {
                    value: '#ffffff',
                },
                shape: {
                    type: 'circle',
                },
                move: {
                    enable: true,
                    speed: 2,
                },
            },
        },
        [ParticleTypes.PARTICLE_BIG_CIRCLES]: {
            particles: {
                number: {
                    value: 100,
                },
                size: {
                    value: 100,
                },
                color: {
                    value: '#ffffff',
                },
                shape: {
                    type: 'circle',
                },
                move: {
                    enable: true,
                    speed: 2,
                },
            },
        },
    }
    const particle = computed(() => {
        return options[no.value]
    })

    return { particle }
}
