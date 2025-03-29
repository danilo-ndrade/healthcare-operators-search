<script setup lang="ts">
import { formatCNPJ } from '@/composables/formatCNPJ'
import { searchOperators } from '@/services/search'
import type { Operator } from '@/types/operator'
import { ref } from 'vue'

const searchTerm = ref('')
const searchOption = ref('company_name') // "Razão Social" selecionada por padrão

const result = ref<Operator[]>([])
const erro = ref<unknown | null>(null)

async function getResults() {
  erro.value = null
  try {
    const filters = {
      ans_number: searchOption.value === 'ans_number',
      cnpj: searchOption.value === 'cnpj',
      company_name: searchOption.value === 'company_name',
    }
    result.value = await searchOperators(searchTerm.value, filters)
  } catch (error) {
    erro.value = error
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-2xl font-medium">Buscar Operadora de Planos de Saúde ativas</h1>
      <p class="text-xs text-slate-500">
        Esta busca é feita na base de dados da
        <a
          href="https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/"
          alt="Link para base de dados"
          target="_blank"
          class="text-blue-300 underline"
          >Agência Nacional de Saúde Suplementar(ANS)</a
        >.
      </p>
    </div>
    <div>
      <form @submit.prevent="getResults">
        <div
          class="mx-auto w-full max-w-lg border border-slate-300 dark:border-slate-500 rounded flex gap-2 divide-x divide-slate-300 dark:divide-slate-500 p-2"
        >
          <input
            type="text"
            v-model="searchTerm"
            name="searchTerm"
            placeholder="Buscar operadoras..."
            class="w-full max-w-xl text-lg focus:outline-none"
          />
          <button type="submit" class="cursor-pointer hover:text-slate-400">Buscar</button>
        </div>
        <div class="mx-auto w-full max-w-lg flex gap-3 mt-3">
          <div class="space-x-1">
            <input
              type="radio"
              name="searchOption"
              id="ans_number"
              value="ans_number"
              v-model="searchOption"
            />
            <label for="ans_number">Número ANS</label>
          </div>
          <div class="space-x-1">
            <input
              type="radio"
              name="searchOption"
              id="cnpj"
              value="cnpj"
              v-model="searchOption"
              class="bg-transparent"
            />
            <label for="cnpj">CNPJ</label>
          </div>
          <div class="space-x-1">
            <input
              type="radio"
              name="searchOption"
              id="company_name"
              value="company_name"
              v-model="searchOption"
              class="bg-transparent"
            />
            <label for="company_name">Razão Social</label>
          </div>
        </div>
      </form>
    </div>

    <div
      v-if="result.length > 0"
      class="dark:bg-slate-800 bg-slate-100 p-3 rounded max-w-3xl mx-auto"
    >
      <h3 class="text-sm italic">{{ result.length }} operadoras encontradas</h3>
      <div class="mt-2 space-y-1">
        <div v-for="operator in result" :key="operator.CNPJ">
          <div
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-2 p-2 rounded bg-slate-200 dark:bg-slate-700"
          >
            <div>
              <p class="font-medium">{{ operator.Razao_Social }}</p>
              <p>CNPJ - {{ formatCNPJ(operator.CNPJ) }}</p>
            </div>
            <div class="flex justify-end">
              <button class="underline">Detalhes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="erro">
      <p>{{ erro }}</p>
    </div>
  </div>
</template>
