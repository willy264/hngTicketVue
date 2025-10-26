<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { CheckCircle2, Zap, MessagesSquare } from 'lucide-vue-next';
import Button from './ui/Button.vue';

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const features = [
  {
    icon: CheckCircle2,
    title: "Smart Tracking",
    description: "Real-time updates & notifications",
    gradient: "from-green-400 to-green-500",
  },
  {
    icon: Zap,
    title: "Fast Resolution",
    description: "AI-powered ticket routing",
    gradient: "from-purple-400 to-purple-500",
  },
  {
    icon: MessagesSquare,
    title: "Team Collaboration",
    description: "Seamless communication",
    gradient: "from-pink-400 to-pink-500",
  },
];
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-linear-to-br from-gray-900 to-gray-800 bg-white text-white">
    <div class="absolute top-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
    <div class="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/15 rounded-full blur-2xl"></div>

    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-full opacity-30">
          <div class="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div class="absolute w-96 h-96 -top-48 -right-48 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div class="absolute w-96 h-96 -bottom-48 left-48 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <div class="absolute inset-0 bg-linear-to-b from-black/10 to-black/30"></div>
      </div>
    </div>

    <div class="relative z-10 lg:-top-5">
      <div class="container mx-auto px-4 py-12 sm:py-16 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div class="text-center lg:text-left space-y-6 lg:space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                Impossible?
                <span class="block mt-2 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Possible
                </span>
              </h1>
              <p class="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                The ultimate solution for problem solvers. Track, manage, and
                resolve tickets with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 px-4 sm:px-0">
              <RouterLink to="/auth/signup" className="w-full sm:w-auto">
                <Button className="group relative w-full sm:w-auto px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow active:bg-blue-800" variant="default">
                  Start For Free
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </Button>
              </RouterLink>
              <RouterLink to="/auth/login" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 hover:border-blue-700 hover:text-blue-700"
                  variant="outline"
                >
                  Sign In
                </Button>
              </RouterLink>
            </div>

            <div class="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8">
              <div
                v-for="(stat, index) in stats"
                :key="index"
                class="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm"
              >
                <div class="text-2xl font-bold">{{ stat.value }}</div>
                <div class="text-sm text-gray-300">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <div class="lg:hidden space-y-4 mt-8">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
            >
              <div :class="`p-2.5 bg-linear-to-br ${feature.gradient} rounded-lg w-fit`">
                <component :is="feature.icon" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-lg font-semibold mt-4">{{ feature.title }}</h3>
              <p class="mt-2 text-gray-300">{{ feature.description }}</p>
            </div>
          </div>

          <!-- desktop -->
          <div class="hidden lg:block relative">
            <div class="relative h-[400px]">
              <div
                v-for="(feature, index) in features"
                :key="index"
                :class="[
                  'absolute w-80 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300',
                  index === 0 ? 'top-0 right-0' : '',
                  index === 1 ? 'top-1/3 left-0' : '',
                  index === 2 ? 'bottom-0 right-1/4' : ''
                ]"
              >
                <div class="flex items-center gap-4">
                  <div :class="`p-3 bg-linear-to-br ${feature.gradient} rounded-xl`">
                    <component :is="feature.icon" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-lg font-semibold">{{ feature.title }}</p>
                    <p class="text-sm text-gray-300">{{ feature.description }}</p>                    
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute -bottom-1 left-0 right-0">
      <svg
        class="w-full h-auto"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="fill-black/90"
          d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,154.7C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          class="fill-blue-900/10"
          d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,149.3C672,139,768,117,864,112C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          class="fill-gray-700/20"
          d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,144C672,139,768,85,864,74.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>

  </section>
</template>
   